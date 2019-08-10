import { StyleSheet, Dimensions ,Platform} from 'react-native';
const window = Dimensions.get('window');
import Constants  from 'expo-constants';
import colors from '../../assets/colors';
import theme from '../../assets/theme';
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom : 70,
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
    marginLeft : 16,
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
profileDetails: {
  alignItems: 'center',
  flexDirection: 'row',
  flex: 1,
  paddingLeft: 16,
  paddingRight: 16,
  },
  cardView:{
  width: '100%',
  backgroundColor: colors.white,
  borderRadius : 4,
  marginTop: 2,
  marginBottom : 4,
  shadowColor: colors.gray,
  shadowOffset: { 
    width: 0, 
    height: 2 
  },
  shadowOpacity: 0.5,
  shadowRadius: 2,
  elevation: 1,
  padding : 16,
  paddingTop : 8,
},

  FlatListHeader : {
    width : '100%',
    height : 48,
    marginTop : 8,
    justifyContent : 'space-between',
    flexDirection : 'row',
    alignItems : 'center',
    paddingLeft : 16,
    paddingRight : 16,
    borderRadius : 30,
    shadowColor: colors.gray,
    shadowOffset: { 
      width: 0, 
      height: 2 
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
    marginBottom : 4
  },
  headerMessageView : {
    paddingLeft : 16,
    paddingRight : 16,
  },
  messageTitle : {
    width : '100%',
    height : 48,
    // alignItems:'center',  
    // justifyContent: 'center',
    borderTopLeftRadius : 3,
    borderTopRightRadius : 3,
    paddingLeft : 16,
    paddingRight: 8,
    paddingBottom : 2,
  },
  messageBody : { 
    flexDirection: 'column', 
    paddingLeft : 16,
  },
  messageLogo: {
    height: 24,
    width: 24,
  },
  textStyleHeader: {
    color: colors.green_background,
    fontFamily : 'Roboto-Medium',
    fontSize : 20,
  },
  textMoney : {
    color: colors.orange,
    fontFamily : 'Roboto-Regular',
    fontSize : 16,
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
  aircraftListTxt : {
    fontSize : 18,
    fontFamily : 'Roboto-Medium',
    color : colors.green_background,
    
  } 
});