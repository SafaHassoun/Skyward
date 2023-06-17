import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import MenuDrawer from 'react-native-side-drawer';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import CITIES from 'cities.json';
import {color} from 'react-native-elements/dist/helpers';
import MI from 'react-native-vector-icons/FontAwesome';
import {SearchBar} from 'react-native-elements';

export default function SideMenu({
  showSideMenu,
  setSelectedCity,
  selectedCity,
}) {
  const [showCities, setShowCities] = useState(false);
  const [listCities, setListCities] = useState([
    {
      country: 'LB',
      name: 'Zghartā',
      lat: '34.39739',
      lng: '35.89493',
    },
    {
      country: 'LB',
      name: 'Zahlé',
      lat: '33.84675',
      lng: '35.90203',
    },
    {
      country: 'LB',
      name: 'Tripoli',
      lat: '34.43352',
      lng: '35.84415',
    },
    {
      country: 'LB',
      name: 'Beirut',
      lat: '33.89332',
      lng: '35.50157',
    },
  ]);
  const [search, setSearch] = useState('');
  const [cities, setCities] = useState(null);
  useEffect(() => {
    searchCities();
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
                  setListCities([...listCities, selectedCity]);
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
                data={listCities}
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
});

{
  /* <View style={{flexDirection: 'row'}}>
  <TextInput
    placeholder="Search"
    value={text}
    onChangeText={setText}
    inputMode="search"
    style={{
      //backgroundColor: '#2980b9',
      color: '#ecf0f1',
      width: '80%',
      margin: 5,
    }}
  />
  <MI name="search" size={30} color="#fff" style={{marginTop: 12}} />
</View>; */
}
