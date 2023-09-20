import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../Assets/Constants/Colors';

const ServiceItems = props => {
  return (
    <View>
      <TouchableOpacity
        style={{
          borderBottomColor: Colors.lightGray,
          borderBottomWidth: 1,
          flexDirection: 'row',
          padding: hp('1%'),
          alignItems: 'center',
        }}
        onPress={props.click}>
        <Image
          source={props.image}
          style={{
            marginHorizontal: wp('2%'),
            height: hp('9%'),
            width: hp('9%'),
            borderRadius: hp('9%'),
          }}
        />
        <Text
          style={{
            fontSize: hp('2.4%'),
            marginLeft: wp('2%'),
            fontWeight: 'bold',
            // marginTop: hp('1%'),
            color: Colors.black,
          }}>
          {props.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ServiceItems;
