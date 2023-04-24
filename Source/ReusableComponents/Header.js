import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const Header = props => {
  return (
    <View
      style={{
        width: wp('100%'),
        height: hp('8%'),
        backgroundColor: props.bgColor,
        paddingHorizontal: wp('4%'),
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TouchableOpacity style={{width: 20}} onPress={props.onPress}>
        <FontAwesome5 name="angle-left" color={props.color} size={hp('3.7%')} />
      </TouchableOpacity>
      <View>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: hp('2.7%'),
            color: props.color,
            marginLeft: wp('5%'),
          }}>
          {props.title}
        </Text>
      </View>
    </View>
  );
};

export default Header;
