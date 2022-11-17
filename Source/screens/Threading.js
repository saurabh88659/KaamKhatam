import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

import UpperLip from '../Assets/Images/Upperlip.png';
import Chin from '../Assets/Images/Chin.png';
import EyeBrow from '../Assets/Images/Eyebrows.png';
import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';
import AddCart from '../ReusableComponents/AddCart';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import GreenHeader from '../ReusableComponents/GreenHeader';
import GrayHeader from '../ReusableComponents/GrayHeader';

export default function Threading({props}) {
  const Srt = [
    {
      title: 'Eyebrows ',
      rating: 4.6,
      price: `29 `,
      time: '10 min',
      image: EyeBrow,
      d1: '3 step Cleanup',
      d2: 'Thread Holding,Hair Removal,Post Threading care ',
    },
    {
      title: `Upper Lip`,
      rating: 4.76,
      price: `20`,
      time: '5 min',
      image: UpperLip,
      d1: 'Thread Holding,Hair Removal,Post Threading care ',
    },
    {
      title: `Chin`,
      rating: 4.65,
      price: `29`,
      time: '5 min',
      image: Chin,
      d1: 'Thread Holding,Hair Removal,Post Threading care ',
    },
  ];
  return (
    <View style={styles.container}>
      <Header
        bgColor={Colors.darkOrange}
        color={Colors.black}
        title="Services for Women Only"
        onPress={() => props.navigation.goBack('')}
      />
      <GrayHeader title="Threading" />
      <GreenHeader title="Special Low-contact Technique" />
      <View style={styles.cntrContainer}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          data={Srt}
          renderItem={({item}) => (
            <View style={styles.card}>
              <View style={styles.cardItem}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.ratingCntr}>
                  <FontAwesome5Icon
                    name="star"
                    solid
                    size={hp('2%')}
                    color={Colors.lightYellow}
                  />
                  <Text style={styles.ratingBar}>{item.rating}</Text>
                </View>
                <View style={styles.priceCntr}>
                  <Image
                    source={require('../Assets/Images/rupee.png')}
                    style={styles.img}
                  />
                  <Text style={styles.priceBar}>{item.price}</Text>
                  <Text style={styles.timing}>{item.time}</Text>
                </View>
                <Text style={{marginTop: '5%'}}>
                  ..................................................................
                </Text>
                <View style={styles.dataCntr}>
                  <Image source={require('../Assets/Images/Ellipse1.png')} />
                  <Text style={styles.data}>{item.d1}</Text>
                </View>
                <View style={styles.dataCntr}>
                  <Image
                    source={require('../Assets/Images/Ellipse1.png')}
                    style={{opacity: item.d2 === undefined ? 0 : 1}}
                  />
                  <Text style={styles.data}>{item.d2}</Text>
                </View>
              </View>
              <View style={styles.imgCntr}>
                <Image
                  resizeMode="contain"
                  source={item.image}
                  style={styles.innerImage}
                />
                <TouchableOpacity style={styles.imgButton}>
                  <Text style={styles.btnText}>ADD +</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
      <AddCart items={2} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
  },
  greyHeader: {
    width: wp('100%'),
    height: hp('12%'),
    marginTop: hp('1.5%'),
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 5,
    backgroundColor: Colors.lightGray,
  },
  greenHeader: {
    width: wp('100%'),
    height: hp('9%'),
    marginTop: hp('1.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 5,
    backgroundColor: Colors.lightGreen,
  },
  cntrContainer: {
    height: hp('68%'),
    paddingBottom: hp('8%'),
  },
  card: {
    width: '100%',
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: wp('0.2%'),
  },
  cardItem: {
    width: '70%',
    padding: wp('3%'),
  },
  title: {
    fontWeight: 'bold',
    fontSize: wp('4%'),
  },
  ratingCntr: {
    flexDirection: 'row',
    marginTop: hp('1%'),
  },
  ratingBar: {
    fontWeight: 'bold',
    fontSize: wp('4%'),
  },
  priceCntr: {
    flexDirection: 'row',
    marginTop: hp('2%'),
    alignItems: 'center',
  },
  img: {
    width: hp('2%'),
    height: hp('2%'),
  },
  priceBar: {
    fontWeight: 'bold',
    fontSize: hp('2.5%'),
  },
  timing: {
    marginLeft: wp('5%'),
    fontSize: hp('2%'),
  },
  dataCntr: {
    flexDirection: 'row',
    marginTop: hp('2%'),
    alignItems: 'center',
  },
  data: {
    fontSize: hp('2%'),
    color: Colors.darkGray,
    marginLeft: wp('2%'),
  },
  imgCntr: {
    width: wp('25%'),
    height: hp('25%'),
    padding: wp('1%'),
    marginRight: wp('2%'),
    marginTop: -hp('3%'),
    alignItems: 'center',
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
    shadowColor: '#000',
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
    fontSize: hp('2%'),
  },
});
