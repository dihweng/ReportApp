'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, SubmitButton, SingleButtonAlert } from '../../components';
import { getUserDatials } from '../Utils/Utils';
import styles from './styles';
import colors from '../../assets/colors';


export default class Referral extends Component {
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


  handlePersonalDetail = () => {
    return this.props.navigation.navigate('PersonalDetails')
  }
  handleContactDetails = () => {
    return this.props.navigation.navigate('ContactDetails')
  }
  handleNextofKing = () => {
    return this.props.navigation.navigate('NextOfKing')
  }
  handleBankDetails = () => {
    const { bankName } = this.state;
    if (bankName === null || bankName === 'undefined' ){
      return this.props.navigation.navigate('BankDetails')
    }
    else{
      alert('Bank Details Already Updated Contact Support Desk for Help');

      return this.props.navigation.navigate('DashBoard')
    }

  }
  handleSecurity = () => {
    return this.props.navigation.navigate('Security')
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
        <View style = {styles.cardBody}>
        {/* Personal Details Card */}
        <View style = {styles.cards}>
          <View style = {styles.cardImageView}>
            <Image
              onPress = {this.handlePersonalDetail}
              source = {require('../../assets/images/user.png')}
              style = {StyleSheet.flatten(styles.cardIcon)}
            />
          </View>
          <View style = { styles.viewText}>
            <DisplayText
              onPress = {this.handlePersonalDetail}
              text={'Personal Details'}
              styles = {StyleSheet.flatten(styles.amtText)}
            />
          </View>
          <TouchableOpacity
            onPress = {this.handlePersonalDetail} 
            style = {styles.angleView}>
            <Image
              onPress = {this.handlePersonalDetail}
              source = {require('../../assets/images/arrow_forward.png')}
              style = {StyleSheet.flatten(styles.angleForward)}
            />
          </TouchableOpacity>
        </View>
          {/* Card Contact Details */}
        <View style = {styles.cards}>
          <View style = {styles.cardImageView}>
            <Image
              onPress = {this.handleContactDetails}
              source = {require('../../assets/images/email.png')}
              style = {StyleSheet.flatten(styles.cardIcon)}
            />
          </View>
          <View style = { styles.viewText}>
            <DisplayText
              onPress = {this.handleContactDetails}
              text={'Contact Details'}
              styles = {StyleSheet.flatten(styles.amtText)}
            />
          </View>
          <TouchableOpacity 
            onPress = {this.handleContactDetails}
            style = {styles.angleView}>
            <Image
              onPress = {this.handleContactDetails}
              source = {require('../../assets/images/arrow_forward.png')}
              style = {StyleSheet.flatten(styles.angleForward)}
            />
          </TouchableOpacity>
        </View>
          {/* Security Card */}
        <View style = {styles.cards}>
          <View style = {styles.cardImageView}>
            <Image
              onPress = {this.handleSecurity}
              source = {require('../../assets/images/padlock.png')}
              style = {StyleSheet.flatten(styles.cardIcon)}
            />
          </View>
          <View style = { styles.viewText}>
            <DisplayText
              onPress = {this.handleSecurity}
              text={'Security'}
              styles = {StyleSheet.flatten(styles.amtText)}
            />
          </View>
          <TouchableOpacity 
            onPress = {this.handleSecurity}
            style = {styles.angleView}>
            <Image
              onPress = {this.handleSecurity}
              source = {require('../../assets/images/arrow_forward.png')}
              style = {StyleSheet.flatten(styles.angleForward)}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style = {styles.footerView}>
        <Image
        source={require('../../assets/images/footer.png')}
        style={StyleSheet.flatten(styles.footerIcon)}/>   
      </View>
    </SafeAreaView>
    )
  }
} 
