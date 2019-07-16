'use strict';
import React, {Component} from 'react';
import { 
  View, 
  ScrollView, 
  TextInput,
  SafeAreaView, 
  StatusBar, 
  Image, 
  Text,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  } from 'react-native';
import {DisplayText, SingleButtonAlert, SubmitButton} from '../../components';
import styles from './styles';
import colors from '../../assets/colors';
import { ProgressDialog } from 'react-native-simple-dialogs';
import {getRoute, getProfile, saveUserDetail} from '../Utils/Utils'

export default class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state ={
      token : '',
      showAlert : false,
      message : '',
     
    }
  }

 
  async componentDidMount(){
    let profile = await getProfile();

    this.setState({
      token : profile.access_token,
    });

    // await this.handleGetProfile();
  }

  handleCloseNotification = () => {
    return this.setState({
       showAlert : false
     })
  }
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigation.toggleDrawer();
  };


  render () {
    const { 
      showLoading, 
      title, 
      message, 
      showAlert, 
    } = this.state;

    return (
      <SafeAreaView style={styles.container}> 
        <StatusBar barStyle="default" /> 
        {/* <StatusBar
        barStyle="light-content"
        backgroundColor={colors.green_background}/> */}
        <View style = {styles.navBar}>
          <TouchableOpacity
            onPress={this.toggleDrawer} 
            style = {styles.headerImage}>
            <Image
              onPress={this.toggleDrawer} 
              source = {require('../../assets/images/menu.png')}
              style = {StyleSheet.flatten(styles.headerIcon)}
            />
            </TouchableOpacity>
            <View style = {styles.nameView}>
            
            <DisplayText
              text={'Dashboard'}
              styles = {StyleSheet.flatten(styles.txtHeader)}
            />
          </View>
        </View> 
        <View style = {styles.wrapper}>
         
        </View>
        <View style = {{flex : 1, paddingLeft : 30, paddingRight: 30}}>
          <View style = {styles.btnView}>
            <ProgressDialog
              visible={showLoading}
              title="Processing"
              message="Please wait..."
            />
            <SubmitButton
              title={'Continue'}
              // disabled={!this.toggleButtonState()}
              onPress={this.handleFundWallet}
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
        </View>
      </SafeAreaView>
    )
  }
} 