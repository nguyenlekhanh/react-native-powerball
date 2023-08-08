import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { powerballType } from '../utils/variables';
import Icon from 'react-native-vector-icons/FontAwesome5';

type ItemProps = {powerBallNumber: number[], type: string};

const ShareItemScreen = ({powerBallNumber, type}: ItemProps) => {

  return (
    <View className="flex-row flex-wrap">
      {powerBallNumber.map((number, numberIndex) => (
        <Text key={numberIndex}
          className="text-center w-8 h-8 text-base font-bold 
                  mr-1 border rounded-full p-1 px-1 border-sky-500
                  text-sky-500 mb-2
                  "
          style={{
            borderColor: numberIndex === powerBallNumber.length - 1 ? 'red' : '#00A5E9',
            color: numberIndex === powerBallNumber.length - 1 ? 'red' : '#00A5E9'
          }}
        >
          {number}
        </Text>
      ))}

      <Text 
      className="text-base text-sky-500 pt-1"
      >
        {type == powerballType ? "- PowerBall" : "- Mega"}
      </Text>
      {/* <TouchableOpacity
          onPress={() => {}}
          className="pt-1 pl-2"
        >
        <Icon name="thumbs-up" size={20} color={"blue"} />
      </TouchableOpacity>
      <TouchableOpacity
          onPress={() => {}}
          className="pt-1 pl-2"
        >
        <Icon name="thumbs-down" size={20} color={"blue"} />
      </TouchableOpacity> */}
    </View>
  )
}

export default ShareItemScreen