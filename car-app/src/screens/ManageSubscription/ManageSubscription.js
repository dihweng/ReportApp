'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, FlatList, TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, SubmitButton, SingleButtonAlert } from '../../components';
import { getUserDatials } from '../Utils/Utils';
import styles from './styles';
import colors from '../../assets/colors';


export default class ManageSubscription extends Component {
  constructor(props) {
    super(props);
    this.state ={
      data : [],
      
    }
  }
  subscription = [
    {    
      "_id": "5d1c92249b0b080017036e53",
      "reportName": "Online Payment-2Months",
      "date" : "19/06/2019",
      "name": "Tunde Anwo",
      "expires" : "19/07/2019",
      "amount" : "350",
      "Status" : "Active"
    },
    {    
      "_id": "5d1c90249b0b080017036e53",
      "reportName": "Online Payment-2Months",
      "date" : "19/05/2018",
      "name": "Tunde Anwo",
      "expires" : "19/07/2018",
      "amount" : "350",
      "Status" : "Expire"
    },
    {    
      "_id": "541c92249b0b080017036e53",
      "reportName": "Online Payment-2Months",
      "date" : "19/06/2016",
      "name": "Tunde Anwo",
      "expires" : "19/07/2016",
      "amount" : "350.12",
      "Status" : "Expire"
    },
    {    
      "_id": "5d1cn2249b0b080017036e53",
      "reportName": "Online Payment-2Months",
      "date" : "19/06/2016",
      "name": "Tunde Anwo",
      "expires" : "19/07/2016",
      "amount" : "350.23",
      "Status" : "Expire"
    },
    {    
      "_id": "5d1c92g49b0b080017036e53",
      "reportName": "Online Payment-2Months",
      "date" : "19/06/2016",
      "name": "Tunde Anwo",
      "expires" : "19/07/2016",
      "amount" : "350.12",
      "Status" : "Expire"
    },
    {    
      "_id": "5d1c92249b0b082017036e53",
      "reportName": "Online Payment-2Months",
      "date" : "19/06/2016",
      "name": "Tunde Anwo",
      "expires" : "19/07/2016",
      "amount" : "350.12",
      "Status" : "Expire"
    },
    {    
      "_id": "5d1c92249b0b0800170g6e53",
      "reportName": "Online Payment-2Months",
      "date" : "19/06/2016",
      "name": "Tunde Anwo",
      "expires" : "19/07/2016",
      "amount" : "350",
      "Status" : "Expire"
    },
    {    
      "_id": "5d1c92249b0b080317036e53",
      "reportName": "Online Payment-2Months",
      "date" : "19/06/2016",
      "name": "Tunde Anwo",
      "expires" : "19/07/2016",
      "amount" : "350",
      "Status" : "Expire"
    },
    {    
      "_id": "5d1c92249b0b083017036e53",
      "reportName": "Online Payment-2Monthz",
      "date" : "19/06/2016",
      "name": "Tunde Anwo",
      "expires" : "19/07/2016",
      "amount" : "350",
      "Status" : "Expire"
    },
 
];
  
// componentWillMount(){
//   // logout();
//   this.setState({
//     data:this.reports
//   });
// }
async componentDidMount(){
  this.setState({
    data:this.subscription
  });
    // let userDetails = await getUserDatials();

    // let bank = userDetails.data.bank_name;
    // this.setState({
    //   bankName: bank,
    // });
  }
  renderRow = ({item}) => {
    return (
      <View style = {styles.listViewItem}>    
        <TouchableOpacity 
          onPress = {()=>this.handlePeopleMain(item)}
          style = {styles.cardView}>
          <View style ={styles.subView}>
            <DisplayText
              numberOfLines = { 2 } 
              ellipsizeMode = 'middle'
              text = {item.reportName.toUpperCase()}
              styles = {StyleSheet.flatten(styles.subName)}
            />
            <DisplayText
              text = {item.date}
              styles = {StyleSheet.flatten(styles.subDate)}
            />

          </View>
          <View style = {styles.subView}>
            <DisplayText
                text = {item.name}
                styles = {StyleSheet.flatten(styles.subscriberName)}
              />
            <DisplayText
              text = {item.amount}
              styles = {StyleSheet.flatten(styles.amount)}
            />
          </View>
          <View style = {styles.subView}>
            <DisplayText
                text = {"Expires-" + item.expires}
                styles = {StyleSheet.flatten(styles.expireTxt)}
              />
            
            {
              (item.Status === 'Active') ?
                <DisplayText
                  text = {item.Status.toUpperCase()}
                  styles = {StyleSheet.flatten(styles.statusTxtActive)}
                />
              :
                <DisplayText
                  text = {item.Status.toUpperCase()}
                  styles = {StyleSheet.flatten(styles.statusTxtExpire)}
                />
            }
          </View>
        </TouchableOpacity>
      </View>
    );
  }



  handleSubscription = () => {
    // return alert('are you okay? you already @ Subscription')
    return this.props.navigation.navigate('ManageSubscription');
  }
  handleViewPlan = () => {
    return this.props.navigation.navigate('ViewPlan');
  }
  handleSubscribe = () => {
    return this.props.navigation.navigate('Subscribe');
  }

  
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigation.toggleDrawer();
  };

 
  render () {
   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar barStyle="default" /> 
      <View style = {styles.navBar}>
        <TouchableOpacity
          onPress={this.toggleDrawer.bind(this)} 
          style = {styles.headerImage}>
          <Image
            onPress={this.toggleDrawer.bind(this)} 
            source = {require('../../assets/images/menu.png')}
            style = {StyleSheet.flatten(styles.headerIcon)}
          />
        </TouchableOpacity>
        <View style = {styles.nameView}>
          <DisplayText
            text={'Manage Account'}
            styles = {StyleSheet.flatten(styles.txtHeader)}
          />
        </View>
      </View> 
      <View style = {styles.cards}>
        <TouchableOpacity
          onPress = {this.handleSubscription}  
          style = {styles.customTabTp}>
            <DisplayText
            text={'Subscription'}
            onPress = {this.handleSubscription}  
            styles = {StyleSheet.flatten(styles.txtTabHeader)}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress = {this.handleViewPlan}  
          style = {styles.customTabTp2}>
            <DisplayText
            text={'View Plan'}
            onPress = {this.handleViewPlan}  
            styles = {StyleSheet.flatten(styles.txtTabHeader)}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style = {styles.customTabTp2}>
            <DisplayText
            text={'Subscribe'}
            styles = {StyleSheet.flatten(styles.txtTabHeader)}
          />
        </TouchableOpacity>
      </View>
      <View style = { styles.subscribtionView}>
        <View style = {styles.devices}>

        </View>
        <View style = {styles.FlatListView}>
          <FlatList          
            data={this.state.data}          
            renderItem={this.renderRow}          
            keyExtractor={ data=> data._id}   
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
    )
  }
} 
