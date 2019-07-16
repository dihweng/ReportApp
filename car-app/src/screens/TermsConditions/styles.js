import { StyleSheet, Dimensions } from 'react-native';
const window = Dimensions.get('window');
import { Constants } from 'expo';
import colors from '../../assets/colors';

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
    height : 60,
    backgroundColor: colors.green_background,
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
  termsStyle: {
    flex :1,
    paddingLeft : 10,
    paddingRight : 10,
    backgroundColor: 'rgba(235,235,235,0.97)',
    },
    termsView: {
      flex: 1,
      paddingTop : 8
    },
    termsContHeader: {
      fontSize: 20,
      color: colors.white,
      alignSelf: 'center',  
      fontFamily: 'Roboto-Medium',
      // width : '100%',
      marginRight : 16,
    },
    horizonLine: {
      width: '100%',
      height: 0.5, 
      backgroundColor: colors.lightGray
    },
  titleText: {
    fontSize:18,
    fontFamily : 'Roboto-Medium',
    color: colors.darkGray,
    textAlign:'left',
    marginBottom: 4,
  },
  contentText:{
    fontSize:14,
    color: colors.darkGray,
    textAlign:'justify',
    marginBottom: 4,
    fontFamily : 'Roboto-Regular',
    paddingLeft : 4,
    paddingRight: 4,
    },
    contentText2:{
    fontSize:14,
    color: colors.Black,
    textAlign:'justify',
    marginBottom: 4,
    fontFamily : 'Roboto-Regular',
    paddingLeft : 12,
    },
});