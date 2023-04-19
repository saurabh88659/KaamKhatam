import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Colors from '../Assets/Constants/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import HeaderDrawer from '../ReusableComponents/HeaderDrawer';
import {_getStorage} from '../Assets/utils/storage/Storage';
import axios from 'axios';
import {BASE_URL} from '../Assets/utils/Restapi/Config';
import Geolocation from '@react-native-community/geolocation';
import Toast from 'react-native-simple-toast';
import Header from '../ReusableComponents/Header';
import {useIsFocused} from '@react-navigation/native';

const MyCartScreen = props => {
  const [mycartname, setMycartname] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [delmess, setDelmess] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [refresh, setRfresh] = useState(false);
  const isFocused = useIsFocused();


  setTimeout(() => {
    setRfresh(false);
  }, 3000);

  useEffect(() => {
    if (isFocused) {
      get_mycart();
    }
  }, [isFocused]);

  const get_mycart = async () => {
    const token = await _getStorage('token');
    setRfresh(true);

    axios
      .get(BASE_URL + `/cart`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log('my cart--------------.', res.data);
        setMycartname(res.data.newResult);
        setDelmess('');
        setIsLoading(false);
        setRfresh(false);
      })
      .catch(error => {
        if (error.response.data?.message === 'No Result Found ') {
          setDelmess(error.response.data?.message);
          setMycartname('');
        } else {
          console.log('my cart catch error', error.response.data);
        }
        setIsLoading(false);
      });
  };

  const delete_My_Cart = async () => {
    const token = await _getStorage('token');
    Toast.showWithGravity('Please wait...', Toast.LONG, Toast.BOTTOM);

    console.log(token);
    console.log('mycartname', mycartname.cartId);

    axios
      .delete(BASE_URL + `/cart`, {
        headers: {Authorization: `Bearer ${token}`},
        data: {cartId: mycartname.cartId},
      })
      .then(rep => {
              get_mycart();
        Toast.showWithGravity(rep.data?.message, Toast.LONG, Toast.BOTTOM);
      })
      .catch(error => {
        console.log('delete catch error', error.response.data);
        Toast.showWithGravity(
          error.response.data?.message,
          Toast.LONG,
          Toast.BOTTOM,
        );
      });
  };

  const _getgeolocations = async () => {
    const token = await _getStorage('token');
    Geolocation.getCurrentPosition(data => {
      setLatitude(data.coords.latitude), setLongitude(data.coords.longitude);
    });
    const locobj = {
      longitude: latitude,
      latitude: longitude,
    };
    console.log('locobj', locobj);
    axios
      .put(BASE_URL + `/coordinates`, locobj, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log('Locations', res.data);
        if (res.data) {
          // props.navigation.navigate('Editaddress');
          props.navigation.navigate('TimeAndSlot', {
            cartId: mycartname.cartId,
          });
        } else {
          console.log('else conditions');
        }
      })
      .catch(error => {
        console.log('catch locations error', error.response?.data);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
           <Header
        bgColor={Colors.darkOrange}
        color={Colors.white}
        title="My Cart"
        onPress={() => props.navigation.goBack('')}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={get_mycart} />
        }>
        {isLoading === true ? (
          <ActivityIndicator
            color="#FFA034"
            size="large"
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '65%',
            }}
          />
        ) : delmess ? (
          <Text
            style={{
              textAlign: 'center',
              marginTop: '60%',
              color: '#aaa',
            }}>
            {delmess}
          </Text>
        ) : (
          <View
            style={{
              height: '100%',
              backgroundColor: Colors.white,
              borderRadius: 10,
              marginHorizontal: 10,
              marginVertical: 10,
              paddingVertical: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}>
              <Text style={{color: Colors.black}}>Service Name</Text>
              <Text
                style={{
                  color: Colors.lightGray,
                  textAlign: 'center',
                  alignSelf: 'center',
                }}>
                {mycartname.serviceName}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}>
              <Text style={{color: Colors.black}}>Service ID</Text>
              <Text style={{color: Colors.lightGray}}>
                {mycartname.serviceId}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}>
              <Text style={{color: Colors.black}}>Package ID</Text>
              <Text style={{color: Colors.lightGray}}>
                {mycartname.packageId}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}>
              <Text style={{color: Colors.black}}>Package Type</Text>
              <Text style={{color: Colors.lightGray}}>
                {mycartname.packageDescription}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}>
              <Text style={{color: Colors.black}}>Price</Text>
              <Text style={{color: Colors.lightGray}}>{mycartname.price}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 10,
                top: 5,
              }}>
              <TouchableOpacity
                // onPress={() => props.navigation.navigate('Editaddress')}
                onPress={_getgeolocations}
                style={{
                  backgroundColor: Colors.darkGreen,
                  padding: 8,
                  borderRadius: 7,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 20,
                }}>
                <Text style={{color: Colors.white, fontWeight: '500'}}>
                  Add Booking
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={delete_My_Cart}
                style={{
                  backgroundColor: '#E70505',
                  padding: 8,
                  borderRadius: 7,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 20,
                }}>
                <Text style={{color: Colors.white, fontWeight: '500'}}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
         </SafeAreaView>
  );
};

export default MyCartScreen;

const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
  },
  cntrContainer: {
       flex: 1,
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
    marginHorizontal: 5,
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
    right: 10,
  },
  timing: {
    marginLeft: wp('5%'),
    fontSize: hp('2%'),
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
});
