import { StyleSheet, Dimensions } from 'react-native';
const window = Dimensions.get('window');
import { Constants } from 'expo';
import colors from '../../assets/colors';

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
  scrollView : {
    flex:1, 
    width : '100%',
  },
  greenTopView : {
    backgroundColor : colors.green_background,
    width : '100%',
    height : '40%',
    justifyContent: 'center',
    alignItems : 'center',
    
  },
  // imageView : {
  //   height : 60,
  //   width : 40,
  // },
  lockIcon : {
    resizeMode : 'contain',
    height : 100,
    width : 80,
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
    color: colors.darkSilver,
    marginTop: 15,
    fontFamily: 'Roboto-Black',
    alignSelf: 'center',
  },
  msgText: {
    fontSize: 16,
    color: colors.darkSilver,
    marginTop: 8,
    fontFamily: 'Roboto-Light',
    alignSelf: 'center',
  },
  msgText2: {
    fontSize: 16,
    color: colors.darkSilver,
    fontFamily: 'Roboto-Light',
    alignSelf: 'center',
  },
  wrapper : {
    flex: 1,
    paddingLeft: 40,
    paddingRight: 40,
    // marginTop: 10,
    width : '100%',
    alignItems: 'center',
    // backgroundColor : colors.red
  },
  inputView :{
    width : '100%',
    alignItems : 'center',
    marginTop : 8
  },
  btnText : {
    fontSize: 14,
    color: colors.white,
    fontFamily: 'Roboto-Regular',
    alignSelf: 'center',    
  },
  buttonBorder: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '65%',
    height: 40,
    backgroundColor: colors.orange,
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
    fontSize: 16,
    color: colors.green_background,
    fontFamily: 'Roboto-Black',
    alignSelf: 'center',
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
});