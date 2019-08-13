'use strict';
import React, {Component} from 'react';
import {  View, SafeAreaView, StatusBar, Image, StyleSheet, TouchableOpacity, } from 'react-native';
import {DisplayText, InputField} from '../../components';
import styles from './styles';
import theme from '../../assets/theme';


export default class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state ={
      token : '',
      showAlert : false,
      message : '',
     
    }
  }
  searchFilterFunction = (text) => {

  }

  handleCloseNotification = () => {
    return this.setState({
       showAlert : false
     })
  }
 

  render () {

    return (
      <SafeAreaView style={styles.container}> 
        <StatusBar barStyle="default" /> 
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
              text={'All Report'}
              styles = {StyleSheet.flatten(styles.txtHeader)}
            />
          </View>
        </View> 
        <View style = {styles.wrapper}>
          <View style={styles.searchView}>
            <Image
              source = {require('../../assets/images/search.png')}
              style = {StyleSheet.flatten(styles.searchIcon)}
            />
            <InputField
              placeholder = {'Search Anything'}
              placeholderTextColor = {theme.secondaryTextColor}
              textColor={theme.primaryTextColor}
              inputType={'name'}
              keyboardType={'default'}
              onChangeText={text => this.searchFilterFunction(text)}
              autoCorrect={false}
              value={this.state.value}
              height = {30}
              width = {'80%'}
              borderBottomWidth = {0}
              paddingLeft  = {8}
            /> 
         </View>
        </View>
        <View style = {{flex: 1}}>
          {/* <AppTabNavigation/> */}
        </View>
      </SafeAreaView>
    )
  }
} 