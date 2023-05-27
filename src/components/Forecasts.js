import React from 'react'
import { View , Button } from 'react-native'

export default function Forecasts({navigation}) {
    return (
        //<View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button title="Go back" onPress={() => navigation.goBack()} />
            </View>
        //</View>
    )
}
