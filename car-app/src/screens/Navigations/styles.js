import { StyleSheet, Dimensions, Platform } from 'react-native';
const window = Dimensions.get('window');
import Constants from 'expo-constants';
import colors from '../../assets/colors';
import theme from '../../assets/theme';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
     
    //backgroundColor: colors.background_color,
  },
    navbarStyle: {
    paddingTop: (Platform.OS === 'ios') ? 0 : Constants.statusBarHeight,
    height: (Platform.OS === 'ios') ? 0 : Constants.statusBarHeight,
    backgroundColor: colors.green,
    borderBottomWidth: 1,
    borderBottomColor: colors.green,

  },
  headerItem: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight:16,
    paddingBottom: 10,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',

  },
  divider : {
    width: '100%',
    height: 1,
    backgroundColor: colors.divider,
  },
  imageLogo: {
    height: 24,
    width: 24,
    tintColor: theme.colorAccent,
    marginLeft : 16
  },
  // profileTxt: {
  //   fontSize: theme.MediumFont,
  //   fontFamily: theme.primaryFont,
  //   color: theme.colorAccent,
  // },
  // backIcon: {
  //   height: 20,
  //   width: 20,
  //   tintColor: theme.colorAccent,
  // },
  // toolbarView : {
  //   width : '100%',
  //   justifyContent : 'center',
  //   alignItems : 'center',
  //   paddingRight : 24
  // },
  // headerItem : {
  //   height : 150,
  //   backgroundColor : theme.height,
  //   justifyContent : 'center',
  //   alignItems : 'center',
  // },
  // touchView : {
  //   flexDirection : 'row',
  //   backgroundColor : colors.green,
  //   alignItems : 'center',
  //   height : 50,
  //   paddingLeft : 16,
  //   position : 'relative',
  //   bottom : 0,
  // },
  // imageStyle : {
  //   height : 60,
  //   width : 60,
  //   borderRadius : 100
  // },
  // logoutIcon : {
  //   height : 18,
  //   width : 18,
  //   tintColor : theme.colorAccent,
  // },
  // LogoutTxt : {
  //   fontSize : 14,
  //   fontFamily : theme.primaryFont,
  //   color : theme.colorAccent,  
  //   paddingLeft : 8
  // },
  drawerImageView : {
    flexDirection : 'row',
    backgroundColor : theme.colorAccent,
    alignItems : 'center',
    height : '20%',
    elevation : 1,
    shadowColor : theme.primaryTextColor,
    shadowOffset : {height : 1, width : 2},
    shadowOpacity : 0.25,
    shadowRadius : 2.56
  },
  userDetailView : {
    flexDirection : 'column',
    // paddingTop : 16,

  },
  txtuser: {
    fontFamily : theme.primaryFont, 
    marginLeft : 15,
    
  },
  
  draweIcon : {
    width : 25,
    height : 25,
    resizeMode : 'contain',
    tintColor : theme.primaryColor,
  },
  txtuserName : {
    fontFamily : theme.secondaryFont, 
    fontSize : theme.MediumFont,
    marginLeft : 15,
  },
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colorAccent,
    // alignItems: 'center',
    // paddingTop: 10,
    
  },
  sideMenuProfileIcon: {
    resizeMode: 'contain',
    width: 60,
    height: 70,
    marginLeft : 20,
    // marginTop: 20,
    // borderRadius: 180,
  },
  navToolbar : {
    paddingLeft : 10,
    color : theme.colorAccent,
  }
});