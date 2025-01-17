import React from 'react';
import {ImageBackground} from 'react-native';
import ClearDay from '../../Pictures/ClearDay.jpg';
import ClearNight from '../../Pictures/ClearNight.jpg';
import CloudyDay from '../../Pictures/CloudyDay.jpg';
import CloudyNight from '../../Pictures/CloudyNight.jpg';
import Overcast from '../../Pictures/Overcast.jpg';
import RainyDay from '../../Pictures/RainyDay.jpg';
import RainyNight from '../../Pictures/RainyNight.jpg';
import Snow from '../../Pictures/Snow.jpg';
import SnowyNight from '../../Pictures/snowyNight.jpg';
import WindyDay from '../../Pictures/WindyDay.jpg';
import FoggyDay from '../../Pictures/Foggy2.jpg';
import FoggyNight from '../../Pictures/FoggyNight.jpg';

const DayImages = {
  Sunny: ClearDay,
  Clear: ClearDay,
  Cloudy: CloudyDay,
  'Partly cloudy': CloudyDay,
  Overcast: Overcast,
  'Moderate or heavy rain with thunder': Overcast,
  'Moderate rain': RainyDay,
  'Thundery outbreaks possible': RainyDay,
  'Patchi rain possible': Overcast,
  Windy: WindyDay,
  Snowy: Snow,
  Rainy: RainyDay,
  'Light rain': RainyDay,
  'Heavy rain': RainyDay,
  'Patchy light rain with thunder': RainyDay,
  Mist: FoggyDay,
};
const NightImages = {
  Sunny: ClearDay,
  Clear: ClearNight,
  Cloudy: CloudyNight,
  'Partly cloudy': CloudyNight,
  Overcast: Overcast,
  'Moderate or heavy rain with thunder': Overcast,
  'Moderate rain': RainyDay,
  'Thundery outbreaks possible': RainyDay,
  'Patchi rain possible': Overcast,
  Windy: WindyDay,
  Snowy: SnowyNight,
  Rainy: RainyNight,
  'Light rain': RainyNight,
  'Heavy rain': RainyNight,
  'Patchy light rain with thunder': RainyNight,
  Mist: FoggyNight,
};

export default function WeatherBackground(props) {
  const {condition, day} = props;

  return (
    <ImageBackground
      source={
        day == 1 ? DayImages[condition?.text] : NightImages[condition?.text]
      }
      style={{flex: 1, justifyContent: 'center'}}>
      {props.children}
    </ImageBackground>
  );
}
