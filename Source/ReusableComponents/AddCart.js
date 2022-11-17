import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../Assets/Constants/Colors';
const AddCart = props => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        // backgroundColor: Colors.white,
        width: wp('100%'),
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: -30,
      }}>
      <TouchableOpacity
        style={{
          width: wp('97%'),
          height: hp('7.5%'),
          margin: hp('1%'),
          backgroundColor: Colors.lightGreen,
          alignItems: 'center',
          flexDirection: 'row',
          borderRadius: hp('1%'),
          justifyContent: 'space-between',
          paddingHorizontal: wp('5%'),
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
        <View style={{borderWidth: 0.8, borderColor: Colors.white}}>
          <Text
            style={{
              marginHorizontal: hp('1%'),
              marginVertical: hp('0.6%'),
              color: Colors.white,
              fontWeight: 'bold',
              fontSize: hp('1.5%'),
            }}>
            {props.items}
          </Text>
        </View>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: hp('2.5%'),
            color: Colors.white,
            marginLeft: wp('5%'),
          }}>
          Add Cart
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddCart;
