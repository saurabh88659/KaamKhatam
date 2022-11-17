import React from 'react'
import { Text, TouchableOpacity, StyleSheet, View, Image } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../Assets/Constants/Colors';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';


const ServiceCard = (props) => {

    return (
        <View style={styles.card}>
            <View style={styles.cardItem}>
                <Text style={styles.title}>{props.title}</Text>
                <View style={styles.ratingCntr}>
                    <FontAwesome5Icon name='star' solid size={hp('2%')} color={Colors.lightYellow} />
                    <Text style={styles.ratingBar}>{props.rating}</Text>
                </View>
                <View style={styles.priceCntr}>
                    <Image source={require('../Assets/Images/rupee.png')} style={styles.img} />
                    <Text style={styles.priceBar}>{props.price}</Text>
                    <Text style={styles.timing}>{props.time}</Text>
                </View>
                <Text style={{ marginTop: '5%' }}>..................................................................</Text>
                <View style={{ width: wp('90%') }}>
                    <View style={[styles.dataCntr, { width: wp('70%') }]}>
                        <Image source={require('../Assets/Images/Ellipse1.png')}
                            style={{ marginTop: hp('1%'), opacity: props.d1 === undefined ? 0 : 1 }}
                        />
                        <Text style={styles.data}>{props.d1}</Text>
                    </View>
                    <View style={styles.dataCntr}>
                        <Image source={require('../Assets/Images/Ellipse1.png')}
                            style={{ marginTop: hp('1%'), opacity: props.d2 === undefined ? 0 : 1 }}
                        />
                        <Text style={styles.data}>{props.d2}</Text>
                    </View>
                    <View style={styles.dataCntr}>
                        <Image source={require('../Assets/Images/Ellipse1.png')}
                            style={{ marginTop: hp('1%'), opacity: props.d3 === undefined ? 0 : 1 }}
                        />
                        <Text style={styles.data}>{props.d3}</Text>
                    </View>
                    <View style={styles.dataCntr}>
                        <Image source={require('../Assets/Images/Ellipse1.png')}
                            style={{ marginTop: hp('1%'), opacity: props.d4 === undefined ? 0 : 1 }}
                        />
                        <Text style={styles.data}>{props.d4}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.imgCntr} >
                {
                    props.image === undefined ?
                        <TouchableOpacity style={[styles.imgButton, { marginTop: hp('10%') }]}>
                            <Text style={styles.btnText}>ADD +</Text>
                        </TouchableOpacity> :
                        <View style={{ alignItems: 'center' }}>
                            <View style={styles.innerImage} >
                                <Image resizeMode='cover' source={props.image} style={styles.innerImage} />
                            </View>
                            <TouchableOpacity style={styles.imgButton}>
                                <Text style={styles.btnText}>ADD +</Text>
                            </TouchableOpacity>
                        </View>
                }

            </View>
        </View>
    )
}


export default ServiceCard;

const styles = StyleSheet.create({
    container: {
        width: wp('100%'),
        height: hp('100%')
    },
    greyHeader: {
        width: wp('100%'),
        height: hp('12%'),
        marginTop: hp('1.5%'),
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: wp('5%'),
        backgroundColor: Colors.grayShade
    },

    cntrContainer: {
        height: hp('78.5%'),
        paddingBottom: hp('8%'),

    },
    card: {
        width: wp('100%'),
        backgroundColor: '#F4F4F4',
        borderRadius: hp('2%'),
        marginTop: hp('2%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: hp('0.2%'),
        borderColor: Colors.lightGray
    },
    cardItem: {
        width: wp('70%'),
        padding: wp('3%')
    },
    title: {
        fontWeight: 'bold',
        fontSize: wp('4%')
    },
    ratingCntr: {
        flexDirection: 'row',
        marginTop: hp('1%'),
        alignItems: 'center'
    },
    ratingBar: {
        fontWeight: 'bold',
        fontSize: wp('4%'),
        marginLeft: wp('0.5%')
    },
    priceCntr: {
        flexDirection: 'row',
        marginTop: hp('0.4%'),
        alignItems: 'center'
    },
    img: {
        width: hp('2%'),
        height: hp('2%')
    },
    priceBar: {
        fontWeight: 'bold',
        fontSize: hp('2.5%'),
        marginLeft: wp('0.5%')
    },
    timing: {
        marginLeft: wp('5%'),
        fontSize: hp('2%')
    },
    dataCntr: {
        flexDirection: 'row',
        marginTop: hp('2%'),
    },
    data: {
        fontSize: hp('2%'),
        color: Colors.darkGray,
        marginLeft: wp('2%')
    },
    imgCntr: {
        width: wp('25%'),
        height: hp('25%'),
        padding: wp('1%'),
        marginRight: wp('2%'),
        marginTop: hp('2%'),
        alignItems: 'center',
    },
    innerImage: {
        width: wp('25%'),
        height: wp('25%'),
        borderRadius: wp('2%')
    },
    imgButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
        width: wp('20%'),
        height: hp('6%'),
        marginTop: -hp('3%'),
        borderRadius: wp('5%'),
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