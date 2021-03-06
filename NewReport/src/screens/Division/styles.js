import { StyleSheet, Dimensions, Platform } from 'react-native';
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
    flex : 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  citationView : {
    width: '100%',
    height: (Platform.OS === 'ios') ? 120 : 100,
    flexDirection: 'row',
    elevation: 1,
    shadowColor: theme.primaryTextColor,
    shadowOffset: { height : 1, width : 0},
    shadowRadius: 2.25,
    shadowOpacity: 0.25,
    backgroundColor: theme.colorAccent,
    borderRadius: 2,
    paddingRight: 4,
    marginTop: 8,

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
  btnStyle : {
    backgroundColor : theme.buttonPrimary,
    width : '90%',
    justifyContent: 'center',
    alignItems : 'center',
    height : 40,
    borderRadius : 2,
    marginTop: 16,
  },
  btnText : {
    fontSize: 20,
    color: colors.whiteShade,
    fontFamily: theme.headerFont,
    alignSelf: 'center',    
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
    fontWeight: "bold"

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
    // justifyContent: 'center',
    // alignItems: 'center',
    elevation : 1,
    shadowColor : theme.primaryTextColor,
    shadowOffset: { height : 1, width : 0},
    shadowRadius : 2.25,
    shadowOpacity : 0.25,
    backgroundColor : theme.colorAccent,
    borderRadius : 2,
  },
  divisionTp : {
    paddingHorizontal : 4,
    paddingVertical : 8,
  },
  categoryName: {
    fontFamily : theme.primaryFont,
    fontSize : theme.MediumFont,
    color : theme.textGray,
  },
  reportHeader: {
    marginVertical: 15,
  },  
  cardView: {
    width: '99%',
    // height: 30,
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
    paddingVertical: 8,
    marginHorizontal: 1,
    alignItems: 'center'
  },
  listViewItem : {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
});