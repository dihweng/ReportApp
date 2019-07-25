'use strict';
import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, SafeAreaView, Image, Text } from 'react-native';
import { getUserDatials} from '../Utils/Utils'
import colors from '../../assets/colors';
import styles from './styles';
import theme from '../../assets/theme';
import {DisplayText} from '../../components';

const dashboard = require('../../assets/images/dashboard.png'),
 investment = require('../../assets/images/investment.png'),
 support_desk = require('../../assets/images/support_desk.png'),
 account_settings = require('../../assets/images/account_settings.png'),
 faq = require('../../assets/images/faq.png'),
 terms = require('../../assets/images/terms.png'),
 report = require('../../assets/images/report.png'),
 logout = require('../../assets/images/logout.png'),
 manage_subscription = require('../../assets/images/manage.png')

export default class CustomSidebarMenu extends Component {
  constructor() {
    super();
    this.state = {
      token : '',
      email : '',
      name : '',
      firstname : '',
      lastname : '',
      phone : '',
      id : '',
      message : '',
    },
    this.items = [
      {
        // navOptionThumb: 'podium',
        navOptionThumb : dashboard,
        navOptionName: 'Dashboard',
        screenToNavigate: 'DashBoard',
      },
      {
        navOptionThumb: report,
        navOptionName: 'Report',
        screenToNavigate: 'Report',
      },
      {
        navOptionThumb: manage_subscription,
        navOptionName: 'Manage Subscription',
        screenToNavigate: 'ManageSubscription',
      },
      { 
        navOptionThumb: support_desk,
        navOptionName: 'Support Desk',
        screenToNavigate: 'SurpportDesk',
      },
      {
        navOptionThumb: account_settings,
        navOptionName: 'Account settings',
        screenToNavigate: 'ManageAccount',
      },
      {
        navOptionThumb: faq,
        navOptionName: 'FAQs',
        screenToNavigate: 'Faq',
      },
      {
        navOptionThumb: terms,
        navOptionName: 'Terms Conditions',
        screenToNavigate: 'TermsConditions',
      },
      {
        navOptionThumb: logout,
        navOptionName: 'Logout',
        screenToNavigate: 'Logout',
      },
    ];
  }

  //   async componentDidMount(){
  //     const profile = await getUserDatials();
  //     try {
  //       if (profile !== 'undefined' || profile !== ''){

  //         const lastname = profile.data.name.split(" ")[1],
  //           firstname = profile.data.name.split(" ")[0], 
  //           email = profile.data.email,
  //           phone = profile.data.phone;
  //           this.setState({
  //             firstname,
  //             lastname,
  //             email,
  //             phone,
  //           });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
      
      
  //     // await this.handleGetProfile();
  // }
  // handleGetProfile = () => {
  //   const{token} = this.state;
  //   console.log({tokien_check : token});
    
  //   // this.setState({
  //   //   showLoading: false
  //   // });
  //   let endPoint = `${ProfileEndpoint}`;

  //     getRoute(endPoint, token)
  //     .then((res) => {
  //       console.log({responses: res})
  //       if (typeof res.message !== 'undefined' || typeof res.message === '') {  
  //         return  this.setState({ 
  //           message : res.message,
  //         }); 
  //       }
  //       else {
  //         const firstname = res.data.name.split(" ")[0],
  //           lastname = res.data.name.split(" ")[1],
  //           id = res.data.id,
  //           email = res.data.email,
  //           phone = res.data.phone;
  //           console.log({resSuccess: id})

  //         this.setState({ 
  //           id : id,
  //           firstname : firstname, 
  //           lastname : lastname,
  //           email : email,
  //           phone : phone,
  //         }); 
  //       }
  //     })
  //     .catch((res) => {
  //       this.setState({
  //         messageKey : 'Message',
  //         message : res.message,
  //       });

  //     })
  // }

  
  render() {
    const { firstname,email, id} = this.state;
    return (
      <SafeAreaView style={styles.sideMenuContainer}>
        {/*Top Large Image */}
        <View style = {styles.drawerImageView}>
          <Image
            source = {require('../../assets/images/logo_login.png')}
            style={styles.sideMenuProfileIcon}/>

          <View style = {styles.userDetailView}>
            {
              (firstname) ? 
              <Text style = {styles.txtuserName}>
                Hi, {`${firstname}`} 
              </Text> :
              <Text style = {styles.txtuserName}>
                {''} 
            </Text>
            }
            
            {
              email ? 
              <Text style = {styles.txtuser}>
                {email} 
              </Text> 
            :
              <DisplayText
                onPress = {this.handleGetProfile}
                text = {''}
                style = {styles.txtEmail}
              />
            }
            
          </View>
        </View>
        {/*Divider between Top Image and Sidebar Option*/}
        {/* <View style={styles.divider}/> */}
        {/*Setting up Navigation Options from option array using loop*/}
        <View style={{ width: '100%' }}>
          {this.items.map((item, key) => (
            <TouchableOpacity key = {key}
              onPress={() => {
                global.currentScreenIndex = key;
                this.props.navigation.navigate(item.screenToNavigate);
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: global.currentScreenIndex === key ? colors.field_color : colors.white,
                borderLeftWidth: global.currentScreenIndex === key ? 4 : 0,
                borderColor : theme.primaryColor,
              }}>
                
              <View style={{ marginRight: 10, marginLeft: 20 }}>
                {/* <Icon name={item.navOptionThumb} size={25} color="#0F959A" /> */}
                {/* <Icon
                    active
                    name={item.navOptionThumb}
                    style={styles.draweIcon }
                  /> */}

              <Image
                source = {item.navOptionThumb}
                style={styles.draweIcon}/>

              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily : theme.secondaryFont,
                  color: global.currentScreenIndex === key ? '#ABABAB' : colors.darkGray,
                }}
                key = {key}
                onPress={() => {
                  global.currentScreenIndex = key;
                  this.props.navigation.navigate(item.screenToNavigate, {
                    'id' : id,
                  });
                }}>
                {item.navOptionName}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    );
  }
}