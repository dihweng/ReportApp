import { createSwitchNavigator, createAppContainer, createStackNavigator } from 'react-navigation';

import { StatusBar } from 'react-native';
import Register  from '../screens/Register/Register';
import Login  from '../screens/Login/Login';
import Profile from '../screens/Profile/Profile';
import Verification from '../screens/Verification/Verification';
import ResetCode from '../screens/ResetCode/ResetCode';
import ForgetPassword from '../screens/ForgetPassword/ForgetPassword';
import CreateNewPassword from '../screens/CreateNewPassword/CreateNewPassword';
import DashBoard  from '../screens/DashBoard/DashBoard';
import Navigations from '../screens/Navigations/Navigations';
import Logout from '../screens/Logout/Logout';
import ChangePhone from '../screens/ChangePhone/ChangePhone';
import Citation from '../screens/Citation/Citation';
import Category from '../screens/Category/Category';
import Division from '../screens/Division/Division';
import CategoryDetails from '../screens/CategoryDetails/CategoryDetails';
import Faq from '../screens/Faq/Faq';
import TermsConditions from '../screens/TermsConditions/TermsConditions';
import ManageSubscription from '../screens/ManageSubscription/ManageSubscription'
import Subscribe from '../screens/Subscribe/Subscribe';
import Subscription from '../screens/Subscription/Subscription';
import ViewPlan from '../screens/ViewPlan/ViewPlan';
import FullReport from '../screens/FullReport/FullReport'
import PersonalDetails from '../screens/PersonalDetails/PersonalDetails'
import ContactDetails from '../screens/ContactDetails/ContactDetails';
import Security from '../screens/Security/Security';
import CitedAuthorities from '../screens/CitedAuthorities/CitedAuthorities';
import Ratios from '../screens/Ratios/Ratios';
import PlainReport from '../screens/PlainReport/PlainReport';
import FavoriteList from '../screens/FavoriteList/FavoriteList';
import ReadLaterList from '../screens/ReadLaterList/ReadLaterList';
import Payment from '../screens/Payment/Payment';
import DivisionDetails from '../screens/DivisionDetails/DivisionDetails';
import CreateIssue from '../screens/CreateIssue/CreateIssue';
import Message from '../screens/Message/Message';
import ReadSavedReport from '../screens/ReadSavedReport/ReadSavedReport';

 const AuthStack = createStackNavigator({ 
  Login: {
    screen: Login,
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
  ChangePhone : {
    screen : ChangePhone,
    navigationOptions : {
      header : null,
    }
  },
  Citation : {
    screen : Citation, 
    navigationOptions : {
      header : null,
    }
  },
  Category : {
    screen : Category,
    navigationOptions : {
      header : null,
    }
  },
  Division : {
    screen : Division,
    navigationOptions : {
      header : null,
    }
  },
  CategoryDetails : {
    screen : CategoryDetails,
    navigationOptions : {
      header : null,
    }
  },
  ManageSubscription : {
    screen : ManageSubscription,
    navigationOptions : {
      header : null,
    }
  },
  
  Subscription : {
    screen : Subscription,
    navigationOptions : {
      header : null,
    }
  },
  ViewPlan : {
    screen : ViewPlan,
    navigationOptions : {
      header : null,
    }
  },
  Subscribe : {
    screen : Subscribe,
    navigationOptions : {
      header : null,
    }
  },
  Faq : {
    screen : Faq,
    navigationOptions : {
      header : null,
    }
  },
  TermsConditions : {
    screen : TermsConditions,
    navigationOptions : {
      header : null,
    }
  },
  FullReport : {
    screen: FullReport,
    navigationOptions: {
      header: null,
    }
  },
  PersonalDetails: {
    screen: PersonalDetails,
    navigationOptions: {
      header: null,
    }
  },
  ContactDetails: {
    screen: ContactDetails,
    navigationOptions: {
      header: null,
    }
  },
  Security: {
    screen: Security,
    navigationOptions: {
      header: null,
    }
  },
  Ratios: {
    screen: Ratios,
    navigationOptions: {
      header: null,
    }
  },
  CitedAuthorities: {
    screen: CitedAuthorities,
    navigationOptions: {
      header: null,
    }
  },

  PlainReport : {
    screen : PlainReport,
    navigationOptions : {
      header : null,
    }
  },
  FavoriteList : {
    screen : FavoriteList,
    navigationOptions : {
      header : null,
    }
  },
  ReadLaterList : {
    screen : ReadLaterList,
    navigationOptions : {
      header : null,
    }
  },
  Payment: {
    screen: Payment,
    navigationOptions: {
      header: null,
    }
  },
  DivisionDetails: {
    screen: DivisionDetails,
    navigationOptions: {
      header: null,
    }
  },
  CreateIssue: {
    screen: CreateIssue,
    navigationOptions: {
      header: null,
    }
  },
  Message: {
    screen: Message,
    navigationOptions: {
      header: null,
    }
  },
  ReadSavedReport: {
    screen: ReadSavedReport,
    navigationOptions: {
      header: null,
    }
  }
},
  {
    mode: 'modal',
    cardStyle: {paddingTop: StatusBar.currentHeight}, //Setting the tb to go under the sb
    headerMode: 'none'
  },
);

const AppSwitchNavigator = createSwitchNavigator({
  AuthLoading:Login,
  Auth:AuthStack,
  Menu: MenuStack,
},
  {
    initialRouteName: 'AuthLoading',
  }
);


export default createAppContainer(AppSwitchNavigator);
