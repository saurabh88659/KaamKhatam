import React from 'react';
import {Text, TouchableOpacity, Image} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const BeautyServices = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        marginTop: hp('2%'),
        marginBottom: hp('2.5%'),
        width: wp('45%'),
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Image
        source={props.image}
        style={{width: wp('35%'), height: wp('24%'), borderRadius: wp('4%')}}
      />
      <Text
        style={{
          fontSize: hp('1.7%'),
          fontWeight: 'bold',
          marginTop: hp('1%'),
          color: 'black',
        }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};
export default BeautyServices;
