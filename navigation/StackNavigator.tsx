import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from '../screens/HomeScreen';
import SignoutScreen from '../screens/SignoutScreen';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
        {/* <Stack.Screen name="Login" component={LoginScreen} 
          options={{
            title: 'Login',
            // headerStyle: {
            //   backgroundColor: 'transparent',
            // },
            // headerTintColor: '#fff',
            // headerTitleStyle: {
            //   fontWeight: 'bold',
            // },
            headerTitleAlign: 'center'
          }}
        /> */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            headerRight: () => (
              <SignoutScreen />
            ),
          }}
        />

      </Stack.Navigator>
  );
}

const ContactStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

export { MainStackNavigator, ContactStackNavigator };