'use strict';
import React, {Component} from 'react';
import { View, SafeAreaView, StatusBar, FlatList, Image,TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, SingleButtonAlert, SubmitButton } from '../../components';
import styles from './styles';
import { ProgressDialog } from 'react-native-simple-dialogs';

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
      name: '',
    }
  }
  async componentDidMount(){
    let profile = await getProfile();
    const {navigation} = this.props,
      id = navigation.getParam('id'),
      name = navigation.getParam('name');
    await this.setState({
      token: profile.access_token,
      expires: profile.expires,
      showLoading: true,
      id,
      name,
    });
    
    await this.handleGetAllReport();
  
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
    let endPoint = `${getAllReport}${'?'}${'category_id='}${id}`;
    this.showLoadingDialogue();
    await getRouteToken(endPoint, token)
      .then((res) => {
        console.log({res})
        if(typeof res.data !== 'undefined' ) {
          if(res.data.length) {
            this.setState({
              data: res.data,
            });
            return this.hideLoadingDialogue();
          }
          else {
            return this.showNotification('No Record Found', 'Message');
          }
        }
        await this.showNotification(res.message); 
        await setTimeout(()=>{
          this.handleCloseNotification();
          return this.props.navigation.goBack();
        }, 3000);
      }).catch(error => this.showNotification(error.toString(), 'Message'))
  }


  handleGetAllReport = async() => {
    this.showLoadingDialogue();

    try {
      await this.allReport()
    }
    catch(error) {
     return this.showNotification(error.toString());
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
  renderRow = ({item, index}) => {

    let read_later_button_text = item.is_future_saved == true ? 'Remove Read' : 'Read Later';
    let favorite_button_text = item.is_favorite == true ? 'Remove Favorite' : 'Add Favorite';
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

            {/* <HTML html={item.excerpt} /> */}

          <View style = {styles.txtView}>
           
            <View style={styles.buttonView}>
              <SubmitButton
                title={favorite_button_text}
                onPress={()=>this.addDeleteFavorite(item.id, favorite_button_text, index)}
                titleStyle={styles.btnText}
                btnStyle = {styles.btnStyle}
              />
              <SubmitButton
                title={read_later_button_text}
                onPress={()=>this.addDeleteReadlater(item.id, read_later_button_text, index)}
                titleStyle={styles.btnText}
                btnStyle = {styles.btnReadLate}
              />
            </View> 
          </View>
          </View>
        </TouchableOpacity>
        
        </View>
      );
  }


  render () {
    const { showLoading, title, message, showAlert, name} = this.state;
   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar barStyle="default" /> 
        <View style = {styles.navBar}>
          <TouchableOpacity 
            onPress = {this.handleGoBack}
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
        {/* <View style = {styles.viewBody}> */}
          <FlatList          
            data={this.state.data}      
            renderItem={this.renderRow}          
            keyExtractor={ data=> data.id.toString()}   
            showsVerticalScrollIndicator={false}
          />
        {/* </View>   */}
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
