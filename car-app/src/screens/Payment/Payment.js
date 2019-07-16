

'use strict';
import React, {Component} from 'react';
import { SafeAreaView, View } from 'react-native';
import styles from './styles';
import Rave from 'react-native-rave';
import Toast from 'react-native-easy-toast';
import { ProgressDialog } from 'react-native-simple-dialogs';
import { SingleButtonAlert } from '../../components/Alert';
import {postWithToken, CreateInvestment} from '../Utils/Utils';
export default class Payment extends Component {
  constructor() {
    super();
    this.state = {
      firstName : '',
      lastName : '',
      amount : '',
      currency : '',
      token : '',
      period : '',
      country : '',
      showLoading : false,  
      showAlert : false,
      title : '',
      message : '',
    }
    this.onSuccess = this.onSuccess.bind(this);
    this.onFailure = this.onFailure.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  componentWillMount () {
    const{navigation} = this.props,
      token = navigation.getParam('token'),
      period = navigation.getParam('period');

      this.setState({
        token : token,
        period : period,
      });
      console.log({tokenPayment: period})
  }

  onSuccess(data) {
    console.log("success...", data);
    this.handlePayment(data)
  }

  onFailure(data) {
   this.setState({ 
      showLoading : false,
    });
    return this.refs.toastError.show( data.message, 300);  
  }
  onClose (){
    return this.props.navigation.goBack();
  }
  handleCloseNotification = () => {
    return this.setState({
       showAlert : false
     })
  }
  
  handleBackPress = () => {
    this.props.navigation.goBack();
  }
  // Post Payment to detail to api/investment
  handlePayment =  (data) => {
    const {token, period, } = this.state;
    console.log({periodssss: period});
    this.setState({ 
      showLoading : true ,
    }); 
    let principal = data.data.tx.amount.toString(),
    trans_id = data.data.tx.flwRef.toString(),
    currency = data.data.tx.currency.toLowerCase().toString();
    console.log("data to name...", period);
    console.log({investment_check: principal ,trans_id : trans_id, currency : currency });

    //convert ref to an object
    let body = JSON.stringify({
      principal: principal, 
      trans_id: trans_id, 
      currency: currency,
      period: period.toString(),
    });
    
    postWithToken( CreateInvestment, body, token )    
    .then((res) => { 
      console.log({errrrr: res})

      if(typeof res.message !== 'undefined') {
        this.setState({ 
          showLoading : false,
          title : 'Alert',
          message : res.message,
          showAlert : true,
        }); 
        // return this.refs.toastError.show(res.message, 400);
       } 
       else {
          console.log('hello...', res);
          this.setState({ 
            showLoading : false, 
          }); 
          this.props.navigation.navigate('DashBoard');
          this.refs.toastSuccess.show('Payment Successful!', 200, () => {
          this.onClose();      
        }); 
      }
    });
  }
  render () {
    const {showAlert, showLoading, title, message} =  this.state;
    const{navigation} = this.props,
      firstName =  navigation.getParam('firstname'),
      lastName =  navigation.getParam('lastname'),
      amount = navigation.getParam('amount'),
      currency = navigation.getParam('currency'),
      email = navigation.getParam('email'),
      public_key = "FLWPUBK_TEST-6bcf884370cc7fc7aca174aba766f2fa-X",
      secretkey = "FLWSECK_TEST-6baece60256b2d6006c0721e44f20a1d-X",
      encryptionkey = "FLWSECK_TEST11533f51f4b4";

   return(
    <SafeAreaView style={styles.container}>
      
      <Rave 
          amount={amount.toString()} 
          country="NG" 
          currency={currency}
          // country= {country}
          email= {email} 
          firstname= {firstName} 
          lastname= {lastName} 
          publickey= {public_key}
          secretkey= {secretkey}
          encryptionkey = {encryptionkey}
          meta={[{ metaname: "color", metavalue: "red" }, { metaname: "storelocation", metavalue: "ikeja" }]}
          production={false} 
          paymenttype="card"
          onSuccess={res => this.onSuccess(res)} 
          onFailure={e => this.onFailure(e)}
          onClose={e => this.onClose(e)}
          />
          <Toast
            ref="toastSuccess"
            style={{backgroundColor: 'green'}}
            position='bottom'
            positionValue={200}
            fadeInDuration={750}
            fadeOutDuration={4000}
            opacity={0.8}
            textStyle={{color:'white'}}
          /> 
          <Toast
            ref="toastError"
            style={{backgroundColor: 'red'}}
            position='bottom'
            positionValue={200}
            fadeInDuration={750}
            fadeOutDuration={4000}
            opacity={0.8}
            textStyle={{color:'white'}}
          /> 

        <ProgressDialog
          visible={showLoading}
          title="Processing"
          message="Please wait..."
        />
        <SingleButtonAlert
          title = {title} 
          message = {message}
          handleCloseNotification = {this.handleCloseNotification}
          visible = {showAlert}
        />
    </SafeAreaView>
    )
  }  
}