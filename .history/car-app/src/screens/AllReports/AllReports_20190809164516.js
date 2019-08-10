'use strict';
import React, {Component} from 'react';
import { View, FlatList, SafeAreaView, StatusBar, TouchableOpacity, Image, StyleSheet,} from 'react-native';
import {DisplayText, SubmitButton, SingleButtonAlert, InputField,CustomToast} from '../../components';
import styles from './styles';
import theme from '../../assets/theme';
import { DeleteFavoriteEndpoint, DeleteReadLaterEndpoint, getRouteToken, getAllReport, getProfile, ProfileEndpoint, saveUserDetail, AddReadLaterEndPoint, AddFavoriteEndPoint } from '../Utils/Utils';
import { ProgressDialog } from 'react-native-simple-dialogs';
import colors from '../../assets/colors';
// import HTML from 'react-native-render-html';

export default class AllReports extends Component {
  constructor(props) {
    super(props);
    this.state ={
      data: [],
      filterData: [],
      token: '',
      showAlert: false,
      message: '',
      showLoading: false,
      title: '',
      favorite_status:false,
      read_later_status:false,
      favorite_button_text:'',
      read_later_button_text:'',
      
    }
  }

  async componentDidMount(){

    let profile = await getProfile();
    this.setState({
      token : profile.access_token,
      expires : profile.expires,
      showLoading:true,
      // data:this.reports
    });
    await this.handleGetProfile();
  }

  showLoadingDialogue =()=> {
    this.setState({
      showLoading: true,
    });
  }

  hideLoadingDialogue =()=> {
    this.setState({
      showLoading: false,
    });
  }

  showNotification = message => {
    this.setState({ 
      showLoading : false,
      title : 'Error!',
      message : message,
      showAlert : true,
    }); 
  }

  handleCloseNotification = () => {
    return this.setState({
       showAlert : false,
     })
  }

  allReport = async() =>{
    const {token} = this.state;
    this.showLoadingDialogue();
    await getRouteToken(getAllReport, token)
      .then((res) => {
        if (typeof res.message !== 'undefined') {  
          return this.showNotification(res.message);
        }   
        else {          
          // console.log('res', res.data)

          this.setState({
            data: res.data,
            filterData: res.data,
          });
          return this.hideLoadingDialogue();
        }
      }
    );
  }

  handleGetAllReport = async() => {
    this.showLoadingDialogue();

    try {
      await this.allReport()
    }
    catch(e) {
      console.log({e})
    }
  }

  handleGetProfile = async() => {
    const{token} = this.state;
    this.showLoadingDialogue();

    await getRouteToken(ProfileEndpoint, token)
      .then((res) => {

        if (typeof res.message !== 'undefined') {  
          return this.showNotification(res.message);
        }
  
        else {
          saveUserDetail(res.data, token);
          return this.handleGetAllReport();
        }
      })
    .catch((error) => {
      return this.showNotification(error.toString());
    });
  }

// On pressing a report will navigate you to Full Report
//With the Params id, content and except
  handleFullReport=async(item)=>{
    this.showLoadingDialogue();

    this.props.navigation.navigate('FullReport', {
      id: item.id,
      content: item.content,
      excerpt: item.excerpt,  
    });
  }

  addFavorite = async(id) =>{
    const {token} = this.state;
    this.showLoadingDialogue();
    let endpoint = `${AddFavoriteEndPoint}${id}/favorite`;

    fetch(endpoint, {
      method : "POST",
      headers : {
        "Accept" : "application/json",
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then((res) => {
      console.log({addToFavoriteReponse: res});
      if (typeof res.message !== 'undefined' && status >= 400 ) {
        let message = 'Report Could Not be Added to Favorite'
        return this.showNotification(message);
      }
      else {
        this.hideLoadingDialogue()
        this.Toast('Report Added to Favorite Successful');
        return this.setState({
          favorite_button_text : 'Remove',
          favorite_status:true
        })

      }
    })
  } 
  // Called onPress to add favorite to list of favorite 
  handleAddFavourite = async(id) =>{
    this.showLoadingDialogue();
    try {
      await this.addFavorite(id)
    }
    catch(e) {
    
    }
  }

  readLater = async(id) =>{
    const {token} = this.state;
    this.showLoadingDialogue();
    let endpoint = `${AddReadLaterEndPoint}${id}/future`;

    fetch(endpoint, {
      method : "POST",
      headers : {
        "Accept" : "application/json",
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then((res) => {
      console.log({addToReadReponse: res});
      
      if (typeof res.message !== 'undefined' ) {
        return this.showNotification(res.message);
      }
      else {
        
        this.hideLoadingDialogue();
        this.Toast('Report Added to Read Later Successful');
         return this.setState({
          read_later_button_text : 'Remove',
          read_later_status:true
        });

      }
    })
  } 
  handleReadLater = async(id) =>{
      
    this.showLoadingDialogue();
    try {
      await this.readLater(id)
    }
    catch(error) {
      return this.showNotification(error.toString());
    }
  }
  // search filter 
  searchFilterFunction = text => {
    const {filterData} = this.state;
    this.setState({
      value: text,
    });
    const newData = filterData.filter(item => {
      const itemData = `${item.title.toUpperCase()} ${item.citation.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    return this.setState({
      data: newData,
    });
  }
  Toast=(message)=>{
    this.refs.defaultToastBottom.ShowToastFunction(message);
  }

  displayReadLaterBtn = (id, is_future_saved) => {
    if (is_future_saved === true ){
      return (
        <SubmitButton
          title={'Remove Read Later'}
          onPress={()=>this.deleteReadLater(id)}
          titleStyle={styles.btnText}
          btnStyle = {styles.btnReadLate}
        />

      )
    }
    else{
      return(
        <SubmitButton
          title={'Read Later'}
          onPress={()=>this.handleAddReadLater(id)}
          titleStyle={styles.btnText}
          btnStyle = {styles.btnReadLate}
        />
      )
    }
  }
  displayfavoriteBtn = (id, is_favorite) => {
    if (is_favorite === true ){
      return (
        <SubmitButton
          title={'Remove Favourite'}
          onPress={()=>this.deleteFavorite(id)}
          // onPress={()=>this.handleAddFavourite(item.id)}
          titleStyle={styles.btnText}
          btnStyle = {styles.btnStyle}
        />

      )
    }
    else{
      return(
        <SubmitButton
          title={'Add Favourite'}
          onPress={()=>this.handleAddFavourite(id)}
          titleStyle={styles.btnText}
          btnStyle = {styles.btnStyle}
        />
      )
    }
  }
  deleteFavorite=async(id)=> {
    console.log({deleteiddd: id})
    const { token } = this.state
    this.showLoadingDialogue();

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
      console.log({responssssss: res});
      if(res.status >= 200 && res.status < 300) {
        // this.handleGetReadLater();
        return await this.showNotification('Successfully Removed Favorite');   

      }
      return await this.showNotification(res.message.toString());   
    } 
    catch(error){
     return this.showNotification(error.toString()); 
    }

  }
  deleteReadLater=async(id)=> {
    const { token } = this.state
    let endpoint = `${DeleteReadLaterEndpoint}${id}/${'future'}`      
    this.showLoadingDialogue();

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
      let res = await response.json();
      console.log({res})
      if(res.status >= 200 && res.status < 300) {
        return await this.showNotification('Successfully Removed Report from Read Later');   
      }
      return await this.showNotification(res.message.toString());   
    } 
    catch(error){
     return this.showNotification(error.toString()); 
    }
  }
  renderHeader = () => {
    return <View style={styles.headerMessageView}>
        <View style={styles.searchView}>
          <Image
            source = {require('../../assets/images/search.png')}
            style = {StyleSheet.flatten(styles.searchIcon)}
          />
          <InputField
            placeholder = {'Search Anything'}
            placeholderTextColor = {theme.primaryTextColor}
            textColor={colors.purple}
            inputType={'name'}
            keyboardType={'default'}
            onChangeText={text => this.searchFilterFunction(text)}
            autoCorrect={false}
            value={this.state.value}
            height = {30}
            width = {'80%'}
            borderBottomWidth = {0}
            paddingLeft  = {8}
          /> 
        </View>
      </View>
  
  }
  renderRow = ({item}) => {
    return (
       <View style = {styles.listViewItem}>    
        <TouchableOpacity 
          onPress = {()=>this.handleFullReport(item)}
          style = {styles.cardView}>
          <View style ={styles.reportHeader}>
            <DisplayText
              numberOfLines = { 2 } 
              ellipsizeMode = 'middle'
              text = {item.title}
              onPress = {()=>this.handleFullReport(item)}
              styles = {StyleSheet.flatten(styles.reportName)}
            />

            <DisplayText
              numberOfLines = { 2 } 
              ellipsizeMode = 'middle'
              text = {item.citation}
              onPress = {()=>this.handleFullReport(item)}
              styles = {StyleSheet.flatten(styles.headerText)}
            />

            <DisplayText
              numberOfLines = { 2 } 
              // ellipsizeMode = 'middle'
              text = {''}
              onPress = {()=>this.handleFullReport(item)}
              styles = {StyleSheet.flatten(styles.headerText)}
            /> 

             <DisplayText
              numberOfLines = { 4 } 
              ellipsizeMode = 'middle'
              text = {'Little Description needed'}
              onPress = {()=>this.handleFullReport(item)}
              styles = {StyleSheet.flatten(styles.reportInfo)}
            />

            {/* <HTML html={item.excerpt} /> */}

          <View style = {styles.txtView}>
           
            <View style={styles.buttonView}>
              {this.displayfavoriteBtn(item.id, item.is_favorite)}
              {this.displayReadLaterBtn(item.id, item.is_future_saved)}
            </View> 
          </View>
          </View>
        </TouchableOpacity>
        
        </View>
      );
  }


  render () {
    const {
      showLoading, 
      title, 
      message, 
      showAlert, } = this.state;
   return(
    <SafeAreaView style={styles.container}> 
       <StatusBar barStyle="default"/>
       
       <View style = {styles.viewBody}>
        <FlatList          
          data={this.state.data}          
          renderItem={this.renderRow}          
          ListHeaderComponent={this.renderHeader}     
          keyExtractor={ data=> data.id.toString()}   
          showsVerticalScrollIndicator={false}
        />
        <View style = {styles.taostView}>
          <CustomToast ref = "defaultToastBottom" backgroundColor='#4CAF50' position = "bottom"/>          
        </View> 
      </View>  
      <ProgressDialog
        visible={showLoading}
        title="Processing"
        message="Please wait..."
      />
      <SingleButtonAlert
        title = {title} 
        message = {message}
        handleCloseNotification = {this.handleCloseNotification}
        visible = {showAlert}
      />
    </SafeAreaView>
    )
  }
} 
