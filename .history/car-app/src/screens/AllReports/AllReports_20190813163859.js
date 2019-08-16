'use strict';
import React, {Component} from 'react';
import { View, FlatList, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, Image, StyleSheet,} from 'react-native';
import {DisplayText, SubmitButton, SingleButtonAlert, InputField,CustomToast} from '../../components';
import styles from './styles';
import theme from '../../assets/theme';
import { DeleteFavoriteEndpoint, DeleteReadLaterEndpoint, getRouteToken, getAllReport, getProfile, 
  ProfileEndpoint, saveUserDetail, AddReadLaterEndPoint, AddFavoriteEndPoint, subscription } from '../Utils/Utils';
import { ProgressDialog } from 'react-native-simple-dialogs';
import colors from '../../assets/colors';
import {connect} from 'react-redux';
import { setProfile } from '../../redux/actions/ProfileActions';
import DropdownAlert from 'react-native-dropdownalert';

 class AllReports extends Component {
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
      isFetching: false,
      restoring:true,
      isActive:false,

    }
  }

  async componentDidMount(){

    let profile = await getProfile();
    this.setState({
      token : profile.access_token,
      expires : profile.expires,
      showLoading:true,
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
      restoring: false,
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

  onRefresh() {
    this.setState({ isFetching: true }, function() {
      this.handleGetAllReport();
    });
  }

  allReport = async() =>{
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
            isFetching: false 
          });
          return this.hideLoadingDialogue();
        }
      }
    ).catch(error=>this.showNotification('error', 'Message', error.toString()));
  
  }

  handleGetAllReport = async() => {
    try {
      return await this.allReport()
    }
    catch(error) {
      return this.showNotification('error', 'Message', error.toString());
    }
  }

  handleGetProfile = async() => {
    const{token} = this.state;
    let status = 'expired';
    await getRouteToken(ProfileEndpoint, token)
      .then((res) => {
        if (typeof res.message !== 'undefined') {  
          return this.showNotification('error', 'Message', res.message);
        }
  
        else {
          saveUserDetail(res.data, token);
          this.props.setProfile(res.data);
          if(res.data.subscription !== null){
            status = res.data.subscription.status;     
          }
          this.setState({
            isActive : status == 'active' ? true : false,
          }); 
          subscription(status);
          return this.handleGetAllReport();
        }
      })
    .catch((error) => {
      return this.showNotification('error', 'Message', error.toString());
    });
  }


  handleFullReport = async(id)=>{
    if(this.state.isActive === true) {
      return await this.props.navigation.navigate('FullReport', {id});
    }
    else {
       await this.showNotification('error', 'Message', 'Please Subscribe to have Full Access');
       return await setTimeout(() => {
         this.props.navigation.navigate('ManageSubscription');
       }, 3000);
      

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
        return this.showNotification('success', 'Success', 'Report Added to Favorite');

      }
      else {
        return this.showNotification('error', 'Message', 'Failed To Add Report');
      }

    }
    catch(error) {
      return this.showNotification('error', 'Message', error.toString());
    }
  } 
  // Called onPress to add favorite to list of favorite 
  handleAddFavorite = async(id, index) =>{
    try {
    return await this.addFavorite(id, index)
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
        return this.showNotification('success', 'Success', 'Report Added Successfully');

      }
      else {
        return this.showNotification('error', 'Message', 'Failed to Add Report');
      }
    }
    catch(error) {
      return this.showNotification('error', 'Message', error.toString());
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
        return this.showNotification('success', 'Success', 'Report removal successful');

      }
      return this.showNotification('error', 'Message', 'Failed to Remove Report');
    } 
    catch(error){
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
        return this.showNotification('success', 'Success', 'Report Removal Successful');

      }
      return this.showNotification('error', 'Message', 'Failed to Remove Report');
    } 
    catch(error){
      return this.showNotification('error', 'Message', error.toString());
    }
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

  addDeleteFavorite = async(id, title, index) =>{
    if(this.state.isActive === false) {
       await this.showNotification('error', 'Message', 'Please Subscribe to have Full Access');
      return await setTimeout(() => {
        this.props.navigation.navigate('ManageSubscription');
      }, 3000);    
    }
    else {
      this.showLoadingDialogue();
      if(title.includes('Remove')) {
        return await this.deleteFavorite(id, index);
      }
      else {
        return await this.handleAddFavorite(id, index);
      }
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
              <SubmitButton
                title={read_later_button_text}
                onPress={()=>this.addDeleteReadlater(item.id, read_later_button_text, index)}
                titleStyle={styles.btnText}
                btnStyle = {styles.btnReadLate}
              />
            </View> 
          {/* </View> */}
        </TouchableOpacity>
      </View>
    );
  }


  render () {
    const { showLoading, title,  message, showAlert, restoring } = this.state;
    return(
      <SafeAreaView style={styles.container}> 
       <StatusBar barStyle="default"/>
       <ScrollView style={styles.containerScroll}>

        <View style = {styles.viewBody}>
          <FlatList   
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}       
            data={this.state.data}      
            extraData={this.state}    
            renderItem={this.renderRow}          
            ListHeaderComponent={this.renderHeader}     
            keyExtractor={ data=> data.id.toString()}   
            showsVerticalScrollIndicator={false}
          />

        </View>  
      </ScrollView>
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
      <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
      
    </SafeAreaView>
    )
  }
} 

const mapStateToProps = (state, ownProps) =>{
  return{
    profile: state.ProfileReducer.profile
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    setProfile: (data) =>{dispatch(setProfile(data))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllReports);

