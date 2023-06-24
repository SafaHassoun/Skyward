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
      </View>
    </View>
  );
};
const Text = ({style, ...props}) => {
  return (
    <DefaultText style={[{color: 'white', fontSize: 14}, style]} {...props} />
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
      console.log({selectedCity});
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

  console.log(weatherDetails);
  let hours = weatherDetails?.forecast?.forecastday?.[0]?.hour ?? [];
  hours = hours.filter(i => i.time_epoch * 1000 > currentTime);
  return (
    <SafeAreaView>
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1620355058000-6d5d21504db3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=415&q=80',
        }}
        style={{height, width}}
        blurRadius={20}>
        <ScrollView>
          <View>
            {/* <Text style={styles.title}>Sunrise & Sunset :</Text> */}
            <View style={styles.container}>
              <View
                style={[
                  styles.card,
                  {justifyContent: 'center', alignItems: 'center'},
                ]}>
                <Text>Sunrise</Text>
                <Image
                  source={require('./icons/sunrise1.png')}
                  size={30}
                  color="#900"
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 10,
                    marginVertical: 10,
                  }}
                />
                <Text>{sunrise}</Text>
              </View>
              <View
                style={[
                  styles.card,
                  {justifyContent: 'center', alignItems: 'center'},
                ]}>
                <Text>Sunset</Text>
                <Image
                  source={require('./icons/sunset.png')}
                  size={30}
                  color="#900"
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 10,
                    marginVertical: 10,
                  }}
                />
                <Text>{sunset}</Text>
              </View>
            </View>

            {/* <WeatherIcon condition={condition?.text} day={is_day} /> */}

            <FlatList
              data={hours}
              renderItem={renderWeatherDetails}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: 10}}
            />

            <View style={styles.container}>
              <View
                style={[
                  styles.card1,
                  {justifyContent: 'center', alignItems: 'center'},
                ]}>
                <Text>Visibilty</Text>
                <Image
                  source={require('./icons/visibility.png')}
                  size={30}
                  color="#900"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    marginVertical: 10,
                  }}
                />
                <Text>{vis_km} Km</Text>
              </View>
              <View
                style={[
                  styles.card1,
                  {justifyContent: 'center', alignItems: 'center'},
                ]}>
                <Text>Feels like</Text>
                <Image
                  source={require('./icons/temperature.png')}
                  size={30}
                  color="#900"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    marginVertical: 10,
                  }}
                />
                <Text>{feelslike_c}°C</Text>
              </View>
              <View
                style={[
                  styles.card1,
                  {justifyContent: 'center', alignItems: 'center'},
                ]}>
                <Text>Humidity</Text>
                <Image
                  source={require('./icons/humidity.png')}
                  size={30}
                  color="#900"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    marginVertical: 10,
                  }}
                />
                <Text>{humidity} </Text>
              </View>
            </View>

            <View style={styles.container}>
              <View
                style={[
                  styles.card1,
                  {justifyContent: 'center', alignItems: 'center'},
                ]}>
                <Text>Pressure</Text>
                <Image
                  source={require('./icons/smoke.png')}
                  size={30}
                  color="#900"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    marginVertical: 10,
                  }}
                />
                <Text>{pressure_in}</Text>
              </View>
              <View
                style={[
                  styles.card1,
                  {justifyContent: 'center', alignItems: 'center'},
                ]}>
                <Text>Direction </Text>
                <Image
                  source={require('./icons/wind-direction.png')}
                  size={30}
                  color="#900"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    marginVertical: 10,
                  }}
                />
                <Text>{wind_dir}</Text>
              </View>
              <View
                style={[
                  styles.card1,
                  {justifyContent: 'center', alignItems: 'center'},
                ]}>
                <Text>Wind </Text>
                <Image
                  source={require('./icons/wind.png')}
                  size={30}
                  color="#900"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    marginVertical: 10,
                  }}
                />
                <Text>{wind_kph}Kph</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  card: {
    width: '40%',
    aspectRatio: 1,
    backgroundColor: 'transparent',
    borderRadius: 8,
    elevation: 1,
    marginBottom: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  card1: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: 'transparent',
    borderRadius: 8,
    elevation: 1,
    marginBottom: 16,
    paddingTop: 10,
    paddingBottom: 10,
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
