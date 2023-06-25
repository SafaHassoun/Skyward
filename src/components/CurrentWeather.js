import React, {useState, useEffect} from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SideMenu from './SideMenu';
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
  const [isLoading, setIsLoading] = useState(true);
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
        //console.log({response}, 'response');
        setCurrentWeather(response.data);
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e, JSON.parse(JSON.stringify(e)));
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getWeather();
    }, 2000);
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
      {isLoading ? (
        <View>
          <ActivityIndicator size="large" style={{marginTop: '80%'}} />
        </View>
      ) : (
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
            <Text
              style={{fontSize: 70, color: 'white', margin: 10, marginLeft: 2}}>
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
              onPress={() => navigation.navigate('WeatherDetails')}
              style={{
                backgroundColor: 'rgba(255,255,255,0.8)',
                width: '40%',
                marginLeft: '10%',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Text
                style={[
                  styles.text,
                  {
                    fontWeight: 'bold',
                    fontSize: 17,
                  },
                ]}>
                More Details
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Forecasts')}
              style={{
                backgroundColor: 'rgba(255,255,255,0.8)',
                width: '40%',
                marginLeft: '10%',
                marginRight: '10%',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Text style={[styles.text, {fontWeight: 'bold', fontSize: 17}]}>
                7-day Forecast
              </Text>
            </TouchableOpacity>
          </View>
        </WeatherBackground>
      )}
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
    borderRadius: 50,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 10,
  },
});

//(weather == sunny) ? 'sunny' : (weather == sunny) ? 'sunny' : 'raining'
