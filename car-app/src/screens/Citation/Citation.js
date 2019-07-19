'use strict';
import React, {Component} from 'react';
import { View, LayoutAnimation, Platform, UIManager, SafeAreaView, TouchableOpacity,StatusBar, Image, Text, StyleSheet,} from 'react-native';
import {DisplayText, SubmitButton} from '../../components';
import styles from './styles';


export default class Citation extends Component {
  constructor(props) {
    super(props);
    this.state ={
      data : '',
      showAlert : false,
      message : '',
      refreshing: false,
      expanded: false,
      expandalph : false


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

  render () {

    var citationsAlph = ['a','b','c','d','e','f','g','h','i','j','k','l']
    var citations = ['1', '2', '3', '4', '6','7', '8', '9'];
    var citationList = citations.map((citation, index) => {
      return <TouchableOpacity 
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
                style = {styles.citisionTp}
                onPress={()=>this.handleDivisionPress(citationAlph)}>
              <Text 
                style={styles.text}
                key = {index}>
                {citationAlph}
              </Text> 
              </TouchableOpacity>
    })
   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar barStyle="default" /> 
      <View style={styles.wrapper}>
        {/* Citation 0-9 */}
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
