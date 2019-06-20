import React, { Component } from 'react'
import { View, ScrollView, StyleSheet, Image, Text } from 'react-native'
import { HeaderBackButton } from 'react-navigation'

import History from '../components/History'
import R from '../resources'
import Axios from '../Axios';
import { Fonts } from '../helpers/Fonts';
import { SectionLoader } from '../views';
export default class HistoryTabs extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'History',
        headerStyle: { backgroundColor: '#fff' },
        headerTitleStyle: {
            flex: 1, textAlign: "center", color: '#01A7DB', fontSize: 19, fontWeight: '700', fontFamily: Fonts.font, marginLeft: -30},
        headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />
    })
    state = {
        week: null,
        twoweek: null,
        month: null,
        history: null,
        btnSelected: 1
    }
    componentWillMount() {
        this.setState({ loading: true })
        this.getHistory('week')
    }
    getHistory(duration) {
        // this.setState({color: '#000'})
        if (this.state[duration]) {
            this.setState({ history: this.state[duration] })
        } else {
            Axios.authInstance.get(Axios.API.demand.report(duration)).then(response => {
                if (response.data.errorMsg === 'Invalid Token.') {
                    this.props.navigation.replace('Login')
                } else if (response.data)
                this.setState({
                    history: response.data.length > 0 ? response.data : null,
                    [duration]: response.data.length > 0 ? response.data : null,
                    loading: false
                })
            })
        }
    }
    
    render() {
        const { loading, history } = this.state
        return (
            <React.Fragment>
                <View style={styles.timeLine}>
                    <Text 
                    style={(this.state.btnSelected== 1)?styles.btnSelected:styles.notSelected} 
                    onPress={() => [this.setState({ btnSelected: 1 }), this.getHistory('week')]}
                    isActive={this.state.btnSelected === 1}
                    >Week</Text>
                    <Text 
                    style={(this.state.btnSelected== 2)?styles.btnSelected:styles.notSelected} 
                    onPress={() => [this.setState({ btnSelected: 2 }), this.getHistory('twoweek')]}
                    isActive={this.state.btnSelected === 2} 
                    >2 Weeks</Text>
                    <Text 
                    style={(this.state.btnSelected== 3)?styles.btnSelected:styles.notSelected} 
                    onPress={() => [this.setState({ btnSelected: 3 }), this.getHistory('month')]} 
                    isActive={this.state.btnSelected === 3}
                    >Month</Text>
                </View>     
                <ScrollView>
                    <View style={{padding: 15}}>
                    {
                        !loading
                            ?
                            <History history={history} />
                            : <SectionLoader loading={this.state.loading} />
                    }
                    <View style={styles.pdfContainer}>
                        <Text style={styles.pdfText}>Export your demand history in Excel </Text>
                        <Image style={styles.image} source={R.images.approved} />
                    </View>
                    </View>
                </ScrollView>
            </React.Fragment>
        )
    }
}
const styles = StyleSheet.create({
    title: {
        color: '#01A7DB',
        fontSize: 19,
        fontWeight: '700',
        fontFamily: Fonts.font
    },
    timeLine: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        padding: 10,
        borderBottomColor: '#dedede',
        borderBottomWidth: 1
    },
    requestContaner: {
        borderBottomWidth: 1,
        borderBottomColor: '#dedede',
        padding: 10
    },
    demandContainer: {
        flexDirection: 'row',
        width: 170 + '%',
        marginBottom: 20
    },
    demandColumn: {
        width: 50 + '%'
    },
    date: {
        fontSize: 14,
        opacity: .7,
        padding: 3
    },
    label: {
        fontSize: 14,
        fontWeight: '300',
        opacity: .9,
        padding: 3,
        fontFamily: Fonts.font
    },
    quantity: {
        fontSize: 20,
        fontWeight: '700',
        padding: 3,
        color: '#000',
        fontFamily: Fonts.font
    },
    statusRow: {
        flexDirection: 'row',
        padding: 3
    },
    image: {
        alignSelf: 'stretch',
        marginTop: 3,

    },
    approved: {
        color: '#01A7DB',
        paddingLeft: 5,

    },
    pdfContainer: {
        flexDirection: 'row',
        padding: 40
    },
    pdfText: {
        fontSize: 18,
        opacity: .7
    },
    approvedQuantity: {
        fontWeight: '600',
        fontFamily: Fonts.font
    },
    btnSelected: {
        color: '#000',
        fontWeight: '500'
     },
     notSelected : {
         color: '#626368'
     }
})