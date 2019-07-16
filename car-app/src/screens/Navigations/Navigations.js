'use strict';
import React, {Component} from 'react';
import {View, StatusBar, Image, ScrollView, SafeAreaView,TouchableOpacity} from 'react-native';
import styles from './styles';
import colors from '../../assets/colors';
import {DisplayText} from '../../components';

import { createDrawerNavigator, createAppContainer, createStackNavigator,} from 'react-navigation';

//Import screen
// import InvestmentDetails from '../InvestmentDetails/InvestmentDetails';
import DashBoard from '../DashBoard/DashBoard';
import ManageAccount from '../ManageAccount/ManageAccount';
import Investment from '../Investment/Investment';
import Logout from '../Logout/Logout';
import Faq from '../Faq/Faq';
import SurpportDesk from '../SurpportDesk/SurpportDesk';
import TermsConditions from '../TermsConditions/TermsConditions';

import CustomSidebarMenu from './CustomSidebarMenu';

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

const Manage_Account_StackNavigator = createStackNavigator({
  //All the screen from the Profile will be indexed here
  ManageAccount: {
    screen: ManageAccount,
    navigationOptions: {
      header : null,
    }
  },
});
const Investment_StackNavigator = createStackNavigator({
  //All the screen from the Investment will be indexed here
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

const DrawerNavigator = createDrawerNavigator({
  DashBoard: {
    screen : DashBoard_StackNavigator,
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
});

export default createAppContainer(DrawerNavigator);


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