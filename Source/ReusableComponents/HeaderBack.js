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
          hitSlop={{top: 25, bottom: 25, left: 50, right: 50}}
          onPress={props.onPress}>
          {/* <FontAwesome5 name="bars" color={Colors.white} size={hp('3.5%')} /> */}
          <Ionicons name="arrow-back" color={props.color} size={hp('3.7%')} />
        </TouchableOpacity>
        <Text
          numberOfLines={1}
          style={{
            width: wp('58%'),
            fontWeight: 'bold',
            fontSize: hp('2.5%'),
            color: 'white',
            paddingHorizontal: 12,
          }}>
          {props.Title}
        </Text>
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
