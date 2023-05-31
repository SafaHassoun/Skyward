import React, {useEffect, useState} from 'react';
import {View, Button, Text} from 'react-native';
import axios from 'axios';

export default function WeatherDetails({navigation}) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          'https://api.weatherapi.com/v1/current.json?key=1469bcf832b14b239c9114030232705&q=lebanon',
        );
        setWeatherData(response.data);
      } catch (error) {
        console.log('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  if (!weatherData) {
    return <Text>Loading...</Text>;
  }

  const {location, current} = weatherData;

  return (
    //<View>
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>
        Location: {location.name}, {location.region}, {location.country}
      </Text>
      <Text>Temperature: {current.temp_c}°C</Text>
      <Text>Condition: {current.condition.text}</Text>
      <Text>Humidity: {current.humidity}%</Text>
      <Text>Wind: {current.wind_kph} km/h</Text>

      <Button
        title="Go to Forecasts"
        onPress={() => navigation.navigate('Forecasts')}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
    //</View>
  );
}
