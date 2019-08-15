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
                      <Text 
                        style ={styles.termsContHeader}>
                        {'Terms & Conditions'}
                      </Text>
                    </View>
                    
                    <View style={styles.horizonLine} />
                    <ScrollView contentContainerStyle= {styles.scrollview}>
                      <View style={{flexDirection: 'column',padding: 4,}}>
                      <Text 
                          style ={styles.contentText}>
                            {'The Electronic Court of Appeal Reports (E-C.A.R.), a service provided   byLaurels and Prizes Law Publications Ltd. presents the reconditepronouncements of the Court of Appeal of Nigeria, and it is aimed at satisfyingthe needs of fast paced, technology savvy legal professionals and intellectuals.Thus, it is an essential tool for legal practitioners on the bench and in the bar,law   faculties   and   law   students,   scholars   in   other   fields   of   education   andintellectuals, generally, who have interests in legal matters. Please read ourterms of service carefully to understand how we intend to serve you. You agreeto our terms of service by installing, registering, subscribing or otherwise usingthe app. '}
                        </Text>
                        <Text 
                          style ={styles.titleText}>
                          {'TERMS AND CONDITIONS'}
                        </Text>
                        <Text 
                          style ={styles.titleText}>
                          {'End User License Agreement'}
                        </Text>
                        <Text 
                          style ={styles.contentText}>
                            {'This is a legal agreement between you (“Licensee”) and Laurels and Prizes Law Publications Ltd. (“Licensor”) regarding your use of the E-C.A.R. app ("the app"). By installing, registering, subscribing or otherwise using the app, you agree to be bound by the terms of this agreement.'}
                        </Text>
                        <Text 
                          style ={styles.titleText}>
                          {'Grant of License'}
                        </Text>
                        <Text 
                          style ={styles.contentText}>
                            {'Licensee is hereby granted the permission to install and use the app on asupported device in accordance with the terms and conditions stipulated inthis agreement. Licensor reserves all rights not expressly granted the Licenseein this agreement.'}
                        </Text>
                        <Text 
                          style ={styles.titleText}>
                          {'Restrictions on Use of the app'}
                        </Text>
                        <Text 
                          style ={styles.contentText}>
                            {'Licensee shall not reverse engineer, decompile or disassemble the app. Licensorassumes no responsibility for any damages that occur if the app is usedincorrectly'}
                        </Text>
                        <Text 
                          style ={styles.titleText}>
                          {'Registration'}
                        </Text>
                        <Text 
                          style ={styles.contentText}>
                            {'You must register for our services by creating a user account which involvescreating your username and password, and supplying your current emailaddress and mobile telephone number. A first-time user of our service will beable to trial the app for free for the first 2 (two) weeks, after registration. At theexpiration of that 2 (two) weeks, to continue to enjoy our services, you mustsubscribe.   If   you   change   your   name   or   mobile   telephone   number   aftersupplying them during registration, you must update as soon as is reasonably possible, through our in-app update feature. You agree to receive emails, withat least one hyperlink included, to register and create a new account or tocreate a new password, as the case may be. Except for first-time users (for thetrial period only) registration does not grant automatic access to the reportedcases.'}
                        </Text>
                        <Text 
                          style ={styles.titleText}>
                          {'Subscription required'}
                        </Text>
                    
                        <Text 
                          style ={styles.contentText}>
                            {'After registration, you must pay for subscription to access the reported cases,in accordance with the subscription-plans we have stipulated (unless you afirst-time user who is entitled to 2 (two) weeks of free trial). Access to thereported cases will cease when your subscription expires. You agree to receivenotices, in-app and by email, to inform you of an imminent expiration of yoursubscription, and to remind you to re-subscribe'}
                        </Text>
                        
                        <Text 
                          style ={styles.titleText}>
                          {'Subscription Plans'}
                        </Text>
                        <Text 
                          style ={styles.contentText}>
                            {'You can subscribe to either the individual plan: for personal use, or the corporate plan: for multiple users in firms or organizations. The individual planconsists of.... The corporate plan consists of three categories: Premium .... '}
                        </Text>
                        <Text 
                          style ={styles.titleText}>
                          {'Appropriate Devices and Software '}
                        </Text>
                        <Text 
                          style ={styles.contentText}>
                            {'You must possess appropriate devices, software and data connection to use theapp, and we do not provide any of those. You agree to download and install updates to the app whenever updates are made available.'}
                        </Text>
                        <Text 
                          style ={styles.titleText}>
                          {'Third-party advertisements forbidden '}
                        </Text>
                        <Text 
                          style ={styles.contentText}>
                            {'We do not permit third-parties to advertise on the app, thereby ensuring that you enjoy distractions-free usage of the app.'}
                        </Text>
                        <Text 
                          style ={styles.titleText}>
                          {'Existing users:'}
                        </Text>
                        <Text 
                          style ={styles.contentText}>
                            {'If you are already registered, and have an account, on our website -https://courtofappealreportsnigeria.com/  - at the time the app became waslaunched, you can use the same log-in details you use for the website to accessthe app. '}
                        </Text>
                        <Text 
                          style ={styles.titleText}>
                          {'Availability of our services'}
                        </Text>
                        <Text 
                          style ={styles.contentText}>
                            {'You may experience interruptions while using the app, including interruptions caused by, or for updates, upgrades, repairs, maintenance, or due to network or equipment failures, factors beyond our control and other force majeureevents. We may modify or discontinue certain features or services on the app atany time, including its user-interface and graphic presentation, or discontinuesupport for any device or platform at any time. We may amend or update theseterms as need arises. However, you will be provided notice of such modifications, discontinuance, amendments or updates before they are implemented. Your continued use of the app after such notices are provided,and implementations effected, confirms your acceptance of our terms ofservice, as so amended.'}
                        </Text>
                        <Text 
                          style ={styles.titleText}>
                          {'Termination of License'}
                        </Text>
                        <Text 
                          style ={styles.contentText}>
                          {'Licensor reserves the right to modify, suspend or terminate access to the app ifLicensee is found in violation of this agreement. When access to the app is soterminated, all rights granted to Licensee under this agreement shall immediately cease'}
                        </Text>
                        <Text 
                          style ={styles.titleText}>
                          {'Disclaimers'}
                        </Text>
                        <Text 
                          style ={styles.contentText}>
                            {'You use the app on an ‘as is’ basis without any express or implied warranties,including,   but   not   limited   to,   warranties   of   merchantability,   fitness   for   aparticular purpose, title, non-infringement, and freedom from computer virusor other harmful code. We do not warrant that our services will be operational,error-free, secure or safe, or that our services will function without disruptions,delays or imperfections. We do not warrant that all information provided by usare accurate, useful and complete'}
                        </Text>
                        
                        <Text 
                          style ={styles.titleText}>
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