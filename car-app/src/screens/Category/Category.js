'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, FlatList, TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, } from '../../components';
import styles from './styles';


export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state ={
      data : [],
      showAlert : false,
      showLoading : false,
      message : '',
    }
  }
  reports = [
    {    
      "_id": "5d1c92249b0b080017036e53",
      "name": "Town Law",
  },
  {
    "_id": "5d1c92249b0b080017036e59",
    "name": "State law",
  },
  {
    "_id": "5d1c92249b0b080017036e93",
    "name": "Local  Gov Law",
  
  },
  {
    "_id": "5d1c92249b0b080017037e53",
    "name": "Anotated Law Report",
  },
  {
    "_id": "5d1c92249b0b080017636e53",
    "name": "Financial law Report",
  },
  {
    "_id": "5d1c92249b0b080017236e53",
    "name": "Company Law Report",
  },
  {
    "_id": "5d1c92249b0b08001703me53",
    "name": "Social Law Report",
  },
  {
    "_id": "5d1c92249b0b080017036e23",
    "name" : "Country Law"
  },
  {
    "_id": "5d1c92249b0b08001707a6e53",
    "name": "Crime Law",

  },
];



componentWillMount(){
  // logout();
  this.setState({
    data:this.reports
  })
}
hadnleCategoryMain=(item)=>{
  return this.props.navigation.navigate('CategoryDetails',{
    'name' : item.name,
  });
}

renderRow = ({item}) => {
  return (
     <View style = {styles.listViewItem}>    
      <TouchableOpacity 
        onPress = {()=>this.hadnleCategoryMain(item)}
        style = {styles.cardView}>
        <View style ={styles.reportHeader}>
          <DisplayText
            onPress = {()=>this.hadnleCategoryMain(item)}
            text = {item.name}
            styles = {StyleSheet.flatten(styles.categoryName)}
          />
        </View>
          
      </TouchableOpacity>
      </View>
    );
}

  render () {
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
          keyExtractor={ data=> data._id}   
          showsVerticalScrollIndicator={false}
        />
      </View>  
        
    </SafeAreaView>
    
   )
  }
} 
