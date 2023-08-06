import { View, Text, Image, TouchableOpacity, Animated } from 'react-native'
import React, { memo } from 'react'
import bubbleImage from '../assets/imgs/bubble.png';

export type BubbleItemType = {
  x: number; y: number; 
  animValue: Animated.Value; 
  number: number;
  selected: boolean;
}

type PropsType = {
  index: number,
  position: BubbleItemType,
  size: number,
  selectedNumber: number[],
  handleBubblePress: (
    index: number, 
    positions: BubbleItemType[], 
    setPositions: React.Dispatch<React.SetStateAction<BubbleItemType[]>>,
    isSpecialNumber: boolean
  ) => void,
  positions: BubbleItemType[], 
  setPositions: React.Dispatch<React.SetStateAction<BubbleItemType[]>>,
  isSpecialNumber: boolean
}

const PowerBallBubbleItem = ({
      index, position, size, 
      selectedNumber, 
      handleBubblePress,
      positions,
      setPositions,
      isSpecialNumber
    }: PropsType
  ) => {
  
    return (
      <TouchableOpacity key={index} 
        onPress={() => handleBubblePress(index, positions, setPositions, isSpecialNumber)}
      >

        {/* Use the Image component for the bubble */}
        <Image source={bubbleImage} style={{ width: size, height: size }} />
        <View style={{ position: 'absolute', top: size / 2 - 12, left: size / 2 - 12 }}>
            <Text
              className="text-xl font-bold mt-[-4]"
              style={{
                paddingLeft: position.number < 10 ? 6 : 0,
                textDecorationLine: position.selected ? 'underline' : 'none',
                fontSize: position.selected ? 22 : 20,
                color: position.selected ? "red" : "black",
              }}
            >
              {position.number}
              {/* {JSON.stringify(position.selected)} */}
            </Text>
        </View>
      </TouchableOpacity>
  )
}

function areItemsEqual({ position: prevItem }: PropsType, { position: nextItem }: PropsType) {
  return Object.keys(prevItem).every(key => {
      return prevItem[key as keyof BubbleItemType] === nextItem[key as keyof BubbleItemType]
  })
}

const MemoizedCartLineItem = memo<typeof PowerBallBubbleItem>(PowerBallBubbleItem, areItemsEqual)

export default MemoizedCartLineItem