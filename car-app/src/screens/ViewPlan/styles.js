import { StyleSheet, Dimensions, Platform } from 'react-native';
const window = Dimensions.get('window');
import Constants  from 'expo-constants';
import colors from '../../assets/colors';
import theme from '../../assets/theme';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbarStyle: {
    paddingTop: Constants.statusBarHeight,
    height: Constants.startHeaderHeight,
    backgroundColor: theme.primaryColor,
    borderBottomWidth: 1,
    borderBottomColor: theme.primaryColor
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
  
  navBar: {
    flexDirection : 'row',
    // paddingTop : (Platform.OS === "ios") ? 16 : 14,
    height : (Platform.OS === "ios") ? 40 : 50,
    backgroundColor: theme.toolBarColor,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 4
  },
  headerIcon: {
    height: 20,
    width: 20,
    tintColor : colors.white,
  },

  headerImage: {
    borderRadius: 30,
    height: 40,
    width: 40,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft : 8,
  },
  balanceTxtView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '50%'
  },
  nameView: {
    flexDirection: 'row',
    width: '50%',
  },
  txtHeader: {
    fontSize: 18,
    color: colors.white,
    marginLeft: 8,
    alignSelf: 'center',
    fontFamily : 'Roboto-Regular'
  },
  footerIcon : {},
  formView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems : 'center',
    paddingLeft : 16,
  },
  footerView : {
    width : '100%',
    position : 'absolute',
    top : 470,
    right :30
  },
  // cardBody: {
  //   width: '100%',
  //   height: '70%',
  //   paddingLeft : 24,
  //   paddingRight : 24,
  //   marginTop : 16
    
  //   },
  cards : {
    width : '100%',
    shadowColor: theme.primaryTextColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2.56,
    elevation: 1,    
    height: 40,
    backgroundColor : theme.colorAccent,
    flexDirection : 'row'

  },
  cardImageView : {
    width : '15%',
    height : '100%',
    backgroundColor : colors.white, 
    borderTopLeftRadius : 4,
    borderBottomLeftRadius : 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardIcon : {
    height : 20,
    width : 20,
    resizeMode : 'contain',
    tintColor : colors.orange,
  },
  btnView : {
    width : '100%',
    justifyContent : 'center',
    alignItems : 'center',
    marginTop : 8,  
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
  btnText : {
    fontSize: 16,
    color: colors.white,
    fontFamily: 'Roboto-Regular',
    alignSelf: 'center',    
  },
  amtText : {
    fontSize: 16,
    color: colors.green_background,
    fontFamily: 'Roboto-Regular',
  },
  txtInvest : {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Roboto-Regular',
  },
  viewText : {
    paddingLeft : 24,
    width : '70%', 
    height : '100%',
    justifyContent: 'center',
 
  },
  codeView : {
    flexDirection : 'row',
    marginTop : 16,
    paddingLeft : 24,
  },
  referralTxt : {
    fontSize: 14,
    color: colors.text_color,
    fontFamily: 'Roboto-Regular',
  },
  codeTxt : {
    fontSize: 16,
    color: colors.green_background,
    fontFamily: 'Roboto-Regular',
    marginLeft : 4
  },
  customTabTp : {
    width : '33%',
    alignItems: 'center',
    borderBottomColor : theme.primaryColor,
    borderBottomWidth : 2,
    marginLeft : 10,
    paddingTop : 14
  },

  customTabTp2 : {
    width : '33%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop : 14

  },
  txtTabHeader: {
    fontFamily : theme.LightRoboto,
    fontSize : theme.SmallFont,
    color : theme.textGray,
  },
  angleForward : {
    width : 12,
    height : 12,
    tintColor : colors.green_background,
  }
});