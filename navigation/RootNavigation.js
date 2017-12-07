import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator, NavigationActions } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

// import WelcomeScreen from '../screens/WelcomeScreen';
import WelcomeScreenTwo from '../screens/WelcomeScreenTwo';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/LoginScreen';

const RootStackNavigator = StackNavigator(
  {
    // Welcome: {
    //   screen: WelcomeScreen,
    //   navigationOptions: ({ navigation }) => ({
    //     header: null
    //   })
    // },
    WelcomeScreenTwo: {
      screen: WelcomeScreenTwo,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    Signup: {
      screen: SignupScreen,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    Main: {
      screen: MainTabNavigator
    }
  },
  {
    lazy: true,
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal'
      }
    })
  }
);

const navigateAction = NavigationActions.navigate({
  routeName: 'Welcome',

  params: {},

  action: NavigationActions.navigate({ routeName: 'Login' })
});

export default class RootNavigator extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return <RootStackNavigator />;
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = ({ origin, data }) => {
    console.log(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`
    );
  };
}
