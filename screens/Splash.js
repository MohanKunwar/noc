import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import R from '../resources';
import SharedPrefs from '../helpers/SharedPrefs'
import Axios from '../Axios';
  ;

export default class SplashComponent extends Component {
  state = {
    loading: undefined
  }
  async componentDidMount() {
    const dealer = await SharedPrefs.retrieveData('dealer')
    if (dealer) {
      setTimeout(() => {
        this.setState({ loading: true })
        this.props.navigation.navigate('Home')
      }, 500)
    } else {
      this.setState({ loading: false })
    }

  }

  render() {
    return (
      <View style={styles.container} >
        <Image
          style={{ width: 200, height: 200 }}
          source={R.images.logo}
        />
        <Text>NEPAL OIL CORPORATION LIMITED</Text>
        <TouchableOpacity style={styles.buttonLogin}
          onPress={() =>
            this.props.navigation.navigate('Login')
          }>
          <Text style={{ color: R.colors.white, fontSize: 15 }}>
            LOGIN
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRegister}
          onPress={() => this.props.navigation.replace('ContinueRegister')}
        >
          <Text style={{ color: R.colors.white, fontSize: 15 }}>
            REGISTER
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRegister}
          onPress={() => this.props.navigation.navigate('Form')}
        >
          <Text style={{ color: R.colors.white, fontSize: 15 }}>
            Form
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRegister}
          onPress={() => this.props.navigation.navigate('Demand')}
        >
          <Text style={{ color: R.colors.white, fontSize: 15 }}>
            DEMAND
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRegister}
          onPress={() => this.props.navigation.navigate('Home')}
        >
          <Text style={{ color: R.colors.white, fontSize: 15 }}>
            HOME
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRegister}
          onPress={() => this.props.navigation.navigate('Register')}
        >
          <Text style={{ color: R.colors.white, fontSize: 15 }}>
            register 1
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRegister}
          onPress={() => this.props.navigation.navigate('ConfirmCode')}
        >
          <Text style={{ color: R.colors.white, fontSize: 15 }}>
            CONFIRM CODE
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRegister}
          onPress={() => this.props.navigation.navigate('VoucherSubmitted')}
        >
          <Text style={{ color: R.colors.white, fontSize: 15 }}>
            Voucher submitted
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRegister}
          onPress={() => this.props.navigation.navigate('SubmitVoucher')}
        >
          <Text style={{ color: R.colors.white, fontSize: 15 }}>
            Voucher submit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRegister}
          onPress={() => this.props.navigation.navigate('Notifications')}
        >
          <Text style={{ color: R.colors.white, fontSize: 15 }}>
            Notifications
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRegister}
          onPress={() => this.props.navigation.navigate('History')}
        >
          <Text style={{ color: R.colors.white, fontSize: 15 }}>
            history
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRegister}
          onPress={() => this.props.navigation.navigate('Status')}
        >
          <Text style={{ color: R.colors.white, fontSize: 15 }}>
            Status
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRegister}
          onPress={() => this.props.navigation.navigate('ForgotPassword')}
        >
          <Text style={{ color: R.colors.white, fontSize: 15 }}>Forgot Password
  </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRegister}
          onPress={() => this.props.navigation.navigate('ResetPassword')}
        >
          <Text style={{ color: R.colors.white, fontSize: 15 }}>
            Reset Password
  </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRegister}
          onPress={() => this.props.navigation.navigate('Test')}
        >
          <Text style={{ color: R.colors.white, fontSize: 15 }}>
            Test
  </Text>
        </TouchableOpacity>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    // height: 100 + '%',
    flex: 1,
    backgroundColor: R.colors.darkblue,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100 + '%',
  },
  buttonRegister: {

  },
  buttonLogin: {

  }
});



