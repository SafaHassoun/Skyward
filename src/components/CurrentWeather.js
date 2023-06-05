import React, { useState, useEffect } from 'react';
import { View, Button, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import MI from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

export default function CurrentWeather({ navigation }) {
    const [data, setData] = useState(null);
    const [date, setDate] = useState(null);
    const [city, setCity] = useState(null);
    const [temp, setTemp] = useState();
    const [icon, setIcon] = useState(null);
    const [feelslike, setFeelsLike] = useState();
    const [condition, setCondition] = useState(null);
    //const [day, setDay] = useState(0);

    const fetchWeather = async () => {
        try {
            const res = await axios.get('http://api.weatherapi.com/v1/current.json?key=1469bcf832b14b239c9114030232705&q=beirut&aqi=no');
            setDate(res.data.location.localtime);
            setCity(res.data.location.name);
            setTemp(res.data.current.temp_c);
            setFeelsLike(res.data.current.feelslike_c);
            setCondition(res.data.current.condition.text);

            (condition == "Sunny") ? setIcon("sun") : (condition == "Cloudy") ? setIcon("cloud-sun") :
                (condition == "Windy") ? setIcon("wind") : (condition == "Snowy") ? setIcon("snowflake") :
                    (condition == "Rainy") ? setIcon("cloud-rain") : (condition == "Clear") ? setIcon("moon") :
                        (condition == "Partly cloudy") ? setIcon("coud-moon") : setIcon("cloud-moon-rain")

            setData(res.data);
        } catch (error) {
            console.log('Error fetching weather data:', error);
        }
    };

    useEffect(() => {
        //getLocation();
        //getWeather();
        fetchWeather();
    }, []);

    if (!data) {
        return <Text>Loading...</Text>
    }


    return (
        <ImageBackground source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7vFpfZSjG1TiOCrvGcgo0JvbxRWvLeKCZmw&usqp=CAU' }} style={styles.image}>
            <View style={styles.container}>
                <View style={{ flex: 2 }}>
                    <Text style={styles.text} >{date}</Text>
                    <Text style={[styles.text, { fontSize: 30, fontStyle: "normal" }]} >{city}</Text>
                </View>

                <View style={{ flex: 3, flexDirection: "row" }}>
                    <Text style={{ fontSize: 70, color: "white", margin: 10 }} >{temp}°</Text>
                    <MI name={icon} size={120} color="white" style={{ margin: 20 }} />
                </View>

                <View style={{ flex: 4 }}>
                    <Text style={styles.text} >Feels like {feelslike}°</Text>
                    <Text style={styles.text} >{condition}</Text>
                </View>

                <View style={{ flex: 2, flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('WeatherDetails')} >
                        <Text style={[styles.text, { marginRight: 10 }]} >More Details</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Forecasts')} >
                        <Text style={[styles.text, { marginLeft: 10 }]} >7-day Forecast</Text>
                    </TouchableOpacity>
                </View>
                <Button style={styles.butt} title='Details...' onPress={() => navigation.navigate('others')} />
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

 //(weather == sunny) ? 'sunny' : (weather == sunny) ? 'sunny' : 'raining'


// const getLocation = ()=> {
    //     if(navigator.geolocation){
    //         navigator.geolocation.getCurrentPosition((position)=>{
    //             const la=position.coords.latitude;
    //             const lon=position.coords.longitude;
    //             setLat(la);
    //             setLong(lon);
    //             setUrl('http://api.weatherapi.com/v1/current.json?key=1469bcf832b14b239c9114030232705&q=${lat},${long}&aqi=no')
    //             console.log(lat);
    //             console.log(long);
    //         })
    //     }
    // }

    // const getWeather = async () => {
    //     try{
    //         const res = await axios.get(url)
    //         setData(res.data);
    //     }catch(error){
    //         console.log('Error fetching weather data:', error);
    //     }
    // }


// <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            //     <Text>Hello world</Text>
            //     <Button
            //         title="Go to Weather Details"
            //         onPress={() => navigation.navigate('WeatherDetails')}
            //     />
            // </View>