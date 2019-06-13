import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    View,
    TextInput,
    StyleSheet, Text
} from 'react-native';

import R from '../resources';

export default class PasswordField extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            icEye: 'visibility-off',
            password: true,
            BorderBottomColor: '#dedede'
        }
    }

    onFocus() {
        this.setState({
            BorderBottomColor: '#4d98af'
        })
      }
    
      onBlur() {
        this.setState({
          BorderBottomColor: '#dedede'
        })
      }

    changePwdType = () => {
        let newState;
        if (this.state.password) {
            newState = {
                icEye: 'visibility',
                password: false
            }
        } else {
            newState = {
                icEye: 'visibility-off',
                password: true
            }
        }

        // set new state value
        this.setState(newState)

    };


    render() {
        return (
            <View>
                <TextInput {...this.props}
                onBlur={ () => this.onBlur() }
                onFocus={ () => this.onFocus() }
                           style={[{width: 100 + '%',
                           height: 40,
                           borderBottomWidth: 1,
                           borderBottomColor: this.state.BorderBottomColor,
                           padding: 5,
                           marginBottom: 5}, this.props.error? styles.errorInput:null]}
                           secureTextEntry={this.state.password}/>
                <Icon style={styles.icon}
                      name={this.state.icEye}
                      size={this.props.iconSize}
                      color={this.props.iconColor}
                      onPress={this.changePwdType}
                />

                <Text style={styles.error}> {this.props.error ? this.props.error:''}</Text>
              
            </View>
        );
    }
}


export const styles = StyleSheet.create({

    icon: {
        position: 'absolute',
        top: 10,
        right: 5,
    },
    input: {
        width: 100 + '%',
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#dedede',
        padding: 5,
        marginBottom: 5,

    },
    error:{
        color: '#ff0000',
        fontSize:10,

    },

    errorInput:{
        borderColor: '#ff0000'
    }

});

PasswordField.defaultProps = {
iconSize:25,
label: 'Password',       
iconColor: '#01A7DB'
}
   