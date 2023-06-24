import React, {useState, useEffect} from 'react';
import {TouchableOpacity, PermissionsAndroid} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import CurrentWeather from './src/components/CurrentWeather';
import WeatherDetails from './src/components/WeatherDetails';
import Forecasts from './src/components/Forecasts';
import NI from 'react-native-vector-icons/FontAwesome';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import RequestEngine from './src/request/engine';

const Stack = createStackNavigator();

function AppStack() {
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      let permissionStatus;
      if (Platform.OS === 'android') {
        permissionStatus = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
      } else if (Platform.OS === 'ios') {
        permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      }

      if (permissionStatus === RESULTS.GRANTED) {
        getCurrentLocation();
      }
    } catch (error) {}
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      async position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const request = new RequestEngine();
        const res = await request.getCurrentWeather(latitude, longitude);
        console.log(res, 'res');
        if (res?.data?.location?.lon) {
          res.data.location.lng = res.data.location.lon;
        }
        setSelectedCity(res.data.location);
      },
      error => {
        console.error('Error getting current location:', error);
      },
    );
  };

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
                color={showSideMenu ? '#2980b9' : 'black'}
                backgroundColor="white"
                style={{marginRight: 20}}
              />
            </TouchableOpacity>
          ),
        }}>
        {_props => (
          <CurrentWeather
            {..._props}
            requestLocationPermission={requestLocationPermission}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            showSideMenu={showSideMenu}
            setShowSideMenu={setShowSideMenu}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="WeatherDetails" options={{title: 'Weather Details'}}>
        {_props => <WeatherDetails {..._props} selectedCity={selectedCity} />}
      </Stack.Screen>

      <Stack.Screen name="Forecasts" options={{title: 'Forecast'}}>
        {_props => <Forecasts {..._props} selectedCity={selectedCity} />}
      </Stack.Screen>
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
