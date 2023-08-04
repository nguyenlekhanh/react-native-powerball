import { View, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';

type ItemProps = {
  icon: string,
  icon_color: string,
  bgcolor: string,
  title: string,
  description: string,
  actionHandler: () => void
};

const HomeItemScreen = (
  {
    icon, icon_color, bgcolor,
    title, description,
    actionHandler
  }: ItemProps) => {

  const boxClassName = "py-3 px-2 w-full flex-row rounded bg-[" + bgcolor + "]";
  return (
    <TouchableOpacity
      onPress={() => actionHandler()}
    >
      <View className={boxClassName}>
        <View className="mr-2 justify-center">
          <Icon name={icon} size={30} color={icon_color}/>
        </View>
        <View className="flex-column">
          <Text className="text-2xl">{title}</Text>
          <Text>{description}</Text>
        </View>
        <View className="mr-2 justify-center">
          <Icon name="chevron-right" size={30} color="blue" />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default HomeItemScreen