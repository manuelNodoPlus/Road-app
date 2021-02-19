import React, { useState, useEffect, createContext } from 'react';
import Firebase from '../core/Firebase/firebase';
import SignInStack from './SignInStack';
import SignOutStack from './SignOutStack';
import SplashScreen from 'react-native-splash-screen';
// import AppIntro from '../screens/AppIntro';

import {
  AsyncStorage,
} from 'react-native';
export const AuthContext = createContext(null)

var launchApp = function (value) {
  if (value == "true") {
    // start the app
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'app.Home', // unique ID registered with Navigation.registerScreen
        title: '', // title of the screen as appears in the nav bar (optional)
        navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
        navigatorButtons: {}, // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
      },
      passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
      animationType: 'slide-down' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
    });
  }
  else {
    AsyncStorage.setItem('notFirstLaunch', "true");
    // start the app
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'app.StartTour', // unique ID registered with Navigation.registerScreen
        title: '', // title of the screen as appears in the nav bar (optional)
        navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
        navigatorButtons: {}, // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
      },
      passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
      animationType: 'slide-down' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
    });
  }
}

export default function AuthNavigator() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [launchApp, setLaunchApp] = useState(true);
  // Handle user state changes
  function onAuthStateChanged(result) {
    setUser(result)
    if (initializing) setInitializing(false)
  }
  useEffect(() => {
    const authSubscriber = Firebase.auth.onAuthStateChanged(onAuthStateChanged) 
    SplashScreen.hide();
    AsyncStorage.getItem('notFirstLaunch').then((value) => {
      setLaunchApp(value);
      AsyncStorage.setItem('notFirstLaunch', "true");
    });
    // unsubscribe on unmount
    return authSubscriber
  }, [])
  if (initializing) {
    return null
  }

  function onChangeStateLaunchApp (value) {
    setLaunchApp(value)
  }

  return user && Firebase.auth.currentUser.emailVerified ? (
    <AuthContext.Provider value={user}>
      {/* {launchApp !== "true" ? (
        <AppIntro onAuthStateChanged={onChangeStateLaunchApp} />
      ) : ( */}
        <SignInStack />
      {/* )} */}
    </AuthContext.Provider>
  ) : (
      <SignOutStack />
    )
}