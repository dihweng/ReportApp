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
    //   token: '',
    //   title: '',
    //   message: '',
    //   showAlert: false,
       showLoading: false
     }
  }
  async componentDidMount () {
   // let profile = await getProfile();  
    console.log({'prooooffff': 'userssss'})   
    // await this.setState({
    //   showLoading:true,
    // });
    // await this.handleLogout(profile.access_token);
  }

   handleLogout = async(token) => {
    await this.showLoadingDialogue();
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
      console.log('res....', res)
      if (res.status == 200) {
        console.log('res....1')

        await AsyncStorage.clear();
        console.log('res....2')

        this.hideLoadingDialogue();
        console.log('res....3')

        return await this.props.navigation.navigate('AuthLoading');
      }
      else {
        return this.showNotification('error', 'Message', 'Something Went Wrong Try Again');
      }
    }
    catch(error) {
      return this.showNotification('error', 'Message', error.toString());
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
        visible={this.state.showLoading}
        title="Processing"
        message="Please wait..."
      />
      <DropdownAlert ref={ref => this.dropDownAlertRef = ref}/>

    </SafeAreaView>
    
   )
  }
} 