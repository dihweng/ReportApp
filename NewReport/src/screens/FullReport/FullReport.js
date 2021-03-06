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
      excerpt:'',
      id: '',
    }
  }
  async componentDidMount(){
    let profile = await getProfile();
    await this.setState({
      token : profile.access_token,
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

  showNotification = (message, title) => {
    this.setState({ 
      showLoading : false,
      title : title,
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
      if (res.data) {
         await this.setState({
          content:res.data.content,
          id:res.data.id,
          excerpt:res.data.excerpt
        });
        return await this.hideLoadingDialogue();
      }
      else {
        return await this.showNotification(res.message,  'Message');
      }
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


  handleRatio = async() => {
    const { id } = this.state
    return await this.props.navigation.navigate('Ratios', {
      id: id,
    });
  }
  handleFullReport = () => {
    return this.props.navigation.navigate('FullReport');
  }
  handleCitedAuthorities = () =>{
    const { id } = this.state
    return this.props.navigation.navigate('CitedAuthorities', {
      id: id
    })
  }
  
  handleOnBackPress = () => {
    this.props.navigation.navigate('DashBoard');
  };
  

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
          { content !== '' ?  <HTML html={content} /> : null}
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
