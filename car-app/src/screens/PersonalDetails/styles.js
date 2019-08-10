import { StyleSheet, Dimensions, Platform } from 'react-native';
const window = Dimensions.get('window');
import Constants  from 'expo-constants';
import colors from '../../assets/colors';
import theme from '../../assets/theme';
export default styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    flexDirection : 'row',
    // paddingTop : (Platform.OS === "ios") ? 16 : 14,
    height : (Platform.OS === "ios") ? 50 : 60,
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
    fontFamily : theme.primaryFont
  },
  cards : {
    shadowColor: theme.textGray,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2.56,
    elevation: 1,    
    height: 50,
    width : '90%',
    marginTop : 12,
    backgroundColor : theme.inputFieldBg,
    borderRadius : 4,
    flexDirection : 'row',
    alignSelf : "center"

  },
  cardImageView : {
    width : '15%',
    height : '100%',
    backgroundColor : theme.colorAccent, 
    borderTopLeftRadius : 4,
    borderBottomLeftRadius : 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardIcon : {
    height : 20,
    width : 20,
    resizeMode : 'contain',
    tintColor : theme.primaryColor,
  },
  viewText : {
    paddingLeft : 24,
    width : '70%', 
    height : '100%',
    justifyContent: 'center',
 
  },
  amtText : {
    fontSize: 16,
    color: theme.primaryColor,
    fontFamily : theme.primaryFont
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
    tintColor : theme.primaryColor,

  },
  
  wrapper: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    width : '100%',
  },
  formView: {
    flexDirection: 'column',
    width : '100%',
    paddingTop : 2
  },

  formstyle : {
    backgroundColor : colors.field_color,
  },
  formContainer : {
    width : '48%',
    flexDirection: 'column',
    marginTop: 4,
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
  dateGenderView: {
    width : '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconStyle: {
    color: theme.primaryColor,
    fontSize: 20,
  },
  genderText : {
    fontFamily : theme.primaryFont,    
    color: theme.primaryTextColor,
    fontSize: 16,

  },
  viewTxtgender : {
    width : '100%',
    flexDirection : 'row',
    justifyContent : 'space-between',

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
    height: '30%', 
    width: '90%',
    padding: 16,  
    borderRadius: 4
  },
  modalTxt:{
    fontSize: 18,
    color: colors.text_color,
    marginTop: 6,
    marginBottom: 6,
    fontFamily : theme.primaryFont
  },
  textHeaderStyle: {
    fontSize:  22,
    fontFamily : theme.primaryFont,
    marginTop: 8,
    color: colors.green

  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily : theme.primaryFont,
    color: theme.primaryTextColor,
    // backgroundColor : colors.field_color,
    
  },
  modalTp : {
    backgroundColor: theme.inputFieldBg,
    width : 50,
    height : 39,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth : 1,
    borderColor : colors.whiteShade,
    flexDirection : 'row',
  },
  flagstyles : {
    fontSize : 16,
  },
  countryStyle: {
    flex: 1,
    backgroundColor: colors.field_color,
    borderTopColor: colors.textInput_border,
    borderTopWidth: 1,
    padding: 12,
  },
  phoneView : {
    flexDirection : 'row',
    width : '100%',
    height : 40,
    borderRadius : 4,
    borderWidth : 1,
    borderColor : colors.field_color,
    marginTop : 4,
    // justifyContent: 'center',
    alignItems : 'center',
    backgroundColor : colors.field_color
  },
  formHeaderTxt: {
    fontSize: 16,
    color: colors.darkSilver,
    fontFamily: 'Roboto-Light',
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
  signupLinkView: {
    justifyContent: 'center',
    flexDirection: 'column',
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
    paddingBottom : 15
  },
  btnStyle : {
    backgroundColor : theme.primaryColor,
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
  CountryView : {
    width : '100%',
    flexDirection: 'column',
    paddingTop: 4,
    marginBottom : 25
  },
});