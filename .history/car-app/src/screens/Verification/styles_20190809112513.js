import { StyleSheet, Dimensions } from 'react-native';
const window = Dimensions.get('window');
import { Constants } from 'expo';
import colors from '../../assets/colors';
import theme from '../../assets/theme';

export default styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  closeView : {
    width : 40,
    height : 40,
    marginLeft : 10,
    // marginTop : 10,
    backgroundColor : 'transparent',
    justifyContent: 'center',
    alignItems : 'center',
  }, 
  closeIcon : {
    width : 18,
    height : 18,
    tintColor : theme.primaryColor
  },
  wrapper : {
    
  },
  textView : {
    justifyContent: 'center',
    alignItems : 'center',
    padding : 20,
  },
  Verification : {
    fontSize: theme.SmallFont,
    color: theme.primaryTextColor,
    marginTop: 15,
    fontFamily: theme.headerFont,
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
    fontSize: theme.SmallFont,
    color: theme.primaryTextColor,
    fontFamily: theme.primaryFont,
    alignSelf: 'center',
  },
  resend : {
    fontSize: 16,
    marginTop : 8,
    color: theme.primaryColor,
    fontFamily: 'Roboto-Black',
    alignSelf: 'center',
  },
  buttonBorder: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    height: 40,
    backgroundColor: theme.primaryColor,
    borderRadius : 25,
    marginTop : 8
  },
  btnText : {
    fontSize: 18,
    color: colors.white,
    fontFamily: 'Roboto-Regular',
    alignSelf: 'center',    
  },

  // otp design
  optView : { 
    marginTop : '20%',
    alignItems : 'center',
    justifyContent: 'center',
    padding : 20,
  },


});
