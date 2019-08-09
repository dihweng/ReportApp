'use strict';
import React, {Component} from 'react';
import { View, FlatList, LayoutAnimation, Platform, UIManager, SafeAreaView, TouchableOpacity,StatusBar, Image, Text, StyleSheet,} from 'react-native';
import {DisplayText, SubmitButton, SingleButtonAlert, CustomToast} from '../../components';
import styles from './styles';
import theme from '../../assets/theme';
import { getRoute, getAllReport, getProfile, AddReadLaterEndPoint, AddFavoriteEndPoint } from '../Utils/Utils';
import { ProgressDialog } from 'react-native-simple-dialogs';
import colors from '../../assets/colors';

export default class Citation extends Component {
  constructor(props) {
    super(props);
    this.state ={
      data : '',
      showAlert : false,
      message : '',
      refreshing: false,
      expanded: false,
      expandalph : false,
      number: '',
      alphabet: '',
      title: '',

    }
  }
  componentWillMount () {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  handleApply = () => {
    alert('sorry cant apply citation now')
  }
  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
  }
  changeLayoutalph = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expandalph: !this.state.expandalph });
  }

  handleDivisionPress =(citation)=>{
    return alert(citation)
  }

  renderHeader = () => {
    var citationsAlph = ['A','B','C','D','E','F','G','H','I','J','K','L', 'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    var citations = ['1', '2', '3', '4', '6','7', '8', '9'];
    var citationList = citations.map((citation, index) => {
      return <TouchableOpacity 
                key = {index}
                style = {styles.citisionTp}
                onPress={()=>this.handleDivisionPress(citation)}>
              <Text 
                style={styles.text}
                key = {index}>
                {citation}
              </Text> 
              </TouchableOpacity>
    });
    var citationListAlhp = citationsAlph.map((citationAlph, index) => {
      return <TouchableOpacity 
                key = {index}
                style = {styles.citisionTp}
                onPress={()=>this.handleDivisionPress(citationAlph)}>
              <Text 
                style={styles.text}
                key = {index}>
                {citationAlph}
              </Text> 
              </TouchableOpacity>
    })




    return <View style={styles.headerMessageView}>
       <View style = {styles.expandedView}>
          {/* Citation 0-9 */}
        <View style = {styles.citationView}>
          <View style = {styles.sorting}>
            <TouchableOpacity 
              onPress={this.changeLayout}
              style = {styles.sorting}>
              <Image
                onPress={this.changeLayout}
                source = {require('../../assets/images/sort_up.png')}
                style = {StyleSheet.flatten(styles.sortIcon)}
              />
            </TouchableOpacity>
          </View>
          <View style = {styles.citationRange}>
            <DisplayText
              numberOfLines = { 2 } 
              ellipsizeMode = 'middle'
              text = {'Division 1 - 9'}
              styles = {StyleSheet.flatten(styles.citationNumber)}
            />
            <DisplayText
              numberOfLines = { 2 } 
              ellipsizeMode = 'middle'
              text = {'An inhibitory postsynaptic potential is a kind of synaptic potential that makes a postsynaptic neuron less likely to generate an action potential'}
              styles = {StyleSheet.flatten(styles.citationBody)}
            />
          </View>
        </View>
        <View style={{ flexDirection : 'row',height: this.state.expanded ? null : 0, overflow: 'hidden', flexWrap : "wrap" }}>
            {citationList}
        </View>
        </View>
          {/* Citation A - Z */}
        <View style = {styles.expandedView}>

          <View style = {styles.citationViewAlph}>
            <View style = {styles.sorting}>
              <TouchableOpacity 
                onPress={this.changeLayoutalph}
                style = {styles.sorting}>
                <Image
                  onPress={this.changeLayoutalph}
                  source = {require('../../assets/images/sort_up.png')}
                  style = {StyleSheet.flatten(styles.sortIcon)}
                />
              </TouchableOpacity>
            </View>
            <View style = {styles.citationRange}>
              <DisplayText
                numberOfLines = { 3 } 
                ellipsizeMode = 'middle'
                text = {'Citation A - Z'}
                styles = {StyleSheet.flatten(styles.citationNumber)}
              />
              <DisplayText
                numberOfLines = { 3 } 
                ellipsizeMode = 'middle'
                text = {'An inhibitory postsynaptic potential is a kind of synaptic potential that makes a postsynaptic neuron less likely to generate an action potential'}
                styles = {StyleSheet.flatten(styles.citationBody)}
              />
            </View>
          </View>
          <View style={{ flexDirection : 'row',height: this.state.expandalph ? null : 0, overflow: 'hidden', flexWrap : "wrap" }}>
            {citationListAlhp}
          </View>
        </View>    
    </View>
  }

  render () {
    const {showLoading, title, message, showAlert, } = this.state;
   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar barStyle="default" /> 
      <View style = {styles.viewBody}>
        <FlatList          
          data={this.state.data}          
          renderItem={this.renderRow}          
          ListHeaderComponent={this.renderHeader}     
          keyExtractor={ data=> data.id.toString()}   
          showsVerticalScrollIndicator={false}
        />
        <View style = {styles.taostView}>
          <CustomToast ref = "defaultToastBottom" backgroundColor='#4CAF50' position = "bottom"/>          
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
        {/* button */}
      <SubmitButton
        title={'Apply'}
        onPress={this.handleApply}
        titleStyle={styles.btnText}
        btnStyle = {styles.btnStyle}/>

    </SafeAreaView>
    
   )
  }
} 
