import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { TextField, PasswordField, ButtonField, CustomPicker } from '../../../views'
import { HeaderBackButton, Header } from 'react-navigation'
import Validation from '../../../helpers/Validation';
import Axios from '../../../Axios'
export default class ContinueRegister extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Register',
    headerLeft: <HeaderBackButton onPress={() => navigation.navigate('Register')} />,
    headerStyle: { backgroundColor: '#fff' },
    headerTitleStyle: {
      flex: 1, textAlign: "center", color: '#01A7DB', fontSize: 19, fontWeight: '700', marginLeft: -30},
  });
  componentWillMount() {
    Axios.instance.get(Axios.API.static.formData).then(res => {
      console.log(res)
      this.setState({ formData: res.data ? res.data : null })
    })
  }
  constructor(props) {
    super(props);
    panvat: '',
      this.state = {
        panvat: '',
        dealertype: null,
        registereddepo: null,
        mobileno: '',
        landlineno: '',
        password: '',
        confirmpassword: '',

        errorVat: '',
        errorDealerType: '',
        errorDepo: '',
        errorMobile: '',
        errorLandline: '',
        errorPassword: '',
        errorConfirmPassword: '',
      };
  }


  registerClicked() {
    let prevScreenData
    const { errorVat, errorDealerType, errorDepo, errorMobile, errorLandline, errorPassword, errorConfirmPassword } = this.state
    this.setState({
      onSubmit: true,
      errorVat: Validation.validates('required', this.state.panvat),
      errorDealerType: !this.state.dealertype ? 'Dealer Type is empty' : null,
      errorDepo: !this.state.registereddepo ? 'Registered Depo is empty' : null,
      errorMobile: Validation.validates('mobile', this.state.mobileno),
      errorLandline: Validation.validates('number', this.state.landlineno),
      errorPassword: Validation.validates('password', this.state.password),
      errorConfirmPassword: Validation.validates('password', this.state.confirmpassword),
    }, () => {
      if (!errorVat && !errorDealerType && !errorDepo && !errorMobile && !errorLandline && !errorPassword && !errorConfirmPassword) {
        if (this.comparePassword(this.state.password, this.state.confirmpassword)) {
          prevScreenData = this.props.navigation.getParam('data')
        }
        if (prevScreenData) {
          const data= new FormData()
          data.append('dealerid', prevScreenData.dealerid)
          data.append('dealername', prevScreenData.dealername)
          data.append('street', prevScreenData.street)
          data.append('state', prevScreenData.state)
          data.append('district', prevScreenData.district)
          data.append('vdc_municipality', prevScreenData.vdc_municipality)
          data.append('wardno', prevScreenData.wardno)
          data.append('panvat', this.state.panvat)
          data.append('dealertype', this.state.dealertype)
          data.append('registereddepo', this.state.registereddepo)
          data.append('mobileno', this.state.mobileno)
          data.append('landlineno', this.state.landlineno)
          data.append('password', this.state.password)
          data.append('confirmpassword', this.state.confirmpassword)
        
          Axios.instance.post(Axios.API.auth.register, data).then(res => {
            let response = res.data
            console.log('register res', res);
            if (response.errorMsg) {
              const server_error = response.errorMsg
              this.setState({ serverError: true })
              this.props.navigation.navigate('Register', {data: server_error, prevScreenData: null})
            } 
             else if (res.data) {
              this.setState({value: null})
              this.props.navigation.replace('ConfirmCode', { 'mobileno': this.state.mobileno, 'origin': 'register' })
            }
             else if (response.approved === false) {
              this.props.navigation.navigate('Register')
            }
          })
        }   
      }
    })
  }

  comparePassword(pass, conf) {
    if (pass != conf) {
      this.setState({ errorMatch: `Passwords don't match` })
      return false
    } else {
      this.setState({ errorMatch: '' })
      return true
    }
  }
  render() {
    const { formData } = this.state
    const options = ['One', 'Two', 'Three', 'Four', 'Five']
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={Header.HEIGHT + 20}
        style={styles.container}
      >
        <ScrollView>
          <Text style={styles.registerlabel}>VAT No</Text>
          <TextField
            placeholder="enter vat no."
            onChangeText={value =>
              this.setState({
                panvat: value.trim(),
                errorVat: Validation.validates('required', value.trim()),
              })
            }
            error={this.state.errorVat}
          />
          {
            formData
              ?
              <React.Fragment>
                <Text style={styles.registerlabel}>Dealer Type</Text>
                <CustomPicker
                  placeholder={'Select Dealer Type'}
                  options={formData.dealertype}
                  getLabel={item => item ? item.type : null}
                  onValueChange={value => this.setState({ dealertype: value ? value.dealertypeid : null, errorDealerType: null })}
                />
                {
                  this.state.onSubmit
                    ?
                    <Text class={styles.error}>{this.state.errorDealerType}</Text>
                    : null
                }

                <Text style={styles.registerlabel}>Registered Depo</Text>
                <CustomPicker
                  placeholder={'Registered Depot'}
                  options={formData.registereddepo}
                  getLabel={item => item ? item.depo_name: null}
                  onValueChange={value => this.setState({ registereddepo: value ? value.depo_name : null, errorDepo: null  })}
                />
                {
                  this.state.onSubmit
                    ?
                    <Text class={styles.error}>{this.state.errorDepo}</Text>
                    : null
                }
              </React.Fragment>

              : null
          }


          <Text style={styles.registerlabel}>Landline No</Text>
          <TextField
            keyboardType="number-pad"
            placeholder="Registered Landline No."
            onChangeText={value =>
              this.setState({
                landlineno: value.trim(),
                errorLandline: Validation.validates('number', value.trim()),
              })
            }
            error={this.state.errorLandline}
          />

          <Text style={styles.registerlabel}>Mobile No</Text>
          <TextField
            keyboardType="number-pad"
            placeholder="Mobile Number"
            onChangeText={value =>
              this.setState({
                mobileno: value.trim(),
                errorMobile: Validation.validates('mobile', value.trim()),
              })
            }
            error={this.state.errorMobile}
          />

          <Text style={styles.registerlabel}>Password</Text>
          <PasswordField
            placeholder="enter password"
            onChangeText={value =>
              this.setState({
                password: value.trim(),
                errorPassword: this.state.onSubmit ? Validation.validates('password', value.trim()) : null,
              }, () => this.state.onSubmit ? this.comparePassword(value, this.state.confirmpassword) : null)
            }
            error={this.state.errorPassword}
          />

          <Text style={styles.registerlabel}>Confirm Password</Text>
          <PasswordField
            placeholder="confirm password"
            onChangeText={value =>
              this.setState({
                confirmpassword: value.trim(),
                errorConfirmPassword: this.state.onSubmit ? Validation.validates('password', value.trim()) : null,
              }, () => this.state.onSubmit ? this.comparePassword(this.state.password, value) : null)
            }
            error={this.state.errorConfirmPassword}
          />
          <Text>{this.state.errorMatch ? this.state.errorMatch : null}</Text>
          <ButtonField labelText={'Register'} onPress={this.registerClicked.bind(this)} />

        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: '#000',
  },
  registerlabel: {
    color: '#626368',
    paddingTop: 5,
    paddingLeft: 5,
  },
  button: {
    backgroundColor: '#01A7DB',
    color: '#fff',
  },
});
