'use strict';
import React, {Component} from 'react';
import { 
  View, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar, 
  Image, 
  AsyncStorage, 
  StyleSheet,
  KeyboardAvoidingView,
  FlatList,
  TouchableWithoutFeedback,
  Text,
  Modal,

} from 'react-native';
import {
  Container,
  Item,
  Input,
  Icon
} from 'native-base'
import styles from './styles';
import colors from '../../assets/colors'
import data from '../Register/Countries';
import { ProgressDialog } from 'react-native-simple-dialogs';
import {DisplayText, InputField, SingleButtonAlert, SubmitButton} from '../../components';
import { UpdateBankDetails, putRoute, getUserDetails } from '../Utils/Utils';
import moment from 'moment';

const defaultFlag = data.filter(
  obj => obj.name === 'Nigeria'
  )[0].flag

export default class ContactDetails extends Component {
  constructor(props) {
    super(props);
    this.state ={
      isAddressValid : false,
      isStateProRegValid : false,
      isCityValid : false,
      flag : defaultFlag,
      nationalityModalVisible : false,
      showAlert : false,
      showLoading : false,
      title : '',
      message : '',
      id : '',
      token : '',
      address : '',
      city : '',
      stateProReg :'',
      country : '',
    }
  }

  async componentDidMount(){
    let userDetails = await getUserDetails();

    const id = userDetails.data.id,
      token = userDetails.token;
      
    // let newDate = moment(dob).format("YYYY/MM/DD");

      this.setState({
      id,
      token,
    });
  }

  
  handleUpdate = async() => {
    const {  id, token, address, city, country, stateProReg } = this.state;

    this.setState({
      showLoading: true,
    });

    let endpoint = `${UpdateBankDetails}/${id}`;    

    let body = {
      address:address,       
      city:city,
      country:country,
      state : stateProReg,
    };
    fetch(endpoint, {
      method : "PUT",
      body : JSON.stringify(body),
      headers : {
        "Accept" : "application/json",
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then((res) => {
      if (typeof res.message !== 'undefined' && res.message !== 'Profile updated successfully' ) {
        return this.setState({
          showLoading : false,
          title : 'Alert',
          message : res.message,
          showAlert : true,
        });
      }
      else {
        this.setState({
          showLoading : false,
        });
        return this.props.navigation.navigate('ManageAccount')
        // return this.refs.toast.show(res.message, 300);
      }
    })
  }

  handleChangeAddress = (address) => {
    if (address.length > 0) {
      this.setState({
        isAddressValid : true,
        address: address
      });
    }
    else {
      if ( address.length < 1 ) {
        this.setState({
          isAddressValid : false
        })
      }
    }
  }

  handleChangeSpr = (stateProReg) => {
    if (stateProReg.length > 0) {
      this.setState({
        isStateProRegValid : true,
        stateProReg: stateProReg
      });
    }
    else {
      if ( stateProReg.length < 1 ) {
        this.setState({
          isStateProRegValid : false
        })
      }
    }
  }
  handleChangeCity = (city) => {
    if (city.length > 0) {
      this.setState({
        isCityValid : true,
        city: city
      });
    }
    else {
      if ( city.length < 1 ) {
        this.setState({
          isCityValid : false
        })
      }
    }
  }
  handdleBackPress = () => {
    return this.props.navigation.goBack();
  };
  handleCloseNotification = () => {
    return this.setState({
      showAlert : false
    });
  }


  selectNationality = async(country) => {
    // Get data from Countries.js  
    const countryData = await data
    try {
      //get country  name
      const countryName = await countryData.filter(
        obj => obj.name === country
      )[0].name
      // Update the state then hide the Modal
      this.setState({ 
        country : countryName,
      })
      await this.hideNationalityModal()
    }
    catch (err) {
      console.log(err)
    }
  }

  showNationalityModal = ()=> {
    this.setState({ 
      nationalityModalVisible: true 
    })
  }
  hideNationalityModal =()=> {
    this.setState({ 
      nationalityModalVisible: false 
    })
    // Refocus on the Input field after selecting the country code
    // this.refs.PhoneInput._root.focus()
  }

  
  render () {
    const { title, message, showAlert, showLoading } = this.state
    const countryData = data

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
          {/* Card Contact Details */}
          <View style = {styles.cards}>
          <View style = {styles.cardImageView}>
            <Image
              source = {require('../../assets/images/email.png')}
              style = {StyleSheet.flatten(styles.cardIcon)}
            />
          </View>
          <View style = { styles.viewText}>
            <DisplayText
              text={'Contact Details'}
              styles = {StyleSheet.flatten(styles.amtText)}
            />
          </View>
          <TouchableOpacity 
            onPress = {this.handleContactDetails}
            style = {styles.angleView}>
            <Image
              onPress = {this.handleContactDetails}
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
                  text={'Address *'}
                  styles = {styles.formHeaderTxt}
                />
                <InputField
                  textColor={colors.text_color}
                  inputType={'name'}
                  keyboardType={'default'}
                  onChangeText = {this.handleChangeAddress}
                  autoCapitalize = "words"
                  height = {40}
                  // borderWidth = {1}
                  borderColor={colors.field_color}
                  borderRadius={4}
                  paddingLeft = {8}
                  formStyle = {styles.formstyle}
                  
                /> 
              </View>

              {/* Nationality */}
              <View style = {styles.CountryView}>
                <DisplayText
                  text={'Coutry *'}
                  styles = {styles.formHeaderTxt}
                />
                <TouchableOpacity 
                  underlayColor={colors.white}
                  onPress={() => this.showNationalityModal()}
                  style = {styles.textBoder}>
                  <View style = {styles.viewTxtgender}>
                    <Text style = {styles.genderText}>
                      {this.state.country}
                    </Text>
                    <Icon
                      active
                      name='md-arrow-dropdown'
                      style={styles.iconStyle}
                      onPress={() => this.showNationalityModal()}
                    />
                    </View>
                    </TouchableOpacity>
                      <Modal
                        animationType="slide"
                        transparent={true}
                        onRequestClose={this.hideNationalityModal}
                        visible={this.state.nationalityModalVisible}>
                        <View style={{ flex : 1, paddingLeft : 20, paddingRight : 20}}>
                          <View style={{ flex: 7, marginTop: 10 }}>
                            {/* Render the list of countries */}
                            <FlatList
                              data={countryData}
                              keyExtractor={(item, index) => index.toString()}
                              renderItem={
                                ({ item }) =>
                                  <TouchableWithoutFeedback onPress={() => this.selectNationality(item.name)}>
                                    <View style={styles.countryStyle}>
                                      <Text style={styles.textStyle}>
                                        {item.flag} {item.name} 
                                      </Text>
                                    </View>
                                  </TouchableWithoutFeedback>
                              }
                            />
                          </View>
                          <View style={styles.closeButtonStyle}>
                          <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => this.hideNationalityModal()}>
                            <Text style={styles.textBtn}>
                              Close
                            </Text>
                          </TouchableOpacity>
                          </View>
                          
                        </View>
                      </Modal>
                    </View>

              <View style = {styles.formView}>
                <DisplayText
                  text={'State/Provice/Region *'}
                  styles = {styles.formHeaderTxt}
                />
                <InputField
                  textColor={colors.text_color}
                  inputType={'name'}
                  keyboardType={'default'}
                  onChangeText = {this.handleChangeSpr}
                  autoCapitalize = "words"
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
                text={'City *'}
                styles = {styles.formHeaderTxt}
              />
              <InputField
                textColor={colors.text_color}
                inputType={'name'}
                keyboardType={'default'}
                onChangeText = {this.handleChangeCity}
                autoCapitalize = "words"
                height = {40}
                // borderWidth = {1}
                borderColor={colors.field_color}
                borderRadius={4}
                paddingLeft = {8}
                formStyle = {styles.formstyle}
                
              />  
            </View>
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
              <SingleButtonAlert
                title = {title} 
                message = {message}
                handleCloseNotification = {this.handleCloseNotification}
                visible = {showAlert}
              />
            </View>
          </ScrollView>
         
        </KeyboardAvoidingView>
        
    </SafeAreaView>
    
   )
  }
} 
