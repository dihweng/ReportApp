import { StyleSheet, Dimensions, Platform } from 'react-native';
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
  navBar: {
    flexDirection : 'row',
    // paddingTop : (Platform.OS === "ios") ? 16 : 14,
    height : (Platform.OS === "ios") ? 40 : 60,
    backgroundColor: theme.toolBarColor,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 4
  },
  headerIcon: {
    height: 16,
    width: 16,
  },

  headerImage: {
    borderRadius: 30,
    height: 40,
    width: 40,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
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
  cards : {
    shadowColor: colors.gray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,    
    height: 55,
    width : '90%',
    marginTop : 12,
    backgroundColor : colors.card,
    borderRadius : 4,
    flexDirection : 'row',
    alignSelf : "center"

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
  viewText : {
    paddingLeft : 24,
    width : '70%', 
    height : '100%',
    justifyContent: 'center',
 
  },
  amtText : {
    fontSize: 16,
    color: colors.green_background,
    fontFamily: 'Roboto-Regular',
  },
  angleView : {
    width : '15%',
    borderTopRightRadius : 4,
    borderBottomRightRadius : 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  angleBack : {
    width : 12,
    height : 12,
    tintColor : colors.green_background,

  },
  wrapper: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
    width : '100%',
  },
  formView: {
    flexDirection: 'column',
    width : '100%',
    paddingTop : 4
  },
  formHeaderTxt: {
    fontSize: 16,
    color: colors.darkSilver,
    fontFamily: 'Roboto-Light',
  },
  formstyle : {
    backgroundColor : colors.field_color,
  },
  textBtn: {
    fontSize: 16,
    color: colors.whiteShade,
    fontFamily: 'Roboto-Regular',
  },
  signupLinkView: {
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop : 16,
  },
  signupText: {
    fontSize: 18,
    color: colors.button_border,
    // marginTop: 8,
    fontFamily: 'Roboto-Regular',
    alignSelf: 'center',
  },
  btnView: {
    // backgroundColor : colors.background_color,
    alignItems : 'center',
    width : '100%',
    paddingTop : 16
  },
  btnStyle : {
    backgroundColor : colors.orange,
    width : '50%',
    justifyContent: 'center',
    alignItems : 'center',
    height : 40,
    borderRadius : 30,
    // marginTop: 16,

  },
  btnText : {
    fontSize: 18,
    color: colors.white,
    fontFamily: 'Roboto-Regular',
    alignSelf: 'center',    
  },
  textBoder: {
    backgroundColor : colors.field_color,
    height: 40,
    paddingLeft: 8,
    width:'100%',
    borderRadius : 4,
    paddingRight : 8,
    justifyContent : 'center',
  },
  iconStyle: {
    color: colors.green_background,
    fontSize: 20,
  },
  viewTxtgender : {
    width : '100%',
    flexDirection : 'row',
    justifyContent : 'space-between',

  },
  genderText : {
    fontFamily: 'Roboto-Regular',
    color: colors.text_color,
    fontSize: 16,

  },
  countryStyle: {
    flex: 1,
    backgroundColor: colors.field_color,
    borderTopColor: colors.textInput_border,
    borderTopWidth: 1,
    padding: 12,
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
});