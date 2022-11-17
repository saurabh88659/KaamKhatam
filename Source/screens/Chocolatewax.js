import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import ServiceCard from '../ReusableComponents/ServiceCard';
import FullArms from '../Assets/Images/Fullarms.png';
import FullLegsArms from '../Assets/Images/Fulllegsarms.png';

import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';
import AddCart from '../ReusableComponents/AddCart';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function Chocolatewax({props, route}) {
  const preData = route?.params;

  const Srt = [
    {
      title: 'Complete Chocolate waxing ',
      rating: 4.7,
      price: `499 `,
      time: '60 min',
      d1: `Waxing-Full legs Chocolate,Full Arms + Underarms `,
    },
    {
      title: `Complete Honey Waxing`,
      rating: 4.7,
      price: `499`,
      time: '55 min',
      d1: 'Waxing-Honey Full Arms + UnderArms,Full Legs Honey ',
    },
    {
      title: `Half Legs + Half Arms Waxing`,
      rating: 4.7,
      price: `249`,
      time: '40 min',
      image: FullLegsArms,
    },
    {
      title: `Full Legs + Full arms Waxing`,
      rating: 4.8,
      price: `349`,
      time: '110 min',
      image: FullArms,
    },
  ];

  const press = () => {
    preData ? preData.navigation.goBack() : props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header
        bgColor={Colors.darkOrange}
        color={Colors.black}
        title="Services for Women Only"
        // onPress={() => props.navigation.goBack('')}
        onPress={press}
      />
      <View style={styles.greyHeader}>
        <Text style={{fontWeight: 'bold', fontSize: hp('4%')}}>
          Chocolate & Honey Wax
        </Text>
      </View>
      <View style={styles.greenHeader}>
        <Text
          style={{fontWeight: 'bold', fontSize: hp('2%'), color: Colors.white}}>
          Single Use Spatula Used Gloves & Masks worn
        </Text>
      </View>
      <View style={styles.cntrContainer}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          data={Srt}
          renderItem={({item}) => (
            <ServiceCard
              title={item.title}
              rating={item.rating}
              price={item.price}
              image={item.image}
              time={item.time}
              d1={item.d1}
              d2={item.d2}
            />
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
    paddingHorizontal: wp('5%'),
    backgroundColor: Colors.grayShade,
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
    width: wp('100%'),
    backgroundColor: '#F4F4F4',
    borderRadius: hp('2%'),
    marginTop: hp('2%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: hp('0.2%'),
    borderColor: Colors.lightGray,
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
