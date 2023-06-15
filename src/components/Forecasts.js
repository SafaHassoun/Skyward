import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {View, StyleSheet, Image, PermissionsAndroid, Text} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'Blue',
  },
  title: {
    fontSize: 40,
    color: 'black',
    fontStyle: 'italic',
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 10,
    flex: 1,
    width: 500,
    height: 100,
    marginVertical: 10,
    borderRadius: 5,
    elevation: 2,
    flexDirection: 'row',
  },

  cardOne: {
    width: 80,
    height: 50,
  },
  cardTwo: {
    width: 80,
    height: 50,
    marginRight: 30,
  },
});

export default function Forecasts({navigation}) {
  const [forecast, setForecast] = useState(null);
  const apiKey = '1469bcf832b14b239c9114030232705';

  useEffect(() => {
    requestLocationPermission();
  }, []);

  // const fetchWeatherData = async () => {
  //   try {
  //     requestLocationPermission();
  //     if (selectedCity) {
  //       const location = selectedCity.location.name;
  //       const condition = selectedCity.current.condition.text;
  //       const temperature = selectedCity.current.temp_c;
  //       const humidity = selectedCity.current.humidity;
  //     }
  //   } catch (error) {
  //     console.error('Error fetching weather data:', error);
  //   }
  // };

  const fetchWeatherData = async () => {
    try {
      setForecast(response.data.forecast.forecastday);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const renderWeather = ({item: {date, day}}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.cardOne}>{date}</Text>
      <Text style={styles.cardOne}>{day.condition.text}</Text>
      <Image
        source={{uri: 'https:' + day.condition.icon}}
        style={styles.cardTwo}
      />
      <Text style={styles.cardThree}>{day.mintemp_c}°C</Text>
      <Text style={styles.cardThree}>{day.maxtemp_c}°C</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>7-Day Forecast</Text>
      <FlatList data={forecast} renderItem={renderWeather} style={{flex: 1}} />
    </View>
  );
}
