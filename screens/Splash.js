import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import R from '../resources'
import SharedPrefs from '../helpers/SharedPrefs'
import { Fonts } from '../helpers/Fonts'
import { SectionLoader } from '../views'
import Pushbots from 'pushbots-react-native'

Pushbots.registerForRemoteNotifications()

export default class Splash extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: { marginTop: -60 }
  })
  state = {
    loading: false
  }
  componentWillMount() {
    Pushbots.addEventListener('received', this.onReceived)
    Pushbots.addEventListener('opened', this.onOpened)
  }

  componentWillUnmount() {
    console.log('splash unmounted')
    Pushbots.removeEventListener('received', this.onReceived)
    Pushbots.removeEventListener('opened', this.onOpened)
  }

  onReceived = notification => {
    console.log('received')
    this.setState({ notification: true }, () => {
      this.props.navigation.navigate('Notifications', { notification: notification })
    })
  }

  onOpened = notification => {
    this.setState({ notification: true }, () => {
      this.props.navigation.replace('Notifications', { notification: notification })
    })
  }
  async componentDidMount() {
    if (!this.state.notification) {
      this.setState({ loading: true })
      const dealer = await SharedPrefs.retrieveData('dealer')
      if (dealer) {
        setTimeout(() => {
          this.setState({ loading: false })
          this.props.navigation.replace('Home')
        }, 500)
      } else {
        this.setState({ loading: false })
      }
    }

  }

  render() {
    return (
      <View style={styles.container} >
        <Image
          style={{ width: 165, height: 240 }}
          source={R.images.logo}
        />
        <Text style={styles.TitleText}>NEPAL OIL CORPORATION LIMITED</Text>
        {
          !this.state.loading
            ?
            <View style={styles.homeButton}>
              <TouchableOpacity style={styles.buttonLogin}
                onPress={() =>
                  this.props.navigation.replace('Login')
                }>
                <Text style={[styles.buttonText, { color: '#fff' }]}>
                  Log In
          </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonRegister}
                onPress={() => this.props.navigation.replace('Register')}
              >
                <Text style={[styles.buttonText, { color: '#01A7DB' }]}>
                  Register
          </Text>
              </TouchableOpacity>
            </View>
            : <SectionLoader loading={this.state.loading} />
        }
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 100 + '%',
    flex: 1,
    backgroundColor: '#01A7DB',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100 + '%',
  },
  homeButton: {
    flexDirection: 'row',
    top: 70,
    paddingHorizontal: 20,
    position: 'relative',
    bottom: 20
  },
  buttonLogin: {
    width: 45 + '%',
    borderColor: '#fff',
    borderWidth: 2,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginRight: 10
  },
  buttonRegister: {
    width: 45 + '%',
    borderColor: '#fff',
    borderWidth: 2,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#fff',
    marginLeft: 10
  },
  TitleText: {
    color: '#fff',
    fontSize: 18,
    paddingVertical: 10,
    fontWeight: '700',
    fontFamily: Fonts.font,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: Fonts.font,
  }
})



