'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, AsyncStorage, StyleSheet,} from 'react-native';
import {DisplayText, } from '../../components';
import styles from './styles';


export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state ={
 
    }
  }
  componentWillMount () {
    this.handleLogout();
  }

   handleLogout = async() => {
    await AsyncStorage.clear();
      this.props.navigation.navigate('Home');
  }
  
  render () {
   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar barStyle="default" /> 

    </SafeAreaView>
    
   )
  }
} 