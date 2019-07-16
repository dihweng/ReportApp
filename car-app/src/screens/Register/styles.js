import { StyleSheet, Dimensions, Platform } from 'react-native';
const window = Dimensions.get('window');
import Constants from 'expo-constants'
export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width /7;
import colors from '../../assets/colors';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    // paddingBottom: 10, 
    // paddingLeft: 10,
    // paddingRight: 10,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  welcomeText: {
    fontSize: 24,
    color: colors.green_background,
    fontFamily: 'Roboto-Regular',
    marginTop: 8,
    // letterSpacing: 2
  },
  wrapper: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    width : '100%',
  },
  headerView : {
    width : '100%',
    paddingLeft : 20
  },
  btnView : {
    width : '100%',
    justifyContent : 'center',
    alignItems : 'center',
  },
  formHeaderTxt: {
    fontSize: 16,
    color: colors.darkGray,
    fontFamily: 'Roboto-Light',
  },
  formPwdHint : {
    fontSize: 12,
    color: colors.darkGray,
    fontFamily: 'Roboto-Light',
  },
  formView: {
    flexDirection: 'column',
    width : '100%',
    marginTop : 15
    // paddingTop : 4
  },
  signupLinkView: {
    justifyContent: 'center',
    alignItems : 'center',
    flexDirection: 'row',
    paddingBottom : 16
  },
  footerView : {
    width : '100%',
    height : '15%',
    // backgroundColor : 
  },
  footerIcon : {
    position : 'absolute',
    width : '100%',
    // top : 10,
    resizeMode : 'cover'
    // right :10,
  },
  checkBox : {
    flex: 1, 
    padding: 10
  },
  checkBoxView : {
    flexDirection : 'row',
    justifyContent : 'space-around',
    // alignItems : 'center',
    paddingTop : 8,
  },
  phoneView : {
    flexDirection : 'row',
    width : '100%',
    height : 40,
    borderRadius : 4,
    borderWidth : 1,
    borderColor : colors.textInput_border,
    marginTop : 4,
    // justifyContent: 'center',
    alignItems : 'center',
    // backgroundColor : colors.green_background
  },
  flag : {
    borderWidth : 1,
    borderColor : colors.darkSilver,
    borderBottomLeftRadius : 4,
    borderTopLeftRadius : 4,
    justifyContent: 'center',
    alignItems : 'center',
    height : 40,
    width : 40,
    borderRightWidth : 0,
    marginTop : 7
    // marginLeft: 20,
  },
  flagIcon : {
    height : 16,
    width : 16,
    // marginTop : 16,
  },
  iconForm : {
    height : 16,
    width : 16,
    marginTop : 16,
    tintColor : colors.green_background,
    marginRight: 12,
  },
  createAccount : {
    fontSize: 16,
    color: colors.darkGray,
    marginTop: 15,
    fontFamily: 'Roboto-Black',
    alignSelf: 'center',
  },
  termCondition : {
    fontSize: 14,
    color: colors.darkGray,
    marginTop: (Platform.OS === 'ios') ? 13 : 12,
    fontFamily: 'Roboto-Medium',
    alignSelf: 'center',
    position : 'absolute',
    right : (Platform.OS === "ios") ? 70 : 58,
    
  },

  
  ///////
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

  
  signupText: {
    fontSize: 16,
    color: colors.darkGray,
    marginTop: 15,
    fontFamily: 'Roboto-Regular',
    alignSelf: 'center',
  },
  
  rememberLogin :{
    fontSize: 16,
    color: colors.darkGray,
    fontFamily: 'Roboto-Light',
    alignSelf: 'center',
  },
  
  logo: {
    height: IMAGE_HEIGHT,
    resizeMode: 'contain',
    alignSelf: 'center',

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
 
  logoIcon : {
    height : 90,
    width : 80,
  },
  logoIcon2: {
    height : 90,
    width : 80,
    resizeMode : 'contain'
    // marginBottom : 50
  },
  
  splashView : {
    flex : 1,
    justifyContent: 'center', 
    alignItems :'center', 
    backgroundColor: colors.green_background
  }, 
  modalTp : {
    backgroundColor: 'transparent',
    width : 40,
    height : 39,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth : 1,
    borderColor : colors.textInput_border,
    flexDirection : 'row',
  },
  flagstyles : {
    fontSize : 16,
    marginLeft : 4
  },
  countryStyle: {
    flex: 1,
    backgroundColor: colors.field_color,
    borderTopColor: colors.textInput_border,
    borderTopWidth: 1,
    padding: 12,
  },
  textStyle: {
    fontSize: 16,
    color: colors.blackShade,
    fontFamily: 'Roboto-Regular',

  },
  closeButtonStyle: {
    flex: 1,
    // padding: 12,
    alignItems: 'center', 
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  closeButton : {
    width : '60%',
    height : 40,
    borderRadius : 60,
    backgroundColor : colors.green_background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBtn: {
    fontSize: 16,
    color: colors.whiteShade,
    fontFamily: 'Roboto-Regular',
  },
  iconStyle: {
    color: colors.green_background,
    fontSize: 20,
    marginRight: (Platform.OS === 'ios') ? 4 : 2
  },

  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: colors.darkGray,
    paddingLeft : 8,
    
  },
  scrollview: { 
    flexDirection:'row',
    padding: 8,
  },
  modalStyle: {
    flex :1,
    backgroundColor: 'rgba(235,235,235,0.97)',
    },
    termsView: {
      flex: 1,
      paddingTop : 8
    },
    termsContHeader: {
      fontSize: 20,
      color: colors.darkGray,
      alignSelf: 'center',  
      fontFamily: 'Roboto-Medium',
      // width : '100%',
      marginRight : 16,
    },
    horizonLine: {
      width: '100%',
      height: 0.5, 
      backgroundColor: colors.lightGray
    },
  titleText: {
    fontSize:18,
    fontFamily : 'Roboto-Medium',
    color: colors.darkGray,
    textAlign:'left',
    marginBottom: 4,
  },
  contentText:{
    fontSize:14,
    color: colors.darkGray,
    textAlign:'justify',
    marginBottom: 4,
    fontFamily : 'Roboto-Regular',
    paddingLeft : 4,
    paddingRight: 4,
    },
    contentText2:{
    fontSize:14,
    color: colors.Black,
    textAlign:'justify',
    marginBottom: 4,
    fontFamily : 'Roboto-Regular',
    paddingLeft : 12,
    },
  sethLogoModal : {
    flexDirection: 'row',
    marginTop : (Platform.OS === 'ios') ? 16 : 8,
    alignItems:'center',
    justifyContent: 'center',
    },
    imageLogo: {
    width: 20,
    height: 20,
    marginRight: 4,
    },
  logoText: {
    color: colors.white,
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '200',
    marginLeft: 8,
  },

  modalCloseText: {
    fontSize: 11,
    fontWeight: '200',
    color: colors.red,
    marginBottom: 10,
    alignSelf: 'center',  
    fontFamily: 'Montserrat-Bold'

  },
  
  closeText : {
    fontSize : 12,
    color : colors.white
  },
  buttonClose : {
    backgroundColor : colors.orange,
    width : 60,
    justifyContent: 'center',
    alignItems: 'center',
    height : 30,
    borderRadius : 16,
    marginTop : 4,
    marginBottom : 4,
    alignSelf : 'center'
  }
});