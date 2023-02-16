import React from 'react';
import {View, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Colors from '../Assets/Constants/Colors';
import homeicone from '../Assets/Images/home.png';
import calendar22 from '../Assets/Images/calendar22.png';
import shoppingcart2222 from '../Assets/Images/shoppingcart2222.png';
import usericonprofile from '../Assets/Images/usericonprofile.png';
import ProfileScreen from '../screens/ProfileScreen';
import Mybooking from '../screens/Mybooking';
import MyCartScreen from '../screens/MyCartScreen';
import Home from '../screens/Home/Home';

const Tab = createBottomTabNavigator();

function TabNavigation() {
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
        tabBarActiveTintColor: Colors.blue,
        // tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,

        tabBarStyle: {
          backgroundColor: Colors.darkOrange,
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
          tabBarColor: Colors.blue,
          tabBarIcon: ({focused}) => (
            <Image
              source={homeicone}
              style={{
                height: 30,
                width: 30,

                tintColor: focused ? Colors.blue : Colors.black,
              }}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Home"
        component={HomeStack}
        options={({route}) => ({
          tabBarStyle: {display: getTabBarVisibility(route)},
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
        })}
      /> */}
      <Tab.Screen
        name="Booking"
        component={Mybooking}
        options={{
          headerShown: false,
          tabBarColor: Colors.blue,
          tabBarIcon: ({focused}) => (
            <Image
              source={calendar22}
              style={{
                height: 30,
                width: 30,

                tintColor: focused ? Colors.blue : Colors.black,
              }}
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
        name="Profile"
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
