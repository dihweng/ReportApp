'use strict';
import React, {Component} from 'react';
import { View, SafeAreaView, StatusBar, Image, FlatList, TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, SingleButtonAlert } from '../../components';
import { getUserDetails, GetAllSubscription, subscription, getRouteToken} from '../Utils/Utils';
import { ProgressDialog } from 'react-native-simple-dialogs';
import styles from './styles';
import DropdownAlert from 'react-native-dropdownalert';

export default class ManageSubscription extends Component {
  constructor(props) {
    super(props);
    this.state ={
      data : [],
      id: '',
      token: '',
      showAlert : false,
      showLoading: false,
      message : '',
      title: '',
    }
  }
  subscription = [
    {    
      "_id": "5d1c92249b0b080017036e53",
      "reportName": "Online Payment-2Months",
      "date" : "19/06/2019",
      "name": "Tunde Anwo",
      "expires" : "19/07/2019",
      "amount" : "350",
      "Status" : "Active"
    },
    {    
      "_id": "5d1c90249b0b080017036e53",
      "reportName": "Online Payment-2Months",
      "date" : "19/05/2018",
      "name": "Tunde Anwo",
      "expires" : "19/07/2018",
      "amount" : "350",
      "Status" : "Expire"
    },
    {    
      "_id": "541c92249b0b080017036e53",
      "reportName": "Online Payment-2Months",
      "date" : "19/06/2016",
      "name": "Tunde Anwo",
      "expires" : "19/07/2016",
      "amount" : "350.12",
      "Status" : "Expire"
    },
    {    
      "_id": "5d1cn2249b0b080017036e53",
      "reportName": "Online Payment-2Months",
      "date" : "19/06/2016",
      "name": "Tunde Anwo",
      "expires" : "19/07/2016",
      "amount" : "350.23",
      "Status" : "Expire"
    },
    {    
      "_id": "5d1c92g49b0b080017036e53",
      "reportName": "Online Payment-2Months",
      "date" : "19/06/2016",
      "name": "Tunde Anwo",
      "expires" : "19/07/2016",
      "amount" : "350.12",
      "Status" : "Expire"
    },
    {    
      "_id": "5d1c92249b0b082017036e53",
      "reportName": "Online Payment-2Months",
      "date" : "19/06/2016",
      "name": "Tunde Anwo",
      "expires" : "19/07/2016",
      "amount" : "350.12",
      "Status" : "Expire"
    },
    {    
      "_id": "5d1c92249b0b0800170g6e53",
      "reportName": "Online Payment-2Months",
      "date" : "19/06/2016",
      "name": "Tunde Anwo",
      "expires" : "19/07/2016",
      "amount" : "350",
      "Status" : "Expire"
    },
    {    
      "_id": "5d1c92249b0b080317036e53",
      "reportName": "Online Payment-2Months",
      "date" : "19/06/2016",
      "name": "Tunde Anwo",
      "expires" : "19/07/2016",
      "amount" : "350",
      "Status" : "Expire"
    },
    {    
      "_id": "5d1c92249b0b083017036e53",
      "reportName": "Online Payment-2Monthz",
      "date" : "19/06/2016",
      "name": "Tunde Anwo",
      "expires" : "19/07/2016",
      "amount" : "350",
      "Status" : "Expire"
    },
 
];

  async componentDidMount(){
    let userDetails = await getUserDetails();
    const id = userDetails.data.id,
      token = userDetails.token;
      let payment = this.props.navigation.getParam('paid');

      this.setState({
      id,
      token,
    });
    await this.handleGetSubscription();

    this.focusListener =  await this.props.navigation.addListener('didFocus', () => {
      this.handleGetSubscription();
      if(payment !== null) {
        subscription('active');
      }
    }); 
  }

  componentWillUnmount(){
    this.focusListener.remove();
  }

  allSubscription = async() => {
    const {token, id} = this.state;
    let endpoint = `${GetAllSubscription}${id}/${'subscriptions'}`
    this.showLoadingDialogue();
    await getRouteToken(endpoint, token)
      .then((res) => {
        if (typeof res.message !== 'undefined') {  
          return this.showNotification('error', 'Message', res.message);
        }   
        else {   
          console.log({'res':res.data})       
          this.setState({
            data: res.data,
          });
          return this.hideLoadingDialogue();
        }
      }
    ).catch(error=>this.showNotification('error', 'Message', error.toString()));
  }

  handleGetSubscription = async() => {
    this.showLoadingDialogue();

    try {
      await this.allSubscription()
    }
    catch(error) {
      return this.showNotification('error', 'Message', error.toString());
    }
  }
  handleBackPress = () => {
    return this.props.navigation.popToTop()
  }

  showLoadingDialogue =()=> {
    this.setState({
      showLoading: true,
    });
  }

  hideLoadingDialogue =()=> {
    this.setState({
      showLoading: false,
    });
  }


  showNotification = (type, title, message,) => {
    this.hideLoadingDialogue();
    return this.dropDownAlertRef.alertWithType(type, title, message);
  }
  handleCloseNotification = () => {
    return this.setState({
       showAlert : false,
     })
  }

  handleSubscription = () => {
    // return alert('are you okay? you already @ Subscription')
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
  handleBackPress = () => {
    return this.props.navigation.popToTop()
  }

 
  renderRow = ({item}) => {
    return (
      <View style = {styles.listViewItem}>    
        <TouchableOpacity 
          style = {styles.cardView}>
          <View style ={styles.subView}>
            {/* <DisplayText
              numberOfLines = { 2 } 
              ellipsizeMode = 'middle'
              text = {item.reportName.toUpperCase()}
              styles = {StyleSheet.flatten(styles.subName)}
            />
            <DisplayText
              text = {item.date}
              styles = {StyleSheet.flatten(styles.subDate)}
            /> */}

          </View>
          <View style = {styles.subView}>
            <DisplayText
                text = {item.plan.name}
                styles = {StyleSheet.flatten(styles.subscriberName)}
              />
            <DisplayText
              text = {item.plan.amount.toString()}
              styles = {StyleSheet.flatten(styles.amount)}
            />
          </View>
          <View style = {styles.subView}>
            <DisplayText
                text = {"Expires-" + item.expires_at}
                styles = {StyleSheet.flatten(styles.expireTxt)}
              />
            
            {
              (item.status === 'Active') ?
                <DisplayText
                  text = {item.status.toUpperCase()}
                  styles = {StyleSheet.flatten(styles.statusTxtActive)}
                />
              :
                <DisplayText
                  text = {item.status.toUpperCase()}
                  styles = {StyleSheet.flatten(styles.statusTxtExpire)}
                />
            }
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render () {
    const { showLoading } = this.state;
   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar barStyle="default" /> 
      <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />

      <View style = {styles.navBar}>
        <TouchableOpacity
          onPress={this.handleBackPress} 
          style = {styles.headerImage}>
          <Image
            onPress={this.handleBackPress} 
            source = {require('../../assets/images/back.png')}
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
          style = {styles.customTabTp}>
            <DisplayText
            text={'Subscription'}
            onPress = {this.handleSubscription}  
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
        <TouchableOpacity
          style = {styles.customTabTp2}>
            <DisplayText
            text={'Subscribe'}
            styles = {StyleSheet.flatten(styles.txtTabHeader)}
          />
        </TouchableOpacity>
      </View>
      <View style = { styles.subscribtionView}>
        <View style = {styles.devices}>

        </View>
        <View style = {styles.FlatListView}>
          <FlatList          
            data={this.state.data}          
            renderItem={this.renderRow}          
            keyExtractor={ data=> data.id}   
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <ProgressDialog
        visible={showLoading}
        title="Processing"
        message="Please wait..."
      />
      
    </SafeAreaView>
    )
  }
} 
