import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, Text, FlatList} from 'react-native';
import RequestEngine from '../request/engine';

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

export default function Forecasts({selectedCity}) {
  const [forecast, setForecast] = useState({});
  const {date} = forecast?.forecastday ?? {};
  const {condition, mintemp_c, maxtemp_c} = forecast?.forecastday?.day ?? {};

  const getWeather = async () => {
    try {
      const request = new RequestEngine();
      console.log(selectedCity, 'text');
      if (selectedCity && selectedCity.lat && selectedCity.lng) {
        const response = await request.getForeCast(
          selectedCity?.lat,
          selectedCity?.lng,
        );
        //console.log({response}, 'esponse');
        setForecast(response.data);
      }
    } catch (e) {
      console.log(e, JSON.parse(JSON.stringify(e)));
    }
  };

  useEffect(() => {
    getWeather();
  }, [selectedCity]);

  const renderWeather = () => (
    <View style={styles.itemContainer}>
      <Text style={styles.cardOne}>{date}</Text>
      <Text style={styles.cardOne}>{condition.text}</Text>
      <Image
        source={{uri: 'https:' + day.condition.icon}}
        style={styles.cardTwo}
      />
      <Text style={styles.cardThree}>{mintemp_c}°C</Text>
      <Text style={styles.cardThree}>{maxtemp_c}°C</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>7-Day Forecast</Text>
      <FlatList data={forecast} renderItem={renderWeather} style={{flex: 1}} />
    </View>
  );
}
