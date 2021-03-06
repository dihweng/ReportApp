'use strict';
import React, {Component} from 'react';
import { View, FlatList,ScrollView, LayoutAnimation, Platform, Alert, UIManager, SafeAreaView, 
  TouchableOpacity,StatusBar, Image, Text, StyleSheet,} from 'react-native';
import {DisplayText, SubmitButton} from '../../components';
import styles from './styles';
import { ProgressDialog } from 'react-native-simple-dialogs';
import DropdownAlert from 'react-native-dropdownalert';
import { SQLite } from 'expo-sqlite';

const db = SQLite.openDatabase("offlinedb.db");

import { 
  DeleteFavoriteEndpoint, 
  DeleteReadLaterEndpoint, 
  getRouteToken, 
  getAllReport, 
  getProfile, 
  AddReadLaterEndPoint, 
  AddFavoriteEndPoint ,
  getSubscription
} from '../Utils/Utils';


export default class Citation extends Component {
  constructor(props) {
    super(props);
    this.state ={
      data : [],
      filterData: [],
      secondFilter: [],
      showAlert : false,
      showLoading: false,
      message : '',
      title: '',
      refreshing: false,
      expanded: false,
      expandalph : false,
      token: '',
      numberCitatio: '',
      alphabetCitation: '',
      isActive : false,
      last_page_no:0,
      current_page_no:0,
      nextDataLink:'',
      prevDataLink: '',
      nextBtnStatus: true,
      prevBtnStatus:true,
    }
  }
  async componentDidMount(){
    (Platform.OS === 'android') ? UIManager.setLayoutAnimationEnabledExperimental(true) : null
    await this.createTable();
    let profile = await getProfile();
    let subscription = await getSubscription();
     await this.setState({
      token : profile.access_token,
      isActive : subscription,
    });
    await this.handleGetAllReport();
  }
  showLoadingDialogue =()=> {
    this.setState({
      showLoading: true,
    });
  }

  createTable = async() => {
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists offline_report (id integer primary key not null, report_title text not null unique, citation text, excerpt text, content text);"
      );
    });
  }

  insertReport = (title, citation, excerpt, content) => {
    // var query = "insert into offline_report (id, title, citation, excerpt) values (null, ?,?,?)";
    var params = [title, citation, excerpt, content];
    db.transaction((tx) => {
      tx.executeSql("insert into offline_report (id, report_title, citation, excerpt, content) values (null, ?,?,?,?)", params,(tx, results) => {
        console.log("helllllooo:", results);
        Alert.alert("Success", "Report has been saved");
      }, function(tx, err){
        console.log(err);

        Alert.alert("Warning", "Report has not been saved");
        return;
      });
    });
  }

  handleSave = (title, citation, excerpt, content) => {
    // console.log('contenttt', content);
    if(title != "" && excerpt != "" && citation != "" && content != ""){
      return this.insertReport(title, citation, excerpt, content);
    }
    else {
      Alert.alert("Warning", "Report has not been saved");
    }
  }

  hideLoadingDialogue =()=> {
    this.setState({
      showLoading: false,
    });
  }

  showNotification = (type, title, message,) => {
    this.hideLoadingDialogue();
    return this.dropDownAlertRef.alertWithType(type, title, message);
  }

  handleCloseNotification = () => {
    return this.setState({
       showAlert : false,
     })
  }

 //filter citation numberts
  handleCitationPress = (citation) => {

    const {filterData} = this.state;
    const newData = filterData.filter(item => {const itemData = item.citation.split('-')[3].substring(0, 1) === citation;
      return itemData;
    });

    return this.setState({
      data: newData,
      secondFilter: newData,
    });
  }
  // Filter by citation alphabets
  handleCitationAlph = (citationAlph) => {
    const {filterData, secondFilter} = this.state;
    if(secondFilter.length > 0 ){
      const newData = secondFilter.filter(item => { 
        const itemData = item.title.substring(0, 1).toUpperCase() === citationAlph.toUpperCase();
        return itemData;
      });
      return this.setState({
        data: newData,
      });  
    }
    
    const newData = filterData.filter(item => { 
      const itemData = item.title.substring(0, 1).toUpperCase() === citationAlph.toUpperCase();
      return itemData;
    });
    return this.setState({
      data: newData,
    });
  }

  handleFullReport=async(id)=>{
    if(this.state.isActive === false) {
      await this.showNotification('error', 'Message', 'Please Subscribe to have Full Access');
      return await setTimeout(() => {
        this.props.navigation.navigate('ManageSubscription');
      }, 3000);    
    }
    else {
      return await this.props.navigation.navigate('FullReport', {
        id: id, 
      });
    }
  }
  //call get all report function
  handleGetAllReport = async() => {
    try {
      await this.allReport()
    }
    catch(error) {
     return this.showNotification('error', 'Message', error.toString());    
    }
  }
  allReport = async() => {
    const {token} = this.state;
    await getRouteToken(getAllReport, token)
      .then((res) => {
        if (typeof res.message !== 'undefined') {
          return this.showNotification('error', 'Message', res.message);
        }   
        else {          
          this.setState({
            data: res.data,
            filterData: res.data,
            prevBtnStatus: res.links.prev ? false : true,
            nextBtnStatus: res.links.next ? false : true,
            current_page_no: res.meta.current_page,
            last_page_no: res.meta.last_page,
            nextDataLink: res.links.next,
            prevDataLink: res.links.prev,
            isFetching: false, 
          });
          return this.hideLoadingDialogue();
        }
      }
    ).catch(error=>this.showNotification('error', 'Message', error.toString()));
  }

  loadPaginatedData = async(url) => {
    this.showLoadingDialogue();
    const {token} = this.state;
    await getRouteToken(url, token)
      .then((res) => {
        if (typeof res.message !== 'undefined') {  
          return this.showNotification('error', 'Message', res.message);
        }   
        else {  
          this.setState({
            data: res.data,
            filterData: res.data,
            prevBtnStatus: res.links.prev ? false : true,
            nextBtnStatus: res.links.next ? false : true,
            current_page_no: res.meta.current_page,
            last_page_no: res.meta.last_page,
            nextDataLink: res.links.next,
            prevDataLink: res.links.prev,
            isFetching: false, 
          });
          return this.hideLoadingDialogue();
        }
      }
    ).catch(error=>this.showNotification('error', 'Message', error.toString()));
  };
  
  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
  }
  changeLayoutalph = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expandalph: !this.state.expandalph });
  }

  addDeleteReadlater = async(id, title, index) =>{
    if(this.state.isActive === false) {
      await this.showNotification('error', 'Message', 'Please Subscribe to have Full Access');
      return await setTimeout(() => {
        this.props.navigation.navigate('ManageSubscription');
      }, 3000);    
    }
    else {
      await this.showLoadingDialogue();
      if(title.includes('Remove')){
        return await this.deleteReadLater(id, index);
      }
      else {
        return await this.handleReadLater(id, index);
      }
    }
  }

  handleReadLater = async(id, index) =>{
    try {
      await this.readLater(id, index)
    }
    catch(error) {
      return this.showNotification('error', 'Message', error.toString());    
    }
  }

  readLater = async(id, index) =>{
    const {token, data} = this.state;
    let endpoint = `${AddReadLaterEndPoint}${id}/future`;
    let settings = {
      method : "POST",
      headers : {
        "Accept" : "application/json",
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    };

    try {
      let response  = await  fetch(endpoint, settings);
      let res =  await response;
      if(res.status >= 200 && res.status < 300) {
        let targetPost = await data[index];
        targetPost.is_future_saved =  await !targetPost.is_future_saved;
        await this.setState({ data });
        return await this.showNotification('success', 'Success', 'Report Added Successfully');    
      }
      else {
        return this.showNotification('error', 'Message', 'Failed to Add Report');    

      }
    }
    catch(error) {
      return this.showNotification('error', 'Message', error.toString());    
    }
  } 

  deleteReadLater = async(id, index)=> {
    const { token, data } = this.state
    let endpoint = `${DeleteReadLaterEndpoint}${id}/${'future'}`      
    const settings = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,   

      },
    };

    try {
      let response = await fetch(endpoint, settings);
      let res = await response;

      if(res.status >= 200 && res.status < 300) {
        let targetPost = await data[index];
        targetPost.is_future_saved = await !targetPost.is_future_saved;
        await this.setState({ data });
        return await this.showNotification('success', 'Success', 'Report Removal Successful');    
      }
      return await this.showNotification('error', 'Message', 'Failed to Remove Report');    
   
    } 
    catch(error){
      return this.showNotification('error', 'Message', error.toString());    
    }
  }

  addDeleteFavorite = async(id, title, index) =>{
    if(this.state.isActive === false) {
       await this.showNotification('error', 'Message', 'Please Subscribe to have Full Access');
      return await  setTimeout(() => {
        this.props.navigation.navigate('ManageSubscription');
      }, 3000);   
    }
    else {
       await this.showLoadingDialogue();
      if(title.includes('Remove')) {
        return await this.deleteFavorite(id, index);
      }
      else {
        return await this.handleAddFavorite(id, index);
      }
    }
  }

  handleAddFavorite = async(id, index) =>{
    try {
      return await this.addFavorite(id, index)
    }
    catch(error) {
      return this.showNotification('error', 'Message', error.toString());    
    }
  }

  addFavorite = async(id, index) =>{
    const {token, data} = this.state;
    let endpoint = `${AddFavoriteEndPoint}${id}/favorite`;
     const  settings ={
      method : "POST",
      headers : {
        "Accept" : "application/json",
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    }

    try {
      let response = fetch(endpoint, settings)
      let res = await response;
      if (res.status >= 200 && res.status < 300) {    
        let targetPost = await data[index];
        targetPost.is_favorite =  await !targetPost.is_favorite;
        await this.setState({ data });
        return await this.showNotification('success', 'Success', 'Report Added Successfully');    
      }
      else {
        return this.showNotification('error', 'Message', 'Failed to Add Report');    
      }
    }
    catch(error) {
      return this.showNotification('error', 'Message', error.toString());    
    }
  } 

  deleteFavorite = async(id, index)=> {
    const { token, data} = this.state;
    let endpoint = `${DeleteFavoriteEndpoint}${id}/${'favorite'}`      
    const settings = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,   

      },
    };

    try {
      let response = await fetch(endpoint, settings);
      let res = await response;
      if(res.status >= 200 && res.status < 300) {
        let targetPost = await  data[index];
        targetPost.is_favorite = await !targetPost.is_favorite;
        await this.setState({ data });
        return await this.showNotification('success', 'Success', 'Report Removal Successful');    
        ;   
      }
      return await this.showNotification('error', 'Message', 'Failed to Remove Report');    
  
    } 
    catch(error){
      return this.showNotification('error', 'Message', error.toString());    
    }
  }

  renderFooter() {
    const{prevBtnStatus, nextBtnStatus, current_page_no, last_page_no, nextDataLink, prevDataLink} = this.state;
    return (
      <View style={styles.footerView}>
        <View style={styles.footer}>
          <SubmitButton
            title={'Prev'}
            onPress={()=>{this.loadPaginatedData(prevDataLink)}}
            titleStyle={styles.btnText}
            btnStyle = {styles.loadMoreButon}
            disabled={prevBtnStatus}

          />
    
          <DisplayText
            styles = {StyleSheet.flatten(styles.pageText)}
            text = {`Page ${current_page_no} of ${last_page_no}`}
          />

          <SubmitButton
            title={'Next'}
            onPress={()=>{this.loadPaginatedData(nextDataLink)}}
            titleStyle={styles.btnText}
            btnStyle = {styles.loadMoreButon}
            disabled={nextBtnStatus}

          />
        </View>
      </View>
    );
  }

  renderRow = ({item, index}) => {
    let read_later_button_text = item.is_future_saved == true ? 'Remove Read' : 'Read Later';
    let favorite_button_text = item.is_favorite == true ? 'Remove Favorite' : 'Add Favorite';
    
    return (
       <View style = {styles.listViewItem}>    
        <TouchableOpacity 
          onPress = {()=>this.handleFullReport(item.id)}
          style = {styles.cardView}>
          <DisplayText
            numberOfLines = { 2 } 
            ellipsizeMode = 'middle'
            text = {item.title}
            onPress = {()=>this.handleFullReport(item.id)}
            styles = {StyleSheet.flatten(styles.reportName)}
          />
          <DisplayText
            numberOfLines = { 2 } 
            ellipsizeMode = 'middle'
            text = {item.citation}
            onPress = {()=>this.handleFullReport(item.id)}
            styles = {StyleSheet.flatten(styles.headerText)}
          />
          <DisplayText
            numberOfLines = {4} 
            ellipsizeMode = 'middle'
            text = {item.excerpt.toLowerCase()}
            onPress = {()=>this.handleFullReport(item.id)}
            styles = {StyleSheet.flatten(styles.reportInfo)}
          />
          <View style={styles.buttonView}>
            <SubmitButton
              title={favorite_button_text}
              onPress={()=>this.addDeleteFavorite(item.id, favorite_button_text, index)}
              titleStyle={styles.btnText}
              btnStyle = {styles.btnStyle}
            />
            {/* <SubmitButton
              title={read_later_button_text}
              onPress={()=>this.addDeleteReadlater(item.id, read_later_button_text, index)}
              titleStyle={styles.btnText}
              btnStyle = {styles.btnReadLate}
            /> */}
            <SubmitButton
              title={'Save Offline'}
              onPress={()=>this.handleSave( item.title, item.citation, item.excerpt, item.content, index)}
              titleStyle={styles.btnText}
              btnStyle = {styles.btnReadLate}
            />
          </View> 
        </TouchableOpacity>  
      </View>
    );
  }


  render () {
    const { showLoading} = this.state;

    var citationsAlph = ['A','B','C','D','E','F','G','H','I','J','K','L', 'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    var citations = ['0','1', '2', '3', '4','5','6','7', '8', '9'];
    var citationList = citations.map((citation, index) => {
      return  <TouchableOpacity 
                key = {index}
                style = {styles.citisionTp}
                onPress={()=>this.handleCitationPress(citation)}>
                <Text 
                  style={styles.text}
                  key = {index}>
                  {citation}
                </Text> 
              </TouchableOpacity>
    });
    var citationListAlhp = citationsAlph.map((citationAlph, index) => {
      return  <TouchableOpacity 
                key = {index}
                style = {styles.citisionTp}
                onPress={()=>this.handleCitationAlph(citationAlph)}>
                <Text 
                  style={styles.text}
                  key = {index}>
                  {citationAlph}
                </Text> 
              </TouchableOpacity>
    })
   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar barStyle="default" /> 
      <ScrollView>
      <View style={styles.wrapper}>
        {/* Citation 0-9 */}
        <View style = {styles.expandedView}>
          {/* Citation 0-9 */}
        <View style = {styles.citationView}>
          {/* <View style = {styles.sorting}> */}
            <TouchableOpacity 
              onPress={this.changeLayout}
              style = {styles.sorting}>
              <Image
                onPress={this.changeLayout}
                source = {require('../../assets/images/sort_up.png')}
                style = {StyleSheet.flatten(styles.sortIcon)}
              />
            </TouchableOpacity>
          {/* </View> */}
          <View style = {styles.citationRange}>
            <DisplayText
              numberOfLines = { 2 } 
              ellipsizeMode = 'middle'
              text = {'CITATION 0 - 9'}
              styles = {StyleSheet.flatten(styles.citationNumber)}
            />
            <DisplayText
              numberOfLines = { 2 } 
              ellipsizeMode = 'middle'
              text = {'Filter Reports by Citation'}
              styles = {StyleSheet.flatten(styles.citationBody)}
            />
          </View>
        </View>
        <View style={{ flexDirection : 'row',height: this.state.expanded ? null : 0, overflow: 'hidden', flexWrap : "wrap" }}>
            {citationList}
        </View>
        </View>
          {/* Citation A - Z */}
          <View style = {styles.expandedView}>

            <View style = {styles.citationViewAlph}>
              {/* <View style = {styles.sorting}> */}
                <TouchableOpacity 
                  onPress={this.changeLayoutalph}
                  style = {styles.sorting}>
                  <Image
                    onPress={this.changeLayoutalph}
                    source = {require('../../assets/images/sort_up.png')}
                    style = {StyleSheet.flatten(styles.sortIcon)}
                  />
                </TouchableOpacity>
              {/* </View> */}
              <View style = {styles.citationRange}>
                <DisplayText
                  numberOfLines = { 3 } 
                  ellipsizeMode = 'middle'
                  text = {'Reports A - Z'}
                  styles = {StyleSheet.flatten(styles.citationNumber)}
                />
                <DisplayText
                  numberOfLines = { 3 } 
                  ellipsizeMode = 'middle'
                  text = {'Filter Reports by Aphabet'}
                  styles = {StyleSheet.flatten(styles.citationBody)}
                />
              </View>
            </View>
            <View style={{ flexDirection : 'row',height: this.state.expandalph ? null : 0, overflow: 'hidden', flexWrap : "wrap" }}>
              {citationListAlhp}
            </View>
          </View>

        </View>
        <View style = {styles.viewBody}>
          <FlatList          
            data={this.state.data}          
            renderItem={this.renderRow}  
            extraData={this.state}        
            keyExtractor={ data=> data.id.toString()}   
            showsVerticalScrollIndicator={false}
            ListFooterComponent={this.renderFooter.bind(this)}
          />
        </View>  
        </ScrollView>
          <ProgressDialog
            visible={showLoading}
            title="Processing"
            message="Please wait..."
          />
          <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />

      </SafeAreaView>
      )
    }
  } 