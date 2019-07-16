import { StyleSheet, Dimensions, Platform } from 'react-native';
const window = Dimensions.get('window');
import Constants from 'expo-constants'
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
  // accordion
  container: {
    flex: 1,
    // paddingLeft: 20,
    // paddingRight: 20,
    // paddingTop: (Platform.OS == 'ios') ? 20 : 0,
    // paddingBottom: 10,
  },

  // navBar: {
  //   flexDirection : 'row',
  //   paddingTop : (Platform.OS === "ios") ? 20 : 18,
  //   paddingBottom : 15,
  //   height : Constants.startHeaderHeight,
  //   backgroundColor: colors.darkTab,
  //   alignItems : 'center',
  // },

  navBarHeadertxt: {
    flex: 1,
    color: colors.dardgold,
    textAlign : 'center',
    fontSize: 18,
    fontFamily : 'Montserrat-Bold',
    marginEnd: 40
  },
  navBarButton: {
    marginLeft : 16,
    borderRadius : 50
  },
  MainContainer:
    {
        flex: 1,
        backgroundColor: '#eee',
        justifyContent: 'center',
        paddingTop: (Platform.OS == 'ios') ? 20 : 0
    },
 
    Animated_View_Style:
    {
        height: 60,
        backgroundColor: '#FF9800',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
 
    View_Inside_Text:
    {
        color: '#fff',
        fontSize: 24
    },
 
    TouchableOpacityStyle:{
  
      position: 'absolute',
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      right: 30,
      bottom: 30,
    },
 
    FloatingButtonStyle: {
  
      resizeMode: 'contain',
      width: 50,
      height: 50,
    },
    MainContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: 8
    },
  
    Panel_text: {
      fontSize: 18,
      color: colors.darkGray,
      padding: 10,
      fontFamily: 'Roboto-Regular',
    },
  
    Panel_Button_Text: {
      textAlign: 'center',
      color: colors.green_background,
      fontSize: 18,
      fontFamily: 'Roboto-Regular',
    },
  
    Panel_Holder: {
      borderWidth: 1,
      borderColor: colors.white,
      marginVertical: 5,
      borderRadius: 4,
      backgroundColor : colors.white,
      shadowColor: colors.gray,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation : 2
    },
  
    Btn: {
      padding: 10,
      backgroundColor: colors.darkTab,
      borderRadius: 8,
    }
});