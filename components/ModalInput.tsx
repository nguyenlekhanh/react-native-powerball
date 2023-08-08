import { View, Text, Modal, StyleSheet, Pressable, TextInput, Alert, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import React, { useEffect, useState } from 'react'

type PropsType = {
  title: string,
  modalVisible: boolean,
  setModalVisibileHandler: () => void,
  setInputHandler: (input:string) => void,
  captcha: string
}

const ModalInput = ({
  title, modalVisible, setModalVisibileHandler, setInputHandler,
  captcha
} : PropsType) => {

  const [captchaInput, setCaptchaInput] = useState<string>('');

  const captChaOnChange = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
    const value = e.nativeEvent.text;
    setCaptchaInput(value);
  }
  useEffect(() => {

    if(!modalVisible) {
      setCaptchaInput('');
    }
    
  }, [modalVisible])

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisibileHandler();
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}
              className="text-xl"
            >
              {title}
            </Text>
            <Text style={styles.modalText}
              className="text-xl font-bold"
            >
              {captcha}
            </Text>
            <TextInput
              className="border rounded-lg w-40 
                    border-slate-400 mb-4 text-xl
                    text-center
                  "
              maxLength={7}
              value={captchaInput}
              onChange={captChaOnChange}
            />
            <View className="flex-row gap-3">
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setInputHandler(captchaInput)}>
                <Text style={styles.textStyle}
                  className="text-xl"
                >
                  Submit
                </Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisibileHandler()}>
                <Text style={styles.textStyle}
                  className="text-xl"
                >
                  Close
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ModalInput