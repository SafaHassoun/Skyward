import React, {useState, useEffect} from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SideMenu from './SideMenu';

import WeatherDetails from './WeatherDetails';

import WeatherIcon from './WeatherIcon';
import RequestEngine from '../request/engine';
import moment from 'moment';
import WeatherBackground from './WeatherBackground';

export default function CurrentWeather({
  navigation,
  showSideMenu,
  selectedCity,
  setSelectedCity,
  requestLocationPermission,
  setShowSideMenu,
}) {
  const [currentWeather, setCurrentWeather] = useState({});
  const {localtime, name} = currentWeather?.location ?? {};
  const {temp_c, feelslike_c, condition, is_day} =
    currentWeather?.current ?? {};

  const getWeather = async () => {
    try {
      const request = new RequestEngine();
      //console.log(selectedCity, 'text');
      if (selectedCity && selectedCity.lat && selectedCity.lng) {
        const response = await request.getCurrentWeather(
          selectedCity?.name,
          selectedCity?.country,
        );
        //console.log({response}, 'esponse');
        setCurrentWeather(response.data);
      }
    } catch (e) {
      console.log(e, JSON.parse(JSON.stringify(e)));
    }
  };

  useEffect(() => {
    getWeather();
  }, [selectedCity]);

  return (
    <SafeAreaView style={styles.container}>
      <SideMenu
        showSideMenu={showSideMenu}
        requestLocationPermission={requestLocationPermission}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        setShowSideMenu={setShowSideMenu}
      />
      <WeatherBackground day={is_day} condition={condition}>
        <View style={{flex: 2}}>
          <Text style={[styles.text, {fontSize: 16}]}>
            {moment(localtime).format('MMMM DD YYYY , hh:mm A')}
          </Text>
          <Text style={[styles.text, {fontSize: 45, fontStyle: 'normal'}]}>
            {name}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 70, color: 'white', margin: 10}}>
            {temp_c}°C
          </Text>
          <WeatherIcon condition={condition?.text} day={is_day} />
        </View>
        <View style={{flex: 5}}>
          <Text style={[styles.text, {fontSize: 20}]}>
            Feels like {feelslike_c}°C
          </Text>
          <Text style={[styles.text, {fontSize: 20}]}>{condition?.text}</Text>
        </View>
        <View
          style={{
            flex: 2,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('WeatherDetails')}>
            <Text
              style={[
                styles.text,
                {
                  marginRight: 10,
                  fontWeight: 'bold',
                  fontSize: 20,
                  marginRight: 40,
                },
              ]}>
              More Details
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Forecasts')}>
            <Text
              style={[
                styles.text,
                {marginLeft: 10, fontWeight: 'bold', fontSize: 20},
              ]}>
              7-day Forecast
            </Text>
          </TouchableOpacity>
        </View>
      </WeatherBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    BackgroundColor: 'white',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  text: {
    color: 'white',
    margin: 5,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    margin: 20,
    borderRadius: 50,
  },
});

//(weather == sunny) ? 'sunny' : (weather == sunny) ? 'sunny' : 'raining'
