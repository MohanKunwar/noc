import React, { Component } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { HeaderBackButton } from 'react-navigation'
import R from '../resources'
import { Fonts } from '../helpers/Fonts';

export default class Notifications extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Notifications',
    headerStyle: { backgroundColor: '#fff' },
    headerTitleStyle: {
      flex: 1, textAlign: "center", color: '#01A7DB', fontSize: 19, fontWeight: '700', fontFamily: Fonts.font, marginLeft: -30},
    headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />
  })
  componentWillMount() {
  }
  render() {
    return (
      <View style={{padding: 10}}>
      <View style={styles.notificationContainer}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.logoContainer}>
        <Image
          style={styles.image}
          source={R.images.logo}
        />
        </View>
        <View style={styles.notificationDetails}>
        <Text style={styles.corporationName}>Nepal Oil Corporation</Text>
        <Text style={styles.demandDate}>2019-01-01</Text>
        </View>
        </View>
        <View style={styles.status}>
        <Text style={styles.completeMsg}>Your <Text>demand</Text> has been completed</Text>
        </View>
      </View>
      <View style={styles.notificationContainer}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.logoContainer}>
        <Image
          style={styles.image}
          source={R.images.logo}
        />
        </View>
        <View style={styles.notificationDetails}>
        <Text style={styles.corporationName}>Nepal Oil Corporation</Text>
        <Text style={styles.demandDate}>2019-01-01</Text>
        </View>
        </View>
        <View style={styles.status}>
        <Text style={styles.completeMsg}>Your <Text>demand</Text> has been completed</Text>
        </View>
      </View>
      <View style={styles.notificationContainer}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.logoContainer}>
        <Image
          style={styles.image}
          source={R.images.logo}
        />
        </View>
        <View style={styles.notificationDetails}>
        <Text style={styles.corporationName}>Nepal Oil Corporation</Text>
        <Text style={styles.demandDate}>2019-01-01</Text>
        </View>
        </View>
        <View style={styles.status}>
        <Text style={styles.completeMsg}>Your <Text>demand</Text> has been completed</Text>
        </View>
      </View>
      
      </View>
    )

  }
}
const styles = StyleSheet.create({
  notificationContainer:{
    paddingBottom: 10,
    marginTop: 10,
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(171, 171, 171, 0.5)',
  },
  logoContainer:{
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: '#01A7DB',
    paddingLeft: 12,
    paddingTop: 5,
  },
  image:{
    width: 25, 
    height: 35
  },
  notificationDetails:{
    flexDirection: 'column',
    paddingLeft: 10,
  },
  corporationName:{
    fontSize: 18,
    paddingTop: 5,
    fontFamily: Fonts.font,

  },
  demandDate:{
    fontSize: 12,
    opacity: 0.8,
    fontFamily: Fonts.fontDigit
  },
  status:{
    flexDirection: 'column',
     paddingLeft: 15, 
     paddingTop: 5
  },
  completeMsg:{
    color: '#000',
    fontFamily: Fonts.font,
  }
})