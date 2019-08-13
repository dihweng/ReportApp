import { StyleSheet, Dimensions,Platform } from 'react-native';
const window = Dimensions.get('window');
import Constants  from 'expo-constants';
import colors from '../../assets/colors';
import theme from '../../assets/theme';
export default styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    flexDirection : 'row',
    // paddingTop : (Platform.OS === "ios") ? 16 : 14,
    height : (Platform.OS === "ios") ? 50 : 60,
    backgroundColor: theme.toolBarColor,
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
    flexDirection : 'column',
    width : '70%',
    justifyContent : 'center',
    alignItems : 'center'
  },
  issuesStatus : {
    flexDirection : 'row',
    alignItems: 'center'
  },
  txtHeader: {
    fontSize : 18,
    color : colors.white,
    marginLeft : 8,
    alignSelf : 'center',
    fontFamily : 'Roboto-Regular'
  },

  exitTxt: {
    fontSize: 40,
    color: colors.text_color,
    fontFamily: 'Roboto-Regular',
    marginLeft: 16
  },
  bodyView : {
    flex : 1,
    alignItems: 'center',
  },
  chatHeader : {
    width : '98%',
    height : '15%',
    marginTop : 4,
    backgroundColor : colors.white,
    shadowColor: colors.gray,
    shadowOffset: { 
      width: 0, 
      height: 2 
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1, 
  },
  messageBody : {
    flex : 1,
    padding : 4,
    alignItems : 'center',
    width : '100%',
    paddingLeft : 8,
    paddingRight: 8,

  },
  loadTxt : {
    width : 160,
    backgroundColor : '#ddd',
    color : colors.white,
    fontSize : 14,
    fontFamily : 'Roboto-Regular',
    textAlign : 'center',
    borderRadius : 4,
    paddingBottom :2

  },
  dateTimeTxt : {
    // width : 150,
    fontSize : 12,
    fontFamily : 'Roboto-Regular',
    textAlign : 'center',
    borderRadius : 4,
    paddingBottom :2,
    color : colors.darkGray,

  },
  
  messageHolderLeft : {
    width : '100%',
    backgroundColor : colors.green,
    alignItems : 'flex-start',
    height : 40
  }, 
  messageHolderRight : {
    width : '100%',
    backgroundColor : colors.red,
    alignItems : 'flex-end',
    height : 40
  },
  adminMessage :{
    borderTopLeftRadius : 30,
    borderTopRightRadius : 30,
    borderBottomRightRadius : 30,
    backgroundColor : colors.gray,
    width : '60%',
    padding : 10,

  },
  userMessage : {
    borderTopLeftRadius : 30,
    borderTopRightRadius : 30,
    borderBottomLeftRadius : 30,
    backgroundColor : colors.gray,
    width : '60%',
    padding : 10,

  },
  // the main style to the chat ui
   //ChatView

   outer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },

  messages: {
    flex: 1,
  },

  //InputBar

  inputBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 3,

  },
  textBox: {
    borderRadius: 8,
    borderWidth: 0,
    borderColor: 'gray',
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    height : 50,
    elevation : 2,
    shadowOffset : {height:2, width : 0},
    shadowOpacity : 0.25,
    shadowColor : colors.black,
    shadowRadius : 2.26,
    marginBottom : 4,
    backgroundColor : colors.white
  },
  sendButton: {
    height : 40,
    width : 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    borderRadius: 40,
    backgroundColor: theme.primaryColor,
  },
  sendIcon : {
    tintColor : colors.white,
    resizeMode : 'contain',
    height : 20,
    width : 20,
    marginLeft : 3,
  },
  //MessageBubble
  messageBubble: {
    // borderRadius: 5,
    marginTop: 8,
    marginRight: 10,
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection:'row',
    flex: 1
  },

  messageBubbleLeft: {
    backgroundColor: '#d5d8d4',
    borderTopLeftRadius : 16,
    borderTopRightRadius : 16,
    borderBottomRightRadius : 16,
  },

  messageBubbleTextLeft: {
    color: 'black',
    fontSize : 16,
    fontFamily: 'Roboto-Regular',
  },

  messageBubbleRight: {
    backgroundColor: theme.primaryColor,
    borderBottomLeftRadius: 16,
    borderTopLeftRadius : 16,
    borderTopRightRadius: 16,
  },

  messageBubbleTextRight: {
    color: 'white',
    fontSize : 16,
    fontFamily: 'Roboto-Regular',
  },
});