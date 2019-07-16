'use strict';

import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import colors from '../../assets/colors';
import {TouchableHighlight, StyleSheet, Text} from 'react-native';


export default class SubmitButton extends Component {

  constructor(props){
    super(props)
    this.state= {

    }
  }

  render(){
    const {
      disabled, 
      onPress, 
      title, 
      btnStyle, 
      titleStyle,
      marginBottom,
    } = this.props;
    const opacityStyle = disabled ? 0.5 : null;
    const style = btnStyle || styles.button;
    const titstyle = titleStyle || styles.title;
    
    return(
      <TouchableHighlight 
        style = {[{opacity: opacityStyle}, style]}
        disabled = {disabled}
        marginBottom = {marginBottom}
        onPress = {onPress}>
        <Text style = {titstyle}>
          {title}
        </Text>
      </TouchableHighlight>
    );
  }
}

SubmitButton.propTypes = {
  disabled: PropTypes.bool,
  onPress : PropTypes.func.isRequired,
  style : PropTypes.object,
  title : PropTypes.string.isRequired,
  marginBottom: PropTypes.number,

}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: 40,
    marginTop: 16,
    backgroundColor: colors.green_background,
    borderRadius : 30,
  },

  title: {
    fontFamily: 'Roboto-Regular',
    color: colors.white,
  },

  icon: {
    marginRight: -2,
    marginTop: -2,
  }
})