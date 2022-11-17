import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ServiceItems from '../ReusableComponents/ServiceItems';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Lorealcolor from '../Assets/Images/Lorealcolor.png';

const {height, width} = Dimensions.get('window');

const Viewdetails = props => {
  const Srt = [
    {
      title: 'L`Oreal Color Application',
      rating: 4.6,
      price: `459 `,
      time: '30 min',
      image: Lorealcolor,
      d1: 'Color provided by beautician',
      d2: 'Variety of shades available',
    },
  ];
  return (
    <>
      <Header
        bgColor={Colors.darkOrange}
        color={Colors.white}
        title="View Details"
        onPress={() => props.navigation.goBack()}
      />
      <ScrollView>
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
                  <Text style={{}}>
                    ..................................................................
                  </Text>
                  <View style={styles.dataCntr}>
                    <Image
                      source={require('../Assets/Images/Ellipse1.png')}
                      style={{opacity: item.d1 === undefined ? 0 : 1}}
                    />
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
                </View>
              </View>
            )}
          />
          <View
            style={{
              borderBottomWidth: 1,
              marginHorizontal: 20,
              borderColor: '#D9D9D9',
              top: 10,
              height: height / 28,
            }}>
            <Text style={{color: '#FC8009', fontSize: 17, fontWeight: 'bold'}}>
              Booking Details
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 20,
            marginHorizontal: 20,
          }}>
          <Text style={{color: Colors.black, fontSize: 15, fontWeight: 'bold'}}>
            Booking ID
          </Text>
          <Text style={{color: Colors.darkGray, fontSize: 15}}>
            4848579749274
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          <Text style={{color: Colors.black, fontSize: 15, fontWeight: 'bold'}}>
            Service Name
          </Text>
          <Text style={{color: Colors.darkGray, fontSize: 15}}>
            Hair Color Application
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginVertical: 20,
          }}>
          <Text style={{color: Colors.black, fontSize: 15, fontWeight: 'bold'}}>
            Time Slot
          </Text>
          <Text style={{color: Colors.darkGray, fontSize: 15}}>
            10:00- 11:00 AM
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            //   marginVertical: 20,
          }}>
          <Text style={{color: Colors.black, fontSize: 15, fontWeight: 'bold'}}>
            Price
          </Text>
          <Text style={{color: Colors.darkGray, fontSize: 15}}>INR 8000</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginVertical: 20,
          }}>
          <Text style={{color: Colors.black, fontSize: 15, fontWeight: 'bold'}}>
            Date
          </Text>
          <Text style={{color: Colors.darkGray, fontSize: 15}}>
            June 28 2022
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          <Text style={{color: Colors.black, fontSize: 15, fontWeight: 'bold'}}>
            Paid By
          </Text>
          <Text style={{color: Colors.darkGray, fontSize: 15}}>UPI</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginVertical: 20,
          }}>
          <Text style={{color: Colors.black, fontSize: 15, fontWeight: 'bold'}}>
            Status
          </Text>
          <Text
            style={{color: Colors.darkGreen, fontSize: 15, fontWeight: 'bold'}}>
            COMPLETED
          </Text>
        </View>
        <View
          style={{
            marginVertical: '10%',
          }}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{
              height: height / 16,
              backgroundColor: '#0EC01B',
              // width: width / 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              marginHorizontal: 15,
            }}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default Viewdetails;
const styles = StyleSheet.create({
  cntrContainer: {
    // height: hp('7%'),
  },
  card: {
    width: wp('100%'),
    backgroundColor: '#F4F4F4',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: hp('0.2%'),
    borderColor: Colors.lightGray,
    borderBottomRightRadius: hp('2%'),
    borderBottomLeftRadius: hp('2%'),
  },
  cardItem: {
    width: '70%',
    padding: wp('3%'),
  },
  title: {
    fontWeight: 'bold',
    fontSize: wp('5%'),
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
    // marginTop: hp('2%'),
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
    marginTop: hp('1%'),
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
});
