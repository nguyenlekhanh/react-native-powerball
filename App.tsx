/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {Button, SafeAreaView, Text, View} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';


import "./locales/i18n";

import Toast from 'react-native-toast-message';
import { toastConfig } from './configs/toastConfig';
import AppTimerProvider from './components/AppTimerProvider';
import { MainBottomTabNavigator } from './navigation/BottomTab';


function App(): JSX.Element {
  return (
    <>
      <AppTimerProvider>
        <NavigationContainer>
          <MainBottomTabNavigator />
        </NavigationContainer>
      </AppTimerProvider>
      <Toast config={toastConfig} />
    </>
  );
}

export default App;
