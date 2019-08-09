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
    fontFamily: theme.primaryFont,
    marginLeft: 16
  },
  
  navBar: {
    flexDirection : 'row',
    // paddingTop : (Platform.OS === "ios") ? 16 : 14,
    height : (Platform.OS === "ios") ? 50 : 50,
    backgroundColor: theme.toolBarColor,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 4
  },
  headerIcon: {
    height: 18,
    width: 18,
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
    fontFamily: theme.primaryFont,
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
    backgroundColor : theme.primaryColor,
    flexDirection : 'row',
    justifyContent: 'space-between',
    paddingHorizontal : 16

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
    // alignItems : 'center',
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
    fontFamily: theme.primaryFont,
    alignSelf: 'center',    
  },
  amtText : {
    fontSize: 16,
    color: colors.green_background,
    fontFamily: theme.primaryFont,
  },
  txtInvest : {
    fontSize: 14,
    color: colors.text,
    fontFamily: theme.primaryFont,
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
    fontFamily: theme.primaryFont,
  },
  codeTxt : {
    fontSize: 16,
    color: colors.green_background,
    fontFamily: theme.primaryFont,
    marginLeft : 4
  },
  customTabTp : {
    width : '33%',
    alignItems: 'center',
    borderBottomColor : theme.colorAccent,
    borderBottomWidth : 2,
    // marginLeft : 10,
    paddingTop : 14
  },

  customTabTp2 : {
    width : '33%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop : 14

  },
  txtTabHeader: {
    fontFamily: theme.LightRoboto,
    fontSize: theme.SmallFont,
    color: theme.formBorderColor,
  },
  txtTabHeaderWhite: {
    fontFamily: theme.LightRoboto,
    fontSize: theme.SmallFont,
    color: theme.colorAccent,    
  },
  subPlanView: {
    width: '99%',
    shadowColor: theme.primaryTextColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2.56,
    elevation: 1,    
    height: 80,
    backgroundColor : theme.colorAccent,
    borderRadius: 2,
    margin: 1
  },
  subscribtionView:{
    height : '100%',
    padding : 20,
  },
  wrapper: {
    flex: 1,
    marginTop: 20,
    width : '100%',
  },
  formView: {
    flexDirection: 'column',
    width : '100%',
    paddingTop : 4
  },
  formHeaderTxt: {
    fontSize: theme.SmallFont,
    color: theme.textGray,
    fontFamily: theme.LightRoboto,
  },
  formstyle : {
    backgroundColor : theme.inputFieldBg
  },
  btnStyle : {
    backgroundColor : theme.primaryColor,
    width : '45%',
    justifyContent: 'center',
    alignItems : 'center',
    height : 40,
    borderRadius : 2,
    marginTop: 16,
  },
  btnText : {
    fontSize: theme.SmallFont,
    color: theme.colorAccent,
    fontFamily: theme.primaryFont,
    alignSelf: 'center',    
  },
  modalContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingTop: 80,
  },
  modalStyle: {
    backgroundColor: colors.whiteShade, 
    borderColor: colors.gray,
    height: '40%', 
    width: '90%',
    padding: 16,  
    borderRadius: 4
  },
  modalTxt:{
    fontSize: 18,
    color: colors.text_color,
    marginTop: 6,
    marginBottom: 6,
    fontFamily: theme.primaryFont,
  },
  textHeaderStyle: {
    fontSize:  22,
    fontFamily: theme.secondaryFont,
    marginTop: 8,
    color: colors.green

  },
  textBoder: {
    backgroundColor : theme.inputFieldBg,
    height: 40,
    paddingLeft: 8,
    width:'100%',
    borderRadius : 4,
    paddingRight : 8,
    justifyContent : 'center',
  },
  viewTxtPlan : {
    width : '100%',
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems: 'center'

  },
  genderText : {
    fontFamily: theme.primaryFont,
    color: colors.text_color,
    fontSize: 16,

  },
   // Flartlist Header Style
   headerMessageView : {
    paddingLeft: 16,
    paddingRight: 16,
    width: '100%',
    height: 55,
    backgroundColor: theme.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },

  toastView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: (Platform.OS == 'ios') ? 20 : 0,
    marginBottom: 20
  },
  searchView : {
    width: '100%',
    // marginTop : 8,
    backgroundColor: theme.colorAccent,
    height : 35,
    borderRadius: 2,
    elevation: 1,
    shadowColor: theme.primaryTextColor,
    shadowOpacity: 0.25,
    shadowRadius: 2.56,
    shadowOffset: {height : 1, width : 0},
    flexDirection: 'row',
    paddingLeft: 16,
    alignItems: 'center'
  },
  searchIcon : {
    width: 20,
    height: 20,
    tintColor: theme.primaryColor
  },

  // Render Row Styling
  listViewItem : {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 8,
  },
  cardView:{
    width: '99%',
    height: 200,
    backgroundColor: theme.colorAccent,
    borderRadius : 2,
    marginTop: 4,
    marginBottom : 4,
    shadowColor: theme.primaryTextColor,
    shadowOffset: { 
      width: 0, 
      height: 1 
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 1,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  reportHeader : {
    flexDirection : 'column',
  },
  reportName : {
    fontFamily : theme.secondaryFont,
    fontSize : theme.MediumFont,
    color : theme.primaryTextColor,
  },
  txtView : {
    flexDirection : 'column',
    height : '100%',
    width : '100%',
    marginTop : 8
  },
  headerText : {
    fontFamily : theme.secondaryFont,
    fontSize : theme.SmallerFont,
    color : colors.red,
    marginTop : 4,
  },
  subHeaderText : {
    // marginTop : 4,
    fontFamily : theme.subHeaderFont,
    fontSize : theme.SmallFont,
    color : theme.primaryColor,
    // height : 40
  },
  reportInfo : {
    fontFamily : theme.secondaryFont,
    fontSize : theme.SmallerFont,
    // color : theme.primaryTextColor,
    color : "#333",
    marginTop : 4
  },
  taostView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }

});