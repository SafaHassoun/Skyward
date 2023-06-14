import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { View, StyleSheet,Image, PermissionsAndroid, Text } from 'react-native'
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'Blue',
  },
  title:{
    fontSize:40,
    color:"black",
    fontStyle: 'italic',
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 10,
    flex:1,
    width:500, height:100,
    marginVertical: 10,
    borderRadius: 5,
    elevation: 2,
    flexDirection:'row',

  },
  text: {
    color: 'white',
    fontSize: 15,
    padding: 5,
    fontStyle: 'italic',
  },
  card: {
    width:50,
    height:50,

  },

})

export default function Forecasts({ navigation }) {
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const apiKey = '1469bcf832b14b239c9114030232705';

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
      } else {
        console.log('Location permission denied');
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        fetchWeatherData(latitude, longitude);
      },
      error => {
        console.error('Error getting current location:', error);
      },
    );
  };

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=7&aqi=no&alerts=no`,
      );
      setWeatherData(response.data);
      setForecast(response.data.forecast.forecastday)
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };
  const renderWeather = ({ item:{date,day} }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.card}>{date}</Text>
      <Text style={styles.card}>{day.condition.text}</Text>
      <Image source={{uri:'https:'+day.condition.icon}} style={styles.card}/>
      <Text style={styles.card}>{day.mintemp_c}°C</Text>
      <Text style={styles.card}>{day.maxtemp_c}°C</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>7-Day Forecast</Text>
      <FlatList
        data={forecast}
        renderItem={renderWeather}
        style={{flex:1}}
      />

    </View>
  );

}
