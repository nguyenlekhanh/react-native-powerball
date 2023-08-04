import { View, Text, SafeAreaView, TextInput, Keyboard, Modal, Pressable, Alert, StyleSheet  } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AdsScreen from './AdsScreen';
import Button from '../components/Button';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../app/store.zustand.user';
import { submitFeedback } from '../utils/updateData';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AdsFullScreen from './AdsFullScreen';

type RootStackParamList = {};

type Props = NativeStackScreenProps<RootStackParamList>;

const ContactScreen = ({ route, navigation }: Props) => {
  const {showFullAds} = route.params;
  const {t} = useTranslation();
  const nameRef = useRef<TextInput>(null);
  const subjectRef = useRef<TextInput>(null);
  const messageRef = useRef<TextInput>(null);
  const [name, setName] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [nameError, setNameError] = useState<string>('black');
  const [subjectError, setSubjectError] = useState<string>('black');
  const [messageError, setMessageError] = useState<string>('black');

  const userInfo = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.token);
  const [modalVisible, setModalVisible] = useState(false);

  const submitFormHandler = () => {
    let hasError = false;
    
    if(!name) {
      setNameError('red');
      hasError = true;
    } else {
      setNameError('black');
    }


    if(!subject) {
      setSubjectError('red');
      hasError = true;
    } else {
      setSubjectError('black');
    }

    
    setMessage((prev) => prev.trim().replace(/^\s+|\s+$/g, ""))

    if(!message) {
      setMessageError('red');
      hasError = true;
    } else {
      setMessageError('black');
    }

    if(!hasError) {
      Keyboard.dismiss();

      let data = {
        name: name,
        subject: subject,
        message: message,
        token: token,
        email: ''
      }

      if(userInfo && userInfo?.user?.email) {
        data.email = userInfo.user.email
      }

      //send to server
      submitFeedback(data)
        .then((response) => {
          setName('');
          setSubject('');
          setMessage('');
          Alert.alert('Success', 'Thank you so much for taking the time to provide feedback.', [
            {text: 'OK', onPress: () => navigation.navigate('Home')},
          ]);
        })
        .catch((error) => {
          Alert.alert('Error', 'Something when wrong try again later', [
            {text: 'OK', onPress: () => navigation.navigate('Home')},
          ]);
        });

    } else {
      if(nameError === 'red') {
        nameRef.current?.focus();
      } else if(subjectError == 'red') {
        subjectRef.current?.focus();
      } else if(messageError == 'red') {
        messageRef.current?.focus();
      }
    }
  }

  return (
    <SafeAreaView className="flex-columns items-center w-full h-max">
      <View className="mt-2 w-full h-[89%] justify-center">
        <View className="h-[95%] mx-2">
          <View className="flex-row w-full justify-between">
            <Text className="pt-3 text-2xl font-bold">{t("contact")}</Text>
            <Button event={() => submitFormHandler()}/>
          </View>
          <View className="mt-3">
            <Text 
              className="text-2xl font-bold"
            >{t("your-name")}</Text>
            <TextInput className="text-xl"
              style={{borderWidth: 1, borderColor: `${nameError}`}}
              ref={nameRef}
              value={name}
              onChangeText={text => setName(text)}
            />
          </View>
          <View className="mt-3">
            <Text 
              className="text-2xl font-bold"
            >{t("subject")}</Text>
            <TextInput className="text-xl"
              style={{borderWidth: 1, borderColor: `${subjectError}`}}
              ref={subjectRef}
              value={subject}
              onChangeText={text => setSubject(text)}
            />
          </View>
          <View className="mt-3 mb-3">
            <Text className="text-2xl font-bold">{t("your-message")}</Text>
            <TextInput 
              ref={messageRef}
              value={message}
              editable
              multiline
              numberOfLines={4}
              maxLength={300}
              style={{padding: 10, textAlignVertical: 'top', borderWidth: 1, borderColor: `${messageError}`}}
              className="text-start border border-current text-xl"
              onChangeText={text => setMessage(text)}
            />
          </View>
        </View>
      </View>

      <AdsScreen />
      <AdsFullScreen showFullAds={showFullAds}/>
    </SafeAreaView>
  )
}


export default ContactScreen