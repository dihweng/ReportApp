'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image,TouchableOpacity, StyleSheet,} from 'react-native';
import styles from './styles';
import HTML from 'react-native-render-html';
import { ProgressDialog } from 'react-native-simple-dialogs';
import {DisplayText, SingleButtonAlert} from '../../components';
import { SQLite } from 'expo-sqlite';

const db = SQLite.openDatabase("offlinedb.db");

class ReadSavedReport extends Component {
	constructor(props) {
    super(props);
    this.state ={
      showAlert: false,
      message: '',
      showLoading: false,
      title: '',
      content: '',
      excerpt:'',
			id: '',
			reportData: '',
    }
	}
	async componentDidMount(){
    await this.setState({
      showLoading:true,
    });
    await this.handleGetReport();
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

  showNotification = (message, title) => {
    this.setState({ 
      showLoading : false,
      title : title,
      message : message,
      showAlert : true,
    }); 
  }

  handleCloseNotification = () => {
    return this.setState({
      showAlert : false,
    })
  }
  
  handleGetReport = async() => {
    const{navigation} = this.props;
    let reportId = await navigation.getParam('id');
    return await this.getReportById(reportId);
	}
	
  getReportById = async(reportId) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM offline_report where id = ?',
        [reportId],
        (tx, results) => {
          var len = results.rows.length;
          console.log('lenssssss', len);
          if (len > 0) {
            this.setState({
              reportData: results.rows.item(0),
              showLoading: false
            });
          } else {
            alert('Report not found');
            this.setState({
              reportData: '',
              showLoading: false,
            });
          }
        }
      );
    });
	};
	handleOnBackPress = () => {
    this.props.navigation.goBack();
  };
  
  render() {
    const { title, message, showAlert, showLoading, reportData } = this.state,
    content = reportData.content;

    return (
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
              text={'Offline Report'}
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
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
        </View>
        <ScrollView
          style={{flex:1, paddingHorizontal: 8}}
          showsVerticalScrollIndicator={false}>
          { content !== undefined ?  <HTML html={content} /> : null}
        </ScrollView>
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
    );
  }
}

export default ReadSavedReport;
