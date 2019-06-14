import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { HeaderBackButton } from 'react-navigation'
import DatePicker from 'react-native-datepicker'
import { TextField } from '../views'
import R from '../resources'
import { RNCamera } from 'react-native-camera'
import TakePicutre from '../components/TakePicture';

export default class SubmitVoucher extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Submit Voucher',
        headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />
    });
    state = {
        total: '',
        voucherNum: '',
        amount: '',
        date: '',
        bank: ''
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
        console.log(request, 'req')
        // get demand from 'submit voucher'
        // get rates for user 
    }
   
    imageFile = data => {
        console.log(data.uri)
        this.setState({openCamera: false, uri: data.uri })
    }
    cancel = () => {
        this.setState({openCamera: false})
    }
    render() {
        return (
            <ScrollView style={styles.container}>
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
                        value={this.state.voucherNum}
                        onChangeText={value =>
                            this.setState({
                                voucherNum: value.trim(),
                                errorVoucherNum: this.state.onSubmit ? Validation.validates('required', value.trim()) : null
                            })
                        }
                        error={this.state.errorVoucherNum} />

                    <Text style={styles.label}>Amount (in NRs.)</Text>
                    <TextField
                        value={this.state.amount}
                        onChangeText={value =>
                            this.setState({
                                amount: value.trim(),
                                errorAmount: this.state.onSubmit ? Validation.validates('required', value.trim()) : null
                            })
                        }
                        error={this.state.errorAmount} />
                    <Text style={styles.label}>Date</Text>
                    {/* todo date field  verify validations*/}
                    <DatePicker
                        style={{ width: 100 + '%', marginBottom: 15 }}
                        date={this.state.date}
                        mode="date"
                        placeholder="Select Date"
                        format="dd MMM YYYY"
                        // minDate="2016-05-01"
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
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => { this.setState({ date: date }) }}
                    />
                    <Text style={styles.label}>Bank Name</Text>
                    <TextField
                        value={this.state.bank}
                        onChangeText={value =>
                            this.setState({
                                bank: value,
                                // errorEmail: this.state.onSubmit ? Validation.validates('isFromList', value.trim()) : null
                            })
                        }
                        error={this.state.errorBank} />
                    {
                        this.state.openCamera
                            ?
                            <TakePicutre  imageFile={this.imageFile} cancel={this.cancel} />
                            : null
                    }
                    {
                        this.state.uri
                        ?
                        <Image style={styles.image} source={{ uri: this.state.uri }} />
                        : null
                    }
                    <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => this.setState({ openCamera: true })} style={styles.capture}>
                            <Text style={{ fontSize: 14 }}> SCAN </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
    submitVoucher = () => {
        this.props.navigation.replace('VoucherSubmitted')
    }
}
const styles = StyleSheet.create({

    container: {
        backgroundColor: '#fff',
        padding: 15,
        position: 'absolute',
        width: 100 + '%',
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
    }
});

const demand = [{
    'DemandID': '1',
    'DealerID': '1',
    'Date': '2019/1/1',
    'DemandTime': '13:28',
    'ConsideredDate': '2019/01/02',
    'Fuel': 'abc',
    'Type': 'abc',
    'DemandUnit': '123',
    'ApprovedUnit': '112',
    'TotalRate': '234',
    'Status': 'pending',
    'AppliedMode': 'xyz',
    'Remarks': 'abcdefghij',
},
{
    'DemandID': '2',
    'DealerID': '1',
    'Date': '2018/1/1',
    'DemandTime': '14:28',
    'ConsideredDate': '2018/01/02',
    'Fuel': 'abc',
    'Type': 'abc',
    'DemandUnit': '123',
    'ApprovedUnit': '112',
    'TotalRate': '234',
    'Status': 'rejected',
    'AppliedMode': 'xyz',
    'Remarks': 'abcdefghij',
},
{
    'DemandID': '3',
    'DealerID': '1',
    'Date': '2017/1/1',
    'DemandTime': '15:28',
    'ConsideredDate': '2017/01/02',
    'Fuel': 'abc',
    'Type': 'abc',
    'DemandUnit': '123',
    'ApprovedUnit': '112',
    'TotalRate': '234',
    'Status': 'approved',
    'AppliedMode': 'xyz',
    'Remarks': 'abcdefghij',
}]