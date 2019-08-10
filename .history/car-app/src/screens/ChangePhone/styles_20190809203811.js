import { StyleSheet, Dimensions, Platform } from 'react-native';
const window = Dimensions.get('window');
import { Constants } from 'expo-constants';
import colors from '../../assets/colors';
import theme from '../../assets/theme';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbarStyle: {
    paddingTop: Constants.statusBarHeight,
    height: Constants.startHeaderHeight,
    backgroundColor: colors.green,
    borderBottomWidth: 1,
    borderBottomColor: colors.green
  },
  headerItem: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight:16,
    marginBottom: 16,
    marginTop: 16,
    width: '100%',
    justifyContent: 'space-between'
  },
  exitTxt: {
    fontSize: 40,
    color: colors.text_color,
    fontFamily: 'Roboto-Regular',
    marginLeft: 16
  },
  greenTopView : {
    backgroundColor : theme.primaryColor,
    width : '100%',
    height : '30%',
    justifyContent: 'center',
    alignItems : 'center',
    
  },
  // imageView : {
  //   height : 60,
  //   width : 40,
  // },
  lockIcon : {
    resizeMode : 'contain',
    height : 60,
    width : 60,
    tintColor : colors.white,
  },
  triangleShape : {
    width : 0,
    height : 0,
    borderLeftWidth : 30,
    borderRightWidth : 30,
    borderBottomWidth :30,
    borderStyle : 'solid',
    backgroundColor : 'transparent',
    borderLeftColor : 'transparent',
    borderRightColor : 'transparent',
    borderBottomColor : colors.white
  },
  traingleView : {
    width : '100%',
    justifyContent : 'center',
    alignItems : 'center',
    position: 'absolute',
    bottom : 355,
  },
  ForgetTxt : {
    fontSize: 18,
    color: colors.darkGray,
    marginTop: 15,
    fontFamily: 'Roboto-Black',
    alignSelf: 'center',
  },
  msgText: {
    fontSize: 16,
    color: colors.darkGray,
    marginTop: 8,
    fontFamily: 'Roboto-Light',
    alignSelf: 'center',
  },
  msgText2: {
    fontSize: 16,
    color: colors.darkGray,
    fontFamily: 'Roboto-Light',
    alignSelf: 'center',
  },
  wrapper : {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    // marginTop: 10,
    width : '100%',
    alignItems: 'center',
    // backgroundColor : colors.red
  },
  inputView :{
    width : '98%',
    alignItems : 'center'
  },
 
  buttonBorder: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '75%',
    height: 40,
    backgroundColor: theme.buttonPrimary,
    borderRadius : 25,
    marginTop : 16,
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
  backView : {
    flexDirection : 'row',
    marginTop : 16
  },
  carat: {
    fontSize: 18,
    color: theme.buttonPrimary,
    fontFamily: 'Roboto-Black',
    alignSelf: 'center',
    marginTop : 6
  },
  btnStyle : {
    backgroundColor : theme.primaryColor,
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
  backTxt : {
    fontSize: theme.SmallFont,
    color: colors.darkGray,
    marginTop: 8,
    fontFamily: theme.primaryFont,
    alignSelf: 'center',
  },
  formView: {
    flexDirection: 'column',
    width : '100%',
    marginTop : 15
    // paddingTop : 4
  },
  formHeaderTxt: {
    fontSize: 16,
    color: colors.darkGray,
    fontFamily: 'Roboto-Light',
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
});