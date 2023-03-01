import React, {Component, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
//import { DrawerActions } from '@react-navigation/routers';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Colors from '../Assets/Constants/Colors';
// import Geocoder from 'react-native-geocoding';
// import Geolocation from '@react-native-community/geolocation';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const API_KEY = 'AIzaSyD3Uol_-mBQSaZgIfuzVVK1oHXqBHPkrZE';

const HeaderDrawer = props => {
  // const [state, setState] = useState('');
  // const [latitude, setLatitude] = useState(0);
  // const [longitude, setLongitude] = useState(0);

  // console.log('state---============', state);
  // const myArray = state?.substring(45, 35);
  // console.log('myArray', myArray);

  // useEffect(() => {
  //   geoCoding();
  //   // const address = await AsyncStorage.getItem('address');
  //   // console.log('address', address);
  // }, []);

  // const geoCoding = () => {
  //   Geocoder.init(API_KEY);
  //   Geolocation.getCurrentPosition(data => {
  //     setLatitude(data.coords.latitude), setLongitude(data.coords.longitude);
  //     // console.log('data--------------->>>------>', data);
  //   });

  //   Geocoder.from(latitude, longitude).then(json => {
  //     // console.log('results--------->>>>>>>', json.results[0].formatted_address);
  //     json.results[0].address_components.forEach((value, index) => {
  //       setState(
  //         json.results[0].formatted_address,
  //         // tempAddress: json.results[0].formatted_address,
  //       );
  //     });
  //   });
  // };

  return (
    <View
      style={{
        width: wp('100%'),
        height: hp('7%'),
        backgroundColor: Colors.darkOrange,
        paddingHorizontal: wp('3%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity onPress={props.onPress}>
        <FontAwesome5 name="bars" color={Colors.white} size={hp('3.5%')} />
      </TouchableOpacity>
      <Text
        numberOfLines={1}
        style={{
          width: wp('58%'),
          fontWeight: 'bold',
          fontSize: hp('2.5%'),
          color: 'white',
        }}>
        {props.Title}
      </Text>

      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}>
        <Text
          numberOfLines={2}
          style={{
            fontWeight: 'bold',
            fontSize: hp('1.9%'),
            marginRight: wp('4%'),
            // right: '3%',
            color: 'white',
          }}>
          {props.location}
          {/* {myArray} */}
        </Text>

        <FontAwesome5
          name="map-marker-alt"
          color={Colors.white}
          size={hp('2%')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderDrawer;
