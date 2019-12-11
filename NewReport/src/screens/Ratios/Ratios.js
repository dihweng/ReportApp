'use strict';
import React, {Component} from 'react';
import { View, SafeAreaView, ScrollView,StatusBar, Image,TouchableOpacity, StyleSheet,} from 'react-native';
import styles from './styles';
import {  getProfile, GetReportEndpoint } from '../Utils/Utils';
import { ProgressDialog } from 'react-native-simple-dialogs';
import {DisplayText, SingleButtonAlert} from '../../components';
import DropdownAlert from 'react-native-dropdownalert';

export default class Ratios extends Component {
  constructor(props) {
    super(props);
    this.state ={
      showAlert : false,
      showLoading : false,
      message: '',
      title: '',
      reportTitle: '',
      citation: '',
      excerpt: '',
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
  handleGetReport = async() => {
    const{navigation} = this.props;
    let reportId = await navigation.getParam('id');
    return await this.getReportById(reportId);
      
  }
  getReportById = async(reportId)=> {
    await this.showLoadingDialogue();
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
          excerpt:res.data.excerpt,
          reportTitle: res.data.title
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
 

  render () {
    const { title, message, showAlert, showLoading, reportTitle, citation, excerpt } = this.state
    
    return(
      <SafeAreaView style={styles.container}> 
        <StatusBar barStyle="default" /> 
        <View style = {styles.navBar}>
          <TouchableOpacity
            onPress={this.handleOnBackPress.bind(this)} 
            style = {styles.headerImage}>
            <Image
              onPress={this.handleOnBackPress.bind(this)} 
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
            style = {styles.customTabTp2}>
              <DisplayText
              text={'Full Report'}
              onPress = {this.handleFullReport}  
              styles = {StyleSheet.flatten(styles.txtTabHeader)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress = {this.handleRatio}  
            style = {styles.customTabTp}>
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
          style={{flex:1, paddingHorizontal: 16}}
          showsVerticalScrollIndicator={false}>
            <DisplayText
              numberOfLines = { 2 } 
              ellipsizeMode = 'middle'
              text = {reportTitle}
              onPress = {()=>this.handleFullReport(item.id)}
              styles = {StyleSheet.flatten(styles.reportName)}
            />

            <DisplayText
              numberOfLines = { 2 } 
              ellipsizeMode = 'middle'
              text = {citation}
              onPress = {()=>this.handleFullReport(item.id)}
              styles = {StyleSheet.flatten(styles.headerText)}
            />
            <DisplayText
              text = {excerpt}
              onPress = {()=>this.handleFullReport(item.id)}
              styles = {StyleSheet.flatten(styles.text)}
            />
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
