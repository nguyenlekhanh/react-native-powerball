import { View, Text, Image, TouchableOpacity, Animated } from 'react-native'
import React, { memo } from 'react'
import { powerballType, megaType } from '../utils/variables'
import Icon from 'react-native-vector-icons/FontAwesome5';

type powerballItemProps = {
  powerBallNumber: number[],
  type: string
}

type PropsType = {
  index: number,
  item: powerballItemProps,
  deletePowerBallItemHandler: (index:number) => void
}

const ReviewItemScreen = ({
      index,
      item,
      deletePowerBallItemHandler
    }: PropsType
  ) => {
  
  return (
    <View
      className="flex-row "
    >
      <View className="pt-2 pr-2">
        <TouchableOpacity
          onPress={() => deletePowerBallItemHandler(index)}
        >
          <Icon name="trash" size={20} color={"red"} />
        </TouchableOpacity>
      </View>

      {item.powerBallNumber.map((number, numberIndex) => (
        <Text key={numberIndex}
          className="text-center w-10 h-10 text-xl font-bold 
                  mr-2 border rounded-full p-1 px-2 border-sky-500
                  text-sky-500 mb-2
                  "
          style={{
            borderColor: numberIndex === item.powerBallNumber.length - 1 ? 'red' : '#00A5E9',
            color: numberIndex === item.powerBallNumber.length - 1 ? 'red' : '#00A5E9'
          }}
        >
          {number}
        </Text>
      ))}

      <Text 
      className="text-lg text-sky-500 pt-1"
      >
        {item.type == powerballType ? "Power Ball" : "Mega"}
      </Text>
    </View>
  )
}

function areItemsEqual({ item: prevItem }: PropsType, { item: nextItem }: PropsType) {
  return Object.keys(prevItem).every(key => {
      return prevItem[key as keyof powerballItemProps] === nextItem[key as keyof powerballItemProps]
  })
}

const MemoizedCartLineItem = memo<typeof ReviewItemScreen>(ReviewItemScreen, areItemsEqual)

export default MemoizedCartLineItem