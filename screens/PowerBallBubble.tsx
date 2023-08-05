import React, { useState, useEffect } from 'react';
import { View, Image, Dimensions, ScrollView, Animated, TouchableOpacity, Text } from 'react-native';

// Import the bubble image
import bubbleImage from '../assets/imgs/bubble.png';
import CustomButton from './CustomButton';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { powerballType, megaType } from '../utils/variables';

interface BubbleProps {
  size: number;
  powerNumberLength: number;
  powerSpecialNumberLength: number;
}

type positionProps = {
  x: number; y: number; animValue: Animated.Value; number: number
}

const PowerBallBubble: React.FC<BubbleProps> = ({ 
    size, powerNumberLength = 69, powerSpecialNumberLength = 26
  }) => {

  const [positions, setPositions] = useState<positionProps[]>([]);
  const [numberArray, setNumberArray] = useState<number[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<number[]>([]);

  const [positionsSpecialNumber, setPositionsSpecialNumber] = useState<positionProps[]>([]);
  const [numberSpecialArray, setNumberSpecialArray] = useState<number[]>([]);

  useEffect(() => {
    generateNumberArray(powerNumberLength, 1);
    generateNumberArray(powerSpecialNumberLength, 2);
  }, []);

  useEffect(() => {
    generatePositions(powerNumberLength, setPositions, 1);
  }, [numberArray]);

  useEffect(() => {
    generatePositions(powerSpecialNumberLength, setPositionsSpecialNumber, 2);
  }, [numberSpecialArray]);

  const generateNumberArray = (numberLength: number, ballType:number) => {
    // Create an array with numbers from 1 to 69
    const numbers = Array.from({ length: numberLength }, (_, index) => index + 1);

    // Shuffle the array randomly
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    
    if(ballType == 1) {
      setNumberArray(numbers);
    } else {
      setNumberSpecialArray(numbers);
    }
  };

  const generatePositions = (numberLength: number, 
      setPositions: React.Dispatch<React.SetStateAction<positionProps[]>>,
      ballType:number
    ) => {

    const bubblesPerRow = 5; // Number of bubbles per row
    const bubblesPerColumn = Math.ceil(numberLength / bubblesPerRow); // Calculate the number of rows required

    const gridWidth = windowWidth / bubblesPerRow;
    const gridHeight = windowHeight / bubblesPerColumn;

    const newPositions = [];

    for (let row = 0; row < bubblesPerColumn; row++) {
      for (let col = 0; col < bubblesPerRow; col++) {
        const x = col * gridWidth + (gridWidth - size) / 2;
        const y = row * gridHeight + (gridHeight - size) / 2;

        // Pop a number from the shuffled array for each bubble
        let number;
        if(ballType==1) {
          number = numberArray.pop();
        } else {
          number = numberSpecialArray.pop();
        }

        // Create a new Animated.Value with initial value of 0
        const animValue = new Animated.Value(0);

        // Start the animation loop for each bubble
        Animated.loop(
          Animated.sequence([
            Animated.timing(animValue, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(animValue, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }),
          ])
        ).start();

        // Add the position, Animated.Value, and the number to the array
        newPositions.push({ x, y, animValue, number });

        // Break the loop if we reach the desired number of bubbles
        if (newPositions.length === numberLength) {
          break;
        }
      }
    }

    setPositions(newPositions);
  };

  const handleBubblePress = (index: number, positions: positionProps[], 
      setPositions: React.Dispatch<React.SetStateAction<positionProps[]>>
    ) => {

    const clickedNumber = positions[index].number;
    const isSelected = selectedNumber.includes(clickedNumber);

    if (isSelected) {
      // If the clicked bubble is already selected, remove it from the selectedNumber array
      setSelectedNumber((prev) => prev.filter((num) => num !== clickedNumber));
    } else {
      // If the clicked bubble is not selected, add it to the selectedNumber array
      if (!selectedNumber || selectedNumber.length < 5) {
        setSelectedNumber((prev) => [...prev, clickedNumber]);
      }
    }

      // Toggle the showNumber state for the clicked bubble
    // const updatedPositions = positions.map((position, i) => {
    //   if (i === index) {
    //     return { ...position, showNumber: !position.showNumber };
    //   } else {
    //     return position;
    //   }
    // });
    // setPositions(updatedPositions);

    
  };


  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
      <View className="flex-row justify-between mb-2 mt-[-10px]">
        <View className="justify-center mt-3">
          <Text className="pl-3 text-xl color-white">Choose 5 numbers</Text>
        </View>
        <TouchableOpacity className="mr-1">
          <CustomButton 
              width={50}
              height={50}
              round={50}
              bgColor='transparent'
              onClickHandler={() => {}}
              text="Quick Pick"
              icon="bolt"
            />
        </TouchableOpacity>
      </View>
      <View className="" style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {positions.map((position, index) => (
          <TouchableOpacity key={index} onPress={() => handleBubblePress(index, positions, setPositions)}>
            <Animated.View
              style={{
                marginLeft: 8,
                marginTop: 8,
                transform: [
                  {
                    translateY: position.animValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 10], // Change this value to adjust the vertical movement range
                    }),
                  },
                ],
              }}
            >
              {/* Use the Image component for the bubble */}
              <Image source={bubbleImage} style={{ width: size, height: size }} />
              {selectedNumber.includes(position.number) && (
                <View style={{ position: 'absolute', top: size / 2 - 12, left: size / 2 - 12 }}>
                  <Text
                    className="text-xl font-bold mt-[-4]"
                    style={{paddingLeft: position.number < 10 ? 6 : 0}}
                  >
                    {position.number}
                  </Text>
                </View>
              )}
              {/* {position.showNumber && (
                <View style={{ position: 'absolute', top: size / 2 - 12, left: size / 2 - 12 }}>
                  <Text className="text-xl font-bold mt-[-4]"
                    style={{paddingLeft: position.number < 10 ? 6 : 0}}
                  >
                    {position.number}
                  </Text>
                </View>
              )} */}
            </Animated.View>
          </TouchableOpacity>
        ))}
      </View>

      <View className="flex-row justify-between mb-2 mt-10">
        <View className="justify-center mt-3">
          <Text className="pl-3 text-xl color-white">Choose 1 special numbers</Text>
        </View>
      </View>
      <View className="" style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {positionsSpecialNumber.map((position, index) => (
          <TouchableOpacity key={index} onPress={() => handleBubblePress(index, positionsSpecialNumber, setPositionsSpecialNumber)}>
            <Animated.View
              style={{
                marginLeft: 8,
                marginTop: 8,
                transform: [
                  {
                    translateY: position.animValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 10], // Change this value to adjust the vertical movement range
                    }),
                  },
                ],
              }}
            >
              {/* Use the Image component for the bubble */}
              <Image source={bubbleImage} style={{ width: size, height: size }} />
              {position.showNumber && (
                <View style={{ position: 'absolute', top: size / 2 - 12, left: size / 2 - 12 }}>
                  <Text className="text-xl font-bold mt-[-4]"
                    style={{paddingLeft: position.number < 10 ? 6 : 0}}
                  >
                    {position.number}
                  </Text>
                </View>
              )}
            </Animated.View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default PowerBallBubble;
