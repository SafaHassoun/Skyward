import React from 'react'
import { Text, View } from 'react-native'
import cities from "cities.json"
import { Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger } from 'react-native-popup-menu'
import NI from 'react-native-vector-icons/FontAwesome';

export default function SideMenu() {
    return (
        <View>
            <MenuProvider style={styles.container}>
                <Menu>
                    <MenuTrigger>
                        <NI name="navicon" size={40} color="black" backgroundColor="white" style={{ marginRight: 20 }} />
                    </MenuTrigger>
                    <MenuOptions>
                        <FlatList data={cities}
                            keyExtractor={(item) => item.name}
                            renderItem={({ item }) => (
                                <MenuOption onSelect={() => alert(item.name)} customStyles={{ optionWrapper: { flexDirection: 'row', alignItems: 'center' } }}>
                                    <Text>{item.name}</Text>
                                </MenuOption>
                            )} />
                    </MenuOptions>
                </Menu>
            </MenuProvider>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        margin: 10
    }
})