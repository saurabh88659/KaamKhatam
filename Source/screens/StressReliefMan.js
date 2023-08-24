
import React from 'react';
import { Text, View, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import ServiceCard from '../ReusableComponents/ServiceCard';
import StressReliefSwedishMan1 from '../Assets/Images/Stressreliefswedishman1.png';
import DeStressTherapyMan from '../Assets/Images/Dstresstherapyman.png';
import GrayHeader from '../ReusableComponents/GrayHeader';
import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';
import AddCart from '../ReusableComponents/AddCart';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


export default function App() {

    const Srt = [
        {
            title: 'Stress Relief Swedish Massage ',
            rating: 4.8, price: `1,199`, time: '70 min', image: StressReliefSwedishMan1,
            d1: `Medium pressure Full Body Therapy`,
            d2: `Stress,Tensed muscles, Joint pains. `,
            d3: `Benifit:Lowers stress levels & anxiety, improves blood circulation,better sleep`
        },
        {
            title: `De-stress Therapy`,
            rating: 4.6, price: `1,599`, time: '60 min', image: DeStressTherapyMan,
            d1: `Medium Pressure Full Body Therapy of 60 Mins`,
            d2: `20 mins of Head & Shoulder pain therapy`,
            d3: `Stress Relief Muscle relaxation, Pain relief`
        },

    ]
    return (


        <View style={styles.container}>
            <Header bgColor={Colors.topNavbarColor} color={Colors.black} title='Salon for Men' />
            <GrayHeader title='Stress Relief Therapy ' />

            <View style={styles.cntrContainer} >
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    data={Srt}
                    renderItem={({ item }) =>
                        <ServiceCard
                            title={item.title}
                            rating={item.rating}
                            price={item.price}
                            image={item.image}
                            time={item.time}
                            d1={item.d1}
                            d2={item.d2}
                            d3={item.d3} />
                    }
                />
            </View>
            <AddCart items={2} />
        </View>
    );
}

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
    greenHeader: {
        width: wp('100%'),
        height: hp('9%'),
        marginTop: hp('1.5%'),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingBottom: 5,
        backgroundColor: Colors.lightGreen
    },
    cntrContainer: {
        height: hp('77%'),
        paddingBottom: hp('8%')
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
        width: '70%',
        padding: wp('3%')
    },
    title: {
        fontWeight: 'bold',
        fontSize: wp('4%')
    },
    ratingCntr: {
        flexDirection: 'row',
        marginTop: hp('1%')
    },
    ratingBar: {
        fontWeight: 'bold',
        fontSize: wp('4%')
    },
    priceCntr: {
        flexDirection: 'row',
        marginTop: hp('2%'),
        alignItems: 'center'
    },
    img: {
        width: hp('2%'),
        height: hp('2%')
    },
    priceBar: {
        fontWeight: 'bold',
        fontSize: hp('2.5%')
    },
    timing: {
        marginLeft: wp('5%'),
        fontSize: hp('2%')
    },
    dataCntr: {
        flexDirection: 'row',
        marginTop: hp('2%'),
        alignItems: 'center'
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
        marginTop: -hp('3%'),
        alignItems: 'center'
    },
    innerImage: {
        width: wp('25%'),
        height: hp('25%'),
    },
    imgButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
        width: wp('20%'),
        height: hp('6%'),
        marginTop: -hp('8%'),
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
