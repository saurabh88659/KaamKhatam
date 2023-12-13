import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  StatusBar,
  Dimensions,
  RefreshControl,
  BackHandler,
  Modal,
  FlatList,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../../Assets/Constants/Colors';
import HeaderDrawer from '../../ReusableComponents/HeaderDrawer';
import ServicesComp from './Component/ServicesComp';
import axios from 'axios';
import Swiper from 'react-native-swiper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {BASE_URL} from '../../Assets/utils/Restapi/Config';
import {_getStorage} from '../../Assets/utils/storage/Storage';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import InternetInfoall from '../../Assets/utils/Handler/InternetInfoall';
import LinearGradient from 'react-native-linear-gradient';
import BeautyServices from './Component/BeautyServices';
import Toast from 'react-native-simple-toast';

import MapmyIndiaGL from 'mapmyindia-map-react-native-beta';
import Mapmyindia from 'mapmyindia-restapi-react-native-beta';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {APIservice} from '../../API/APIservice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NotificationSaved from '../NotificationSaved';
import {useDispatch, useSelector} from 'react-redux';
import {
  SetNotification,
  SetNotificationCount,
  SetUserData,
} from '../../features/updatedata/update.reducer';
import {color} from 'react-native-reanimated';
import DealOfTheDayServices from './Component/DealOfTheDayServices';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';
// import {check, request, PERMISSIONS, RESULTS} from '@react-native-permissions';

// import {Modal} from 'react-native-paper';

const API_KEY = 'AIzaSyD3Uol_-mBQSaZgIfuzVVK1oHXqBHPkrZE';

MapmyIndiaGL.setMapSDKKey(' 8ee0b13464d3c2f63fb06806e1611675'); //place your mapsdkKey

MapmyIndiaGL.setRestAPIKey(' 8ee0b13464d3c2f63fb06806e1611675'); //your restApiKey

MapmyIndiaGL.setAtlasClientId(
  '33OkryzDZsLNc-DO6bIDFY9l_l5dL23iJ6BJLxWsgCrFmfNqrCvjxEwLlpddSqKrYf0tkJe5lViOffRo8YDrwQ====',
); //your atlasClientId key
MapmyIndiaGL.setAtlasClientSecret(
  '33OkryzDZsLNc-DO6bIDFY9l_l5dL23iJ6BJLxWsgCrFmfNqrCvjxEwLlpddSqKrYf0tkJe5lViOffRo8YDrwQ====',
); //your atlasClientSecret key

Mapmyindia.setRestApiKey(' 8ee0b13464d3c2f63fb06806e1611675');

Mapmyindia.setClientId(
  '33OkryzDZsINNUKLtouGXDuMmyarRjHCpMqepZrjyJtohZ_anWX8b1U3lPyf3IVPPmR9grAaNwt1IKFH7RXrNg==',
);

Mapmyindia.setClientSecret(
  'lrFxI-lrFxI-iSEg8Ees5ciZfVNWogwrQ839ihm1r9GZUgnt9umUjxUwgYkll_UDKTarotOmyqYrESMXTt_DDBJ1fsNm8xPF0lFRWl',
);

function Home() {
  const dispatch = useDispatch();
  const notificationCount = useSelector(
    state => state.updateState.notificationCount,
  );

  console.log('test');
  const navigation = useNavigation();
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bannerUrl, setBannerUrl] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [state, setState] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [refresh, setRfresh] = useState(false);
  const isFocused = useIsFocused();
  const [address, setAddress] = useState('');
  const [Coordinates, setCoordinates] = useState('');
  const [selectedItem, setSelectedItem] = useState(null); // State to keep track of the selected item
  const BASEURL = 'https://kaamkhatamapi.kickrtechnology.online';
  const [topServices, setTopservices] = useState(null);
  const [dealOfTheDayData, setDealOfTheDayData] = useState([]);

  // const requestNotificationPermission = async () => {
  //   const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
  //   return result;
  // };
  // const checkNotificationPermission = async () => {
  //   const result = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
  //   return result;
  // };

  console.log('<------home .js  coordinator----->', Coordinates);
  setTimeout(() => {
    setRfresh(false);
  }, 3000);

  const geoCoding = async () => {
    Geocoder.init(API_KEY);
    Geolocation.getCurrentPosition(data => {
      setLatitude(data.coords.latitude), setLongitude(data.coords.longitude);
      // console.log('data--------------->>>>', data);
    });
    Geocoder.from(latitude, longitude).then(json => {
      console.log('chack data=====', json.results.coords);
      json.results[0].address_components.forEach((value, index) => {
        setState(
          json.results[0].formatted_address,
          // tempAddress: json.results[0].formatted_address,
        );
      });
    });
  };

  useEffect(() => {
    // TO RESET SEARCH ITEM=====
    setSearchText('');
    setSelectedItem(null);
    //==============

    if (isFocused) {
      getAllCategory();
      _getBanner();
      // geoCoding();
      _locationGeocoder();
      //_revGeoCodeApi;
      //delete unpid booking======
      APIservice.UnpaidBookingDelete();
    }
  }, [isFocused]);

  const getAllCategory = async () => {
    const token = await _getStorage('token');
    axios
      .get(BASE_URL + `/category/allCategory`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(async resp => {
        setCategory(resp.data.category);
        setIsLoading(false);
        // console.log('home category--------------', resp.data.category);
      })
      .catch(e => {
        console.log('home screen catch error', e.response?.data);
        setIsLoading(false);
      });
  };

  const getCategoryWiseService = async (id, name) => {
    const token = await _getStorage('token');
    axios
      .get(BASE_URL + `/category/categoryService/${id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(resp => {
        if (resp.data.result.subCategory?.length !== 0) {
          navigation.navigate('Subcategory', {id, name});
        } else if (resp.data.result.service?.length !== 0) {
          let navData = {
            _id: id,
            from: 'cat',
            name: name,
          };
          // console.log('home navData', navData);
          navigation.navigate('Services', {navData});
        } else {
        }
        console.log('subCategory-------->>>', resp.data.result.subCategory);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('in catch error data home', error.response);
        setIsLoading(false);
      });
  };

  const _getBanner = async () => {
    const token = await _getStorage('token');
    axios
      .get(BASE_URL + `/banner`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log('banner response', res?.data?.banner);
        setBannerUrl(res?.data?.banner);
      })
      .catch(error => {
        console.log('banner catch error', error);
      });
  };

  const filteredData = category.filter(item => {
    return item.name.toLowerCase().includes(searchText.toLowerCase());
  });

  const _locationGeocoder = () => {
    Geolocation.getCurrentPosition(data => {
      setCoordinates(data.coords);
    });
  };

  // useEffect(() => {
  //   _revGeoCodeApi();
  // }, []);

  // const _revGeoCodeApi = async () => {
  //   console.log('running _revGeoCodeApi on useeffcet  ');
  //   Mapmyindia.rev_geocode(
  //     {lat: Coordinates.latitude, lng: Coordinates.longitude},
  //     response => {
  //       setAddress(response?.results[0]);
  //       console.log(
  //         '++++++++++++++++++++++response++++++++++++++++++',
  //         response,
  //       );
  //     },
  //     await AsyncStorage.setItem('CompleteUserAddress', address),
  //   );
  // };

  useEffect(() => {
    getUserCrruentData();
  }, []);

  const getUserCrruentData = async () => {
    const hh = await AsyncStorage.getItem('CompleteUserAddress');
    console.log('hh home 201', hh);
  };

  //exit app on double click==============================
  const [isExitModalVisible, setExitModalVisible] = useState(false);
  const [isDoubleClick, setIsDoubleClick] = useState(false);

  const servicesData = [
    {
      title: 'Classic Mani & Pedi',
      image: require('../../Assets/Images/hairdressing2.png'),
    },
    {
      title: 'Clean up + Bleach',
      image: require('../../Assets/Images/Massage1.png'),
    },
    {
      title: 'Chocolate Wax',
      image: require('../../Assets/Images/Massage3.png'),
    },
    {
      title: 'Skin Brightening',
      image: require('../../Assets/Images/Massage4.png'),
    },
    // Add more services to the array as needed
  ];

  // console.log('===isExitModalVisible', isExitModalVisible);
  // console.log('====isDoubleClick', isDoubleClick);

  // let currentCount = 0;

  // useEffect(() => {
  //   if (isFocused) {
  //     BackHandler.addEventListener('hardwareBackPress', backAction);
  //     return () => {
  //       BackHandler.removeEventListener('hardwareBackPress', backAction);
  //     };
  //   }
  // }, [isFocused]);

  // const backAction = () => {
  //   if (navigation.isFocused()) {
  //     const subscription = BackHandler.addEventListener(
  //       'hardwareBackPress',
  //       () => {
  //         if (currentCount === 1) {
  //           BackHandler.exitApp();
  //           subscription.remove();
  //           return true;
  //         }
  //         backPressHandler();
  //         return true;
  //       },
  //     );
  //     return true;
  //   }
  // };

  const backPressHandler = () => {
    if (currentCount < 1) {
      Toast.showWithGravity(
        'Press back again to exit',
        Toast.SHORT,
        Toast.BOTTOM,
      );

      currentCount += 1;
    }
    setTimeout(() => {
      currentCount = 0;
      console.log('set to 0');
    }, 1000);
  };

  const handleItemPress = item => {
    console.log(
      'item of topservices in handleItemPress function   Home.js',
      item._id._id,
    );
    setSelectedItem(item); // Update the selected item when it's pressed
    console.log('iiii=======>', item);
    // navigation.navigate('Topservices', {item});
    // navigation.navigate('Services', {navData});
  };

  const bookTopservices = () => {
    if (selectedItem == null) {
      Toast.showWithGravity(
        'Please select a service before proceeding',
        Toast.SHORT,
        Toast.BOTTOM,
      );
    } else {
      console.log('jjj=======>', selectedItem);
      navigation.navigate('Topservices', {selectedItem});
      setTimeout(() => {
        setSelectedItem(null);
      }, 500);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getNotification();
    }
  }, [isFocused]);

  const getNotification = async () => {
    const token = await _getStorage('token');
    axios
      .get(BASE_URL + `/notifications`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(async res => {
        console.log(
          '+++++++++++++++++++++++++++++++getNotification res=====>>',
          res.data,
        );
        dispatch(SetNotification(res.data.notifications));
        dispatch(SetNotificationCount(res.data.count));
      })
      .catch(e => {
        console.log(
          'home screen catch error getNotification ',
          e?.response?.data,
        );
      });
  };

  // const handleNotification = () => {
  //   readNotifications();
  // };

  const readNotifications = async () => {
    console.log(
      '++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
    );
    navigation.navigate('NotificationSaved');
    const token = await _getStorage('token');
    const data = {};
    axios
      .put(BASE_URL + `/notifications`, data, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(async res => {
        console.log(
          '+++++++++++++++++++++++++++++++getNotification res=====>>',
        );
      })
      .catch(e => {
        console.log(
          'home screen catch error getNotification ',
          e?.response?.data,
        );
      });
  };

  useEffect(() => {
    _getprofileapi();
  }, []);

  const _getprofileapi = async () => {
    const token = await _getStorage('token');
    axios
      .get(BASE_URL + `/profile`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(val => {
        console.log(
          '+++++++++++++++++++++++++++res of _getprofileapi userata====>',
          val.data.result,
        );
        dispatch(SetUserData(val.data.result));
      })
      .catch(error => {
        console.log('====in catch====', error);
      });
  };
  const GotoExclusiveOffer = () => {
    console.log('GotoExclusiveOffer==>>>>>');
    navigation.navigate('ExclusiveOfferScreen');
  };

  //============================================HOT OFFERS================================
  useEffect(() => {
    getHotOffers();
  }, []);
  const getHotOffers = async () => {
    const token = await _getStorage('token');
    axios
      .get(BASE_URL + `/hotOffers`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(async res => {
        console.log(
          '@@@@@res of getHotOffers:=====>>',
          JSON.stringify(res.data),
        );
      })
      .catch(e => {
        console.log(
          'home screen catch error of getHotOffers',
          e.response?.data,
        );
      });
  };
  //============================================HOT OFFERS================================

  //============================================DEAL OF THE DAY================================
  useEffect(() => {
    getDealOftheDay();
  }, []);
  const getDealOftheDay = async () => {
    const token = await _getStorage('token');
    axios
      .get(BASE_URL + `/dealOfTheDay`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(async res => {
        console.log(
          '#####res of getDealOftheDay:=====>>',
          JSON.stringify(res.data),
        );
        setDealOfTheDayData(res.data?.services);
      })
      .catch(e => {
        console.log(
          'home screen catch error of getDealOftheDay',
          e.response?.data,
        );
      });
  };
  //============================================DEAL OF THE DAY================================

  //============================================TOP SERVICES================================
  useEffect(() => {
    getTopServices();
  }, []);
  const getTopServices = async () => {
    const token = await _getStorage('token');
    axios
      .get(BASEURL + `/api/v1/admin/topService`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(async resp => {
        // setCategory(resp.data.category);
        // setIsLoading(false);
        console.log(
          'res of getTopServices--------------',
          JSON.stringify(resp.data),
        );
        setTopservices(resp.data.topServices);
      })
      .catch(e => {
        console.log('home screen catch error top services', e.response.data);
        // setIsLoading(false);
      });
  };
  //============================================TOP SERVICES================================
  const data = [1, 4, 4, 5, 5, 66, 7, 77, 7, 8];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.topNavbarColor}
        barStyle={Colors.white}
      />
      {/* {=======================================} */}
      <View
        style={{
          width: wp('100%'),
          height: hp('7%'),
          backgroundColor: Colors.topNavbarColor,
          paddingHorizontal: wp('3%'),
          flexDirection: 'row',
          alignItems: 'center',
          // justifyContent: 'flex-end',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            // hitSlop={{top: 25, bottom: 25, left: 50, right: 50}}
            onPress={() => navigation.openDrawer()}>
            <FontAwesome5 name="bars" color={Colors.white} size={hp('3.5%')} />
          </TouchableOpacity>

          <View
            // onPress={() => navigation.navigate('SearchService')}
            style={{
              height: 35,
              backgroundColor: '#ECECEC',
              paddingHorizontal: 15,
              // display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',

              marginLeft: wp('6%'),
              borderRadius: 20,
              width: '80%',
            }}>
            <FontAwesome5Icon name="search" size={17} color="grey" />
            <TextInput
              style={{paddingHorizontal: 9, color: Colors.black, height: 40}}
              placeholderTextColor="grey"
              placeholder="Search by Category, name...."
              value={searchText}
              onChangeText={text => setSearchText(text)}
              // editable={false}
            />
          </View>

          {/* <Text
            numberOfLines={1}
            style={{
              width: wp('58%'),
              fontWeight: 'bold',
              fontSize: hp('2.5%'),
              color: 'white',
              paddingHorizontal: 20,
            }}>
          </Text> */}
        </View>
        <TouchableOpacity
          style={{
            height: 30,
            width: 30,
            // backgroundColor: '#000',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={readNotifications}>
          {!notificationCount == 0 && (
            <View
              style={{
                position: 'absolute',
                top: -3,
                right: -2,
                height: 18,
                width: 18,
                backgroundColor: 'red',
                zIndex: 2,
                borderRadius: 9,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#fff', fontWeight: '500', fontSize: 12}}>
                {notificationCount}
              </Text>
            </View>
          )}
          <MaterialIcons name="notifications" color={'#fff'} size={26} />
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}>
          <Text
            numberOfLines={2}
            style={{
              fontWeight: 'bold',
              fontSize: hp('1.9%'),
              marginRight: wp('4%'),
              // right: '3%',
              color: 'white',
            }}>         
          </Text>
        </TouchableOpacity> */}

      {/* {================================} */}
      {/* <HeaderDrawer
        Title="KAAM KHATAM"
        //   location={address.subLocality}
        onPress={() => navigation.openDrawer()}
      /> */}

      {isLoading ? (
        <View
          style={{
            minHeight: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color={Colors.purple} size="large" />
        </View>
      ) : (
        <View>
          {/* <Text
            style={{
              color: Colors.white,
              textAlign: 'center',
              backgroundColor: Colors.darkGreen,
              fontWeight: '500',
              paddingHorizontal: 10,
            }}>
            {state}
          </Text> */}
          {/* <View
            // onPress={() => navigation.navigate('SearchService')}
            style={{
              height: 44,
              backgroundColor: '#ECECEC',
              paddingHorizontal: 10,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
              marginHorizontal: 10,
              borderRadius: 5,
            }}>
            <FontAwesome5Icon name="search" size={20} color="grey" />
            <TextInput
              style={{flex: 1, paddingHorizontal: 12, color: Colors.black}}
              placeholderTextColor="grey"
              placeholder="Search by Category, name...."
              value={searchText}
              onChangeText={text => setSearchText(text)}
              // editable={false}
            />
          </View> */}

          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                // onRefresh={_revGeoCodeApi}
              />
            }
            contentContainerStyle={{paddingBottom: '25%'}}
            showsVerticalScrollIndicator={false}>
            {/* <View>
              <Swiper
                showsButtons={false}
                autoplay={true}
                autoplayTimeout={10}
                showsPagination={false}
                style={styles.scroll}>
                {bannerUrl.map((value, index) => (
                  <TouchableOpacity key={index}>
                    <Image
                      source={{uri: value.imageUrl}}
                      style={styles.imgSlider}
                    />
                  </TouchableOpacity>
                ))}
              </Swiper>
            </View> */}

            <View
              style={{
                backgroundColor: Colors.white,
                // backgroundColor: 'red',
                shadowColor: '#000',
                shadowOffset: {width: 1, height: 1},
                shadowOpacity: 0.4,
                shadowRadius: 3,
                // elevation: 5,
                top: 20, //=============afterbanner
                // marginHorizontal: 20,
              }}>
              <View
                style={{
                  top: -15,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}>
                {filteredData.slice(0, 6).map((val, index) => (
                  <View key={index} style={{alignItems: 'center'}}>
                    <ServicesComp
                      title={val.name}
                      image={{uri: val.imageUrl}}
                      newStyle
                      onPress={() => getCategoryWiseService(val._id, val.name)}
                    />
                  </View>
                ))}
              </View>
              <View
                style={{
                  // width: '100%',
                  // backgroundColor: 'green',
                  alignItems: 'flex-end',
                  paddingHorizontal: 20,
                  // marginVertical: 30,
                  marginTop: 25,
                  marginBottom: 5,
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('AllCategoryScreen')}
                  style={{
                    height: 32,
                    width: 110,
                    backgroundColor: '#fff',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    borderColor: '#000',
                    borderWidth: 1,
                    marginBottom: 30,
                  }}>
                  <Text style={{color: '#000', fontWeight: '500'}}>
                    Explore More
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* {========================================HOT OFFERS  COMPONENT========================================== } */}
            <View
              style={{
                // backgroundColor: 'red',
                // width: wp('90%'),
                // alignSelf: 'center',
                paddingVertical: 10,
                // borderTopWidth: 7,
                // borderTopColor: Colors.grayShade,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 18,
                  fontWeight: '500',
                  marginHorizontal: 15,
                  marginBottom: 10,
                }}>
                Hot Offers
              </Text>
              <FlatList
                horizontal={true} // Set to true for horizontal scrolling
                data={dealOfTheDayData}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  console.log(
                    'I#####tem of deal of the dealOfTheDayData--->',
                    item.id,
                  ),
                  (
                    <View
                      style={{
                        // height: 200,
                        marginHorizontal: 10,
                        // width: '70%',
                        // height: wp('48%'),
                        // borderRadius: 10,
                        // borderWidth: 1.5,
                        // borderColor: 'grey',
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={{uri: item.imageUrl}}
                          style={{
                            width: wp('50%'),
                            height: wp('28%'),
                            borderRadius: 10,
                          }}
                        />
                        {/* <Text
                          style={{
                            fontSize: hp('1.7%'),
                            fontWeight: 'bold',
                            marginTop: hp('1%'),
                            color: 'black',
                          }}>
                          {item.name}
                        </Text> */}
                      </View>
                    </View>
                  )
                )}
              />
            </View>
            {/* {========================================HOT OFFERS  COMPONENT========================================== } */}

            {/* <View
              style={{
                marginTop: 6,
                borderBottomWidth: 4,
                borderBottomColor: Colors.grayShade,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontWeight: '400',
                  fontSize: 20,
                  paddingHorizontal: 15,
                }}>
                Hot Offers
              </Text>
              <Swiper
                showsButtons={false}
                autoplay={true}
                autoplayTimeout={10}
                showsPagination={false}
                style={styles.scroll}>
                {bannerUrl
                  .slice()
                  .reverse()
                  .map((value, index) => (
                    <TouchableOpacity key={index}>
                      <Image
                        source={{uri: value.imageUrl}}
                        style={styles.imgSlider}
                      />
                    </TouchableOpacity>
                  ))}
              </Swiper>
            </View> */}

            {/* {========================================TOP SERVIES COMPONENT========================================== } */}
            <View
              style={{
                paddingVertical: hp('3%'),
                // backgroundColor: Colors.lightGray,
                alignItems: 'center',
                justifyContent: 'center',
                // marginTop: 15,
              }}>
              <View
                style={{
                  width: wp('90%'),
                  borderRadius: hp('1%'),
                  backgroundColor: Colors.white,
                  paddingBottom: hp('2%'),
                  elevation: 5,
                }}>
                {/* <LinearGradient
                  start={{x: 0.0, y: 0.25}}
                  end={{x: 0.9, y: 1.0}}
                  // locations={[0, 0.8, 0.6]}
                  colors={['#5E2DC4', '#7A33C2', '#320F52']}
                  style={{
                    padding: hp('2%'),
                    alignItems: 'center',
                    borderTopLeftRadius: hp('1%'),
                    borderTopRightRadius: hp('1%'),
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: hp('2%'),
                    }}>
                    India's Safest At Home Beauty Services
                  </Text>
                </LinearGradient> */}
                {/* <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <BeautyServices
                    title="Classic Mani & Pedi"
                    image={require('../../Assets/Images/hairdressing2.png')}
                    // onPress={() => props.navigation.navigate('Manicure', props)}
                  />
                  <BeautyServices
                    onPress={() => {
                      // props.navigation.navigate('Bleach', props);
                    }}
                    title="Clean up + Bleach"
                    image={require('../../Assets/Images/Massage1.png')}
                  />
                </View> */}
                {/* <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    paddingBottom: hp('1%'),
                  }}>
                  <BeautyServices
                    title="Chocolate Wax"
                    image={require('../../Assets/Images/Massage3.png')}
                    // onPress={() => {
                    //   props.navigation.navigate('Chocolatewax', props);
                    // }}
                  />
                  <BeautyServices
                    title="Skin Brightening"
                    image={require('../../Assets/Images/Massage4.png')}
                    // onPress={() => {
                    //   props.navigation.navigate('CSleanup', props);
                    // }}
                </View> */}
                {/* {byb api servixces ==========} */}
                <FlatList
                  // style={{justifyContent: 'space-between'}}
                  // style={{padding: 10}}
                  data={topServices}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={2} // Set the number of columns
                  renderItem={({item}) => (
                    console.log('item of top services--->', item._id),
                    (
                      <BeautyServices
                        title={item._id.name}
                        image={item._id.imageUrl}
                        // selected={item === selectedItem}
                        selected={item._id._id === selectedItem?._id._id}
                        onPress={() => handleItemPress(item)} // Pass a 'selected' prop based on the selected item
                      />
                    )
                  )}
                />

                {/* {byb api servixces ==========} */}
                <TouchableOpacity
                  style={{
                    paddingHorizontal: wp('15%'),
                    borderRadius: hp('3%'),
                    padding: hp('1%'),
                    backgroundColor: Colors.lightGreen,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={bookTopservices}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: hp('2%'),
                      color: Colors.white,
                    }}>
                    Book Now
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* {========================================TOP SERVIES COMPONENT========================================== } */}

            {/* {========================================SERVICE FOR MEN ONLY  COMPONENT========================================== } */}
            <View
              style={{
                // backgroundColor: 'red',
                // width: wp('90%'),
                // alignSelf: 'center',
                paddingVertical: 10,
                borderTopWidth: 7,
                borderTopColor: Colors.grayShade,
                marginTop: 12,
                // marginHorizontal: 10,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 18,
                  fontWeight: '500',
                  marginHorizontal: 15,
                  marginBottom: 10,
                }}>
                Services For Mens
              </Text>
              {/* {====================================================1ST ROWS================================================} */}

              <FlatList
                horizontal={true} // Set to true for horizontal scrolling
                // data={dealOfTheDayData}
                data={data.slice(0, Math.ceil(data.length / 2))}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  console.log(
                    'I#####tem of deal of the dealOfTheDayData--->',
                    item.id,
                  ),
                  (
                    <View
                      style={{
                        // height: 200,
                        marginHorizontal: 10,
                        // width: '70%',
                        // height: wp('48%'),
                        // borderRadius: 10,
                        // borderWidth: 1.5,
                        // borderColor: 'grey',
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={{uri: item?.imageUrl}}
                          style={{
                            width: wp('36%'),
                            height: wp('22%'),
                            borderRadius: 10,
                            backgroundColor: 'red',
                          }}
                        />
                        <Text
                          style={{
                            fontSize: hp('1.7%'),
                            fontWeight: 'bold',
                            marginTop: hp('1%'),
                            color: 'black',
                          }}>
                          {item?.name}
                        </Text>
                      </View>
                    </View>
                  )
                )}
              />
              {/* {====================================================2ND ROWS================================================} */}
              <FlatList
                horizontal={true}
                data={data.slice(Math.ceil(data.length / 2))}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  console.log(
                    'I#####tem of deal of the dealOfTheDayData--->',
                    item.id,
                  ),
                  (
                    <View
                      style={{
                        // height: 200,
                        marginHorizontal: 10,
                        // width: '70%',
                        // height: wp('48%'),
                        // borderRadius: 10,
                        // borderWidth: 1.5,
                        // borderColor: 'grey',
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={{uri: item?.imageUrl}}
                          style={{
                            width: wp('36%'),
                            height: wp('22%'),
                            borderRadius: 10,
                            backgroundColor: 'red',
                          }}
                        />
                        <Text
                          style={{
                            fontSize: hp('1.7%'),
                            fontWeight: 'bold',
                            marginTop: hp('1%'),
                            color: 'black',
                          }}>
                          {item?.name}
                        </Text>
                      </View>
                    </View>
                  )
                )}
              />
            </View>
            {/* {=======================================SERVICE FOR MEN ONLY  COMPONENT========================================== } */}

            {/* {========================================###SERVICE FOR WOMEN ONLY  COMPONENT####========================================= } */}
            <View
              style={{
                // backgroundColor: 'red',
                // width: wp('90%'),
                // alignSelf: 'center',
                paddingVertical: 10,
                borderTopWidth: 7,
                borderTopColor: Colors.grayShade,
                marginTop: 12,
                // marginHorizontal: 10,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 18,
                  fontWeight: '500',
                  marginHorizontal: 15,
                  marginBottom: 10,
                }}>
                Services For Women Only
              </Text>
              {/* {====================================================1ST ROWS================================================} */}

              <FlatList
                horizontal={true} // Set to true for horizontal scrolling
                // data={dealOfTheDayData}
                data={data.slice(0, Math.ceil(data.length / 2))}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  console.log(
                    'I#####tem of deal of the dealOfTheDayData--->',
                    item.id,
                  ),
                  (
                    <View
                      style={{
                        // height: 200,
                        marginHorizontal: 10,
                        // width: '70%',
                        // height: wp('48%'),
                        // borderRadius: 10,
                        // borderWidth: 1.5,
                        // borderColor: 'grey',
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={{uri: item?.imageUrl}}
                          style={{
                            width: wp('36%'),
                            height: wp('22%'),
                            borderRadius: 10,
                            backgroundColor: 'red',
                          }}
                        />
                        <Text
                          style={{
                            fontSize: hp('1.7%'),
                            fontWeight: 'bold',
                            marginTop: hp('1%'),
                            color: 'black',
                          }}>
                          {item?.name}
                        </Text>
                      </View>
                    </View>
                  )
                )}
              />
              {/* {====================================================2ND ROWS================================================} */}
              <FlatList
                horizontal={true}
                data={data.slice(Math.ceil(data.length / 2))}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  console.log(
                    'I#####tem of deal of the dealOfTheDayData--->',
                    item.id,
                  ),
                  (
                    <View
                      style={{
                        // height: 200,
                        marginHorizontal: 10,
                        // width: '70%',
                        // height: wp('48%'),
                        // borderRadius: 10,
                        // borderWidth: 1.5,
                        // borderColor: 'grey',
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={{uri: item?.imageUrl}}
                          style={{
                            width: wp('36%'),
                            height: wp('22%'),
                            borderRadius: 10,
                            backgroundColor: 'red',
                          }}
                        />
                        <Text
                          style={{
                            fontSize: hp('1.7%'),
                            fontWeight: 'bold',
                            marginTop: hp('1%'),
                            color: 'black',
                          }}>
                          {item?.name}
                        </Text>
                      </View>
                    </View>
                  )
                )}
              />
            </View>
            {/* {=======================================##SERVICE FOR WOMEN ONLY  COMPONENT##========================================== } */}

            {/* {========================================DETAL OF THE  COMPONENT========================================== } */}
            <View
              style={{
                // backgroundColor: 'red',
                // width: wp('90%'),
                // alignSelf: 'center',
                paddingVertical: 10,
                borderTopWidth: 7,
                borderTopColor: Colors.grayShade,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 18,
                  fontWeight: '500',
                  marginHorizontal: 15,
                  marginBottom: 10,
                }}>
                DEAL OF THE DAY
              </Text>
              <FlatList
                horizontal={true} // Set to true for horizontal scrolling
                data={dealOfTheDayData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  console.log(
                    'I#####tem of deal of the dealOfTheDayData--->',
                    item.id,
                  ),
                  (
                    <View
                      style={{
                        // height: 200,
                        marginHorizontal: 10,
                        // width: '70%',
                        height: wp('48%'),
                        borderRadius: 10,
                        borderWidth: 1.5,
                        borderColor: 'grey',
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={{uri: item.imageUrl}}
                          style={{
                            width: wp('35%'),
                            height: wp('32%'),
                            borderRadius: 10,
                          }}
                        />
                        <Text
                          style={{
                            fontSize: hp('1.7%'),
                            fontWeight: 'bold',
                            marginTop: hp('1%'),
                            color: 'black',
                          }}>
                          {item.name}
                        </Text>
                      </View>
                    </View>
                  )
                )}
              />
            </View>
            {/* {========================================DETAL OF THE  COMPONENT========================================== } */}

            {/* <View style={{backgroundColor: 'red', height: hp('20  %')}}> */}

            {/* {=================================SPA & MASSAG FOR WOMEN POSTER============================} */}
            <View
              style={{
                width: '100%',
                height: 280,
                // backgroundColor: '#000',
                paddingHorizontal: 15,
                marginVertical: 20,
              }}>
              <View
                style={{
                  height: '100%',
                  width: '100%',
                  backgroundColor: '#000',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#fff'}}>POSTER</Text>
              </View>
            </View>
            {/* {=================================SPA & MASSAG FOR WOMEN POSTER============================} */}

            {/* {=======================================PROFESSIONAL CLEAING SERVICE  COMPONENT##  COMPONENT####========================================= } */}
            <View
              style={{
                // backgroundColor: 'red',
                // width: wp('90%'),
                // alignSelf: 'center',
                paddingVertical: 10,
                borderTopWidth: 7,
                borderTopColor: Colors.grayShade,
                marginTop: 12,
                // marginHorizontal: 10,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 18,
                  fontWeight: '500',
                  marginHorizontal: 15,
                  marginBottom: 10,
                }}>
                Professional Cleaning Services
              </Text>
              {/* {====================================================1ST ROWS================================================} */}

              <FlatList
                horizontal={true} // Set to true for horizontal scrolling
                // data={dealOfTheDayData}
                data={data.slice(0, Math.ceil(data.length / 2))}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  console.log(
                    'I#####tem of deal of the dealOfTheDayData--->',
                    item.id,
                  ),
                  (
                    <View
                      style={{
                        // height: 200,
                        marginHorizontal: 10,
                        // width: '70%',
                        // height: wp('48%'),
                        // borderRadius: 10,
                        // borderWidth: 1.5,
                        // borderColor: 'grey',
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={{uri: item?.imageUrl}}
                          style={{
                            width: wp('45%'),
                            height: wp('25%'),
                            borderRadius: 10,
                            backgroundColor: 'red',
                          }}
                        />
                        <Text
                          style={{
                            fontSize: hp('1.7%'),
                            fontWeight: 'bold',
                            marginTop: hp('1%'),
                            color: 'black',
                          }}>
                          {item?.name}
                        </Text>
                      </View>
                    </View>
                  )
                )}
              />
              {/* {====================================================2ND ROWS================================================} */}
              <FlatList
                horizontal={true}
                data={data.slice(Math.ceil(data.length / 2))}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  console.log(
                    'I#####tem of deal of the dealOfTheDayData--->',
                    item.id,
                  ),
                  (
                    <View
                      style={{
                        // height: 200,
                        marginHorizontal: 10,
                        // width: '70%',
                        // height: wp('48%'),
                        // borderRadius: 10,
                        // borderWidth: 1.5,
                        // borderColor: 'grey',
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={{uri: item?.imageUrl}}
                          style={{
                            width: wp('45%'),
                            height: wp('25%'),
                            borderRadius: 10,
                            backgroundColor: 'red',
                          }}
                        />
                        <Text
                          style={{
                            fontSize: hp('1.7%'),
                            fontWeight: 'bold',
                            marginTop: hp('1%'),
                            color: 'black',
                          }}>
                          {item?.name}
                        </Text>
                      </View>
                    </View>
                  )
                )}
              />
            </View>
            {/* {=======================================PROFESSIONAL CLEAING SERVICE  COMPONENT##========================================== } */}
            {/* {========================================THERAPIES FOR MEN ONLY========================================== } */}
            <View
              style={{
                // backgroundColor: 'red',
                // width: wp('90%'),
                // alignSelf: 'center',
                paddingVertical: 10,
                borderTopWidth: 7,
                borderTopColor: Colors.grayShade,
                marginTop: 12,
                // marginHorizontal: 10,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 18,
                  fontWeight: '500',
                  marginHorizontal: 15,
                  marginBottom: 10,
                }}>
                Theapies For Men Only
              </Text>
              {/* {====================================================1ST ROWS================================================} */}
              <FlatList
                horizontal={true} // Set to true for horizontal scrolling
                // data={dealOfTheDayData}
                data={data}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  console.log(
                    'I#####tem of deal of the dealOfTheDayData--->',
                    item.id,
                  ),
                  (
                    <View
                      style={{
                        // height: 200,
                        marginHorizontal: 8,
                        // width: '70%',
                        // height: wp('48%'),
                        // borderRadius: 10,
                        // borderWidth: 1.5,
                        // borderColor: 'grey',
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={{uri: item?.imageUrl}}
                          style={{
                            width: wp('36%'),
                            height: wp('48%'),
                            // borderRadius: 10,
                            backgroundColor: 'red',
                          }}
                        />
                        <Text
                          style={{
                            fontSize: hp('1.7%'),
                            fontWeight: 'bold',
                            marginTop: hp('1%'),
                            color: 'black',
                          }}>
                          kkrkrkk
                          {item?.name}
                        </Text>
                      </View>
                    </View>
                  )
                )}
              />
            </View>
            {/* {=================================BANNERS=======================================================} */}

            <View
              style={{
                borderTopWidth: 7,
                borderTopColor: Colors.grayShade,
              }}>
              <Swiper
                showsButtons={false}
                autoplay={true}
                autoplayTimeout={10}
                showsPagination={false}
                style={{
                  backgroundColor: '#fff',
                  height: hp('25%'),
                  borderRadius: 20,
                  resizeMode: 'cover',
                  paddingTop: 20,
                }}>
                {bannerUrl.map((value, index) => (
                  <TouchableOpacity key={index}>
                    <Image
                      source={{uri: value.imageUrl}}
                      style={{
                        alignSelf: 'center',
                        borderWidth: 2,
                        borderColor: Colors.white,
                        borderRadius: 10,
                        width: '95%',
                        height: '90%',
                        resizeMode: 'contain',
                      }}
                    />
                  </TouchableOpacity>
                ))}
              </Swiper>
            </View>

            {/* {=================================BANNERS=======================================================} */}

            {/* {=======================================THERAPIES FOR MEN ONLY  COMPONENT========================================== } */}
            <View
              style={{
                height: 300,
                justifyContent: 'center',
                alignItems: 'center',
                borderTopColor: Colors.grayShade,
                borderTopWidth: 7,
                // backgroundColor: '#000',
                marginTop: 10,
              }}>
              <View
                style={{
                  height: 200,
                  width: 200,
                  borderRadius: 100,
                  // backgroundColor: '#fff',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: Colors.purple,
                  borderWidth: 2,
                }}>
                <TouchableOpacity onPress={GotoExclusiveOffer}>
                  <Text
                    numberOfLines={10}
                    style={{
                      color: Colors.purple,
                      fontSize: 20,
                    }}>
                    EXCLUSIV OFFERS
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      )}
      <InternetInfoall />
    </SafeAreaView>
  );
}

export default Home;
const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: '#fff',
  },
  header: {
    width: wp('100%'),
    height: hp('4%'),
    flexDirection: 'row',
    padding: wp('1%'),
  },
  scroll: {
    backgroundColor: '#fff',
    height: hp('25%'),
    borderRadius: 20,
    resizeMode: 'cover',
  },
  imgSlider: {
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: 10,
    width: '95%',
    height: '90%',
    // marginVertical: 3,
    // resizeMode:'stretch'
    resizeMode: 'contain',
  },
});
