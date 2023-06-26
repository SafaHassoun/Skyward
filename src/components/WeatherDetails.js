import React, {useEffect, useState} from 'react';
import {
  View,
  Text as DefaultText,
  Image,
  ImageBackground,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
const {width, height} = Dimensions.get('window');

import RequestEngine from '../request/engine';
import WeatherBackground from './WeatherBackground';
import MI from 'react-native-vector-icons/FontAwesome5';
import MF from 'react-native-vector-icons/Feather';
import MC from 'react-native-vector-icons/Ionicons';

const renderWeatherDetails = ({item, index}) => {
  return (
    <View style={[styles.container]}>
      <View
        style={[
          {
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        <Text>{item.time.split(' ')[1]}</Text>
        {/* <Text>{item.condition.text}</Text> */}
        <Image
          source={{uri: 'https://' + item.condition.icon}}
          style={{width: 50, height: 50}}
        />
        {/* <Text>humidity: {item.humidity}</Text> */}
        <Text>{item.temp_c}°C</Text>
        <Text>{item.will_it_rain}%</Text>
      </View>
    </View>
  );
};
const Text = ({style, ...props}) => {
  return (
    <DefaultText style={[{color: 'black', fontSize: 14}, style]} {...props} />
  );
};

export default function WeatherDetails({selectedCity}) {
  const [icon, setIcon] = useState(null);
  const [weatherDetails, setWeatherDetails] = useState({});
  const currentTime = new Date().getTime();
  const {localtime, name} = weatherDetails?.location ?? {};
  const {
    temp_c,
    vis_km,
    feelslike_c,
    humidity,
    pressure_in,
    condition,
    is_day,
    wind_kph,
    gust_kph,
    wind_dir,
  } = weatherDetails?.current ?? {};
  const {moonphase, sunrise, sunset, moonrise, moonset} =
    weatherDetails?.forecast?.forecastday?.[0]?.astro ?? {};

  useEffect(() => {
    getWeather();
  }, [selectedCity]);

  const getWeather = async () => {
    try {
      const request = new RequestEngine();
      //console.log({selectedCity});
      if (selectedCity && selectedCity.lat && selectedCity.lng) {
        const response = await request.getWeatherDetails(
          selectedCity?.lat,
          selectedCity?.lng,
        );

        setWeatherDetails(response.data);
      }
    } catch (e) {
      console.log(e, JSON.parse(JSON.stringify(e)));
    }
  };

  //  Spinner-start
  if (!selectedCity) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  //  Spinner-end

  //console.log(weatherDetails);
  let hours = weatherDetails?.forecast?.forecastday?.[0]?.hour ?? [];
  hours = hours.filter(i => i.time_epoch * 1000 > currentTime);
  return (
    <SafeAreaView style={styles.container1}>
      <WeatherBackground day={is_day} condition={condition}>
        <View style={styles.container}>
          <View
            style={[
              styles.card,

              {justifyContent: 'center', alignItems: 'center'},
            ]}>
            <Text>Sunrise</Text>
            <Text>
              <MF name="sunrise" size={60} color="#0099cc" />
            </Text>

            <Text>{sunrise}</Text>
          </View>
          <View
            style={[
              styles.card,
              {justifyContent: 'center', alignItems: 'center'},
            ]}>
            <Text>Sunset</Text>
            <Text>
              <MF name="sunset" size={60} color="#0099cc" />
            </Text>

            <Text>{sunset}</Text>
          </View>
        </View>
        <View>
          <FlatList
            data={hours}
            renderItem={renderWeatherDetails}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingVertical: 10}}
          />
        </View>

        <View style={styles.container}>
          <View
            style={[
              styles.card1,
              {justifyContent: 'center', alignItems: 'center'},
            ]}>
            <Text>Visibilty</Text>
            <Text>
              <MI name="eye" size={40} color="#0099cc" />
            </Text>

            <Text>{vis_km} Km</Text>
          </View>
          <View
            style={[
              styles.card1,
              {justifyContent: 'center', alignItems: 'center'},
            ]}>
            <Text>Feels like</Text>
            <Text>
              <MI name="thermometer-half" size={40} color="#0099cc" />
            </Text>
            <Text>{feelslike_c} °C</Text>
          </View>
          <View
            style={[
              styles.card1,
              {justifyContent: 'center', alignItems: 'center'},
            ]}>
            <Text>Humidity</Text>
            <Text>
              <MC name="water" size={40} color="#0099cc" />
            </Text>

            <Text>{humidity} %</Text>
          </View>
        </View>

        <View style={styles.container}>
          <View
            style={[
              styles.card1,
              {justifyContent: 'center', alignItems: 'center'},
            ]}>
            <Text>Pressure</Text>
            <Text>
              <MI name="water" size={40} color="#0099cc" />
            </Text>
            <Text>{pressure_in} Psi</Text>
          </View>
          <View
            style={[
              styles.card1,
              {justifyContent: 'center', alignItems: 'center'},
            ]}>
            <Text>Direction </Text>
            <Text>
              <MI name="location-arrow" size={40} color="#0099cc" />
            </Text>

            <Text>{wind_dir}</Text>
          </View>
          <View
            style={[
              styles.card1,
              {justifyContent: 'center', alignItems: 'center'},
            ]}>
            <Text>Wind</Text>
            <Text>
              <MF name="wind" size={40} color="#0099cc" />
            </Text>

            <Text>{wind_kph} Kph</Text>
          </View>
        </View>
      </WeatherBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  container1: {
    flex: 1,
    flexDirection: 'column',
  },
  card: {
    width: '40%',
    aspectRatio: 1,

    backgroundColor: 'rgba(255,255,255,0.8)',
    // marginBottom: 20,
    borderRadius: 15,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 10,
    shadowRadius: 50,

    paddingTop: 10,
    paddingBottom: 10,
  },

  card1: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: 'rgba(255,255,255,0.8)',
    // marginBottom: 20,
    borderRadius: 15,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 10,
    shadowRadius: 50,
  },
  card2: {
    width: 130,
    height: 130,
    aspectRatio: 1,
    backgroundColor: 'rgba(0, 0, 255, 0.5)',
    borderRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  rectangle: {
    width: '100%',

    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 8,
    textAlign: 'center',
    color: 'white',
  },
});
