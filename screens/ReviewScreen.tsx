import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import StorageService from '../utils/StorageService'
import ReviewItemScreen from './ReviewItemScreen';


type powerballItemProps = {
  powerBallNumber: number[],
  type: string
}

export default function ReviewScreen() {
  const [powerballItems, setPowerballItems] = useState<Array<powerballItemProps>>();

  useEffect(() => {

    const getPowerballItems = async () => {
      const powerBallNumbers = await StorageService.getItem(StorageService.POWERBALL_NUMBERS);
      const limitedPowerBallNumbers = powerBallNumbers.slice(0, 30);

      setPowerballItems(limitedPowerBallNumbers);
    }
    
    getPowerballItems();
  }, []);

  const deletePowerBallItemHandler = async (index:number) => {

    let powerBallItemsClone = [...powerballItems];

    powerBallItemsClone = powerBallItemsClone.filter((item, itemIndex) => itemIndex !== index);

    setPowerballItems(powerBallItemsClone);
    await StorageService.saveItem(StorageService.POWERBALL_NUMBERS, powerBallItemsClone);
  }

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
      <View className="m-2">
        <Text className="text-xl font-bold mb-3 text-sky-500 underline">
          Your numbers:
        </Text>
        {powerballItems?.map((item, index) => (
          <ReviewItemScreen 
            index={index}
            key={index}
            item={item}
            deletePowerBallItemHandler={deletePowerBallItemHandler}
          />
        ))}
      </View>
    </ScrollView>
  )
}