import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ActivityIndicator, ToastAndroid, KeyboardAvoidingView, ScrollView } from 'react-native';
import { HeaderBackButton, Header } from 'react-navigation';

import { TextField, PasswordField, ButtonField, Loader } from '../../views'
import OfflineNotice from '../../helpers/OfflineNotice';
import R from '../../resources'
import Validation from '../../helpers/Validation'
import SharedPrefs from '../../helpers/SharedPrefs'
import Axios from '../../Axios'
import { Fonts } from '../../helpers/Fonts';

export default class Login extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'SIGN IN',
    headerStyle: { backgroundColor: '#fff' },
    headerTitleStyle: {
        flex: 1, textAlign: "center", color: '#01A7DB', fontSize: 19, fontWeight: '700', fontFamily: Fonts.font, marginLeft: -30},
    headerLeft: <HeaderBackButton onPress={() => navigation.navigate('Splash')} />
  });
  state = {
    dealerid: "",
    password: '',
    errorDealerid: "",
    errorPassword: '',
    onSubmit: false,
    loading: false
  }

  onLoginPressed = async () => {
    this.setState({
      onSubmit: true,
      serverError: false,
      errorDealerid: Validation.validates('required', this.state.dealerid),
      errorPassword: Validation.validates('password', this.state.password)
    }, () => {
      if (!this.state.errorDealerid && !this.state.errorPassword) {
        const data = new FormData();
        data.append('dealerid', this.state.dealerid);
        data.append('password', this.state.password);

        this.setState({
          loading: true
        })
        Axios.instance.post(Axios.API.auth.login, data).then(res => {
          if (res && res.data) {
            let response = res.data
            if (response.errorMsg) {
              this.setState({ serverError: true, loading: false })
              // this.setState({ loading: false })
            } else if (response.confirmed === false) {
              const datum = new FormData()
              datum.append('mobileno', response.mobileno)
              Axios.instance.post(Axios.API.auth.resendCode, datum).then(response1 => {
                if (response1.status === 200) {
                  this.props.navigation.replace('ConfirmCode', { mobileno: response.mobileno, origin: 'login' })
                }
              })
            } else if (response.dealer) {
              SharedPrefs.storeData('accesstoken', response.accesstoken)
              SharedPrefs.storeData('refreshtoken', response.refreshtoken)
              SharedPrefs.storeData('dealer', response.dealer)
              this.props.navigation.replace('Home')
            } else if (response.approved === false) {
              this.props.navigation.replace('AwaitApproval', { origin: 'login' })
            }
          } else {
            this.setState({ loading: false })
          }
        })

          .catch((error) => {
            console.error(error);
            this.setState({
              loading: false
            })
          });

      }
    })
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={Header.HEIGHT + 20}
        style={styles.container}
      >
        <ScrollView>
          <React.Fragment>
            <OfflineNotice />
            <Loader
              loading={this.state.loading} />

            <View style={styles.container}>
              {
                this.state.serverError ?
                  <Text style={styles.errorServer}>*Invalid ID or Password</Text>
                  : null
              }
              <Text style={styles.label}>
                Dealer ID
        </Text>
              <TextField
                value={this.state.dealerid}
                autoFocus={true}
                keyboardType={'numeric'}
                onChangeText={value =>
                  this.setState({
                    dealerid: value.trim(),
                    errorDealerid: this.state.onSubmit ? Validation.validates('required', value.trim()) : null
                  })
                }
                error={this.state.errorDealerid} />

              {/*password*/}

              <Text style={styles.label}>
                Password
        </Text>

              <PasswordField
                value={this.state.password}
                onChangeText={value => this.setState({
                  password: value.trim(),
                  errorPassword: this.state.onSubmit ? Validation.validates('password', value.trim()) : null
                })
                }
                error={this.state.errorPassword} />


              <ButtonField labelText={'LOGIN'} onPress={this.onLoginPressed} />

              <Text style={styles.forgetpwd} onPress={() => navigate('ForgotPassword')}>Forgot Password?</Text>

              <View style={styles.user}>
                <Text>
                  Don't have an Account
          </Text>


                <TouchableOpacity
                  onPress={() => navigate('Register')}
                >
                  <Text style={styles.signUp}>
                    Register
          </Text>
                </TouchableOpacity>

              </View>

            </View>
          </React.Fragment>
        </ScrollView>
      </KeyboardAvoidingView>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 20 + '%',
    width: 100 + '%',
    justifyContent: 'flex-start'
  },
  errorServer: {
    color: 'red',
    textAlign: 'center',
    padding: 10,
    fontWeight: '600',
    fontFamily: Fonts.font
  },
  input: {
    width: 100 + '%',
    height: 50,
    borderWidth: 1,
    borderColor: '#dedede',
    padding: 5,
    marginBottom: 5,
    fontSize: 15
  },
  label: {
    width: 100 + '%',
    height: 20,
    color: '#92A0B3',
    marginBottom: 5,
    fontSize: 15,
    fontFamily: Fonts.font
  },
  forgetpwd: {
    color: '#F52456',
    width: 100 + '%',
    height: 50,
    textAlign: 'right',
    fontSize: 15,
    padding: 5
  },
  user: {
    fontSize: 15,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  signUp: {
    paddingLeft: 5,
    color: R.colors.darkblue,
    fontSize: 15,
    fontWeight: '600',
    fontFamily: Fonts.font
  },
  error: {
    color: '#ff0000',
    fontSize: 11,
    marginBottom: 10,
    fontFamily: Fonts.font
  },
  errorInput: {
    borderColor: '#ff0000'
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    color: R.colors.darkblue
  }
});

