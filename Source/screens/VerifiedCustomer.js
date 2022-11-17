import React from 'react'
import { View, SafeAreaView, StyleSheet, Image, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import Colors from '../Assets/Constants/Colors';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const VerifiedCustomer = () => {
    return (
        <SafeAreaView>

            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <View style={styles.header}>
                        <FontAwesome5Icon name='angle-left' solid size={hp('3%')} color='#f4f4f4' />
                        <TouchableOpacity>
                            <Text style={{ fontWeight: 'bold', color: '#f4f4f4' }}>EDIT</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Image source={require('../Assets/Images/man.png')} />
                        <Text style={styles.customer}>Verified Customer</Text>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.numberContainer}>
                        <FontAwesome5Icon name='phone-alt' solid size={hp('2%')} color='#000' />
                        <Text style={styles.text}> Number</Text>
                    </View>
                    <TextInput value='7982862315' style={{ color: 'orange' }} />
                    <View style={styles.numberContainer}>
                        <FontAwesome5Icon name='envelope' solid size={hp('2%')} color='#000' />
                        <Text style={styles.text}> Email-id</Text>
                    </View>
                    <TextInput value='admin123@gmail.com' style={{ color: 'orange' }} />
                    <View style={styles.numberContainer}>
                        <FontAwesome5Icon name='user' solid size={hp('2%')} color='#000' />
                        <Text style={styles.text}> Gender</Text>
                    </View>
                    <TextInput value='Male' style={{ color: 'orange' }} />
                </View>
            </View>

        </SafeAreaView>
    )
}

export default VerifiedCustomer;
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
    },
    text: {
        marginLeft: wp('2%'),
        fontSize: hp('2%')
    },
    bottomContainer: {
        width: wp('80%'),
        backgroundColor: '#f4f4f4',
        marginTop: -hp('10%'),
        alignSelf: 'center',
        borderRadius: wp('2%'),
        padding: wp('3%')
    },
    header: {
        width: wp('100%'),
        padding: wp('4%'),
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    topContainer: {
        width: wp('100%'),
        height: hp('40%'),
        backgroundColor: 'green'
    },
    numberContainer: {
        flexDirection: 'row',
        marginTop: wp('2%')
    },
    customer: {
        fontWeight: 'bold',
        color: '#f4f4f4',
        marginTop: hp('2%')
    }

})