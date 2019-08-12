'use strict';
import React, {Component} from 'react';
import {View, StatusBar, Image, Platform,Button, SafeAreaView,TouchableOpacity} from 'react-native';
import styles from './styles';
import colors from '../../assets/colors';
import theme from '../../assets/theme';
import {DisplayText} from '../../components';
import CustomSidebarMenu from './CustomSidebarMenu';
import Icon from '@expo/vector-icons/Ionicons';

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
import PlainReport from '../PlainReport/PlainReport';
import FavoriteList from '../FavoriteList/FavoriteList';
import ReadLaterList from '../ReadLaterList/ReadLaterList';

class Navigations extends Component {

  constructor(props) {
    super(props);
    state = {
      count: 0,
    };  
  }

  componentDidMount() {
    this.props.navigation.setParams({ increaseCount: this._increaseCount });
  }

  //Structure for the navigatin Drawer
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };

  _increaseCount = () => {
    this.setState({ count: this.state.count + 1 });
    alert(this.state.count)
  };

  render(){
    
    return(
      <SafeAreaView style={{ flexDirection: 'row' }}>
        <StatusBar barStyle="default"/>
       
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
// const Manage_Sub_StackNavigation  = createStackNavigator({
//   ManageSubscription: {
//     screen: ManageSubscription,
//     navigationOptions: {
//       header : null
//     }
//   },
// });
// const ViewPlan_StackNavigator = createStackNavigator({
//   ViewPlan : {
//     screen : ViewPlan,
//     navigationOptions: {
//       header: null,
//     }
//   },
// });
// const Subscribe_StackNavigator = createStackNavigator({
//   Subscribe : {
//     screen : Subscribe,
//     navigationOptions: {
//       header: null,
//     }
//   },
// });
// const Full_Report_StackNavigator = createStackNavigator({
//   FullReport : {
//     screen : FullReport,
//     navigationOptions: {
//       header: null,
//     }
//   },
// });
// const Ratios_StackNavigator = createStackNavigator({
//   Ratios : {
//     screen : Ratios,
//     navigationOptions: {
//       header: null,
//     }
//   },
// });
// const Cited_Authorities_StackNavigator = createStackNavigator({
//   CitedAuthorities : {
//     screen : CitedAuthorities,
//     navigationOptions: {
//       header: null,
//     }
//   },
// });
const PlainReport_StackNavigation = createStackNavigator({
  PlainReport: {
    screen: PlainReport,
    navigationOptions: {
      header: null,
    }
  }
});
const Favorite_List_StackNavigation = createStackNavigator({
  FavoriteList: {
    screen: FavoriteList,
    navigationOptions: {
      header: null,
    }
  }
});
const ReadLater_List_StackNavigation = createStackNavigator({
  ReadLaterList: {
    screen: ReadLaterList,
    navigationOptions: {
      header: null,
    }
  }
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
        headerForceInset: (Platform.OS === 'android') ? { top: 'never', bottom: 'never' } : null,
        headerStyle: {
          height: (Platform.OS === 'ios') ? 40 : 50,
          elevation: 0,
          shadowOpacity: 0,
          shadowRadius: 0,
          shadowOffset: {
              height: 0,
          },
          borderBottomWidth: 0,
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
      inactiveTintColor: theme.formBorderColor,
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
      
      return {
        headerLeft : 
          <Icon 
            onPress = {()=>navigation.openDrawer()}
            style = {styles.navToolbar} 
            name = "md-menu" size = {20}
          />,

        //   headerRight: (
        //     <TouchableOpacity
        //       style={styles.overflowBtn}  
        //       onPress={navigation.getParam('increaseCount')}>
        //       <Image
        //         onPress={navigation.getParam('increaseCount')}
        //         style = {styles.imageMore}
        //         source={require('../../assets/images/more.png')}
        //       />
        //     </TouchableOpacity>
              
        // ),
        headerForceInset: { top: 'never', bottom: 'never' },
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          shadowRadius: 0,
          shadowOffset: {
              height: 0,
          },
          borderBottomWidth: 0,

        }

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
  // ManageSubscription : {
  //   screen : Manage_Sub_StackNavigation,
  //   navigationOptions : {
  //     header: null
  //   }
  // },
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
  // ViewPlan : {
  //   screen : ViewPlan_StackNavigator,
  //   navigationOptions: {
  //     drawerLabel: "View Plan",
  //   }
  // },
  // Subscribe : {
  //   screen : Subscribe_StackNavigator,
  //   navigationOptions: {
  //     drawerLabel: "Subscribe",
  //   }
  // },
  // Ratios : {
  //   screen : Ratios_StackNavigator,
  //   navigationOptions: {
  //     drawerLabel: "Ratios",
  //   }
  // },
  // CitedAuthorities : {
  //   screen : Cited_Authorities_StackNavigator,
  //   navigationOptions: {
  //     drawerLabel: "Cited Authorities",
  //   }
  // },
  // FullReport : {
  //   screen : Full_Report_StackNavigator,
  //   navigationOptions: {
  //     drawerLabel: "Full Report",
  //   }
  // },
  PlainReport : {
    screen : PlainReport_StackNavigation,
    navigationOptions: {
      drawerLabel: "Plain Report",
    }
  },
  FavoriteList : {
    screen : Favorite_List_StackNavigation,
    navigationOptions: {
      drawerLabel: "Favorite List",
    }
  },
  ReadLaterList : {
    screen : ReadLater_List_StackNavigation,
    navigationOptions: {
      drawerLabel: "Read Later List",
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