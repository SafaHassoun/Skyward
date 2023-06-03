import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  ImageBackground,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    elevation: 2,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    color: 'white',
    fontSize: 15,
    padding: 5,
    fontStyle: 'italic',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  button: {
    margin: 20,
    borderRadius: 50,
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  hourlyCard: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    elevation: 2,
  },
  hourlyText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [showAllHours, setShowAllHours] = useState(false);
  const apiKey = '1469bcf832b14b239c9114030232705';
  const maxDisplayedHours = 5;

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
        `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=1&aqi=no&alerts=no`,
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const toggleShowAllHours = () => {
    setShowAllHours(!showAllHours);
  };

  if (!weatherData) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  const location = weatherData.location.name;
  const condition = weatherData.current.condition.text;
  const temperature = weatherData.current.temp_c;
  const humidity = weatherData.current.humidity;

  const hourlyForecast = weatherData.forecast.forecastday[0].hour;
  const displayedHours = showAllHours
    ? hourlyForecast
    : hourlyForecast.slice(0, maxDisplayedHours);

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={{uri: 'https://reactjs.org/logo-og.png'}}
        style={styles.image}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.centerItems}>
            <View style={styles.card}>
              <Text>Weather in: {location}</Text>
            </View>
            <View style={styles.card}>
              <Text>Condition: {condition}</Text>
            </View>
            <View style={styles.card}>
              <Text>Temperature: {temperature}°C</Text>
            </View>
            <View style={styles.card}>
              <Text>Humidity: {humidity}%</Text>
            </View>
            {displayedHours.map(hour => (
              <View key={hour.time} style={styles.hourlyCard}>
                <Text style={styles.hourlyText}>Time: {hour.time}</Text>
                <Text>Condition: {hour.condition.text}</Text>
                <Text>Temperature: {hour.temp_c}°C</Text>
                <Text>Humidity: {hour.humidity}%</Text>
              </View>
            ))}
            {!showAllHours && hourlyForecast.length > maxDisplayedHours && (
              <TouchableOpacity
                style={styles.button}
                onPress={toggleShowAllHours}>
                <Text style={styles.buttonText}>Show More Hours</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default WeatherApp;
