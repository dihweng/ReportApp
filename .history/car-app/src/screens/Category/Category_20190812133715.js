'use strict';
import React, {Component} from 'react';
import { View, SafeAreaView, StatusBar, FlatList, TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText,} from '../../components';
import { ProgressDialog } from 'react-native-simple-dialogs';
import { getRoute, GetCategoryEndpoint } from '../Utils/Utils';
import styles from './styles';
import DropdownAlert from 'react-native-dropdownalert';


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
    //this.showLoadingDialogue();
    await getRoute(GetCategoryEndpoint)
      .then((res) => {
        if (typeof res.message !== 'undefined') {  
          return this.showNotification('error', 'Message', res.message);
        }   
        else {          
          this.setState({
            data: res.data,
          });
          return this.hideLoadingDialogue();
        }
      }
    ).catch(error=>this.showNotification('error', 'Message', error.toString()))
  }
  handleGetCatefories=async()=>{
    try {
      await this.allCategories()
    }
    catch(error) {
      return this.showNotification('error', 'Message', error.toString());
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

  showNotification = (type, title, message,) => {
    this.hideLoadingDialogue();
    return this.dropDownAlertRef.alertWithType(type, title, message);
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
      <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />

    </SafeAreaView>
    
   )
  }
} 
