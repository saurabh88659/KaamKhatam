import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
//import { DrawerActions } from '@react-navigation/routers';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Colors from '../Assets/Constants/Colors';
import CustomButton from '../ReusableComponents/Button';

const HeaderDrawer = props => {
  // console.log('Header Drawer', props);
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
            marginRight: wp('3%'),
            color: 'white',
          }}>
          {props.location}
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
