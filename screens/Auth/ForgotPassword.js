import React, { Component } from 'react'
import { TextField, ButtonField } from '../../views'
import { View, Text, StyleSheet } from 'react-native'
import Validation from '../../helpers/Validation'
import { HeaderBackButton } from 'react-navigation'
export default class ForgotPassword extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Forgot Password',
        headerStyle: { backgroundColor: '#fff' },
        headerTitleStyle: {
            flex: 1, textAlign: "center", color: '#01A7DB', fontSize: 19, fontWeight: '700', fontFamily: Fonts.font, marginLeft: -30},
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
            idError: Validation.validates('required', this.state.dealerId),
            contactError: Validation.validates('mobile', this.state.contact)
         },() => {
            if (!this.state.idError && !this.state.contactError) {
                // send confirm code api here
                this.props.navigation.replace('ConfirmCode')
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
                    value={this.state.dealerId}
                    onChangeText={value => this.setState({ dealerId: value, idError: this.state.onSubmit ? Validation.validates('required', value.trim()) : null })} 
                    error={this.state.idError}/>

                <Text style={styles.label}>Mobile Number</Text>
                <TextField
                    value={this.state.contact}
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
        paddingTop: 20+'%'
    },
    label: {
        width: 100 + '%',
        height: 20,
        color: '#92A0B3',
        marginBottom: 5,
        fontSize: 15
    }
})