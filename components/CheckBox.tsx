import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { StopCircleIcon, CheckCircleIcon } from 'react-native-heroicons/outline';
import { TouchableOpacity } from 'react-native-gesture-handler';

type ItemProps = {
  toggleTranslate: boolean
};

const CheckBox = ({toggleTranslate} : ItemProps) => {
  const [checked, setChecked] = useState<boolean>(false);

  const showHideTranslate = () => {

  }

  return (
    <View>
      {toggleTranslate ? (
          <CheckCircleIcon size={30} color="blue"/>
        ) : (
          <StopCircleIcon size={30} color="blue"/>
        )
      }
    </View>
  )
}

export default CheckBox