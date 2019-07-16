'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, KeyboardAvoidingView, StyleSheet,} from 'react-native';
import {DisplayText, InputField, SubmitButton,SingleButtonAlert} from '../../components';
import styles from './styles';
import colors from '../../assets/colors'
import { ChangePhone, postRoute, isPhoneValid } from '../Utils/Utils';
import { ProgressDialog } from 'react-native-simple-dialogs';



export default class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state ={
      showAlert : false,
      showLoading : '',
      message : '',
      title : '',
      isValidPhoneNumber: false,
      phone: '',
    }
  }

  handleChangePassword = () => {
    const { email } = this.state;

    if(!isPhoneValid(phone)){
      return this.setState({
        showAlert: true,
        message: 'Invalid Email Address',
        title: 'Alert',
      });
    }
    this.setState({
      showLoading : true,
    });
    const body = JSON.stringify({
      'email' : email,
    });
    postRoute(ChangePhone, body)
      .then((res) => {
        console.log({responses: res})
        if (typeof res.message !== 'undefined' || typeof res.message === 'The given data was invalid') {  
          return  this.setState({ 
            showLoading : false,
            title : 'Alert',
            message : res.message,
            showAlert : true,
          }); 
        }
        else {
          console.log({residdddd : res})
          this.setState({ 
            showLoading : false, 
          }); 
          this.props.navigation.navigate('Home');
        }
      });
  }

  handlePhoneChange = (text) => {
    if(text.length > 0) {
      this.setState({
        isValidPhoneNumber: true,
        phone : text
      });
    }
    else {
      if (text.length < 1) {
        this.setState({
          isValidPhoneNumber : false
        });
      }
    }
  }
  handleResetPassword = () => {
    return this.props.navigation.navigate('CreateNewPassword')
  }
  handleBackToLogin = () => {
    return this.props.navigation.navigate('Home')
  }

  handleCloseNotification = () => {
    return this.setState({
      showAlert : false
    });
  }

  render () {
    const {showAlert, showLoading, message, title } = this.state;

    return(
      <SafeAreaView style={styles.container}> 
        <StatusBar barStyle="default" /> 
          <View style = {styles.greenTopView}>
            <Image
              source={require('../../assets/images/lock_Icon.png')}
              style={StyleSheet.flatten(styles.lockIcon)}/> 
          </View>
          <View style = {styles.traingleView}>
            <View style = {styles.triangleShape}></View>
          </View>
         
          <KeyboardAvoidingView
            style={styles.wrapper}
            behavior = 'padding'> 
            <ScrollView
              style={{flex:1,}}
              showsVerticalScrollIndicator={false}>
               <View style = {styles.textView}>
                <DisplayText
                  text={'Forget Password'}
                  styles = {styles.ForgetTxt}
                />
                <DisplayText
                  text={'We Just JNeed Your Phone Number'}
                  styles = {styles.msgText}
                />
                <DisplayText
                  text={'To Send Your Verification Number '}
                  styles = {styles.msgText2}
                />
              </View>
              <View style = {styles.inputView}>
                <InputField
                  placeholder ={'Phone Number'}
                  placeholderTextColor = {colors.text}
                  textColor={colors.green_background}
                  inputType={'phone'}
                  onChangeText = {this.handlePhoneChange}
                  autoCapitalize = "none"
                  height = {40}
                  // width = {'70%'}
                  borderWidth = {1}
                  borderColor={colors.textInput_border}
                  borderRadius = {4}
                  paddingLeft = {8}
                /> 
                <SubmitButton
                  title={'Reset Password'}
                  onPress = {this.handleChangePassword}
                  btnStyle = {styles.buttonBorder}
                  titleStyle={styles.btnText}
                />
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
          <View style = {styles.footerView} >
            <Image
              source={require('../../assets/images/footer.png')}
              style={StyleSheet.flatten(styles.footerIcon)}/>   
        </View>          
      </SafeAreaView>
    )
  }
} 
