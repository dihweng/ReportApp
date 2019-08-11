'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image,TouchableOpacity, StyleSheet,} from 'react-native';
import styles from './styles';
import HTML from 'react-native-render-html';
import { ProgressDialog } from 'react-native-simple-dialogs';
import {DisplayText, SingleButtonAlert} from '../../components';
import {  getProfile, GetReportEndpoint } from '../Utils/Utils';

export default class FullReport extends Component {
  constructor(props) {
    super(props);
    this.state ={
      token: '',
      showAlert: false,
      message: '',
      showLoading: false,
      title: '',
      content: '',
    }

  }
  async componentDidMount(){
    let profile = await getProfile();
    await this.setState({
      token : profile.access_token,
      expires : profile.expires,
      showLoading:true,
    });
    await this.handleGetReport();
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
  
  handleGetReport = async() => {
    const{navigation} = this.props;
    let reportId = await navigation.getParam('id');
    return await this.getReportById(reportId);
      
  }

  getReportById = async(reportId)=> {

    const {token} = this.state;
    let endpoint = `${GetReportEndpoint}${reportId}`;
    console.log({endpoint})
     const  settings ={
      method : "GET",
      headers : {
        "Accept" : "application/json",
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    }

    try {

      let response = await fetch(endpoint, settings);
      let res = await response.json();
      console.log({res})
      // if (res.status >= 200 && res.status < 300) {
       
      //   let targetPost = await data[index];
      //   targetPost.is_favorite =  await !targetPost.is_favorite;
      //   await this.setState({ data });
      //   return await this.showNotification('Report Added To Favorite', 'Success');
        
      // }
      // else {
      //   return this.showNotification('Report Could Not be Added to Favorite',  'Message');
      // }

    }
    catch(error) {
      return this.showNotification(error.toString(), 'Message');
    }
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

  handleCloseNotification = () => {
    return this.setState({
       showAlert : false,
     })
  }


  handleRatio = () => {
    return this.props.navigation.navigate('Ratios');
  }
  handleFullReport = () => {
    return this.props.navigation.navigate('FullReport');
  }
  handleCitedAuthorities = () =>{
    return this.props.navigation.navigate('CitedAuthorities')
  }
  
  handleOnBackPress = () => {
    this.props.navigation.navigate('DashBoard');
  };
 
  handleConfirm = () => {
    alert('confirm coming soon');
  }

  

  render () {
    const { title, message, showAlert, showLoading, content } = this.state

    return(
      <SafeAreaView style={styles.container}> 
        <StatusBar barStyle="default" /> 
        <View style = {styles.navBar}>
          <TouchableOpacity
            onPress={this.handleOnBackPress} 
            style = {styles.headerImage}>
            <Image
              onPress={this.handleOnBackPress} 
              source = {require('../../assets/images/back.png')}
              style = {StyleSheet.flatten(styles.headerIcon)}
            />
          </TouchableOpacity>
          <View style = {styles.nameView}>
            <DisplayText
              text={'Title Name'}
              styles = {StyleSheet.flatten(styles.txtHeader)}
            />
          </View>
        </View> 
        <View style = {styles.cards}>
          <TouchableOpacity
            onPress = {this.handleFullReport}  
            style = {styles.customTabTp}>
              <DisplayText
              text={'Full Report'}
              onPress = {this.handleFullReport}  
              styles = {StyleSheet.flatten(styles.txtTabHeader)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress = {this.handleRatio}  
            style = {styles.customTabTp2}>
              <DisplayText
              text={'Ratio'}
              onPress = {this.handleRatio}  
              styles = {StyleSheet.flatten(styles.txtTabHeader)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress = {this.handleCitedAuthorities}  
            style = {styles.customTabTp2}>
              <DisplayText
              text={'Cited Authorities'}
              onPress = {this.handleCitedAuthorities}  
              styles = {StyleSheet.flatten(styles.txtTabHeader)}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{flex:1, paddingHorizontal: 8}}
          showsVerticalScrollIndicator={false}>
            <HTML html={content} />
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
      </SafeAreaView> 
    )
  }
} 
