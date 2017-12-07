import React from 'react';
import { View, Button, Text } from 'react-native';
import * as firebase from 'firebase';
import MainTaNavigator from '../navigation/MainTabNavigator';
import { StackNavigator } from 'react-navigation';
import { FormLabel, FormInput } from 'react-native-elements';

export default class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false
    };
  }

  onSignUp() {
    this.setState({ error: '', loading: true });
    const { email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ error: '', loading: false });
        this.props.navigation.navigate('Home');
      })
      .catch(() => {
        this.setState({ error: 'Authentication failed', loading: false });
      });
  }

  renderButtonOrLoading() {
    if (this.state.loading) {
      return <Text> Loading </Text>;
    }
    return (
      <View>
        <Button onPress={this.onSignUp.bind(this)} title="Sign up" />
      </View>
    );
  }
  render() {
    return (
      <View>
        <FormLabel>Email</FormLabel>
        <FormInput
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          placeholder="urvi@urvi.com"
        />
        <FormLabel>Password</FormLabel>
        <FormInput
          value={this.state.password}
          secureTextEntry
          placeholder="*******"
          onChangeText={password => this.setState({ password })}
        />
        <Text>{this.state.error}</Text>
        {this.renderButtonOrLoading()}
      </View>
    );
  }
}
