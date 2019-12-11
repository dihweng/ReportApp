import { StyleSheet, Dimensions, Platform } from 'react-native';
const window = Dimensions.get('window');
import  Constants  from 'expo-constants';
import colors from '../../assets/colors';
import theme from '../../assets/theme';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    flexDirection : 'row',
    // paddingTop : (Platform.OS === "ios") ? 16 : 14,
    height : (Platform.OS === "ios") ? 40 : 60,
    backgroundColor: theme.toolBarColor,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 4,
    elevation : 1

  },
  headerIcon: {
    height: 20,
    width: 20,
    tintColor : theme.colorAccent,
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
  //End of nav
  menuView: {
    height: 40,
    backgroundColor: 'transparent',
    marginLeft : 8,
    marginTop : 4,
    justifyContent: 'center',
    alignItems : 'center',
    width : 40,
    borderRadius: 60,
  },
  headerItem: {
    flexDirection: 'row',
    width: '100%',
    alignItems : 'center',
  },
  headerText : {
    fontFamily : 'Roboto-Black',
    fontSize : 18,
    marginLeft : 8,
    color : colors.white
  },
  menuIcon: {
    width : 20,
    height : 20,
    tintColor : colors.white
  },
  wrapper : {
    backgroundColor : theme.primaryColor,
    width : '100%',
    // height : '20%',
    elevation : 1,
    alignItems : 'center',
    paddingBottom : 8
  }, 
  searchView : {
    width : '90%',
    marginTop : 8,
    backgroundColor : theme.colorAccent,
    height : 50,
    borderRadius : 4,
    elevation : 1,
    shadowColor : theme.primaryTextColor,
    shadowOpacity : 0.25,
    shadowRadius : 2.56,
    shadowOffset : {height : 1, width : 0},
    flexDirection : 'row',
    paddingLeft : 16,
    alignItems : 'center'
  },
  searchIcon : {
    width : 20,
    height : 20,
    tintColor : theme.textGray
  },
  btnView : {
    width : '100%',
    alignItems : 'center',
    marginTop : 0,
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