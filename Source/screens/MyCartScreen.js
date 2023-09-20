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
  Dimensions,
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
import InternetInfoall from '../Assets/utils/Handler/InternetInfoall';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

const {height, width} = Dimensions.get('window');

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

  const getTotalAmountWithGST = amount => {
    return amount + amount * 0.18;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Header
        bgColor={Colors.topNavbarColor}
        color={Colors.white}
        title="My Cart"
        onPress={() => props.navigation.goBack('')}
      /> */}
      <HeaderDrawer
        Title="My Cart"
        onPress={() => props?.navigation.toggleDrawer()}
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
              flex: 1,
              height,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                height: 150,
                backgroundColor: Colors.white,
                borderRadius: 5,
                marginHorizontal: 10,
                marginVertical: 10,
                paddingVertical: 10,
                paddingHorizontal: 15,
                flexDirection: 'row',
                position: 'relative',
              }}>
              {/* <View
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
              <Text style={{color: Colors.purple}}>{mycartname.packageId}</Text>
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
                  backgroundColor: Colors.purple,
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
            </View> */}
              <View style={{width: '70%'}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '800',
                    color: Colors.black,
                  }}>
                  {mycartname?.serviceName}
                </Text>
                <View style={{flexDirection: 'row', marginTop: 4}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Colors.black,
                    }}>
                    {'\u20B9'}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Colors.black,
                      textDecorationLine: 'line-through',
                      marginLeft: 2,
                    }}>
                    {mycartname?.price}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Colors.black,
                      marginLeft: 5,
                    }}>
                    {mycartname?.price}
                  </Text>
                </View>
                <Text style={{fontSize: 14, color: Colors.black, marginTop: 4}}>
                  {mycartname?.serviceDescripton}
                </Text>
                <View style={{flexDirection: 'row', marginTop: 4}}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '700',
                      color: Colors.black,
                    }}>
                    Service Type:{' '}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Colors.black,
                    }}>
                    {mycartname?.packageDescription}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: '30%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: '90%',
                    height: 90,
                    backgroundColor: '#F4F4F4',
                    borderRadius: 5,
                  }}></View>
              </View>
              <View
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  backgroundColor: '#F4F4F4',
                  borderBottomLeftRadius: 8,
                  paddingHorizontal: 10,
                  paddingVertical: 2,
                }}>
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    onPress={delete_My_Cart}
                    name="delete"
                    color={Colors.black}
                    size={18}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                marginBottom: 120,
                width: '100%',
                padding: 5,
              }}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: Colors.darkGray,
                  borderRadius: 5,
                  padding: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{color: Colors.darkGray, fontWeight: '500'}}>
                    Item total
                  </Text>
                  <Text style={{color: Colors.darkGray, fontWeight: '500'}}>
                    {'\u20B9'} {mycartname?.price}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <Text style={{color: Colors.darkGray, fontWeight: '500'}}>
                    GST
                  </Text>
                  <Text style={{color: Colors.darkGray, fontWeight: '500'}}>
                    18%
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 25,
                    height: 1,
                    backgroundColor: Colors.darkGray,
                    marginHorizontal: 5,
                  }}></View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: Colors.black,
                      fontWeight: '700',
                    }}>
                    Total
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      color: Colors.black,
                      fontWeight: '700',
                    }}>
                    {'\u20B9'} {getTotalAmountWithGST(mycartname?.price)}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={_getgeolocations}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: Colors.purple,
                  marginTop: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: Colors.white,
                    fontWeight: '600',
                  }}>
                  {'\u20B9'} {getTotalAmountWithGST(mycartname?.price)}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: Colors.white,
                    fontWeight: '600',
                  }}>
                  Continue
                  <Feather name="arrow-right" color={Colors.white} size={18} />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
      <InternetInfoall />
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
