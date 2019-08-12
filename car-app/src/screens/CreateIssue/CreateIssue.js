
'use strict';
import React, {Component} from 'react';
import { View, FlatList, SafeAreaView, StatusBar, Image, TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, SubmitButton, SingleButtonAlert, InputField} from '../../components';
import styles from './styles';
import colors from '../../assets/colors';
import { ProgressDialog } from 'react-native-simple-dialogs';
import { postWithToken, CreateSupport, getProfile, AllListofSupport } from '../Utils/Utils';

export default class CreateIssue extends Component {
  constructor(props) {
    super(props);
    this.state ={
      token : '',
      showAlert : false,
      message : '',
      title : '',
      showAlert : false,
      showLoading : false,
      messageIssue : '',
      isValidIssue : false,
      userId : ''
    }
  }


  async componentDidMount(){
    let profile = await getProfile();

    this.setState({
      token : profile.access_token,
    });
    
    
  }
  handleBack = () => {
    return this.props.navigation.goBack();
  }
   // Show Loading Spinner
   showLoadingDialogue =()=> {
    this.setState({
      showLoading: true,
    });
  }
// Hide Loading Spinner
  hideLoadingDialogue =()=> {
    this.setState({
      showLoading: false,
    });
  }
// Show Dialog message
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
       showAlert : false
     })
  }

  handleCreateTicket = () => {
    const {messageIssue, token} = this.state;

    this.setState({
      showLoading : true
    });

    let data = { 
      'subject': messageIssue,
      'channel': 'Report Error'
      };

    postWithToken (CreateSupport, data, token)
    .then((res) => {
      if (typeof res.message !== 'undefined' ) {  
        return  this.setState({ 
          showLoading : false,
          title : 'Alert',
          message : res.message,
          showAlert : true,
        }); 
      }
      else {
        this.setState({ 
          showLoading : false, 
        });   
        return this.props.navigation.navigate('Message', {
          'id' : res.data.id
        });

      }
    });
  }



  handleaIssueChange = (issue) => {
    if(issue.length > 0) {
      this.setState({
        isValidIssue: true,
        messageIssue : issue,
      });
    }
    else {
      if (issue.length < 1) {
        this.setState({
          isValidIssue : false
        });
      }
    }
  }

  toggleButtonState = () => {
    const { isValidIssue } = this.state;
          
    if ( isValidIssue ) {
      return true;
    } 
    else {
      return false;
    }
  }


  render () {
    const { showAlert, showLoading, message, title} = this.state;
   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar barStyle="default" /> 
        <View style = {styles.navBar}>
          <TouchableOpacity 
            onPress={this.handleBack} 
            style = {styles.headerImage}>
            <Image
              onPress={this.handleBack} 
              source = {require('../../assets/images/back.png')}
              style = {StyleSheet.flatten(styles.headerIcon)}
            />
          </TouchableOpacity>
          <View style = {styles.nameView}>
            
            <DisplayText
              text={'Support Desk'}
              styles = {StyleSheet.flatten(styles.txtHeader)}
            />
          </View>
        </View> 
      <View style ={styles.supportViewBody}>
        <View style = {styles.inputView}>
        <DisplayText
          styles={StyleSheet.flatten(styles.textIssues)}
          text = {'Have an issue,'}
        /> 
        <DisplayText
          styles={StyleSheet.flatten(styles.textIssues)}
          text = {'Create a ticket to talk to support'}
        /> 
        <View style = {styles.formView}>
          <DisplayText
            text={'Any Issue?'}
            styles = {styles.formHeaderTxt}
          />
          <InputField
            textColor={colors.darkGray}
            inputType={'name'}
            keyboardType={'default'}
            onChangeText = {this.handleaIssueChange}
            autoCapitalize = "none"
            height = {40}
            borderWidth = {0.5}
            borderColor={colors.darkSilver}
            borderRadius={4}
            paddingLeft = {8}

          />
        </View>
        <View>
          {/* Flatlist here */}
        </View>
        </View> 
          <View style = {styles.btnView}>
            <SubmitButton
              title={'Create Ticket'}
              disabled={!this.toggleButtonState()}
              onPress={this.handleCreateTicket}
              titleStyle={styles.btnText}
              btnStyle = {styles.btnStyle}
            />
            <ProgressDialog
              visible={showLoading}
              title="Processing"
              message="Please wait..."/>
            <SingleButtonAlert
              title = {title} 
              message = {message}
              handleCloseNotification = {this.handleCloseNotification}
              visible = {showAlert}
            />
    
          </View> 
      </View>
    </SafeAreaView>
    
   )
  }
} 
