import React, { Component } from 'react'
import { PasswordField, ButtonField } from '../../views'
import { View, Text, StyleSheet } from 'react-native'
import { HeaderBackButton } from 'react-navigation'
import Validation from '../../helpers/Validation'
import Axios from '../../Axios';
export default class ResetPassword extends Component {
    state = {
        password: '',
        confirmPassword: '',
        errorPassword: null,
        errorConfirm: null,
        errorMatch: null
    }
    changePassword = () => {
        this.setState({
            onSubmit: true,
            errorPassword: Validation.validates('password', this.state.password),
            errorConfirm: Validation.validates('password', this.state.confirmPassword)
        }, () => {
            if (!this.state.errorPassword && !this.state.errorConfirm) {

                if (this.comparePassword(this.state.password, this.state.confirmPassword)) {
                    let data = new FormData()
                    data.append('password', this.state.password)
                    data.append('confirmpassword', this.state.confirmPassword)
                    Axios.authInstance.post(Axios.API.auth.changePassword, data).then(response => {
                        if (response.data.errorMsg === 'Invalid Token.') {
                            // multiple devices simultaneous login scenario only
                            this.props.navigation.replace('Login')
                        } else if (response.data.status === 200) {
                            let dealer = this.props.navigation.getParam('dealer')
                            if (dealer.status === 'Approved') {
                                this.props.navigation.replace('Home')
                            } else {
                                this.props.navigation.replace('AwaitApproval', {origin: 'resetPassword'})
                            }
                        }
                    })
                }
            }
        })
    }
    comparePassword(pass, conf, nav) {
        if (pass != conf) {
            this.setState({ errorMatch: `Passwords don't match` })
            return false
        } else {
            this.setState({ errorMatch: '' })
            return true
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>New Password</Text>
                <PasswordField
                    onChangeText={value => this.setState({
                        password: value,
                        errorPassword: this.state.onSubmit ? Validation.validates('password', value.trim()) : null
                    }, () => this.state.onSubmit ? this.comparePassword(value, this.state.confirmPassword) : null)}
                    error={this.state.errorPassword}
                />
                <Text style={styles.label}>Confirm Password</Text>
                <PasswordField
                    onChangeText={value =>
                        this.setState({
                            confirmPassword: value,
                            errorConfirm: this.state.onSubmit ? Validation.validates('password', value.trim()) : null
                        }, () => this.state.onSubmit ? this.comparePassword(this.state.password, value) : null)}
                    error={this.state.errorConfirm} />
                {
                    this.state.errorMatch ? <Text style={styles.error}>*{this.state.errorMatch}</Text> : null
                }
                <ButtonField labelText={'Submit'} onPress={this.changePassword} />
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
    },
    error: {
        color: '#ff0000',
        fontSize: 11,
        marginBottom: 10,

    },
})