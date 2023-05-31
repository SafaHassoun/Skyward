import React from 'react'
import { Text ,View,Button} from 'react-native'

export default function OtherCities({navigation}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    )
}
