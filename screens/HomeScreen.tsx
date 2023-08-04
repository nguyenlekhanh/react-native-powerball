import { View, Text, TextInput, SafeAreaView, Button, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import AdsScreen from './AdsScreen';
import LanguageScreen from './Language';
import { ScrollView } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import StorageService from '../utils/StorageService';
import ErrorScreen from './ErrorScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAppTimerContext } from '../components/AppTimerProvider'; 
import Bubble from './Bubble';
import HeaderScreen from './HeaderScreen';
import ChooseGameScreen from './ChooseGameScreen';

type RootStackParamList = {};

type Props = NativeStackScreenProps<RootStackParamList>;

const HomeScreen = ({ route, navigation }: Props) => {
  const {t, i18n} = useTranslation();
  const { timeSpent, setTimeSpent } = useAppTimerContext();

  const checkPlayingFullAds = async () => {
    let showFullAds = false;
    if(timeSpent >= 600) {
      showFullAds = true;
      setTimeSpent(prevTimeSpend => 1);
    }
    return showFullAds;
  }
  
  // const learnHandler = async () => {
  //   const showFullAds = await checkPlayingFullAds();
  //   navigation.navigate("Learn", {showFullAds: showFullAds});
  // } 
  
  useEffect(() => {
    const getLanguage = async () => {
      const language = await StorageService.getItem(StorageService.APP_LANGUAGE);
      if(language) {
        i18n.changeLanguage(language?.language);
      }
    }
    getLanguage();
  }, []);

  const setHideErrorShowMyScoreHandler = () => {
    setshowErrorShowMyScore(false);
  }

  return (
    <SafeAreaView className="flex-columns items-center w-full h-max">
      <View className="w-full h-[91%]">
        <HeaderScreen />
        <ChooseGameScreen />
      </View>
        {/* <View className="w-full h-[84%]">
            <View className="h-[100%] bg-blue-700">
                <Bubble size={50} />
            </View>
        </View> */}

        <AdsScreen />
    </SafeAreaView>
  )
}


export default HomeScreen