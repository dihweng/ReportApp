'use strict';
import React, {Component} from 'react';
import { View, Text, Modal, FlatList, TouchableHighlight, ScrollView, SafeAreaView, StatusBar, Image, KeyboardAvoidingView,TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText,InputField, SubmitButton, SingleButtonAlert } from '../../components';
import styles from './styles';
import theme from '../../assets/theme';
import data from '../Utils/Countries';
import { ProgressDialog } from 'react-native-simple-dialogs';
import colors from '../../assets/colors'
import { Input, Icon } from 'native-base'

export default class Subscribe extends Component {
  constructor(props) {
    super(props);
    this.state ={
      name: '',
      email: '',
      plan: 'Plan',
      flag: '',
      phoneNumber : '',
      modalVisible : false,
      showAlert : false,
      showLoading : false,
      visible : false,
      message: '',
      title: '',
      modalPlanVisible: false,
      isValidPlan: false, 
    }
  }

  async componentDidMount(){
    const defaultFlag = data.filter(obj => obj.name === 'Nigeria')[0].flag;
    this.setState({
      flag :defaultFlag,
    })
    // let userDetails = await getUserDatials();

    // let bank = userDetails.data.bank_name;
    // this.setState({
    //   bankName: bank,
    // });
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
    const { title, message, showAlert, showLoading } = this.state
    const pickerPlanPersonal = [
      {title: 'One Month Plan ₦1200', value: '1200'},
      {title: 'Six Month Plan ₦6000', value: '6000'},
      {title: 'One Year Plan ₦12000', value: '12000'},
    ];
    const pickerPlanCooperate = [
      {title: 'Six Month Plan ₦6000', value: '6000'},
      {title: 'One Year Plan ₦12000', value: '12000'},
    ];
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
            onPress = {this.handleSubscribe}  
            style = {styles.customTabTp}>
              <DisplayText
              text={'Subscribe'}
              onPress = {this.handleSubscribe}  
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
        </View>
      <View style = {styles.subscribtionView}>
        <KeyboardAvoidingView
          style={styles.wrapper}
          behavior = 'padding'> 
          <ScrollView 
            style={{flex:1,}}
            showsVerticalScrollIndicator={false}>
              <View style = {styles.subPlanView}>

              </View>
              
              <View style = {styles.formView}>
                <DisplayText
                  text={'Address *'}
                  styles = {styles.formHeaderTxt}
                />
                <InputField
                  textColor={theme.inputTxtColor}
                  inputType={'name'}
                  keyboardType={'default'}
                  onChangeText = {this.handleChangeAddress}
                  autoCapitalize = "words"
                  height = {40}
                  // borderWidth = {1}
                  borderColor={theme.formBorderColor}
                  borderRadius={4}
                  paddingLeft = {8}
                  formStyle = {styles.formstyle}
                  
                /> 
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
                  borderColor={colors.field_color}
                  borderRadius={4}
                  paddingLeft = {8}
                  formStyle = {styles.formstyle}
                />
              </View> 
              <View style = {styles.formView}>
                <DisplayText
                  text={'Phone Number *'}
                  styles = {styles.formHeaderTxt}
                />
                <InputField
                  textColor={colors.text_color}
                  inputType={'phone'}
                  keyboardType={'default'}
                  onChangeText = {this.handlePhoneChange}
                  autoCapitalize = "none"
                  height = {40}
                  borderWidth = {1}
                  borderColor={colors.field_color}
                  borderRadius={4}
                  paddingLeft = {8}
                  formStyle = {styles.formstyle}
                  returnKeyType = {'done'}
                />
              </View> 
               {/* Plan modal selection */}
               <View style = {styles.formContainer}>
                <DisplayText
                  text={'Plan *'}
                  styles = {styles.formHeaderTxt}
                />
                <TouchableOpacity 
                  underlayColor={colors.white}
                  onPress = {this.handlePlan}
                  style = {styles.textBoder}>
                  <View style = {styles.viewTxtPlan}>
                    <Text style = {styles.genderText}>
                      {this.state.plan}
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
              visible = {this.state.modalPlanVisible}
              onRequestClose={() => {console.log('Request was closed')}}>
              <View style={styles.modalContainer}> 
                <View style={styles.modalStyle}>
                  <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ padding: 16}}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                      <DisplayText
                        style={styles.textHeaderStyle}
                        text ={' Subscription Plan '} 
                        />
                        {pickerPlanPersonal.map((value, index) => {
                          return <TouchableHighlight key={index} onPress={() => this.setPlanPicker(value.value)}>
                            <Text style={styles.modalTxt}>{value.title}</Text>
                          </TouchableHighlight>;
                        })
                        }                    
                      </View>
                    </ScrollView>
                  </View>
                </View>
              </Modal>
            
            {/* Plan */}

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
