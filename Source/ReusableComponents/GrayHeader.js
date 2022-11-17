import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from
    'react-native-responsive-screen';
import Colors from '../Assets/Constants/Colors';

const GrayHeader = (props) => {
    return (
        <View style={{
            width: wp('100%'),
            height: hp('12%'),
            marginTop: hp('1.5%'),
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: wp('5%'),
            backgroundColor: Colors.grayShade
        }}>
            <Text style={{
                fontWeight: 'bold', fontSize: hp('3.7%')
            }}>{props.title}</Text>
        </View>
    )
}


export default GrayHeader;