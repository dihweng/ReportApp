'use strict';
import React, {Component} from 'react';
import { View, FlatList,ScrollView, LayoutAnimation, Platform, UIManager, SafeAreaView, TouchableOpacity,StatusBar, Image, Text, StyleSheet,} from 'react-native';
import {DisplayText, CustomToast,SubmitButton} from '../../components';
import styles from './styles';
import { ProgressDialog } from 'react-native-simple-dialogs';
import filter from 'lodash.filter';

import { 
  DeleteFavoriteEndpoint, 
  DeleteReadLaterEndpoint, 
  getRouteToken, 
  getAllReport, 
  getProfile, 
  AddReadLaterEndPoint, 
  AddFavoriteEndPoint 
} from '../Utils/Utils';


export default class Citation extends Component {
  constructor(props) {
    super(props);
    this.state ={
      data : [],
      showAlert : false,
      showLoading: false,
      message : '',
      title: '',
      refreshing: false,
      expanded: false,
      expandalph : false,
      token: '',
      filterData: [],
      secondFilter: [],
      numberCitatio: '',
      alphabetCitation: '',
    }
  }
  async componentDidMount(){
    (Platform.OS === 'android') ? UIManager.setLayoutAnimationEnabledExperimental(true) : null
    
    let profile = await getProfile();
    this.setState({
      token : profile.access_token,
      expires : profile.expires,
      showLoading:true,
      // data:this.reports
    });
    await this.handleGetAllReport();
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

 //filter citation numberts
  handleCitationPress = (citation) => {
    const {filterData} = this.state;
    const newData = filterData.filter(item => {
      const itemData = `${item.citation.toUpperCase()}`;
      const textData = citation;

      return itemData.indexOf(textData) > -1;
    });
    return this.setState({
      data: newData,
      secondFilter: newData,
    });
  }
  // Filter by citation alphabets
  handleCitationAlph = (citationAlph) => {
    
    const {filterData, secondFilter} = this.state;
    if(secondFilter.length > 0 ){
      const newData = secondFilter.filter(item => {
        const itemData = `${item.citation.toUpperCase()}`;
        const textData = citationAlph;
  
        return itemData.indexOf(textData) > -1;
      });
      return this.setState({
        data: newData,
      });  
    }
    handleFullReport=async(item)=>{
      this.props.navigation.navigate('FullReport', {
        id: item.id, 
      });
    }
    const newData = filterData.filter(item => {
      const itemData = `${item.citation.toUpperCase()}`;
      const textData = citationAlph;

      return itemData.indexOf(textData) > -1;
    });
    return this.setState({
      data: newData,
    });
  }
  allReport = async() => {
    const {token} = this.state;
    this.showLoadingDialogue();
    await getRouteToken(getAllReport, token)
      .then((res) => {
        if (typeof res.message !== 'undefined') {  
          return this.showNotification(res.message);
        }   
        else {          

          this.setState({
            data: res.data,
            filterData: res.data,
          });
          return this.hideLoadingDialogue();
        }
      }
    );
  }

  handleGetAllReport = async() => {
    this.showLoadingDialogue();

    try {
      await this.allReport()
    }
    catch(error) {
      this.showNotification(error.toString(), 'Message');
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

  renderRow = ({item, index}) => {
    let read_later_button_text = item.is_future_saved == true ? 'Remove Read' : 'Read Later';
    let favorite_button_text = item.is_favorite == true ? 'Remove Favorite' : 'Add Favorite';
    return (
       <View style = {styles.listViewItem}>    
        <TouchableOpacity 
          onPress = {()=>this.handleFullReport(item)}
          style = {styles.cardView}>
          <View style ={styles.reportHeader}>
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
              numberOfLines = { 2 } 
              // ellipsizeMode = 'middle'
              text = {''}
              onPress = {()=>this.handleFullReport(item)}
              styles = {StyleSheet.flatten(styles.headerText)}
            /> 

             <DisplayText
              numberOfLines = { 4 } 
              ellipsizeMode = 'middle'
              text = {'Little Description needed'}
              onPress = {()=>this.handleFullReport(item)}
              styles = {StyleSheet.flatten(styles.reportInfo)}
            />

            {/* <HTML html={item.excerpt} /> */}

          <View style = {styles.txtView}>
           
            <View style={styles.buttonView}>
              <SubmitButton
                title={favorite_button_text}
                onPress={()=>this.addDeleteFavorite(item.id, favorite_button_text, index)}
                titleStyle={styles.btnText}
                btnStyle = {styles.btnStyle}
              />
              <SubmitButton
                title={read_later_button_text}
                onPress={()=>this.addDeleteReadlater(item.id, read_later_button_text, index)}
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
    const {
      showLoading, 
      title, 
      message, 
      showAlert, } = this.state;

    var citationsAlph = ['A','B','C','D','E','F','G','H','I','J','K','L', 'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    var citations = ['1', '2', '3', '4', '6','7', '8', '9'];
    var citationList = citations.map((citation, index) => {
      return <TouchableOpacity 
                key = {index}
                style = {styles.citisionTp}
                onPress={()=>this.handleCitationPress(citation)}>
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
                onPress={()=>this.handleCitationAlph(citationAlph)}>
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
      <ScrollView>
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
              text = {'CITATION 1 - 9'}
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
                  text = {'CITATION A - Z'}
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
        {/* <SubmitButton
          title={'Apply'}
          onPress={this.handleApply}
          titleStyle={styles.btnText}
          btnStyle = {styles.btnStyle}/> */}

        </View>
        <View style = {styles.viewBody}>
          <FlatList          
            data={this.state.data}          
            renderItem={this.renderRow}          
            // ListHeaderComponent={this.renderHeader}     
            keyExtractor={ data=> data.id.toString()}   
            showsVerticalScrollIndicator={false}
          />
          <View style = {styles.taostView}>
            <CustomToast ref = "defaultToastBottom" backgroundColor='#4CAF50' position = "bottom"/>          
          </View> 
        </View>  
        </ScrollView>
          <ProgressDialog
            visible={showLoading}
            title="Processing"
            message="Please wait..."
          />
      </SafeAreaView>
      )
    }
  } 