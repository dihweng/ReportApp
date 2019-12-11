'use strict';
import React, {Component} from 'react';
import { View, FlatList,SafeAreaView, StatusBar, Image,TouchableOpacity, StyleSheet, Alert} from 'react-native';
import styles from './styles';
import theme from '../../assets/theme';
import {DisplayText, InputField,  } from '../../components';
import colors from '../../assets/colors';
import { ProgressDialog } from 'react-native-simple-dialogs';
import {GetReadLaterEndpoint, getProfile, getRouteToken, getSubscription, DeleteReadLaterEndpoint} from '../Utils/Utils';
import DropdownAlert from 'react-native-dropdownalert';
import { SQLite } from 'expo-sqlite';

const db = SQLite.openDatabase("offlinedb.db");
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
      token: '',
      isActive: false,
      
    }
  }

  async componentDidMount(){
    await this.createTable();

    let profile = await getProfile();
    let subscription = await getSubscription();
    this.setState({
      token : profile.access_token,
      // showLoading:true,
      isActive:subscription,
    });
    // await this.handleGetReadLater();
    await this.getAllReport();


  this.focusListener =  await this.props.navigation.addListener('didFocus', () => {
      this.getAllReport();
    }); 
  }
  componentWillUnmount(){
    this.focusListener.remove();

  }
  // create table if it does not exit
  createTable = async() => {
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists offline_report (id integer primary key not null, report_title text NOT NULL UNIQUE, citation text, excerpt text, content text);"
      );
    });
  }

  getAllReport = async() => {
    db.transaction(tx => {
        tx.executeSql('SELECT * FROM offline_report', [], (tx, results) => {
          console.log('temp', results.rows.length);
          var reportData = [];
          for (let i = 0; i < results.rows.length; ++i) {
            reportData.push(results.rows.item(i));
          }
          this.setState({
            data: reportData,
            filterData: reportData,
          })
        }
        );
      },  
    );
  }

  removeOfflineReport = async(id) => {
    if(this.state.isActive === false) {
      await this.showNotification('error', 'Message', 'Please Subscribe to have Full Access');
      return await setTimeout(() => {
        this.props.navigation.navigate('ManageSubscription');
        console.log('okay  i will pay')
      }, 3000);    
    }
    else {
      db.transaction(tx => {
        tx.executeSql('DELETE FROM  offline_report where id=?', [id],
          (tx, results) => {
            console.log('Result', results.rowsAffected);
            if(results.rowsAffected > 0){
              Alert.alert(
                'Success', 'Report Deleted Successfully',
                [
                  {
                    text: 'OK',
                    onPress: () => {this.props.navigation.navigate('AllReports')},
                  },
                ],
                {cancelable: false}
              );
            }
            else{
              alert('Error', 'Try Again');
            }
          }
        )
      })
    }
  }

 
  
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
  showNotification = (type, title, message,) => {
    this.hideLoadingDialogue();
    return this.dropDownAlertRef.alertWithType(type, title, message);
  }
// Hide Dialog message
  handleCloseNotification = () => {
    return this.setState({
       showAlert : false,
     })
  }

  allReadLater = async() =>{
    const {token} = this.state;
    this.showLoadingDialogue();
    await getRouteToken(GetReadLaterEndpoint, token)
      .then((res) => {
        if (typeof res.message !== 'undefined') {  
          return this.showNotification('error', 'Message', res.message);
        }   
        else {    
          if(res.data.length){
           return this.setState({
              data: res.data,
              filterData: res.data,
              id: res.data.id,
              showLoading: false
            });
          }
          this.showNotification('error', 'Message', 'No Record Found');
          
        }
      }
    );
  }
  //Call AllReadLater function
  handleGetReadLater = async() => {
    this.showLoadingDialogue();
    try {
      await this.allReadLater()
    }
    catch(error) {
      return this.showNotification('error', 'Message', error.toString());
    }
  }
  // search filter 
  searchFilterFunction = text => {
    const {filterData} = this.state;
    this.setState({
      value: text,
    });
    const newData = filterData.filter(item => {
      const itemData = `${item.title} ${item.citation}${item.content}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    return this.setState({
      data: newData,
    });
  }

  deleteReadLater=async(id)=> {
    if(this.state.isActive === false) {
      await this.showNotification('error', 'Message', 'Please Subscribe to have Full Access');
      return await setTimeout(() => {
        this.props.navigation.navigate('ManageSubscription');
      }, 3000);    
    }
    else {
      const { token, data } = this.state
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
          let newData = data.filter(item => item.id !==  id);
          this.setState({data:newData});
          return this.showNotification('success', 'Success', 'Report Removal Successful');
        }
        return await this.showNotification('error', 'Message', 'Failed to Remove Report');
      } 
      catch(error){
        return this.showNotification('error', 'Message', error.toString());
      }
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
  if(this.state.isActive === false) {
    await this.showNotification('error', 'Message', 'Please Subscribe to have Full Access');
    return await setTimeout(() => {
      this.props.navigation.navigate('ManageSubscription');
    }, 3000);    
  }
  else {
    this.props.navigation.navigate('ReadSavedReport', {
      id: item.id, 
    });
  }
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
              text = {item.report_title}
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
              text = {item.excerpt}
              onPress = {()=>this.handleFullReport(item)}
              styles = {StyleSheet.flatten(styles.reportInfo)}
              />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress = {()=>this.removeOfflineReport(item.id)}
          style = {styles.deleteBtn}>
          {/* <DisplayText
            text = {'Remove'}
            onPress = {()=>this.deleteReadLater(item.id)}
            styles = {StyleSheet.flatten(styles.deleteTxt)}
          /> */}
          <DisplayText
            text = {'Remove'}
            onPress = {()=>this.removeOfflineReport(item.id)}
            styles = {StyleSheet.flatten(styles.deleteTxt)}
          />
        </TouchableOpacity>
        </View>
      </View>
    );
  }

  render () {
    const {showLoading } = this.state

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
       {/* Tab button navbar for favorite and Offline Reports */}
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
              text={'Offline Reports'}
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
            extraData={this.state} 
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
