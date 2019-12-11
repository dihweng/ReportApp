'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, TouchableOpacity, TouchableWithoutFeedback, Text, TextInput, Modal, FlatList, KeyboardAvoidingView, StyleSheet,} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import {DisplayText, InputField, SubmitButton,SingleButtonAlert} from '../../components';
import styles from './styles';
import colors from '../../assets/colors'
import { ChangePhoneEndPoint, postRoute, isPhoneValid } from '../Utils/Utils';
import { ProgressDialog } from 'react-native-simple-dialogs';
import data from '../Register/Countries';
import { Icon } from 'native-base'


export default class ChangePhone extends Component {
  constructor(props) {
    super(props);
    this.state ={
      showAlert : false,
      showLoading : false,
      message : '',
      title : '',
      isValidPhoneNumber: false,
      phoneNumber: '',
      modalVisible : false,
      flag : '',
      token : '',
      id : '',
    }
  }

  componentWillMount () {
    // Default render of country flag
    const defaultFlag = data.filter(obj => obj.name === 'Nigeria')[0].flag;
    this.setState({
      flag :defaultFlag,
    });
    const{navigation} = this.props,
      token = navigation.getParam('token'),
      id = navigation.getParam('id');

      this.setState({
        token : token,
        id : id,
      });
  }

  handleBackPress = () => {
    return this.resetNavigation();
    // return this.props.navigation.goBack()
  }
  resetNavigation =() => {
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({
          routeName: 'DashBoard',
        })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  }
  
  handlePhoneReset = () => {
  //   const { phoneNumber, id ,token} = this.state;
    
  //   this.setState({
  //     showLoading : true,
  //   });

  //   let endPoint = `${ChangePhoneEndPoint}${id}`;
  //   let body = {
  //     phone : phoneNumber
  //   }

  //   fetch(endPoint, {
  //     method : "PUT",
  //     body : JSON.stringify(body),
  //     headers : {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json',
  //       'Authorization': `Bearer ${token}`,

  //     }
  //   })
  //   .then((res) => {
  //     if ( res.status >= 400 && res.status <= 500 ) {
  //       // alert(res._bodyText.errors)
  //       return this.setState({
  //         showLoading : false,
  //         title : 'Alert',
  //         message : 'Phone Number Change Not Successful',
  //         showAlert : true,
  //       });
  //     }
  //     else {
        
  //       this.setState({
  //         showLoading : false,
  //         title : 'Alert',
  //         message : 'Phone Number Change Successful',
  //         showAlert : true,
  //       });
  //       // return this.props.navigation.navigate('Verification')
  //       this.handleBackPress()
  //     }
  //   })
  //     .catch((error) => {
  //     console.error(error);
  //   }); 
        return this.props.navigation.navigate('Change')

  }


  handlePhoneChange = (text) => {
    if(text.length > 0) {
      this.setState({
        isValidPhoneNumber: true,
        phoneNumber : text
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

  handleBackVerify = () => {
    return this.props.navigation.navigate('Verification')
  }

  handleCloseNotification = () => {
    return this.setState({
      showAlert : false
    });
  }
  onChangeText(key, value) {
    this.setState({
      [key]: value
    })
  }

  async selectCountry(country) {
    // Get data from Countries.js  
    const countryData = await data
    try {
      // Get the country code
      const countryCode = await countryData.filter(
        obj => obj.name === country
      )[0].dial_code
      // Get the country flag
      const countryFlag = await countryData.filter(
        obj => obj.name === country
      )[0].flag
      //get country code name
      const countryCodeName = await countryData.filter(
        obj => obj.name === country
      )[0].name
      // Update the state then hide the Modal

      this.setState({ 
        phoneNumber: countryCode, 
        flag: countryFlag, 
        nameCode : countryCodeName,
      })
      await this.hideModal()
    }
    catch (err) {
      console.log(err)
    }
  }

  showModal() {
    this.setState({ modalVisible: true })
  }
  hideModal() {
    this.setState({ modalVisible: false })
    // Refocus on the Input field after selecting the country code
    this.refs.PhoneInput._root.focus()

  }

  render () {
    const {showAlert, showLoading, message, title, flag } = this.state;
    const countryData = data

    return(
      <SafeAreaView style={styles.container}> 
        <StatusBar barStyle="default" /> 
          <View style = {styles.greenTopView}>
            <Image
              source={require('../../assets/images/phone.png')}
              style={StyleSheet.flatten(styles.lockIcon)}/> 
          </View>
          {/* <View style = {styles.traingleView}>
            <View style = {styles.triangleShape}></View>
          </View> */}
         
          <KeyboardAvoidingView
            style={styles.wrapper}
            behavior = 'padding'> 
            <ScrollView
              style={{flex:1,}}
              showsVerticalScrollIndicator={false}>
               <View style = {styles.textView}>
                <DisplayText
                  text={'Change Phone Number'}
                  styles = {styles.ForgetTxt}
                />
                <DisplayText
                  text={'We Just Need Your Phone Number'}
                  styles = {styles.msgText}
                />
                <DisplayText
                  text={'To Send Your Verification Code '}
                  styles = {styles.msgText2}
                />
              </View>
              <View style = {styles.inputView}>
                <View style = {styles.formView}>
                  <DisplayText
                    text={'Phone Number *'}
                    styles = {styles.formHeaderTxt}
                  /> 
                  <View style = {styles.phoneView}>
                    {/* <View style = {styles.flag}> */}
                    <TouchableOpacity 
                      style = {styles.modalTp}
                      onPress={() => this.showModal()}>
                      <Text
                        style = {styles.flagstyles} 
                        onPress={() => this.showModal()}>
                        {flag}
                      </Text>
                      <Icon
                        active
                        name='md-arrow-dropdown'
                        style={styles.iconStyle}
                        onPress={() => this.showModal()}
                      />
                    </TouchableOpacity>
                    {/* </View> */}
                    <TextInput
                      style={styles.input}
                      placeholder='+2348012341234'
                      placeholderTextColor='#adb4bc'
                      keyboardType={'phone-pad'}
                      returnKeyType='done'
                      autoCapitalize='none'
                      autoCorrect={false}
                      secureTextEntry={false}
                      ref='PhoneInput'
                      value={this.state.phoneNumber}
                      onChangeText={(val) => {
                        if (this.state.phoneNumber === ''){
                          // render NIG phone code by default when Modal is not open
                          this.onChangeText('phoneNumber', '+234' + val)
                        } else {
                          // render country code based on users choice with Modal
                          this.onChangeText('phoneNumber', val)
                        }}
                      }
                    />
                  </View>
                  {/* Modal for country code and flag */}
                  <Modal
                    animationType="slide"
                    transparent={true}
                    onRequestClose={this.hideModal}
                    visible={this.state.modalVisible}>
                    <View style={{ flex : 1, paddingLeft : 20, paddingRight : 20, paddingTop : 10, paddingBottom : 20}}>
                      <View style={{ flex: 7, marginTop: 10 }}>
                        {/* Render the list of countries */}
                        <FlatList
                          data={countryData}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem = {
                            ({ item }) =>
                              <TouchableWithoutFeedback 
                                onPress={() => this.selectCountry(item.name)}>
                                <View style={styles.countryStyle}>
                                  <Text style={styles.textStyle}>
                                    {item.flag} {item.name} ({item.dial_code})
                                  </Text>
                                </View>
                              </TouchableWithoutFeedback>
                          }
                        />
                      </View>
                      {/* <View style={styles.closeButtonStyle}>
                        <TouchableOpacity
                          style={styles.closeButton}
                          onPress={() => this.hideModal()}>
                          <Text style={styles.textBtn}>
                            Close
                          </Text>
                        </TouchableOpacity>
                      </View> */}
                    </View>
                  </Modal>
                </View>
                <SubmitButton
                  title={'Save'}
                  onPress = {this.handlePhoneReset}
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
                    text={'Back to phone verification'}
                    styles = {styles.backTxt}
                    onPress = {this.handleBackVerify}
                  />
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }
} 
