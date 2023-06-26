import MI from 'react-native-vector-icons/FontAwesome5';

export default function WeatherIcon({condition, day}) {
  let iconName = 'sun';
  if (day == 1) {
    switch (condition) {
      case 'Sunny':
        iconName = 'sun';
        break;
      case 'Clear':
        iconName = 'sun';
        break;
      case 'Cloudy':
        iconName = 'cloud-sun';
        break;
      case 'Overcast':
        iconName = 'cloud';
        break;
      case 'Mist':
        iconName = 'cloud';
        break;
      case 'Partly cloudy':
        iconName = 'cloud-sun';
        break;
      case 'Patchy rain possible':
        iconName = 'cloud-sun';
        break;
      case 'Windy':
        iconName = 'wind';
        break;
      case 'Snowy':
        iconName = 'snowflake';
        break;
      case 'Rainy':
        iconName = 'cloud-rain';
        break;
      case 'Light rain':
        iconName = 'cloud-rain';
        break;
      case 'Moderate or heavy rain with thunder':
        iconName = 'cloud-rain';
        break;
      case 'Heavy rain':
        iconName = 'cloud-rain';
        break;
      case 'Patchy light rain with thunder':
        iconName = 'cloud-rain';
        break;
    }
  } else {
    switch (condition) {
      case 'Clear':
        iconName = 'moon';
        break;
      case 'Cloudy':
        iconName = 'cloud-moon';
        break;
      case 'Partly cloudy':
        iconName = 'cloud-moon';
        break;
      case 'Patchy rain possible':
        iconName = 'cloud-moon';
        break;
      case 'Windy':
        iconName = 'wind';
        break;
      case 'Snowy':
        iconName = 'snowflake';
        break;
      case 'Rainy':
        iconName = 'cloud-moon-rain';
        break;
      case 'Overcast':
        iconName = 'cloud';
        break;
      case 'Moderate or heavy rain with thunder':
        iconName = 'cloud-rain';
        break;
      case 'Heavy rain':
        iconName = 'cloud-rain';
        break;
      case 'Patchy light rain with thunder':
        iconName = 'cloud-rain';
        break;
    }
  }
  return (
    <MI
      name={iconName}
      size={70}
      color="white"
      style={{marginRight: 15, marginTop: 60}}
    />
  );
}

// import React from 'react';
// import {Image} from 'react-native';
// import ClearDay from '../../IconsHomePage/sun.png';
// import ClearNight from '../../IconsHomePage/moonStars.png';
// import Cloudy from '../../IconsHomePage/cloud.png';
// import PartlyCloudy from '../../IconsHomePage/partlyCloudy.png';
// import Rainy from '../../IconsHomePage/rainy.png';
// import Snow from '../../IconsHomePage/snowflake.png';
// import Windy from '../../IconsHomePage/wind.png';

// const DayImages = {
//   Sunny: ClearDay,
//   Clear: ClearDay,
//   Cloudy: Cloudy,
//   'Partly cloudy': PartlyCloudy,
//   Overcast: Cloudy,
//   'Moderate or heavy rain with thunder': Cloudy,
//   'Patchi rain possible': Cloudy,
//   Windy: Windy,
//   Snowy: Snow,
//   Rainy: Rainy,
//   'Light rain': Rainy,
//   'Heavy rain': Rainy,
//   'Patchy light rain with thunder': Rainy,
//   Mist: Cloudy,
// };
// const NightImages = {
//   Sunny: ClearDay,
//   Clear: ClearNight,
//   Cloudy: Cloudy,
//   'Partly cloudy': Cloudy,
//   Overcast: Cloudy,
//   'Moderate or heavy rain with thunder': Cloudy,
//   'Patchi rain possible': Cloudy,
//   Windy: Windy,
//   Snowy: Snow,
//   Rainy: Rainy,
//   'Light rain': Rainy,
//   'Heavy rain': Rainy,
//   'Patchy light rain with thunder': Rainy,
//   Mist: Cloudy,
// };

// export default function WeatherIcon(props) {
//   const {condition, day} = props;

//   return (
//     <Image
//       source={
//         day == 1 ? DayImages[condition?.text] : NightImages[condition?.text]
//       }
//       style={{
//         marginRight: 15,
//         marginTop: 40,
//         width: '10%',
//         height: '10%',
//       }}></Image>
//   );
// }
