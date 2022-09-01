import { initializeApp } from "firebase/app";

import { getMessaging } from "firebase/messaging/sw";
import { onMessage, getToken } from "firebase/messaging";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = {
  apiKey: "AIzaSyAYQupdn3v1ouDqPtkexSnexcUwdN3h1PQ",
  authDomain: "test-basestation.firebaseapp.com",
  projectId: "test-basestation",
  storageBucket: "test-basestation.appspot.com",
  messagingSenderId: "767954132401",
  appId: "1:767954132401:web:6db7d54ce12a374936f190",
  measurementId: "G-ZVPXK49HK1",
};

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.

const app = initializeApp(firebaseApp);

const messaging = getMessaging(app);

export const getTokenvalue = (setTokenFound) => {
  return getToken(messaging, {
    vapidKey:
      "BJqdRwfi1Nkg8fqRsuwIBrHKa43OQ4e96jcFysJ1oVYovlLwucJZGole2J6Dl14auBtKYFuaDGDLGJzTlhGfV34",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
