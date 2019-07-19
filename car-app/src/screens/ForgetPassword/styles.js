import { StyleSheet, Dimensions } from 'react-native';
const window = Dimensions.get('window');
import { Constants } from 'expo';
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
  purpleTopView : {
    backgroundColor : theme.primaryColor,
    width : '100%',
    height : '35%',
    justifyContent: 'center',
    alignItems : 'center',
    
  },
  // imageView : {
  //   height : 60,
  //   width : 40,
  // },
  lockIcon : {
    resizeMode : 'contain',
    height : 130,
    width : 120,
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
    fontSize: theme.SmallFont,
    color: theme.primaryTextColor,
    marginTop: 8,
    fontFamily: theme.primaryFont,
    alignSelf: 'center',
  },
  msgText2: {
    fontSize: theme.SmallFont,
    color: theme.primaryTextColor,
    fontFamily: theme.primaryFont,
    alignSelf: 'center',
    marginBottom : 4,
  },
  wrapper : {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    // marginTop: 10,
    width : '100%',
    alignItems: 'center',
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
    backgroundColor: theme.primaryColor,
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
    color: theme.primaryColor,
    fontFamily: theme.headerFont,
    alignSelf: 'center',
    marginTop : 6
  },
  btnStyle : {
    backgroundColor : theme.buttonPrimary,
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
    color: theme.primaryTextColor,
    marginTop: 8,
    fontFamily: theme.primaryFont,
    alignSelf: 'center',
  }
});