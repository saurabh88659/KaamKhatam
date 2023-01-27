import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigation from './TabNavigation';
import Colors from '../Assets/Constants/Colors';
import CustomDrawerMenu from '../../CustomDrawerMenu';

const Drawer = createDrawerNavigator();
export default function DrowerNavigation() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerMenu {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: '#AFFBC8',
        drawerInactiveTintColor: '#150F0F',
        drawerActiveTintColor: '#563D31',
        headerShown: false,
        headerStyle: {
          backgroundColor: Colors.darkOrange,
        },
      }}>
      <Drawer.Screen name="ALL IN ONE" component={TabNavigation} />
    </Drawer.Navigator>
  );
}
