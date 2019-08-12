'use strict';
import React, {Component} from 'react';
import { View, FlatList,ScrollView, SafeAreaView, StatusBar, Image,TouchableOpacity, StyleSheet,} from 'react-native';
import styles from './styles';
import theme from '../../assets/theme';
import {DisplayText, InputField,  } from '../../components';
import colors from '../../assets/colors';
import { ProgressDialog } from 'react-native-simple-dialogs';
import {GetReadLaterEndpoint, getProfile, getRouteToken, DeleteReadLaterEndpoint} from '../Utils/Utils';



export default class ReadLaterList extends Component {
  constructor(props) {
    super(props);
    this.state ={
      showAlert : false,
      showLoading : false,
      message: '',
      title: '',
      id : '',
      data: [],
      filterData: [],
      token: ''
    }
  }

  async componentDidMount(){
    let profile = await getProfile();
    this.setState({
      token : profile.access_token,
      expires : profile.expires,
      showLoading:true,
      // data:this.reports
    });
    await this.handleGetReadLater();
  }


  // handlePlainReport = () => {
  //   return this.props.navigation.navigate('PlainReport');
  // }
  handleFavoriteList = () => {
    return this.props.navigation.navigate('FavoriteList');
  }
  handleReadLaterList = () =>{
    return this.props.navigation.navigate('ReadLaterList')
  }
  
  handleOnBackPress = () => {
    this.props.navigation.navigate('DashBoard');
  };
// Show Loading Spinner
  showLoadingDialogue =()=> {
    this.setState({
      showLoading: true,
    });
  }
// Hide Loading Spinner
  hideLoadingDialogue =()=> {
    this.setState({
      showLoading: false,
    });
  }
// Show Dialog message
  showNotification = message => {
    this.setState({ 
      showLoading : false,
      title : 'Error!',
      message : message,
      showAlert : true,
    }); 
  }
// Hide Dialog message
  handleCloseNotification = () => {
    return this.setState({
       showAlert : false,
     })
  }

  AllReadLater = async() =>{
    const {token} = this.state;
    this.showLoadingDialogue();
    await getRouteToken(GetReadLaterEndpoint, token)
      .then((res) => {
        if (typeof res.message !== 'undefined') {  
          return this.showNotification(res.message);
        }   
        else {          
          this.setState({
            data: res.data,
            filterData: res.data,
            id: res.data.id,
          });
          // return this.Toast('Successful')
          return this.hideLoadingDialogue();

        }
      }
    );
  }
  //Call AllReadLater function
  handleGetReadLater = async() => {
    this.showLoadingDialogue();

    try {
      await this.AllReadLater()
    }
    catch(error) {
      return this.showNotification(error.toString());
    }
  }
  // search filter 
  searchFilterFunction = text => {
    const {filterData} = this.state;
    this.setState({
      value: text,
    });
    const newData = filterData.filter(item => {
      const itemData = `${item.title.toUpperCase()} ${item.citation.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    return this.setState({
      data: newData,
    });
  }

  Toast=(message)=>{
    this.refs.defaultToastBottom.ShowToastFunction(message);
  }
// Handle delete of report on long press 


  // handleFullReport=()=>{
  //   alert('hello will sooon handle you');
  // }

  deleteReadLater=async(id)=> {
    const { token } = this.state
    let endpoint = `${DeleteReadLaterEndpoint}${id}/${'future'}`      
    this.showLoadingDialogue();

    const settings = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,   

      },
    };

    try {
      let response = await fetch(endpoint, settings);
      let res = await response;
      if(res.status >= 200 && res.status < 300) {
        // this.handleGetReadLater();
        return await this.showNotification('Successfully Removed Report from Read Later');   
      }
      return await this.showNotification(res.message.toString());   
    } 
    catch(error){
     return this.showNotification(error.toString()); 
    }
  }
renderHeader = () => {
  return <View style={styles.headerMessageView}>
    <View style={styles.searchView}>
        <Image
          source = {require('../../assets/images/search.png')}
          style = {StyleSheet.flatten(styles.searchIcon)}
        />
        <InputField
          placeholder = {'Search Anything'}
          placeholderTextColor = {theme.primaryTextColor}
          textColor={colors.purple}
          inputType={'name'}
          keyboardType={'default'}
          onChangeText={text => this.searchFilterFunction(text)}
          autoCorrect={false}
          value={this.state.value}
          height = {30}
          width = {'80%'}
          borderBottomWidth = {0}
          paddingLeft  = {8}
        /> 
      </View>
    </View>
  }
  // On pressing a report will navigate you to Full Report
//With the Params id, content and except
handleFullReport=async(item)=>{
  this.props.navigation.navigate('FullReport', {
    id: item.id,
    content: item.content,
    excerpt: item.excerpt,  
  });
}

  renderRow = ({item}) => {
    return (
      <View style={styles.flatlistContainer}>
      <View style = {styles.listViewItem}>    
        <TouchableOpacity 
          onLongPress={()=>this.deleteReadLater(item.id)}
          onPress = {()=>this.handleFullReport(item)}
          style = {styles.cardView}>
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
              numberOfLines = { 4 } 
              ellipsizeMode = 'middle'
              text = {item.excerpt.toLowerCase()}
              onPress = {()=>this.handleFullReport(item)}
              styles = {StyleSheet.flatten(styles.reportInfo)}
              />
        </TouchableOpacity>
        <TouchableOpacity                  
          style = {styles.deleteBtn}>
          <DisplayText
            text = {'Remove'}
            onPress = {()=>this.deleteReadLater(item.id)}
            styles = {StyleSheet.flatten(styles.deleteTxt)}
          />
        </TouchableOpacity>
        </View>
      </View>
    );
  }

  render () {
    const { title, message, showAlert, showLoading } = this.state

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
            onPress = {this.handleFavoriteList}  
            style = {styles.customTabTp2}>
              <DisplayText
              text={'Favorite'}
              onPress = {this.handleFavoriteList}  
              styles = {StyleSheet.flatten(styles.txtTabHeader)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress = {this.handleReadLaterList}  
            style = {styles.customTabTp}>
              <DisplayText
              text={'Read Later'}
              onPress = {this.handleReadLaterList}  
              styles = {StyleSheet.flatten(styles.txtTabHeaderWhite)}
            />
          </TouchableOpacity>
        </View>
        <View style = {styles.viewBody}>
          <FlatList          
            data={this.state.data}          
            renderItem={this.renderRow}          
            ListHeaderComponent={this.renderHeader}     
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
