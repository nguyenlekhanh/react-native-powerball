import React, { useState, useEffect } from 'react';
import { View, Dimensions, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface BubbleProps {
  width: number;
  height: number;
  round: number;
  bgColor: string;
  onClickHandler: () => void;
  text: string;
  icon: string;
}

const CustomButton: React.FC<BubbleProps> = ({ 
      width, height, round, bgColor, onClickHandler, text, icon
  }) => {
  return (
    <TouchableOpacity className="mt-5"
      style={{width: width}}
      onPress={() => onClickHandler()}
    >
      <View className="items-center justify-center"
        style={{height: height, borderRadius: round, backgroundColor: bgColor}}
      >
        {icon ? ( 
            <Icon name={icon} size={25} color="white" />
          ) : (
            <Text className="color-white text-2xl font-bold">{text}</Text>
          )
        }
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
