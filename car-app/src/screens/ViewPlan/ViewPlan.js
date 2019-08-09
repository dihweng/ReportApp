'use strict';
import React, {Component} from 'react';
import { View, FlatList, SafeAreaView, StatusBar, Image, TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, SingleButtonAlert, SubmitButton} from '../../components';
import { getRoute, PlanEndpoint } from '../Utils/Utils';
import styles from './styles';
import { ProgressDialog } from 'react-native-simple-dialogs';
import RadioGroup from 'react-native-radio-buttons-group';
import theme from '../../assets/theme';
import filter from 'lodash.filter';
import numeral from 'numeral';



export default class ViewPlan extends Component {
  constructor(props) {
    super(props);
    this.state ={
      showAlert: false,
      message: '',
      showLoading: false,
      title: '',  
      data: [], 
      planData: [],
      planType: '',
      plan : [
        {
          label: 'Individual',
          value: 'individual',
          selected: true,
          color: theme.primaryColor,
          disabled: false,
          size: 14
        },
        {
          label: 'Corporate',
          value: 'corporate',
          selected: false,
          color: theme.primaryColor,
          disabled: false,
          size: 14
        },
      ] 
    }
  }

  async componentDidMount(){
    this.setState({
      showLoading:true,
    });
    // await this.handleGetProfile();
    await this.handleGetAllPlan();
  }
  //Props to open/close the drawer
  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  };
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

  AllPlan = async() =>{
    this.showLoadingDialogue();
    await getRoute(PlanEndpoint)
      .then((res) => {
        if (typeof res.message !== 'undefined') {  
          return this.showNotification(res.message);
        }
        else if (res.data){
          this.hideLoadingDialogue();

          this.setState({
            planData: res.data
          });
          return this.planFilterFunction('individual');
        }   
      }
    );
  }
  handleGetAllPlan = async() => {
    this.showLoadingDialogue();
    try {
      await this.AllPlan()
    }
    catch(e) {
      console.log({e})
      this.hideLoadingDialogue();
    }
  }

  handleSubscription = () => {
    return this.props.navigation.navigate('ManageSubscription');
  }
  handleViewPlan = () => {
    return this.props.navigation.navigate('ViewPlan');
  }
  // handleSubscribe = () => {
  //   return this.props.navigation.navigate('Subscribe');
  // }

//Radio Button selection on press
  onCheckPlan = (plan) => {
    this.setState({ 
      plan,
    });
    this.radioStatePlan();
  }

  radioStatePlan = async() => {
    const { plan } = this.state;
    let selectedButtonPlan = plan.find(e => e.selected == true);
    selectedButtonPlan = selectedButtonPlan ? selectedButtonPlan.value : this.state.plan[0].label;

    if ( selectedButtonPlan === 'individual') {
      console.log({selected: selectedButtonPlan})

      await this.planFilterFunction(selectedButtonPlan);
    }
    else if ( selectedButtonPlan === 'corporate'){
      console.log({selected2: selectedButtonPlan})


      await this.planFilterFunction(selectedButtonPlan);

    }
  }
  planFilterFunction = async(plandtype) => {
    const { planData } = this.state;
    
    const newData = filter(planData, ['category',plandtype]);
    console.log({newdataPlan: newData });
    if(newData.length) {
      return await this.setState({
        data: newData,
        planType: plandtype,
      });
    }
    else {
      return await this.setState({
        showAlert : true,
        message: 'Sorry No Plan Found'
      });
    }
  }

  handleSelectPlan = async(item) => {
    const { planType } = this.state;

    return await this.props.navigation.navigate('Subscribe', {
      'amount': item.amount,
      'planType': planType,
      'name' : item.name,
    });
  }
  handleBack = () => {
    this.props.navigation.navigate('AllReports');
  };
  renderRow = ({item}) => {
    return (
      <View
        style = {styles.listViewItem}>    
        <View style = {styles.plandCard}>
          <DisplayText
            text={item.name}
            styles = {StyleSheet.flatten(styles.cardType)}
          />
          <View style = {styles.lineView}></View>
          <DisplayText
            text={`₦${numeral(item.amount).format('0,0.00').toString()}`}
            styles = {StyleSheet.flatten(styles.amount)}
          />
          <DisplayText
            text={`Enjoy Unlimited access to the entire\n Volumes of the Court of Appeal\n Reports(from(2015) till date) for one\n month for just ₦${numeral(item.amount).format('0,0').toString()}`}
            styles = {StyleSheet.flatten(styles.planDetails)}
          />
          <SubmitButton
            title={'Select Plan'} 
            onPress = {() => this.handleSelectPlan(item)}
            titleStyle={styles.btnText}
            btnStyle = {styles.btnStyle}
          />
        </View>
      </View>
    );
  }
 
  render () {
    const { showLoading, title, message, showAlert, plan } = this.state;
    let selectedButtonPlan = plan.find(e => e.selected == true);
    selectedButtonPlan = selectedButtonPlan ? selectedButtonPlan.value : this.state.plan[0].label;

   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar barStyle="default" /> 
      <View style = {styles.navBar}>
        <TouchableOpacity
            onPress={this.handleBack} 
            style = {styles.headerImage}>
          <Image
            onPress={this.handleBack} 
            source = {require('../../assets/images/back.png')}
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
          style = {styles.customTabTp2}>
            <DisplayText
            text={'Subscription'}
            onPress = {this.handleSubscription}  
            styles = {StyleSheet.flatten(styles.txtTabHeader)}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress = {this.handleViewPlan}  
          style = {styles.customTabTp}>
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
      <View style = {styles.subscribtionView}>
        <View style = {styles.subPlanView}>
          <DisplayText
            text={'Subscribtion Plan'}
            styles = {StyleSheet.flatten(styles.txtTabHeader)}
          />
          <View style = {styles.planCheckView}>
            <RadioGroup 
              radioButtons = {this.state.plan} 
              onPress = {this.onCheckPlan} 
              flexDirection = 'row'/>
          </View>
        </View>

        <View style = {styles.viewBody}>
          <FlatList          
            data={this.state.data}          
            renderItem={this.renderRow}          
            keyExtractor={ data=> data.id.toString()}   
            showsVerticalScrollIndicator={false}
          />
        </View>  
       
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
