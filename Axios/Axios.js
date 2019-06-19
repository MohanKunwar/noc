import axios from 'axios'
import SharedPrefs from '../helpers/SharedPrefs'

export const instance = axios.create({
    baseURL: "http://noc.khoz.com.np/api/",
    // baseURL: 'https://khozinfo.com/api/v1'
});

export const authInstance = Object.create(instance);


export const signal = axios.CancelToken.source()
// export const isCancel = error => axios.isCancel(error)
instance.interceptors.request.use(request => {
    return request;
}, error => {
    console.log('error', error)
    return error.response
});
instance.interceptors.response.use(response => {
    return response;
}, function (error) {
    // Do something with response error
    console.log('error is', error)
    return error.response
});
authInstance.interceptors.request.use(async request => {
    const accesstoken = await SharedPrefs.retrieveData('accesstoken')
    const refreshtoken = await SharedPrefs.retrieveData('refreshtoken')
    if (accesstoken && refreshtoken) {
        console.log('token added', request)
    request.headers.accesstoken = accesstoken
    request.headers.refreshtoken = refreshtoken
    }
    return request
},
    error => {
        console.log('auth route error request', error.response)
        return error.response
    }
);

authInstance.interceptors.response.use(function (response) {
    return response
}, error => {
    console.log('auth route error response', error.response)
    return error.response
});
