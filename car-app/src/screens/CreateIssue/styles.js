import { StyleSheet, Dimensions,Platform } from 'react-native';
const window = Dimensions.get('window');
import  Constants  from 'expo-constants';
import colors from '../../assets/colors';
import theme from '../../assets/theme'
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
    height: 18,
    width: 18,
    tintColor : colors.white
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

  // body
  supportViewBody : {
    width : '100%',
    flex : 1,
    padding : 16,
    paddingTop : 8,
  },
  inputView : {
    flexDirection : 'column'
  },
  textIssues : {
    color : colors.darkGray,
    fontSize : 16,
    fontFamily : 'Roboto-Medium'
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
  btnView : {
    width : '100%',
    justifyContent : 'center',
    alignItems : 'center',
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
  //modal channel
  formContainer : {
    width : '78%',
    flexDirection: 'column',
    marginTop: 4,
  },
  formHeaderTxt: {
    fontSize: theme.SmallFont,
    color: colors.darkSilver,
    fontFamily: theme.LightRoboto,
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
  viewTxtChannel : {
    width : '100%',
    flexDirection : 'row',
    justifyContent : 'space-between',

  },
  
  channelTxt : {
    fontFamily : theme.primaryFont,    
    color: theme.primaryTextColor,
    fontSize: 16,

  },
  modalContainer: {
    flex: 1, 
    // justifyContent: 'center', 
    alignItems: 'center',
    marginTop: (Platform.OS === 'ios') ? '50%': '33%',
  },
  modalStyle: {
    backgroundColor: colors.whiteShade, 
    borderColor: colors.gray,
    height: '50%', 
    width: '90%',
    padding: 16,  
    borderRadius: 4

  },
  modalTxt:{
    fontSize: 18,
    color: colors.text_color,
    marginVertical: 6,
    fontFamily : theme.primaryFont
  },
  textHeaderStyle: {
    fontSize:  22,
    fontFamily : theme.primaryFont,
    marginTop: 8,
    color: colors.green

  },
});