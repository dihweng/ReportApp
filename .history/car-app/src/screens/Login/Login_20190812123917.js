'use strict';
import React, {Component} from 'react';
import { View, StyleSheet, StatusBar,TouchableOpacity, SafeAreaView, Image, KeyboardAvoidingView,ScrollView } from 'react-native';
import {DisplayText, InputField,SubmitButton, AuthBackground} from '../../components';
import styles from './styles';
import { getProfile, LoginEndpoint, postRoute, saveProfile} from '../Utils/Utils';
import colors from '../../assets/colors';
import { ProgressDialog } from 'react-native-simple-dialogs';
import theme from '../../assets/theme';
import DropdownAlert from 'react-native-dropdownalert';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state ={
      restoring : true,
      isEmailValid: false,
      isPasswordValid: false,
      showAlert: false,
      showLoading: false,
      title: '',
      message: '', 
      email: '',
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
    if(typeof profile.expires !== 'undefined' ) {
      // this.setState({
      //   restoring : false,
      // });
      return this.props.navigation.navigate('Men');
    }
    else {
      this.setState({
        restoring : false,
      });
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

  showNotification = (type, title, message,) => {
    this.hideLoadingDialogue();
    return this.dropDownAlertRef.alertWithType(type, title, message);
  }

  login = async(body) =>{
    await postRoute(LoginEndpoint, body)
      .then((res) => {
        if (typeof res.message !== 'undefined') {  
          return this.showNotification('error', 'Message', res.message);
        }   
        else {
          this.hideLoadingDialogue();
          saveProfile(
            res.access_token,
            res.refresh_token,
            res.expires_in
          );
          this.hideLoadingDialogue();
          return this.props.navigation.navigate('Menu');
        }
      }
    ).catch(error=>this.showNotification('error', 'Message', error.toString()));
    
  } 
  handleSignIn = async () =>{
    this.showLoadingDialogue();
    const { password, email,  } = this.state,
      grant_type = 'password',
      client_id = '2',
      client_secret = 'nHcDeuwa5RVdgRsS26cEkUJRjtuuuIyC0FWdmKVp';

    let body = await {
      username : email, 
      password : password, 
      grant_type : grant_type,
      client_id : client_id,
      client_secret : client_secret,
      scope : '*',
    };
    try {
      await this.login(body)
    }
    catch(error) {
      return this.showNotification('error', 'Message', error.toString());

    }
  }
  handleEmailChange = (email) => {
    if(email.length > 0) {
      this.setState({
        isEmailValid: true,
        email : email
      });
    }
    else {
      if (email.length < 1) {
        this.setState({
          isEmailValid : false
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
    const { isEmailValid, isPasswordValid } = this.state;
          
    if ( isEmailValid && isPasswordValid ) {
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
        <SafeAreaView style = {styles.splashView}> 
        <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
   
          <Image
            source={require('../../assets/images/splash.png')}/>
            //style={StyleSheet.flatten(styles.logoIcon)}/> 
        </SafeAreaView>
      );
    }
    else {
      return(
        <AuthBackground>
        <SafeAreaView style={styles.container}>  
          <StatusBar barStyle="default" /> 

          <KeyboardAvoidingView
            style = {styles.wrapper }
            behavior = { 'padding' }>
            <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />

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
          <View style ={styles.formContainer}>
            <View style = {[styles.textInputView,{ borderColor: this.state.isEmailFocused
              ? colors.green
              : colors.whiteShade}]}> 
                <View style = {styles.inputImageView}>
                  <Image
                    source={require('../../assets/images/email.png')}
                    style={StyleSheet.flatten(styles.iconForm)}/> 
                </View>
                <InputField
                  placeholder={'Email Address'}
                  placeholderTextColor = {theme.inputTxtColor}
                  textColor={colors.darkGray}
                  inputType={'email'}
                  keyboardType={'default'}                  
                  onChangeText = {this.handleEmailChange}
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
              : colors.whiteShade,}]}> 
              <View style = {styles.inputImageView}>
                <Image
                  source={require('../../assets/images/padlock.png')}
                  style={StyleSheet.flatten(styles.iconForm)}/> 
                </View>
                  <InputField
                  placeholder={'Password'}
                  placeholderTextColor = {theme.inputTxtColor}
                  textColor={colors.darkGray}
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
              title={'Sign in'}
              disabled={!this.toggleButtonState()}
              onPress={this.handleSignIn}
              titleStyle={styles.btnText}
              btnStyle = {styles.btnStyle}
            />
          
            <DisplayText
              text={'Forget Password?'}
              styles = {styles.forgetPwd}
              onPress = {this.handleForgetPassword}
            />
          </View>
        </KeyboardAvoidingView>
          
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
         
          </SafeAreaView>
        </AuthBackground>
      )
    }
  }
} 


