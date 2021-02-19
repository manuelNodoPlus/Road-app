import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home/Home.js';



const Stack = createStackNavigator()
export default function SignInStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{          
        headerTitleAlign: "center", 
        headerTitleStyle:{
          alignSelf: 'center', 
          textAlign: 'center'
          }
        }}>
        <Stack.Screen initialParams={{params:{statusbar:'dark-content'}}} options={{headerShown: false}} name="Home" component={Home} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}