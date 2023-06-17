import React, {useState, useEffect} from 'react';
import {
  View,
  Button,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MI from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import Video from 'react-native-video';
import {SafeAreaView} from 'react-native-safe-area-context';
import SideMenu from './SideMenu';
import WeatherDetails from './WeatherDetails';

export default function CurrentWeather({
  navigation,
  showSideMenu,
  selectedCity,
  setSelectedCity,
  setShowSideMenu,
  requestLocationPermission,
}) {
  const [date, setDate] = useState(null);
  const [city, setCity] = useState(null);
  const [temp, setTemp] = useState();
  const [icon, setIcon] = useState(null);
  const [feelslike, setFeelsLike] = useState();
  const [condition, setCondition] = useState(null);
  const [day, setDay] = useState(0);
  const [video, setVideo] = useState('');

  const Icons = () => {
    if (day == 1) {
      switch (condition) {
        case 'Sunny':
          setIcon('sun');
          break;
        case 'Clear':
          setIcon('sun');
          break;
        case 'Cloudy':
          setIcon('cloud-sun');
          break;
        case 'Partly cloudy':
          setIcon('cloud-sun');
          break;
        case 'Patchy rain possible':
          setIcon('cloud-sun');
          break;
        case 'Windy':
          setIcon('wind');
          break;
        case 'Snowy':
          setIcon('snowflake');
          break;
        case 'Rainy':
          setIcon('cloud-rain');
          break;
      }
    } else {
      switch (condition) {
        case 'Clear':
          setIcon('moon');
          break;
        case 'Cloudy':
          setIcon('cloud-moon');
          break;
        case 'Partly cloudy':
          setIcon('cloud-moon');
          break;
        case 'Patchy rain possible':
          setIcon('cloud-moon');
          break;
        case 'Windy':
          setIcon('wind');
          break;
        case 'Snowy':
          setIcon('snowflake');
          break;
        case 'Rainy':
          setIcon('cloud-moon-rain');
          break;
      }
    }
  };

  const BackgroundVideo = () => {};

  const fetchWeather = async () => {
    try {
      requestLocationPermission();
      if (selectedCity) {
        setDate(selectedCity.location.localtime);
        setCity(selectedCity.location.name);
        setTemp(selectedCity.current.temp_c);
        setFeelsLike(selectedCity.current.feelslike_c);
        setCondition(selectedCity.current.condition.text);
        setDay(selectedCity.current.is_day);
      }
    } catch (error) {
      console.log('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    fetchWeather();
    Icons();
  }, []);

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
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7vFpfZSjG1TiOCrvGcgo0JvbxRWvLeKCZmw&usqp=CAU',
        }}
        style={styles.image}>
        <View style={{flex: 2}}>
          <Text style={styles.text}>{date}</Text>
          <Text style={[styles.text, {fontSize: 30, fontStyle: 'normal'}]}>
            {city}
          </Text>
        </View>

        <View style={{flex: 3, flexDirection: 'row'}}>
          <Text style={{fontSize: 60, color: 'white', margin: 10}}>
            {temp}°
          </Text>
          <MI name={icon} size={110} color="white" style={{margin: 20}} />
        </View>

        <View style={{flex: 4}}>
          <Text style={styles.text}>Feels like {feelslike}°</Text>
          <Text style={styles.text}>{condition}</Text>
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
