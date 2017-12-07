import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../redux/modules/login.js';

class LoginScreen extends Component {
  componentDidMount() {
    this.props.facebookLogin();
    AsyncStorage.removeItem('fb_token');
    this.onLoginComplete(this.props);
  }

  //When the component is just about to re-render with
  componentWillReceiveProps(nextProps) {
    this.onLoginComplete(nextProps);
  }

  onLoginComplete(props) {
    if (props.token) {
      this.props.navigation.navigate('Home');
    }
  }

  render() {
    return <View />;
  }
}

function mapStateToProps({ login }) {
  return { token: login.token };
}

export default connect(mapStateToProps, actions)(LoginScreen);
