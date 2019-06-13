import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { HeaderBackButton } from 'react-navigation'
import { ButtonField } from '../views';
import R from '../resources';
import { Fonts } from '../helpers/Fonts';

export default class ApprovedRequest extends Component {
    state = {
        demand: undefined,
        kerosene:undefined,
        diesel: undefined,
        petrol: undefined
    }
    componentWillMount() {
        this.props.demand.map(item => {
            if (item.fueltype==='MS') {
                this.setState({petrol: item})
            } else if (item.fueltype === 'HSD') {
                this.setState({diesel: item})
            } else if (item.fueltype === 'SKO') {
                this.setState({kerosene: item})
            }
        })
        this.setState({demand: this.props.demand})
    }
    render() {
        const {petrol, diesel, kerosene} = this.state
        return (
            <View style={styles.demandContainer}>
                <View style={[styles.quantityContainer, { width: 50 + '%', borderRightWidth: 1, borderRightColor: 'rgba(171, 171, 171, 0.5)' }]}>
                    <Text style={[styles.label, {fontWeight: '700'}]}>Requested</Text>
                    {
                        petrol
                        ?
                        <React.Fragment>

                    <Text style={styles.label}>Petrol</Text>
                    <Text style={[styles.quantity, { marginBottom: 10 }]}> {petrol.demandunit} LIT</Text>
                        </React.Fragment>
                        : 
                        null
                    }
                    {
                        diesel
                        ?
                        <React.Fragment>
                        <Text style={styles.label}>Diesel</Text>
                        <Text style={styles.quantity}>{diesel.demandunit} LIT</Text>
                        </React.Fragment>
                        : null
                    }
                    {
                        kerosene
                        ? 
                        <React.Fragment>
                        <Text style={styles.label}>Kerosene</Text>
                        <Text style={styles.quantity}>{kerosene.demandunit} LIT</Text>
                        </React.Fragment>
                        : null
                    }
                </View>
                <Image style={styles.arrowRight} source={R.images.arrow_right} />
                <View style={[styles.quantityContainer, { paddingLeft: 30 }]}>
                    <Text style={[styles.label, {fontWeight: '700'}]}>Approved</Text>
                {
                        this.state.petrol
                        ?
                        <React.Fragment>

                    <Text style={styles.label}>Petrol</Text>
                    <Text style={[styles.quantity, { marginBottom: 10 }]}>{petrol.approvedunit} LIT</Text>
                        </React.Fragment>
                        : 
                        null
                    }
                    {
                        this.state.diesel
                        ?
                        <React.Fragment>
                        <Text style={styles.label}>Diesel</Text>
                        <Text style={styles.quantity}>{diesel.approvedunit} LIT</Text>
                        </React.Fragment>
                        : null
                    }
                    {
                        this.state.kerosene
                        ? 
                        <React.Fragment>
                        <Text style={styles.label}>Kerosene</Text>
                        <Text style={styles.quantity}>{kerosene.approvedunit} LIT</Text>
                        </React.Fragment>
                        : null
                    }
                </View>
            </View>
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
    demandContainer: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'rgba(171, 171, 171, 0.5)',
        borderRadius: 5,
        padding: 20,
        paddingTop: 7 + '%',
        paddingBottom: 15,
        flexDirection: 'row',
        marginBottom: 20,
    },
    arrowRight: {
        marginLeft: -20,
        marginTop: 45
    },
    quantityContainer: {
        width: 45 + '%'
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
        fontFamily: Fonts.font,
        color: '#000',
    },
})