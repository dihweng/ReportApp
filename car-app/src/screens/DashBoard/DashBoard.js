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
import { createMaterialTopTabNavigator, createAppContainer, StackActions, NavigationActions } from 'react-navigation';
import {DisplayText, InputField,SingleButtonAlert, SubmitButton} from '../../components';
import styles from './styles';
import { ProgressDialog } from 'react-native-simple-dialogs';
// import {getRoute, getProfile, saveUserDetail} from '../Utils/Utils'
import theme from '../../assets/theme';
import AllReports from '../../screens/AllReports/AllReports';
import Citation from '../../screens/Citation/Citation';
import Category from '../../screens/Category/Category';
import Division from '../Division/Division';

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
  toggleDrawer = () => {
    //Props to open/close the drawer
    // this.props.navigation.toggleDrawer();
  };

  render () {
    const { showLoading, title, message, showAlert, } = this.state;

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
// const AppTabNavigation = createAppContainer( createMaterialTopTabNavigator({
//   AllReports: {
//     screen: AllReports,
//     navigationOptions: {
//       tabBarLabel: 'Reports',
//     }
//   },
//   Citation: {
//     screen: Citation,
//     navigationOptions: {
//       tabBarLabel: 'Citation',
//     }
//   },
//   Category: {
//     screen: Category,
//     navigationOptions: {
//       tabBarLabel: 'Category',
      
//     }
//   },
//   Division: {
//     screen: Division,
//     navigationOptions: {
//       tabBarLabel: 'Division',
//     }
//   },
// }
//   ,{
//     initialRouteName: 'AllReports',
//     tabBarPosition: 'top',
//     swipeEnabled: true,
//     tabBarOptions: {
//       activeTintColor: theme.colorAccent,
//       inactiveTintColor: theme.textGray,
//       labelStyle: {
//         fontSize: 11,
//       },
//       // tabStyle: {
//       //   width: 100,
//       // },
//       style: {
//         backgroundColor: theme.primaryColor,
//         borderBottomWidth: 0.5,
//         borderBottomColor: theme.primaryColor,
//         shadowOffset: {width: 0, height: 1},
//         shadowColor: 'gray',
//         shadowOpacity: 0.25,
//         elevation: 1,
//         fontFamily: theme.secondaryFont,
//         height: 50,
//         width : '100%',
//       },
//       indicatorStyle: {
//         height: 1,
//         backgroundColor: theme.colorAccent
//       },
//       showIcon: false
//     }
//   }
// ))