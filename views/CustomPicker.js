import React from 'react'
import { CustomPicker } from 'react-native-custom-picker'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

export default class Picker extends React.Component {
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

    renderField(settings) {
        const { selectedItem, defaultText, getLabel, clear } = settings
        return (
            <View style={styles.container}>
                <View>
                    {!selectedItem && <Text style={[styles.text, { color: 'grey' }]}>{defaultText}</Text>}
                    {selectedItem && (
                        <View style={styles.innerContainer}>
                            <TouchableOpacity style={styles.clearButton} onPress={clear}>
                                <Text style={{ color: '#fff' }}>Clear</Text>
                            </TouchableOpacity>
                            <Text style={[styles.text, { color: selectedItem.color }]}>
                                {getLabel(selectedItem)}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        )
    }

    renderOption(settings) {
        const { item, getLabel } = settings
        return (
          <View style={styles.optionContainer}>
            <View style={styles.innerContainer}>
              <View style={[styles.box]} />
              <Text style={{ color: 'black', alignSelf: 'flex-start' }}>{getLabel(item)}</Text>
            </View>
          </View>
        )
      }

    render() {
        return (
            <CustomPicker {...this.props}
                fieldTemplate={this.renderField}
                style={[styles.pickerContainer, { borderBottomColor: this.state.BorderColor}]}
                modalStyle={{
                    backgroundColor: '#fff', 
                    padding: 10,
                    paddingTop: 0, 
                    paddingBottom: 25,
                    borderRadius: 8,
                }}
                optionTemplate={this.renderOption}
                backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.7)'}}
                
            />
        )
    }
}

const styles = StyleSheet.create({
    pickerContainer:{
        height: 50,
        width: 100 + '%',
        borderBottomWidth: 1,
        padding: 5,
        marginBottom: 3    
    },
    optionContainer: {
        paddingBottom: 10,
        paddingStart: 10,
        paddingTop: 15,
        borderBottomColor: 'rgba(1, 167, 219, 0.5)',
        borderBottomWidth: 1
      },
      optionInnerContainer: {
        flex: 1,
        flexDirection: 'row'
      },
    //   box: {
    //     height: 15,
    //     backgroundColor: 'red'
    //   }
})