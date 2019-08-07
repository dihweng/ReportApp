'use strict';
import React, {Component} from 'react';
import { View, Text, ScrollView, SafeAreaView, StatusBar, Image,TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText } from '../../components';
import styles from './styles';
import theme from '../../assets/theme';
import HTML from 'react-native-render-html';


export default class FullReport extends Component {
  constructor(props) {
    super(props);
    this.state ={
      showAlert : false,
      showLoading : false,
      message: '',
      title: '',
      content: '',
    }
  }
  async componentDidMount(){
    await this.handleGetReport()
  }
  
  handleGetReport = async() => {
    const{navigation} = this.props;

    const id = navigation.getParam('id', 'NO-ID'),
      content = navigation.getParam('content', 'NO-ID'),
      excerpt = navigation.getParam('excerpt', 'NO-ID');
      
      return await this.setState({
        content: content,
      });
    // console.log({id: id, content: content, exerpt: excerpt});
  }
  handleRatio = () => {
    return this.props.navigation.navigate('Ratios');
  }
  handleFullReport = () => {
    return this.props.navigation.navigate('FullReport');
  }
  handleCitedAuthorities = () =>{
    return this.props.navigation.navigate('CitedAuthorities')
  }
  
  handleOnBackPress = () => {
    this.props.navigation.navigate('DashBoard');
  };
 
  handleConfirm = () => {
    alert('confirm coming soon');
  }

  

  render () {
    const { title, message, showAlert, showLoading, content } = this.state

    return(
      <SafeAreaView style={styles.container}> 
        <StatusBar barStyle="default" /> 
        <View style = {styles.navBar}>
          <TouchableOpacity
            onPress={this.handleOnBackPress} 
            style = {styles.headerImage}>
            <Image
              onPress={this.handleOnBackPress} 
              source = {require('../../assets/images/back.png')}
              style = {StyleSheet.flatten(styles.headerIcon)}
            />
          </TouchableOpacity>
          <View style = {styles.nameView}>
            <DisplayText
              text={'Title Name'}
              styles = {StyleSheet.flatten(styles.txtHeader)}
            />
          </View>
        </View> 
        <View style = {styles.cards}>
          <TouchableOpacity
            onPress = {this.handleFullReport}  
            style = {styles.customTabTp}>
              <DisplayText
              text={'Full Report'}
              onPress = {this.handleFullReport}  
              styles = {StyleSheet.flatten(styles.txtTabHeader)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress = {this.handleRatio}  
            style = {styles.customTabTp2}>
              <DisplayText
              text={'Ratio'}
              onPress = {this.handleRatio}  
              styles = {StyleSheet.flatten(styles.txtTabHeader)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress = {this.handleCitedAuthorities}  
            style = {styles.customTabTp2}>
              <DisplayText
              text={'Cited Authorities'}
              onPress = {this.handleCitedAuthorities}  
              styles = {StyleSheet.flatten(styles.txtTabHeader)}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{flex:1, paddingHorizontal: 8}}
          showsVerticalScrollIndicator={false}>
            <HTML html={content} />
        </ScrollView>
      </SafeAreaView> 
    )
  }
} 
