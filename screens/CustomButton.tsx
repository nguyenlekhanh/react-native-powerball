import React, { useState, useEffect } from 'react';
import { View, Dimensions, TouchableOpacity, Text } from 'react-native';


interface BubbleProps {
  width: number;
  height: number;
  round: number;
  bgColor: string
}

const CustomButton: React.FC<BubbleProps> = ({ width, height, round, bgColor }) => {
  return (
    <TouchableOpacity className="mt-5"
      style={{width: width}}
    >
      <View className="items-center justify-center"
        style={{height: height, borderRadius: round, backgroundColor: bgColor}}
      >
        <Text className="color-white text-2xl font-bold">Play Now</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
