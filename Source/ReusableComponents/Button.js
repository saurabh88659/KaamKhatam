import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../Assets/Constants/Colors';
const Button = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.disabled}
      style={{
        width: props.width,
        height: props.height,
        backgroundColor: props.bgColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: hp('1%'),
        marginTop: hp('2%'),
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
      <Text
        style={{
          fontWeight: '700',
          fontSize: hp('2.2%'),
          color: props.color,
          marginLeft: wp('5%'),
        }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
