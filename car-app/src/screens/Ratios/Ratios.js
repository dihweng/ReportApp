'use strict';
import React, {Component} from 'react';
import { View, Text, ScrollView, SafeAreaView, StatusBar, Image,TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText } from '../../components';
import styles from './styles';
import theme from '../../assets/theme';


export default class Ratios extends Component {
  constructor(props) {
    super(props);
    this.state ={
      showAlert : false,
      showLoading : false,
      message: '',
      title: '',
    }
  }

  handleRatio = () => {
    return this.props.navigation.navigate('Ratios');
  }
  handleFullReport = () => {
    return this.props.navigation.navigate('FullReport');
  }
  handleCitedAuthorities = () =>{
    return this.props.navigation.navigate('CitedAuthorities')
  }
  
  handleOnBackPress = () => {
    this.props.navigation.navigate('DashBoard');
  };
 
  handleConfirm = () => {
    alert('confirm coming soon');
  }

  

  render () {
    const { title, message, showAlert, showLoading } = this.state

    return(
      <SafeAreaView style={styles.container}> 
        <StatusBar barStyle="default" /> 
        <View style = {styles.navBar}>
          <TouchableOpacity
            onPress={this.handleOnBackPress.bind(this)} 
            style = {styles.headerImage}>
            <Image
              onPress={this.handleOnBackPress.bind(this)} 
              source = {require('../../assets/images/back.png')}
              style = {StyleSheet.flatten(styles.headerIcon)}
            />
          </TouchableOpacity>
          <View style = {styles.nameView}>
            <DisplayText
              text={'Title Name'}
              styles = {StyleSheet.flatten(styles.txtHeader)}
            />
          </View>
        </View> 
        <View style = {styles.cards}>
          <TouchableOpacity
            onPress = {this.handleFullReport}  
            style = {styles.customTabTp2}>
              <DisplayText
              text={'Full Report'}
              onPress = {this.handleFullReport}  
              styles = {StyleSheet.flatten(styles.txtTabHeader)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress = {this.handleRatio}  
            style = {styles.customTabTp}>
              <DisplayText
              text={'Ratio'}
              onPress = {this.handleRatio}  
              styles = {StyleSheet.flatten(styles.txtTabHeader)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress = {this.handleCitedAuthorities}  
            style = {styles.customTabTp2}>
              <DisplayText
              text={'Cited Authorities'}
              onPress = {this.handleCitedAuthorities}  
              styles = {StyleSheet.flatten(styles.txtTabHeader)}
            />
          </TouchableOpacity>
        </View>
      
    </SafeAreaView>
    )
  }
} 
