import { Permissions, Notifications } from 'expo';
import * as firebase from 'firebase';

firebase.initializeApp({
  apiKey: 'AIzaSyCIKTiafUSSGZQPw7rCxBrzve7fzSSPob0',
  authDomain: 'vilijpersonal.firebaseapp.com',
  databaseURL: 'https://vilijpersonal.firebaseio.com',
  projectId: 'vilijpersonal',
  storageBucket: 'vilijpersonal.appspot.com',
  messagingSenderId: '891487352787'
});

export default (async function registerForPushNotificationsAsync() {
  // Android remote notification permissions are granted during the app
  // install, so this will only ask on iOS
  let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

  // Stop here if the user did not grant permissions
  if (status !== 'granted') {
    return;
  }
  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  userID = firebase.auth().currentUser.uid;

  firebase
    .database()
    .ref('/users/' + userID)
    .update({ token: token });

  // // POST the token to our backend so we can use it to send pushes from there
  // return fetch(PUSH_ENDPOINT, {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     token: {
  //       value: token,
  //     },
  //   }),
  // });
});

// import { Constants, Permissions, Notifications } from 'expo';

// // Example server, implemented in Rails: https://git.io/vKHKv
// const PUSH_ENDPOINT = 'https://expo-push-server.herokuapp.com/tokens';

// export default (async function registerForPushNotificationsAsync() {
//   // Remote notifications do not work in simulators, only on device
//   if (!Constants.isDevice) {
//     return;
//   }

//   // Android remote notification permissions are granted during the app
//   // install, so this will only ask on iOS
//   let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

//   // Stop here if the user did not grant permissions
//   if (status !== 'granted') {
//     return;
//   }

//   // Get the token that uniquely identifies this device
//   let token = await Notifications.getExpoPushTokenAsync();

//   // POST the token to our backend so we can use it to send pushes from there
//   return fetch(PUSH_ENDPOINT, {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       token: {
//         value: token
//       }
//     })
//   });
// });
