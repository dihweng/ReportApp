'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, FlatList, Image,TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, SingleButtonAlert } from '../../components';
import styles from './styles';
import colors from '../../assets/colors';
import { ProgressDialog } from 'react-native-simple-dialogs';
import theme from '../../assets/theme';

import { 
  DeleteFavoriteEndpoint, 
  DeleteReadLaterEndpoint, 
  getRouteToken, 
  getAllReport,
  getProfile, 
  AddReadLaterEndPoint, 
  AddFavoriteEndPoint } from '../Utils/Utils';



export default class CategoryDetails extends Component {
  constructor(props) {
    super(props);
    this.state ={
      data: [],
      showAlert: false,
      showLoading: false,
      message: '',
      title: '',
      id: '',
      token: '',
    }
  }
  async componentDidMount(){
    let profile = await getProfile();
    const {navigation} = this.props,
      id = navigation.getParam('id', 'NO-ID');
    await this.setState({
      token: profile.access_token,
      expires: profile.expires,
      showLoading: true,
      id: id,
    });
    
    await this.handleGetProfile();
  
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

  showNotification = message => {
    this.setState({ 
      showLoading : false,
      title : 'Error!',
      message : message,
      showAlert : true,
    }); 
  }

  handleCloseNotification = () => {
    return this.setState({
       showAlert : false,
     })
  }
  allReport = async() =>{
    const {token, id} = this.state; 
    let endPoint = `${getAllReport}${id}`;

    console.log({cateforuidddd: id, endpoint: endPoint})
    this.showLoadingDialogue();
    await getRouteToken(endPoint, token)
      .then((res) => {
        console.log('res', res.data)
        if (typeof res.message !== 'undefined') {  
          return this.showNotification(res.message);
        }   
        else {          
          this.setState({
            data: res.data,
            filterData: res.data,
          });
          return this.hideLoadingDialogue();
        }
      }
    );
  }
  handleGetAllReport = async() => {
    this.showLoadingDialogue();

    try {
      await this.allReport()
    }
    catch(error) {
      this.showNotification(error.toString());
    }
  }

  handleFullReport=async(item)=>{
    this.showLoadingDialogue();

    this.props.navigation.navigate('FullReport', {
      id: item.id,
      content: item.content,
      excerpt: item.excerpt,  
    });
  }

  handleGoBack = () => {
    return this.props.navigation.goBack();
  }
  renderRow = ({item}) => {
    return (
       <View style = {styles.listViewItem}>    
        <TouchableOpacity 
          onPress = {()=>this.handleFullReport(item)}
          style = {styles.cardView}>
          <View style ={styles.reportHeader}>
            <DisplayText
              numberOfLines = { 2 } 
              ellipsizeMode = 'middle'
              text = {item.title}
              onPress = {()=>this.handleFullReport(item)}
              styles = {StyleSheet.flatten(styles.reportName)}
            />

            <DisplayText
              numberOfLines = { 2 } 
              ellipsizeMode = 'middle'
              text = {item.citation}
              onPress = {()=>this.handleFullReport(item)}
              styles = {StyleSheet.flatten(styles.headerText)}
            />

            <DisplayText
              numberOfLines = { 2 } 
              // ellipsizeMode = 'middle'
              text = {''}
              onPress = {()=>this.handleFullReport(item)}
              styles = {StyleSheet.flatten(styles.headerText)}
            /> 

             <DisplayText
              numberOfLines = { 4 } 
              ellipsizeMode = 'middle'
              text = {'Little Description needed'}
              onPress = {()=>this.handleFullReport(item)}
              styles = {StyleSheet.flatten(styles.reportInfo)}
            />
          <View style = {styles.txtView}>
           
            <View style={styles.buttonView}>
              {/* {this.displayfavoriteBtn(item.id, item.is_favorite)}
              {this.displayReadLaterBtn(item.id, item.is_future_saved)} */}
            </View> 
          </View>
          </View>
        </TouchableOpacity>
        
        </View>
      );
  }


  render () {
    const {
      showLoading, 
      title, 
      message, 
      showAlert, } = this.state;
   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar barStyle="default" /> 

        <View style = {styles.navBar}>
          <TouchableOpacity 
            onPress = {this.handdleBackPress}
            style = {styles.headerImage}>
            <Image
              onPress = {this.handleG0Back}
              source = {require('../../assets/images/back.png')}
              style = {StyleSheet.flatten(styles.headerIcon)}
            />
          </TouchableOpacity>
          <View style = {styles.nameView}>
            <DisplayText
              text={'Category'}
              styles = {StyleSheet.flatten(styles.txtHeader)}/>
          </View>
        </View> 
      <View style = {styles.viewBody}>
        <View style = {styles.cards}>
          <TouchableOpacity
            onPress = {this.handleGoBack} 
            style = {styles.angleView}>
            <Image
              onPress = {this.handleGoBack}
              source = {require('../../assets/images/angle_back.png')}
              style = {StyleSheet.flatten(styles.angleBack)}
            />
          </TouchableOpacity>
          <View style ={styles.verticcalLine}></View>

          <View style = { styles.viewText}>
            <DisplayText
              text={name}
              styles = {StyleSheet.flatten(styles.categoryName)}
            />
          </View>
          
        </View>
        <FlatList          
          data={this.state.data}          
          renderItem={this.renderRow}          
          // ListHeaderComponent={this.renderHeader}     
          keyExtractor={ data=> data.id.toString()}   
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
