import React, { Component } from 'react'
import { CameraRoll, KeyboardAvoidingView, ScrollView, View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native'
import { HeaderBackButton, Header } from 'react-navigation'
import DatePicker from 'react-native-datepicker'
import { TextField, CustomPicker, ButtonField } from '../views'
import R from '../resources'
import TakePicutre from '../components/TakePicture'
import { Fonts } from '../helpers/Fonts'
import moment from 'moment'
import Icon from 'react-native-vector-icons/Entypo';
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
                keyboardVerticalOffset={Header.HEIGHT + 20}>
                <ScrollView>
                    <View style={styles.container}>
                    <View style={styles.ratesContainer}>
                        {
                            this.state.demand
                                ?
                                this.state.demand.map((demand, index) =>
                                    <View key={index} style={[styles.rateTypes, this.state.demand.length > 1 && index === 0 ? { borderRightWidth: 1, borderColor: '#ababab' } : null]}>
                                        <Text style={styles.label}>{demand.fueltype} Rate</Text>
                                        <Text>NPR.<Text style={{color: '#000', fontWeight: '500'}}> {demand.totalrate / demand.approvedunit}/L</Text></Text>
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
                                ? <Text style={styles.error}>{this.state.errVoucherdate}</Text>
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
                                ? <Text style={styles.error}>Please select a bank</Text>
                                : null
                        }
                        {
                            this.state.openCamera
                                ?
                                <TakePicutre
                                    imageFile={this.imageFile}
                                    style={styles.OpenCamera}
                                    cancel={this.cancel} />
                                :
                                this.state.uri
                                    ?
                                    <View style= {{position: 'relative'}}>
                                        <ImageBackground style={styles.image} source={{ uri: this.state.uri }} />

                                        {
                                            !this.state.voucherimage
                                                ?
                                                <View style={{flexDirection: 'row', marginTop: 10, flex: 1, justifyContent: 'space-around',}}>
                                                    <TouchableOpacity onPress={() => this.setState({ voucherimage: this.state.base64, errVoucherimage: null })} style={styles.useThis}>
                                                        <Text style={{ fontSize: 14, color: '#fff', fontWeight: '500'}}> Use this </Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => this.setState({ openCamera: true })} style={styles.takeAnother}>
                                                        <Text style={{ fontSize: 14, color: 'green', fontWeight: '500' }}> Take another </Text>
                                                    </TouchableOpacity>
                                                </View>
                                                : <Image style={styles.imageApproved} source={R.images.approved} />
                                        }
                                    </View>
                                    :
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                                        <TouchableOpacity onPress={() => this.setState({ openCamera: true, image: null })} style={styles.capture}>
                                        <Icon style={styles.icon}
                                                name={'camera'}
                                                size={40}
                                                color={'#545556'}
                                            />
                                        </TouchableOpacity>
                                    </View>
                        }
                        {
                            this.state.errVoucherimage
                                ?
                                this.state.uri
                                    ? <Text style={styles.error}>Please accept or Reject the Preview Image</Text>
                                    : <Text>Please add an Image of Voucher</Text>
                                : null

                        }
                    </View>
                    <ButtonField labelText={'Submit'} onPress={this.onSubmit.bind(this)} />
                    {/* <TouchableOpacity >
                        <Text style={{ fontSize: 14 }} onPress={this.onSubmit} style={styles.submit}> Submit </Text>
                    </TouchableOpacity> */}
                    </View>
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
        color: '#626368'
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
        left: 0,
        right: 0,
        width: 100 + '%',
        zIndex: 99
    },
    image: {
        width: 100 + '%',
        height: 300,
    },
    submit: {
        bottom: 0
    },
    useThis:{
        width: 45 + '%',
        borderWidth: 1,
        borderColor: 'green',
        backgroundColor: 'green',
        paddingVertical: 3,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginRight: 15
    },
    takeAnother:{
        width: 45 + '%',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'green',
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 4,
        marginLeft: 15,
    },
    imageApproved: {
        alignSelf: 'stretch',
        marginTop: 3,
        position: 'absolute',
        top: 10,
        right: 10
    },
    error:{
        color: 'red', 
        fontSize: 12
    }
});
