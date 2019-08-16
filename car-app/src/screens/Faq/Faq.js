'use strict';
import React, {Component} from 'react';
import { View, ScrollView, UIManager,Text,SafeAreaView, Platform,LayoutAnimation,StatusBar, Image, TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, } from '../../components';
import styles from './styles';
import colors from '../../assets/colors';

class AccordionView extends Component {

  constructor() {
    super();
    this.state = {
      updated_Height: 0
    }
  }

  componentWillReceiveProps(update_Props) {
    if (update_Props.item.expanded) {
      this.setState(() => {
        return {
          updated_Height: null
        }
      });
    }
    else {
      this.setState(() => {
        return {
          updated_Height: 0
        }
      });
    }
  }

  shouldComponentUpdate(update_Props, nextState) {

    if (update_Props.item.expanded !== this.props.item.expanded) {
      return true;
    }
    return false;
  }

  render() {

    return (

      <View style={styles.Panel_Holder}>
        <TouchableOpacity 
          activeOpacity={0.7} 
          onPress={this.props.onClickFunction}
          style={styles.Btn}>

          <Text 
            style={styles.Panel_Button_Text}>{
            this.props.item.title} 
          </Text>
        </TouchableOpacity>
        <View 
          style={{ height: this.state.updated_Height, overflow: 'hidden' }}>
          <Text style={styles.Panel_text}>
            {this.props.item.body}
          </Text>
        </View>
      </View>

    );
  }
}

export default class Faq extends Component {

  constructor() {
    super();

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
                                                               
    const arrayFaq = [

      { expanded: false, title: "How do I contact Court of Appeal Reports?", body: "You can contact Court of Appeal Reports by sending us an email through any of the following: info@courtofappealreportsnigeria.com, courtofappealreports2015@gmail.com, laurelsandprizes@gmail.com or call us via: +234-706-5222-225. You can as well talk to us through the support desk, an agent will be there to assist you anytime." },
      { expanded: false, title: "How do I access the reports?", body: "To access our reports, you can copy paste this url on your browser: https://courtofappealreportsnigeria.com/. Sign up, if already signed up, sign in with your details, and make a subscription to earn access to reports." },
      { expanded: false, title: "How do I make payments?", body: "Payments could be completed electronically or through any manual means like transfer, direct deposit, etc. To do this, first of all login, then go to Manage Subscription, click on “Subscribe”, choose either a personal or a corporate plan, then select the plan of your choice, confirm if your details are correct and choose if you want to complete the payment online or manually." },
      { expanded: false, title: "How can I register?", body: "To register, copy paste this URL on your browser: https://courtofappealreportsnigeria.com/register. Supply your email, first name and surname, username, phone number, password and confirm password. An email will be sent to verify you own the email, please refer to your email, then click on the provided link after going through the provided instructions. That should complete your registration process." },
      { expanded: false, title: "Can I download judgements?", body: "No, you can not download judgements." },
      { expanded: false, title: "Can I pay with debit card or credit card?", body: "Yes you can, we serve you electronic payment via paystack." },
      { expanded: false, title: "Can I get alternative citations?", body: "No" },
      { expanded: false, title: "When will my subscription expire?", body: "Every subscription has a duration, we have one month, six months, twelve months, your subscription expires for which you chose." },
      { expanded: false, title: "How do I subscribe?", body: "After a successful login into your account, you can subscribe by going to Manage Subscription link, choose a plan and make payment for it." },
      { expanded: false, title: "Can I copy and paste judgments?", body: "No, you can't copy paste Judgements." },
      { expanded: false, title: "How long will my subscription last?", body: "Your subscription could last for one month, six months, and twelve months depending on the one you paid for." },

    ];

    this.state = { AccordionData: [...arrayFaq] }
  }

  handleBackPress = () => {
    return this.props.navigation.goBack();
  }

  update_Layout = (index) => {

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const faqArray = this.state.AccordionData.map((item) => {

      const newItem = Object.assign({}, item);

      newItem.expanded = false;

      return newItem;
    });

    faqArray[index].expanded = true;

    this.setState(() => {
      return {
        AccordionData: faqArray
      }
    });
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
          <View style = {styles.nameView}>
            
            <DisplayText
              text={'FAQs'}
              styles = {StyleSheet.flatten(styles.txtHeader)}
            />
          </View>
        </View> 
        <View style={styles.MainContainer}>
          <ScrollView contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }}>
            {
              this.state.AccordionData.map((item, key) =>
                (
                  <AccordionView 
                    key={key} 
                    onClickFunction = {this.update_Layout.bind(this, key)} 
                    item={item} 
                  />
                ))
            }
          </ScrollView>
        </View>
    </SafeAreaView>
    
   )
  }
} 
