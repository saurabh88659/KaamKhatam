import React, {useEffect, useState} from 'react';
// import {View, Image, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Colors from '../Assets/Constants/Colors';
import ProfileScreen from '../screens/ProfileScreen';
import Mybooking from '../screens/Mybooking';
import MyCartScreen from '../screens/MyCartScreen';
import Home from '../screens/Home/Home';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();

function TabNavigation() {
  const [lenghtData, setLenghtData] = useState('');

  // console.log('lenghtData---------------', lenghtData);

  // const getTabBarVisibility = route => {
  //   const routeName = getFocusedRouteNameFromRoute(route);
  //   if (
  //     routeName === 'Subcategory' ||
  //     routeName === 'Subcategory2' ||
  //     routeName === 'Services'
  //   ) {
  //     return 'none';
  //   }
  //   return 'flex';
  // };

  return (
    <Tab.Navigator
      screenOptions={{
        showLabel: false,
        headerShown: true,
        tabBarActiveTintColor: '#7A33C2',
        // tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,

        tabBarStyle: {
          backgroundColor: '#e2d7fa',
          height: 55,
        },
        tabBarLabelStyle: {
          fontWeight: '500',
          fontSize: 12,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarColor: '#fcbf14',
          tabBarIcon: ({color, size, focused}) => (
            <FontAwesome5
              name="home"
              color={focused ? '#7A33C2' : Colors.black}
              size={30}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Booking"
        component={Mybooking}
        options={{
          headerShown: false,
          tabBarColor: '',
          tabBarIcon: ({focused}) => (
            <FontAwesome5
              name="calendar-alt"
              color={focused ? '#7A33C2' : Colors.black}
              size={28}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={MyCartScreen}
        options={{
          headerShown: false,
          tabBarColor: Colors.blue,
          tabBarIcon: ({focused}) => (
            <FontAwesome5
              name="shopping-cart"
              color={focused ? '#7A33C2' : Colors.black}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Feather
              name="user"
              color={focused ? '#7A33C2' : Colors.black}
              size={30}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigation;
