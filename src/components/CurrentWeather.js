import React, {useState, useEffect} from 'react';
import {
  View,
  Button,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SideMenu from './SideMenu';
import WeatherIcon from './WeatherIcon';
import RequestEngine from '../request/engine';
import WeatherBackground from './WeatherBakground';

export default function CurrentWeather({
  navigation,
  showSideMenu,
  selectedCity,
  setSelectedCity,
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
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        setShowSideMenu={setShowSideMenu}
      />
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1620355058000-6d5d21504db3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=415&q=80',
        }}
        style={styles.image}>
        <View style={{flex: 2}}>
          <Text style={styles.text}>{localtime}</Text>
          <Text style={[styles.text, {fontSize: 30, fontStyle: 'normal'}]}>
            {name}
          </Text>
        </View>
        <View style={{flex: 3, flexDirection: 'row'}}>
          <Text style={{fontSize: 55, color: 'white', margin: 10}}>
            {temp_c}°C
          </Text>
          <WeatherIcon condition={condition?.text} day={is_day} />
        </View>
        <View style={{flex: 4}}>
          <Text style={styles.text}>Feels like {feelslike_c}°</Text>
          <Text style={styles.text}>{condition?.text}</Text>
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
            <Text style={[styles.text, {marginRight: 10}]}>More Details</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Forecasts')}>
            <Text style={[styles.text, {marginLeft: 10}]}>7-day Forecast</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
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
    fontSize: 12,
    padding: 5,
    fontStyle: 'italic',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  // Later on in your styles..
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  button: {
    margin: 20,
    borderRadius: 50,
  },
});

//(weather == sunny) ? 'sunny' : (weather == sunny) ? 'sunny' : 'raining'
