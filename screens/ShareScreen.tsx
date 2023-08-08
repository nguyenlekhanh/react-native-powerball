import { View, Text, Alert, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUserStore } from '../app/store.zustand.user';
import { getPowerball } from '../utils/updateData';
import ShareItemScreen from './ShareItemScreen';
import HeaderScreen from './HeaderScreen';
import { useNavigation } from '@react-navigation/native'

const ShareScreen = () => {
  const navigation = useNavigation();
  const token = useUserStore((state) => state.token);
  const [powerballNumbers, setPowerballNumbers] = useState();


  useEffect(() => {
    const getPowerBall = () => {  
      if(token) {
        const data = {token: token};
      //send to server
        getPowerball(data)
          .then((response) => {

            if(response && response?.success) {
              setPowerballNumbers(response.result);
            }
          })
          .catch((error) => {
            Alert.alert('Error', 'Something when wrong try again later', [
              {text: 'OK', onPress: () => {}},
            ]);
          });
      } else {
        Alert.alert('Error', 'Please login to use this function!', [
          {text: 'OK', onPress: () => {}},
        ]);
      }
    }

    const unsubscribe = navigation.addListener("focus", () => {
      getPowerBall();
    });
    
    return unsubscribe;
    
  }, [navigation]);

  return (
    <View>
      <HeaderScreen />
      <View className="m-2">
        {token ? (
          <View>
            <Text className="text-xl font-bold mb-3 text-sky-500 underline">
              User's Powerball sharing
            </Text>
            <FlatList
              data={powerballNumbers}
              renderItem={({item}) => <ShareItemScreen 
                                        powerBallNumber={JSON.parse(item.powerBallNumber)}
                                        type={item.type}
                                    />}
              keyExtractor={(item, index) => {
                return item._id;
              }}
            />
          </View>
          ) : (
            <Text className="text-xl text-center font-bold text-red-700">
              Please login to use this function
            </Text>
          )
        }
      </View>
    </View>
  )
}

export default ShareScreen