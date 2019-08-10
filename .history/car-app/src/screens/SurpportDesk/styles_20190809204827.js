import { StyleSheet, Dimensions, Platform } from 'react-native';
const window = Dimensions.get('window');
import  Constants from 'expo-constants';
import colors from '../../assets/colors';
import theme from '../../assets/theme';

export default styles = StyleSheet.create({
  container: {
    // flex: 1,
    height : '100%',
  },
 
  navBar: {
    flexDirection : 'row',
    // paddingTop : (Platform.OS === "ios") ? 16 : 14,
    height : (Platform.OS === "ios") ? 40 : 60,
    backgroundColor: theme.toolBarColor,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 4,
    paddingLeft: 6,
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
  },
  btnStyle : {
    backgroundColor : colors.orange,
    width : '40%',
    justifyContent: 'center',
    alignItems : 'center',
    height : 40,
    borderRadius : 4,
    marginTop: 8,

  },
  btnText : {
    fontSize: 18,
    color: colors.white,
    fontFamily: 'Roboto-Regular',
    alignSelf: 'center',    
  },
  profileDetails: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    paddingLeft: 8,
    paddingRight: 8,
    },
    cardView:{
    width: '99%',
    backgroundColor: colors.white,
    borderRadius : 4,
    marginTop: 2,
    marginBottom : 4,
    shadowColor: colors.gray,
    shadowOffset: { 
      width: 0, 
      height: 4 
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
    padding : 16,
    paddingTop : 8,
  },
  textStyleHeader: {
    color: colors.green_background,
    fontFamily : 'Roboto-Medium',
    fontSize : 20,
  },
  textStyle : {
    fontSize : 18,
    fontFamily : 'Roboto-Medium',
    color : colors.green_background,
  },
  dateStyle : {
    fontSize : 14,
    fontFamily : 'Roboto-Regular',
    color : colors.text,
    paddingTop : 2,
  }, 
  textStatus : {
    color: colors.darkGray,
    fontFamily : 'Roboto-Regular',
    fontSize : 16,
  },  
});