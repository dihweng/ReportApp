'use strict';
import React, {Component} from 'react';
import {DisplayText, InputField, SubmitButton} from '../../components';
import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL }  from './styles';
import { isEmailValid,RegisterEndpoint, postRoute, isPhoneValid,} from '../Utils/Utils';
import { ProgressDialog } from 'react-native-simple-dialogs';
import colors from '../../assets/colors';
import CheckBox from 'react-native-check-box'
import data from './Countries';
import theme from '../../assets/theme';
import DropdownAlert from 'react-native-dropdownalert';


import { 
  View, 
  StyleSheet, 
  ScrollView, 
  Animated, 
  Keyboard, 
  KeyboardAvoidingView, 
  Platform, 
  SafeAreaView, 
  Text, 
  Modal, 
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import { Input, Icon } from 'native-base'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: '',
      nameCode: '',
      phoneNumber: '+234',
      modalVisible: false,
      isEmailValid: false,
      isValidPhoneNumber: false,
      isValidFullName: false,
      isValidOthername: false,
      isValidPassword: false,
      isValidPassword2: false,
      isValidGender: false,
      isValidUsername: false,
      showAlert: false,
      showLoading: false,
      visible: false,
      modalVisibleTerms: false,
      name: '',
      othernames: '',
      email: '',
      password: '',
      password2: '',
      username: '',
      title: '',
      token: '',
      message: '',
      termsVisible: false,
      modalTermsVisible: false,
      terms: 'Terms and Conditions',
      isValidTerms: false,
      isChecked: true,
      isNameFocused: false,
      isEmailFocused: false,
      isUserNameFocused: false,
      isConformPwdFocused: false,
      isPasswordFocused: false,
      isPhoneFocused: false,
    };
    this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
  }

  componentWillMount () {
    // Default render of country flag
    const defaultFlag = data.filter(obj => obj.name === 'Nigeria')[0].flag;
    this.setState({
      flag :defaultFlag,
    })
    if (Platform.OS=='ios'){
      this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
      this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    }
    else{
      this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
      this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }

  }

  //set gterms and condtion

  handleTermsConditions = () => {
    this.toggleTermsModal(true);
  };

  toggleTermsModal = (termsVisible) => {
    this.setState({ modalTermsVisible : termsVisible });
  };

  closeTermsModal = () => {
    this.toggleTermsModal(!this.state.modalTermsVisible);
  };

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = (event) => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT_SMALL,
    }).start();
  };

  keyboardWillHide = (event) => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT,
    }).start();
  };

  keyboardDidShow = (event) => {
    Animated.timing(this.imageHeight, {
      toValue: IMAGE_HEIGHT_SMALL,
    }).start();
  };

  keyboardDidHide = (event) => {
    Animated.timing(this.imageHeight, {
      toValue: IMAGE_HEIGHT,
    }).start();
  };

  onBlur() {
    console.log('#####: onBlur');
  }
 
  showLoadingDialogue =()=> {
    this.setState({
      showLoading: true,
    });
  }

  hideLoadingDialogue =()=> {
    return this.setState({
      showLoading: false,
    });
  }

  showNotification = (type, title, message,) => {
    this.hideLoadingDialogue();
    return this.dropDownAlertRef.alertWithType(type, title, message);
  }
  checkEmail(email) {
    if(!isEmailValid(email)){
      let message = 'Invalid Email Address';
      return this.showNotification('error', 'Message', message);
    }
  }
  checkPhone(phoneNumber){
    if(!isPhoneValid(phoneNumber)){
      let message = 'Invalid Phone Number';
      this.showNotification('error', 'Message', message);
       return false;
    }
    else {
      return  true;
    }
  }
  checkPassword(password1, password2){
      if(password1 !== password2) {
      let message = 'Passwords Do not Match';
      this.showNotification('error', 'Message', message);
       return false;
    }
    else {
      return true;
    }
  }
  register = async(body) =>{
    this.showLoadingDialogue();
    await postRoute(RegisterEndpoint, body)
      .then((res) => {
        if(typeof res.errors !== 'undefined') {
          const value = Object.values(res.errors);
          if (typeof res.message !== 'undefined') {  
            return this.showNotification('error', 'Message', value[0].toString());

          }   
        }  
        else if(res.data) {
          this.hideLoadingDialogue();
          this.showNotification('success', 'Success', 'Registration Sucessful');
          return setTimeout(() => {
            this.props.navigation.navigate('Login');
          }, 3000);
         
        }
        
    }).catch(error=>this.showNotification('error', 'Message', error.toString()));
    
  } 

  handleSignUp = async () =>{
    const { name, email, password, password2, phoneNumber, username } = this.state;
    this.showLoadingDialogue();
     let phoneValidation =  await this.checkPhone(phoneNumber) ;
     let passwordValidation = await this.checkPassword(password, password2);
  
    if(phoneValidation == false || passwordValidation == false ) {
      return await this.hideLoadingDialogue();
    }
    
    let body =  await {
      name : name, 
      email : email.toLowerCase(), 
      password : password, 
      phone : phoneNumber, 
      username : username,
    };

    try {
      await this.register(body);
    }
    catch(error) {
      return this.showNotification('error', 'Message', error.toString());
    }
     
  }

  handleCloseNotification = () => {
    return this.setState({
      showAlert : false
    });
  }

  handleFullName = (name) => {
    if(name.length > 0) {
      this.setState({
        isValidFullName: true,
        name : name
      });
    }
    else {
      if (name.length < 1) {
        this.setState({
          isValidFullName : false
        });
      }
    }
  }
  handleUserName = (username) => {
    if(username.length > 0) {
      this.setState({
        isValidUsername: true,
        username : username
      });
    }
    else {
      if (username.length < 1) {
        this.setState({
          isValidUsername : false
        });
      }
    }
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

  handleCheckBox = () => {
     return this.setState({
        isChecked:!this.state.isChecked
      })
  }
  handleAcceptTerms=()=>{
    const {isChecked} = this.state;

    if (isChecked === true) {
      this.handleSignUp()
    }
    else{
      return this.showNotification('warning', 'Message', 'Accept Terms & Conditon to Continue');

    }
  }

  toggleButtonState = () => {
    const { isValidFullName, isValidUsername, isEmailValid, isValidPassword, isValidPassword2 } = this.state;
          
    if ( isEmailValid && 
      isValidPassword && 
      isValidFullName  && 
      isValidPassword2 && 
      isValidUsername ) {
      return true;
    } 
    else {
      return false;
    }
  }

  handleLogin = () => {
    this.props.navigation.navigate('Login');
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
    catch (error) {
      return this.showNotification('error', 'Message', error.toString());
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
    const { showLoading, flag } = this.state
    const countryData = data

    return(
     <SafeAreaView style={styles.container}> 

        <View  style={styles.headerView}>
        <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />

          <DisplayText
            text={'Create Account'}
            styles = {[StyleSheet.flatten(styles.welcomeText)]}
          />
        </View>
        <KeyboardAvoidingView
          style={styles.wrapper}
          behavior = 'padding'> 
           <ScrollView 
            style={{flex:1,}}
            showsVerticalScrollIndicator={false}>
            <View style = {styles.formView}>
              <DisplayText
                text={'Full Name *'}
                styles = {styles.formHeaderTxt}
              />
              <View style = {[styles.textInputView,{ borderColor: this.state.isNameFocused
                ? theme.primaryColor
                : theme.whiteShade}]}> 
                <InputField
                  textColor={colors.darkGray}
                  inputType={'name'}
                  keyboardType={'default'}
                  onChangeText = {this.handleFullName}
                  autoCapitalize = "words"
                  height = {40}
                  borderWidth = {0.5}
                  borderColor={colors.darkSilver}
                  borderRadius={4}
                  paddingLeft = {8}
                  returnKeyType={'next'}
                  paddingLeft = {8}
                  blurOnSubmit={false}
                  onFocus={()=>this.setState({isNameFocused:true})}
                  onBlur={()=>this.setState({isNameFocused:false})}
                  onSubmitEditing={() => { 
                    this.usernameRef && this.usernameRef.focus()
                  }}
                /> 
              </View>
            </View>
            <View style = {styles.formView}>
              <DisplayText
                text={'Username *'}
                styles = {styles.formHeaderTxt}
              />
              <View style = {[styles.textInputView,{ borderColor: this.state.isUserNameFocused
                ? theme.primaryColor
                : colors.whiteShade}]}> 
                <InputField
                  textColor={colors.darkGray}
                  inputType={'name'}
                  keyboardType={'default'}
                  onChangeText = {this.handleUserName}
                  autoCapitalize = "words"
                  height = {40}
                  borderWidth = {0.5}
                  borderColor={colors.darkSilver}
                  borderRadius={4}
                  paddingLeft = {8}
                  returnKeyType={'next'}
                  paddingLeft = {8}
                  refs={(input) => { this.usernameRef = input; }}
                  blurOnSubmit={false}
                  onFocus={()=>this.setState({isUserNameFocused:true})}
                  onBlur={()=>this.setState({isUserNameFocused:false})}
                  onSubmitEditing={() => { 
                    this.emailRef && this.emailRef.focus()
                  }}
                /> 
              </View>
            </View>
            <View style = {styles.formView}>
              <DisplayText
                text={'Email *'}
                styles = {styles.formHeaderTxt}
              />
              <View style = {[styles.textInputView,{ borderColor: this.state.isEmailFocused
                ? theme.primaryColor
                : colors.whiteShade}]}> 
              <InputField
                textColor={colors.darkGray}
                inputType={'email'}
                keyboardType={'default'}
                onChangeText = {this.handleEmailChange}
                autoCapitalize = "none"
                height = {40}
                borderWidth = {0.5}
                borderColor={colors.darkSilver}
                borderRadius={4}
                paddingLeft = {8}
                returnKeyType={'next'}
                refs={(input) => { this.emailRef = input; }}
                blurOnSubmit={false}
                onFocus={()=>this.setState({isEmailFocused:true})}
                onBlur={()=>this.setState({isEmailFocused:false})}
                onSubmitEditing={() => { 
                  this.phoneRef && this.phoneRef.focus()
                }}
              />
              </View>
            </View> 
            <View style = {styles.formView}>
              <DisplayText
                text={'Phone Number *'}
                styles = {styles.formHeaderTxt}
              /> 
              <View style = {[styles.phoneView,{ borderColor: this.state.isPhoneFocused
                ? theme.primaryColor
                : colors.whiteShade}]}> 
                <View style = {styles.phoneborder}>
                <TouchableOpacity 
                  style = {styles.modalTp}
                  // onPress={() => this.showModal()}
                  >
                  <Text
                    style = {styles.flagstyles} 
                    // onPress={() => this.showModal()}
                    >
                    {flag}
                  </Text>
                  <Icon
                    active
                    name='md-arrow-dropdown'
                    style={styles.iconStyle}
                    // onPress={() => this.showModal()}
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
                  // ref='PhoneInput'
                  refs={(input) => { this.phoneRef = input; }}
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
                  onFocus={()=>this.setState({isPhoneFocused:true})}
                  onBlur={()=>this.setState({isPhoneFocused:false})}
                  onSubmitEditing={() => { 
                    this.passwordRef && this.passwordRef.focus()
                  }}
                />
                </View>
              </View>
            </View>
            {/* Modal for country code and flag */}
              <Modal
                animationType="slide"
                transparent={true}
                onRequestClose={this.hideModal}
                visible={this.state.modalVisible}>
                <View style={{ flex : 1, paddingLeft : 20, paddingRight : 20}}>
                  <View style={{ flex: 7, marginTop: 10 }}>
                    {/* Render the list of countries */}
                    <FlatList
                      data={countryData}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={
                        ({ item }) =>
                          <TouchableWithoutFeedback onPress={() => this.selectCountry(item.name)}>
                            <View style={styles.countryStyle}>
                              <Text style={styles.textStyle}>
                                {item.flag} {item.name} ({item.dial_code})
                              </Text>
                            </View>
                          </TouchableWithoutFeedback>
                      }
                    />
                  </View>
                  <View style={styles.closeButtonStyle}>
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => this.hideModal()}>
                      <Text style={styles.textBtn}>
                        Close
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            <View style = {styles.formView}>
              <DisplayText
                text={'Password *'}
                styles = {styles.formHeaderTxt}
              /> 
              <View style = {[styles.textInputView,{ borderColor: this.state.isPasswordFocused
                ? theme.primaryColor
                : colors.whiteShade}]}> 
                <InputField
                  textColor={colors.darkGray}
                  inputType={'password'}
                  onChangeText = {this.handlePasswordChange}
                  autoCapitalize = "none"
                  height = {40}
                  borderWidth = {0.5}
                  borderColor={colors.darkSilver}
                  borderRadius = {4}
                  paddingLeft = {8}
                  returnKeyType={'next'}
                  paddingLeft = {8}
                  refs = {(input) => {this.passwordRef = input}}
                  blurOnSubmit={false}
                  onFocus={()=>this.setState({isPasswordFocused:true})}
                  onBlur={()=>this.setState({isPasswordFocused:false})}
                  onSubmitEditing={() => { 
                    this.confirmPwdRef && this.confirmPwdRef.focus()
                  }}
                />
              </View> 
                <DisplayText
                  text={'Enter at least 8 characters'}
                  styles = {styles.formPwdHint}
                /> 
              
            </View>
            <View style = {styles.formView}>
              <DisplayText
                text={'Confirm Password *'}
                styles = {styles.formHeaderTxt}
              /> 
              <View style = {[styles.textInputView,{ borderColor: this.state.isConformPwdFocused
                ? theme.primaryColor
                : colors.whiteShade}]}> 
                <InputField
                  textColor={colors.darkGray}
                  inputType={'password'}
                  onChangeText = {this.handlePassword2Change}
                  autoCapitalize = "none"
                  height = {40}
                  borderWidth = {0.5}
                  borderColor={colors.darkSilver}
                  borderRadius = {4}
                  paddingLeft = {8}
                  refs={(input) => { this.confirmPwdRef = input; }}
                  returnKeyType={'done'}
                  blurOnSubmit={false}
                  paddingLeft = {8}
                  onFocus={()=>this.setState({isConformPwdFocused:true})}
                  onBlur={()=>this.setState({isConformPwdFocused:false})}
                  onSubmitEditing={() => { 
                    this.handleSignUp();
                  }}
                /> 
              </View>
            </View>
            <View style = {StyleSheet.flatten(styles.checkBoxView)}>
              <CheckBox
                style={styles.checkBox}
                onClick={this.handleCheckBox}
                isChecked={this.state.isChecked}
              />
              <DisplayText
                text={'I Agree to The Terms and Conditions'}
                styles = {styles.termCondition}
                onPress = {this.handleTermsConditions}
              />
               <Modal
                animationType="slide"
                transparent={false}
                visible = {this.state.modalTermsVisible}
                onRequestClose={() => { }}>
                <View style={ styles.modalStyle}>
                  <View style = {styles.termsView}>
                    <View style={styles.sethLogoModal}>
                      {/* <Text 
                        style ={styles.termsContHeader}>
                        {'Terms & Conditions'}
                      </Text> */}
                    </View>
                    
                    <View style={styles.horizonLine} />
                    <ScrollView contentContainerStyle= {styles.scrollview}>
                      <View style={{flexDirection: 'column',padding: 4,}}>
                        <Text 
                          style ={styles.titleHeader}>
                          {'THE ELECTRONIC COURT OF APPEAL REPORTS NIGERIA WEBSITE AND MOBILE APP \n(TERMS & CONDITIONS)\n'}
                        </Text>
                        <Text 
                          style ={styles.titleText}>
                          {'PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY'}
                        </Text>
                        <Text 
                          style ={styles.contentText}>
                            {'The Electronic Court of Appeal Reports (E-C.A.R.), is a service provided by Laurels and Prizes Law Publications which presents the recondite judgments and pronouncements of the 16 divisions of the Court of Appeal of Nigeria and it is aimed at satisfying the fast paced needs of technology savvy legal practitioners and intellectuals. Thus, it is an essential tool for legal practitioners on the bench and in the bar, law faculties and law students, scholars in other fields of education and intellectuals, generally. Please read our terms of service carefully to understand how we intend to serve you. You agree to our terms of service by installing, registering, subscribing or using the website or App otherwise.  '}
                        </Text>
                        <Text 
                          style ={styles.titleText}>
                          {'AGREEMENT TO TERMS'}
                        </Text>
                        <Text 
                          style ={styles.contentText}>
                            {'These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“Licensee”) and Laurels and Prizes Law Publications Ltd. (“Licensor”), concerning your access to and use of the Electronic Court of Appeal Reports through the courtofappealreportsnigeria.com website or Electronic Court of Appeal Reports Mobile App as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto. You agree that by accessing the Website, you have read, understood, and agree to be bound by all of these Terms and Conditions.  IF YOU DO NOT AGREE WITH ALL OF THESE TERMS and CONDITIONS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY.\nSupplemental terms and conditions or documents that may be posted on the Website or Mobile Application from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Terms and Conditions at any time and for any reason.  We will alert you about any changes by updating the “Last updated” date of these Terms and Conditions and you waive any right to receive specific notice of each such change. It is your responsibility to periodically review these Terms and Conditions to stay informed of updates.  You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Terms and Conditions by your continued use of the Website and Mobile App after the date such revised Terms are posted.\nThe information provided on the Website and Mobile App is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Site from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.'}
                        </Text>
                        <Text 
                          style ={styles.titleText}>
                          {'USE LICENSE'}
                        </Text>
                        <Text 
                          style ={styles.contentText}>
                            {'Licensee is hereby granted the permission to access the Electronic Court of Appeal Reports through the Court of Appeal Reports Nigeria Website and the Mobile Application (App) in accordance with the terms and conditions stipulated in this agreement. Licensor reserves all rights not expressly granted the Licensee.'}
                        </Text>
                        <Text 
                          style ={styles.titleText}>
                          {'User License For The Mobile Application'}
                        </Text>
                        <Text 
                          style ={styles.contentText}>
                            {'If you access the Electronic Court of Appeal Reports via the mobile application, then we grant you a revocable, non-exclusive, non-transferable, limited right to install and use the mobile application on wireless electronic devices owned or controlled by you, and to access and use the mobile application on such devices strictly in accordance with the terms and conditions of this mobile application license contained in these Terms of Use. You shall not: (1) decompile, reverse engineer, disassemble, attempt to derive the source code of, or decrypt the application; (2) make any modification, adaptation, improvement, enhancement, translation, or derivative work from the application; (3) violate any applicable laws, rules, or regulations in connection with your access or use of the application; (4) remove, alter, or obscure any proprietary notice (including any notice of copyright or trademark) posted by us or the licensors of the application; (5) use the application for any revenue generating endeavor, commercial enterprise, or other purpose for which it is not designed or intended; (6) make the application available over a network or other environment permitting access or use by multiple devices or users at the same time; (7) use the application for creating a product, service, or software that is, directly or indirectly, competitive with or in any way a substitute for the application; (8) use the application to send automated queries to any website or to send any unsolicited commercial e-mail; or (9) use any proprietary information or any of our interfaces or our other intellectual property in the design, development, manufacture, licensing, or distribution of any applications, accessories, or devices for use with the application.'}
                        </Text>
                        <Text 
                          style ={styles.titleText}>
                          {'Apple and Android Devices'}
                        </Text>
                        <Text 
                          style ={styles.contentText}>
                            {'The following terms apply when you obtain the mobile application from either the Apple Store or Google Play (each an “App Distributor”) to access the Content: (1) the license granted to you for our mobile application is limited to a non-transferable license to use the application on a device that utilizes the Apple iOS or Android operating systems, as applicable, and in accordance with the usage rules set forth in the applicable App Distributor’s terms of service; (2) we are responsible for providing any maintenance and support services with respect to the mobile application as specified in the terms and conditions of this mobile application license contained in these Terms of Use or as otherwise required under applicable law, and you acknowledge that each App Distributor has no obligation whatsoever to furnish any maintenance and support services with respect to the mobile application.'}
                        </Text>
                        <Text 
                          style ={styles.titleText}>
                          {'INTELLECTUAL PROPERTY RIGHTS'}
                        </Text>
                        <Text 
                          style ={styles.contentText}>
                            {'Unless otherwise indicated, the Website  and Mobile App is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Website and Mobile App (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of the Federal Republic of Nigeria, foreign jurisdictions, and international conventions.  The Content and the Marks are provided on the Website and Mobile App “AS IS” for your information and personal use only.  Except as expressly provided in these Terms of Use, no part of the Website  or Mobile App and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.\nProvided that you are eligible to use the Site, you are granted a limited license to access and use the Website or Mobile App and to download or print a copy of any portion of the Content to which you have properly gained access solely for your personal, non-commercial use. We reserve all rights not expressly granted to you in and to the Website or Mobile App, Content and the Marks.'}
                        </Text>
                        <Text 
                          style ={styles.titleText}>
                          {'USER REPRESENTATIONS'}
                        </Text>
                    
                        <Text 
                          style ={styles.contentText}>
                            {'By using the Website/Mobile App, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary;] (3) you have the legal capacity and you agree to comply with these Terms of Use; (4) you will not access the Website or Mobile App through automated or non-human means, whether through a bot, script or otherwise; (5) you will not use the Website or Mobile App for any illegal or unauthorized purpose;  and (6) your use of the Website or Mobile App will not violate any applicable law or regulation.\nIf you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Website or Mobile App (or any portion thereof).'}
                        </Text>
                        
                        <Text 
                          style ={styles.titleText}>
                          {'USER REGISTRATION'}
                        </Text>
                        <Text 
                          style ={styles.contentText}>
                            {'You are required to register with the Website or Mobile App. To register, you are required to create a user account which involves creating your username and password, and supplying your current email address and mobile telephone number. If you change your email address or mobile telephone number, you must update it as soon as is reasonably possible through our in-app/website change-number feature. You agree to receive emails, text messages or phone calls, from us or our third-party providers, with codes to register for our services (or with instructions to create a new password, as the case may be). Registration does not grant automatic access to the reported cases. Subscription is required to enable you access reported cases.\nYou agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.'}
                        </Text>
                        <Text 
                          style ={styles.titleText}>
                          {'SUBSCRIPTION'}
                        </Text>
                        <Text 
                          style ={styles.contentText}>
                            {'After registration, you are required to pay for subscription to access the reported cases, in accordance with the subscription-plans we have stipulated. Access to the reported cases will cease when your subscription expires. However, immediately after expiration of subscription, you have 7 (seven) days window period before access to the reported cases is denied. You agree that prompts will be regularly sent to you within those 7 (seven) days, by email, to remind you to re-subscribe.'}
                        </Text>
                        <Text 
                          style ={styles.titleText}>
                          {'Subscription Plans'}
                        </Text>
                        <Text 
                          style ={styles.contentText}>
                            {'You can access the Electronic Court of Appeal Reports in the Website/Mobile App by subscribing to either the Individual plan for personal use or the Corporate plan, for firms or organizations. The individual plan consists of the Monthly, Six Months and Yearly Plans. The corporate plan consists of the Basic, Premium and Unlimited Plans.'}
                        </Text>
                        <Text 
                          style ={styles.titleText}>
                          {'Existing Users/Subscribers:'}
                        </Text>
                        <Text 
                          style ={styles.contentText}>
                            {'If you are already registered, and have an account, on our website - https://courtofappealreportsnigeria.com/ - at the time the Mobile app was launched, you can use the same log-in details you use for the website to access the Mobile App.'}
                        </Text>
                        <Text 
                          style ={styles.titleText}>
                          {'APPROPRIATE DEVICES AND SOFTWARE'}
                        </Text>
                        <Text 
                          style ={styles.contentText}>
                            {'You must possess appropriate devices, software and data connections to use the Website and Mobile App, and we provide none of those. You agree to download and install updates to the app whenever updates are required.'}
                        </Text>
                        <Text 
                          style ={styles.titleText}>
                          {'PROHIBITED ACTIVITIES'}
                        </Text>
                        <Text 
                          style ={styles.contentText}>
                            {'You may not access or use the Website for any purpose other than that for which we make the Website or Mobile App available. The Website or Mobile App may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us. As a user of the Website or Mobile App, you agree not to:\n 1.  systematically retrieve data or other content from the Website or Mobile App to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us. \n2.  make any unauthorized use of the Website or Mobile App, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses. \n3.  use a buying agent or purchasing agent to make purchases on the Website and Mobile App. \n4.  use the Website or Mobile App to advertise or offer to sell goods and services \n5.  circumvent, disable, or otherwise interfere with security-related features of the Website, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Website or Mobile App and/or the Content contained therein. \n6.  engage in unauthorized framing of or linking to the Website. \n7.  trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords; \n8.  make improper use of our support services or submit false reports of abuse or misconduct. \n9.  engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools. \n10.  interfere with, disrupt, or create an undue burden on the Website/Mobile App or the networks or services connected to the Website/Mobile App. \n11.  attempt to impersonate another user or person or use the username of another user. \n12.  sell or otherwise transfer your profile. \n 13.  use any information obtained from the Website/Mobile App in order to harass, abuse, or harm another person. \n14.  use the Website/Mobile App as part of any effort to compete with us or otherwise use the Website/Mobile App and/or the Content for any revenue-generating endeavor or commercial enterprise.'}
                        </Text>
                        <Text 
                          style ={styles.titleText}>
                          {''}
                        </Text>
                        <Text 
                          style ={styles.contentText}>
                            {''}
                        </Text>
                        
                        <Text 
                          style ={styles.titleText}>
                          {''}
                        </Text>
                        <Text 
                          style ={styles.contentText}>
                            {''}
                        </Text>
                      </View>
                    </ScrollView>
                  </View>
                  <View style = {styles.modalButton }> 
                    <TouchableHighlight
                      style = {styles.buttonClose}
                      onPress={ this.closeTermsModal}>
                      <Text style = {styles.closeText}>
                        {'Close'}
                      </Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>
            </View>
            <ProgressDialog
              visible={showLoading}
              title="Processing"
              message="Please wait..."/>
                 
          </ScrollView>
        </KeyboardAvoidingView>
            
        <View style = {styles.btnView}>
            <SubmitButton
              title={'Sign Up'}
              disabled={!this.toggleButtonState()}
              onPress={this.handleSignUp}
              titleStyle={styles.btnText}
              btnStyle = {styles.btnStyle}
            />
            <View style={{marginBottom: 12}}>
              {/* <Button 
                onPress={this.Toast} 
                title="Toast Bottom"/> */}
            </View>
            <View style = {StyleSheet.flatten(styles.signupLinkView)}>
              <DisplayText
                text={'Already Registered? Sign In'}
                styles = {styles.signupText}
                onPress = {this.handleLogin}

              />
              {/* <DisplayText
                text={'Sign In'}
                style = {styles.createAccount}
                onPress = {this.handleLogin}
              /> */}
            </View>
          </View>  
         
     </SafeAreaView>
    )
   
  }
  
} 

export default Register;