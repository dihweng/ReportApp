
'use strict';
import React, {Component} from 'react';
import { View, Modal, ScrollView, TouchableHighlight,Text,SafeAreaView, StatusBar, Image, TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, SubmitButton, SingleButtonAlert, InputField} from '../../components';
import styles from './styles';
import colors from '../../assets/colors';
import { ProgressDialog } from 'react-native-simple-dialogs';
import { postWithToken, CreateSupport, getProfile, } from '../Utils/Utils';
import {Input, Icon} from 'native-base'
import DropdownAlert from 'react-native-dropdownalert';

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
      userId: '',
      channel: 'Payment',
      channelModalVisible: false,
      isValidChannel: false

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
  showNotification = (type, title, message,) => {
  this.hideLoadingDialogue();
  return this.dropDownAlertRef.alertWithType(type, title, message);
}

  handleCloseNotification = () => {
    return this.setState({
       showAlert : false
     })
  }
  setChannelPicker = (newValue) => {
    this.setState({
      channel: newValue,
      isValidChannel: true
    });
    this.closeChannelModal();
  }

  handleChannel = () => {
    this.toggleChannelModal(true);
  };

  toggleChannelModal = (visible) => {
    this.setState({ channelModalVisible : visible });
  };

  closeChannelModal = () => {
    this.toggleChannelModal(!this.state.channelModalVisible);
  };

  

  handleCreateTicket = async() => {
    const {messageIssue, channel, token} = this.state;

    await this.showLoadingDialogue();

    let data = { 
      'subject': messageIssue,
      'channel': channel,
      };

    await postWithToken (CreateSupport, data, token)
    .then((res) => {
      if (typeof res.message !== 'undefined' ) {  
        return this.showNotification('error', 'Message', res.message);
      }
      else {
       this.hideLoadingDialogue(); 
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
    const pickerChannel = [
      {title: 'Payments', value: 'Payments'},
      {title: 'Report', value: 'Report'},
      {title: 'Subscriptions', value: 'Subscriptions'},
      {title: 'Suggestions', value: 'Suggestions'},
      {title: 'Others', value: 'Others'},

    ];
    const { showAlert, showLoading, message, title, channel} = this.state;
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
        <View style = {styles.formContainer}>
          <DisplayText
            text={'Channel *'}
            styles = {styles.formHeaderTxt}
          />
          <TouchableOpacity 
            underlayColor={colors.white}
            onPress = {this.handleChannel}
            style = {styles.textBoder}>
            <View style = {styles.viewTxtChannel}>
              <Text style = {styles.channelTxt}>
                {channel}
              </Text>
              <Icon
                active
                name='md-arrow-dropdown'
                style={styles.iconStyle}
              />
            </View>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible = {this.state.channelModalVisible}
          onRequestClose={() => {console.log('Request was closed')}}>
          <View style={styles.modalContainer}> 
            <View style={styles.modalStyle}>
              <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 16}}>
                <View style={{ justifyContent: 'center'}}>
                  <DisplayText
                    style={styles.textHeaderStyle}
                    text ={'Channel'} 
                    />
                    {pickerChannel.map((value, index) => {
                      return <TouchableHighlight key={index} onPress={() => this.setChannelPicker(value.value)}>
                        <Text style={styles.modalTxt}>{value.title}</Text>
                      </TouchableHighlight>;
                    })
                    }                    
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>
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
