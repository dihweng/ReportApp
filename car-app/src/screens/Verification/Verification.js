'use strict';
import React, {Component} from 'react';
import { TouchableOpacity, View, StyleSheet, StatusBar, SafeAreaView, Image, KeyboardAvoidingView } from 'react-native';
import {DisplayText, SingleButtonAlert, SubmitButton} from '../../components';
import styles from './styles';
import OtpInputs from 'react-native-otp-inputs'
import colors from '../../assets/colors';
import { VerificationEndpoint, getRoute, getProfile, postWithToken, ProfileEndpoint } from '../Utils/Utils';
import { ProgressDialog } from 'react-native-simple-dialogs';


export default class Verification extends Component {
  constructor(props) {
    super(props);

    this.state ={
      showAlert: false,
      showLoading: false,
      title: '',
      message: '',    
      token : '',
      id : '',
      otp : '',
    }
  }
 

  async componentDidMount () {
    let profile = await getProfile();

    this.setState({
      token : profile.access_token,
    });
    await this.handleGetProfile();

  }

  handleCloseVerification = () => {
    return this.props.navigation.navigate('DashBoard')
  }
  handleCloseNotification = () => {
    return this.setState({
       showAlert : false
     })
  }
  handleGetProfile = () => {
    const{token} = this.state;
    console.log({profile_tokenaaaaa : token});
    
    this.setState({
      showLoading: true
    });
    let endPoint = `${ProfileEndpoint}`;

      getRoute(endPoint, token)
      .then((res) => {
        if (typeof res.message !== 'undefined' || typeof res.message === '') {  
          console.log({responses: res})
          return  this.setState({ 
            showLoading : false,
            title : 'Alert',
            message : res.message,
            showAlert : true,
          }); 
        }
        else {
          const id = res.data.id;
          console.log({resSuccess: id})

          this.setState({ 
            showLoading : false, 
            id : id,
          }); 
        }
      })
      .catch((res) => {
        this.setState({
          showLoading : false,
          tittle : 'Alert',
          message : res.message,
          showAlert : true,
        });
      });
  }

  handleSend = () => {
    const {id, token, otp} = this.state
    this.setState({
      showLoading: true,
    });
    // const {navigation} = this.props,
    // id = navigation.getParam('id', 'no_id'),
    // token = navigation.getParam('token', 'no_id'),
    let endPoint = `${VerificationEndpoint}${id}/${'phone'}`;

    
    let data = JSON.stringify({
      'otp' : otp,
    });
    console.log({endPoint: endPoint});
    postWithToken(endPoint, data, token)
      .then((res) => {
        if (typeof res.message !== 'undefined' ) {  
          console.log({resppp : res})
          this.setState({ 
            showLoading : false,
            title : 'Alert',
            message : res.message,
            showAlert : true,
          }); 
          this.props.navigation.navigate('DashBoard');

        }
        else{
          console.log({success : res})
          this.setState({ 
            showLoading : false, 
            title : 'Alert',
            message : res.message,
            showAlert : true,
          }); 
          this.props.navigation.navigate('DashBoard');
        }  
      })
      .catch((res) => {
        this.setState({
          showLoading : false,
          messageKey : 'Message',
          errorMessage : res.message,
          visible : true,
        });

      })

    // return this.props.navigation.navigate('ResetCode')
  }
  handleResend = () => {

  }
render() {
  const {showAlert, showLoading, title, message} = this.state;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="default" /> 
      <TouchableOpacity 
        onPress = {this.handleCloseVerification}
        style = {styles.closeView}>
        <Image
          source={require('../../assets/images/close.png')}
          style={StyleSheet.flatten(styles.closeIcon)}/>   
      </TouchableOpacity>
      <View style = {styles.textView}>
        <DisplayText
          text={'Enter Verification Code'}
          styles = {styles.Verification}
        />
        <DisplayText
          text={'A text message with 5 digit code'}
          styles = {styles.msgText}
        />
        <DisplayText
          text={'was send to your phone'}
          styles = {styles.msgText2}
        />
      </View>

        {/* <OtpInputs /> */}

        <KeyboardAvoidingView style={styles.optView}>
          <OtpInputs handleChange={code => 
          this.setState({
            otp : code,
          })} 
          focusedBorderColor = {colors.green_background}
          numberOfInputs={5} />
        </KeyboardAvoidingView>
        <View style = {styles.textView}>
          <DisplayText
            text={'Didn\'t get text?'}
            styles = {styles.msgText}
          />
          <DisplayText
            text={'RESENT'}
            styles = {styles.resend}
            onPress = {this.handleResend}            
          />
          <SubmitButton
            title={'Send'}
            onPress = {this.handleSend}
            buttonBorder = {styles.buttonBorder}
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
        </View>
      </SafeAreaView>
    );
  }
}