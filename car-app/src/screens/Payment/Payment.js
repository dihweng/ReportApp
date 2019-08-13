'use strict';
import React, {Component} from 'react';
import { SafeAreaView, View } from 'react-native';
import styles from './styles';
import { WebView } from 'react-native-webview';

export default class Payment extends Component {
  constructor() {
    super();
    this.state = {
     
    }
  }

  componentDidMount () {

  }

  handleCloseNotification = () => {
    return this.setState({
       showAlert : false
     })
  }
  
  handleBackPress = () => {
    this.props.navigation.goBack();
  }

  _onNavigationStateChange (webViewState) {
    if(webViewState.title === 'Payment Successful') {

      setTimeout(()=>{
        this.props.navigation.navigate('ManageSubscription');
      }, 3000);
    }
 }
  render () {
    const{navigation} = this.props,
    plan_id = navigation.getParam('plan_id'),
    id = navigation.getParam('id'),
    uri = `http://45.76.189.218/api/process?user_id=${id}&plan_id=${plan_id}`;
     
   return(
    // <SafeAreaView style={styles.container}>
       <WebView
        source={{uri: uri, method:'GET'}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        // scalesPageToFit={false}
        useWebKit={true}
        onNavigationStateChange={this._onNavigationStateChange.bind(this)}
        
      />
    // </SafeAreaView>
    )
  }  
}