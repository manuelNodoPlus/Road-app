import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Authentication/Login';
// import Register from '../screens/Register'
// import Reset from '../screens/Reset'
const Stack = createStackNavigator()
export default function SignOutStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Login" component={Login} 
            options={{
                title: 'My home',
                headerStyle: {
                backgroundColor: 'white',
                shadowOpacity: 0,
                elevation: 0,
                },
                headerTintColor: '#0000',
                headerTitleStyle: {
                fontWeight: 'bold',
                },
                headerShown: false
            }}
        />
        {/* <Stack.Screen name="Register" component={Register} 
            options={{
                title: 'My home',
                headerStyle: {
                backgroundColor: 'white',
                shadowOpacity: 0,
                elevation: 0,
                },
                headerTintColor: '#0000',
                headerTitleStyle: {
                fontWeight: 'bold',
                },
                headerShown: false
            }}
        />
        <Stack.Screen name="Reset" component={Reset} 
            options={{
                title: 'My home',
                headerStyle: {
                backgroundColor: 'white',
                shadowOpacity: 0,
                elevation: 0,
                },
                headerTintColor: '#0000',
                headerTitleStyle: {
                fontWeight: 'bold',
                },
                headerShown: false
            }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}