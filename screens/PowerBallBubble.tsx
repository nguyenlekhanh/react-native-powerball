import React, { useState, useEffect } from 'react';
import { View, Image, Dimensions, ScrollView, Animated, TouchableOpacity, Text } from 'react-native';

// Import the bubble image
import bubbleImage from '../assets/imgs/bubble.png';
import CustomButton from './CustomButton';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native'

import PowerBallBubbleItem from "./PowerBallBubbleItem";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { powerballType, megaType } from '../utils/variables';
import StorageService from '../utils/StorageService';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface BubbleProps {
  size: number;
  powerNumberLength: number;
  powerSpecialNumberLength: number;
  gameType: string;
}

type positionProps = {
  x: number; y: number; 
  animValue: Animated.Value; 
  number: number;
  selected: boolean;
}

const PowerBallBubble: React.FC<BubbleProps> = ({ 
    size, powerNumberLength = 69, powerSpecialNumberLength = 26,
    gameType
  }) => {

  const navigation = useNavigation();

  const [positions, setPositions] = useState<positionProps[]>([]);
  const [numberArray, setNumberArray] = useState<number[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<number[]>([]);
  const [positionsSort, setPositionsSort] = useState<boolean>(true);

  const [positionsSpecialNumber, setPositionsSpecialNumber] = useState<positionProps[]>([]);
  const [numberSpecialArray, setNumberSpecialArray] = useState<number[]>([]);
  const [selectedSpecialNumber, setSelectedSpecialNumber] = useState<number[]>([]);
  const [positionsSpecialNumberSort, setPositionsSpecialNumberSort] = useState<boolean>(true);

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
        newPositions.push({ x, y, animValue, number, selected: false });

        // Break the loop if we reach the desired number of bubbles
        if (newPositions.length === numberLength) {
          break;
        }
      }
    }

    setPositions(newPositions);
  };

  useEffect(() => {
    
    setSelectedNumber([]);

    positions.map(item => {
      if(item.selected) {
        setSelectedNumber((prev) => [...prev, item.number]);
      }
    });
  }, [positions]);

  useEffect(() => {
    
    setSelectedSpecialNumber([]);

    positionsSpecialNumber.map(item => {
      if(item.selected) {
        setSelectedSpecialNumber((prev) => [...prev, item.number]);
      }
    });
  }, [positionsSpecialNumber]);

  const handleBubblePress = (index: number, positions: positionProps[], 
      setPositions: React.Dispatch<React.SetStateAction<positionProps[]>>,
      isSpecialNumber: boolean
    ) => {

    const lengthNumberSelected = isSpecialNumber ? 1 : 5;

    setPositions((prevPositions) => {

      const isSelected =  prevPositions[index].selected;

      if(!isSelected) {
        const selectedCount = prevPositions.filter((position) => position.selected).length;
        if(selectedCount < lengthNumberSelected) {
          const updatedPositions = prevPositions.map((position, i) =>
            i === index ? { ...position, selected: !position.selected } : position
          );

          return updatedPositions;
        }
      } else {
        const updatedPositions = prevPositions.map((position, i) =>
          i === index ? { ...position, selected: !position.selected } : position
        );

        return updatedPositions;
      }

      return prevPositions;
    });
  };

  // Function to shuffle the positions array using the Fisher-Yates algorithm
  const shuffleArray = (array: positionProps[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const sortNumberHandler = (isSpecialNumber: boolean) => {
    if(!isSpecialNumber) {
      setPositionsSort(!positionsSort);
      if(positionsSort) {
        const sortedPositions = [...positions].sort((a, b) => a.number - b.number);
        setPositions(sortedPositions);
      } else {
        const shuffledPositions = [...positions];
        shuffleArray(shuffledPositions);
        setPositions(shuffledPositions);
      }
    } else {
      setPositionsSpecialNumberSort(!positionsSpecialNumberSort);
      if(positionsSpecialNumberSort) {
        const sortedPositions = [...positionsSpecialNumber].sort((a, b) => a.number - b.number);
        setPositionsSpecialNumber(sortedPositions);
      } else {
        const shuffledPositions = [...positionsSpecialNumber];
        shuffleArray(shuffledPositions);
        setPositionsSpecialNumber(shuffledPositions);
      }
    }
  }

  function quickpick(existingNumbers: number[], numberRandomlength: number, totalLengthNumberToPick: number): number[] {
    const allNumbers = Array.from({ length: numberRandomlength }, (_, index) => index + 1);
    const availableNumbers = allNumbers.filter((num) => !existingNumbers.includes(num));
  
    const pickedNumbers: number[] = [];

    if(existingNumbers.length < totalLengthNumberToPick) {
      existingNumbers.map(number => {
        pickedNumbers.push(number);
      });
    }

    while (pickedNumbers.length < totalLengthNumberToPick) {
      const randomIndex = Math.floor(Math.random() * availableNumbers.length);
      const pickedNumber = availableNumbers.splice(randomIndex, 1)[0];
      pickedNumbers.push(pickedNumber);
    }
  
    return pickedNumbers;
  }

  const quickPickHandler = () => {
    const randomNumber = quickpick(selectedNumber, powerNumberLength, 5);
    setPositions((prevPositions) => {

      const updatedPositions = prevPositions.map((position, i) =>
        randomNumber.includes(position.number) ? { ...position, selected: true } : { ...position, selected: false }
      );


      return updatedPositions;
    });

    const randomSpecialNumber = quickpick(selectedSpecialNumber, powerSpecialNumberLength, 1);

    setPositionsSpecialNumber((prevPositions) => {

      const updatedPositions = prevPositions.map((position, i) =>
        randomSpecialNumber.includes(position.number) ? { ...position, selected: true } : { ...position, selected: false }
      );

      return updatedPositions;
    });
  }

  type powerballItemProps = {
    powerballNumber: number[],
    type: string
  }
  const reviewPowerBallHandler = async () => {
    if(selectedNumber.length >=5 && selectedSpecialNumber.length >=1) {
      const powerBallNumber = [...selectedNumber, ...selectedSpecialNumber];
      const powerBallItem = {
                      powerBallNumber: powerBallNumber,
                      type: gameType
                    };
      
      let powerballNumbers:any = await StorageService.getItem(StorageService.POWERBALL_NUMBERS);

      if(powerballNumbers == '') {
        powerballNumbers = [] as Array<powerballItemProps>;
      } else {
        powerballNumbers = powerballNumbers as Array<powerballItemProps>;
      }
      
      powerballNumbers.push(powerBallItem);
      
      await StorageService.saveItem(StorageService.POWERBALL_NUMBERS, powerballNumbers);

      navigation.navigate('Review');
    }
  }

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
      <View className="flex-row justify-between mb-2 mt-[-10px]">
        <View className="justify-center mt-7 flex-row">
          <Text className="pl-3 text-xl color-white mr-2">Choose 5 numbers</Text>
          <TouchableOpacity onPress={() => sortNumberHandler(false)}>
            <Icon name="sort" size={25} color={"white"} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="mr-1">
          <CustomButton 
              width={50}
              height={50}
              round={50}
              bgColor='transparent'
              onClickHandler={() => quickPickHandler()}
              text="Quick Pick"
              icon="bolt"
            />
        </TouchableOpacity>
      </View>
      <View className="flex-row ml-3 mt-[-10] align-center flex-wrap	">
        <Text className="text-xl font-bold color-white mt-1">Your Number: </Text>
        {selectedNumber.map((number, index) => (
          <Text key={index} className="text-center w-10 h-10 text-xl font-bold color-white 
                    mr-2 border rounded-full p-1 px-2 border-white">
            {number}
            </Text>
        ))}
      </View>
      <View className="mt-3 ml-1" 
        style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {positions.map((position, index) => (
          <PowerBallBubbleItem 
            key={index}
            index={index}
            position={position}
            size={size}
            selectedNumber={selectedNumber}
            handleBubblePress={handleBubblePress}
            positions={positions}
            setPositions={setPositions}
            isSpecialNumber={false}
          />
        ))}
      </View>

      <View className="flex-row mb-2 mt-10">
        <View className="justify-center mt-3 flex-row">
          <Text className="pl-3 text-xl color-white mr-2 mt-[-1]">Choose 1 special numbers</Text>
          <TouchableOpacity onPress={() => sortNumberHandler(true)}>
            <Icon name="sort" size={25} color={"white"} />
          </TouchableOpacity>
        </View>
        <View className="mt-2">
          {selectedSpecialNumber.map((number, index) => (
            <Text key={index} className="ml-3 text-center w-10 h-10 text-xl font-bold color-white 
                      mr-2 border rounded-full p-1 px-2 border-white">
              {number}
              </Text>
          ))}
        </View>
      </View>
      <View className=" ml-1" 
        style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {positionsSpecialNumber.map((position, index) => (
          <PowerBallBubbleItem 
            key={index}
            index={index}
            position={position}
            size={size}
            selectedNumber={selectedSpecialNumber}
            handleBubblePress={handleBubblePress}
            positions={positionsSpecialNumber}
            setPositions={setPositionsSpecialNumber}
            isSpecialNumber={true}
          />
        ))}
      </View>

      <View className="w-full mt-5 items-center">
        <CustomButton 
              width={240}
              height={50}
              round={50}
              bgColor={selectedNumber.length >=5 && selectedSpecialNumber.length >= 1 ? 'red' : 'gray'}
              onClickHandler={() => reviewPowerBallHandler()}
              text="Review"
              icon=""
            />
      </View>
    </ScrollView>
  );
};

export default PowerBallBubble;
