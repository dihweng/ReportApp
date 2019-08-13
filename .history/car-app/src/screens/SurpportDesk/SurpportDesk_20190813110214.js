
'use strict';
import React, {Component} from 'react';
import { View, FlatList, SafeAreaView, StatusBar, Image, Text,TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, SubmitButton, SingleButtonAlert, InputField} from '../../components';
import styles from './styles';
import colors from '../../assets/colors';
import { ProgressDialog } from 'react-native-simple-dialogs';
import { getRouteToken, getUserDetails, AllListofSupport } from '../Utils/Utils';
import moment from 'moment';
import DropdownAlert from 'react-native-dropdownalert';


export default class SurpportDesk extends Component {
  constructor(props) {
    super(props);
    this.state ={
      token : '',
      showAlert : false,
      message : '',
      title : '',
      showAlert : false,
      showLoading : false,
      messageIssue : '',
      isValidIssue : false,
      userId : '',
      data : [],
    }
  }

  async componentDidMount(){
    let userDetails = await getUserDetails();
    const token =  userDetails.token,
    userId = userDetails.data.id;
    this.setState({
      token ,
      userId,
    });
    this.handleGetAllTicket()
  }
 // Show Loading Spinner
 showLoadingDialogue =()=> {
  this.setState({
    showLoading: true,
  });
}
// Hide Loading Spinner
hideLoadingDialogue =()=> {
  this.setState({
    showLoading: false,
  });
}
showNotification = (type, title, message,) => {
  this.hideLoadingDialogue();
  return this.dropDownAlertRef.alertWithType(type, title, message);
}
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigation.toggleDrawer();
  };
  handleCloseNotification = () => {
    return this.setState({
       showAlert : false
     })
  }

  handleCreateTicket = () => { 
    return this.props.navigation.navigate('CreateIssue');
  }

  handleGetAllTicket = async() => {
    const{token, userId} = this.state;
    this.setState({
      showLoading: true
    });
    let endPoint = `${AllListofSupport}/${userId}/${"support"}`;
      await getRouteToken(endPoint, token)
      .then((res) => {
        if(res.data !== 'undefined') {
          return this.setState({ 
            showLoading : false, 
            data : res.data,
          }); 
        }
        return await this.showNotification('error', 'Message', res.message);
 
      })
      .catch((error) => {
        return this.showNotification('error', 'Message', error.toString());

    });
  };

  handleFlatlist = (item) => {
    return this.props.navigation.navigate('Message', {
      "id" : item.id,
      "status" : item.status,
    });
    
  }

  renderFooter = () => {
    return <View style = {styles.FlatListFooter}>
  
    </View> 
  }
  renderRow = ({item}) => {
    let { updated_at, status, subject } = item;
    let dates = moment(updated_at).format("MMMM Do YYYY h:mm:ss ")
    let id = item.id.toString()
    return (
      <View style = {styles.profileDetails}>    
        <TouchableOpacity 
          onPress = {() => this.handleFlatlist(item)}
          style = {styles.cardView}>
            
            <Text  onPress = {() => this.handleFlatlist(item)} 
              // numberOfLines = { 1 } 
              // ellipsizeMode = 'middle'
               style = {styles.textStyle}>
              {`#TICKETS: ${id}`}
            </Text>

              <DisplayText
                text= {`${subject.toString()}`}
                onPress = {() => this.handleFlatlist(item)}
                styles = {[styles.textStyleHeader, {fontStyle:'normal', color:colors.green_background}]}
              />
            <View style = {{flexDirection: 'row', justifyContent : 'space-between'}}>

              <DisplayText
                text={dates.toString()}
                onPress = {() => this.handleFlatlist(item)}
                styles = {styles.dateStyle}
              />
                <DisplayText
                  text = {`${status.toString()}`}
                  onPress = {() => this.handleFlatlist(item)}
                  styles = {styles.textStatus}
                /> 
    
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
              text={'Support Desk'}
              styles = {StyleSheet.flatten(styles.txtHeader)}
            />
          </View>
        </View> 
      <View style ={styles.supportViewBody}>
        <View style = {styles.inputView}>
          <DisplayText
            styles={StyleSheet.flatten(styles.textIssues)}
            text = {'Have an issue,'}/> 
          <DisplayText
            styles={StyleSheet.flatten(styles.textIssues)}
            text = {'Create a ticket to talk to support'}/> 
        </View> 
          <View style = {styles.btnView}>
            <SubmitButton
              title={'Create Ticket'}
              onPress={this.handleCreateTicket}
              titleStyle={styles.btnText}
              btnStyle = {styles.btnStyle}
            />
            <ProgressDialog
              visible={showLoading}
              title="Processing"
              message="Please wait..."/>
            <SingleButtonAlert
              title = {title} 
              message = {message}
              handleCloseNotification = {this.handleCloseNotification}
              visible = {showAlert}
            />
    
          </View> 
          <View style = {{paddingTop : 16, paddingBottom : 80}} >
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
      </View>
    </SafeAreaView>
    
   )
  }
} 
