'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, TouchableOpacity, TouchableHighlight,Text, StyleSheet,} from 'react-native';
import {DisplayText, } from '../../components';
import styles from './styles';
import colors from '../../assets/colors';


export default class TermsConditions extends Component {
  constructor(props) {
    super(props);
    this.state ={
      overflowModalVisible: false,
      data : '',
      phone : 0,
      token : '',
      profile_id : '',
      showAlert : false,
      message : '',
      refreshing: false,
      gender: '',

    }
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
            onPress={this.toggleDrawer} 
            style = {styles.headerImage}>
            <Image
              onPress={this.toggleDrawer} 
              source = {require('../../assets/images/menu.png')}
              style = {StyleSheet.flatten(styles.headerIcon)}
            />
          </TouchableOpacity>
          <View style={styles.sethLogoModal}>
              <Text 
                style ={styles.termsContHeader}>
                {'Terms & Conditions'}
              </Text>
            </View>
        </View> 
        <View style={ styles.termsStyle}>
          <View style = {styles.termsView}>
            
            <View style={styles.horizonLine} />
            <ScrollView contentContainerStyle= {styles.scrollview}>
              <View style={{flexDirection: 'column',padding: 4,}}>

                <Text 
                  style ={styles.contentText}>
                    {'The Electronic Court of Appeal Reports (E-C.A.R.), a service provided   byLaurels and Prizes Law Publications Ltd. presents the reconditepronouncements of the Court of Appeal of Nigeria, and it is aimed at satisfyingthe needs of fast paced, technology savvy legal professionals and intellectuals.Thus, it is an essential tool for legal practitioners on the bench and in the bar,law   faculties   and   law   students,   scholars   in   other   fields   of   education   andintellectuals, generally, who have interests in legal matters. Please read ourterms of service carefully to understand how we intend to serve you. You agreeto our terms of service by installing, registering, subscribing or otherwise usingthe app. '}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'TERMS AND CONDITIONS'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'End User License Agreement'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'This is a legal agreement between you (“Licensee”) and Laurels and Prizes Law Publications Ltd. (“Licensor”) regarding your use of the E-C.A.R. app ("the app"). By installing, registering, subscribing or otherwise using the app, you agree to be bound by the terms of this agreement.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'Grant of License'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'Licensee is hereby granted the permission to install and use the app on asupported device in accordance with the terms and conditions stipulated inthis agreement. Licensor reserves all rights not expressly granted the Licenseein this agreement.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'Restrictions on Use of the app'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'Licensee shall not reverse engineer, decompile or disassemble the app. Licensorassumes no responsibility for any damages that occur if the app is usedincorrectly'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'Registration'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'You must register for our services by creating a user account which involvescreating your username and password, and supplying your current emailaddress and mobile telephone number. A first-time user of our service will beable to trial the app for free for the first 2 (two) weeks, after registration. At theexpiration of that 2 (two) weeks, to continue to enjoy our services, you mustsubscribe.   If   you   change   your   name   or   mobile   telephone   number   aftersupplying them during registration, you must update as soon as is reasonably possible, through our in-app update feature. You agree to receive emails, withat least one hyperlink included, to register and create a new account or tocreate a new password, as the case may be. Except for first-time users (for thetrial period only) registration does not grant automatic access to the reportedcases.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'Subscription required'}
                </Text>
             
                <Text 
                  style ={styles.contentText}>
                    {'After registration, you must pay for subscription to access the reported cases,in accordance with the subscription-plans we have stipulated (unless you afirst-time user who is entitled to 2 (two) weeks of free trial). Access to thereported cases will cease when your subscription expires. You agree to receivenotices, in-app and by email, to inform you of an imminent expiration of yoursubscription, and to remind you to re-subscribe'}
                </Text>
                
                <Text 
                  style ={styles.titleText}>
                  {'Subscription Plans'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'You can subscribe to either the individual plan: for personal use, or the corporate plan: for multiple users in firms or organizations. The individual planconsists of.... The corporate plan consists of three categories: Premium .... '}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'Appropriate Devices and Software '}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'You must possess appropriate devices, software and data connection to use theapp, and we do not provide any of those. You agree to download and install updates to the app whenever updates are made available.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'Third-party advertisements forbidden '}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'We do not permit third-parties to advertise on the app, thereby ensuring that you enjoy distractions-free usage of the app.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'Existing users:'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'If you are already registered, and have an account, on our website -https://courtofappealreportsnigeria.com/  - at the time the app became waslaunched, you can use the same log-in details you use for the website to accessthe app. '}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'Availability of our services'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'You may experience interruptions while using the app, including interruptions caused by, or for updates, upgrades, repairs, maintenance, or due to network or equipment failures, factors beyond our control and other force majeureevents. We may modify or discontinue certain features or services on the app atany time, including its user-interface and graphic presentation, or discontinuesupport for any device or platform at any time. We may amend or update theseterms as need arises. However, you will be provided notice of such modifications, discontinuance, amendments or updates before they are implemented. Your continued use of the app after such notices are provided,and implementations effected, confirms your acceptance of our terms ofservice, as so amended.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'Termination of License'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                  {'Licensor reserves the right to modify, suspend or terminate access to the app ifLicensee is found in violation of this agreement. When access to the app is soterminated, all rights granted to Licensee under this agreement shall immediately cease'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'Disclaimers'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'You use the app on an ‘as is’ basis without any express or implied warranties,including,   but   not   limited   to,   warranties   of   merchantability,   fitness   for   aparticular purpose, title, non-infringement, and freedom from computer virusor other harmful code. We do not warrant that our services will be operational,error-free, secure or safe, or that our services will function without disruptions,delays or imperfections. We do not warrant that all information provided by usare accurate, useful and complete'}
                </Text>
                
                <Text 
                  style ={styles.titleText}>
                  {''}
                </Text>
                
              </View>
            </ScrollView>
          </View>
          <View style = {styles.modalButton }> 
            <TouchableHighlight
              style = {styles.buttonClose}
              onPress={ this.closeTermsModal}>
              <Text style = {styles.closeText}>
                {''}
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    )
  }
} 
