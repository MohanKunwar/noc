import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { ButtonField } from '../views';
export default class VoucherView extends React.Component {

    render() {
        const { voucher, navigation, request } = this.props
        console.log(voucher)
        return (
            <View style={styles.card}>
                <Text>Voucher Number: {voucher.voucherno}</Text>
                <Text>Amount: {voucher.amount}</Text>
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