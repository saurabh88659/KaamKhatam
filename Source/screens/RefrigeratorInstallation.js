import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import untitleddesign3 from '../Assets/Images/untitleddesign3.png';
import tvtemplatebackground from '../Assets/Images/tvtemplatebackground.png';

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

import {useNavigation} from '@react-navigation/native';
const {height, width} = Dimensions.get('window');

import Reusablecss from '../Assets/Css/Reusablecss';

export default function RefrigeratorInstallation() {
  const navigation = useNavigation();

  const Srt = [
    {
      title: 'Single Door Fridge Check',
      rating: 4.8,
      price: `299 `,
      time: '70 min',
      image: untitleddesign3,
      d1: 'single',
    },
    {
      title: 'Single Door Fridge Check',
      rating: 4.8,
      price: `299 `,
      time: '70 min',
      image: untitleddesign3,
      d1: 'single',
    },
    {
      title: 'Single Door Fridge Check',
      rating: 4.8,
      price: `299 `,
      time: '70 min',
      image: untitleddesign3,
      d1: 'single',
    },
  ];
  const Srt2 = [
    {
      title: 'Double Door Fridge Check',
      rating: 4.8,
      price: `159`,
      time: '70 min',
      image: untitleddesign3,
      d1: 'Installation',
    },
    {
      title: 'Double Door Fridge Check',
      rating: 4.8,
      price: `159`,
      time: '70 min',
      image: untitleddesign3,
      d1: 'Installation',
    },
    {
      title: 'Double Door Fridge Check',
      rating: 4.8,
      price: `159`,
      time: '70 min',
      image: untitleddesign3,
      d1: 'Installation',
    },
  ];
  const Srt3 = [
    {
      title: 'Side by Side Services',
      rating: 4.8,
      price: `159`,
      time: '70 min',
      image: untitleddesign3,
      d1: 'Installation',
    },
    {
      title: 'Side by Side Services',
      rating: 4.8,
      price: `159`,
      time: '70 min',
      image: untitleddesign3,
      d1: 'Installation',
    },
    {
      title: 'Side by Side Services',
      rating: 4.8,
      price: `159`,
      time: '70 min',
      image: untitleddesign3,
      d1: 'Installation',
    },
  ];
  const Srt4 = [
    {
      title: 'Gas Filing and Cooling Check',
      rating: 4.6,
      price: `149`,
      time: '70 min',
      image: untitleddesign3,
      d1: 'Installation',
    },
  ];
  return (
    <View style={Reusablecss.Reusablecss}>
      <Header
        bgColor={Colors.darkOrange}
        color={Colors.black}
        title=" Refrigerator"
        onPress={() => navigation.goBack('')}
      />

      <GreenHeader title="Technician travel & safety charge will be added" />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,
          marginVertical: 10,
        }}>
        <TouchableOpacity
          style={{
            height: height / 17,
            width: width / 3.6,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 7,
            backgroundColor: 'black',
          }}>
          <Text style={{fontWeight: 'bold', color: 'white'}}>Single Door</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: height / 17,
            width: width / 3.6,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 7,
            backgroundColor: 'black',
          }}>
          <Text style={{fontWeight: 'bold', color: 'white'}}>Double Door</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: height / 17,
            width: width / 3.6,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 7,
            backgroundColor: 'black',
          }}>
          <Text style={{fontWeight: 'bold', color: 'white'}}>Side by Side</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* <GrayHeader title="Single Door" /> */}
        <View style={Reusablecss.cntrContainer}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            data={Srt}
            renderItem={({item}) => (
              <View style={Reusablecss.card}>
                <View style={Reusablecss.cardItem}>
                  <Text style={Reusablecss.title}>{item.title}</Text>
                  <View style={Reusablecss.ratingCntr}>
                    <FontAwesome5Icon
                      name="star"
                      solid
                      size={hp('2%')}
                      color={Colors.lightYellow}
                    />
                    <Text style={Reusablecss.ratingBar}>{item.rating}</Text>
                  </View>
                  <View style={Reusablecss.priceCntr}>
                    <Image
                      source={require('../Assets/Images/rupee.png')}
                      style={Reusablecss.img}
                    />
                    <Text style={Reusablecss.priceBar}>{item.price}</Text>
                    <Text style={Reusablecss.timing}>{item.time}</Text>
                  </View>
                  <Text style={{marginTop: '5%'}}>
                    ..................................................................
                  </Text>
                  <View style={Reusablecss.dataCntr}>
                    <Image source={require('../Assets/Images/Ellipse1.png')} />
                    <Text style={Reusablecss.data}>{item.d1}</Text>
                  </View>
                  <View style={Reusablecss.dataCntr}>
                    <Image
                      source={require('../Assets/Images/Ellipse1.png')}
                      style={{opacity: item.d2 === undefined ? 0 : 1}}
                    />
                    <Text style={Reusablecss.data}>{item.d2}</Text>
                  </View>
                </View>
                <View style={Reusablecss.imgCntr}>
                  <Image
                    resizeMode="contain"
                    source={item.image}
                    style={Reusablecss.innerImage}
                  />
                  <TouchableOpacity style={Reusablecss.imgButton}>
                    <Text style={Reusablecss.btnText}>ADD +</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
        <GrayHeader title="Double Door" />
        <View style={Reusablecss.cntrContainer}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            data={Srt2}
            renderItem={({item}) => (
              <View style={Reusablecss.card}>
                <View style={Reusablecss.cardItem}>
                  <Text style={Reusablecss.title}>{item.title}</Text>
                  <View style={Reusablecss.ratingCntr}>
                    <FontAwesome5Icon
                      name="star"
                      solid
                      size={hp('2%')}
                      color={Colors.lightYellow}
                    />
                    <Text style={Reusablecss.ratingBar}>{item.rating}</Text>
                  </View>
                  <View style={Reusablecss.priceCntr}>
                    <Image
                      source={require('../Assets/Images/rupee.png')}
                      style={Reusablecss.img}
                    />
                    <Text style={Reusablecss.priceBar}>{item.price}</Text>
                    <Text style={Reusablecss.timing}>{item.time}</Text>
                  </View>
                  <Text style={{marginTop: '5%'}}>
                    ..................................................................
                  </Text>
                  <View style={Reusablecss.dataCntr}>
                    <Image source={require('../Assets/Images/Ellipse1.png')} />
                    <Text style={Reusablecss.data}>{item.d1}</Text>
                  </View>
                  <View style={Reusablecss.dataCntr}>
                    <Image
                      source={require('../Assets/Images/Ellipse1.png')}
                      style={{opacity: item.d2 === undefined ? 0 : 1}}
                    />
                    <Text style={Reusablecss.data}>{item.d2}</Text>
                  </View>
                </View>
                <View style={Reusablecss.imgCntr}>
                  <Image
                    resizeMode="contain"
                    source={item.image}
                    style={Reusablecss.innerImage}
                  />
                  <TouchableOpacity style={Reusablecss.imgButton}>
                    <Text style={Reusablecss.btnText}>ADD +</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
        <GrayHeader title="Side by Side" />
        <View style={Reusablecss.cntrContainer}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            data={Srt3}
            renderItem={({item}) => (
              <View style={Reusablecss.card}>
                <View style={Reusablecss.cardItem}>
                  <Text style={Reusablecss.title}>{item.title}</Text>
                  <View style={Reusablecss.ratingCntr}>
                    <FontAwesome5Icon
                      name="star"
                      solid
                      size={hp('2%')}
                      color={Colors.lightYellow}
                    />
                    <Text style={Reusablecss.ratingBar}>{item.rating}</Text>
                  </View>
                  <View style={Reusablecss.priceCntr}>
                    <Image
                      source={require('../Assets/Images/rupee.png')}
                      style={Reusablecss.img}
                    />
                    <Text style={Reusablecss.priceBar}>{item.price}</Text>
                    <Text style={Reusablecss.timing}>{item.time}</Text>
                  </View>
                  <Text style={{marginTop: '5%'}}>
                    ..................................................................
                  </Text>
                  <View style={Reusablecss.dataCntr}>
                    <Image source={require('../Assets/Images/Ellipse1.png')} />
                    <Text style={Reusablecss.data}>{item.d1}</Text>
                  </View>
                  <View style={Reusablecss.dataCntr}>
                    <Image
                      source={require('../Assets/Images/Ellipse1.png')}
                      style={{opacity: item.d2 === undefined ? 0 : 1}}
                    />
                    <Text style={Reusablecss.data}>{item.d2}</Text>
                  </View>
                </View>
                <View style={Reusablecss.imgCntr}>
                  <Image
                    resizeMode="contain"
                    source={item.image}
                    style={Reusablecss.innerImage}
                  />
                  <TouchableOpacity style={Reusablecss.imgButton}>
                    <Text style={Reusablecss.btnText}>ADD +</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
        <GrayHeader title="Gas Filing" />
        <View style={Reusablecss.cntrContainer}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            data={Srt4}
            renderItem={({item}) => (
              <View style={Reusablecss.card}>
                <View style={Reusablecss.cardItem}>
                  <Text style={Reusablecss.title}>{item.title}</Text>
                  <View style={Reusablecss.ratingCntr}>
                    <FontAwesome5Icon
                      name="star"
                      solid
                      size={hp('2%')}
                      color={Colors.lightYellow}
                    />
                    <Text style={Reusablecss.ratingBar}>{item.rating}</Text>
                  </View>
                  <View style={Reusablecss.priceCntr}>
                    <Image
                      source={require('../Assets/Images/rupee.png')}
                      style={Reusablecss.img}
                    />
                    <Text style={Reusablecss.priceBar}>{item.price}</Text>
                    <Text style={Reusablecss.timing}>{item.time}</Text>
                  </View>
                  <Text style={{marginTop: '5%'}}>
                    ..................................................................
                  </Text>
                  <View style={Reusablecss.dataCntr}>
                    <Image source={require('../Assets/Images/Ellipse1.png')} />
                    <Text style={Reusablecss.data}>{item.d1}</Text>
                  </View>
                  <View style={Reusablecss.dataCntr}>
                    <Image
                      source={require('../Assets/Images/Ellipse1.png')}
                      style={{opacity: item.d2 === undefined ? 0 : 1}}
                    />
                    <Text style={Reusablecss.data}>{item.d2}</Text>
                  </View>
                </View>
                <View style={Reusablecss.imgCntr}>
                  <Image
                    resizeMode="contain"
                    source={item.image}
                    style={Reusablecss.innerImage}
                  />
                  <TouchableOpacity style={Reusablecss.imgButton}>
                    <Text style={Reusablecss.btnText}>ADD +</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
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
    // height: hp('68%'),
    // paddingBottom: hp('8%'),
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
