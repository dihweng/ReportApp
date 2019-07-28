'use strict';
import React, {Component} from 'react';
import { View, FlatList, SafeAreaView, StatusBar, TouchableOpacity, AsyncStorage, StyleSheet,} from 'react-native';
import {DisplayText, InputField, SubmitButton} from '../../components';
import styles from './styles';
import theme from '../../assets/theme';

export default class AllReports extends Component {
  constructor(props) {
    super(props);
    this.state ={
      data : '',
      token : '',
      showAlert : false,
      message : '',
    }
  }

  reports = [
    {    
      "_id": "5d1c92249b0b080017036e53",
      "reportName": "Alh. Abubakar V Mr Prakash",
      "Citation": "Citation (2018) Electronic - court of appeal",
      "name": "Tunde Anwo",
      "Reports": "Report(E-C.A.R) - 516",
      "short_details": "Love life  If you have been developing Aug 18, 2018 - If you have been developing mobile people have thought about and already!!",
      "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/MTN_Logo.svg/1200px-MTN_Logo.svg.png",

  },
  {
    "_id": "5d1c92249b0b080017036e59",
    "reportName": "Chief Chukwuka V Mallam Sanni ",
    "Citation": "Citation (2018) Electronic - court of appeal",
      "name": "Tunde Anwo",
      "Reports": "Report(E-C.A.R) - 516",
      "short_details": "Love life  If you have been developing Aug 18, 2018 - If you have been developing mobile people have thought about and already!!",
      "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/MTN_Logo.svg/1200px-MTN_Logo.svg.png",

  },
  {
    "_id": "5d1c92249b0b080017036e93",
    "reportName": "Dr Edima SamSon V Mr Dihweng Che",
    "Citation": "Citation (2018) Electronic - court of appeal",
    "name": "Tunde Anwo",
    "Reports": "Report(E-C.A.R) - 516",
    "short_details": "Love life  If you have been developing Aug 18, 2018 - If you have been developing mobile people have thought about and already!!",
    "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/MTN_Logo.svg/1200px-MTN_Logo.svg.png",

  },
  {
    "_id": "5d1c92249b0b080017037e53",
    "reportName": "Alh. Abubakar V Mr Prakash",
    "Citation": "Citation (2018) Electronic - court of appeal",
    "name": "Tunde Anwo",
    "Reports": "Report(E-C.A.R) - 516",
    "short_details": "Love life  If you have been developing Aug 18, 2018 - If you have been developing mobile people have thought about and already!!",
    "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/MTN_Logo.svg/1200px-MTN_Logo.svg.png",

  },
  {
    "_id": "5d1c92249b0b080017636e53",
    "reportName": "Mrs Johnson V Miss Mary",
    "Citation": "Citation (2018) Electronic - court of appeal",
    "name": "Tunde Anwo",
    "Reports": "Report(E-C.A.R) - 516",
    "short_details": "Love life  If you have been developing Aug 18, 2018 - If you have been developing mobile people have thought about and already!!",
    "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/MTN_Logo.svg/1200px-MTN_Logo.svg.png",

  },
  {
    "_id": "5d1c92249b0b080017236e53",
    "reportName": "Alh. Abubakar V Mr Prakash",
    "Citation": "Citation (2018) Electronic - court of appeal",
    "name": "Tunde Anwo",
    "Reports": "Report(E-C.A.R) - 516",
    "short_details": "Love life  If you have been developing Aug 18, 2018 - If you have been developing mobile people have thought about and already!!",
    "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/MTN_Logo.svg/1200px-MTN_Logo.svg.png",

  },
  {
    "_id": "5d1c92249b0b08001703me53",
    "reportName": "Alh. Abubakar V Mr Prakash",
    "Citation": "Citation (2018) Electronic - court of appeal",
    "name": "Tunde Anwo",
    "Reports": "Report(E-C.A.R) - 516",
    "short_details": "Love life  If you have been developing Aug 18, 2018 - If you have been developing mobile people have thought about and already!!",
    "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/MTN_Logo.svg/1200px-MTN_Logo.svg.png",

  },
  {
    "_id": "5d1c92249b0b080017036e23",
    "reportName": "Alh. Abubakar V Mr Prakash",
    "Citation": "Citation (2018) Electronic - court of appeal",
    "name": "Tunde Anwo",
    "Reports": "Report(E-C.A.R) - 516",
    "short_details": "Love life  If you have been developing Aug 18, 2018 - If you have been developing mobile people have thought about and already!!",
    "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/MTN_Logo.svg/1200px-MTN_Logo.svg.png",

  },
  {
    "_id": "5d1c92249b0b08001707a6e53",
    "reportName": "Alh. Abubakar V Mr Prakash",
    "Citation": "Citation (2018) Electronic - court of appeal",
    "name": "Tunde Anwo",
    "Reports": "(E-C.A.R) - 516",
    "short_details": "Love life  If you have been developing Aug 18, 2018 - If you have been developing mobile people have thought about and already!!",
    "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/MTN_Logo.svg/1200px-MTN_Logo.svg.png",

  },
];

  componentDidMount(){
    // logout();
    this.setState({
      data:this.reports
    })
  }
  handleFullReport(item){
    return this.props.navigation.navigate('FullReport');
  }
  handleAddFavourite = () => {
    alert('hello read me later')
  }
  handleReadLater = () => {
    alert('hello read me later')
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
              text = {item.reportName}
              onPress = {()=>this.handleFullReport(item)}
              styles = {StyleSheet.flatten(styles.reportName)}
            />

          <View style = {styles.txtView}>
            <DisplayText
              numberOfLines = { 2 } 
              // ellipsizeMode = 'middle'
              text = {item.Citation}
              onPress = {()=>this.handleFullReport(item)}
              styles = {StyleSheet.flatten(styles.headerText)}
            />

            <DisplayText
              numberOfLines = { 2 } 
              // ellipsizeMode = 'middle'
              text = {item.Reports}
              onPress = {()=>this.handleFullReport(item)}
              styles = {StyleSheet.flatten(styles.headerText)}
            />
            <DisplayText
              numberOfLines = { 4 } 
              ellipsizeMode = 'middle'
              text = {item.short_details}
              onPress = {()=>this.handleFullReport(item)}
              styles = {StyleSheet.flatten(styles.reportInfo)}
            />
            <View style={styles.buttonView}>
              <SubmitButton
                title={'Add Favourite'}
                onPress={this.handleAddFavourite}
                titleStyle={styles.btnText}
                btnStyle = {styles.btnStyle}
              />
              <SubmitButton
                title={'Read Later'}
                onPress={this.handleReadLater}
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
   return(
    <SafeAreaView style={styles.container}> 
       <StatusBar barStyle="default"/>
       
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
