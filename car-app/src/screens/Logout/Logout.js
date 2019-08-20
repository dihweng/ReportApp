'use strict';
import React, {Component} from 'react';
import { SafeAreaView, StatusBar, Image, AsyncStorage, StyleSheet,} from 'react-native';
import styles from './styles';
import { UserLogoutEndpoint, getProfile } from '../Utils/Utils';
import DropdownAlert from 'react-native-dropdownalert';
import { ProgressDialog } from 'react-native-simple-dialogs';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state ={
      token: '',
      title: '',
      message: '',
      showAlert: false,
      showLoading: false
    }
  }
  async componentWillMount () {
    let profile = await getProfile();
    await this.setState({
      token : profile.access_token,
      showLoading:true,
    });
    await this.handleLogout();
  }

   handleLogout = async() => {
    await this.showLoadingDialogue();
    const {token} = this.state;
     const  settings ={
      method : "POST",
      headers : {
        "Accept" : "application/json",
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    }
    try {
      let response = await fetch(UserLogoutEndpoint, settings);
      let res = await response;
      if (res) {
        console.log({res:res})
        return await this.hideLoadingDialogue();
      }
      else {
      // await AsyncStorage.clear();
      // this.props.navigation.navigate('Login');
        return await this.showNotification(res.message,  'Message');
      }
    }
    catch(error) {
      return this.showNotification(error.toString(), 'Message');
    }
  }
  showLoadingDialogue =()=> {
    this.setState({
      showLoading: true,
    });
  }

  hideLoadingDialogue =()=> {
    this.setState({
      showLoading: false,
      restoring: false,
    });
  }

  showNotification = (type, title, message,) => {
    this.hideLoadingDialogue();
    return this.dropDownAlertRef.alertWithType(type, title, message);
  }

  handleCloseNotification = () => {
    return this.setState({
       showAlert : false,
     })
  }
  
  render () {
   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar barStyle="default" /> 
      <Image
        source={require('../../assets/images/splash.png')}
        style={StyleSheet.flatten(styles.logoIcon)}/> 
      <ProgressDialog
        visible={showLoading}
        title="Processing"
        message="Please wait..."
      />
      <DropdownAlert ref={ref => this.dropDownAlertRef = ref}/>

    </SafeAreaView>
    
   )
  }
} 