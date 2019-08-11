'use strict';
import React, {Component} from 'react';
import { View, Text, ScrollView, SafeAreaView, StatusBar, Image,TouchableOpacity, StyleSheet,} from 'react-native';
import styles from './styles';
import theme from '../../assets/theme';
import HTML from 'react-native-render-html';
import { ProgressDialog } from 'react-native-simple-dialogs';
import {DisplayText, SingleButtonAlert} from '../../components';
import {connect} from 'react-redux';
import { getReport} from '../../redux/actions/ReportActions';


 class FullReport extends Component {
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
  
  handleGetReport = async() => {
    const{report, navigation} = this.props;
     location = navigation.getParam('location');
     this.props.getReport(location);
       console.log({report})
      return await this.setState({
        content: report.content,
        id:report.id,
        excerpt:report.excerpt
      });
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
const mapStateToProps = (state, ownProps) =>{
  return{
    report: state.ReportReducer.report
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    getReport: (location) =>{dispatch(getReport(location))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FullReport)
