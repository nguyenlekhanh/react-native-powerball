import { View, Text, Image, TouchableOpacity, Animated, Alert } from 'react-native'
import React, { memo, useState } from 'react'
import { powerballType, megaType } from '../utils/variables'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { getCaptcha, verifyCaptcha } from '../utils/updateData';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '../app/store.zustand.user';
import ModalInput from '../components/ModalInput';

type powerballItemProps = {
  id: string,
  powerBallNumber: number[],
  type: string,
  token: string
}

type PropsType = {
  index: number,
  item: powerballItemProps,
  deletePowerBallItemHandler: (id:string) => void
}

const ReviewItemScreen = ({
      index,
      item,
      deletePowerBallItemHandler
    }: PropsType
  ) => {
  
  const navigation = useNavigation();
  const token = useUserStore((state) => state.token);
  const [modalVisible, setModalVisible] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string>('');


  const sharePowerBallHandler = (item: powerballItemProps) => {
    item.token = token;

    if(token) {
    //send to server
      getCaptcha(item)
        .then((response) => {
          setCaptchaValue(response.captcha);
          setModalVisible(true);
          
        })
        .catch((error) => {
          setModalVisible(false);
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

  const setModalVisibileHandler = () => {
    setModalVisible(!modalVisible)
  }

  const setInputHandler = (input:string) => {
    if(input !== captchaValue) {
      Alert.alert('Error', 'Wrong captcha, please try again!', [
        {text: 'OK', onPress: () => {}},
      ]);
    } else {

      const data = {
        token: token,
        userResponse: captchaValue,
        powerballItem: item
      }
      //send to server
      verifyCaptcha(data)
        .then((response) => {

          if(response?.success) {
            setCaptchaValue('');
            setModalVisible(false);
            Alert.alert('Success', 'Your Powerball has been shared successfully!', [
              {text: 'OK', onPress: () => {}},
            ]);
          } else {
            Alert.alert('Error', 'Something when wrong try again!', [
              {text: 'OK', onPress: () => {}},
            ]);
          }
        })
        .catch((error) => {
          setModalVisible(false);
          Alert.alert('Error', 'Something when wrong try again later', [
            {text: 'OK', onPress: () => {}},
          ]);
        });

      setModalVisible(false)
    }
  }

  
  return (
    <View
      className="flex-row flex-wrap"
    >
      <View className="pt-1 pr-2">
        <TouchableOpacity
          onPress={() => deletePowerBallItemHandler(item.id)}
        >
          <Icon name="trash" size={20} color={"red"} />
        </TouchableOpacity>
      </View>

      {item.powerBallNumber.map((number, numberIndex) => (
        <Text key={numberIndex}
          className="text-center w-8 h-8 text-base font-bold 
                  mr-1 border rounded-full p-1 px-1 border-sky-500
                  text-sky-500 mb-2
                  "
          style={{
            borderColor: numberIndex === item.powerBallNumber.length - 1 ? 'red' : '#00A5E9',
            color: numberIndex === item.powerBallNumber.length - 1 ? 'red' : '#00A5E9'
          }}
        >
          {number}
        </Text>
      ))}

      <Text 
      className="text-base text-sky-500 pt-1"
      >
        {item.type == powerballType ? "- PowerBall" : "- Mega"}
      </Text>
      <TouchableOpacity
          onPress={() => sharePowerBallHandler(item)}
          className="pt-1 pl-2"
        >
          <Icon name="users" size={20} color={"red"} />
        </TouchableOpacity>

      <ModalInput 
        title={"Please verify this captcha: "}
        modalVisible={modalVisible}
        setModalVisibileHandler={setModalVisibileHandler}
        setInputHandler={setInputHandler}
        captcha={captchaValue}
      />
    </View>
  )
}

function areItemsEqual({ item: prevItem }: PropsType, { item: nextItem }: PropsType) {
  return Object.keys(prevItem).every(key => {
      return prevItem[key as keyof powerballItemProps] === nextItem[key as keyof powerballItemProps]
  })
}

const MemoizedCartLineItem = memo<typeof ReviewItemScreen>(ReviewItemScreen, areItemsEqual)

export default MemoizedCartLineItem