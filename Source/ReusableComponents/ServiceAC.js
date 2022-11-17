import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../Assets/Constants/Colors';
const ServiceAC = (props) => {

    return (

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: '#F4F4F4', borderBottomWidth: hp('0.4%'), paddingVertical: hp('2%'), alignItems: 'center', paddingHorizontal: hp('2%') }}>
            <Text style={{ fontWeight: 'bold', fontSize: hp('2%') }}>{props.title}</Text>
            <TouchableOpacity style={styles.imgButton}>
                <Text style={styles.btnText}>ADD +</Text>
            </TouchableOpacity>
        </View>


    )
}


export default ServiceAC;

const styles = StyleSheet.create({
    imgButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
        width: wp('20%'),
        height: hp('6%'),

        borderRadius: wp('5%'),
        marginLeft: wp('3%'),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    btnText: {
        fontWeight: 'bold',
        color: Colors.darkOrange,
        fontSize: hp('2%')
    }

});