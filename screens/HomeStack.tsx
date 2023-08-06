import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from './HomeScreen';
import PlayingGameScreen from './PlayingGameScreen';
import ReviewScreen from './ReviewScreen';
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} 
        options={{headerShown: false}}
      />
      <Stack.Screen name="PlayingGameScreen" 
        component={PlayingGameScreen} 
        options={{ title: 'Playing Game' }}
      />
      <Stack.Screen 
          name="Review" 
          component={ReviewScreen} 
        />
    </Stack.Navigator>
  )
}

export default HomeStack