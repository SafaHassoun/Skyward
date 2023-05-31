import React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native"
//import FA from 'react-native-vector-icons/FontAwesome';
//import MI from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import CurrentWeather from "./src/components/CurrentWeather";
import WeatherDetails from "./src/components/WeatherDetails";
import Forecasts from "./src/components/Forecasts";
import OtherCities from "./src/components/OtherCities";

const Stack = createStackNavigator();

function MyStack({navigation}) {
  return (
    <Stack.Navigator>
      
      <Stack.Screen name="Home" component={CurrentWeather} options={{
        title: 'Home',
        headerRight: () => (<Button title="Info" onPress={() => alert("hellooo")} />
        )
      }} />
      <Stack.Screen name="WeatherDetails" component={WeatherDetails} options={{ title: 'Weather Details' }} />
      <Stack.Screen name="Forecasts" component={Forecasts} options={{ title: 'Forecast' }} />
      <Stack.Screen name="others" component={OtherCities} options={{ title: 'Cities' }} />
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