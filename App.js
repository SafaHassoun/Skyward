import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import CurrentWeather from './src/components/CurrentWeather';
import WeatherDetails from './src/components/WeatherDetails';
import Forecasts from './src/components/Forecasts';
import NI from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();

function AppStack() {
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={{
          title: 'Home',
          headerRight: () => (
            <TouchableOpacity onPress={() => setShowSideMenu(!showSideMenu)}>
              <NI
                name="navicon"
                size={40}
                color={showSideMenu ? 'red' : 'black'}
                backgroundColor="white"
                style={{marginRight: 20}}
              />
            </TouchableOpacity>
          ),
        }}>
        {_props => (
          <CurrentWeather
            {..._props}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            showSideMenu={showSideMenu}
            setShowSideMenu={setShowSideMenu}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="WeatherDetails"
        component={WeatherDetails}
        options={{title: 'Weather Details'}}
      />
      <Stack.Screen
        name="Forecasts"
        component={Forecasts}
        options={{title: 'Forecast'}}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}
