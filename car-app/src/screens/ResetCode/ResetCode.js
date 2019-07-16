'use strict';
import React, {Component} from 'react';
import { TouchableOpacity, View, StyleSheet, SafeAreaView, Image, KeyboardAvoidingView } from 'react-native';
import {OtpInputs, DisplayText, SubmitButton} from '../../components';
import styles from './styles';

export default class ResetCode extends Component {
  constructor(props) {
    super(props);

    this.state ={

    }
  }

  handleCloseVerification = () => {
    return this.props.navigation.navigate('Register')
  }
handleSend = () => {
  console.log('hello')
}
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity 
          onPress = {this.handleCloseVerification}
          style = {styles.closeView}>
          <Image
            source={require('../../assets/images/close.png')}
            style={StyleSheet.flatten(styles.closeIcon)}/>   
        </TouchableOpacity>
        <View style = {styles.textView}>
          <DisplayText
            text={'Enter Reset Code'}
            styles = {styles.Verification}
          />
          <DisplayText
            text={'A text message with 6 digit code was'}
            styles = {styles.msgText}
          />
          <DisplayText
            text={'was send to your phone'}
            styles = {styles.msgText2}
          />
        </View>
          <OtpInputs />
        <View style = {styles.textView}>
          <DisplayText
            text={'Didn\'t get text?'}
            styles = {styles.msgText}
          />
          <DisplayText
            text={'RESENT'}
            styles = {styles.resend}
            onPress = {this.handleSend}            
          />
          <SubmitButton
            title={'Send'}
            onPress = {this.handleSend}
            buttonBorder = {styles.buttonBorder}
            titleStyle={styles.btnText}
            btnStyle = {styles.btnStyle}
            />
        </View>
      </SafeAreaView>
    );
  }
}