import React, {useEffect, useState} from 'react';
import {View, Image, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Colors from '../Assets/Constants/Colors';
// import homeicone from '../Assets/Images/home.png';
// import calendar22 from '../Assets/Images/calendar22.png';
// import shoppingcart2222 from '../Assets/Images/shoppingcart2222.png';
// import usericonprofile from '../Assets/Images/usericonprofile.png';
import ProfileScreen from '../screens/ProfileScreen';
import Mybooking from '../screens/Mybooking';
import MyCartScreen from '../screens/MyCartScreen';
import Home from '../screens/Home/Home';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import {BASE_URL} from '../Assets/utils/Restapi/Config';
import {_getStorage} from '../Assets/utils/storage/Storage';
import axios from 'axios';

const Tab = createBottomTabNavigator();

function TabNavigation() {
  const [lenghtData, setLenghtData] = useState('');

  console.log('lenghtData---------------', lenghtData);

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

  // useEffect(() => {
  //   bookingDetails();
  // }, []);

  // const bookingDetails = async () => {
  //   const token = await _getStorage('token');
  //   console.log(token);

  //   axios
  //     .get(BASE_URL + `/booking/allbookings`, {
  //       headers: {Authorization: `Bearer ${token}`},
  //     })
  //     .then(res => {
  //       console.log('bookingdetails--------', res.data.newData.length);
  //       setLenghtData(res.data.newData.length);
  //     })
  //     .catch(error => {
  //       console.log('bookingDetails catch error', error);
  //     });
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
          tabBarIcon: ({color, size, focused}) => (
            // <Image
            //   source={homeicone}
            //   style={{
            //     height: 30,
            //     width: 30,

            //     tintColor: focused ? Colors.blue : Colors.black,
            //   }}
            // />
            <FontAwesome5
              name="home"
              color={focused ? 'blue' : Colors.black}
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
          tabBarColor: Colors.blue,
          tabBarIcon: ({focused}) => (
            // <Image
            //   source={calendar22}
            //   style={{
            //     height: 30,
            //     width: 30,

            //     tintColor: focused ? Colors.blue : Colors.black,
            //   }}
            // />
            <FontAwesome5
              name="calendar-alt"
              color={focused ? 'blue' : Colors.black}
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
            // <View>
            //   <Text
            //     style={{
            //       color: Colors.black,
            //       fontSize: 16,
            //       left: 13,
            //       top: 6,
            //       fontWeight: '500',
            //     }}>
            //     {lenghtData}
            //   </Text>
            //   {/* <Image
            //     source={shoppingcart2222}
            //     style={{
            //       height: 28,
            //       width: 28,

            //       tintColor: focused ? Colors.blue : Colors.black,
            //     }}
            //   /> */}

            // </View>
            <FontAwesome5
              name="shopping-cart"
              color={focused ? 'blue' : Colors.black}
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
            // <Image
            //   source={usericonprofile}
            //   style={{
            //     height: 26,
            //     width: 24,

            //     tintColor: focused ? Colors.blue : Colors.black,
            //   }}
            // />
            <Feather
              name="user"
              color={focused ? 'blue' : Colors.black}
              size={30}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigation;
