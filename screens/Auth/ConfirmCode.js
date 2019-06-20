import React, { Component } from 'react'
import { Text, View, StyleSheet, KeyboardAvoidingView } from 'react-native'
import CodeInput from 'react-native-confirmation-code-input'
import { Header } from 'react-navigation';
import { ButtonField } from '../../views'
import Validation from '../../helpers/Validation';
import Axios from '../../Axios';
import SharedPrefs from '../../helpers/SharedPrefs';
import { Fonts } from '../../helpers/Fonts';
 
export default class ConfirmCode extends Component {
    state = {
        code: '',
        codeError: null,
        onSubmit: null
    }
    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Verification'
    });
    componentWillMount() {
        const { navigation } = this.props
        this.setState({ mobileNo: navigation.getParam('mobileno'), origin: navigation.getParam('origin') })
    }
    verifyCode = value => {
        this.setState({
            onSubmit: true,
            codeError: Validation.validates('required', this.state.code)
        }, () => {
            // api call to verify code
            if (!this.state.codeError) {
                const data = new FormData()
                data.append('mobileno', this.state.mobileNo)
                data.append('otp', this.state.code)
                Axios.instance.post(Axios.API.auth.mobileConfirmation, data).then(response => {
                    console.log(response)
                    if (response.data.errorMsg) {
                        this.setState({ codeError: 'Invalid Code' })
                    } else if (response.data.status === 200) {
                        if (this.state.origin === 'register') {
                            this.props.navigation.replace('AwaitApproval', {origin: 'register'})
                        } else if (this.state.origin === 'forgotpassword') {
                            this.props.navigation.replace('ResetPassword', {dealer: response.data.dealer})
                        } else if (this.state.origin === 'login') {
                            if (response.data.dealer) {
                                SharedPrefs.storeData('accesstoken', response.data.accesstoken)
                                SharedPrefs.storeData('refreshtoken', response.data.refreshtoken)
                                SharedPrefs.storeData('dealer', response.data.dealer)
                                this.props.navigation.replace('Home', { dealer: dealer })
                            } else {
                                this.props.navigation.replace('AwaitApproval', {origin:'login'})
                            }
                        }
                    }
                })
            }
        })

    }
    onFullfill(code) {
        this.setState({ code: code })
    }
    render() {
        return (
            <KeyboardAvoidingView
        keyboardVerticalOffset={Header.HEIGHT + 20}
        style={styles.container}
      >
            <View style={styles.container}>
                <Text style={styles.headerTitle}>Enter Verification Code</Text>
                <Text style={styles.headerText}>Please enter the verification code that was sent to <Text style={styles.text}>{this.state.mobileNo}</Text></Text>
                <View style={{ height: 25 + '%' }}>
                    <Text style={styles.error}>{this.state.codeError}</Text>
                    <CodeInput
                        ref="codeInputRef2"
                        // secureTextEntry
                        activeColor='rgba(1, 167, 219, 1)'
                        inactiveColor='rgba(1, 167, 219, 0.5)'
                        autoFocus={false}
                        className={'border-circle'}
                        ignoreCase={true}
                        inputPosition='center'
                        size={50}
                        onFulfill={(code) => this.onFullfill(code)}
                        containerStyle={{ marginTop: 30, width: 100 + '%'}}
                        codeInputStyle={{ borderWidth: 2 }}
                    />
                </View>
                <Text style={styles.text}>Resend Code</Text>
                <ButtonField labelText={'Verify'} onPress={this.verifyCode} />
            </View>
            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingTop: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        paddingTop: 20,
        color: '#000',
        fontFamily: Fonts.font
    },
    headerText: {
        opacity: .7,
        fontSize: 16,
        paddingTop: 10
    },
    text: {
        color: '#01A7DB',
        opacity: 1,
        paddingTop: 40,
        fontWeight: '500',
        fontSize: 17,
        paddingBottom: 10,
        textAlign: 'center',
        fontFamily: Fonts.font
    },
    input: {
        borderBottomWidth: 1,
        paddingTop: 10,
    },
    error:{
        color: '#ff0000',
        fontSize: 12,

    }
})