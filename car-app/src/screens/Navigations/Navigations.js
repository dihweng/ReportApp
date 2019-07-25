'use strict';
import React, {Component} from 'react';
import {View, StatusBar, Image, ScrollView, SafeAreaView,TouchableOpacity} from 'react-native';
import styles from './styles';
import colors from '../../assets/colors';
import theme from '../../assets/theme';
import {DisplayText} from '../../components';

import { 
  createDrawerNavigator, 
  createAppContainer, 
  createStackNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';

//Import screen
// import InvestmentDetails from '../InvestmentDetails/InvestmentDetails';
import DashBoard from '../DashBoard/DashBoard';
import ManageAccount from '../ManageAccount/ManageAccount';
import Investment from '../Investment/Investment';
import Logout from '../Logout/Logout';
import Faq from '../Faq/Faq';
import SurpportDesk from '../SurpportDesk/SurpportDesk';
import TermsConditions from '../TermsConditions/TermsConditions';
import ManageSubscription from '../ManageSubscription/ManageSubscription';
import AllReports from '../../screens/AllReports/AllReports';
import Citation from '../../screens/Citation/Citation';
import Category from '../../screens/Category/Category';
import Division from '../Division/Division';
import CustomSidebarMenu from './CustomSidebarMenu';
import Icon from '@expo/vector-icons/Ionicons';

class Navigations extends Component {

  //Structure for the navigatin Drawer
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
  
  render(){
    return(
      <SafeAreaView style={{ flexDirection: 'row' }}>
        <StatusBar barStyle="default"/>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
          <Image
            source={require('../../assets/images/menu.png')}
            style={styles.imageLogo}
            onPress={this.toggleDrawer.bind(this)}
          />
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
}

const DashBoard_StackNavigator = createStackNavigator({
  //All the screen from the DashBoard will be indexed here
  DashBoard: {
    screen: DashBoard,
    navigationOptions: {
      header : null
    }
  },
});
const Manage_Sub_StackNavigation  = createStackNavigator({
  ManageSubscription: {
    screen: ManageSubscription,
    navigationOptions: {
      header : null
    }
  },
});

const Manage_Account_StackNavigator = createStackNavigator({
  ManageAccount: {
    screen: ManageAccount,
    navigationOptions: {
      header : null,
    }
  },
});
const Investment_StackNavigator = createStackNavigator({
  Investment: {
    screen: Investment,
    navigationOptions: {
      header : null
    }
  },
});

const Logout_StackNavigator = createStackNavigator({
  Logout: {
    screen: Logout,
    navigationOptions: {
      header : null,
    }
  },
});
const Faq_StackNavigator = createStackNavigator({
  Faq: {
    screen: Faq,
    navigationOptions: {
      header : null,
    }
  },
});
const Terms_StackNavigator = createStackNavigator({
  TermsConditions: {
    screen: TermsConditions,
    navigationOptions: {
      header : null,
    }
  },
});
const SurpportDesk_StackNavigator = createStackNavigator({
  SurpportDesk: {
    screen: SurpportDesk,
    navigationOptions: {
      header : null,
    }
  },
});

const AppTabNavigation =  createMaterialTopTabNavigator({
  AllReports: {
    screen: AllReports,
    navigationOptions: {
      tabBarLabel: 'Reports',
    }
  },
  Citation: {
    screen: Citation,
    navigationOptions: {
      tabBarLabel: 'Citation',
    }
  },
  Category: {
    screen: Category,
    navigationOptions: {
      tabBarLabel: 'Category',
      
    }
  },
  Division: {
    screen: Division,
    navigationOptions: {
      tabBarLabel: 'Division',
    }
  },
}
  ,{
    navigationOptions : ({navigation}) => {
      
      const {routeName} = navigation.state.routes
      [navigation.state.index];
      return {
        headerTitle :routeName,
        headerStyle: {
          backgroundColor: theme.primaryColor,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontFamily : theme.primaryFont,
          color :  theme.colorAccent,
        },
     
      }
      
    },
    
    initialRouteName: 'AllReports',
    tabBarPosition: 'top',
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: theme.colorAccent,
      inactiveTintColor: theme.textGray,
      labelStyle: {
        fontSize: 11,
      },
      // tabStyle: {
      //   width: 100,
      // },
      style: {
        backgroundColor: theme.primaryColor,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.primaryColor,
        shadowOffset: {width: 0, height: 2},
        shadowColor: 'gray',
        shadowOpacity: 0.25,
        elevation: 2,
        fontFamily: theme.secondaryFont,
        height: 50,
        width : '100%',
      },
      indicatorStyle: {
        height: 2,
        backgroundColor: theme.colorAccent
      },
      showIcon: false
    }
  });
const DashBoardTopNavigator = createStackNavigator({
  AppTabNavigation : AppTabNavigation
},
  {
   defaultNavigationOptions : ({navigation}) => {
     return {headerLeft : 
      <Icon 
        onPress = {()=>navigation.openDrawer()}
        style = {styles.navToolbar} 
        name = "md-menu" size = {30}/>
      }
   }
  }
);

const DrawerNavigator = createDrawerNavigator({
  DashBoard: {
    screen : DashBoardTopNavigator,
    navigationOptions: {
      drawerLabel: "DashBoard"
    }
  },

  ManageAccount : {
    screen : Manage_Account_StackNavigator,
    navigationOptions: {
      header: null
    }
  },
  ManageSubscription : {
    screen : Manage_Sub_StackNavigation,
    navigationOptions : {
      header: null
    }
  },
  Investment : {
    screen : Investment_StackNavigator,
    navigationOptions: {
      drawerLabel: "Investment"
    }
  },

  Logout : {
    screen : Logout_StackNavigator,
    navigationOptions: {
      drawerLabel: "Logout",
    }
  },
  Faq : {
    screen : Faq_StackNavigator,
    navigationOptions: {
      drawerLabel: "Faq",
    }
  },
  TermsConditions : {
    screen : Terms_StackNavigator,
    navigationOptions: {
      drawerLabel: "Terms",
    }
  },
  SurpportDesk : {
    screen : SurpportDesk_StackNavigator,
    navigationOptions: {
      drawerLabel: "Surpport Desk",
    }
  },
},
{
  contentComponent : CustomSidebarMenu,
  drawerWidth : 300,
  contentOptions : {
    activeTintColor : colors.green_background
  }
})

// export default createAppContainer(DrawerNavigator);

const App = createAppContainer(DrawerNavigator);

export default App;

  //All the screen from the DashBoard will be indexed here
//   First: {
//     screen: DashBoard,
//     navigationOptions: ({ navigation }) => ({
//       title: 'Dashboard',
//       headerLeft: <Navigations navigationProps={navigation} />,
//       headerStyle: {
//         backgroundColor: colors.green_background,
//       },
//       headerTintColor: '#fff',
//     }),
//   },
// });