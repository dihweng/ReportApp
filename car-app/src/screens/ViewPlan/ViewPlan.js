'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, SubmitButton} from '../../components';
import styles from './styles';


export default class ViewPlan extends Component {
  constructor(props) {
    super(props);
    this.state ={
     bankName : ''

    }
  }

  async componentDidMount(){
    // let userDetails = await getUserDatials();

    // let bank = userDetails.data.bank_name;
    // this.setState({
    //   bankName: bank,
    // });
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
  handleSelectPlan = (item) => {
    return this.props.navigation.navigate('Subscribe');
  }
 
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
          onPress = {this.handleViewPlan}  
          style = {styles.customTabTp}>
          <DisplayText
            text={'View Plan'}
            onPress = {this.handleViewPlan}  
            styles = {StyleSheet.flatten(styles.txtTabHeader)}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style = {styles.customTabTp2}>
            <DisplayText
            text={'Subscribe'}
            styles = {StyleSheet.flatten(styles.txtTabHeader)}
          />
        </TouchableOpacity>
        
      </View>
      <View style = {styles.subscribtionView}>
        <View style = {styles.subPlanView}>
          
        </View>
        <ScrollView 
          style={{flex:1,}}
          showsVerticalScrollIndicator={false}>
          <View>
            <View style = {styles.plandCard}>
              <DisplayText
                text={'One Month Plan'}
                styles = {StyleSheet.flatten(styles.cardType)}
              />
              <View style = {styles.lineView}></View>
              <DisplayText
                text={'₦1200'}
                styles = {StyleSheet.flatten(styles.amount)}
              />
              <DisplayText
                text={'Enjoy Unlimited access to the entire\n Volumes of the Court of Appeal\n Reports(from(2015) till date) for one\n month for just ₦1200'}
                styles = {StyleSheet.flatten(styles.planDetails)}
              />
               <SubmitButton
                title={'Select Plan'} 
                onPress={this.handleSelectPlan}
                titleStyle={styles.btnText}
                btnStyle = {styles.btnStyle}
              />
            </View>
            <View style = {styles.plandCard}>
              <DisplayText
                text={'Six Month Plan'}
                styles = {StyleSheet.flatten(styles.cardType)}
              />
              <View style = {styles.lineView}></View>
              <DisplayText
                text={'₦6000'}
                styles = {StyleSheet.flatten(styles.amount)}
              />
              <DisplayText
                text={'Enjoy Unlimited access to the entire\n Volumes of the Court of Appeal\n Reports(from(2015) till date) for one\n month for just ₦6000'}
                styles = {StyleSheet.flatten(styles.planDetails)}
              />
               <SubmitButton
                title={'Select Plan'} 
                onPress={this.handleSelectPlan}
                titleStyle={styles.btnText}
                btnStyle = {styles.btnStyle}
              />
            </View>
            <View style = {styles.plandCard}>
              <DisplayText
                text={'One Year Plan'}
                styles = {StyleSheet.flatten(styles.cardType)}
              />
              <View style = {styles.lineView}></View>
              <DisplayText
                text={'₦12000'}
                styles = {StyleSheet.flatten(styles.amount)}
              />
              <DisplayText
                text={'Enjoy Unlimited access to the entire\n Volumes of the Court of Appeal\n Reports(from(2015) till date) for one\n month for just ₦12000'}
                styles = {StyleSheet.flatten(styles.planDetails)}
              />
               <SubmitButton
                title={'Select Plan'} 
                onPress={this.handleSelectPlan}
                titleStyle={styles.btnText}
                btnStyle = {styles.btnStyle}
              />
            </View>
          </View>        
        </ScrollView>
      </View>
    </SafeAreaView>
    )
  }
} 
