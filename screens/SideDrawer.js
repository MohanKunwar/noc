import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import R from '../resources'
import Icon from 'react-native-vector-icons/Entypo'
import SharedPrefs from '../helpers/SharedPrefs';
import { Fonts } from '../helpers/Fonts';

export default class SideDrawer extends Component {
  componentWillMount() {
  }
  logout() {
    SharedPrefs.clear()
    this.props.navigation.navigate('Splash')
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <TouchableOpacity onPress={() => this.props.navigation.closeDrawer()} style={styles.closeButton}>
            <Icon style={styles.icon}
              name={'cross'}
              size={30}
              color={'#fff'}
            />

          </TouchableOpacity>
          <Image
            style={styles.userImage}
            source={R.images.diesel}
            resizeMode={'contain'}
          />
          <View style={styles.userInfo}>
            <Text style={{
              fontSize: 18, color: '#fff', fontWeight: '700',
              fontFamily: Fonts.font
            }}>Jyoti Petrol Pump</Text>
            <Text style={{
              fontSize: 12, color: '#fff', fontWeight: '400',
              fontFamily: Fonts.font
            }}>Butwal 5, Golpark</Text>
          </View>
        </View>

        <View style={styles.topLinks}>
          <TouchableOpacity style={styles.link} onPress={() => this.props.navigation.navigate('Demand')}>
            <Icon style={styles.icon}
              name={'line-graph'}
              size={20}
              color={'#01A7DB'}
            />
            <Text style={styles.linkText}>Make Demand</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link} onPress={() => this.props.navigation.navigate('Status')}>
            <Icon style={styles.icon}
              name={'gauge'}
              size={20}
              color={'#01A7DB'}
            />
            <Text style={styles.linkText}>Status</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link} onPress={() => this.props.navigation.navigate('History')}>
            <Icon style={styles.icon}
              name={'back-in-time'}
              size={20}
              color={'#01A7DB'}
            />
            <Text style={styles.linkText}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link} onPress={() => this.props.navigation.navigate('Notifications')}>
            <Icon style={styles.icon}
              name={'bell'}
              size={20}
              color={'#01A7DB'}
            />
            <Text style={styles.linkText}>Notifications</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomLinks}>
          <TouchableOpacity style={styles.link} onPress={() => this.props.navigation.navigate('Demand')}>
            <Icon style={styles.icon}
              name={'info-with-circle'}
              size={20}
              color={'#01A7DB'}
            />
            <Text style={styles.linkText}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link} onPress={this.logout.bind(this)}>
            <Icon style={styles.icon}
              name={'log-out'}
              size={20}
              color={'#01A7DB'}
            />
            <Text style={styles.linkText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 100,
    height: 100 + '%'
  },
  closeButton: {
    position: 'absolute',
    marginTop: 35,
    width: 100 + '%',
    paddingLeft: 20,
  },
  userContainer: {
    backgroundColor: '#01A7DB',
    padding: 10,
    paddingTop: 100,
    paddingBottom: 40,
    flexDirection: 'row',
  },
  userImage: {
    alignSelf: 'stretch'
  },
  userInfo: {
    width: 70 + '%',
    justifyContent: 'center',
    paddingLeft: 10
  },
  topLinks: {
    padding: 10,
    flexDirection: 'column',
    height: 35 + '%'
  },
  bottomLinks: {
    position: 'absolute',
    bottom: 50,
    paddingLeft: 10,
    flexDirection: 'column',
    marginTop: 20
  },
  link: {
    flexDirection: 'row',
    marginTop: 20,
  },
  icon: {
  },
  linkText: {
    paddingLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    fontFamily: Fonts.font
  }
});