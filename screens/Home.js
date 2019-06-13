import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment'
import CountDown from 'react-native-countdown-component'

import R from '../resources'
import Request from '../components/Request'
import History from '../components/History'
import SharedPrefs from '../helpers/SharedPrefs';
import Axios from '../Axios';
import { Fonts } from '../helpers/Fonts';
export default class Home extends React.Component {
    state = {
        currReq: undefined,
        loginRequired: undefined
    }
    componentWillMount() {
        this.getValues()

        console.log('abc')
        Axios.instance.get(Axios.API.demand.time).then(response => {
            let currTime = moment(response.data.currenttime, 'HH:mm:ss')
            let deadline = moment(response.data.deadline, 'HH:mm:ss')
            this.setState({ countdown: currTime.isBefore(deadline) ? moment(deadline).diff(currTime) : false })
        })
        Axios.authInstance.get(Axios.API.demand.today).then(response => {
            if (response.data && !response.data.errorMsg) {
                if (response.data.demand) {
                    // response.data.status = 'Approved'
                    this.setState({ currReq: response.data, loginRequired: false })
                } else {
                    this.setState({ currReq: false, loginRequired: false })
                }
            } else if (response.data.errorMsg === 'Invalid Token.') {
                this.props.navigation.navigate('Login')
            }
        })
        Axios.authInstance.get(Axios.API.demand.report('week')).then(response => {
            if (response.data) {
                this.setState({ history: response.data })
            }
        })
    }

    static navigationOptions = ({ navigation }) => ({
        headerStyle: { backgroundColor: '#01A7DB' },
        headerTitle: (<HomeTitle />),
        headerLeft: <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon style={styles.icon}
                name={'menu'}
                size={30}
                color={'#fff'}
            />
        </TouchableOpacity>
    })

    getValues = async () => {
        let dealer = await SharedPrefs.retrieveData('dealer')
        console.log('dealer', dealer)
        if (dealer) {
            this.setState({ dealer: dealer })
        } else {
            this.props.navigation.navigate('Login')
        }
    }
    render() {
        const { dealer, currReq, countdown, history } = this.state
        return (
            this.state.dealer && this.state.loginRequired !== undefined ?
                <React.Fragment>
                 {/* <ActivityIndicator animating={!dealer || !currReq } /> */}
                    <View style={{ width: 100 + '%', height: 60, backgroundColor: '#01A7DB' }} />
                    <View style={{ marginRight: 15, marginLeft: 15, flex: 1 }}>
                        <View style={styles.userContainer}>
                            <View style={styles.userInfo}>
                                <Text style={{
                                    fontSize: 22, color: '#01A7DB', fontWeight: '800',
                                    fontFamily: Fonts.font
                                }}>{dealer.dealername}</Text>
                                <Text style={{
                                    fontSize: 20, color: '#01A7DB', fontWeight: '500',
                                    fontFamily: Fonts.font
                                }}>
                                    {dealer.vdc_municipality} {dealer.wardno}, {dealer.street}
                                </Text>
                            </View>
                            <Image
                                style={{ width: 20 + '%' }}
                                source={R.images.MS}
                                resizeMode={'contain'}
                            />
                        </View>

                        <ScrollView>
                            {
                                currReq != undefined
                                    ?
                                    <Request navigation={this.props.navigation} request={currReq} />
                                    : null
                            }
                            {
                                currReq.status === 'Pending'
                                    ?
                                    <Text style={styles.notice}>*You will be notified once your request is approved</Text>
                                    :
                                    countdown != undefined
                                        ?
                                        countdown
                                            ?
                                            <View style={styles.countdownContainer}>
                                                <Text style={{
                                                    color: '#EE272C',
                                                    width: 60 + '%',
                                                    fontSize: 12,
                                                    paddingTop: 28,
                                                    fontWeight: '500',
                                                    fontFamily: Fonts.font
                                                }}>Time remaining to make demand</Text>
                                                <CountDown
                                                    until={this.state.countdown / 1000}
                                                    timeToShow={['H', 'M', 'S']}
                                                    onFinish={() => this.setState({ countdown: false })}
                                                    size={17}
                                                    digitStyle={{ padding: 0 }}
                                                    digitTxtStyle={{ color: '#01A7DB' }}
                                                    showSeparator
                                                    separatorStyle={{ color: '#01A7DB', paddingBottom: 20, paddingLeft: 0, paddingRight: 0 }}
                                                    style={styles.countdown}
                                                    timeLabels={{ h: 'HRS', m: 'MIN', s: 'SEC' }}
                                                />
                                            </View>
                                            :
                                            <Text style={{ fontSize: 12, paddingTop: 5, color: '#EE272C' }}>Demand orders for today is closed. New demand will be reviewed for tomorrow</Text>
                                        : null
                            }
                            <Text style={{ paddingBottom: 5, paddingTop: 10 }}>Demand History</Text>
                            {
                                history
                                    ?
                                    <History history={history} />
                                    : <Text>loading</Text>
                            }
                        </ScrollView>
                    </View>
                </React.Fragment>
                : null
        );

    }
    componentWillUnmount() {
        console.log('unmounted home')
    }
}
const styles = StyleSheet.create({
    homeHeader: {
        flexDirection: 'row',
        width: 100 + '%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#01A7DB'
    },
    headerText: {
        fontSize: 25,
        paddingLeft: 10,
        fontFamily: Fonts.font,
        color: '#fff',
        fontWeight: '900',
        fontFamily: Fonts.font
    },
    icon: {
        paddingLeft: 15,
    },
    userContainer: {
        marginTop: -40,
        marginBottom: 20,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'rgba(171, 171, 171, 0.3)',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#fff',
        shadowColor: '#969191',
        shadowOffset: { width: 1, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 3,
    },
    userInfo: {
        width: 70 + '%'
    },
    countdown: {
        borderWidth: 1,
        borderColor: '#01A7DB',
        backgroundColor: '#e5f5f9',
        borderRadius: 5,
        width: 40 + '%',
        paddingBottom: 4,
        justifyContent: 'flex-end',
    },
    countdownContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 15,
    },
})
const HomeTitle = () => {
    return (
        <View style={styles.homeHeader}>
            <Image
                style={{ width: 30, height: 30 }}
                source={R.images.logo}
                resizeMode={'contain'}
            />
            <Text style={styles.headerText} >NOC</Text>
        </View>
    )
}