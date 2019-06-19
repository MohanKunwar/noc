import React, { Component } from 'react'
import { CameraRoll, KeyboardAvoidingView, ScrollView, View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import { HeaderBackButton, Header } from 'react-navigation'
import DatePicker from 'react-native-datepicker'
import { TextField, CustomPicker } from '../views'
import R from '../resources'
import TakePicutre from '../components/TakePicture'
import { Fonts } from '../helpers/Fonts'
import moment from 'moment'
import Axios from '../Axios';

export default class SubmitVoucher extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Submit Voucher',
        headerStyle: { backgroundColor: '#fff' },
        headerTitleStyle: {
            flex: 1, textAlign: "center", color: '#01A7DB', fontSize: 19, fontWeight: '700', fontFamily: Fonts.font, marginLeft: -30
        },
        headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />
    });
    state = {
        vouchernum: '',
        amount: '',
        voucherdate: '',
        bank: '',
        voucherimage: '',

        errVouchernum: null,
        errAmount: null,
        errVoucherdate: null,
        errBank: null,
        errVoucherimage: null,

        bankOptions: [
            {
                id: 1,
                name: 'Bank 1'
            },
            {
                id: 2,
                name: 'Bank 2'
            }, {
                id: 3,
                name: 'Bank 3'
            }
        ]
    }
    componentWillMount() {
        const request = this.props.navigation.getParam('request')
        let totalText = ''
        let totalAmount = 0
        if (request) {
            request.demand.map((demand, index) => {
                totalAmount += parseInt(demand.totalrate)
                totalText += `${parseInt(demand.approvedunit)} * ${parseInt(demand.totalrate) / parseInt(demand.approvedunit)} `
                if (index < request.demand.length - 1) {
                    totalText += 'and '
                } else {
                    totalText += ` = ${totalAmount}`
                }
            })
            this.setState({ totalText: totalText, demand: request.demand })
        }
    }
    imageFile = data => {
        this.setState({ openCamera: false, uri: data.uri, base64: data.base64 })
    }
    cancel = () => {
        this.setState({ openCamera: false })
    }


    onSubmit = () => {
        const { vouchernum, amount, voucherdate, bank, voucherimage, base64 } = this.state
        this.setState({
            errVouchernum: vouchernum ? null : 'Required',
            errAmount: amount ? null : 'Required',
            errVoucherdate: voucherdate ? null : 'Required',
            errBank: bank ? null : 'Required',
            errVoucherimage: voucherimage ? null : true
        }, () => {
            if (
                !this.state.errVouchernum &&
                !this.state.errAmount &&
                !this.state.errVoucherdate &&
                !this.state.errBank &&
                !this.state.errVoucherimage
            ) {
                let request = this.props.navigation.getParam('request')
                let commaDelimitedDemands = ''
                if (request) {
                    request.demand.map((demand, index) => {
                        if (index === request.demand.length - 1) {
                            commaDelimitedDemands += demand.demandid
                        } else {
                            commaDelimitedDemands += demand.demandid + ','
                        }
                    })

                    let data = new FormData()
                    data.append('voucherimage', base64)
                    data.append('voucherno', vouchernum)
                    data.append('amount', amount)
                    data.append('voucherdate', voucherdate)
                    data.append('bankname', bank)
                    data.append('demandids', commaDelimitedDemands)
                    Axios.authInstance.post(Axios.API.voucher.submit, data).then(response => {
                        if (response.data && response.data.status === 200) {
                            this.props.navigation.navigate('VoucherSubmitted')
                        }
                    })
                } else {
                    console.log('something went wrong')
                }
            }
        })
    }

    render() {
        return (
            <KeyboardAvoidingView
                keyboardVerticalOffset={Header.HEIGHT + 20}
                style={styles.container}>
                <ScrollView>
                    <View style={styles.ratesContainer}>
                        {
                            this.state.demand
                                ?
                                this.state.demand.map((demand, index) =>
                                    <View key={index} style={[styles.rateTypes, this.state.demand.length > 1 && index === 0 ? { borderRightWidth: 1, borderColor: '#ababab' } : null]}>
                                        <Text style={styles.label}>{demand.fueltype} Rate</Text>
                                        <Text>NPR. {demand.totalrate / demand.approvedunit}/L</Text>
                                    </View>
                                )
                                : null
                        }
                    </View>
                    <Text>You need total of {this.state.totalText} to make this purchase</Text>
                    <View style={styles.formContainer}>
                        <Text style={styles.label}>Voucher Number</Text>
                        <TextField
                            keyboardType="number-pad"
                            value={this.state.vouchernum}
                            onChangeText={value =>
                                this.setState({
                                    vouchernum: value.trim(),
                                    errVouchernum: value ? null : 'Required'
                                })
                            }
                            error={this.state.errVouchernum} />

                        <Text style={styles.label}>Amount (in NRs.)</Text>
                        <TextField
                            value={this.state.amount}
                            keyboardType='number-pad'
                            onChangeText={value =>
                                this.setState({
                                    amount: value.trim(),
                                    errAmount: value ? null : 'Required'
                                })
                            }
                            error={this.state.errAmount} />
                        <Text>Today's Date: {moment(new Date()).format('MM/DD/YYYY')}</Text>
                        <Text style={styles.label}>Voucher Date</Text>
                        {/* todo date field  verify validations*/}
                        <DatePicker
                            style={{ width: 100 + '%', marginBottom: 15 }}
                            date={this.state.voucherdate}
                            mode="date"
                            placeholder="Select Date"
                            format="YYYY-MM-DD"
                            maxDate={new Date()}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 3,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    borderColor: '#fff',
                                    borderBottomColor: '#ababab',
                                    borderBottomWidth: 1
                                }
                            }}
                            onDateChange={(date) => { this.setState({ voucherdate: date }) }}
                        />
                        {
                            this.state.errVoucherdate
                                ? <Text>{this.state.errVoucherdate}</Text>
                                : null
                        }
                        {
                            this.state.bankOptions
                                ?
                                <React.Fragment>
                                    <Text style={styles.label}>Bank Name</Text>
                                    <CustomPicker
                                        placeholder={'Select a Bank'}
                                        options={this.state.bankOptions}
                                        getLabel={item => item.name}
                                        onValueChange={value => this.setState({ bank: value.name })}
                                    />
                                    {
                                        this.state.errBank
                                            ?
                                            <Text>{this.state.errorBank}</Text>
                                            : null
                                    }
                                </React.Fragment>
                                : <Text>Failed to load bank list, please reload</Text>
                        }
                        {
                            this.state.errBank
                                ? <Text>Please select a bank</Text>
                                : null
                        }
                        {
                            this.state.openCamera
                                ?
                                <View style={styles.OpenCamera}>
                                    <TakePicutre
                                        imageFile={this.imageFile}
                                        cancel={this.cancel} />
                                </View>
                                :
                                this.state.uri
                                    ?
                                    <React.Fragment>
                                        <ImageBackground style={styles.image} source={{ uri: this.state.uri }} />

                                        {
                                            !this.state.voucherimage
                                                ?
                                                <View>
                                                    <TouchableOpacity onPress={() => this.setState({ voucherimage: this.state.base64, errVoucherimage: null })} >
                                                        <Text style={{ fontSize: 14 }}> Use this </Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => this.setState({ openCamera: true })}>
                                                        <Text style={{ fontSize: 14 }}> Take another </Text>
                                                    </TouchableOpacity>
                                                </View>
                                                : <Text>Accepted git over image</Text>
                                        }
                                    </React.Fragment>
                                    :
                                    <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                                        <TouchableOpacity onPress={() => this.setState({ openCamera: true, image: null })} style={styles.capture}>
                                            <Text style={{ fontSize: 14 }}> SCAN </Text>
                                        </TouchableOpacity>
                                    </View>
                        }
                        {
                            this.state.errVoucherimage
                                ?
                                this.state.uri
                                    ? <Text>Please accept or Reject the Preview Image</Text>
                                    : <Text>Please add an Image of Voucher</Text>
                                : null

                        }
                    </View>
                    <TouchableOpacity >
                        <Text style={{ fontSize: 14 }} onPress={this.onSubmit} style={styles.submit}> Submit </Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
    submitVoucher = () => {
        this.props.navigation.replace('VoucherSubmitted')
    }
}
const styles = StyleSheet.create({

    container: {
        backgroundColor: '#fff',
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    ratesContainer: {
        flexDirection: 'row',
        margin: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rateTypes: {
        textAlign: 'center',
        width: 40 + '%',
        marginRight: 20
    },
    formContainer: {
        marginTop: 15
    },
    label: {
        fontSize: 15,
        opacity: 0.7
    },
    scanButton: {
        backgroundColor: '#01b7da',
        borderRadius: 5,
        alignItems: 'center',
        padding: 10,
        marginBottom: 10
    },
    submitButton: {
        backgroundColor: '#01A7DB',
        borderRadius: 5,
        alignItems: 'center',
        padding: 10,
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
        zIndex: -1
    },
    OpenCamera: {
        position: 'absolute',
        top: 0,
        width: 100 + '%',
        zIndex: 99
    },
    image: {
        width: 100 + '%',
        height: 300,
        backgroundColor: 'red'
    },
    submit: {
        bottom: 0
    }
});
