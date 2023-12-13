import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Mywalletscreen from './My Wallet/Mywalletscreen';
import TranscationsScreen from './My Wallet/TranscationsScreen';
import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';
import HeaderDrawer from '../ReusableComponents/HeaderDrawer';
import HeaderBack from '../ReusableComponents/HeaderBack';

const Tab = createMaterialTopTabNavigator();
const Mywallet = ({navigation}) => {
  return (
    <>
      <HeaderBack
        color={'#fff'}
        Title="My Wallet"
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
        <Tab.Screen name="My wallet" component={Mywalletscreen} />
        <Tab.Screen name="Transaction History" component={TranscationsScreen} />
      </Tab.Navigator>
    </>
  );
};
export default Mywallet;
