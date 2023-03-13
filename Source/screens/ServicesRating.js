import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import Colors from '../Assets/Constants/Colors';
import Header from '../ReusableComponents/Header';
import {_getStorage} from '../Assets/utils/storage/Storage';
import axios from 'axios';
import {BASE_URL} from '../Assets/utils/Restapi/Config';

export default function ServicesRating(props) {
  const preData = props.route.params;

  console.log('hey------', preData);

  useEffect(() => {
    allReviewsOfParticularPackage();
  }, []);

  const allReviewsOfParticularPackage = async () => {
    const token = await _getStorage('token');
    console.log('token-------->>>', token);

    const objId = {
      serviceId: preData.serviceID,
      packageId: preData.silverID,
    };

    console.log('objId', objId);

    axios
      .get(
        BASE_URL + `/category/review/serviceId/packageId`,
        {
          headers: {Authorization: `Bearer ${token}`},
        },
        objId,
      )
      .then(res => {
        console.log('rating response', res);
      })
      .catch(error => {
        console.log(
          'all rating catch errro--------->>>',
          error.response.data.message,
        );
      });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <Header
        bgColor={Colors.darkOrange}
        color={Colors.white}
        title="View Rating"
        onPress={() => props.navigation.goBack()}
      />
      <ScrollView>
        <View
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
      </ScrollView>
    </SafeAreaView>
  );
}
