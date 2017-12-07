import _ from 'lodash';
import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Text, Image, AsyncStorage } from 'react-native';
import { LinearGradient, AppLoading } from 'expo';

// import AppIntroSlider from 'react-native-app-intro-slider';
import AppIntroSlider from '../components/WelcomeSlides/AppIntroSlider.js';
import DefaultSlide from '../components/WelcomeSlides/DefaultSlide.js';

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  image: {
    width: 180,
    height: 180
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
    marginBottom: 40
  },
  title: {
    fontSize: 22,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16
  }
});

const slides = [
  {
    key: 'somethun',
    title: 'Create your profile',
    text: 'Introduce yourself to get started.',
    colors: ['#474973', '#ED808C']
  },
  {
    key: 'somethun1',
    title: 'Build your Vilij',
    text: 'Add trusted friends or discover like-minded parents near you.',
    colors: ['#474973', '#ED808C']
  },
  {
    key: 'somethun2',
    title: 'Schedule a sit',
    text: 'Reach out to your Vilijers for help and help them in return.',
    icon: 'ios-beer-outline',
    colors: ['#474973', '#ED808C']
  },
  {
    key: 'somethun3',
    title: 'Sit back and relax!',
    text: `We will take care of the rest - scheduling, reminders and urgent alerts.
    By continuing you agree to our Terms and Conditions`,
    icon: 'ios-beer-outline',
    colors: ['#474973', '#ED808C']
  }
];

export default class WelcomeScreen extends Component {
  state = { token: null };

  async componentWillMount() {
    let token = await AsyncStorage.getItem('fb_token');
    //this.setState({ token });
    if (token) {
      this.props.navigation.navigate('Home');
      this.setState({ token });
    } else {
      this.setState({ token: false });
    }
  }

  _renderItem = props => (
    <LinearGradient
      style={[
        styles.mainContent,
        {
          paddingTop: props.topSpacer,
          paddingBottom: props.bottomSpacer
        }
      ]}
      colors={props.colors}
      start={{ x: 0, y: 0.1 }}
      end={{ x: 0.1, y: 1 }}
    >
      <Ionicons
        style={{ backgroundColor: 'transparent' }}
        name={props.icon}
        size={200}
        color="white"
      />
      <View>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </LinearGradient>
  );

  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />;
    }

    _onDone = () => {
      // User finished the introduction. Show "real" app
      //this.props.navigation.navigate('Login');
      this.props.navigation.dispatch(navigateAction);
      //this.props.rootNavigation.navigation.navigate('Login');
    };
    return (
      <AppIntroSlider
        slides={slides}
        renderItem={this._renderItem}
        bottomButton
        onDone={this._onDone}
      />
    );
  }
}
