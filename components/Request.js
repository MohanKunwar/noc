import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { ButtonField } from '../views'
import moment from 'moment'
import SharedPrefs from '../helpers/SharedPrefs'
import { Fonts } from '../helpers/Fonts'
export default class Request extends Component {
    state = {
        MS: undefined,
        HSD: undefined,
        SKO: undefined
    }
    componentWillMount() {
        const { request, countdown } = this.props
        if (request.considereddate) {
            let consideredDate = moment(request.considereddate, 'YYYY-MM-DD')
            const today = moment(moment(new Date()).format('YYYY-MM-DD'))
            if (today.diff(consideredDate, 'day') === 0) {
                this.setState({ today: true })
            }
        } else {
            this.setState({today: countdown ? true : false })
        }
        if (request.demand && request.demand.length > 0) {
            request.demand.map(item => {
                console.log('demand', item)
                this.setState({ [item.fueltype]: item.demandunit > 0 ? parseInt(item.demandunit) : '0' })
            }, () => console.log('request', this.state))
        }
        this.setState({ buttonText: request.demand && request.demand.length === 0 ? 'Create' : request.status === 'Pending' ? 'Edit' : 'Details' })
    }
    async componentDidMount() {
        const dealer = await SharedPrefs.retrieveData('dealer')
        this.setState({ dealer: dealer })
    }
    navigate() {
        switch (this.state.buttonText) {
            case 'Edit': case 'Create': default: {
                this.props.navigation.replace('Demand')
                break
            }
            case 'Details': {
                this.props.navigation.navigate('Status', { demand: this.props.request })
                break
            }
        }
    }
    render() {
        const { request, origin } = this.props
        const { dealer, MS, HSD, SKO, today } = this.state
        return (
            <React.Fragment>
                <View style={styles.demandContainer}>
                    <View style={[styles.quantityContainer, { borderRightWidth: 1, borderRightColor: 'rgba(171, 171, 171, 0.5)' }]}>
                        {
                            dealer && dealer.petrol === 'true'
                                ?
                                <React.Fragment>
                                    <Text style={styles.label}>Petrol</Text>
                                    <Text style={[styles.quantity, { marginBottom: 15 }]}>{MS ? `${MS} LIT` : <Text style={styles.noDenamd}>No Demand</Text>}</Text>

                                </React.Fragment>
                                :
                                null
                        }
                        {
                            dealer && dealer.diesel === 'true'
                                ?
                                <React.Fragment>
                                    <Text style={styles.label}>Diesel</Text>
                                    <Text style={styles.quantity}>{HSD ? `${HSD} LIT` : <Text style={styles.noDenamd}>No Demand</Text>}</Text>

                                </React.Fragment>
                                :
                                null
                        }
                        {
                            dealer && dealer.kerosene === 'true'
                                ?
                                <React.Fragment>
                                    <Text style={styles.label}>Kerosene</Text>
                                    <Text style={styles.quantity}>{SKO ? `${SKO} LIT` : <Text style={styles.noDenamd}>No Demand</Text>}</Text>

                                </React.Fragment>
                                :
                                null
                        }
                    </View>
                    <View style={styles.statusContainer}>
                        <View style={[styles.status, { borderBottomWidth: 1, borderBottomColor: 'rgba(171, 171, 171, 0.5)' }]}>
                            <Text style={[styles.label, { paddingTop: 5, width: 30 + '%' }]}>Status</Text>
                            {
                                request.status === 'Pending'
                                    ?
                                    <Text style={[styles.pending, {color: '#EE272C', borderColor: '#ee272c', backgroundColor: 'rgba(238, 39, 44, 0.1)',}]}>Under Process</Text>
                                    :
                                    request.status === 'Approved'
                                        ?
                                        <Text style={[styles.pending, {color: '#5cb85c', borderColor: '#5cb85c', backgroundColor: 'rgba(92, 184, 92, 0.1)'}]}>Approved</Text>
                                        :
                                        <Text style={[styles.pending, {fontSize: 13, color: '#EE272C', borderColor: '#ee272c', backgroundColor: 'rgba(238, 39, 44, 0.1)',}]}>You haven't made any demand today</Text>
                            }
                        </View>
                        <View style={styles.status}>
                            <Text style={[styles.label, { width: 30 + '%', paddingTop: 5 }]}>{today ? 'Today' : 'For Tomorrow'}</Text>
                            <Text style={styles.date}>
                                {
                                    request.considereddate
                                        ? moment(request.considereddate).format('Do MMM, YYYY')
                                        : moment().format('Do MMM, YYYY')
                                }
                            </Text>
                        </View>
                        {
                            origin != 'Status'
                                ?
                                <View style={{marginLeft: 10}}>
                                    <ButtonField
                                        labelText={this.state.buttonText}
                                        onPress={this.navigate.bind(this)} />
                                </View>
                                : 
                                <View style={{marginLeft: 10}}>
                                    <ButtonField
                                        labelText={'Continue to Home'}
                                        onPress={() => this.props.navigation.navigate('Home')} />
                                </View>
                        }
                    </View>
                </View>
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    demandContainer: {
        borderWidth: 1,
        borderColor: 'rgba(171, 171, 171, 0.6)',
        borderRadius: 5,
        padding: 10,
        flexDirection: 'row'
    },
    quantityContainer: {
        width: 35 + '%'
    },
    label: {
        fontSize: 14,
        fontFamily: Fonts.font
    },
    quantity: {
        fontSize: 18,
        color: '#000',
        fontFamily: Fonts.fontDigit,
        paddingTop: 5
    },
    statusContainer: {
        width: 65 + '%',
    },
    status: {
        flexDirection: 'row',
        padding: 10,
        width: 100 + '%',
        textAlign: 'center',
        paddingRight: 0
    },
    date: {
        width: 100 + '%',
        fontSize: 18,
        color: '#000',
        paddingTop: 5,
        fontFamily: Fonts.fontDigit
    },
    pending: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        fontSize: 15,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        textAlign: 'center'
    },

    submitButton: {
        textAlign: 'right',
        backgroundColor: '#01A7DB',
        borderRadius: 5,
        alignItems: 'center',
        padding: 10,
        marginTop: 10,
        width: 50 + '%'
    },
    notice: {
        fontSize: 14,
        padding: 10,
        fontFamily: Fonts.fontItalic
    },
    noDenamd: {
        color: '#aaacaf'
    }
})