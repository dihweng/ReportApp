'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, } from '../../components';
import styles from './styles';


export default class Subscribe extends Component {
  constructor(props) {
    super(props);
    this.state ={
     bankName : ''

    }
  }

  async componentDidMount(){
    let userDetails = await getUserDatials();

    let bank = userDetails.data.bank_name;
    this.setState({
      bankName: bank,
    });
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

 
  render () {
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
    </SafeAreaView>
    )
  }
} 
