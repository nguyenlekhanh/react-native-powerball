import { View, Image } from 'react-native'
import React from 'react'

import SignoutScreen from './SignoutScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';

const HeaderScreen = () => {
  return (
    <View className="flex-row h-[60px] w-full bg-white justify-between">
      <View className="items-center justify-center ml-4 ">
        <Icon name="dollar-sign" size={40} color={"red"} />
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