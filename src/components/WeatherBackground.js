import React, {useState, useEffect} from 'react';
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

const DayImages = {
  Sunny: ClearDay,
  Clear: ClearDay,
  Cloudy: CloudyDay,
  'Partly cloudy': CloudyDay,
  Overcast: Overcast,
  'Moderate or heavy rain with thunder': Overcast,
  'Patchi rain possible': Overcast,
  Windy: WindyDay,
  Snowy: Snow,
  Rainy: RainyDay,
  'Light rain': RainyDay,
  'Heavy rain': RainyDay,
};
const NightImages = {
  Clear: ClearNight,
  Cloudy: CloudyNight,
  'Partly cloudy': CloudyNight,
  Overcast: Overcast,
  'Moderate or heavy rain with thunder': Overcast,
  'Patchi rain possible': Overcast,
  Windy: WindyDay,
  Snowy: SnowyNight,
  Rainy: RainyNight,
  'Light rain': RainyNight,
  'Heavy rain': RainyNight,
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
