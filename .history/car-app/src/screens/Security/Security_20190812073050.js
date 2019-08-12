'use strict';
import React, {Component} from 'react';
import { View, ScrollView, TouchableOpacity,  SafeAreaView,  StatusBar, Image, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {DisplayText, InputField, SubmitButton, SingleButtonAlert} from '../../components';
import styles from './styles';
import colors from '../../assets/colors'
import { ProgressDialog } from 'react-native-simple-dialogs';
import { getUserDetails, ChangePassword } from '../Utils/Utils';


export default class Security extends Component {
  constructor(props) {
    super(props);
    this.state ={
      password : '',
      isPasswordValid : false,
      newPassword : '',
      isNewPasswordValid : false,
      confirmPassword : '',
      isConfirmPasswordValid : '',
      showAlert: false,
      showLoading: false,
      title: '',
      message: '', 
      token : '',
      id : '',
    }
  }
  async componentDidMount(){
    let userDetails = await getUserDetails();

    const token = userDetails.token,
      id  = userDetails.data.id;
    this.setState({
      token : token,
      id : id,
    });
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
       showAlert : false
     })
  }

  toggleButtonState = () => {
    const { isValidPassword, isNewPasswordValid, isConfirmPasswordValid } = this.state;
          
    if ( isValidPassword && isNewPasswordValid && isConfirmPasswordValid ) {
      return true;
    } 
    else {
      return false;
    }
  }

  verifyPassword = async()=> {
    this.showLoadingDialogue();
    const {newPassword, confirmPassword} = this.state;
    if( newPassword !== confirmPassword){
      return  await this.showNotification('Passwords Donot Match', 'Message');
    } else if (newPassword < 8){
      return  await this.showNotification('Password cannot be Less than 8 Characters', 'Message')
    }
    return await this.handleChangePassword();

  }
  handleChangePassword = async() => {
    const {newPassword, confirmPassword, password, id ,token} = this.state;
    let endPoint = `${ChangePassword}${id}/${'password/reset'}`;

    let body = {
      password_old : password,
      password : newPassword,
      password_confirmation : confirmPassword,
    };

    const settings = {
      method : "POST",
      body : JSON.stringify(body),
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    };
    
    try {
      let response = await fetch(endPoint, settings);
      let res = await response;
      if(res.status >=400 && res.ststus <=500) {
        return await this.showNotification('The old password is incorrect.', 'Message');
      }
      else {
        return await this.showNotification('Password Update Successful', 'Success');
      }
    }
    catch(error) {
      return this.showNotification(error.toString(), 'Message');
    }
  }

  handdleBackPress = () => {
    return this.props.navigation.goBack();
  }
  handleOldPassword = (password) => {
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
  handleNewPassword = (newPassword) => {
    if (newPassword.length > 0) {
      this.setState({
        isNewPasswordValid : true,
        newPassword: newPassword
      });
    }
    else {
      if ( newPassword.length < 1 ) {
        this.setState({
          isNewPasswordValid : false
        })
      }
    }
  }
  handleConfirmPassword = (confirmPassword) => {
    if (confirmPassword.length > 0) {
      this.setState({
        isConfirmPasswordValid : true,
        confirmPassword: confirmPassword
      });
    }
    else {
      if ( confirmPassword.length < 1 ) {
        this.setState({
          isConfirmPasswordValid : false
        })
      }
    }
  }
  
render () {
  const { title, message, showAlert, showLoading } = this.state

  return(
    <SafeAreaView style={styles.container}> 
      <StatusBar barStyle="default" /> 
        <View style = {styles.navBar}>
          <TouchableOpacity 
            onPress = {this.handdleBackPress}
            style = {styles.headerImage}>
            <Image
              onPress = {this.handdleBackPress}
              source = {require('../../assets/images/back.png')}
              style = {StyleSheet.flatten(styles.headerIcon)}
            />
          </TouchableOpacity>
          <View style = {styles.nameView}>
            <DisplayText
              text={'Manage Account'}
              styles = {StyleSheet.flatten(styles.txtHeader)}/>
          </View>
        </View> 
        <View style = {styles.cards}>
          <View style = {styles.cardImageView}>
            <Image
              source = {require('../../assets/images/lock_Icon.png')}
              style = {StyleSheet.flatten(styles.cardIcon)}
            />
          </View>
          <View style = { styles.viewText}>
            <DisplayText
              text={'Security'}
              styles = {StyleSheet.flatten(styles.amtText)}
            />
          </View>
          <TouchableOpacity
            onPress = {this.handlePersonalDetail} 
            style = {styles.angleView}>
            <Image
              onPress = {this.handlePersonalDetail}
              source = {require('../../assets/images/angle_back.png')}
              style = {StyleSheet.flatten(styles.angleBack)}
            />
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView
          style={styles.wrapper}
          behavior = 'padding'> 
          <ScrollView 
            style={{flex:1,}}
            showsVerticalScrollIndicator={false}>
              <View style = {styles.formView}>
                <DisplayText
                  text={'Old Password *'}
                  styles = {styles.formHeaderTxt}
                />
                <InputField
                  textColor={colors.text_color}
                  inputType={'password'}
                  keyboardType={'default'}
                  onChangeText = {this.handleOldPassword}
                  autoCapitalize = "none"
                  height = {40}
                  // borderWidth = {1}
                  borderColor={colors.field_color}
                  borderRadius={4}
                  paddingLeft = {8}
                  formStyle = {styles.formstyle}
                  
                /> 
              </View>
              <View style = {styles.formView}>
                <DisplayText
                  text={'New Password *'}
                  styles = {styles.formHeaderTxt}
                />
                <InputField
                  textColor={colors.text_color}
                  inputType={'password'}
                  keyboardType={'default'}
                  onChangeText = {this.handleNewPassword}
                  autoCapitalize = "none"
                  height = {40}
                  // borderWidth = {1}
                  borderColor={colors.field_color}
                  borderRadius={4}
                  paddingLeft = {8}
                  formStyle = {styles.formstyle}
                  
                /> 
            </View>
            <View style = {styles.formView}>
              <DisplayText
                text={'Confirm Password *'}
                styles = {styles.formHeaderTxt}
              />
              <InputField
                textColor={colors.text_color}
                inputType={'password'}
                keyboardType={'default'}
                onChangeText = {this.handleConfirmPassword}
                autoCapitalize = "none"
                height = {40}
                // borderWidth = {1}
                borderColor={colors.field_color}
                borderRadius={4}
                paddingLeft = {8}
                formStyle = {styles.formstyle}
                
              />  
            </View>
            <View style = {styles.signupLinkView}>
              <View style = {styles.btnView}>
                <ProgressDialog
                  visible={showLoading}
                  title="Processing"
                  message="Please wait..."
                />
                <SubmitButton
                  title={'Update'}
                  disabled={!this.toggleButtonState()}
                  onPress={this.verifyPassword}
                  titleStyle={styles.btnText}
                  btnStyle = {styles.btnStyle}
                />
                <SingleButtonAlert
                  title = {title} 
                  message = {message}
                  handleCloseNotification = {this.handleCloseNotification}
                  visible = {showAlert}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
    )
  }
} 