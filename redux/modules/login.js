import { AsyncStorage } from 'react-native'; // Local Storage - Key value pair
import { Facebook } from 'expo';

//Method to use Async Storage:
//Not a synchronous call.
//AsyncStorage.setItem('fb_token', token);
//AsyncStorage.getItem('fb_token');

export const FACEBOOK_LOGIN_SUCCESS = 'FACEBOOK_LOGIN_SUCCESS';
export const FACEBOOK_LOGIN_FAIL = 'FACEBOOK_LOGIN_FAIL';

//ACTION CREATORS

export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');
  if (token) {
    // Dispatch an action - FB Login done
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    //Start up FB Login process
    //Passing parameters from the parent function to the helper fuction
    doFacebookLogin(dispatch);
  }
};

// Helper Function
const doFacebookLogin = async dispatch => {
  // A token is retuened when the user has successfully logged in which gets stored in the result.
  // I have destructured the result as it returns two properties 'type' and 'token'
  //The type property returns the status - what happened with the permissions - Whether the login was sucessful or not
  let { type, token } = await Facebook.logInWithReadPermissionsAsync(
    '1808972019114012',
    { permissions: ['public_profile'] }
  );

  // If the Login Fails
  //dispatch - thunk allows us to make asynchronous calls
  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }
  //the token is coming from the facebook Authentication process from above
  //Using await here to check if the Login was successful. Only if Login is succesful the dispatch method is called
  await AsyncStorage.setItem('fb_token', token);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};

//Reducer

export default function reducer(state = {}, action) {
  switch (action.type) {
    case FACEBOOK_LOGIN_SUCCESS:
      return { token: action.payload };

    case FACEBOOK_LOGIN_FAIL:
      return { token: null };

    default:
      return state;
  }
}
