'use strict';
import React, {Component} from 'react';
import { View, SafeAreaView, StatusBar, Image, Dimensions,
  FlatList, TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText} from '../../components';
import { getUserDetails, GetAllSubscription, subscription, getRouteToken} from '../Utils/Utils';
import { ProgressDialog } from 'react-native-simple-dialogs';
import styles from './styles';
import DropdownAlert from 'react-native-dropdownalert';
import moment from 'moment';
import ProgressBarAnimated from 'react-native-progress-bar-animated';

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
      name: '',
      loggedInDevices:1,
      planType : '',
      activePercent:0,
      total_devices_allowed,
    }
  }

  async componentDidMount(){
    let userDetails = await getUserDetails();
    const id = userDetails.data.id,
      name = userDetails.data.name,
      total_active_devices = userDetails.data.total_active_sessions,
      total_devices_allowed = data.subscription.plan.allowed_devices_count,
      token = userDetails.token;

      let payment = this.props.navigation.getParam('paid');

      this.setState({
        id,
        token,
        name,
        loggedInDevices: total_active_devices,
        total_devices_allowed
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
          this.setState({
            data: res.data,
            planType: res.data[0].plan.category,
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

  decideBarWidth =()=>{
  const {loggedInDevices, planType} = this.state;

    if(planType == 'individual') {
      let activePercent = (loggedInDevices/3)*100;
      return this.setState({activePercent})   
    }
    else {
      let activePercent = (loggedInDevices/100)*100;
      return this.setState({activePercent});

    }
  }

 
  renderRow = ({item}) => {
    let newDate = moment(item.expires_at, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY');
    let paymentDate = moment(item.created_at, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY');
    let expiryLabel = item.status == 'active' ? 'Expires' : 'Expired';
    let dur1 = item.plan.name.split(' ')[0];
    let dur2 = item.plan.name.split(' ')[1];
    let gateway = item.payment ? `${item.payment.gateway.toUpperCase()} - ${dur1.toUpperCase()} ${dur2.toUpperCase()}` : 'Trial Account';
    this.decideBarWidth();
    return (
      <View style = {styles.listViewItem}>    
        <TouchableOpacity 
          style = {styles.cardView}>
          <View style ={styles.subView}>

          </View>
          <View style = {styles.subView}>
            <DisplayText
                text = {gateway}
                styles = {StyleSheet.flatten(styles.expireTxt)}
              />
            <DisplayText
              text = {paymentDate}
              styles = {StyleSheet.flatten(styles.amount)}
            />
          </View>
          <View style = {styles.subView}>
            <DisplayText
                text = {this.state.name}
                styles = {StyleSheet.flatten(styles.subscriberName)}
              />
            <DisplayText
              text = {`N${item.plan.amount.toString()}`}
              styles = {StyleSheet.flatten(styles.amount)}
            />
          </View>
          <View style = {styles.subView}>
            <DisplayText
                text = {`${expiryLabel} - ${newDate}`}
                styles = {StyleSheet.flatten(styles.expireTxt)}
              />
            
            {
              (item.status === 'active') ?
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
    const { showLoading, activePercent, loggedInDevices, total_devices_allowed, planType} = this.state;
    const barWidth = Dimensions.get('screen').width - 50;

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
          <View style={styles.planView}>
            <View style={styles.viewCicle}>
              <View style={styles.innerView}></View>
            </View>
            {/* <DisplayText
              text={'Devices'}
              styles = {StyleSheet.flatten(styles.planName)}
            /> */}
             <DisplayText
              text={`${loggedInDevices}\\${total_devices_allowed}`}
              styles = {StyleSheet.flatten(styles.planName)}
            />
          </View>
          <ProgressBarAnimated
              width={barWidth}
              value={activePercent}
              backgroundColorOnComplete="#6CC644"
            />
        </View>
        <View style = {styles.FlatListView}>
          <FlatList          
            data={this.state.data}          
            renderItem={this.renderRow}          
            keyExtractor={ data=> data.id.toString()}   
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
