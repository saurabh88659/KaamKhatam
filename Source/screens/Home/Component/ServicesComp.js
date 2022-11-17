import React from 'react';
import {Text, TouchableOpacity, Image} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

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
        marginHorizontal: '2%',
        // justifyContent: 'space-between',
      }}>
      <Image
        source={props.image}
        style={{
          width: props.newStyle ? wp('23%') : wp('20%'),
          height: wp('20%'),
          borderRadius: wp('20%'),
        }}
      />
      <Text
        style={{
          fontSize: hp('1.5%'),
          fontWeight: 'bold',
          marginVertical: hp('1%'),
          textAlign: 'center',
          top: -13,
        }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default ServicesComp;
