import { createStackNavigator } from 'react-navigation';
import Home from '../screens/Home'
import Splash from '../screens/Splash';
import Demand from '../screens/Demand';
import Register from '../screens/Auth/Register/Register1';
import ContinueRegister from '../screens/Auth/Register/Register2'
import SubmitVoucher from '../screens/SubmitVoucher'
import VoucherSubmitted from '../screens/VoucherSubmitted'
import Notifications from '../screens/Notifications'
import Status from '../screens/Status'
import History from '../screens/History'
import Contacts from '../screens/Contacts'
// import Test from '../screens/test'

import Login from '../screens/Auth/Login';
import ConfirmCode from '../screens/Auth/ConfirmCode'
import ForgotPassword from '../screens/Auth/ForgotPassword'
import ResetPassword from '../screens/Auth/ResetPassword'
import AwaitApproval from '../screens/Auth/AwaitApproval'

export default Stack = createStackNavigator(
    {
        Splash: Splash,
        Home: Home,
        Login: Login,
        Register: Register,
        ContinueRegister: ContinueRegister,
        ForgotPassword: ForgotPassword,
        ResetPassword: ResetPassword,
        Demand: Demand,
        SubmitVoucher: SubmitVoucher,
        ConfirmCode: ConfirmCode,
        VoucherSubmitted: VoucherSubmitted,
        Notifications: Notifications,
        History: History,
        Status: Status,
        Contacts: Contacts, 
        AwaitApproval: AwaitApproval
    }, {
        initialRouteName: 'Splash'
    }
);
