import {createDrawerNavigator, createAppContainer} from 'react-navigation';

import Stack from './src/Navigators/StackNavigator'
import SideDrawer from './src/screens/SideDrawer'

const MainNavigator = createDrawerNavigator({
  Stack: Stack,
},{
  contentComponent: SideDrawer
});


const app = createAppContainer(MainNavigator);

export default app;