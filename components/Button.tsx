import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';

type ItemProps = {
  event: () => void,
  width: number
};

const Button = ({event, width=150} : ItemProps) => {
  const {t} = useTranslation();

  return (
    <TouchableOpacity
      onPress={() => event()}
    >
      <View className="bg-[#0D6EFD] rounded py-4 items-center"
        width={width}
      >
        <Text className="text-xl color-white font-bold">{t('send')}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Button