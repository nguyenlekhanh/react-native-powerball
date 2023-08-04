import { View } from 'react-native'
import React from 'react'
import { Text, Provider as PaperProvider } from 'react-native-paper';

const HeaderScreen = () => {
  return (
    <View className="h-[60px] w-full bg-white">
      <Text 
        className="text-xl font-bold"
      >Hello</Text>
    </View>
  )
}


export default HeaderScreen