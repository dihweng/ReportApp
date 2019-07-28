import { StyleSheet, Dimensions, Platform } from 'react-native';
const window = Dimensions.get('window');
import Constants  from 'expo-constants';
import colors from '../../assets/colors';
import theme from '../../assets/theme';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : colors.colorAccent,
  },
  navBar: {
    flexDirection : 'row',
    // paddingTop : (Platform.OS === "ios") ? 16 : 14,
    height : (Platform.OS === "ios") ? 50 : 60,
    backgroundColor: theme.primaryColor,
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
  
  cardBody: {
    width: '100%',
    height: '70%',
    paddingLeft : 24,
    paddingRight : 24,
    marginTop : 16
    
    },
  cards : {
    shadowColor: theme.textGray,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,    
    height: 55,
    marginTop : 12,
    backgroundColor : theme.inputFieldBg,
    borderRadius : 4,
    flexDirection : 'row'

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
  cardText : {
    fontSize: 16,
    color: theme.primaryColor,
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
  angleView : {
    width : '15%',
    borderTopRightRadius : 4,
    borderBottomRightRadius : 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  angleForward : {
    width : 12,
    height : 12,
    tintColor : theme.primaryColor,

  }
});