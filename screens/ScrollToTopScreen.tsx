import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { BeakerIcon } from '@heroicons/react/24/solid'

import { ChevronDoubleUpIcon } from "react-native-heroicons/solid";

const ScrollToTopScreen = React.forwardRef((props, ref) => {
  const scrollToTopHandler = () => {
    ref.current.scrollToOffset({ offset: 0, animated: true });
  }

  return (
    <TouchableOpacity 
      className="absolute right-0 bottom-2 mr-2"
      onPress={() => scrollToTopHandler()}
    >
      <View className="text-red-400	w-10 h-10 border border-lime-400 rounded-full items-center justify-center	">
        <ChevronDoubleUpIcon color="#DE3434" size={25} />
      </View>
    </TouchableOpacity>
  )
})


export default ScrollToTopScreen