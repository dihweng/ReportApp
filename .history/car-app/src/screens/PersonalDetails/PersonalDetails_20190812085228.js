'use strict';
import React, {Component} from 'react';
import { 
  View, 
  ScrollView, 
  SafeAreaView, 
  StatusBar, 
  TouchableOpacity, 
  Image, 
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Modal,
  TouchableHighlight,
} from 'react-native';
import {Input, Icon} from 'native-base'
import {DisplayText, InputField, SingleButtonAlert, SubmitButton} from '../../components';
import styles from './styles';
import colors from '../../assets/colors'
import data from '../Register/Countries';
import { ProgressDialog } from 'react-native-simple-dialogs';
import { UpdateUserEndpoint,updateUserDetails, getUserDetails } from '../Utils/Utils';
import theme from '../../assets/theme';
import {connect} from 'react-redux';
import { setProfile } from '../../redux/actions/ProfileActions';
import DropdownAlert from 'react-native-dropdownalert';


const defaultFlag = data.filter(
  obj => obj.name === 'Nigeria'
  )[0].flag

 class PersonalDetails extends Component {
  constructor(props) {
    super(props);
    this.state ={
      modalGenderVisible: false,
      isValidGender: false,
      // isOccupationValid: false,
      flag : defaultFlag,
      modalVisible : false,
      nationalityModalVisible : false,
      showAlert : false,
      showLoading : false,
      visible : false,
      startDatePickerVisible : false,
      id : '',
      token : '',
      name : '',
      gender: 'Gender',
      email : '',
      phone : '',
      title : '',
      message : '',
      
    }
  }

  componentWillMount () {
    // Default render of country flag
    const defaultFlag = data.filter(obj => obj.name === 'Nigeria')[0].flag;
    this.setState({
      flag :defaultFlag,
    })

  }
  async componentDidMount(){
    let userDetails = await getUserDetails();
    const {profile} = this.props;
    
    await this.setState({
      id:userDetails.data.id,
      token:userDetails.token,
      name: profile.name,
      email:profile.email,
      phone: profile.phone,
      gender: profile.gender,
      nationality: profile.country,

    });
  }

  handdleBackPress = () => {
    return this.props.navigation.goBack();
  };

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
    return this.dropDownAlertRef.alertWithType(type, title, message);
  }

  handleCloseNotification = () => {
    return this.setState({
       showAlert : false,
     })
  }

  handleUpdate = async() => {
    this.showLoadingDialogue();

    const {  id, token, name, gender, email, phone, country } = this.state;
    let endpoint = `${UpdateUserEndpoint}/${id}`;
    let body = {name, email,  gender, phone, country,};

    const settings = {
      method : "PUT",
      body : JSON.stringify(body),
      headers : {
        "Accept" : "application/json",
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    }

    try {

      let response = await fetch(endpoint, settings);
      let res =  await response.json();
      if(typeof res.errors !== 'undefined') {
        const value = Object.values(res.errors);
        return this.showNotification(value[0].toString(), 'Error');
      }
      else {
        this.props.setProfile(res.data);
        updateUserDetails(res.data, token);
        return this.showNotification('Profile Updated Successfully', 'Success');    
      }
    }
    catch(error) {
      return this.showNotification(error.toString(), 'Message');
    }
   
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

  handlePhoneChange = (text) => {
    if(text.length > 0) {
      this.setState({
        isValidPhone: true,
        phone : text
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
 
  // phone numberz
  onChangeText(key, value) {
    this.setState({
      [key]: value
    })
  }

  showModal() {
    this.setState({ 
      modalVisible: true 
    })
  }
  hideModal() {
    this.setState({ 
      modalVisible: false 
    })
    // Refocus on the Input field after selecting the country code
    this.refs.PhoneInput._root.focus()
  }

  //show date picker
  showStartDateTimePicker = () => {
    this.setState({startDatePickerVisible : true});
  };
  //hide date picker
  hideStartDateTimePicker = () => {
    this.setState({startDatePickerVisible: false});
  };


  setGenderPicker = (newValue) => {
    this.setState({
      gender: newValue,
      isValidGender: true
    });
    this.closeGenderModal();
  }

  handleGender = () => {
    this.toggleGenderModal(true);
  };

  toggleGenderModal = (visible) => {
    this.setState({ modalGenderVisible : visible });
  };

  closeGenderModal = () => {
    this.toggleGenderModal(!this.state.modalGenderVisible);
  };

  
render () {
  const pickerGender = [
    {title: 'Female', value: 'Female'},
    {title: 'Male', value: 'Male'},
  ];
  const { title, message, showAlert, showLoading, flag, name, email, phone, gender, nationality  } = this.state;

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
      {/* Personal Details Card */}
      <View style = {styles.cards}>
        <View style = {styles.cardImageView}>
          <Image
            source = {require('../../assets/images/user.png')}
            style = {StyleSheet.flatten(styles.cardIcon)}
          />
        </View>
        <View style = { styles.viewText}>
          <DisplayText
            text={'Personal Details'}
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
                text={'Full Name *'}
                styles = {styles.formHeaderTxt}
              />
              <InputField
                textColor={theme.textGray}
                inputType={'name'}
                keyboardType={'default'}
                onChangeText = {this.handleFullName}
                autoCapitalize = "words"
                height = {40}
                defaultValue={name}
                // borderWidth = {1}
                borderColor={colors.field_color}
                borderRadius={4}
                paddingLeft = {8}
                formStyle = {styles.formstyle}
                
              /> 
            </View>
            <View style = {styles.dateGenderView}>
          
              {/* Gender modal selection */}
              <View style = {styles.formContainer}>
                <DisplayText
                  text={'Gender *'}
                  styles = {styles.formHeaderTxt}
                />
                <TouchableOpacity 
                  underlayColor={colors.white}
                  onPress = {this.handleGender}
                  style = {styles.textBoder}>
                  <View style = {styles.viewTxtgender}>
                    <Text style = {styles.genderText}>
                      {gender}
                    </Text>
                    <Icon
                      active
                      name='md-arrow-dropdown'
                      style={styles.iconStyle}
                    />
                  </View>
                </TouchableOpacity>
                
              </View>
              <Modal
              animationType="slide"
              transparent={true}
              visible = {this.state.modalGenderVisible}
              onRequestClose={() => {console.log('Request was closed')}}>
              <View style={styles.modalContainer}> 
                <View style={styles.modalStyle}>
                  <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ padding: 16}}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                      <DisplayText
                        style={styles.textHeaderStyle}
                        text ={'Gender'} 
                        />
                        {pickerGender.map((value, index) => {
                          return <TouchableHighlight key={index} onPress={() => this.setGenderPicker(value.value)}>
                            <Text style={styles.modalTxt}>{value.title}</Text>
                          </TouchableHighlight>;
                        })
                        }                    
                      </View>
                    </ScrollView>
                  </View>
                </View>
              </Modal>
            </View>
            <View style = {styles.formView}>
              <DisplayText
                text={'Email *'}
                styles = {styles.formHeaderTxt}
              />
              <InputField
                textColor={colors.text_color}
                inputType={'email'}
                keyboardType={'default'}
                onChangeText = {this.handleEmailChange}
                autoCapitalize = "none"
                height = {40}
                borderWidth = {1}
                defaultValue={email}
                borderColor={colors.field_color}
                borderRadius={4}
                paddingLeft = {8}
                formStyle = {styles.formstyle}
              />
            </View> 
            {/* Phone input with country code */}
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
                    style={[styles.iconStyle, { marginLeft: 5 }]}
                    onPress={() => this.showModal()}
                  />
                </TouchableOpacity>
                {/* </View> */}
                <Input
                  style={styles.input}
                  placeholder={phone ? phone :'+2348012341234'}
                  placeholderTextColor='#adb4bc'
                  keyboardType={'phone-pad'}
                  returnKeyType='done'
                  autoCapitalize='none'
                  autoCorrect={false}
                  secureTextEntry={false}
                  ref='PhoneInput'
                  value={this.state.phone}
                  onChangeText={(val) => {
                    if (this.state.phone === ''){
                      // render NIG phone code by default when Modal is not open
                      this.onChangeText('phone', '+234' + val)
                    } else {
                      // render country code based on users choice with Modal
                      this.onChangeText('phone', val)
                    }}
                  }
                />
              </View>
            </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style = {styles.signupLinkView}>
        <View style = {styles.btnView}>
          <ProgressDialog
            visible={showLoading}
            title="Processing"
            message="Please wait..."
          />
          <SubmitButton
            title={'Update'}
            onPress={this.handleUpdate}
            titleStyle={styles.btnText}
            btnStyle = {styles.btnStyle}
          />
          {/* <SingleButtonAlert
            title = {title} 
            message = {message}
            handleCloseNotification = {this.handleCloseNotification}
            visible = {showAlert}
          /> */}

          <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />

        </View>
      </View>
    </SafeAreaView>
    )
  }
} 

const mapStateToProps = (state, ownProps) =>{
  return{
    profile: state.ProfileReducer.profile
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    setProfile: (data) =>{dispatch(setProfile(data))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetails);
