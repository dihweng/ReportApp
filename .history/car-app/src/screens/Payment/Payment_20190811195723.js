'use strict';
import React, {Component} from 'react';
import { SafeAreaView, View } from 'react-native';
import styles from './styles';
import Rave from 'react-native-rave';
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
    // this.handlePayment(data)
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
  
  render () {
    const {showAlert, showLoading, title, message} =  this.state;
    const{navigation} = this.props,
      firstName =  navigation.getParam('firstname'),
      lastName =  navigation.getParam('lastname'),
      amount = navigation.getParam('amount'),
      email = navigation.getParam('email'),
      public_key = "FLWPUBK_TEST-6bcf884370cc7fc7aca174aba766f2fa-X",
      secretkey = "FLWSECK_TEST-6baece60256b2d6006c0721e44f20a1d-X",
      encryptionkey = "FLWSECK_TEST11533f51f4b4";

   return(
    <SafeAreaView style={styles.container}>
      
      <Rave 
          amount={amount.toString()} 
          country="NG" 
          currency={"NGN"}
          email= {email} 
          firstname= {firstName} 
          lastname= {lastName} 
          publickey= {public_key}
          secretkey= {secretkey}
          encryptionkey = {encryptionkey}
          meta={[{ metaname: "color", metavalue: "red" }, { metaname: "storelocation", metavalue: "ikeja" }]}
          production={false} 
          paymenttype="card"
          // onSuccess={res => this.onSuccess(res)} 
          onFailure={e => this.onFailure(e)}
          onClose={e => this.onClose(e)}
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