import React, {Component} from 'react'
import {View, Image, TouchableOpacity, Text, Dimensions, StyleSheet} from 'react-native'
import { HeaderBackButton } from 'react-navigation';
import R from '../resources'
import { Fonts } from '../helpers/Fonts';
export default class VoucherSubmitted extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerLeft: <HeaderBackButton onPress={() => navigation.replace('Home')} />
    })
    render() {
       return(
            <View style={{flex: 1, flexDirection: 'column', margin: 10, alignItems: 'center',}}>
                <Text style={styles.textTop}>Voucher Submitted</Text>
                <Text style={styles.textBottom}>Your Voucher has been successfully submitted. You will be notified once it is approved.</Text>
                <View style={styles.imgView}>
                <Image style={styles.submittedImg} resizeMode={'contain'} source={R.images.submitted}/>
                {/* <SvgUri width='200' height='200' fill='#01A7DB' source={R.images.submitted} /> */}
                </View>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.replace('Home')}>
                    <Text style={styles.buttonText}>Continue to Home</Text>
                </TouchableOpacity>
            </View>
            )
    }
}

const win = Dimensions.get('window')
const styles= StyleSheet.create({
    textTop: {
        fontSize: 22,
        marginTop: 25+'%',
        fontWeight: '800',
        paddingBottom: 10,
        fontFamily: Fonts.font
    },
    textBottom: {  
        fontSize: 15,
        fontWeight: '400',
        opacity: 0.7,
        fontFamily: Fonts.font
    },
    imgView: {
        marginTop: 5+'%',
        padding: 30,
        height: 40+'%'
    },
    submittedImg: {
        flex: 1,
        alignSelf: 'stretch',
        width: win.width,
        height: win.height,
    },
    button: {
        position: 'absolute',
        bottom: 40,
        marginTop: 5,
        width: 100+'%',
        backgroundColor: '#01A7DB',
        borderRadius: 5,
        textAlign: 'center',
        padding: 10
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#FFF',
        fontWeight: '700',
        fontFamily: Fonts.font
    }
})