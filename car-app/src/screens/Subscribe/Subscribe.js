'use strict';
import React, {Component} from 'react';
import { View, Text,  ScrollView, SafeAreaView, StatusBar, Image, KeyboardAvoidingView,TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText,InputField, SubmitButton, SingleButtonAlert } from '../../components';
import { getUserDatials } from '../Utils/Utils'
import styles from './styles';
import theme from '../../assets/theme';
import data from '../Utils/Countries';
import { ProgressDialog } from 'react-native-simple-dialogs';
import colors from '../../assets/colors'
import numeral from 'numeral';

export default class Subscribe extends Component {
  constructor(props) {
    super(props);
    this.state ={
      name: '',
      email: '',
      plan: '',
      phoneNumber: '',
      address: '',
      flag: '',
      planType: '',
      amount: 0,
      modalVisible: false,
      showAlert: false,
      showLoading: false,
      visible: false,
      message: '',
      title: '',
      modalPlanVisible: false,
      isValidPlan: false, 
    }
    
  }

  async componentDidMount(){
    const defaultFlag = data.filter(obj => obj.name === 'Nigeria')[0].flag;
    let userDetails = await getUserDatials();
    
    await this.setState({
      email: userDetails.data.email,
      phoneNumber: userDetails.data.phone,
      name: userDetails.data.name,
      flag :defaultFlag,
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

  handleGetProduct = async() => {
    const { navigation } = this.props;
    const amount = navigation.getParam('amount', 'NO-ID');
    const planType = navigation.getParam('planType', 'NO-ID');
    console.log({plandddd: planType, amount: amount});

    await this.setState ({
      planType,
      amount,
    });
  }
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigation.toggleDrawer();
  };
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
    alert('confirm coming soon');
  }

  setPlanPicker = (newValue) => {
    this.setState({
      plan: newValue,
      isValidPlan: true
    });
    this.closePlanModal();
  }

  handlePlan = () => {
    this.togglePlanModal(true);
  };

  togglePlanModal = (visible) => {
    this.setState({ modalPlanVisible: visible });
  };

  closePlanModal = () => {
    this.togglePlanModal(!this.state.modalPlanVisible);
  };

  render () {
    const { title, message, showAlert, showLoading, name, phoneNumber, email, amount, planType } = this.state

    return(
      <SafeAreaView style={styles.container}> 
        <StatusBar barStyle="default" /> 
        <View style = {styles.navBar}>
          <TouchableOpacity
            onPress={this.toggleDrawer.bind(this)} 
            style = {styles.headerImage}>
            <Image
              onPress={this.toggleDrawer.bind(this)} 
              source = {require('../../assets/images/menu.png')}
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
                    text={planType}
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
                      {amount}
                    </Text>
                  </View>
                </TouchableOpacity>
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
