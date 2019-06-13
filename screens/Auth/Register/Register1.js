import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput
} from 'react-native';
// import { CustomPicker } from 'react-native-custom-picker'
import { TextField, ButtonField, CustomPicker } from '../../../views';
import { HeaderBackButton, Header } from 'react-navigation';
import Validation from '../../../helpers/Validation';
import Axios from '../../../Axios';

export default class Register extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Register',
    headerLeft: <HeaderBackButton onPress={() => navigation.goBack()} />,
    headerStyle: { backgroundColor: '#fff' },
    headerTitleStyle: {
      color: '#01A7DB',
      textAlign: 'center',
      flex: 1,
    },
  });

  constructor(props) {
    super(props);
    this.state = {
      dealerid: '',
      dealername: '',
      street: '',
      state: '',
      district: '',
      vdc_municipality: '',
      wardno: '',

      stateOptions: null,
      districtOptions: null,
      vdcOptions: null,
      wardOption:null,
      

      errorId: '',
      errorName: '',
      errorStreet: '',
      errorState: '',
      errorDistrict: '',
      errorVdc: '',
      errorWard: '',

    };
  }

  componentWillMount() {
    Axios.instance.get(Axios.API.address.states).then(response => {
      if (response.data) {
        this.setState({ stateOptions: response.data })
      }
    })

  }
  
  stateSelected(state) {
    if (state) {
      this.setState({
        state: state.stateid,
        errorState: null,
        district: null,
        districtOptions: null,
        vdc_municipality: null,
        vdcOptions: null,
        wardno: null,
        wardOption: null
      })
      // if (state.stateid === 5) {KC
      Axios.instance.get(Axios.API.address.district(state.stateid)).then(response => {
        if (response && response.data) {
          this.setState({ districtOptions: response.data })
        }
      })
    }
  }

  districtSelected(district) {
    if (district) {
      this.setState({
        district: district.districtid,
        errorDistrict: null,
        vdc_municipality: null,
        vdcOptions: null,
        wardno: null,
        wardOption: null
      })
      Axios.instance.get(Axios.API.address.vdc(district.districtid)).then(response => {
        if (response && response.data) {
          this.setState({ vdcOptions: response.data })
        }

      })
    }
  }
  vdcSelected = (vdc_municipality) => {
    if (vdc_municipality) {
      this.setState({
        vdc_municipality: vdc_municipality.vdcname,
        errorVdc: null,
        wardno: null,
        wardOption: null
      })
      let ward = [];
      let wards = parseInt(vdc_municipality.totalwards)
      for (let i = 1; i <= wards; i++) {
        ward.push(i)
      }
      this.setState({
        wardOption: ward
      })
    }
  }
  continueClicked() {
    const nameError = Validation.validates('name', this.state.dealername);
    const idError = Validation.validates('required', this.state.dealerid);
    const streetError = Validation.validates('required', this.state.street);
    const stateError = !this.state.state ? <Text style={styles.error}>State is empty</Text> : null
    const districtError = !this.state.district ? <Text style={styles.error}>District is empty</Text> : null
    const vdcError = !this.state.vdc_municipality ? <Text style={styles.error}>VDC is empty</Text> : null
    const wardError = !this.state.wardno ? <Text style={styles.error}>Ward number is empty</Text> : null

    this.setState({
      onSubmit: true,
      errorName: nameError,
      errorId: idError,
      errorStreet: streetError,
      errorState: stateError,
      errorDistrict: districtError,
      errorVdc: vdcError,
      errorWard: wardError
    })

    if (!nameError && !idError && !streetError && !stateError && !districtError && !vdcError && !wardError) {
      const data = {
        dealerid: this.state.dealerid,
        dealername: this.state.dealername,
        street: this.state.street,
        state: this.state.state,
        district: this.state.district,
        vdc_municipality: this.state.vdc_municipality,
        wardno: this.state.wardno,
      }
      this.props.navigation.navigate('ContinueRegister', { data: data })
    }
  }

  renderField(settings) {
    const { selectedItem, defaultText, getLabel, clear } = settings
    return (
      <View style={styles.container}>
        <View>
          {!selectedItem && <Text style={[styles.text, { color: 'grey' }]}>{defaultText}</Text>}
          {selectedItem && (
            <View style={styles.innerContainer}>
              <TouchableOpacity style={styles.clearButton} onPress={clear}>
                <Text style={{ color: '#fff' }}>Clear</Text>
              </TouchableOpacity>
              <Text style={[styles.text, { color: selectedItem.color }]}>
                {getLabel(selectedItem)}
              </Text>
            </View>
          )}
        </View>
      </View>
    )
  }


  render() {
    const options = ['One', 'Two', 'Three', 'Four', 'Five']
    const server_error = this.props.navigation.getParam('data')
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={Header.HEIGHT + 20}
        style={styles.container}>
        < View>
          <ScrollView>
            <Text style={{ color: '#ff0000' }}>{server_error}</Text>
            <Text style={styles.registerlabel}>Dealer ID</Text>
            <TextField
              autoFocus={true}
              placeholder="Dealer id"
              onChangeText={value =>
                this.setState({
                  dealerid: value.trim(),
                  errorId: Validation.validates('required', value.trim()),
                })
              }
              error={this.state.errorId}
            />

            <Text style={styles.registerlabel}>Petrol Pump Name</Text>
            <TextField
              autoFocus={true}
              placeholder="Petrol Pump Name"
              onChangeText={value =>
                this.setState({
                  dealername: value,
                  errorName: Validation.validates('name', value.trim()),
                })
              }
              error={this.state.errorName}
            />

            <Text style={styles.registerlabel}>Street Address</Text>
            <TextField
              placeholder="Address"
              onChangeText={value =>
                this.setState({
                  street: value.trim(),
                  errorStreet: Validation.validates('required', value.trim()),
                })
              }
              error={this.state.errorStreet}
            />
            {
              this.state.stateOptions ?
                <React.Fragment>
                  <Text style={styles.registerlabel}>State</Text>
                  <CustomPicker
                    placeholder={'Select a State'}
                    options={this.state.stateOptions}
                    getLabel={item => item.statename}
                    onValueChange={value => this.stateSelected(value)}
                  />
                  {
                    this.state.onSubmit
                      ?
                      <Text>{this.state.errorState}</Text>
                      : null
                  }
                </React.Fragment>
                : null
            }
            {
              this.state.districtOptions ?
                <React.Fragment>
                  <Text style={styles.registerlabel}>District</Text>
                  <CustomPicker
                    placeholder={'Select a District'}
                    options={this.state.state ? this.state.districtOptions : options}
                    getLabel={item => item.districtname}
                    onValueChange={value => this.districtSelected(value)}
                  />
                  {
                    this.state.onSubmit
                      ?
                      <Text>{this.state.errorDistrict}</Text>
                      : null
                  }
                </React.Fragment>
                : null
            }
            {
              this.state.vdcOptions ?
                <React.Fragment>
                  <Text style={styles.registerlabel}>VDC/Municipality</Text>
                  <CustomPicker
                    placeholder={'Select a VDC/Municipality'}
                    options={this.state.district ? this.state.vdcOptions : options}
                    getLabel={item => item.vdcname}
                    onValueChange={value => this.vdcSelected(value)}
                  />
                  {
                    this.state.onSubmit
                      ?
                      <Text>{this.state.errorVdc}</Text>
                      : null
                  }
                </React.Fragment>
                : null
            }
            {
              this.state.wardOption ?
                <React.Fragment>
                  <Text style={styles.registerlabel}>Ward</Text>
                  <CustomPicker
                    placeholder={'Select a Ward'}
                    options={this.state.wardOption ? this.state.wardOption : options}
                    getLabel={item => item}
                    onValueChange={item => this.setState({ wardno: item, errorWard: null })}
                  />
                  {
                    this.state.onSubmit
                      ?
                      <Text>{this.state.errorWard}</Text>
                      : null
                  }
                </React.Fragment>
                : null
            }

            <ButtonField labelText={'Continue'} onPress={this.continueClicked.bind(this)} />
          </ScrollView>
        </View>
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
    paddingLeft: 5
  },
  textpicker: {
    height: 40,
    width: 100 + '%',
    borderBottomWidth: 1,
    borderBottomColor: '#b4b4b4',
  },
  button: {
    backgroundColor: '#01A7DB',
    color: '#fff',
  },
  error: {
    color: '#ff0000',
    fontSize: 11,
    height: 10,
    zIndex: 111,
  }
});


