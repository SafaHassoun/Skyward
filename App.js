import React from "react";
import { View, Text } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
export default function App() {
 
  return (
    <View>
      <Text>Hello
        <Icon name="home" size={30} color="#900" />
      </Text>
    </View>
  )
}
