import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { HeaderBackButton } from 'react-navigation'
import { ButtonField, SectionLoader } from '../views';
import R from '../resources';
import Axios from '../Axios';
import Request from '../components/Request'
import ApprovedRequest from '../components/ApprovedRequest'
import { Fonts } from '../helpers/Fonts';

export default class Status extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Demand Status',
        headerStyle: { backgroundColor: '#fff' },
        headerTitleStyle: {
            flex: 1, textAlign: "center", color: '#01A7DB', fontSize: 19, fontWeight: '700', fontFamily: Fonts.font, marginLeft: -30
        },
        headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />
    })
    state = {
        request: undefined
    }
    componentWillMount() {
        const demand = this.props.navigation.getParam('demand')
        if (demand) {
            this.setState({ request: demand })
        } else {
            Axios.authInstance.get(Axios.API.demand.today).then(res => {
                if (res.data.errorMsg === 'Invalid Token.') {
                    this.props.navigation.replace('Login')
                } else {
                    this.setState({ request: res.data && res.data.demand ? res.data : null })
                }
            })
        }
    }
    render() {
        const { request } = this.state
        return (
            request != undefined
                ?
                request
                    ?
                    <View style={styles.container}>
                        {
                            request.status === 'Approved'
                                ?
                                <React.Fragment>
                                    <ApprovedRequest demand={request.demand} />
                                    {/* {
                                        request.vouchers
                                        ?
                                        request.vouchers.map((voucher, index) =>
                                            <VoucherView voucher={voucher} key={index} navigation={this.props.navigation} />
                                        )
                                        : null
                                    } */}
                                    <ButtonField labelText={'Submit Voucher'} onPress={() => this.props.navigation.navigate('SubmitVoucher', { request: request })} />
                                </React.Fragment>
                                :
                                <Request request={request} navigation={this.props.navigation} origin={'Status'} />
                        }
                    </View>
                    :
                    <View>
                        <Text>No demand </Text>
                    </View>
                : <SectionLoader loading={request === undefined} />


        )
    }
}
const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 5 + '%'
    },
    title: {
        color: '#01A7DB',
        fontSize: 19,
        fontWeight: '700',
        fontFamily: Fonts.font
    },
    demandContainer: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'rgba(171, 171, 171, 0.5)',
        borderRadius: 5,
        padding: 10,
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row',
        marginBottom: 20,
    },
    arrowRight: {
        marginLeft: -20,
        marginTop: 35
    },
    quantityContainer: {
        width: 35 + '%'
    },
    label: {
        opacity: 0.7,
        fontSize: 14,
        fontWeight: '400',
        fontFamily: Fonts.font
    },
    quantity: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
        fontFamily: Fonts.font
    },
})