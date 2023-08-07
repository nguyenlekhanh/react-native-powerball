import { View, Text, Image, TouchableOpacity, Animated } from 'react-native'
import React, { memo } from 'react'
import { powerballType, megaType } from '../utils/variables'
import Icon from 'react-native-vector-icons/FontAwesome5';

type powerballItemProps = {
  id: string,
  powerBallNumber: number[],
  type: string
}

type PropsType = {
  index: number,
  item: powerballItemProps,
  deletePowerBallItemHandler: (id:string) => void
}

const ReviewItemScreen = ({
      index,
      item,
      deletePowerBallItemHandler
    }: PropsType
  ) => {
  
  return (
    <View
      className="flex-row flex-wrap"
    >
      <View className="pt-1 pr-2">
        <TouchableOpacity
          onPress={() => deletePowerBallItemHandler(item.id)}
        >
          <Icon name="trash" size={20} color={"red"} />
        </TouchableOpacity>
      </View>

      {item.powerBallNumber.map((number, numberIndex) => (
        <Text key={numberIndex}
          className="text-center w-8 h-8 text-base font-bold 
                  mr-1 border rounded-full p-1 px-1 border-sky-500
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
      className="text-base text-sky-500 pt-1"
      >
        {item.type == powerballType ? "- PowerBall" : "- Mega"}
      </Text>
      <TouchableOpacity
          onPress={() => {}}
          className="pt-1 pl-2"
        >
          <Icon name="users" size={20} color={"red"} />
        </TouchableOpacity>
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