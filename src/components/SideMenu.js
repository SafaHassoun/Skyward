import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import MenuDrawer from 'react-native-side-drawer';
import {FlatList} from 'react-native-gesture-handler';
import CurrentWeather from './CurrentWeather';
import cities from 'cities.json';

export default function SideMenu({
  showSideMenu,
  setSelectedCity,
  selectedCity,
}) {
  const [showCities, setShowCities] = useState(false);
  let list = [
    {
      country: 'FR',
      name: 'Lyon',
      lat: '45.75',
      lng: '4.583333',
    },
    {id: '0', name: 'Tripoli'},
    {id: '1', name: 'Beirut'},
    {id: '2', name: 'Batroun'},
  ];

  return (
    <View
      style={{flex: 1, position: 'absolute', zIndex: 9999, top: 0, right: 0}}>
      <MenuDrawer
        open={showSideMenu}
        drawerContent={
          showCities ? (
            <View style={{backgroundColor: '#34495e', flex: 1}}>
              <TouchableOpacity
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 5,
                  padding: 5,
                  backgroundColor: '#2980b9',
                }}
                onPress={() => {
                  setShowCities(false);
                }}>
                <Text style={{color: '#ecf0f1'}}>Submit</Text>
              </TouchableOpacity>
              <FlatList
                data={cities}
                style={{height: 400, zIndex: 999999999999}}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 5,
                    }}
                    onPress={() => {
                      setSelectedCity(item);
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: '#ecf0f1',
                      }}>
                      {item.name}, {item.country}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          ) : (
            <View style={{backgroundColor: '#34495e', flex: 1}}>
              <TouchableOpacity
                style={{
                  //   maxHeight: 50,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 5,
                  padding: 5,
                  backgroundColor: '#2980b9',
                }}
                onPress={() => {
                  setShowCities(true);
                }}>
                <Text style={{color: '#ecf0f1'}}>Add City</Text>
              </TouchableOpacity>
              <FlatList
                data={list}
                style={{flex: 1}}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 5,
                    }}
                    onPress={() => {
                      setSelectedCity(item);
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color:
                          selectedCity?.name == item.name
                            ? '#2ecc71'
                            : '#ecf0f1',
                      }}>
                      {item.name}, {item.country}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )
        }
        drawerPercentage={60}
        position="right"
        overlay={true}></MenuDrawer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    margin: 10,
  },
  text: {
    color: '',
  },
});
