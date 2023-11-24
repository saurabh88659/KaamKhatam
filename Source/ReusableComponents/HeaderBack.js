import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Colors from '../Assets/Constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HeaderBack = props => {
  return (
    <View
      style={{
        width: wp('100%'),
        height: hp('7%'),
        backgroundColor: Colors.topNavbarColor,
        paddingHorizontal: wp('3%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          hitSlop={{top: 20, bottom: 20, left: 500, right: 500}}
          // hitSlop={{top: 100, bottom: 100, left: 2000, right: 2000}}
          onPress={props.onPress}>
          {/* <FontAwesome5 name="bars" color={Colors.white} size={hp('3.5%')} /> */}
          <Ionicons name="arrow-back" color={props.color} size={hp('3.7%')} />
        </TouchableOpacity>
        <View
          style={{
            width: '90%',
            // backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            numberOfLines={1}
            style={{
              // width: wp('58%'),
              fontWeight: 'bold',
              fontSize: hp('2.5%'),
              color: 'white',
              paddingHorizontal: 12,
              // alignSelf: 'center',
            }}>
            {props.Title}
          </Text>
        </View>
      </View>
      {/* <TouchableOpacity
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
        </Text>

        <FontAwesome5
          name="map-marker-alt"
          color={Colors.white}
          size={hp('2%')}
        />
      </TouchableOpacity> */}
    </View>
  );
};

export default HeaderBack;
