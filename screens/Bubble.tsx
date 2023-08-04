import React, { useState, useEffect } from 'react';
import { View, Image, Dimensions, ScrollView, Animated, TouchableOpacity, Text } from 'react-native';

// Import the bubble image
import bubbleImage from '../assets/imgs/bubble.png';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface BubbleProps {
  size: number;
}

const Bubble: React.FC<BubbleProps> = ({ size }) => {
  const [positions, setPositions] = useState<{ x: number; y: number; animValue: Animated.Value; number: number }[]>([]);
  const [numberArray, setNumberArray] = useState<number[]>([]);

  useEffect(() => {
    generateNumberArray();
    generatePositions();
  }, []);

  const generateNumberArray = () => {
    // Create an array with numbers from 1 to 69
    const numbers = Array.from({ length: 69 }, (_, index) => index + 1);

    // Shuffle the array randomly
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    setNumberArray(numbers);
  };

  const generatePositions = () => {
    const bubblesPerRow = 5; // Number of bubbles per row
    const bubblesPerColumn = Math.ceil(69 / bubblesPerRow); // Calculate the number of rows required

    const gridWidth = windowWidth / bubblesPerRow;
    const gridHeight = windowHeight / bubblesPerColumn;

    const newPositions = [];

    for (let row = 0; row < bubblesPerColumn; row++) {
      for (let col = 0; col < bubblesPerRow; col++) {
        const x = col * gridWidth + (gridWidth - size) / 2;
        const y = row * gridHeight + (gridHeight - size) / 2;

        // Pop a number from the shuffled array for each bubble
        const number = numberArray.pop();

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
        if (newPositions.length === 69) {
          break;
        }
      }
    }

    setPositions(newPositions);
  };

  const handleBubblePress = (index: number) => {
    // Toggle the showNumber state for the clicked bubble
    const updatedPositions = positions.map((position, i) => {
      if (i === index) {
        return { ...position, showNumber: !position.showNumber };
      } else {
        return position;
      }
    });
    setPositions(updatedPositions);
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
      <View><Text>Choose 5 numbers</Text></View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {positions.map((position, index) => (
          <TouchableOpacity key={index} onPress={() => handleBubblePress(index)}>
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
                  <Text>{position.number}</Text>
                </View>
              )}
            </Animated.View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default Bubble;
