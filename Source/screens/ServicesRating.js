import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../Assets/Constants/Colors';
import Header from '../ReusableComponents/Header';
import {_getStorage} from '../Assets/utils/storage/Storage';
import axios from 'axios';
import {BASE_URL} from '../Assets/utils/Restapi/Config';

export default function ServicesRating(props) {
  const preData = props.route.params;

  const [ratingdata, setRatingdata] = useState([]);

  console.log('hey------', preData);

  useEffect(() => {
    allReviewsOfParticularPackage();
    allReviewsOfParticularPackagePlatinum();
    allReviewsOfParticularPackageGold();
  }, []);

  const allReviewsOfParticularPackage = async () => {
    const token = await _getStorage('token');
    console.log('token-------->>>', token);
    axios
      .get(
        BASE_URL + `/category/review/${preData.serviceID}/${preData.silverID}`,
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      )
      .then(res => {
        console.log(
          'silver rating response',
          res.data.service[0].silver.rating,
        );
        setRatingdata(res.data.service[0].silver.rating);
      })
      .catch(error => {
        console.log(' silver all rating catch errro--------->>>', error);
      });
  };

  const allReviewsOfParticularPackageGold = async () => {
    const token = await _getStorage('token');
    console.log('token-------->>>', token);
    axios
      .get(
        BASE_URL + `/category/review/${preData.serviceID}/${preData.goldID}`,
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      )
      .then(res => {
        console.log(' gold rating response', res.data);
        setRatingdata(res.data.service[0].silver.rating);
      })
      .catch(error => {
        console.log(' gold all rating catch errro--------->>>', error);
      });
  };

  const allReviewsOfParticularPackagePlatinum = async () => {
    const token = await _getStorage('token');
    console.log('token-------->>>', token);
    axios
      .get(
        BASE_URL +
          `/category/review/${preData.serviceID}/${preData.platinumID}`,
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      )
      .then(res => {
        console.log(' Platinum rating response', res.data);
        setRatingdata(res.data.service[0].platinum.rating);
      })
      .catch(error => {
        console.log(' platinum all rating catch errro--------->>>', error);
      });
  };

  const Srt = [
    {
      name: 'dablu',
    },
    {
      name: 'dablu',
    },
    {
      name: 'dablu',
    },
    {
      name: 'dablu',
    },
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <Header
        bgColor={Colors.darkOrange}
        color={Colors.white}
        title="View Rating"
        onPress={() => props.navigation.goBack()}
      />
      <ScrollView>
        {Srt.map((value, index) => (
          <View
            key={index}
            style={{
              borderWidth: 1,
              borderRadius: 10,
              marginHorizontal: 20,
              marginTop: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}>
              <Text style={{color: Colors.black, paddingHorizontal: 10}}>
                Name :
              </Text>
              <Text style={{color: Colors.black}}>ServicesRating</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}>
              <Text style={{color: Colors.black, paddingHorizontal: 10}}>
                Star :
              </Text>
              <Text style={{color: Colors.black}}>ServicesRating</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}>
              <Text style={{color: Colors.black, paddingHorizontal: 10}}>
                Comment :
              </Text>
              <Text style={{color: Colors.black}}>ServicesRating</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}>
              <Text style={{color: Colors.black, paddingHorizontal: 10}}>
                Rated By :
              </Text>
              <Text style={{color: Colors.black}}>ServicesRating</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
