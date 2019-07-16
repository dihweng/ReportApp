import { StyleSheet, Dimensions } from 'react-native';
const window = Dimensions.get('window');
import { Constants } from 'expo';
import colors from '../../assets/colors';

export default styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  closeView : {
    width : 40,
    height : 40,
    marginLeft : 10,
    marginTop : 10,
    backgroundColor : 'transparent',
    justifyContent: 'center',
    alignItems : 'center',
  }, 
  closeIcon : {
    width : 18,
    height : 18,
    tintColor : colors.green_background
  },
  wrapper : {
    
  },
  textView : {
    justifyContent: 'center',
    alignItems : 'center',
    padding : 20,
  },
  Verification : {
    fontSize: 16,
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
  resend : {
    fontSize: 16,
    marginTop : 8,
    color: colors.green_background,
    fontFamily: 'Roboto-Black',
    alignSelf: 'center',
  },
  buttonBorder: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
    height: 40,
    backgroundColor: colors.orange,
    borderRadius : 25,
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
