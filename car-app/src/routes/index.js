import { createSwitchNavigator, createAppContainer, createStackNavigator } from 'react-navigation';

import { StatusBar } from 'react-native';
import Register  from '../screens/Register/Register';
import Home  from '../screens/Home/Home';
import Profile from '../screens/Profile/Profile';
import Verification from '../screens/Verification/Verification';
import ResetCode from '../screens/ResetCode/ResetCode';
import ForgetPassword from '../screens/ForgetPassword/ForgetPassword';
import CreateNewPassword from '../screens/CreateNewPassword/CreateNewPassword';
import DashBoard  from '../screens/DashBoard/DashBoard';
import Navigations from '../screens/Navigations/Navigations';
import Logout from '../screens/Logout/Logout';
// import Faq from '../screens/Faq/Faq';
// import TermsConditions from '../screens/TermsConditions/TermsConditions';


 const AuthStack = createStackNavigator({ 
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
    }
  },
  Register: {
    screen: Register,
     navigationOptions : {
       header: null,
     }
  },
  
  ResetCode: {
    screen: ResetCode,
     navigationOptions : {
       header: null,
     }
  },

  ForgetPassword: {
   screen: ForgetPassword,
    navigationOptions: {
     header: null,
    }
  },
  CreateNewPassword: {
    screen: CreateNewPassword,
     navigationOptions: {
      header: null,
     }
   },
   Logout : {
     screen : Logout,
     navigationOptions : {
       header : null,
     }
   }

});

const MenuStack = createStackNavigator({ 
  Navigations : {
    screen : Navigations,
    navigationOptions : {
      header : null,
    }
  },
  DashBoard : {
    screen : DashBoard,
    navigationOptions : {
      header : null
    }
  },
  Verification: {
    screen: Verification,
     navigationOptions : {
       header: null,
     }
  },
  Profile : {
    screen : Profile,
    navigationOptions : {
      header : null,
    }
  },

  // Faq : {
  //   screen : Faq,
  //   navigationOptions : {
  //     header : null,
  //   }
  // },
  // TermsConditions : {
  //   screen : TermsConditions,
  //   navigationOptions : {
  //     header : null,
  //   }
  // },

  // ChangePhone : {
  //   screen : ChangePhone,
  //   navigationOptions : {
  //     header : null,
  //   }
  // },
},
  {
    mode: 'modal',
    cardStyle: {paddingTop: StatusBar.currentHeight}, //Setting the tb to go under the sb
    headerMode: 'none'
  },
);

const AppSwitchNavigator = createSwitchNavigator({
  AuthLoading:Home,
  Auth:AuthStack,
  Menu: MenuStack,
},
  {
    initialRouteName: 'AuthLoading',
  }
);


export default createAppContainer(AppSwitchNavigator);
