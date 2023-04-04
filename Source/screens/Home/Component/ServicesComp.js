import React from 'react';
import {Text, TouchableOpacity, Image} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../../../Assets/Constants/Colors';

const ServicesComp = props => {
  return (
    <TouchableOpacity
      key={props._key}
      onPress={props.onPress}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('3%'),
        width: wp('20%'),
        marginHorizontal: '4%',
      }}>
      <Image
        source={props.image}
        style={{
          width: props.newStyle ? wp('16%') : wp('20%'),
          height: wp('16%'),
          borderRadius: wp('25%'),
          resizeMode: 'contain',
        }}
      />
      <Text
        style={{
          fontSize: hp('1.5%'),
          fontWeight: 'bold',
          marginVertical: hp('1%'),
          textAlign: 'center',
          top: -5,
          color: Colors.black,
        }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default ServicesComp;
