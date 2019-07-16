import { StyleSheet, Dimensions, Platform } from 'react-native';
const window = Dimensions.get('window');
import { Constants } from 'expo';
export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width /7;
import colors from '../../assets/colors';
import theme from '../../assets/theme';

export default styles = StyleSheet.create({
  container: {
    flex : 1,
    paddingTop : Constants.statusBarHeight,
    paddingBottom : 10, 
    alignItems : 'center',
    backgroundColor : theme.primaryColor
  },

  
  buttonWrapper: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    justifyContent: 'flex-end',
    //backgroundColor:'green',
    width:'100%'
  },

  logoWrapper: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    alignContent:'center',
    justifyContent: 'center',
  },

  signupLinkView: {
    justifyContent: 'center',
    alignItems : 'center',
    flexDirection: 'row',
    height : 35,
    marginTop : 10,
    // paddingBottom : 8
  },
  signupText: {
    fontSize: theme.MediumFont,
    color: theme.colorAccent,
    fontFamily: theme.LightRoboto,
    alignSelf: 'center',
  },
  forgetPwd: {
    fontSize: theme.MediumFont,
    color: theme.colorAccent,
    marginTop: 30,
    fontFamily: theme.LightRoboto,
    alignSelf: 'center',
  },

  createAccount : {
    fontSize: theme.MediumFont,
    color: theme.colorAccent,
    fontFamily: theme.headerFont,
    alignSelf: 'center',
  },

  logo: {
    height: IMAGE_HEIGHT,
    resizeMode: 'contain',
    alignSelf: 'center',

  },
  btnView : {
    width : '100%',
    justifyContent : 'center',
    alignItems : 'center',
  },
  loginBtn : {
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    height: 40,
    backgroundColor: colors.dardgold,
    borderRadius : 25,    
  },
  buttonBorder: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
    height: 40,
    backgroundColor: colors.white,
    borderRadius : 25,
  },
  btnStyle : {
    backgroundColor : colors.orange,
    width : '50%',
    justifyContent: 'center',
    alignItems : 'center',
    height : 40,
    borderRadius : 30,
    marginTop: 16,

  },
  btnText : {
    fontSize: 18,
    color: colors.white,
    fontFamily: 'Roboto-Regular',
    alignSelf: 'center',    
  },
  wrapper: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 44,
    paddingTop: 8,
    paddingBottom : 8,
    justifyContent: 'center',
    alignItems : 'center',
    width : '90%',
    // backgroundColor: colors.green_background
  },
  logoIcon : {
    height : 90,
    width : 80,
  },
  logoIcon2: {
    height : 90,
    width : 80,
    resizeMode : 'contain',
    // tintColor : colors.white
    // marginBottom : 50
  },
  logoText : {
    fontFamily : theme.headerFont,
    fontSize : theme.LargeFont,
    color : theme.colorAccent,
  },
  logoView : {
    marginTop: 40, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  logoTextView :{
    justifyContent: 'center',
    alignItems : 'center',
    marginTop : 16,
    width : '100%'
  },
  inputImageView : {
    backgroundColor : theme.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    height : '100%',
    width : 40,
    borderTopLeftRadius : 4,
    borderBottomLeftRadius : 4,
  },

  formView : {
    flexDirection : 'row',
    width : '100%',
    justifyContent: 'center',
    alignItems : 'center',
    backgroundColor : theme.colorAccent,
    marginTop : 4,
  },

  textInputView : {
    width : '100%',
    height : 45,
    backgroundColor : colors.white,
    borderRadius : 4,
    flexDirection : 'row',
    alignItems : 'center',
    marginTop : 8,
    // paddingLeft : 8,
    borderWidth : 1,
    borderColor : theme.secondaryTextColor,
  },
  splashView : {
    flex : 1,
    justifyContent: 'center', 
    alignItems :'center', 
    // backgroundColor: colors.green_background
  },
  iconForm: {
    height : 18,
    width : 18,
    resizeMode : 'contain',
    tintColor : theme.colorAccent,
  },
});