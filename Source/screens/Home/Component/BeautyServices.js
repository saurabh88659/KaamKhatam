import React from 'react';
import {Text, TouchableOpacity, Image, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../../../Assets/Constants/Colors';

const BeautyServices = props => {
  console.log(props, 'props=========');
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
      <View
        style={{
          width: wp('36%'),
          height: wp('25%'),
          borderRadius: wp('4.5%'),
          borderColor: props.selected ? Colors.topNavbarColor : 'transparent', // Set border color based on 'selected' prop
          borderWidth: props.selected ? 6 : 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={{uri: props.image}}
          style={{
            width: wp('35%'),
            height: wp('24%'),
            borderRadius: wp('4%'),
            borderColor: props.selected ? Colors.white : 'transparent', // Set border color based on 'selected' prop
            borderWidth: 2,
            borderRadius: wp('4%'),
          }}
        />
      </View>

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
