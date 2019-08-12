'use strict';
import React, {Component} from 'react';
import { View, SafeAreaView, StatusBar, FlatList, Image,TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, SingleButtonAlert, SubmitButton } from '../../components';
import styles from './styles';
import { ProgressDialog } from 'react-native-simple-dialogs';
import DropdownAlert from 'react-native-dropdownalert';

import { 
  DeleteFavoriteEndpoint, 
  DeleteReadLaterEndpoint, 
  getRouteToken, 
  getAllReport,
  getProfile, 
  AddReadLaterEndPoint, 
  getSubscription,
  AddFavoriteEndPoint, 
  subscription} from '../Utils/Utils';



export default class DivisionDetails extends Component {
  constructor(props) {
    super(props);
    this.state ={
      data: [],
      showAlert: false,
      showLoading: false,
      message: '',
      title: '',
      id: '',
      token: '',
      name: '',
      isActive: false,
    }
  }
  async componentDidMount(){
    let profile = await getProfile();
    let subscription = await getSubscription();
    const {navigation} = this.props,
      id = navigation.getParam('id'),
      name = navigation.getParam('name');

    await this.setState({
      token: profile.access_token,
      expires: profile.expires,
      isActive:subscription,
      id,
      name,
    });
    
    await this.handleGetAllReport();
  
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

  showNotification = (type, title, message,) => {
    this.hideLoadingDialogue();
    return this.dropDownAlertRef.alertWithType(type, title, message);
  }

  handleCloseNotification = () => {
    return this.setState({
       showAlert : false,
     })
  }
  allReport = async() =>{
    const {token, id} = this.state; 
    let endPoint = `${getAllReport}${'?'}${'division_id='}${id}`;
    this.showLoadingDialogue();
    await getRouteToken(endPoint, token)
      .then((res) => {
        if(typeof res.data !== 'undefined' ) {
          if(res.data.length) {
            this.setState({
              data: res.data,
            });
            return this.hideLoadingDialogue();
          }
          else {
            this.showNotification('error', 'Message', 'No Report Found');
            return setTimeout(()=>{
              this.handleCloseNotification();
              return this.props.navigation.goBack();
            }, 3000);
          }
        }
        this.showNotification('error', 'Message', res.message);
        return setTimeout(()=>{
          this.handleCloseNotification();
          return this.props.navigation.goBack();
        }, 3000);
      }).catch(error =>this.showNotification('error', 'Message', error.toString()));
  }
  handleGetAllReport = async() => {
    this.showLoadingDialogue();

    try {
      await this.allReport()
    }
    catch(error) {
     return this.showNotification('error', 'Message', error.toString());
    }
  }

  handleFullReport=async(item)=>{
    if(this.state.isActive === false) {
      await this.showNotification('error', 'Message', 'Please Subscribe to have Full Access');
      return await setTimeout(() => {
        this.props.navigation.navigate('Subscription');
      }, 3000);    
    }
    else {
       await this.props.navigation.navigate('FullReport', {
        id: item.id, 
      });
    }
  }

  handleGoBack = () => {
    return this.props.navigation.goBack();
  }

  addDeleteReadlater = async(id, title, index) =>{
    if(this.state.isActive === false) {
      await this.showNotification('error', 'Message', 'Please Subscribe to have Full Access');
      return await setTimeout(() => {
        this.props.navigation.navigate('Subscription');
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
      this.showNotification('error', 'Message', error.toString());
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
        return await this.showNotification('error', 'Message', 'Failed to Add Report');
      }
    }
    catch(error) {
      this.showNotification('error', 'Message', error.toString());
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
      this.showNotification('error', 'Message', error.toString());
    }
  }

  addDeleteFavorite = async(id, title, index) =>{
    if(this.state.isActive === false) {
      await this.showNotification('error', 'Message', 'Please Subscribe to have Full Access');
      return await setTimeout(() => {
        this.props.navigation.navigate('Subscription');
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
        return await  this.showNotification('error', 'Message', 'Failed to Add Favorite');
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
      }
       return await this.showNotification('error', 'Message', 'Failed to Remove Report');
    } 
    catch(error){
      return this.showNotification('error', 'Message', error.toString());
    }
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
    const { showLoading, name} = this.state;
   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar barStyle="default" /> 
        <View style = {styles.navBar}>
          <TouchableOpacity 
            onPress = {this.handleGoBack}
            style = {styles.headerImage}>
            <Image
              onPress = {this.handleG0Back}
              source = {require('../../assets/images/back.png')}
              style = {StyleSheet.flatten(styles.headerIcon)}
            />
          </TouchableOpacity>
          <View style = {styles.nameView}>
            <DisplayText
              text={'Division'}
              styles = {StyleSheet.flatten(styles.txtHeader)}/>
          </View>
        </View> 
      <View style = {styles.viewBody}>
        <View style = {styles.cards}>
          <TouchableOpacity
            onPress = {this.handleGoBack} 
            style = {styles.angleView}>
            <Image
              onPress = {this.handleGoBack}
              source = {require('../../assets/images/angle_back.png')}
              style = {StyleSheet.flatten(styles.angleBack)}
            />
          </TouchableOpacity>
          <View style ={styles.verticcalLine}></View>

          <View style = { styles.viewText}>
            <DisplayText
              text={name}
              styles = {StyleSheet.flatten(styles.categoryName)}
            />
          </View>
        </View>
        {/* <View style = {styles.viewBody}> */}
          <FlatList          
            data={this.state.data}      
            renderItem={this.renderRow}   
            extraData={this.state}       
            keyExtractor={ data=> data.id.toString()}   
            showsVerticalScrollIndicator={false}
          />
        {/* </View>   */}
      </View>  
       
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
