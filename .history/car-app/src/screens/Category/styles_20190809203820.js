import { StyleSheet, Dimensions } from 'react-native';
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
    backgroundColor: theme.primaryColor,
    borderBottomWidth: 1,
    borderBottomColor: theme.primaryColor
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
  viewBody : {
    // alignItems : 'center',
    flex : 1,
    paddingRight : 20,
    paddingLeft : 20,
  },
  cardView:{
    width: '99%',
    height : 40 ,
    backgroundColor: theme.colorAccent,
    marginTop: 4,
    marginBottom : 4,
    shadowColor: theme.primaryTextColor,
    shadowOffset: { 
      width: 0, 
      height: 0.5
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 0.5,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft : 2
  },
  categoryName: {
    fontFamily : theme.primaryFont,
    fontSize : theme.MediumFont,
    color : theme.textGray,
  }
});