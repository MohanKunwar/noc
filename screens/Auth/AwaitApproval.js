import React, {Component} from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import R from '../../resources'

export default class AwaitApproval extends Component {
    
    render() {

        const { navigation } = this.props
        const origin = navigation.getParam('origin')
        return (
            <View style={styles.container}>
            {
                origin === 'login' ?
                <Text style={styles.message}>Your account is awaiting approval from NOC. You will be notified upon approval</Text>
                : <Text styles={styles.message}>Your account has been successfully registered. You will be notified upon approval.</Text>
            }
                <Image src={R.images.submitted} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {

    },
    message: {
        
    }
})