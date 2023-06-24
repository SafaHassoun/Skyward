import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  FlatList,
  Pressable,
  Animated,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import RequestEngine from '../request/engine';
import moment from 'moment';
import MI from 'react-native-vector-icons/FontAwesome5';
import MF from 'react-native-vector-icons/Feather';
import MC from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 38,
    color: 'white',
    fontWeight: 'bold',
    padding: 40,
  },
  itemContainer: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    // marginBottom: 20,
    borderRadius: 15,
    marginTop: 20,
    width: width * 0.9,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 10,
    shadowRadius: 50,
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemOne: {
    flexDirection: 'column',
    height: 50,
    width: 180,
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
    width: 100,

    alignItems: 'center',
    flexDirection: 'column',
  },
  cardThree1: {fontSize: 17, color: 'black', padding: 1},
  cardThree: {fontSize: 17},

  DetailsVisiblty: {
    width: width * 0.9,
    overflow: 'hidden',
    borderRadius: 15,
    flex: 1,
    padding: 5,
    marginBottom: 15,
    borderTopEndRadius: 0,
    borderTopStartRadius: 0,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  cardTwoDetails: {flexDirection: 'row'},
  cardHour: {
    height: 24,
    width: 180,
    fontSize: 14,
    fontStyle: 'normal',
    color: 'black',
    fontWeight: 'bold',
    margin: 5,
  },
  title2: {
    fontSize: 20,
    width: 200,
    height: 30,
    color: 'black',
    fontWeight: '400',
    margin: 5,
  },
  hourContainer: {flex: 1},
  hourlyContainer: {
    flex: 1,
    flexDirection: 'column',
    width: 80,
    alignItems: 'center',
    borderColor: '#c0c0c0',
    height: 90,
    justifyContent: 'center',
    borderWidth: 0.5,
    borderRadius: 15,
    margin: 6,
    backgroundColor: '#d3d3d3',
  },
  cardIcon: {width: 50, height: 50},
  cardTime: {fontSize: 12, fontWeight: 'bold', color: '#34495e'},
});

const CARD_SIZE = 70;
const SPACING = 20;
const ITEM_SIZE = CARD_SIZE + SPACING * 3;
const HourlyWeather = ({item, index}) => {
  console.log({item, width});
  return (
    <View style={styles.hourlyContainer}>
      <Text style={styles.cardTime}>{moment(item.time).format('LT')}</Text>
      <Image
        source={{uri: 'https:' + item.condition.icon}}
        style={styles.cardIcon}
      />
      <Text style={styles.cardTime}>{item.temp_c}°C</Text>
    </View>
  );
};

const DayWeatherRow = ({
  item,
  index,
  setDetailVisible,
  isDetailVisible,
  scrollY,
}) => {
  const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)];
  const {date, day, hour, astro} = item;
  const scale = scrollY.interpolate({
    inputRange,
    outputRange: [1, 1, 1, 0],
  });
  return (
    <Animated.View style={{transform: [{scale}]}}>
      <Pressable
        onPress={() => setDetailVisible(i => (i != index ? index : null))}>
        <View
          style={[
            styles.itemContainer,
            index == isDetailVisible && {
              borderBottomEndRadius: 0,
              borderBottomStartRadius: 0,
              backgroundColor: '#0099cc',
            },
          ]}>
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
              <MI name="temperature-high" size={18} color="black" />{' '}
              {day.maxtemp_c}°C
            </Text>
            <Text style={styles.cardThree}>
              <MI name="temperature-low" size={17} color="black" />{' '}
              {day.mintemp_c}°C
            </Text>
          </View>
        </View>
        {isDetailVisible == index && (
          <View style={[styles.DetailsVisiblty]}>
            <Text style={styles.title2}>Details</Text>
            <View style={styles.detailContainer}>
              <View style={styles.cardTwoDetails}>
                <Text style={styles.cardHour}>
                  Humidity{''}
                  <MC
                    name="water"
                    size={20}
                    color="#0099cc"
                    style={styles.IconSunrise}
                  />
                  {''}
                  {hour[0].humidity}%
                </Text>
                <Text style={styles.cardHour}>
                  Wind <MF name="wind" size={20} color="#0099cc" />{' '}
                  {hour[0].wind_kph} Km/h
                </Text>
              </View>
              <View style={styles.cardTwoDetails}>
                <Text style={styles.cardHour}>
                  Sunrise <MF name="sunrise" size={20} color="#0099cc" />{' '}
                  {astro.sunrise}
                </Text>
                <Text style={styles.cardHour}>
                  Sunset <MF name="sunset" size={20} color="#0099cc" />{' '}
                  {astro.sunset}
                </Text>
                <View style={styles.line} />
              </View>
              <View style={styles.hourContainer}>
                <Text style={styles.title2}>Hourly Forecast</Text>
                <FlatList
                  horizontal
                  data={hour}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item, index}) => (
                    <HourlyWeather item={item} index={index} />
                  )}
                />
              </View>
            </View>
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
};

export default function Forecasts({selectedCity}) {
  const [forecast, setForecast] = useState({});
  const [isDetailVisible, setDetailVisible] = useState({});
  const {date} = forecast?.forecastday ?? {};
  const {condition, mintemp_c, maxtemp_c} = forecast?.forecastday?.day ?? {};
  const ImageBackgroundForecast =
    'https://images.pexels.com/photos/7424255/pexels-photo-7424255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  const scrollY = useRef(new Animated.Value(0)).current;

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

  return (
    <View style={styles.container}>
      <Image
        source={{uri: ImageBackgroundForecast}}
        style={StyleSheet.absoluteFill}
        blurRadius={20}
      />
      <Text style={styles.title}>7-Day Forecast</Text>
      <Animated.FlatList
        data={forecast}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        renderItem={({item, index}) => (
          <DayWeatherRow
            item={item}
            index={index}
            scrollY={scrollY}
            isDetailVisible={isDetailVisible}
            setDetailVisible={setDetailVisible}
          />
        )}
        style={{flex: 1}}
      />
    </View>
  );
}
