import { StyleSheet, Dimensions, Platform } from 'react-native';
const window = Dimensions.get('window');
import { Constants } from 'expo-constants';
import colors from '../../assets/colors';
import theme from '../../assets/theme';

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
  wrapper : {
    width : '100%',
    height : 40,
    marginVertical : 8,
    backgroundColor : colors.whitePurple,
    paddingLeft : 20,
    justifyContent: 'center',
  },
  reportTitle: {
    width : '90%',
    height : 40,
    paddingLeft : 20,
    backgroundColor : theme.inputTxtColor,
    
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
    height: 16,
    width: 16,
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
  viewBody : {
    // alignItems : 'center',
    flex : 1,
    padding : 20
  },
  searchIcon : {
    width : 20,
    height : 20,
  },
  // listItems : {
  //   marginTop : 8,
  //   width : '90%',
  //   elevation : 1,
  //   borderRadius : 8,
  //   height : 100,
  // },
  listViewItem : {
    alignItems : 'center',
    width : '100%',
    justifyContent: 'center',
    // paddingLeft : 20,
    // paddingRight : 20,
  },
  cardView:{
    width: '99%',
    height : 200 ,
    backgroundColor: theme.colorAccent,
    // borderRadius : 8,
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
    // flexDirection : 'row',
    // alignItems : 'center'
  },
  // ImageView : {
  //   width : 40,
  //   height : 40,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderRadius : (Platform.OS === 'ios') ? 20 : 30,
  //   marginTop : 4
  // },  
  // personImage : {
  //   resizeMode : 'cover',
  //   height : 39,
  //   width : 39,
  //   borderRadius : (Platform.OS === 'ios') ? 20 : 30
  // },
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
    marginTop : 4
  },
  iconView : {
    justifyContent: 'center',
    alignItems: 'center',
    width : 40,
  },
  buttonView : {
    // paddingHorizontal: 8,
    justifyContent: 'space-between',
    flexDirection : 'row',
    marginTop : 8
  },
  
  bioTextView : {
    width : '95%',
    marginBottom : 8
  },
  reportHeader : {
    flexDirection : 'column',
  },
  reportName : {
    fontFamily : theme.secondaryFont,
    fontSize : theme.MediumFont,
    color : theme.primaryTextColor,
  },
  btnStyle : {
    backgroundColor : theme.buttonBlue,
    width : '45%',
    justifyContent: 'center',
    alignItems : 'center',
    height : 40,
    // borderRadius : 4,
  },
  btnText : {
    fontSize: 16,
    color: theme.colorAccent,
    fontFamily: theme.headerFont,
    alignSelf: 'center',    
  },
  btnReadLate : {
    backgroundColor : theme.buttonRed,
    width : '45%',
    justifyContent: 'center',
    alignItems : 'center',
    height : 40,
    // borderRadius : 4,
  },
  cards : {
    // justifyContent: 'center',
    alignItems : 'center',
    shadowColor: colors.gray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,    
    height: 40,
    width : '100%',
    marginRight : 2,
    marginVertical : 8,
    backgroundColor : theme.colorAccent,
    borderRadius : 4,
    flexDirection : 'row',

  },
  cardIcon : {
    height : 20,
    width : 20,
    resizeMode : 'contain',
    tintColor : colors.orange,
  },
  viewText : {
    width : '70%', 
    height : '100%',
    justifyContent: 'center',
  },
  verticcalLine: {
    width : 1,
    height : '70%',
    borderWidth: 1,
    borderColor : colors.whiteGray,
    marginRight : 14,
  },
  angleView : {
    width : 40,
    borderTopRightRadius : 4,
    borderBottomRightRadius : 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  angleBack : {
    width : 12,
    height : 12,
    tintColor : theme.primaryColor,
  },
  categoryName : {
    fontSize: 18,
    color: theme.primaryTextColor,
    fontFamily: theme.primaryFont,
  },
});