import { createDrawerNavigator } from '@react-navigation/drawer';
import TabBarScreen from './TabBar';
import DrawerScreen from './Drawer';
import React from 'react';

const Drawer = createDrawerNavigator();

/**
 * 主页面: 含抽屉页
 */
export default function MainScreen() {
  return (
    <Drawer.Navigator
      initialRouteName="TabBar"
      drawerContent={props => DrawerScreen(props)}
      screenOptions={{ drawerType: 'back', drawerStyle: { width: '75%' } }}
    >
      <Drawer.Screen name="TabBar" component={TabBarScreen} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}
