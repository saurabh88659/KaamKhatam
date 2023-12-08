import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Mywalletscreen from './My Wallet/Mywalletscreen';
import TranscationsScreen from './My Wallet/TranscationsScreen';
import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';
import HeaderDrawer from '../ReusableComponents/HeaderDrawer';
import HeaderBack from '../ReusableComponents/HeaderBack';
import PendingBooking from './PendingBooking';
import CancelledBooking from './CancelledBooking';
import CompletedBooking from './CompletedBooking';
const Tab = createMaterialTopTabNavigator();

const Mywallet = ({navigation}) => {
  return (
    <>
      <HeaderBack
        color={'#fff'}
        Title="My Bookings"
        onPress={() => navigation.replace('DrowerNavigation')}
      />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {fontSize: 14, fontWeight: 'bold'},
          tabBarIndicatorStyle: {
            borderBottomColor: Colors.purple,
            borderBottomWidth: 3,
          },
        }}>
        <Tab.Screen name="PENDING" component={PendingBooking} />
        <Tab.Screen name="CANCELLED" component={CancelledBooking} />
        <Tab.Screen name="COMPLETED" component={CompletedBooking} />
      </Tab.Navigator>
    </>
  );
};

export default Mywallet;
