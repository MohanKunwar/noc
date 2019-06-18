import React, { Component } from 'react'
import { TextField, ButtonField } from '../../views'
import { View, Text, StyleSheet } from 'react-native'
import Validation from '../../helpers/Validation'
import { HeaderBackButton } from 'react-navigation'
import { Fonts } from '../../helpers/Fonts'
import Axios from '../../Axios';
export default class ForgotPassword extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Forgot Password',
        headerStyle: { backgroundColor: '#fff' },
        headerTitleStyle: {
            flex: 1, textAlign: "center", color: '#01A7DB', fontSize: 19, fontWeight: '700', fontFamily: Fonts.font, marginLeft: -30
        },
        headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />
    });
    state = {
        dealerId: '',
        contact: '',
        idError: null,
        contactError: null,
        onSubmit: null
    }
    sendConfirmCode = () => {

        this.setState({
            onSubmit: true,
            idError: this.state.dealerId ? null : 'Required',
            contactError: Validation.validates('mobile', this.state.contact)
        }, () => {
            if (!this.state.idError && !this.state.contactError) {
                let data = new FormData()
                data.append('dealerid', this.state.dealerId)
                data.append('mobileno', this.state.contact)
                Axios.instance.post(Axios.API.auth.forgotPassword, data).then(response => {
                    console.log('response', response)
                    if (response.data) {
                        if (response.data.errorMsg) {
                            console.log(response.data.errorMsg)
                        } else {
                        console.log(response)
                        this.props.navigation.replace('ConfirmCode', { origin: 'forgotpassword', mobileno: this.state.contact })
                        }
                    } else {
                        console.warn('internal server error')
                    }
                })
            }
        }

        )


    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>Dealer ID</Text>
                <TextField
                    autoFocus={true}
                    keyboardType={'number-pad'}
                    value={this.state.dealerId}
                    onChangeText={value => this.setState({ dealerId: value, idError: this.state.onSubmit ? Validation.validates('required', value.trim()) : null })}
                    error={this.state.idError} />

                <Text style={styles.label}>Mobile Number</Text>
                <TextField
                    value={this.state.contact}
                    keyboardType={'number-pad'}
                    onChangeText={value => this.setState({ contact: value, contactError: this.state.onSubmit ? Validation.validates('mobile', value.trim()) : null })}
                    error={this.state.contactError} />
                <ButtonField labelText={'Submit'} onPress={this.sendConfirmCode} />
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 20 + '%'
    },
    label: {
        width: 100 + '%',
        height: 20,
        color: '#92A0B3',
        marginBottom: 5,
        fontSize: 15
    }
})