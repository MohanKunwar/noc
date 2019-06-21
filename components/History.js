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
                                                    <Image style={styles.imageReject} source={R.images.cancel} />
                                                    <Text style={styles.reject}>{data.status}</Text>
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
        paddingHorizontal: 10,
        paddingVertical: 5,
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
        fontSize: 11,
        opacity: .7,
        borderBottomWidth: 1,
        borderColor: '#dedede',
        paddingBottom: 2,
        width: 80,
        marginBottom: 5,
    },
    label: {
        fontSize: 14,
        fontWeight: '300',
        opacity: .9,
        fontFamily: Fonts.font

    },
    quantity: {
        fontSize: 20,
        color: '#000',
        fontFamily: Fonts.fontDigit
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
    reject: {
        color: 'red',
        paddingLeft: 5
    },
    approvedQuentity: {
        fontFamily: Fonts.fontDigit
    },
    imageReject: {
        alignSelf: 'stretch',
        marginTop: 5,
        width: 12,
        height: 12
    }
})