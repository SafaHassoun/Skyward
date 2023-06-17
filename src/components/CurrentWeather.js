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
import MI from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import Video from 'react-native-video';
import {SafeAreaView} from 'react-native-safe-area-context';
import SideMenu from './SideMenu';
import WeatherIcon from './WeatherIcon';

export default function CurrentWeather({
  navigation,
  showSideMenu,
  selectedCity,
  setSelectedCity,
  setShowSideMenu,
}) {
  const {localtime, name} = selectedCity?.location ?? {};
  const {temp_c, feelslike_c, condition, is_day} = selectedCity?.current ?? {};

  useEffect(() => {});

  return (
    <SafeAreaView style={styles.container}>
      <Video
        source={require('../../Videos/cloudy1.mp4')} // Can be a URL or a local file.
        ref={ref => {
          this.player = ref;
        }} // Store reference
        // Callback when video cannot be loaded
        style={styles.backgroundVideo}
      />
      <SideMenu
        showSideMenu={showSideMenu}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        setShowSideMenu={setShowSideMenu}
      />
      <ImageBackground
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7vFpfZSjG1TiOCrvGcgo0JvbxRWvLeKCZmw&usqp=CAU',
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

// const getLocation = ()=> {
//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition((position)=>{
//             const la=position.coords.latitude;
//             const lon=position.coords.longitude;
//             setLat(la);
//             setLong(lon);
//             setUrl('http://api.weatherapi.com/v1/current.json?key=1469bcf832b14b239c9114030232705&q=${lat},${long}&aqi=no')
//             console.log(lat);
//             console.log(long);
//         })
//     }
// }

// const getWeather = async () => {
//     try{
//         const res = await axios.get(url)
//         setData(res.data);
//     }catch(error){
//         console.log('Error fetching weather data:', error);
//     }
// }

// <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//     <Text>Hello world</Text>
//     <Button
//         title="Go to Weather Details"
//         onPress={() => navigation.navigate('WeatherDetails')}
//     />
// </View>
