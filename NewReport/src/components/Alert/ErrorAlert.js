'use strict';
import React, {Component} from 'react';
import {Platform, StyleSheet, View, Text, Image,Modal, TouchableOpacity} from 'react-native';
import colors from '../../assets/colors';
import PropTypes from 'prop-types';
import theme from '../../assets/theme';

export default class ErrorAlert extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
    this.closeNotification = this.closeNotification.bind(this);
  }

  closeNotification = () => {
    return this.props.handleCloseNotification();  
  }
  render() {
    const {title, message, visible, positiveButton} = this.props;
    const posButton = positiveButton || 'Cancel';
    return (
      <View>
       <Modal
        visible={visible}
        transparent={true}
        animationType={"fade"}
        onRequestClose={this.closeNotification} >

        <View style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>

          <View style={styles.Alert_Main_View}>
            <Text style={styles.Alert_Title}>
               {title}
            </Text>
            <Image
              source={require('../../assets/images/sad.png')}
              style={StyleSheet.flatten(styles.logoIcon)}/> 
              <Text style={styles.Alert_Message}>
                {message} 
              </Text>
              <View style={{flexDirection: 'row', position : 'absolute', bottom : 0}}>
                <TouchableOpacity 
                  style={styles.buttonStyle}
                  onPress={this.closeNotification } 
                  activeOpacity={0.2}>
                  <TouchableOpacity onPress={this.closeNotification }>
                    <Text 
                      style={styles.TextStyle}>
                      {posButton}
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
             </View> 
            </View>
          </View>
        </Modal>
      </View>      
    )
  }
}


ErrorAlert.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  MainContainer :{ 
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: (Platform.OS == 'ios') ? 20 : 0,    
   },
   Alert_Main_View:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor : colors.white, 
    // height: 220,
    width: '80%',
    borderRadius: 8,
    elevation : 4,
    shadowColor : theme.primaryTextColor,
    shadowOffset : {height : 2, width : 0},
    shadowOpacity: 0.25,
    shadowRadius:  2.25,
    
   },
    
   Alert_Title:{  
    fontSize: theme.MediumFont, 
    color: colors.red,
    fontFamily: theme.semiBoldFont,
    textAlign: 'center',
   },
   Alert_Message:{
    fontSize: theme.SmallFont, 
    color: colors.red,
    textAlign: 'center',
    fontFamily : theme.subHeaderFont,
    marginBottom : 60,
  },
   buttonStyle: {  
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.errorRed,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
   },
   TextStyle:{
    color: theme.colorAccent,
    textAlign:'center',
    fontSize: 18,
    fontFamily: theme.secondaryFont,
   },
   logoIcon : {
      height : 80,
      width : 80,
      resizeMode : 'contain'
  },
});