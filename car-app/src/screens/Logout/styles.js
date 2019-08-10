import { StyleSheet, Dimensions } from 'react-native';
const window = Dimensions.get('window');
import  Constants  from 'expo-constants';
import colors from '../../assets/colors';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor : colors.green_background
  },
  iconsForm : {
    height : 30,
    width : 30,
    resizeMode : 'contain'
  }
 
});