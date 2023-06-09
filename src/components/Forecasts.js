import React,{useEffect, useState} from 'react'
import axios from 'axios';
import { View, StyleSheet, FlatList, PermissionsAndroid,TouchableOpacity} from 'react-native'
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';



const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Blue,
    },
    itemContainer: {
      backgroundColor: 'white',
      padding: 10,
      marginVertical: 10,
      borderRadius: 5,
      elevation: 2,
    },
    text: {
        color: 'white',
        fontSize: 15,
        padding: 5,
        fontStyle: 'italic',
      },
    locationText: {
    

    },
    dayText: {

      
    },
    
})

export default function Forecasts({navigation}) {
    const [weatherData, setWeatherData] = useState(null);
    const [showAllDays, setShowAllDays] = useState(false);
    const apiKey = '1469bcf832b14b239c9114030232705';
    const maxDisplayedDays = 5;
  
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
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

  const toggleShowAllDays = () => {
    setShowAllDays(!showAllDays);
  };

  const location = weatherData.location.name;
  const dateName = weatherData.forecast.forecastday[0].date;
  const maxTemp = weatherData.forecast.forecastday[0].day.maxtemp_c;
  const minTemp = weatherData.forecast.forecastday[0].day.mintemp_c;
  const textCondition = weatherData.forecast.forecastday[0].day.condition.text;
  const iconCondition = weatherData.forecast.forecastday[0].day.condition.icon;

  const renderWeather = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.styles.card}>{location}</Text>
      <Text style={styles.dayText}>{dateName}</Text>
      <Text style={styles.temperatureText}>{maxTemp}</Text>
      <Text style={styles.temperatureText}>{minTemp}</Text>
      <Text style={styles.weatherText}>{textCondition}</Text>
      <Text style={styles.weatherIcon}>{iconCondition}</Text>
    </View>
  );
        return (
            <SafeAreaView style={styles.container}>
             <Text style={styles.title}>7-Day Forecast</Text>
              <FlatList
                data={weatherData}
                renderItem={renderWeather}
                keyExtractor={item => item.name}
              />
             {!showAllDays && DailyForecast.length > maxDisplayedDays && (
              <TouchableOpacity
                style={styles.button}
                onPress={toggleShowAllDays}>
                <Text style={styles.buttonText}>Show More Hours</Text>
              </TouchableOpacity>
            )}
            </SafeAreaView>
          );

}
