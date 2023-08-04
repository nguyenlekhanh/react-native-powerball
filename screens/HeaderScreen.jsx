import { View, Image } from 'react-native'
import React from 'react'

import SignoutScreen from './SignoutScreen';
import lottoLogoImage from '../assets/imgs/lotte_logo1.png';

const HeaderScreen = () => {
  return (
    <View className="flex-row h-[60px] w-full bg-white justify-between">
      <View className="items-center justify-center ml-2 ">
        <Image source={lottoLogoImage} style={{ width: 55, height: 55 }} 
          className="items-center justify-center rounded-full drop-shadow-2xl"
        />
      </View>
      <View className="justify-center mt-2">
        <SignoutScreen />
      </View>
      {/* <Text 
        className="text-xl font-bold"
      >Hello</Text> */}
    </View>
  )
}


export default HeaderScreen