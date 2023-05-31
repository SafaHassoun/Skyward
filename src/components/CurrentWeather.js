import React, { useState, useEffect} from 'react';
import { View, Button, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import MI from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';


export default function CurrentWeather({ navigation }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchWeather = async()=>{
            try{
                const res= await axios.get('http://api.weatherapi.com/v1/current.json?key=1469bcf832b14b239c9114030232705&q=Tripoli-Lebanon&aqi=no');
                setData(res.data);
            }catch(error){
                console.log('Error fetching weather data:', error);
            }
        };
        fetchWeather();
    }, []);

    if (!data) {
        return <Text style={{ flex: 1, textAlign:"center" }}>Loading...</Text>;
      }


    return (
        <ImageBackground source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7vFpfZSjG1TiOCrvGcgo0JvbxRWvLeKCZmw&usqp=CAU' }} style={styles.image}>
            <View style={styles.container}>
                <View style={{ flex: 2 }}>
                    <Text style={styles.text} >Tuesday, 30 May 2023</Text>
                    <Text style={[styles.text, { fontSize: 30, fontStyle: "normal" }]} >{data.location.name}</Text>
                </View>

                <View style={{ flex: 2, flexDirection: "row" }}>
                    <Text style={{ fontSize: 60, color: "white" ,margin:10}} >{data.current.temp_c}°</Text>
                    <MI name="weather-lightning-rainy" size={100} color="white" style={{margin:20}}/>
                </View>

                <View style={{ flex: 4 }}>
                    <Text style={styles.text} >Feels like {data.current.feelslike_c}°</Text>
                    <Text style={styles.text} >{data.current.condition.text}</Text>
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
        fontSize: 12,
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