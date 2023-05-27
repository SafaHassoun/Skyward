import React from 'react'
import { View, Button } from 'react-native'

export default function CurrentWeather({navigation}) {
    return (
        //<View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button
                    title="Go to Weather Details"
                    onPress={() => navigation.navigate('WeatherDetails')}
                />
            </View>
        //</View>
    )
}
