import {createDrawerNavigator, createAppContainer} from 'react-navigation'

import Stack from './Navigators/StackNavigator'
import SideDrawer from './screens/SideDrawer'


const MainNavigator = createDrawerNavigator({
  Stack: Stack,
},{
  contentComponent: SideDrawer
})


const app = createAppContainer(MainNavigator)

export default app