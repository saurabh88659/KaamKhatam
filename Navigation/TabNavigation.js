import React from 'react';
import {View, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Colors from '../Source/Assets/Constants/Colors';
import Home from '../Source/screens/Home/Home';

import homeicone from '../Source/Assets/Images/home.png';
import calendar22 from '../Source/Assets/Images/calendar22.png';
import shoppingcart2222 from '../Source/Assets/Images/shoppingcart2222.png';
import usericonprofile from '../Source/Assets/Images/usericonprofile.png';
import ProfileScreen from '../Source/screens/ProfileScreen';
import Mybooking from '../Source/screens/Mybooking';
import MyCartScreen from '../Source/screens/MyCartScreen';

const Tab = createBottomTabNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        showLabel: false,
        headerShown: true,
        tabBarActiveTintColor: Colors.blue,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,

        tabBarStyle: {
          backgroundColor: Colors.darkOrange,
          height: 60,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarColor: Colors.blue,
          tabBarIcon: ({focused}) => (
            <Image
              source={homeicone}
              style={{
                height: 28,
                width: 28,

                tintColor: focused ? Colors.blue : Colors.black,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Mybooking"
        component={Mybooking}
        options={{
          headerShown: false,
          tabBarColor: Colors.blue,
          tabBarIcon: ({focused}) => (
            <Image
              source={calendar22}
              style={{
                height: 30,
                width: 32,

                tintColor: focused ? Colors.blue : Colors.black,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyCartScreen"
        component={MyCartScreen}
        options={{
          headerShown: false,
          tabBarColor: Colors.blue,
          tabBarIcon: ({focused}) => (
            <Image
              source={shoppingcart2222}
              style={{
                height: 28,
                width: 28,

                tintColor: focused ? Colors.blue : Colors.black,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={usericonprofile}
              style={{
                height: 26,
                width: 24,

                tintColor: focused ? Colors.blue : Colors.black,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigation;
