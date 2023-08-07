import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import StorageService from '../utils/StorageService'
import ReviewItemScreen from './ReviewItemScreen';
import { useNavigation } from '@react-navigation/native'
import CustomButton from './CustomButton';

type powerballItemProps = {
  id: string,
  powerBallNumber: number[],
  type: string
}

export default function ReviewScreen() {
  const navigation = useNavigation();
  const [powerballItems, setPowerballItems] = useState<Array<powerballItemProps>>();

  useEffect(() => {
    
    const getPowerballItems = async () => {
      const powerBallNumbers = await StorageService.getItem(StorageService.POWERBALL_NUMBERS);
      const limitedPowerBallNumbers = powerBallNumbers.slice(0, 30);

      setPowerballItems(limitedPowerBallNumbers);
    }

    const unsubscribe = navigation.addListener("focus", () => {
      getPowerballItems();
    });
    
    return unsubscribe;
  }, [navigation]);

  const deletePowerBallItemHandler = async (id:string) => {

    // console.log(id);

    setPowerballItems((prevData, indexItem) =>
      prevData.filter((item) => item.id !== id)
    );

    // const newData = [...powerballItems];
    // newData.splice(index, 1);
    // setPowerballItems(newData);

    // console.log(powerballItems);
    // let powerBallItemsClone = [...powerballItems];

    // powerBallItemsClone = powerBallItemsClone.filter((item) => 
    //   item.id !== id
    // );

    // console.log(powerBallItemsClone);
    // setPowerballItems(powerBallItemsClone);
    //await StorageService.saveItem(StorageService.POWERBALL_NUMBERS, powerBallItemsClone);
  }

  useEffect(() => {
    const savePowerballItems = async () => {
      if(powerballItems) {
        await StorageService.saveItem(StorageService.POWERBALL_NUMBERS, powerballItems);
      }
    };

    savePowerballItems();

  }, [powerballItems]);

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
      <View className="m-2">
        <Text className="text-xl font-bold mb-3 text-sky-500 underline">
          Your numbers: 
        </Text>
        {!powerballItems?.length && 
          <View>
            <Text className="text-xl text-center font-bold text-red-700">
              {!powerballItems?.length ? "You don't have any powerball" : ''}
            </Text>
            <TouchableOpacity className="items-center">
              <CustomButton 
                width={240}
                height={50}
                round={50}
                bgColor='#EF4444'
                onClickHandler={() => {navigation.navigate('HomeScreen')}}
                text="Play Now"
                icon=""
              />
            </TouchableOpacity>
          </View>
        }
        {powerballItems?.map((item, index) => (
          <ReviewItemScreen 
            index={index}
            key={item.id}
            item={item}
            deletePowerBallItemHandler={deletePowerBallItemHandler}
          />
        ))}
      </View>
    </ScrollView>
  )
}