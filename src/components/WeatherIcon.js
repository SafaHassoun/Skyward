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
    }
  }
  return <MI name={iconName} size={110} color="white" style={{margin: 20}} />;
}