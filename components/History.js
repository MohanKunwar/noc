import React from 'react'
import { Text, View, Image, ScrollView, StyleSheet } from 'react-native'
import moment from 'moment'
import R from '../resources'
import { Fonts } from '../helpers/Fonts';

function getNameFromType(type) {
    switch (type) {
        case 'MS': return 'Petrol';
        case 'HSD': return 'Diesel'
        case 'SKO': return 'Kerosene'
    }
}
export default History = ({ history }) => {
    return (
        history && history.length > 0
            ?
            history.map((data, index) =>
                <View style={styles.requestContaner} key={index}>
                    <Text style={styles.date}>{moment(data.date).format('Do MMM, YYYY')}</Text>
                    <ScrollView horizontal={true} contentContainerStyle={styles.demandContainer}>
                        {
                            data.demand.map((type, index) =>
                                <View style={styles.demandColumn} key={index}>
                                    <Text style={styles.label}>{getNameFromType(type.fueltype)}</Text>
                                    <Text style={styles.quantity}>{type.demandunit}</Text>
                                    {
                                        data.status === 'Approved'
                                            ?
                                            <View style={styles.statusRow}>
                                                <Image style={styles.image} source={R.images.approved} />
                                                <Text style={styles.approved}>{data.status}<Text style={styles.approvedQuantity}> {type.approvedunit}</Text></Text>
                                            </View>
                                            :
                                            data.status === 'Rejected' && index === 0
                                                ?
                                                <View style={styles.statusRow}>
                                                    <Image style={styles.image} source={R.images.approved} />
                                                    <Text style={styles.approved}>{data.status}</Text>
                                                </View>
                                                : null
                                    }
                                </View>
                            )
                        }
                    </ScrollView>
                </View>
            )
            :
            <Text>No demand has been made during the selected period</Text>
    )
}

const styles = StyleSheet.create({
    requestContaner: {
        borderWidth: 1,
        borderColor: 'rgba(171, 171, 171, 0.5)',
        padding: 10,
        borderRadius: 5,
        // flexDirection: 'row' ,
        flex: 1,
        flexDirection: 'column',
        marginBottom: 10,
    },
    demandContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly', width: 100 + '%',
    },
    demandColumn: {
        width: 50 + '%'
    },
    date: {
        fontSize: 12,
        opacity: .7,
    },
    label: {
        fontSize: 14,
        fontWeight: '300',
        opacity: .9,
        fontFamily: Fonts.font

    },
    quantity: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
        fontFamily: Fonts.font
    },
    statusRow: {
        flexDirection: 'row',
    },
    image: {
        alignSelf: 'stretch'
    },
    approved: {
        color: '#01A7DB',
        paddingLeft: 5
    },
    approvedQuentity: {
        fontWeight: '600',
        fontFamily: Fonts.font
    }
})