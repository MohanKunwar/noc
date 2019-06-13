import { instance, authInstance, signal } from './Axios';

const API = {
    user: 'dealer/user',
    auth: {
        register: 'auth/dealerregister',
        login: 'auth/login',
        resendCode: 'auth/resendcode',
        mobileConfirmation: 'auth/mobileconfirmation'
    },
    demand: {
        time: 'demand/time',
        create: 'demand/create',
        update: 'demand/update',
        today: 'demand/today',
        report: duration => { return duration ? `demand/report?report=${duration}` : 'demand/report'},
    },
    static: {
        formData: 'dealer/form'
    },
    vouch: {
       
    },
    address: {
        states: 'address/states',
        district: stateid => {return `address/districts?stateid=${stateid}`},
        vdc: districtid => {return `address/vdc?districtid=${districtid}`},
    }
}

const Axios = {
    instance, authInstance, API, signal
}
export default Axios;