'use strict';
import React, {Component} from 'react';
import { View,  LayoutAnimation, Platform, UIManager, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, SubmitButton} from '../../components';
import styles from './styles';
import { Row } from 'native-base';


export default class Devision extends Component {
  constructor(props) {
    super(props);
    this.state ={
      data : '',
      profile_id : '',
      showAlert : false,
      message : '',
      expanded: false,

    }
    
  }
  componentWillMount () {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  handleApply = () => {
    alert('hello');
  }
  handleDivisionPress =(division)=>{
    return alert(division)
  }

  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
  }
  render () {
    var divisions = ['1', '2', '3', '4', '6','7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
    var divisionList = divisions.map((division, index) => {
      return <TouchableOpacity 
                key = {index}
                style = {styles.divisionTp}
                onPress={()=>this.handleDivisionPress(division)}>
              <Text 
                style={styles.text}
                key = {index}>
                {division}
              </Text> 
              </TouchableOpacity>
    })
   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar barStyle="default" /> 
      <View style={styles.wrapper}>
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
              text = {'Division 1 - 16'}
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
            {divisionList}
        </View>
        </View>
        
        {/* button */}
        <SubmitButton
          title={'Apply'}
          onPress={this.handleApply}
          titleStyle={styles.btnText}
          btnStyle = {styles.btnStyle}/>

      </View>
    </SafeAreaView>
    
   )
  }
} 
