'use strict';

import React, { Component } from 'react';
import { Text, View, SafeAreaView, ScrollView, StyleSheet,StatusBar, TouchableOpacity, Image, TouchableHighlight, Keyboard } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import AutogrowInput from 'react-native-autogrow-input';
import colors from '../../assets/colors';
import styles from './styles';
import { ProgressDialog } from 'react-native-simple-dialogs';
import {DisplayText, SingleButtonAlert} from '../../components';
import { TicketMessageEndpoint, getUserDetails, GetAllMessageEndPoint, getRouteToken } from '../Utils/Utils'
import moment from 'moment';
import DropdownAlert from 'react-native-dropdownalert';


export default class Message extends Component {

  constructor(props) {
    super(props);

    // var loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac orci augue. Sed fringilla nec magna id hendrerit. Proin posuere, tortor ut dignissim consequat, ante nibh ultrices tellus, in facilisis nunc nibh rutrum nibh.';

    //create a set number of texts with random lengths. Also randomly put them on the right (user) or left (other person).
    // var numberOfMessages = 20;

    var messages = [];

    this.state = {
      messages: messages,
      inputBarText: '',
      id : '',
      userid : '',
      status : '',
      token : '',
      message : '',
      title : '',
      time : '',
      name : '',
      responseMessage : '',
      adminTime : '',
      status : '',
      showAlert : false,
      showLoading : false,
    }
  }


  //fun keyboard stuff- we use these to get the end of the ScrollView to "follow" the top of the InputBar as the keyboard rises and falls
  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));

    clearInterval(this.Clock);

  }



  componentWillUnmount() {
    this.mounted = false
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  //When the keyboard appears, this gets the ScrollView to move the end back "up" so the last message is visible with the keyboard up
  //Without this, whatever message is the keyboard's height from the bottom will look like the last message.
  keyboardDidShow (e) {
    this.scrollView.scrollToEnd();
  }

  //When the keyboard dissapears, this gets the ScrollView to move the last message back down.
  keyboardDidHide (e) {
    this.scrollView.scrollToEnd();
  }

  //scroll to bottom when first showing the view
  async componentDidMount() {
    
    this.mounted = true
    // this.Clock = setInterval( () => this.GetTime(), 1000 );

    let userDetails = await getUserDetails();

    const id = userDetails.data.id,
      name = userDetails.data.name,
      token = userDetails.token;
    this.setState({
      token :token,
      userid : id,
      name : name,
    });
    this.handleGetTicket();
    this.handleGetAllMessage();

    setTimeout(function() {
      this.scrollView.scrollToEnd();
    }.bind(this))
  }

  //this is a bit sloppy: this is to make sure it scrolls to the bottom when a message is added, but 
  //the component could update for other reasons, for which we wouldn't want it to scroll to the bottom.
  componentDidUpdate() {
    
    setTimeout(function() {
      this.scrollView.scrollToEnd();
    }.bind(this))
  }

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

  showNotification = (type, title, message,) => {
    this.hideLoadingDialogue();
    return this.dropDownAlertRef.alertWithType(type, title, message);
  }

  _sendMessage() {
    const {messages, id, inputBarText, token} = this.state;
    messages.push({direction: "right", text: inputBarText});
    let inputMessage = inputBarText.toString();
    this.setState({
      messages : this.state.messages,
      inputBarText : ''
    });
    let endPoint = `${TicketMessageEndpoint}${id}/${"messages"}`;

    let data = {
      'body' : inputMessage, 
    };
    fetch(endPoint, {
      method : "POST",
      body : JSON.stringify(data),
      headers : {
        "Accept" : "application/json",
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,

      }
    })
    .then((res) => {
      if (typeof res.message !== 'undefined' ) {
        return this.showNotification('error', 'Message', res.message);
      }
      else {
        return  this.hideLoadingDialogue();
      }
    }).catch(error=>this.showNotification('error', 'Message', error.toString()))

 
  }

  handleGetAllMessage = async() => {
    const{token, id} = this.state;
    this.setState({
      showLoading: true
    });
    let endPoint = `${GetAllMessageEndPoint}/${id}/${"messages"}`;
      await getRouteToken(endPoint, token)
      .then((res) => {
        if (typeof res.message !== 'undefined') { 
          return this.showNotification('error', 'Message', res.message);
        }
        else {
          const dataResponse = res.data.reverse();

          this.handleConvertData(dataResponse)
          this.setState({ 
            showLoading : false,
            responseMessage : dataResponse,
          });  
        }
      })
      .catch((error) => {
       return this.showNotification('error', 'Message', error.toString());
    });
  };
  handleConvertData = (dataResponse) => {
    const {userid, messages, name} = this.state;
    
    dataResponse.forEach((data) => { 
      const message = data.body,
      time = data.created_at,
      newDate = moment(time).format("DD-MM-YYYY")
      if (data.user_id === this.state.userid) {
        let body = `${message}\n${newDate}\n${name}`
        return  messages.push({direction: "right", text: body});
      }
      else{
        let body = `${message}\n${newDate}\n${'Admin'}`
        return messages.push({direction: "left", text: body});
      }
      })
  }
  _onChangeInputBarText(text) {
    this.setState({
      inputBarText: text
    });
  }

  //This event fires way too often.
  //We need to move the last message up if the input bar expands due to the user's new message exceeding the height of the box.
  //We really only need to do anything when the height of the InputBar changes, but AutogrowInput can't tell us that.
  //The real solution here is probably a fork of AutogrowInput that can provide this information.
  _onInputSizeChange() {
    setTimeout(function() {
      this.scrollView.scrollToEnd({animated: false});
    }.bind(this))
  }
  //This is to navigate back to the supportdesk
  handleBackPress = () => {
    return this.props.navigation.navigate('SurpportDesk');
  }
  handleCloseNotification = () => {
    return this.setState({
      showAlert : false
    });
  }

  handleGetTicket = () => {
    const { navigation } = this.props,
    id =  navigation.getParam('id', 'NO-ID'),
    status = navigation.getParam('status', 'NO Status');

    this.setState ({
      id,
      status,
    });
  }


  render() {
    const {showLoading, time, status} = this.state;

    var messages = [];

    this.state.messages.forEach(function(message, index) {
      messages.push(
          <MessageBubble key={index} direction={message.direction} text={`${message.text} ${time}`}/>
        );
    });

    return (
      <SafeAreaView style={styles.outer}>
        <StatusBar barStyle="default" /> 
        <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />

        <View style = {styles.navBar}>
          <TouchableOpacity 
            onPress={this.handleBackPress} 
            style = {styles.headerImage}>
            <Image
              onPress={this.handleBackPress} 
              source = {require('../../assets/images/back.png')}
              style = {StyleSheet.flatten(styles.headerIcon)}
            />
          </TouchableOpacity>
          <View style = {styles.nameView}>
            <DisplayText
              text={'Chat Support Desk'}
              styles = {StyleSheet.flatten(styles.txtHeader)}
            />
          <View style={styles.issuesStatus}>
            <View style={{width:10,height:10,borderRadius:10,backgroundColor:colors.orange}}></View>
              
              {
                (typeof status === 'undefined' || typeof status === '') ?
                <DisplayText
                  text={'status'}
                  styles = {StyleSheet.flatten(styles.txtHeader)}
                /> :
                <DisplayText
                  text={status}
                  styles = {StyleSheet.flatten(styles.txtHeader)}
                />
              }
          </View>
          </View>
        </View>  
        {/* toolbar */}
        <ScrollView ref={(ref) => { this.scrollView = ref }} style={styles.messages}>
            {messages}
        </ScrollView>
        <InputBar onSendPressed={() => this._sendMessage()} 
          onSizeChange={() => this._onInputSizeChange()}
          onChangeText={(text) => this._onChangeInputBarText(text)}
          text={this.state.inputBarText}/>
        <KeyboardSpacer/>  
        <ProgressDialog
          visible={showLoading}
          title="Processing"
          message="Please wait..."/>  
             
      </SafeAreaView>
    );
  }
}

//The bubbles that appear on the left or the right for the messages.
class MessageBubble extends Component {
  render() {

    //These spacers make the message bubble stay to the left or the right, depending on who is speaking, even if the message is multiple lines.
    var leftSpacer = this.props.direction === 'left' ? null : <View style={{width: 140}}/>;
    var rightSpacer = this.props.direction === 'left' ? <View style={{width: 140}}/> : null;

    var bubbleStyles = this.props.direction === 'left' ? [styles.messageBubble, styles.messageBubbleLeft] : [styles.messageBubble, styles.messageBubbleRight];

    var bubbleTextStyle = this.props.direction === 'left' ? styles.messageBubbleTextLeft : styles.messageBubbleTextRight;

    return (
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            {leftSpacer}
            <View style={bubbleStyles}>
              <Text style={bubbleTextStyle}>
                {this.props.text}
              </Text>
            </View>
            {rightSpacer}
          </View>
      );
  }
}

//The bar at the bottom with a textbox and a send button.
class InputBar extends Component {

  //AutogrowInput doesn't change its size when the text is changed from the outside.
  //Thus, when text is reset to zero, we'll call it's reset function which will take it back to the original size.
  //Another possible solution here would be if InputBar kept the text as state and only reported it when the Send button
  //was pressed. Then, resetInputText() could be called when the Send button is pressed. However, this limits the ability
  //of the InputBar's text to be set from the outside.
  componentWillReceiveProps(nextProps) {
    if(nextProps.text === '') {
      this.autogrowInput.resetInputText();
    }
  }

  render() {
    return (
      <View style={styles.inputBar}>
        <AutogrowInput style={styles.textBox}
          ref={(ref) => { this.autogrowInput = ref }} 
          placeholder='Enter message here'
          multiline={true}
          defaultHeight={50}
          onChangeText={(text) => this.props.onChangeText(text)}
          onContentSizeChange={this.props.onSizeChange}
          value={this.props.text}/>
        <TouchableHighlight style={styles.sendButton} onPress={() => this.props.onSendPressed()}>
          {/* <Text style={{color: 'white'}}>Send</Text> */}
          <Image
            onPress={() => this.props.onSendPressed()}
            source = {require('../../assets/images/send_button.png')}
            style = {styles.sendIcon}
          />
        </TouchableHighlight>
      </View> 
    );
  }
}