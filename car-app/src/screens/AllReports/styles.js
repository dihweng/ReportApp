import { StyleSheet, Dimensions, Platform } from 'react-native';
import theme from '../../assets/theme';
import colors from '../../assets/colors';

export default styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  containerScroll:{
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
    shadowColor: theme.secondaryTextColor,
    shadowOffset: { 
      width: 0, 
      height: 4 
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,  
  },
  headerIcon: {
    height: 18,
    width: 18,
    tintColor : theme.primaryColor,
  },
  headerLogoIcon: {
    height: 35,
    width: 80,
  },
  // headerImage: {
  //   borderRadius: 30,
  //   height: 40,
  //   width: 40,
  //   backgroundColor: 'transparent',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginLeft : 8,
  // },
  balanceTxtView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '99%'
  },
  nameView: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'center',
    alignItems : 'center'
  },
  txtHeader: {
    fontSize: 18,
    color: theme.primaryTextColor,
    marginLeft: 16,
    alignSelf: 'center',
    fontFamily : theme.secondaryFont
  },

  searchView : {
    width : '100%',
    marginTop : 8,
    backgroundColor : theme.colorAccent,
    height : 50,
    // borderRadius : 4,
    elevation : 1,
    shadowColor : theme.primaryTextColor,
    shadowOpacity : 0.25,
    shadowRadius : 2.56,
    shadowOffset : {height : 1, width : 0},
    flexDirection : 'row',
    paddingLeft : 16,
    alignItems : 'center'
  },
  viewBody : {
    // alignItems : 'center',
    flex : 1,
    justifyContent: 'center',
    // padding : 20
  },
  searchIcon : {
    width: 20,
    height: 20,
    tintColor: theme.primaryColor
  },
  toastView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: (Platform.OS == 'ios') ? 20 : 0,
  },
  
  searchView : {
    width: '100%',
    // marginTop : 8,
    backgroundColor: theme.colorAccent,
    height : 35,
    borderRadius: 2,
    elevation: 1,
    shadowColor: theme.primaryTextColor,
    shadowOpacity: 0.25,
    shadowRadius: 2.56,
    shadowOffset: {height : 1, width : 0},
    flexDirection: 'row',
    paddingLeft: 16,
    alignItems: 'center'
  },
  listViewItem : {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 8,
  },
  cardView:{
    width: '99%',
    backgroundColor: theme.colorAccent,
    borderRadius : 2,
    marginTop: 4,
    marginBottom : 4,
    shadowColor: theme.primaryTextColor,
    shadowOffset: { 
      width: 0, 
      height: 1 
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },

  txtView : {
    flexDirection : 'column',
    height : '100%',
    width : '100%',
    marginTop : 8
  },
  headerText : {
    fontFamily : theme.secondaryFont,
    fontSize : theme.SmallerFont,
    color : colors.red,
    marginTop : 4,
  },
  subHeaderText : {
    // marginTop : 4,
    fontFamily : theme.subHeaderFont,
    fontSize : theme.SmallFont,
    color : theme.primaryColor,
    // height : 40
  },
  reportInfo : {
    fontFamily : theme.secondaryFont,
    fontSize : theme.SmallerFont,
    // color : theme.primaryTextColor,
    color : "#333",
    marginTop : 2
  },
  iconView : {
    justifyContent: 'center',
    alignItems: 'center',
    width : 40,
  },
  buttonView : {
    justifyContent: 'space-between',
    flexDirection : 'row',
    marginTop : 4
  },
  
  bioTextView : {
    width : '95%',
    marginBottom : 8
  },
  // reportHeader : {
  //   flexDirection : 'column',
  // },
  reportName : {
    fontFamily : theme.secondaryFont,
    fontSize : theme.MediumFont,
    color : theme.primaryTextColor,
  },
  btnStyle : {
    backgroundColor : theme.buttonBlue,
    width : '48%',
    justifyContent: 'center',
    alignItems : 'center',
    height : 40,
    // borderRadius : 4,
  },
  btnText : {
    fontSize: theme.SmallFont,
    color: theme.colorAccent,
    fontFamily: theme.secondaryFont,
    alignSelf: 'center',    
  },
  btnReadLate : {
    backgroundColor : theme.buttonRed,
    width : '48%',
    justifyContent: 'center',
    alignItems : 'center',
    height : 40,
    // borderRadius : 4,
  },
  FlatListHeader : {    
    justifyContent : 'space-between',
    flexDirection : 'row',
    alignItems : 'center',
    paddingLeft : 16,
    paddingRight : 16,
    borderRadius : 30,
    shadowColor: '#000',
    shadowOffset: { 
      width: 0, 
      height: 4 
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
    marginBottom : 4
  },
  
  headerMessageView : {
    paddingLeft: 16,
    paddingRight: 16,
    width: '100%',
    height: 55,
    backgroundColor: theme.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },

  splashView : {
    flex : 1,
    justifyContent: 'center', 
    alignItems :'center', 
    backgroundColor: theme.primaryColor,
  },

  logoIcon : {
    resizeMode : 'contain',
    height : '100%',
    width : '100%',
  },
  footer: {
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: theme.colorAccent,
    paddingHorizontal: 20,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    elevation: 1,
    shadowOffset: {height: 1, width: 0},
    shadowColor: theme.primaryTextColor,
    shadowOpacity: 0.25,
    shadowRadius: 2.56
  },
  footerView: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: theme.primaryColor,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadPrevBtn: {
    padding: 10,
    backgroundColor: theme.primaryColor,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
});