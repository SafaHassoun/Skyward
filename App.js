import React from "react";
import { View, Text } from "react-native"
//import FA from 'react-native-vector-icons/FontAwesome';
//import MI from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import CurrentWeather from "./src/components/CurrentWeather";
import WeatherDetails from "./src/components/WeatherDetails";
import Forecasts from "./src/components/Forecasts";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={CurrentWeather} />
      <Stack.Screen name="WeatherDetails" component={WeatherDetails} />
      <Stack.Screen name="Forecasts" component={Forecasts} />
    </Stack.Navigator>
  );
}

export default function App() {
 
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
    
  )
}



// <View>
    //   <Text>Hello
    //     <FA name="home" size={30} color="#900" />
    //     <MI name="weather-lightning-rainy" size={30} color="#900" />
    //   </Text>
    // </View>