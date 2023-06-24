import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, Text, FlatList, Pressable} from 'react-native';
import RequestEngine from '../request/engine';
import moment from 'moment';
import MI from 'react-native-vector-icons/FontAwesome5';
import MF from 'react-native-vector-icons/Feather';
import MC from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495e',
  },
  title: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
    fontStyle: 'italic',
    padding: 40,
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 10,
    flex: 1,
    width: 500,
    height: 120,
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemOne: {
    flexDirection: 'column',
    height: 50,
    width: 200,
    alignItems: 'center',
  },
  cardOne1: {
    fontSize: 17,
    color: 'black',
    padding: 1,
  },
  cardOne: {
    fontSize: 15,
    marginEnd: 10,
  },
  cardTwo: {
    width: 80,
    height: 80,
  },
  itemThree: {
    height: 50,
    width: 120,
    marginRight: 40,
    alignItems: 'center',
    flexDirection: 'column',
  },
  cardThree1: {fontSize: 17, color: 'black', padding: 1},
  cardThree: {fontSize: 17},

  DetailsVisiblty: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#34495e',
  },
  cardTwoDetails: {flexDirection: 'row'},
  cardHour: {
    height: 40,
    width: 200,
    fontSize: 14,
    fontStyle: 'normal',
    color: 'white',
    fontWeight: 'bold',
  },
  title2: {
    fontSize: 21,
    width: 200,
    height: 40,
    color: 'white',
    fontWeight: '600',
  },
  hourContainer: {flex: 1},
  hourlyContainer: {
    flex: 1,
    flexDirection: 'column',
    width: 80,
    alignItems: 'center',
    borderColor: '#C0C0C0',
    height: 80,
    justifyContent: 'center',
    borderWidth: 0.5,
    borderRadius: 15,
    margin: 3,
    backgroundColor: 'white',
  },
  cardIcon: {width: 60, height: 30},
  cardTime: {fontSize: 12, fontWeight: 'bold', color: '#34495e'},
});

export default function Forecasts({selectedCity}) {
  const [forecast, setForecast] = useState({});
  const [isDetailVisible, setDetailVisible] = useState({});
  const {date} = forecast?.forecastday ?? {};
  const {condition, mintemp_c, maxtemp_c} = forecast?.forecastday?.day ?? {};

  const getWeather = async () => {
    try {
      const request = new RequestEngine();
      //console.log(selectedCity, 'text');
      if (selectedCity && selectedCity.lat && selectedCity.lng) {
        const response = await request.getForeCast(
          selectedCity?.lat,
          selectedCity?.lng,
        );
        //console.log({response}, 'esponse');
        setForecast(response.data.forecast.forecastday);
      }
    } catch (e) {
      console.log(e, JSON.parse(JSON.stringify(e)));
    }
  };

  useEffect(() => {
    getWeather();
  }, [selectedCity]);

  const renderHoursDaily = ({item: {hour}}) => (
    <View style={styles.hourlyContainer}>
      <Text style={styles.cardTime}>{moment(hour[0].time).format('LT')}</Text>
      <Image
        source={{uri: 'https:' + hour[0].condition.icon}}
        style={styles.cardIcon}
      />
      <Text style={styles.cardTime}>{hour[0].temp_c}°C</Text>
    </View>
  );

  const renderWeather = ({item: {date, day, hour, astro}, index}) => (
    <View>
      <Pressable
        style={styles.touchDetails}
        onPress={() => setDetailVisible(i => (i != index ? index : null))}>
        <View style={styles.itemContainer}>
          <View style={styles.itemOne}>
            <Text style={styles.cardOne1}>
              {moment(date).format('dddd,MMMM DD')}
            </Text>
            <Text style={styles.cardOne}>{day.condition.text}</Text>
          </View>
          <Image
            source={{uri: 'https:' + day.condition.icon}}
            style={styles.cardTwo}
          />
          <View style={styles.itemThree}>
            <Text style={styles.cardThree1}>
              {' '}
              <MI name="temperature-high" size={18} color="black" />{' '}
              {day.maxtemp_c}°C
            </Text>
            <Text style={styles.cardThree}>
              <MI name="temperature-low" size={18} color="black" />
              {day.mintemp_c}°C
            </Text>
          </View>
        </View>
      </Pressable>

      {isDetailVisible == index && (
        <View style={styles.DetailsVisiblty}>
          <Text style={styles.title2}>Details</Text>
          <View style={styles.detailContainer}>
            <View style={styles.cardTwoDetails}>
              <Text style={styles.cardHour}>
                Humidity{' '}
                <MC
                  name="water"
                  size={20}
                  color="white"
                  style={styles.IconSunrise}
                />{' '}
                {hour[0].humidity}%
              </Text>
              <Text style={styles.cardHour}>
                Wind <MF name="wind" size={20} color="white" />{' '}
                {hour[0].wind_kph} Km/h
              </Text>
            </View>
            <View style={styles.cardTwoDetails}>
              <Text style={styles.cardHour}>
                Sunrise <MF name="sunrise" size={20} color="white" />{' '}
                {astro.sunrise}
              </Text>
              <Text style={styles.cardHour}>
                Sunset <MF name="sunset" size={20} color="white" />{' '}
                {astro.sunset}
              </Text>
            </View>
            <View style={styles.hourContainer}>
              <Text style={styles.title2}>Hourly Forecast</Text>
              <FlatList
                horizontal
                data={forecast}
                renderItem={renderHoursDaily}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>7-Day Forecast</Text>
      <FlatList data={forecast} renderItem={renderWeather} style={{flex: 1}} />
    </View>
  );
}
