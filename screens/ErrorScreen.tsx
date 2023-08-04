import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'

type ItemProps = {
  msg: string,
  closeErrorMsg: () => void
  timeout: number
};

const ErrorScreen = ({
  msg,
  closeErrorMsg,
  timeout=5000
}: ItemProps) => {

  useEffect(() => {
    if(timeout > 0) {
      setTimeout(() => {
        closeErrorMsg();
      }, timeout);
    }
  }, []);

  return (
    <View className="bg-[#F8D7DA] mt-2 w-auto flex-row">
      <View className="w-[95%]">
        <Text className="text-color-[#9D3F24] text-xl">{msg}</Text>
      </View>
      <TouchableOpacity
        onPress={() => closeErrorMsg()}
      >
        <View>
          <Text className="text-3xl">&times;</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default ErrorScreen