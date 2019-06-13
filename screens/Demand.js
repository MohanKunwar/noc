import React, { Component } from 'react'
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native'
import R from '../resources'
import { HeaderBackButton } from 'react-navigation'
import Validation from '../helpers/Validation'
import Axios from '../Axios';
import { ButtonField } from '../views';
import SharedPrefs from '../helpers/SharedPrefs';
import { Fonts } from '../helpers/Fonts';
export default class Demand extends Component {
  state = {
    SKO: null,
    HSD: null,
    MS: null,
    request: null,
    loaded: false,
    edit: false
  }
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Text style={styles.title}>Make a Request</Text>,
    headerLeft: <HeaderBackButton onPress={() => navigation.replace('Home')} />
  })
  componentWillMount() {
    Axios.authInstance.get(Axios.API.demand.today).then(response => {
      console.log('demand res', response)
      if (response.data && !response.data.errorMsg && response.data.demand && response.data.demand.length > 0) {
          if (response.data.status === 'Pending') {
            this.setRequest(response.data)
          } else {
            this.setState({loaded: true})
          }
      } else if (response.data.errorMsg === 'Invalid Token.') {
        this.props.navigation.replace('Login')
      } else {
        this.setState({loaded: true, edit: false})
      }
    })
  }

  setRequest(request) {
    this.setState({ request: request, loaded: true, edit: true })
    request.demand.map(item => {
      console.log(item)
      this.setState({ [item.fueltype]: parseInt(item.demandunit).toString() })
    })
  }

  async componentDidMount() {
    const dealer = await SharedPrefs.retrieveData('dealer')
    this.setState({ dealer: dealer })

  }

  submitDemand = () => {
    console.log('state demad', this.state)
    this.setState({
      onSubmit: true,
      errorpetrol: this.state.MS ? Validation.validates('number', this.state.MS) : null,
      errordiesel: this.state.HSD ? Validation.validates('number', this.state.HSD) : null,
      errorkerosene: this.state.SKO ? Validation.validates('number', this.state.SKO) : null
    }, () => {
      if (!this.state.errorpetrol && !this.state.errordiesel && !this.state.errorkerosene) {
        if (!this.state.edit) {
          console.log('create')
          const data = new FormData()
          this.state.MS ? data.append('petrolunit', this.state.MS) : null
          this.state.HSD ? data.append('dieselunit', this.state.HSD) : null
          this.state.SKO ? data.append('keroseneunit', this.state.SKO) : null
          Axios.authInstance.post(Axios.API.demand.create, data).then(response => {
            console.log('res', response)
            if (response.data && response.data.status === 200) {
              this.props.navigation.replace('VoucherSubmitted', { origin: 'demand' })
            } else if (response.data.status === 403) {
              this.setState({ demandExists: true })
            }
          })
        } else {
          console.log('edit')
          const request = this.state.request
          request.demand.map((data) => {
            data.demandunit = this.state[data.fueltype]
          })
          let config = {
            headers: {
              'Content-Type': 'application/json',
            }
          }
          Axios.authInstance.post(Axios.API.demand.update, { 'demand': request.demand }, config).then(response => {
            console.log(response)
            if (response.data && response.data.status === 200) {

              this.props.navigation.replace('VoucherSubmitted', { origin: 'editdemand' })
            } else {
              // todo something went wrong
            }
          })
        }
      }
    })

  }
  render() {
    const { dealer, loaded } = this.state
    return (
      dealer && loaded ?
        <View style={styles.container}>
          <Text style={styles.instructionTop}>Enter Quantity in Litres</Text>
          <Text style={styles.instructionBottom}>Please make sure that quantity has prevailing zero.</Text>
          {
            R.strings.fuel_types.map((type, index) =>
              dealer[type.name.toLowerCase()] === 'true'
                ?
                <React.Fragment key={index}>
                  <View style={styles.demandContainer}>
                    <Image
                      style={styles.fuelImage}
                      resizeMode={'contain'}
                      source={R.images[type.identifier]} />
                    <Text style={styles.fuelLabel}>{`${type.name} (${type.identifier})`}</Text>
                    <TextInput style={styles.fuelInput}
                      keyboardType="numeric"
                      placeholder='in Litres'
                      value={this.state[type.identifier]}
                      onChangeText={value => this.setState({
                        [type.identifier]: value.trim(),
                        [`error${type.identifier}`]: Validation.validates('number', value.trim())
                      })
                      } />
                  </View>
                  {
                    this.state[`error${type.identifier}`] ?
                      <Text style={styles.error}>{this.state[`error${type.identifier}`]}</Text>
                      : null
                  }
                </React.Fragment>
                : null
            )
          }
          <ButtonField labelText={'Submit'} onPress={this.submitDemand.bind(this)} />
        </View>
        : null
    )
  }
  componentWillUnmount() {
    console.log('demand screen unmounted')
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
    padding: 15
  },
  instructionTop: {
    color: '#000',
    fontSize: 22,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
    fontFamily: Fonts.font
  },
  instructionBottom: {
    color: '#000',
    fontSize: 16,
    fontWeight: '400',
    opacity: .7,
    marginBottom: 20,
    fontFamily: Fonts.font
  },
  demandContainer: {
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(171, 171, 171, 0.5)',
    borderRadius: 5,
    marginBottom: 10,
    paddingTop: 7,
    paddingBottom: 7,
    paddingRight: 15,
    paddingLeft: 5
  },
  fuelImage: {
    width: 25 + '%',
    height: 70
  },
  fuelLabel: {
    color: '#01A7DB',
    fontSize: 16,
    padding: 13,
    width: 40 + '%',
    height: 50
  },
  fuelInput: {
    textAlign: 'right',
    width: 30 + '%',
    height: 50,
    borderWidth: 1,
    borderColor: '#01A7DB',
    borderRadius: 5,
    padding: 5,
    paddingRight: 8,
    fontSize: 18,
    color: '#000',
    fontWeight: '700',
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