import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import powerBallImage from '../assets/imgs/Powerball_logo.png';
import megaMillionsImage from '../assets/imgs/Mega_Millions.png';
import CustomButton from './CustomButton';


const ChooseGameScreen = () => {
  return (
    <View className="my-3 mt-5 mx-3">
      <View className="rounded bg-white shadow-2xl shadow-gray-600">
        <View className="items-center w-full mb-5">
          <Image source={powerBallImage} className="mr-2 mt-5"/>

          <CustomButton 
            width={240}
            height={50}
            round={50}
            bgColor='#EF4444'
          />
        </View>
      </View>

      <View className="mt-5 rounded bg-white  shadow-2xl shadow-gray-600">
        <View className="items-center w-full mb-5">
          <Image source={megaMillionsImage} className="mr-2 mt-5"/>

          <CustomButton 
            width={240}
            height={50}
            round={50}
            bgColor='#EF4444'
          />
        </View>
      </View>
    </View>
  )
}

export default ChooseGameScreen