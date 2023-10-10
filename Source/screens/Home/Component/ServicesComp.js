import React from 'react';
import {Text, TouchableOpacity, Image, View} from 'react-native';
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
        justifyContent: 'space-between',
        // flexWrap:'wrap',
        marginTop: hp('2%'),
        width: wp('30%'),
        marginHorizontal: '1%',
        // backgroundColor:'pink'
      }}>
      <View
        style={{
          elevation: 10,
          borderRadius: wp('25%'),
        }}>
        <Image
          source={props.image}
          style={{
            width: props.newStyle ? wp('23%') : wp('20.5%'),
            height: wp('23%'),
            borderRadius: wp('25%'),
            resizeMode: 'contain',
          }}
        />
      </View>
      <Text
        style={{
          fontSize: hp('1.5%'),
          fontWeight: 'bold',
          marginVertical: hp('1%'),
          textAlign: 'center',
          top: 5,
          color: Colors.black,
        }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default ServicesComp;
