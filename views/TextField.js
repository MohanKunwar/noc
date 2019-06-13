
import React from 'react';

import {
    View,
    TextInput,
    Text,
    StyleSheet
} from 'react-native';

export default class TextField extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            BorderColor: '#dedede'
        }
    }

    onFocus() {
        this.setState({ BorderColor: '#4d98af' })
    }
    onBlur() {
        this.setState({ BorderColor: '#dedede' })
    }

    render() {
        return (
            <View>
                <TextInput {...this.props}
                    onBlur={() => this.onBlur()}
                    onFocus={() => this.onFocus()}
                    placeholderTextColor = '#d4d5d8'
                    style={[{
                        width: 100 + '%',
                        borderBottomWidth: 1,
                        height: 40,
                        borderColor: this.state.BorderColor,
                        padding: 5,
                        marginBottom: 3
                    }, this.props.error ? styles.errorInput : null]} />
                <Text style={styles.error}> {this.props.error ? this.props.error : ''}</Text>
            </View>
        );
    }

}


export const styles = StyleSheet.create({

    error: {
        color: '#ff0000',
        fontSize: 11,
        height: 15,
        zIndex: 111,
    },

    errorInput: {
        borderColor: '#ff0000'
    }
});
