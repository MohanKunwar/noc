import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { ButtonField } from '../views';
import { Fonts } from '../helpers/Fonts';

export default class VoucherView extends React.Component {

    render() {
        const { voucher, navigation, request } = this.props
        console.log(voucher)
        return (
            <View style={styles.card}>
                <Text>Voucher Number : <Text style={{color: '#000'}}>{voucher.voucherno}</Text></Text>
                <Text style={{paddingBottom: 5}}>Amount : <Text style={{fontFamily: Fonts.fontDigit, color: '#000'}}>{voucher.amount}</Text></Text>
                <Image style={{width: 200, height: 200}} source={{uri: `http://noc.khoz.com.np/assets/uploads/voucher/${voucher.image}`}} />
                <ButtonField labelText={'Edit'} onPress={() => navigation.navigate('SubmitVoucher', {voucher: voucher, request: request})} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        marginTop: 15,
        marginBottom: 15
    }
})