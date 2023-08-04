import React, { useState, useEffect } from 'react';
import { View, Image, Dimensions, ScrollView, Animated } from 'react-native';

// Import the bubble image
import bubbleImage from '../assets/bubble.png';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface BubbleProps {
  size: number;
}

const Bubble: React.FC<BubbleProps> = ({ size }) => {
  const [positions, setPositions] = useState<{ x: number; y: number; animValue: Animated.Value }[]>([]);

  useEffect(() => {
    generatePositions();
  }, []);

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

        // Add the position and Animated.Value to the array
        newPositions.push({ x, y, animValue });

        // Break the loop if we reach the desired number of bubbles
        if (newPositions.length === 69) {
          break;
        }
      }
    }

    setPositions(newPositions);
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {positions.map((position, index) => (
          <Animated.View
            key={index}
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
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Bubble;
