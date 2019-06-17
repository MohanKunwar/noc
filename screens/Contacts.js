import React, {Component} from 'react'
import {ScrollView, Text, StyleSheet} from 'react-native'
import {HeaderBackButton} from 'react-navigation'
import { Fonts } from '../helpers/Fonts';

export default class Contacts extends Component {
    static navigationOptions =({navigation}) => ({
        headerTitle: 'Dealer Contacts',
        headerStyle: { backgroundColor: '#fff' },
        headerTitleStyle: {
            flex: 1, textAlign: "center", color: '#01A7DB', fontSize: 19, fontWeight: '700', fontFamily: Fonts.font, marginLeft: -30},
        headerLeft: <HeaderBackButton onPress={() => navigation.goBack()} />
    })
    render() {
        return(
            <ScrollView style={styles.container}>
                <View style={styles.contactCard}>
                    <Text style={styles.name}>Jyoti Petrol Pump</Text>
                    <Text style={styles.address}>Butwal 12, Tamnagar</Text>
                    <Text style={styles.contact}>9804535353</Text>
                </View>
                <View style={styles.contactCard}>
                    <Text style={styles.name}>Jyoti Petrol Pump</Text>
                    <Text style={styles.address}>Butwal 12, Tamnagar</Text>
                    <Text style={styles.contact}>9804535353</Text>
                </View>
                <View style={styles.contactCard}>
                    <Text style={styles.name}>Jyoti Petrol Pump</Text>
                    <Text style={styles.address}>Butwal 12, Tamnagar</Text>
                    <Text style={styles.contact}>9804535353</Text>
                </View>
                <View style={styles.contactCard}>
                    <Text style={styles.name}>Jyoti Petrol Pump</Text>
                    <Text style={styles.address}>Butwal 12, Tamnagar</Text>
                    <Text style={styles.contact}>9804535353</Text>
                </View>
                <View style={styles.contactCard}>
                    <Text style={styles.name}>Jyoti Petrol Pump</Text>
                    <Text style={styles.address}>Butwal 12, Tamnagar</Text>
                    <Text style={styles.contact}>9804535353</Text>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    contactCard: {
        borderWidth: 1,
        borderColor: '#ababab'
    },
    name: {
        fontWeight: '700',
        fontSize: 18,
        fontFamily: Fonts.font
    },
    address: {
        fontWeight: '500',
        fontSize: 16,
        opacity: .8,
        fontFamily: Fonts.font
    },
    contact: {
        fontWeight: '700',
        fontSize: 16,
        fontFamily: Fonts.font
    }
})