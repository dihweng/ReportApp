'use strict';
import React, {Component} from 'react';
import { View, FlatList, SafeAreaView, StatusBar, TouchableOpacity, Dimensions, StyleSheet,} from 'react-native';
import {DisplayText, SubmitButton, SingleButtonAlert} from '../../components';
import styles from './styles';
import theme from '../../assets/theme';
import { getRoute, getRouteToken, getAllReport, getProfile, ProfileEndpoint, saveUserDetail, AddReadLaterEndPoint, AddFavoriteEndPoint } from '../Utils/Utils';
import { ProgressDialog } from 'react-native-simple-dialogs';
import HTML from 'react-native-render-html';

export default class AllReports extends Component {
  constructor(props) {
    super(props);
    this.state ={
      data: '',
      token: '',
      showAlert: false,
      message: '',
      showLoading: false,
      title: '',
    }
  }

  reports = [
  //   {    
  //     "_id": "5d1c92249b0b080017036e53",
  //     "reportName": "Alh. Abubakar V Mr Prakash",
  //     "Citation": "Citation (2018) Electronic - court of appeal",
  //     "name": "Tunde Anwo",
  //     "Reports": "Report(E-C.A.R) - 516",
  //     "short_details": "Love life  If you have been developing Aug 18, 2018 - If you have been developing mobile people have thought about and already!!",
  //     "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/MTN_Logo.svg/1200px-MTN_Logo.svg.png",

  // },
  // {
  //   "_id": "5d1c92249b0b080017036e59",
  //   "reportName": "Chief Chukwuka V Mallam Sanni ",
  //   "Citation": "Citation (2018) Electronic - court of appeal",
  //     "name": "Tunde Anwo",
  //     "Reports": "Report(E-C.A.R) - 516",
  //     "short_details": "Love life  If you have been developing Aug 18, 2018 - If you have been developing mobile people have thought about and already!!",
  //     "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/MTN_Logo.svg/1200px-MTN_Logo.svg.png",

  // },
  // {
  //   "_id": "5d1c92249b0b080017036e93",
  //   "reportName": "Dr Edima SamSon V Mr Dihweng Che",
  //   "Citation": "Citation (2018) Electronic - court of appeal",
  //   "name": "Tunde Anwo",
  //   "Reports": "Report(E-C.A.R) - 516",
  //   "short_details": "Love life  If you have been developing Aug 18, 2018 - If you have been developing mobile people have thought about and already!!",
  //   "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/MTN_Logo.svg/1200px-MTN_Logo.svg.png",

  // },
  // {
  //   "_id": "5d1c92249b0b080017037e53",
  //   "reportName": "Alh. Abubakar V Mr Prakash",
  //   "Citation": "Citation (2018) Electronic - court of appeal",
  //   "name": "Tunde Anwo",
  //   "Reports": "Report(E-C.A.R) - 516",
  //   "short_details": "Love life  If you have been developing Aug 18, 2018 - If you have been developing mobile people have thought about and already!!",
  //   "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/MTN_Logo.svg/1200px-MTN_Logo.svg.png",

  // },
  // {
  //   "_id": "5d1c92249b0b080017636e53",
  //   "reportName": "Mrs Johnson V Miss Mary",
  //   "Citation": "Citation (2018) Electronic - court of appeal",
  //   "name": "Tunde Anwo",
  //   "Reports": "Report(E-C.A.R) - 516",
  //   "short_details": "Love life  If you have been developing Aug 18, 2018 - If you have been developing mobile people have thought about and already!!",
  //   "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/MTN_Logo.svg/1200px-MTN_Logo.svg.png",

  // },
  // {
  //   "_id": "5d1c92249b0b080017236e53",
  //   "reportName": "Alh. Abubakar V Mr Prakash",
  //   "Citation": "Citation (2018) Electronic - court of appeal",
  //   "name": "Tunde Anwo",
  //   "Reports": "Report(E-C.A.R) - 516",
  //   "short_details": "Love life  If you have been developing Aug 18, 2018 - If you have been developing mobile people have thought about and already!!",
  //   "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/MTN_Logo.svg/1200px-MTN_Logo.svg.png",

  // },
  // {
  //   "_id": "5d1c92249b0b08001703me53",
  //   "reportName": "Alh. Abubakar V Mr Prakash",
  //   "Citation": "Citation (2018) Electronic - court of appeal",
  //   "name": "Tunde Anwo",
  //   "Reports": "Report(E-C.A.R) - 516",
  //   "short_details": "Love life  If you have been developing Aug 18, 2018 - If you have been developing mobile people have thought about and already!!",
  //   "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/MTN_Logo.svg/1200px-MTN_Logo.svg.png",

  // },
  // {
  //   "_id": "5d1c92249b0b080017036e23",
  //   "reportName": "Alh. Abubakar V Mr Prakash",
  //   "Citation": "Citation (2018) Electronic - court of appeal",
  //   "name": "Tunde Anwo",
  //   "Reports": "Report(E-C.A.R) - 516",
  //   "short_details": "Love life  If you have been developing Aug 18, 2018 - If you have been developing mobile people have thought about and already!!",
  //   "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/MTN_Logo.svg/1200px-MTN_Logo.svg.png",

  // },
  // {
  //   "_id": "5d1c92249b0b08001707a6e53",
  //   "reportName": "Alh. Abubakar V Mr Prakash",
  //   "Citation": "Citation (2018) Electronic - court of appeal",
  //   "name": "Tunde Anwo",
  //   "Reports": "(E-C.A.R) - 516",
  //   "short_details": "Love life  If you have been developing Aug 18, 2018 - If you have been developing mobile people have thought about and already!!",
  //   "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/MTN_Logo.svg/1200px-MTN_Logo.svg.png",

  // },
];

  async componentDidMount(){
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

  AllReport = async() =>{
    this.showLoadingDialogue();
    await getRoute(getAllReport)
      .then((res) => {
        if (typeof res.message !== 'undefined') {  
          return this.showNotification(res.message);
        }   
        else {          
          // console.log({resSSs:res.data});
          this.setState({
            data: res.data,
          });
          return this.handleGetProfile();
        }
      }
    );
  }

  handleGetAllReport = async() => {
    this.showLoadingDialogue();

    try {
      await this.AllReport()
    }
    catch(e) {
      console.log({e})
    }
  }
  handleGetProfile = async() => {
    const{token} = this.state;
    this.showLoadingDialogue();

    await getRouteToken(ProfileEndpoint, token)
      .then((res) => {

        if (typeof res.message !== 'undefined') {  
          return this.showNotification(res.message);
        }
        // else if( !res.data.email_verified_at ) {
        //   let message = 'Check your email to verify account';
        //   this.showNotification(message);
        //   this.hideLoadingDialogue();
        // }
        else {
          this.hideLoadingDialogue();
          return saveUserDetail(res.data, token);
        }
      })
    .catch((error) => {
      return this.showNotification(error.toString());
    });
  }

  handleFullReport(item){
    return this.props.navigation.navigate('FullReport');
  }
  

  addFavorite = async(id) =>{
    const {token} = this.state;
    this.showLoadingDialogue();
    let endpoint = `${AddFavoriteEndPoint}${id}/favorite`;

    console.log({request_token : token, endpointsssss: endpoint});
    fetch(endpoint, {
      method : "POST",
      body : JSON.stringify(''),
      headers : {
        "Accept" : "application/json",
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then((res) => {
      if (typeof res.message !== 'undefined' && status >= 400 ) {
        let message = 'Report Could Not be Added to Favorite'
        this.showNotification(message);
      }
      else {
        console.log({success : res});
        this.hideLoadingDialogue()
        return this.props.navigation.navigate('FavoriteList')
      }
    })
  } 
  // Called onPress to add favorite to list of favorite 
  handleAddFavourite = async(id) =>{
      
    this.showLoadingDialogue();
    try {
      await this.addFavorite(id)
    }
    catch(e) {
      console.log({e})
    }
  }

  readLater = async(id) =>{
    const {token} = this.state;
    this.showLoadingDialogue();
    let endpoint = `${AddReadLaterEndPoint}${id}/future`;

    console.log({request_token : token, endpointsssss: endpoint});
    fetch(endpoint, {
      method : "POST",
      body : JSON.stringify(''),
      headers : {
        "Accept" : "application/json",
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then((res) => {
      if (typeof res.message !== 'undefined' ) {
        this.showNotification(res.message);
      }
      else {
        console.log({success : res});
        this.hideLoadingDialogue()
        return this.props.navigation.navigate('ReadLaterList')
      }
    })
  } 
  handleReadLater = async(id) =>{
      
    this.showLoadingDialogue();
    try {
      await this.readLater(id)
    }
    catch(e) {
      console.log({e})
    }
  }

  renderHeader = () => {
    return <View style={styles.headerMessageView}>
        <View style = {styles.FlatListHeader}>
          <DisplayText
            text={'PLATEAU YOUTH COUCIL'}
            styles = {StyleSheet.flatten(styles.aircraftListTxt)}
          /> 
          {/* <Image
            resizeMode= 'contain'
            style = {styles.messageLogo}
            source={require('../../assets/images/icon.png')}
            /> */}
        </View>
      </View>
  
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
              text = {item.title}
              onPress = {()=>this.handleFullReport(item)}
              styles = {StyleSheet.flatten(styles.reportName)}
            />

          <View style = {styles.txtView}>
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

            <View style={styles.buttonView}>
              <SubmitButton
                title={'Add Favourite'}
                onPress={()=>this.handleAddFavourite(item.id)}
                titleStyle={styles.btnText}
                btnStyle = {styles.btnStyle}
              />
              <SubmitButton
                title={'Read Later'}
                onPress={()=>this.handleReadLater(item.id)}
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
   return(
    <SafeAreaView style={styles.container}> 
       <StatusBar barStyle="default"/>
       
       <View style = {styles.viewBody}>
        <FlatList          
          data={this.state.data}          
          renderItem={this.renderRow}          
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
