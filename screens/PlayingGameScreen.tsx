import { View, Text } from 'react-native'
import React from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { powerballType, megaType } from '../utils/variables';
import PowerBallBubble from './PowerBallBubble';
import AdsScreen from './AdsScreen';

type RootStackParamList = {};

type Props = NativeStackScreenProps<RootStackParamList>;

const PlayingGameScreen = ({ route, navigation }: Props) => {
  const {gameType} = route.params;

  return (
    <View>
      <View className="w-full h-[95%]">
            <View className="h-[100%] bg-blue-700">
                {gameType == powerballType ? (
                    <PowerBallBubble size={50} 
                      powerNumberLength={69}
                    />
                  ) : (
                    <PowerBallBubble size={50} 
                      powerNumberLength={70}
                    />
                  )
                }
            </View>
            <AdsScreen />
        </View>
    </View>
  )
}

export default PlayingGameScreen