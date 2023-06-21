import {ImageBackground, StyleSheet} from 'react-native';

export default function WeatherBackground({condition, day}) {
  let source =
    'https://images.unsplash.com/photo-1620355058000-6d5d21504db3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=415&q=80';
  if (day == 1) {
    switch (condition) {
      case 'Sunny':
        source =
          'https://images.unsplash.com/photo-1620355058000-6d5d21504db3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=415&q=80';
        break;
      case 'Clear':
        source =
          'https://images.unsplash.com/photo-1530530824905-661c2bb787f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=432&q=80';
        break;
      case 'Cloudy':
        source =
          'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80';
        break;
      case 'Partly cloudy':
        source =
          'https://images.unsplash.com/photo-1590372648787-fa5a935c2c40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80';
        break;
      case 'Patchy rain possible':
        source =
          'https://images.unsplash.com/photo-1532178910-7815d6919875?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80';
        break;
      case 'Windy':
        source =
          'https://images.unsplash.com/photo-1470176519524-3c2f481c8c9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80';
        break;
      case 'Snowy':
        source =
          'https://images.unsplash.com/photo-1577928614565-ef010b14b8bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80';
        break;
      case 'Rainy':
        source =
          'https://images.unsplash.com/photo-1501691223387-dd0500403074?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJhaW55JTIwZGF5fGVufDB8fDB8fHwy&auto=format&fit=crop&w=500&q=60';
        break;
    }
  } else {
    switch (condition) {
      case 'Clear':
        source =
          'https://images.unsplash.com/photo-1498590880827-3f79fdcd7fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80';
        break;
      case 'Cloudy':
        source =
          'https://images.unsplash.com/photo-1603288967520-f3e04381dc02?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80';
        break;
      case 'Partly cloudy':
        source =
          'https://images.unsplash.com/photo-1506269923548-28ddf76ee6e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80';
        break;
      case 'Patchy rain possible':
        source =
          'https://images.unsplash.com/photo-1603288967520-f3e04381dc02?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80';
        break;
      case 'Windy':
        source =
          'https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=451&q=80';
        break;
      case 'Snowy':
        source =
          'https://images.unsplash.com/photo-1613425294613-9791b8652403?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80';
        break;
      case 'Rainy':
        source =
          'https://images.unsplash.com/photo-1567688993206-43c34131b21f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80';
        break;
    }
  }
  return source;
}

// https://images.unsplash.com/photo-1436891620584-47fd0e565afb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80
