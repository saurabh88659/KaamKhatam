import React from 'react'
import { View, SafeAreaView, StyleSheet, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import Colors from '../Assets/Constants/Colors';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const DrawerScreen = () => {
    return (
        <SafeAreaView>

            <View style={styles.container}>
                <ScrollView>
                    <TouchableOpacity style={{ alignItems: 'center', padding: wp('4%') }}>
                        <FontAwesome5Icon name='user' solid size={hp('8%')} color='#000' />
                        <Text style={{ marginTop: hp('1%') }}>Verified Customer</Text>
                    </TouchableOpacity>
                    <View style={{ borderBottomColor: '#f4f4f4', borderBottomWidth: 2, marginTop: hp('5%') }} />
                    <TouchableOpacity style={{ flexDirection: 'row', padding: wp('4%') }}>
                        <FontAwesome5Icon name='wallet' solid size={hp('4%')} color='#000' />
                        <Text style={{ marginLeft: wp('2%'), fontSize: hp('3%') }}> My Wallet</Text>
                    </TouchableOpacity>
                    <View style={styles.hr} />
                    <TouchableOpacity style={{ flexDirection: 'row', padding: wp('4%') }}>
                        <FontAwesome5Icon name='money-check' solid size={hp('4%')} color='#000' />
                        <Text style={{ marginLeft: wp('2%'), fontSize: hp('3%') }}> Payment Option</Text>
                    </TouchableOpacity>
                    <View style={styles.hr} />
                    <TouchableOpacity style={{ flexDirection: 'row', padding: wp('4%') }}>
                        <FontAwesome5Icon name='wallet' solid size={hp('4%')} color='#000' />
                        <Text style={{ marginLeft: wp('2%'), fontSize: hp('3%') }}> Scheduled Booking</Text>
                    </TouchableOpacity>
                    <View style={styles.hr} />
                    <TouchableOpacity style={{ flexDirection: 'row', padding: wp('4%') }}>
                        <FontAwesome5Icon name='star' solid size={hp('4%')} color='#000' />
                        <Text style={{ marginLeft: wp('2%'), fontSize: hp('3%') }}> Rate the App</Text>
                    </TouchableOpacity>
                    <View style={styles.hr} />
                    <TouchableOpacity style={{ flexDirection: 'row', padding: wp('4%') }}>
                        <FontAwesome5Icon name='info-circle' solid size={hp('4%')} color='#000' />
                        <Text style={{ marginLeft: wp('2%'), fontSize: hp('3%') }}> About</Text>
                    </TouchableOpacity>
                    <View style={styles.hr} />
                    <TouchableOpacity style={{ flexDirection: 'row', padding: wp('4%') }}>
                        <FontAwesome5Icon name='book' solid size={hp('4%')} color='#000' />
                        <Text style={{ marginLeft: wp('2%'), fontSize: hp('3%') }}> Privacy Policy</Text>
                    </TouchableOpacity>
                    <View style={styles.hr} />
                    <TouchableOpacity style={{ flexDirection: 'row', padding: wp('4%') }}>
                        <FontAwesome5Icon name='book' solid size={hp('4%')} color='#000' />
                        <Text style={{ marginLeft: wp('2%'), fontSize: hp('3%') }}> Terms and Condition </Text>
                    </TouchableOpacity>
                    <View style={styles.hr} />
                    <TouchableOpacity style={{ flexDirection: 'row', padding: wp('4%') }}>
                        <FontAwesome5Icon name='headset' solid size={hp('4%')} color='#000' />
                        <Text style={{ marginLeft: wp('2%'), fontSize: hp('3%') }}> Support </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

        </SafeAreaView>
    )
}

export default DrawerScreen;
const styles = StyleSheet.create({
    container: {
        height: hp('100%'),
        width: wp('100%'),
        backgroundColor: '#fff'
    },
    hr: {
        borderBottomColor: '#f4f4f4',
        borderBottomWidth: 2,
        marginTop: hp('2%')
    }

})