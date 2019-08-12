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
  Button,
  TouchableHighlight,
} from 'react-native';
import { Input, Icon } from 'native-base'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: '',
      nameCode: '',
      phoneNumber: '',
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
    this.setState({
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
  checkPhone(phoneNumber) {
    if(!isPhoneValid(phoneNumber)){
      let message = 'Invalid Phone Number';
      return this.showNotification('error', 'Message', message);
    }
    else {
      return true;
    }
  }
  checkPassword(password1, password2) {
      if(password1 !== password2) {
      let message = 'Passwords Do not Match';
      return this.showNotification('error', 'Message', message);
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
   // await this.checkEmail(email);
    let isPhoneValid =  await this.checkPhone(phoneNumber);
    let isPasswordVAlid = await this.checkPassword(password, password2);

    if(isPhoneValid !== true && isPasswordVAlid) {
      return this.hideLoadingDialogue();
    }

    let body = {
      name : name, 
      email : email.toLowerCase(), 
      password : password, 
      phone : phoneNumber, 
      username : username,
    };

    try {
      await this.register(body)
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
                        <Text style ={styles.titleText}>
                          {'TERMS TO INVEST IN SETH MINING CROWD FUNDING'}
                        </Text>
                        <Text 
                          style ={styles.contentText}>
                          {'Please read this Agreement carefully before accessing the Seth mining crowd Website. Which states As a condition to and in consideration of receiving and accessing Seth Website, the User agrees to be bound by the terms of this Agreement. Use of or access to this constitute, acceptance of and concurrence to be bound by this Agreement. If you do not wish to be bound by this Agreement, do not access Seth Website. If you have any questions about this Agreement, please contact us via mail us at support@seth-mining-invest.com This Website is not for use by any minors (defined as those who are not at least 18 years of age), and you must not use this Website if you a child. This Agreement is entered between Seth (hereafter referred to as SETH MINING CROWDFUNDING ") and any individual, corporation, association, agency, the company, or other entity (hereafter referred to as " THE USER or YOU ") who accesses or uses Page\'s Website (also referred to as This Website SETH Website, is provided without charge to you, is a public website on the Internet Designed to allow Page to communicate with vice versa. This Website is owned and operated by SETH ENERGY & Mineral LLC & SETH ENERGY & MINERAL LTD It contains information, communications,opinions, text, graphics, links, electronic art animations, audio, video, Software,photos,music,sounds and other material and data (collectively referred to herein as Content") formatted, organized and collated in a variety of forms that are generally accessible to Users including directories and databases,and areas On SETH Website that can be modified by Users, such as posting classifieds, uploading multimedia files, registering user profiles, and creating auto notify, personalized pages, and customized project areas, which cannot be done on Seth crowd-funding website'}
                        </Text>
                        <Text 
                          style ={styles.titleText}>
                          {'ACCEPTANCE OF TERMS'}
                        </Text>
                        <Text 
                          style ={styles.contentText}>
                          {'The services that Seth Energy and Mineral Ltd provide to User is subject to the following Terms of Use ("TOU"). Seth Energy and Mineral Ltd & Seth Energy and Mineral LLC reserve the right to update the TOU at any time without notice to User. The most current version of the TOU can be review by clicking on the "Terms of Use" hypertext link located at the bottom of our Web pages.\nThis Agreement, which incorporates by reference other provisions applicable to use of www.seth-mining-invest.com, including, but not limited to, supplemental terms and conditions set forth hereof ("Supplemental Terms") governing the use of particular specific material contained in www.seth-mining-invest.com, sets forth the terms and conditions that apply to use of www.seth-mining-invest.com by User. By using Seth Energy (other than to read this Agreement for the first time), User agrees to comply with all of the terms and conditions hereof. The right to use www.seth-mining-invest.com is personal to User and is not transferable to any other person or entity. User is responsible for all use of User\'s Account (under any screen name or password) and for ensuring that all use of User\'s Account complies fully with the provisions of this Agreement. User shall be responsible for protecting the confidentiality of User\'s password(s) if any.\nSeth Mining Crowd Funding shall have the right at any time to change or discontinue any aspect or feature of www.seth-mining-invest.com, including, but not limited to, content, hours of availability, and equipment needed for access or use.'}
                        </Text>
                        <Text 
                          style ={styles.titleText}>
                          {'CHANGED TERMS'}
                        </Text>
                        <Text 
                          style ={styles.contentText}>
                          {'Seth shall have the right at any time to change or modify the terms and conditions applicable to User\'s use of www.seth-mining-invest.com, or any part thereof, or to impose new conditions, including, but do not or cannot add, any fees for use. Such changes, modifications, additions or deletions shall be effective immediately upon notice thereof, which may be given by means including, but not limited to, posting on www.seth-mining-invest.com, or by electronic or conventional mail, or by any other means by which User obtains notice thereof. Any use of www.seth-mining-invest.com by User after such notice shall be deemed to constitute acceptance by User of such changes, modifications or additions.'}
                        </Text>
                        <Text 
                          style ={styles.titleText}>
                          {'DESCRIPTION OF SERVICES'}
                        </Text>
                        <Text 
                          style ={styles.contentText}>
                          {'Through its Web property, Seth provides User with access to a variety of resources, including download areas, communication forums and product information (collectively "Services"). The Services, including any updates, enhancements, new features, and the addition of any new Web properties, are subject to the TOU. Updates via emails and recent development via website blog or app projects update.'}
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