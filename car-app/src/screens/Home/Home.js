'use strict';
import React, {Component} from 'react';
import { View, StyleSheet, StatusBar,TouchableOpacity, SafeAreaView, Image, KeyboardAvoidingView,Switch } from 'react-native';
import {DisplayText, InputField, SingleButtonAlert,SubmitButton} from '../../components';
import styles, { IMAGE_HEIGHT, }  from './styles';
import { getProfile, LoginEndpoint, postRoute, isPhoneValid, saveProfile} from '../Utils/Utils';
import colors from '../../assets/colors';
import { ProgressDialog } from 'react-native-simple-dialogs';
import theme from '../../assets/theme';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state ={
      restoring : true,
      isPhoneNumberValid: false,
      isPasswordValid: false,
      showAlert: false,
      showLoading: false,
      title: '',
      message: '', 
      phone: '',
      password: '',
      switchValue: true,
      session : '',
      isEmailFocused:false,
      isPasswordFocused:false,
      
    }
  }

  componentWillMount(){
    this.checkLogin();    
  }

  checkLogin =  async() => {
    let profile = await getProfile();
    console.log({profilessss: profile})
    if(typeof profile.expires !== 'undefined' && profile.expires !== null ) {
      this.setState({
        restoring : false,
      });
      return this.props.navigation.navigate('Navigations');
    }
    else {
      this.setState({
        restoring : false,
      });
    }
  }

  handleSignIn = () => {
    const { email, password } = this.state,
      grant_type = 'password',
      client_id = '2',
      client_secret = 'pHixEbVKUcIuI3vKKcA2sz2tEOEdnfMJ3dwusOiX';
      
    this.setState({
      showLoading: true,
    });
    let data = JSON.stringify({
      'username' : email, 
      'password' : password,
      'grant_type' : grant_type,
      'client_id' : client_id,
      'client_secret' : client_secret,
      'scope' : '*',
    });
    postRoute (LoginEndpoint, data)
      .then((res) => {
        console.log({helloError: res})

        if (typeof res.message !== 'undefined' ) {  
          return  this.setState({ 
            showLoading : false,
            title : 'Alert',
            message : res.message,
            showAlert : true,
          }); 
        }
        else {
          console.log('getResponse: ', res);
          let access_token = res.access_token,
            expires = res.expires_in,
            refresh_token = res.refresh_token;
          this.setState({ 
            showLoading : false, 
          }); 
          if (this._handleToggleSwitch() === true ) {
            saveProfile(
              access_token, 
              refresh_token, 
              expires, 
            );
            this.props.navigation.navigate('Navigations');
          }
          else {
            saveProfile(
              access_token, 
              refresh_token,    
            );
          this.props.navigation.navigate('Navigations');            
          }
        }
      });
  }

  _handleToggleSwitch = () =>{
    this.setState(state => ({
      switchValue: !state.switchValue,
    }));
  }

  handlePhoneChange = (phone) => {
    if(phone.length > 0) {
      this.setState({
        isPhoneNumberValid: true,
        phone : phone
      });
    }
    else {
      if (phone.length < 1) {
        this.setState({
          isPhoneNumberValid : false
        });
      }
    }
  }

  handlePasswordChange = (password) => {
    if (password.length > 0) {
      this.setState({
        isPasswordValid : true,
        password: password
      });
    }
    else {
      if ( password.length < 1 ) {
        this.setState({
          isPasswordValid : false
        })
      }
    }
  }

  handleRegistration = () => {
    return this.props.navigation.navigate('Register');
  };

  handleForgetPassword = () => {
    return this.props.navigation.navigate('ForgetPassword');
    // return this.props.navigation.navigate('Verification');
  }

  handleCloseNotification = () => {
    return this.setState({
       showAlert : false
     })
  }

  toggleButtonState = () => {
    const { isPhoneNumberValid, isPasswordValid} = this.state;
          
    if ( isPhoneNumberValid && isPasswordValid ) {
      return true;
    } 
    else {
      return false;
    }
  }

  render () {
    const { showLoading, restoring } = this.state

    if(restoring) {
      return (
        <SafeAreaView>    
          {/* <Image
            source={require('../../assets/images/splash.png')}
            style={StyleSheet.flatten(styles.logoIcon)}/>  */}
        </SafeAreaView>
      );
    }
    else {
      const { title, message, showAlert } = this.state

      return(
        <SafeAreaView style={styles.container}>  
          <StatusBar barStyle="default" /> 
        <KeyboardAvoidingView
          style = {styles.wrapper }
          behavior = { 'padding' }>
            
            <View style={styles.logoView}>
              <Image
                source={require('../../assets/images/logo.png')}
                style={StyleSheet.flatten(styles.logoIcon2)}/> 
              <View style = {styles.logoTextView}>
                <DisplayText
                  text = {'COURT OF APPEAL'}
                  styles = {StyleSheet.flatten(styles.logoText)}/> 
                <DisplayText
                  text = {'REPORT NIGERIA'}
                  styles = {StyleSheet.flatten(styles.logoText)}/> 
              </View>
            </View>
            <View>
              <View style = {[styles.textInputView,{ borderColor: this.state.isEmailFocused
                 ? colors.green
                 : colors.whiteShade}]}> 
                  <View style = {styles.inputImageView}>
                    <Image
                      source={require('../../assets/images/phone.png')}
                      style={StyleSheet.flatten(styles.iconForm)}/> 
                  </View>
                  <InputField
                    placeholder={'Phone Number'}
                    placeholderTextColor = {colors.blackShade}
                    textColor={colors.blackShade}
                    inputType={'phone'}
                    onChangeText = {this.handlePhoneChange}
                    autoCapitalize = "none"
                    height = {40}
                    width = {'90%'}
                    borderWidth = {1}
                    blurOnSubmit={false}
                    borderColor = {theme.colorAccent}
                    returnKeyType={'done'}
                    paddingLeft = {8}
                    blurOnSubmit={false}
                    onFocus={()=>this.setState({isEmailFocused:true})}
                    onBlur={()=>this.setState({isEmailFocused:false})}
                    onSubmitEditing={() => { 
                      this.passwordRef && this.passwordRef.focus()
                    }}
                    /> 
              </View>
              <View style = {[styles.textInputView,{ borderColor: this.state.isPasswordFocused
                 ? colors.green
                 : colors.whiteShade}]}> 
                <View style = {styles.inputImageView}>
                  <Image
                    source={require('../../assets/images/padlock.png')}
                    style={StyleSheet.flatten(styles.iconForm)}/> 
                  </View>
                    <InputField
                    placeholder={'Password'}
                    placeholderTextColor = {colors.blackShade}
                    textColor={colors.blackShade}
                    inputType={'password'}
                    onChangeText = {this.handlePasswordChange}
                    autoCapitalize = "none"
                    height = {40}
                    width = {'90%'}
                    borderWidth = {1}
                    borderColor = {colors.white}
                    refs={(input) => { this.passwordRef = input; }}
                    returnKeyType={'done'}
                    blurOnSubmit={false}
                    paddingLeft = {8}
                    onFocus={()=>this.setState({isPasswordFocused:true})}
                    onBlur={()=>this.setState({isPasswordFocused:false})}
                    onSubmitEditing={() => { 
                      this.handleSignIn();
                    }}
                  /> 
              </View> 
            </View>
            <View style = {styles.btnView}> 
            <ProgressDialog
              visible={showLoading}
              title="Processing"
              message="Please wait..."
            />
            <SubmitButton
              title={'Login'}
              disabled={!this.toggleButtonState()}
              onPress={this.handleSignIn}
              titleStyle={styles.btnText}
              btnStyle = {styles.btnStyle}
            />
            <SingleButtonAlert
              title = {title} 
              message = {message}
              handleCloseNotification = {this.handleCloseNotification}
              visible = {showAlert}
            />
            <DisplayText
              text={'Forget Password?'}
              styles = {styles.forgetPwd}
              onPress = {this.handleForgetPassword}
            />
          </View>
          <TouchableOpacity style = {styles.signupLinkView}>
            <DisplayText
              text={'New User? '}
              styles = {styles.signupText}
              onPress = {this.handleRegistration}
            />
            <DisplayText
              text={'Create Account'}
              styles = {styles.createAccount}
              onPress = {this.handleRegistration}
            />
          </TouchableOpacity> 
        </KeyboardAvoidingView>
          
         
        </SafeAreaView>
      )
    }
  }
} 


