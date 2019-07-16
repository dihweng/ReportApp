'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, KeyboardAvoidingView, StyleSheet,} from 'react-native';
import {DisplayText, InputField, SubmitButton,SingleButtonAlert} from '../../components';
import styles from './styles';
import colors from '../../assets/colors'


export default class CreateNewPassword extends Component {
  constructor(props) {
    super(props);
    this.state ={
      token : '',
      showAlert : false,
      message : '',
      isValidPhoneNumber: false,
      phone: 0,
    }
  }

  handlePasswordChange = (password) => {
    if (password.length > 0) {
      this.setState({
        isValidPassword : true,
        password: password
      });
    }
    else {
      if ( password.length < 1 ) {
        this.setState({
          isValidPassword : false
        })
      }
    }
  }

  handlePassword2Change = (password) => {
    if (password.length > 0) {
      this.setState({
        isValidPassword2 : true,
        password2: password
      });
    }
    else {
      if ( password.length < 1 ) {
        this.setState({
          isValidPassword2 : false
        })
      }
    }
  }
  handlechangePassword = () => {
    console.log({hello : 'reset password pls'})
  }


  render () {
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
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}>
               <View style = {styles.textView}>
                <DisplayText
                  text={'Create New Password'}
                  styles = {styles.ForgetTxt}
                />

              </View>
              <View style = {styles.inputView}>
                <InputField
                  placeholder ={'Password'}
                  placeholderTextColor = {colors.text}
                  textColor={colors.green_background}
                  inputType={'password'}
                  onChangeText = {this.handlePasswordChange}
                  autoCapitalize = "none"
                  keyboardType={'default'}
                  height = {40}
                  borderWidth = {1}
                  borderColor={colors.textInput_border}
                  borderRadius = {4}
                  paddingLeft = {8}
                /> 
                <InputField
                  placeholder ={'Confirm Password'}
                  placeholderTextColor = {colors.text}
                  textColor={colors.green_background}
                  inputType={'password'}
                  onChangeText = {this.handlePassword2Change}
                  autoCapitalize = "none"
                  keyboardType={'default'}
                  height = {40}
                  borderWidth = {1}
                  borderColor={colors.textInput_border}
                  borderRadius = {4}
                  paddingLeft = {8}

                /> 
                <SubmitButton
                  title={'Confirm'}
                  onPress = {this.handlechangePassword}
                  btnStyle = {styles.buttonBorder}
                  titleStyle={styles.btnText}
                />
                
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
