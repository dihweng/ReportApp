'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, KeyboardAvoidingView, StyleSheet,} from 'react-native';
import {DisplayText, InputField, SubmitButton,} from '../../components';
import styles from './styles';
import colors from '../../assets/colors'
import { postRoute, ForgotPassword } from '../Utils/Utils';
import { ProgressDialog } from 'react-native-simple-dialogs';
import DropdownAlert from 'react-native-dropdownalert';


export default class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state ={
      showLoading : false,
      showAlert : false,
      title : '',
      message : '',
      isValidEmailAddress: false,
      email: '',
    }
  }


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

  toggleButtonState = () => {
    const { isValidEmailAddress } = this.state;
          
    if ( isValidEmailAddress) {
      return true;
    } 
    else {
      return false;
    }
  }

  showNotification = (type, title, message,) => {
    this.hideLoadingDialogue();
    return this.dropDownAlertRef.alertWithType(type, title, message);
  }

  handleForgetPassword = async() => {
    const { email } = this.state;
    this.setState({
      showLoading : true,
    });

    let body = await {
      'email' : email,
    }

    await postRoute(ForgotPassword, body)
      .then((res) => {
        console.log({res})
        if(typeof res.errors !== 'undefined') {
          const value = Object.values(res.errors);
          if (typeof res.message !== 'undefined') {  
            return this.showNotification('error', 'Message', value[0].toString());
          }   
        }  
        else {
           this.showNotification('success', 'Success', res.message);
           return setTimeout(()=>{
            this.props.navigation.navigate('Login');
           }, 3000);
        }
      });
    }

  handleCloseNotification = () => {
    return this.setState({
      showAlert : false
    });
  }

  handleEmailChange = (text) => {
    if(text.length > 0) {
      this.setState({
        isValidEmailAddress: true,
        email : text
      });
    }
    else {
      if (text.length < 1) {
        this.setState({
          isValidEmailAddress : false
        });
      }
    }
  }

  handleResetPassword = () => {
    return this.props.navigation.navigate('CreateNewPassword')
  }
  handleBackToLogin = () => {
    return this.props.navigation.navigate('Login')
  }

  render () {
    const {showLoading,} = this.state;
    return(
      <SafeAreaView style={styles.container}> 
        <StatusBar barStyle="default" /> 
          <View style = {styles.purpleTopView}>
            <Image
              source={require('../../assets/images/key.png')}
              style={StyleSheet.flatten(styles.lockIcon)}/> 
          </View>
         
          <KeyboardAvoidingView
            style={styles.wrapper}
            behavior = 'padding'> 
          <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />

            <ScrollView
              style={{flex:1,}}
              showsVerticalScrollIndicator={false}>
               <View style = {styles.textView}>
                <DisplayText
                  text={'Forget Password'}
                  styles = {styles.ForgetTxt}
                />
                <DisplayText
                  text={'We Just Need Your Emaill Address'}
                  styles = {styles.msgText}
                />
                <DisplayText
                  text={'To Send Your Password Reset Link '}
                  styles = {styles.msgText2}
                />
              </View>
              <View style = {styles.inputView}>
                <InputField
                  placeholder ={'Email Address'}
                  placeholderTextColor = {colors.text}
                  textColor={colors.green_background}
                  inputType={'name'}
                  keyboardType={'default'}
                  onChangeText = {this.handleEmailChange}
                  autoCapitalize = "none"
                  height = {40}
                  borderWidth = {1}
                  borderColor={colors.textInput_border}
                  borderRadius = {4}
                  paddingLeft = {8}
                /> 
                <SubmitButton
                  title={'Reset Password'}
                  onPress = {this.handleForgetPassword}
                  btnStyle = {styles.buttonBorder}
                  titleStyle={styles.btnText}
                  disabled={!this.toggleButtonState()}
                />

                <ProgressDialog
                  visible={showLoading}
                  title="Processing"
                  message="Please wait..."
                />
                  
                <View style = {styles.backView}>
                  <DisplayText
                    text={'<< '}
                    styles = {styles.carat}
                  />
                  <DisplayText
                    text={'Back to login page'}
                    styles = {styles.backTxt}
                    onPress = {this.handleBackToLogin}
                  />
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>         
      </SafeAreaView>
    )
  }
} 
