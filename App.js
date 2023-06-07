import React from 'react';
import { View, Text, Button, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import CurrentWeather from './src/components/CurrentWeather';
import WeatherDetails from './src/components/WeatherDetails';
import Forecasts from './src/components/Forecasts';
import NI from 'react-native-vector-icons/FontAwesome';
import SideMenu from './src/components/SideMenu';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={CurrentWeather}
        options={{
          title: 'Home',
          headerRight: () => (
            <SideMenu/>
            // <TouchableOpacity onPress={() => alert("hello")} >
            //   <NI name="navicon" size={40} color="black" backgroundColor="white" style={{marginRight:20}}/>
            // </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="WeatherDetails"
        component={WeatherDetails}
        options={{ title: 'Weather Details' }}
      />
      <Stack.Screen
        name="Forecasts"
        component={Forecasts}
        options={{ title: 'Forecast' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
