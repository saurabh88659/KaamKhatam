import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../Assets/Constants/Colors';

const GreenHeader = props => {
  return (
    <View
      style={{
        width: wp('100%'),
        height: hp('5%'),
        // marginTop: hp('0.2%'),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingBottom: 5,
        borderRadius: hp('0.3%'),
        backgroundColor: Colors.purple,
      }}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: hp('1.7%'),
          color: Colors.white,
        }}>
        {props.title}
      </Text>
    </View>
  );
};

export default GreenHeader;
