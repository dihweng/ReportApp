'use strict';
import React, {Component} from 'react';
import { View, Text,  ScrollView, SafeAreaView, StatusBar, Image, KeyboardAvoidingView,TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText,InputField, SubmitButton, SingleButtonAlert } from '../../components';
import { getUserDetails } from '../Utils/Utils'
import styles from './styles';
import RadioGroup from 'react-native-radio-buttons-group';
import data from '../Utils/Countries';
import { ProgressDialog } from 'react-native-simple-dialogs';
import colors from '../../assets/colors'
import numeral from 'numeral';
import theme from '../../assets/theme'
export default class Subscribe extends Component {
  constructor(props) {
    super(props);
    this.state ={
      id: '',
      plan_id: '',
      flag: '',
      paymentType: 'Online',
      amount: '',
      showAlert: false,
      showLoading: false,
      visible: false,
      message: '',
      title: '',
      isValidPlan: false, 
      token: '',
      payment : [
        {
          label: 'Online',
          value: 'Online',
          selected: true,
          color: theme.primaryColor,
          disabled: false,
          size: 14
        },
        {
          label: 'Manual',
          value: 'Manual',
          selected: false,
          color: theme.primaryColor,
          disabled: false,
          size: 14
        },
      ]
    }
    
  }

  async componentDidMount(){
    let userDetails = await getUserDetails();
    
    await this.setState({
      email: userDetails.data.email,
      phoneNumber: userDetails.data.phone,
      name: userDetails.data.name,
      token: userDetails.token,
      id: userDetails.data.id,
    });
    await this.handleGetProduct();
  }
  handleSubscription = () => {
    return this.props.navigation.navigate('ManageSubscription');
  }
  handleViewPlan = () => {
    return this.props.navigation.navigate('ViewPlan');
  }
  handleSubscribe = () => {
    return this.props.navigation.navigate('Subscribe');
  }
  handleonBackPress = () =>{
    return this.props.navigation.navigate('ViewPlan');
  }
  handleGetProduct = async() => {
    const { navigation } = this.props,
      plan_id = navigation.getParam('plan_id', 'NO-ID'),
      amount = navigation.getParam('amount', 'NO-ID'),
      planType = navigation.getParam('planType', 'NO-ID'),
      planName = navigation.getParam('name', 'NO-ID');

    await this.setState ({
      plan_id,
      planType,
      amount,
      planName,
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

  handlePhoneChange = (text) => {
    if(text.length > 0) {
      this.setState({
        phone : text
      });
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

  handleConfirm = () => {
    const {id, plan_id, paymentType} = this.state;
    (paymentType === 'Online') ? 
      this.props.navigation.navigate('Payment', {
        'id': id,
        'plan_id': plan_id
      })
    : 
    this.handleBankPayment();
  }
  handleBankPayment=()=>{
    alert('Pay in the bank');
  }

  onCheckPlan = async(plan) => {
    this.setState({ 
      plan,
    });
    await this.radioStatePay();
  }

  radioStatePay = async() => {
    const { payment } = this.state;
    let selectedButtonPlan = payment.find(e => e.selected == true);
    selectedButtonPlan = selectedButtonPlan ? selectedButtonPlan.value : payment[0].label;

    if ( selectedButtonPlan === 'Online') {
      return this.setState({
        paymentType: selectedButtonPlan
      });
    }
    else if ( selectedButtonPlan === 'Manual'){
      return this.setState({
        paymentType: selectedButtonPlan
      });
      // await this.planFilterFunction(selectedButtonPlan);
    }
  }

  render () {
    const { title, message, showAlert, showLoading, name, planName, phoneNumber, email, amount, planType } = this.state

    return(
      <SafeAreaView style={styles.container}> 
        <StatusBar barStyle="default" /> 
        <View style = {styles.navBar}>
          <TouchableOpacity
            onPress={this.handleonBackPress} 
            style = {styles.headerImage}>
            <Image
              onPress={this.handleonBackPress} 
              source = {require('../../assets/images/back.png')}
              style = {StyleSheet.flatten(styles.headerIcon)}
            />
          </TouchableOpacity>
          <View style = {styles.nameView}>
            <DisplayText
              text={'Manage Account'}
              styles = {StyleSheet.flatten(styles.txtHeader)}
            />
          </View>
        </View> 
        <View style = {styles.cards}>
          <TouchableOpacity
            onPress = {this.handleSubscription}  
            style = {styles.customTabTp2}>
              <DisplayText
              text={'Subscription'}
              onPress = {this.handleSubscription}  
              styles = {StyleSheet.flatten(styles.txtTabHeader)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress = {this.handleViewPlan}  
            style = {styles.customTabTp2}>
              <DisplayText
              text={'View Plan'}
              onPress = {this.handleViewPlan}  
              styles = {StyleSheet.flatten(styles.txtTabHeader)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress = {this.handleSubscribe}  
            style = {styles.customTabTp}>
              <DisplayText
              text={'Subscribe'}
              onPress = {this.handleSubscribe}  
              styles = {StyleSheet.flatten(styles.txtTabHeader)}
            />
          </TouchableOpacity>
          
        </View>
      <View style = {styles.subscribtionView}>
        <KeyboardAvoidingView
          style={styles.wrapper}
          behavior = 'padding'> 
          <ScrollView 
            style={{flex:1,}}
            showsVerticalScrollIndicator={false}>
              <View style = {styles.subPlanView}>
                <DisplayText
                  text={'Subscribtion Plan'}
                  styles = {StyleSheet.flatten(styles.subName)}
                />
                
                <View style={styles.planView}>
                  <View style={styles.viewCicle}>
                    <View style={styles.innerView}></View>
                  </View>
                  <DisplayText
                    text={`${planType} ${'Plan'}`}
                    styles = {StyleSheet.flatten(styles.planName)}
                  />
                </View>
              </View>
              
              <View style = {styles.formView}>
                <DisplayText
                  text={'Name *'}
                  styles = {styles.formHeaderTxt}
                />
                <TouchableOpacity 
                  underlayColor={colors.white}
                  style = {styles.textBoder}>
                  <View style = {styles.viewTxtPlan}>
                    <Text style = {styles.genderText}>
                      {name}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style = {styles.formView}>
                <DisplayText
                  text={'Email *'}
                  styles = {styles.formHeaderTxt}
                />
                <TouchableOpacity 
                  underlayColor={colors.white}
                  style = {styles.textBoder}>
                  <View style = {styles.viewTxtPlan}>
                    <Text style = {styles.genderText}>
                      {email}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View> 
              <View style = {styles.formView}>
                <DisplayText
                  text={'Phone Number *'}
                  styles = {styles.formHeaderTxt}
                />
                <TouchableOpacity 
                  underlayColor={colors.white}
                  style = {styles.textBoder}>
                  <View style = {styles.viewTxtPlan}>
                    <Text style = {styles.genderText}>
                      {phoneNumber}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View> 
               {/* Plan modal selection */}
               <View style = {styles.formContainer}>
                <DisplayText
                  text={'Plan *'}
                  styles = {styles.formHeaderTxt}
                />
                <TouchableOpacity 
                  underlayColor={colors.white}
                  style = {styles.textBoder}>
                  <View style = {styles.viewTxtPlan}>
                    <Text style = {styles.genderText}>
                      {`${planName} ₦${numeral(amount).format('0,0.00').toString()}`}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              {/* Payment type radio button */}
              <View style = {styles.payTypeView}>
                <DisplayText
                  text={'Payment method'}
                  styles = {StyleSheet.flatten(styles.radioTitle)}
                />
                {/* <View style = {styles.payCheckView}> */}
                  <RadioGroup 
                    radioButtons = {this.state.payment} 
                    onPress = {this.onCheckPlan} 
                    flexDirection = 'row'/>
                {/* </View> */}
              </View>
            <View style = {styles.btnView}>
              <ProgressDialog
                visible={showLoading}
                title="Processing"
                message="Please wait..."
              />
              <SubmitButton
                title={'Confirm'}
                onPress={this.handleConfirm}
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
      </View>
    </SafeAreaView>
    )
  }
} 
