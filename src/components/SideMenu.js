import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import MenuDrawer from 'react-native-side-drawer';
import {FlatList} from 'react-native-gesture-handler';
import CITIES from 'cities.json';
import {SearchBar} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RI from 'react-native-vector-icons/FontAwesome';

export default function SideMenu({
  showSideMenu,
  setSelectedCity,
  requestLocationPermission,
  selectedCity,
}) {
  const [showCities, setShowCities] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(true);
  const [listCities, setListCities] = useState([]);
  const [search, setSearch] = useState('');
  const [cities, setCities] = useState(null);

  useEffect(() => {
    searchCities();
    loadData();
  }, [search]);

  const searchCities = () => {
    if (search) {
      let cities = CITIES.filter(
        city =>
          city.name.toLowerCase().startsWith(search.toLowerCase()) ||
          city.country.toLowerCase().startsWith(search.toLowerCase()),
      );
      setCities(cities);
    } else {
      setCities(null);
    }
  };

  const loadData = async () => {
    try {
      const storedCities = await AsyncStorage.getItem('listCities');
      //console.log(storedCities);
      if (storedCities !== null) {
        setListCities(JSON.parse(storedCities));
      }
    } catch (error) {
      console.log('Error loading data: ', error);
    }
  };

  const addCityToList = async selectedCity => {
    const updatedList = [...listCities, selectedCity];
    setListCities(updatedList);
    try {
      await AsyncStorage.setItem('listCities', JSON.stringify(updatedList));
    } catch (error) {
      console.log('Error saving data: ', error);
    }
  };
  //console.log(selectedCity);

  const removeCity = async selectedCity => {
    const cities = listCities.filter(
      city =>
        city.name !== selectedCity.name ||
        city.country !== selectedCity.country,
    );
    setListCities(cities);
    try {
      await AsyncStorage.setItem('listCities', JSON.stringify(cities));
    } catch (error) {
      console.log('Error deleting data: ', error);
    }
  };

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
                  if (!listCities.includes(selectedCity)) {
                    setListCities([...listCities, selectedCity]);
                    addCityToList(selectedCity);
                  }
                }}>
                <Text style={{color: '#ecf0f1'}}>Submit</Text>
              </TouchableOpacity>
              <SearchBar
                onChangeText={setSearch}
                onClear={() => setSearch(null)}
                placeholder="Search city"
                value={search}
              />
              <FlatList
                data={cities}
                style={{height: 400, zIndex: 999999999999}}
                renderItem={({item, index}) => (
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
                          selectedCity?.name == item.name &&
                          selectedCity?.country == item.country
                            ? '#2ecc71'
                            : '#ecf0f1',
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
              <TouchableOpacity
                style={[
                  styles.row,
                  {
                    justifyContent: 'center',
                    padding: 5,
                  },
                ]}
                onPress={() => {
                  setCurrentLocation(true);
                  requestLocationPermission();
                }}>
                <Text
                  style={[
                    styles.column,
                    {
                      flex: 1,
                      marginLeft: '8%',
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: currentLocation ? '#2ecc71' : '#ecf0f1',
                    },
                  ]}>
                  Current Location
                </Text>
              </TouchableOpacity>
              <FlatList
                data={listCities}
                style={{flex: 1, marginLeft: '10%', marginRight: '10%'}}
                renderItem={({item, index}) => (
                  <View style={styles.row}>
                    <TouchableOpacity
                      style={styles.column}
                      onPress={() => {
                        setSelectedCity(item);
                        setCurrentLocation(false);
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: 'bold',
                          color:
                            selectedCity?.name == item.name &&
                            selectedCity?.country == item.country
                              ? '#2ecc71'
                              : '#ecf0f1',
                        }}>
                        {item.name}, {item.country}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => removeCity(selectedCity)}
                      style={[styles.column, {alignItems: 'flex-end'}]}>
                      <RI name="remove" color="white" size={20} />
                    </TouchableOpacity>
                  </View>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  column: {},
});
