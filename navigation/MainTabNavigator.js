import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
// import LinksScreen from '../screens/LinksScreen';
// import SettingsScreen from '../screens/SettingsScreen';
import VillagerScreen from '../screens/VillagerScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import CalendarScreen from '../screens/CalendarScreen';
import ChatScreen from '../screens/ChatScreen';
// import WelcomeScreen from '../screens/WelcomeScreen';
// import LoginScreen from '../screens/LoginScreen';

export default TabNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Vilijers: {
      screen: VillagerScreen
    },
    Discover: {
      screen: DiscoverScreen
    },
    Calendar: {
      screen: CalendarScreen
    },
    // Welcome: {
    //   screen: WelcomeScreen
    // },
    // Login: {
    //   screen: LoginScreen
    // },
    Chat: {
      screen: ChatScreen
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName =
              Platform.OS === 'ios'
                ? `ios-home${focused ? '' : '-outline'}`
                : 'md-home';
            break;
          case 'Vilijers':
            iconName =
              Platform.OS === 'ios'
                ? `ios-people${focused ? '' : '-outline'}`
                : 'md-people';
            break;
          case 'Discover':
            iconName =
              Platform.OS === 'ios'
                ? `ios-search${focused ? '' : '-outline'}`
                : 'md-search';
            break;
          case 'Calendar':
            iconName =
              Platform.OS === 'ios'
                ? `ios-calendar${focused ? '' : '-outline'}`
                : 'md-calendar';
            break;
          // case 'Welcome':
          //   iconName =
          //     Platform.OS === 'ios'
          //       ? `ios-calendar${focused ? '' : '-outline'}`
          //       : 'md-calendar';
          //   break;
          // case 'Login':
          //   iconName =
          //     Platform.OS === 'ios'
          //       ? `ios-calendar${focused ? '' : '-outline'}`
          //       : 'md-calendar';
          //   break;
          case 'Chat':
            iconName =
              Platform.OS === 'ios'
                ? `ios-chatbubbles${focused ? '' : '-outline'}`
                : 'md-chatbubbles';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      }
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false
  }
);
