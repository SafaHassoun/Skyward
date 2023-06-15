import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

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

const WeatherApp = ({selectedCity, requestLocationPermission}) => {
  const [showAllHours, setShowAllHours] = useState(false);
  const maxDisplayedHours = 5;
  const [location, setLocation] = useState(null);
  const [condition, setCondition] = useState(null);
  const [temp, setTemp] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);

  const fetchWeatherData = async () => {
    try {
      requestLocationPermission();
      if (selectedCity) {
        setLocation(selectedCity.location.name);
        setCondition(selectedCity.current.condition.text);
        setTemp(selectedCity.current.temp_c);
        setHumidity(selectedCity.current.humidity);
        setHourlyForecast(selectedCity.forecast.forecastday[0].hour);
        // const displayedHours = showAllHours
        //   ? hourlyForecast
        //   : hourlyForecast.slice(0, maxDisplayedHours);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const toggleShowAllHours = () => {
    setShowAllHours(!showAllHours);
  };

  if (!selectedCity) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  useEffect(() => {
    fetchWeatherData();
  }, []);

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
              <Text>Temperature: {temp}°C</Text>
            </View>
            <View style={styles.card}>
              <Text>Humidity: {humidity}%</Text>
            </View>
            {/* {displayedHours.map(hour => (
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
            )} */}
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default WeatherApp;
