import { StyleSheet, Platform,Dimensions } from 'react-native';
const window = Dimensions.get('window');
import Constants  from 'expo-constants';
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
    // flex : 1,
    marginVertical: 16,
    alignItems: 'center',
  },
  citationView : {
    width: '100%',
    height: 120,
    flexDirection: 'row',
    elevation : 1,
    shadowColor : theme.primaryTextColor,
    shadowOffset: { height : 1, width : 0},
    shadowRadius : 2.25,
    shadowOpacity : 0.25,
    backgroundColor : theme.colorAccent,
    borderRadius : 2,

  },
  citationViewAlph: {
    width: '100%',
    height: 120,
    flexDirection: 'row',
    elevation : 1,
    shadowColor : theme.primaryTextColor,
    shadowOffset: { height : 1, width : 0},
    shadowRadius : 2.25,
    shadowOpacity : 0.25,
    backgroundColor : theme.colorAccent,
    borderRadius : 2,
    marginTop : 16,

  },
  sorting : {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.bgColorPrimary,
    width : '25%',
    height : '100%',
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2
  },
  citationRange : {
    width: '74%',
    height: '100%',
    justifyContent: 'center',
    // alignItems: 'center',
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    flexDirection : 'column',
    paddingLeft : 8,
  },
  buttonView : {
    // paddingHorizontal: 8,
    justifyContent: 'space-between',
    flexDirection : 'row',
    marginTop : 8
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
  sortIcon : {
    height : 18,
    width : 18,
    tintColor : theme.primaryColor
  },
  citationNumber : {
    marginBottom : 4,
    fontSize : theme.SmallFont,
    color : theme.textGray,
  },
  citationBody : {
    marginBottom : 4,
    fontSize : theme.SmallFont,
    color : theme.textGray,
  },
  text: {
    fontSize: 25,
    color: 'black',
    padding: 10
  },

  expandedView : {
    width : '90%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation : 1,
    shadowColor : theme.primaryTextColor,
    shadowOffset: { height : 1, width : 0},
    shadowRadius : 2.25,
    shadowOpacity : 0.25,
    backgroundColor : theme.colorAccent,
    borderRadius : 2,
  },
  citisionTp : {
    paddingHorizontal : 4,
    paddingVertical : 8,
  },

  headerMessageView: {
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
    // Flartlist Header Style
    headerMessageView : {
      paddingLeft: 16,
      paddingRight: 16,
      width: '100%',
      height: 55,
      backgroundColor: theme.primaryColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    toastView: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: (Platform.OS == 'ios') ? 20 : 0,
      marginBottom: 20
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
    searchIcon : {
      width: 20,
      height: 20,
      tintColor: theme.primaryColor
    },
  
    // Render Row Styling
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
      height: 200,
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
      paddingVertical: 10,
    },
    reportHeader : {
      flexDirection : 'column',
    },
    reportName : {
      fontFamily : theme.secondaryFont,
      fontSize : theme.MediumFont,
      color : theme.primaryTextColor,
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
      marginTop : 4
    },
    taostView: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    }
  
});