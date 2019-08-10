'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, FlatList, TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, SingleButtonAlert, CustomToast} from '../../components';
import { ProgressDialog } from 'react-native-simple-dialogs';
import { getRoute, GetCategoryEndpoint } from '../Utils/Utils';
import theme from '../../assets/theme';

import styles from './styles';


export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state ={
      data : [],
      showAlert : false,
      showLoading : false,
      message : '',
      title: ''
    }
  }

  async componentDidMount(){
    await this.handleGetCatefories();
  }
  allCategories=async()=>{
    this.showLoadingDialogue();
    await getRoute(GetCategoryEndpoint)
      .then((res) => {
<<<<<<< HEAD
=======
        //console.log({respomses: res})
>>>>>>> a83c3d7e66de78370119d8066eca0493aefcdf89
        if (typeof res.message !== 'undefined') {  
          return this.showNotification(res.message);
        }   
        else {          
          this.setState({
            data: res.data,
          });
          return this.hideLoadingDialogue();
        }
      }
    );
  }
  handleGetCatefories=async()=>{
    this.showLoadingDialogue();

    try {
      await this.allCategories()
    }
    catch(error) {
      return this.showNotification(error.toString());
    }
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

  handleCategoryMain=(item)=>{
    return this.props.navigation.navigate('CategoryDetails',{
      'id': item.id,
      'name': item.name,
    });
  }

  renderRow = ({item}) => {
    return (
      <View style = {styles.listViewItem}>    
        <TouchableOpacity 
          onPress = {()=>this.handleCategoryMain(item)}
          style = {styles.cardView}>
          <View style ={styles.reportHeader}>
            <DisplayText
              onPress = {()=>this.handleCategoryMain(item)}
              text = {item.name}
              styles = {StyleSheet.flatten(styles.categoryName)}
            />
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
        <View style = {styles.wrapper}>
          <DisplayText
            text = {'Select Report Category'}
            styles = {StyleSheet.flatten(styles.categoryName)}
          />
        </View>
       <View style = {styles.viewBody}>
        
        <FlatList          
          data={this.state.data}          
          renderItem={this.renderRow}          
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
