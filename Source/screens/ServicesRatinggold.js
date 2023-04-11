import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';
import axios from 'axios';
import {BASE_URL} from '../Assets/utils/Restapi/Config';
import {_getStorage} from '../Assets/utils/storage/Storage';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export default function ServicesRatinggold(props) {
  const preData = props.route.params;
  console.log('hey', preData);

  const [ratingdata, setRatingdata] = useState([]);
  const [lengthzero, setLengthzero] = useState('');

  useEffect(() => {
    allReviewsOfParticularPackage();
  }, []);

  const allReviewsOfParticularPackage = async () => {
    const token = await _getStorage('token');
    // console.log('token-------->>>', token);

    const data = {
      serviceId: preData.serviceID,
      packageId: preData.goldID,
    };

    console.log('data', data);
    let meassage = 'Data Not Found';

    axios
      .post(BASE_URL + `/category/review/serviceId/packageId`, data, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log('gold rating response------------', res.data);
        if (res.data.service[0].gold.rating.length === 0) {
          setLengthzero(meassage);
        } else {
          setRatingdata(res.data.service[0].gold.rating);
        }
      })
      .catch(error => {
        console.log('gold all rating catch errro--------->>>', error);
        // if (error) {
        //   setLengthzero(meassage);
        // }
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        bgColor={Colors.darkOrange}
        color={Colors.white}
        title="View Rating"
        onPress={() => props.navigation.goBack()}
      />
      {lengthzero ? (
        <Text style={{textAlign: 'center', marginTop: '80%', color: '#aaa'}}>
          {lengthzero}
        </Text>
      ) : (
        <ScrollView>
          {ratingdata.map((value, index) => (
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
                <Text style={{color: Colors.black}}>{value.name}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  alignItems: 'center',
                }}>
                <Text style={{color: Colors.black, paddingHorizontal: 10}}>
                  Star :
                </Text>
                <FontAwesome5Icon
                  name="star"
                  solid
                  size={15}
                  color={Colors.lightYellow}
                  style={{left: 5}}
                />
                <Text style={{color: Colors.black, marginHorizontal: 10}}>
                  {value.star}
                </Text>
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
                <Text style={{color: Colors.black}}>{value.comment}</Text>
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
                <Text style={{color: Colors.black}}>{value.ratedBy}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
