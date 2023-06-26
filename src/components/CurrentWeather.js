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
import RequestEngine from '../request/engine';
import moment from 'moment';
import WeatherBackground from './WeatherBackground';
import WeatherIcon from './WeatherIcon';

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
  const {temp_c, temp_f, feelslike_c, feelslike_f, condition, is_day} =
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
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[styles.text, {fontSize: 15}]}>
              Last refreshed at : {moment(localtime).format('LT')}
            </Text>
            <Text style={[styles.text, {fontSize: 40, fontStyle: 'normal'}]}>
              {name}
            </Text>
          </View>
          <View
            style={{
              //flexDirection: 'row',
              //justifyContent: 'space-between',
              //paddingVertical: 6,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 110, color: 'white'}}>
              {temp_c}
              <Text
                style={{
                  fontSize: 40,
                  verticalAlign: 'top',
                }}>
                °C
              </Text>
            </Text>
            {/* <WeatherIcon condition={condition?.text} day={is_day} /> */}
          </View>
          <View
            style={{
              //flex: 5,
              //flexDirection: 'row',
              //justifyContent: 'space-between',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={[styles.text, {fontSize: 20}]}>
              Feels like {feelslike_c}
              <Text style={{fontSize: 13, verticalAlign: 'top'}}>°C</Text>
            </Text>
            <Text style={[styles.text, {fontSize: 20, marginRight: 25}]}>
              {condition?.text}
            </Text>
          </View>
          <View
            style={{
              flex: 2,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '70%',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('WeatherDetails')}
              style={{
                backgroundColor: 'white',
                width: '40%',
                marginLeft: '10%',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Text
                style={[
                  styles.text,
                  {
                    fontSize: 17,
                    color: '#2d98da',
                  },
                ]}>
                Hourly Forecast
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Forecasts')}
              style={{
                backgroundColor: 'white',
                width: '40%',
                marginLeft: '10%',
                marginRight: '10%',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Text style={[styles.text, {fontSize: 17, color: '#2d98da'}]}>
                Daily Forecast
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
