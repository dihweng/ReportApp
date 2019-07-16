'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, AsyncStorage, StyleSheet,} from 'react-native';
import {DisplayText, } from '../../components';
import styles from './styles';


export default class Profile extends Component {
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

  handleLogout = () => {
    AsyncStorage.clear();
    setTimeout(() => {
      this.props.navigation.navigate('Login');
      }, 2000);
  }
  
  render () {
   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar barStyle="default" /> 
      <View>
        <DisplayText
          styles={StyleSheet.flatten(styles.exitTxt)}
          text = {'Logout'}
          onPress = {this.handleLogout}
        />  
      </View>
    </SafeAreaView>
    
   )
  }
} 



// 'use strict';
// import React, {Component} from 'react';
// import { SafeAreaView, View } from 'react-native';
// import styles from './styles';
// import Rave from 'react-native-rave';
// import Toast from 'react-native-easy-toast';
// import { ProgressDialog } from 'react-native-simple-dialogs';
// import { SingleButtonAlert } from '../../components/Alert';
// import {postWithToken, CreateInvestment} from '../Utils/Utils';
// export default class Payment extends Component {
//   constructor() {
//     super();
//     this.state = {
//       firstName : '',
//       lastName : '',
//       amount : '',
//       currency : '',
//       token : '',
//       period : '',
//       country : '',
//       showLoading : false,  
//       showAlert : false,
//       title : '',
//       message : '',
//     }
//     this.onSuccess = this.onSuccess.bind(this);
//     this.onFailure = this.onFailure.bind(this);
//   }
//   componentDidMount () {
//     const{navigation} = this.props,
//       firstName =  navigation.getParam('firstname'),
//       lastName =  navigation.getParam('lastname'),
//       amount = navigation.getParam('amount'),
//       currency = navigation.getParam('currency'),
//       token = navigation.getParam('token'),
//       period = navigation.getParam('period'),
//       country = navigation.getParam('country');

//       this.setState ({
//         firstName : firstName,
//         lastName : lastName,
//         amount : amount,
//         currency : currency,
//         token : token,
//         period : period,
//         country : country,
//       });
//   }

//   onSuccess(data) {
//     console.log("success...", data);
//     this.handlePayment(data)
//   }

//   onFailure(data) {
//    this.setState({ 
//       showLoading : false,
//     });
//     return this.refs.toastError.show( data.message, 300);  
//   }
//   onClose (){
//     return this.props.navigation.navigate('Dashboard');
//   }
//   handleCloseNotification = () => {
//     return this.setState({
//        showAlert : false
//      })
//   }
  
//   handleBackPress = () => {
//     this.props.navigation.goBack();
//   }
//   // Post Payment to detail to api/investment
//   handlePayment =  (data) => {
//     const {token, period, } = this.state;
//     console.log({tokenssssss: token});
//     this.setState({ 
//       showLoading : true ,
//     }); 
//     let principal = data.data.tx.amount,
//     trans_id = data.data.tx.flwRef,
//     currency = data.data.tx.currency.toLowerCase();

//     console.log("data to name...", currency, );

//     //convert ref to an object
//     let body = JSON.stringify({
//       "principal" :2000, 
//       "trans_id" :flw-t0-c415c1d2a526eee35594ee9235077b0a, 
//       "currency" :ngn, 
//       "period" :6,
//     });
    
//     postWithToken( CreateInvestment, body, token )    
//     .then((res) => { 

//       if(typeof res.message !== 'undefined') {
//         this.setState({ 
//           showLoading : false,
//           title : 'Alert',
//           message : res.message,
//           showAlert : true,
//         }); 
//         console.log({errrrr: res.message})
//         // return this.refs.toastError.show(res.message, 400);
//        } 
//        else {
//           console.log('hello...', res.message);
//           this.setState({ 
//             showLoading : false, 
//           }); 
//           this.refs.toastSuccess.show('Payment Successful!', 200, () => {
//           this.onClose();      
//         }); 
//       }
//     });
//   }
//   render () {
//     const { firstName, lastName, amount, currency, country, showLoading, message, title, showAlert} =  this.state,
//     public_key = "FLWPUBK_TEST-8f91082fe07d13f8eab27ff57df96ac2-X",
//     secretkey = "FLWSECK_TEST-1d64062b1e22c866f89631bbd2bc6dfc-X",
//     encryptionkey = "FLWSECK_TEST8b3a6bd4c129";
//    return(
//     <SafeAreaView style={styles.container}>
//       <Rave 
//           amount={amount.toString()} 
//           country="NG" 
//           currency={currency}
//           // country= {country}
//           // currency={currency} 
//           email="dihwengalbert@gmail.com" 
//           firstname= {firstName} 
//           lastname= {lastName} 
//           publickey= {public_key}
//           secretkey= {secretkey}
//           encryptionkey = {encryptionkey}
//           meta={[{ metaname: "color", metavalue: "red" }, { metaname: "storelocation", metavalue: "ikeja" }]}
//           production={false} 
//           paymenttype="card"
//           onSuccess={res => this.onSuccess(res)} 
//           onFailure={e => this.onFailure(e)}
//           onClose={e => this.onClose(e)}
//           />
//           <Toast
//             ref="toastSuccess"
//             style={{backgroundColor: 'green'}}
//             position='bottom'
//             positionValue={200}
//             fadeInDuration={750}
//             fadeOutDuration={4000}
//             opacity={0.8}
//             textStyle={{color:'white'}}
//           /> 
//           <Toast
//             ref="toastError"
//             style={{backgroundColor: 'red'}}
//             position='bottom'
//             positionValue={200}
//             fadeInDuration={750}
//             fadeOutDuration={4000}
//             opacity={0.8}
//             textStyle={{color:'white'}}
//           /> 

//         <ProgressDialog
//           visible={showLoading}
//           title="Processing"
//           message="Please wait..."
//         />
//         {/* <SingleButtonAlert
//           title = {title} 
//           message = {message}
//           handleCloseNotification = {this.handleCloseNotification}
//           visible = {showAlert}
//         /> */}
//     </SafeAreaView>
//     )
//   }  
// }