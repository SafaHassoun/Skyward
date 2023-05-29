import React, { useState, useEffect } from 'react';
import { View, Button, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import MI from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

export default function CurrentWeather({ navigation }) {
    const [data, setData] = useState([]);

    // useEffect(() => {
    //     axios.get('http://api.weatherapi.com/v1/current.json?key=1469bcf832b14b239c9114030232705&q=Tripoli-Lebanon&aqi=no')
    //         .then((res) => {
    //             this.setData({
    //                 data: res.data
    //             })
    //         })
    // }, [data])

    return (
        <ImageBackground source={{ uri: 'https://reactjs.org/logo-og.png' }} style={styles.image}>
            <View style={styles.container}>
                <View style={{ flex: 2 }}>
                    <Text style={styles.text} >Monday, 25 May 2023</Text>
                    <Text style={[styles.text, { fontSize: 35, fontStyle: "normal" }]} >Tripoli</Text>
                </View>

                <View style={{ flex: 2, flexDirection: "row" }}>
                    <Text style={{ fontSize: 90, color: "white" }} >22*</Text>
                    <MI name="weather-lightning-rainy" size={100} color="white" />
                </View>

                <View style={{ flex: 4 }}>
                    <Text style={styles.text} >Feels like 22*</Text>
                    <Text style={styles.text} >Cloudy</Text>
                </View>

                <View style={{ flex: 2, flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('WeatherDetails')} >
                        <Text style={[styles.text, { marginRight: 10 }]} >More Details</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Forecasts')} >
                        <Text style={[styles.text, { marginLeft: 10 }]} >7-day Forecast</Text>
                    </TouchableOpacity>

                    {/* <Button style={styles.butt} title='Details...' onPress={() => navigation.navigate('Weatherdetails')} /> 

                        <Button style={styles.butt} title='7-day Forecast' onPress={() => navigation.navigate('Forecasts')} />  */}
                </View>
            </View>
        </ImageBackground>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    text: {
        color: "white",
        fontSize: 15,
        padding: 5,
        fontStyle: "italic"
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    button: {
        margin: 20,
        borderRadius: 50
    }
})


// <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            //     <Text>Hello world</Text>
            //     <Button
            //         title="Go to Weather Details"
            //         onPress={() => navigation.navigate('WeatherDetails')}
            //     />
            // </View>