'use strict';
import React, {Component} from 'react';
import { View, Text, FlatList, SafeAreaView, StatusBar, Image, TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, SingleButtonAlert} from '../../components';
import styles from './styles';
import moment from 'moment';
import { ProgressDialog } from 'react-native-simple-dialogs';
import { getProfile, getRoute, ProfileEndpoint, AllInvestmentEndpoint } from '../Utils/Utils';
import colors from '../../assets/colors';
import numeral from 'numeral';


export default class Investment extends Component {
  constructor(props) {
    super(props);
    this.state ={
      message: '',
      showAlert : false,
      title : '',
      showLoading : false,
      data : [],
      token : '',
      name : '',
    }
  }
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigation.toggleDrawer();
  };


  async componentDidMount(){
    let profile = await getProfile();

    this.setState({
      token : profile.access_token,
    });
    // call investment profile
    await this.handleGetProfile();

  }

  handleInvestmentDetails = async() => {
    this.props.navigation.navigate('InvestmentDetails')
  }
  handleGetProfile = () => {
    const{token} = this.state;
    this.setState({
      showLoading: true
    });
    let endPoint = `${ProfileEndpoint}`;

      getRoute(endPoint, token)
      .then((res) => {
        if (typeof res.message !== 'undefined' || typeof res.message === '') {  
          return  this.setState({ 
            showLoading : false,
            title : 'Alert',
            message : res.message,
            showAlert : true,
          }); 
        }
        else {
          const id = res.data.id,
            name = res.data.name;
          this.handleGetAllInvestment(id);
          this.setState({
            name : name,
          });
        }
      })
      .catch((res) => {
        this.setState({
          showLoading : false,
          messageKey : 'Message',
          errorMessage : res.message,
          visible : true,
        });

      })
  }
  handleGetAllInvestment = (id) => {
    const{token} = this.state;    
    this.setState({
      showLoading: true
    });
    let endPoint = `${AllInvestmentEndpoint}${id}/${"investments"}`;

      getRoute(endPoint, token)
      .then((res) => {
        if (typeof res.message !== 'undefined' || typeof res.message === '') {  
          return  this.setState({ 
            showLoading : false,
            title : 'Alert',
            message : res.message,
            showAlert : true,
          }); 
        }
        else if(res.data.length < 1){
          // alert('Please Create Investment! to view it');
          this.setState({ 
            showLoading : false, 
            title : 'Alert',
            message : 'Get started by making an investment',
            showAlert: true,
          }); 
          // return this.props.navigation.navigate('DashBoard')

        }
        else {
          const data = res.data;
          this.setState({ 
            showLoading : false, 
            data : data,
          }); 
        }
      })
      .catch((res) => {
        this.setState({
          showLoading : false,
          messageKey : 'Message',
          errorMessage : res.message,
          visible : true,
        });
    });
  };
  handleCloseNotification = () => {
    return this.setState({
      showAlert : false
    });
  }

  handleFlatlist = (item) => {
    return this.props.navigation.navigate('InvestmentDetails', {
      "id" : item.id,
      "currency" : item.currency,
      "withdraw_requested" : item.withdraw_requested,
      "withdraw_at" : item.withdraw_at,
      "principal" : item.principal,
      "money_earned" : item.amount,
      "description" : item.description,   
    });
    
  }
  renderHeader = () => {
    const {name} = this.state;
    return <View style={styles.headerMessageView}>
        <View style = {styles.FlatListHeader}>
          <DisplayText
            text={`${name} Investment`}
            styles = {StyleSheet.flatten(styles.aircraftListTxt)}
          /> 
          <Image
            resizeMode= 'contain'
            style = {styles.messageLogo}
            source={require('../../assets/images/logo_login.png')}
          />
      </View>
    </View>
  
  }
  renderFooter = () => {
    return <View style = {styles.FlatListFooter}>
  
    </View> 
  }
  renderRow = ({item}) => {
    let { trans_id, created_at, currency } = item;
    let dates = moment(created_at).format("MMMM Do YYYY h:mm:ss ")
  
    return (
      <View style = {styles.profileDetails}>    
        <TouchableOpacity 
          onPress = {() => this.handleFlatlist(item)}
          style = {styles.cardView}>
              <DisplayText
                text= {`Investment ${item.id.toString()}`}
                onPress = {() => this.handleFlatlist(item)}
                styles = {[styles.textStyleHeader, {fontStyle:'normal', color:colors.green_background}]}
              />
            
            <Text  onPress = {() => this.handleFlatlist(item)} 
              numberOfLines = { 1 } 
              ellipsizeMode = 'middle'
               style = {styles.textStyle}>
              {`Trans ID: ${trans_id}`}
            </Text>
            <View style = {{flexDirection: 'row', justifyContent : 'space-between'}}>

            <DisplayText
              text={dates.toString()}
              onPress = {() => this.handleFlatlist(item)}
              styles = {styles.dateStyle}
            />
            {
              currency === 'ngn' ? 
                <DisplayText
                  text = {`₦${numeral(item.amount).format('0,0.00').toString()}`}
                  onPress = {() => this.handleFlatlist(item)}
                  styles = {[styles.textMoney, { color:colors.darkGray}]}
                /> 
              :
                <DisplayText
                  text = {`₦${numeral(item.amount).format('0,0.00').toString()}`}
                  onPress = {() => this.handleFlatlist(item)}
                  styles = {[styles.textMoney, { color:colors.darkGray}]}
                />
              }
            </View>
        </TouchableOpacity>
        {/* <View style = {{ color: index % 2 === 0 ? colors.green_background : colors.orange, width : 10, height: '100%' } }>
        </View> */}
      
      </View>
    );
  }

  render () {
    const {title, message, showAlert, data, showLoading} = this.state;

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
            text={'Investments'}
            styles = {StyleSheet.flatten(styles.txtHeader)}
          />
        </View>
      </View>       
      <View style = {{paddingTop : 16}}>
        <FlatList          
          data={data}          
          renderItem={this.renderRow}          
          keyExtractor={ data=> data.id.toString()}  
          ItemSeparatorComponent={this.renderSeparator} 
          // ListHeaderComponent={this.renderHeader}     
          ListFooterComponent={this.renderFooter}
          showsVerticalScrollIndicator={false}                                  
        />
      </View>
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
