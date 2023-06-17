import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import MI from 'react-native-vector-icons/MaterialCommunityIcons';

const WeatherApp = ({selectedCity, requestLocationPermission}) => {
  const [location, setLocation] = useState(null);
  const [condition, setCondition] = useState(null);
  const [temp, setTemp] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [day, setDay] = useState(0);
  const [icon, setIcon] = useState(null);
  const [sunrise, setSunrise] = useState(null);

  useEffect(() => {
    fetchWeatherData();
    setWeatherIcon();
  }, []);

  // icon-switch-start
  const setWeatherIcon = () => {
    if (day == 1) {
      switch (condition) {
        case 'Sunny':
        case 'Clear':
          setIcon('sun');
          break;
        case 'Cloudy':
        case 'Partly cloudy':
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
        default:
          setIcon(null);
      }
    } else {
      switch (condition) {
        case 'Clear':
          setIcon('moon');
          break;
        case 'Cloudy':
        case 'Partly cloudy':
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
        default:
          setIcon(null);
      }
    }
  };
  // icon-switch-end

  // fetch-weather-start
  const fetchWeatherData = async () => {
    try {
      requestLocationPermission();
      if (selectedCity) {
        setLocation(selectedCity.location.name);
        setCondition(selectedCity.current.condition.text);
        setTemp(selectedCity.current.temp_c);
        setHumidity(selectedCity.current.humidity);
        setWind(selectedCity.current.wind_kph);
        setHourlyForecast(selectedCity.forecast.forecastday[0].hour);
        setDay(selectedCity.current.is_day);
        setSunrise(selectedCity.sunrise);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };
  // fetch-weather-end

  //  Spinner-start
  if (!selectedCity) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  //  Spinner-end

  //fetch-hour-start
  const renderHourlyForecast = ({item}) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>{item.time.split(' ')[1]}</Text>
      <View style={styles.hourlyWeatherIcon}>
        <Text style={styles.listItemText}>
          <MI name={item.day ? 'sun' : 'moon'} size={20} color="black" />
        </Text>
      </View>
      <Text style={styles.listItemText}>{item.condition.text}</Text>
      <Text style={styles.listItemText}>{item.temp_c}°C</Text>
      <Text style={styles.listItemText}>{item.humidity}%</Text>
      <Text style={styles.listItemText}>
        <MI name={wind} size={20} color="green" style={styles.weatherIcon} />
        {item.wind_kph} km/h
      </Text>
    </View>
  );
  //fetch-hour-end

  // const renderWeatherDetail = () => (
  //   <View>
  //     <View style={styles.listItem}>
  //       <Text style={styles.listItemText}>{temp}°C</Text>
  //       <Text style={styles.listItemText}>
  //         <MI name={icon} size={20} color="black" style={styles.weatherIcon} />
  //         {condition}
  //       </Text>
  //     </View>
  //     <View style={styles.listItem}>
  //       <Text style={styles.listItemText}>H: {humidity}%</Text>
  //       <Text style={styles.listItemText}>W: {wind} km/h</Text>
  //     </View>
  //   </View>
  // );

  // const weatherDetails = [
  //   {label: 'Condition', value: condition},
  //   {label: 'Temperature', value: `${temp}°C`},
  //   {label: 'Humidity', value: `${humidity}%`},
  //   {label: 'Wind', value: `${wind} km/h`},
  // ];

  return (
    <View style={{flex: 1}} className="relative">
      {/* quick-weather-section-start */}
      <View style={styles.container2}>
        <View style={styles.cardBody2}>
          <View style={styles.bodyContent2}>
            <Text style={styles.titleStyle2}>
              {location} {sunrise}
            </Text>
            <Text style={styles.subtitleStyle2}> {condition}</Text>
          </View>
          <View style={[styles.container, {flex: 1}]}>
            <Text style={[styles.cardItemImagePlace2]}>
              {/* <MI
              name={icon}
              size={20}
              color="green"
              style={styles.weatherIcon}
            /> */}
              {temp}°C
            </Text>
          </View>
        </View>
        <View style={styles.actionBody2}>
          <TouchableOpacity style={styles.actionButton12}>
            <Text style={styles.actionText12}>H: {humidity}%</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton22}>
            <Text style={styles.actionText22}>W: {wind} km/h</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* quick-weather-section-end */}

      {/* hour-section-start */}
      <View style={styles.container}>
        {/* <View style={styles.header}>
            <Text style={styles.headerText}> {location}</Text>
          </View> */}
        {/* <FlatList
            data={weatherDetails}
            renderItem={renderWeatherDetail}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{marginBottom: 10}}
          /> */}
        {/* <View style={styles.header}>
            <Text style={styles.headerText}>Hourly Forecast</Text>
          </View> */}
        <FlatList
          data={hourlyForecast}
          renderItem={renderHourlyForecast}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 10}}
        />
      </View>

      {/* hour-section-end */}
    </View>
  );
};

export default WeatherApp;
const styles = StyleSheet.create({
  // start-card
  container2: {
    flexWrap: 'nowrap',
    backgroundColor: '#3E5C76',
    elevation: 3,
    overflow: 'hidden',
  },
  cardBody2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bodyContent2: {
    padding: 16,
    paddingTop: 24,
    flex: 1,
  },
  titleStyle2: {
    fontSize: 24,
    color: '#fff',
    paddingBottom: 12,
  },
  subtitleStyle2: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 16,
    opacity: 0.5,
  },
  cardItemImagePlace2: {
    backgroundColor: '#fff',
    padding: 20,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#CCC',
    display: 'flex',
    textAlign: 'center',
    alignContent: 'center',
  },
  actionBody2: {
    padding: 8,
    flexDirection: 'row',
  },
  actionButton12: {
    padding: 8,
    height: 36,
  },
  actionText12: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  actionButton22: {
    padding: 8,
    height: 36,
  },
  actionText22: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },

  // end-card

  //hourly-start
  container: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  listItem: {
    // '#ee332e
    backgroundColor: 'rgba(238,51,46,0.8)',
    padding: 10,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#CCC',
    display: 'flex',
  },
  listItemText: {
    fontSize: 16,
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
  },
  weatherIcon: {
    marginRight: 5,
  },
  hourlyWeatherIcon: {
    marginVertical: 5,
    alignItems: 'center',
  },
});
