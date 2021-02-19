import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './src/navigation/AuthNavigator'
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Orientation from 'react-native-orientation-locker';
// import Firebase, { FirebaseContext } from './src/components/Firebase';
const AuthContext = React.createContext();


const fontConfig = {
  default: {
    regular: {
      fontFamily: 'CircularStd-Book',
      fontWeight: 'normal',
    }
  },
};

const theme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig),
};


const Stack = createStackNavigator();

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    Orientation.lockToPortrait();  
  }
  render() {
    return (
      // <FirebaseContext.Provider value={new Firebase()}>
      <PaperProvider theme={theme}>
        <AuthNavigator />        
      </PaperProvider>
      // </FirebaseContext.Provider>
    );
  }
}

export default App;