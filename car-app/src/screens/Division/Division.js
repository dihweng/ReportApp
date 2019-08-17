'use strict';
import React, {Component} from 'react';
import { View, FlatList, LayoutAnimation, Platform, UIManager, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, SingleButtonAlert} from '../../components';
import styles from './styles';
import { ProgressDialog } from 'react-native-simple-dialogs';
import { getRoute, GetDivisionEndpoint } from '../Utils/Utils';

export default class Devision extends Component {
  constructor(props) {
    super(props);
    this.state ={
      data: [],
      token: '',
      showAlert: false,
      message: '',
      title: '',
      expanded: false,
    }
  }

  async componentDidMount(){
    (Platform.OS === 'android') ? UIManager.setLayoutAnimationEnabledExperimental(true) : null
    await this.handleGetDivisions();
  }

  allDivisions=async()=>{
   // this.showLoadingDialogue();
    await getRoute(GetDivisionEndpoint)
      .then((res) => {
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
  handleGetDivisions=async()=>{
    //this.showLoadingDialogue();

    try {
      await this.allDivisions()
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

  handleDivisionPress =(item)=>{
    return this.props.navigation.navigate('DivisionDetails',{
      'id': item.id,
      'name': item.name,
    });
  }

  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
  }

  renderRow = ({item}) => {
    return (
      <View style = {styles.listViewItem}>    
        <TouchableOpacity 
          onPress = {()=>this.handleDivisionPress(item)}
          style = {styles.cardView}>
            <DisplayText
              onPress = {()=>this.handleDivisionPress(item)}
              text = {item.name}
              styles = {StyleSheet.flatten(styles.categoryName)}
            />
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
        <View style={styles.wrapper}>
          <View style = {styles.expandedView}>
          {/* Divisio 0-16 */}
          <View style = {styles.citationView}>
            {/* <View> */}
              <TouchableOpacity 
                onPress={this.changeLayout}
                style = {styles.sorting}>
                <Image
                  onPress={this.changeLayout}
                  source = {require('../../assets/images/sort_up.png')}
                  style = {StyleSheet.flatten(styles.sortIcon)}
                />
              </TouchableOpacity>
            {/* </View> */}
            <View style = {styles.citationRange}>
              <DisplayText
                numberOfLines = { 1 } 
                ellipsizeMode = 'middle'
                text = {'Division 1 - 16'}
                styles = {StyleSheet.flatten(styles.citationNumber)}
              />
              <DisplayText
                numberOfLines = { 3 } 
                ellipsizeMode = 'middle'
                text = {'Filter Reports from the 16 Divisions of the Court of Appeal'}
                styles = {StyleSheet.flatten(styles.citationBody)}
              />
            </View>
          </View>
          <View 
            style={{ flexDirection : 'row',
              height: this.state.expanded ? '75%' : 0, 
              overflow: 'scroll', 
              flexWrap : "wrap" }}>
            {/* {divisionList} */}
          {/* <View style = {styles.viewBody}> */}
            <FlatList          
              data={this.state.data}          
              renderItem={this.renderRow}          
              keyExtractor={ data=> data.id.toString()}   
              showsVerticalScrollIndicator={false}
            /> 
          {/* </View>  */}
        </View>
        </View>
        
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
