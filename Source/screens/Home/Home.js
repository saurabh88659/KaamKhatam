import React, {useEffect, useState} from 'react';
import {  View, SafeAreaView, StyleSheet, Text,
  ScrollView, TouchableOpacity,
  TextInput,Image,  ActivityIndicator,
  StatusBar,Dimensions,
  RefreshControl,
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
import {useIsFocused} from '@react-navigation/native';

const API_KEY = 'AIzaSyD3Uol_-mBQSaZgIfuzVVK1oHXqBHPkrZE';
const {height, width} = Dimensions.get('window');

function Home({navigation}) {
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bannerUrl, setBannerUrl] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [state, setState] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [refresh, setRfresh] = useState(false);
  const isFocused = useIsFocused();


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
    if (isFocused) {
      getAllCategory();
      _getBanner();
      geoCoding();
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
        // console.log('banner response', res?.data?.banner);
        setBannerUrl(res?.data?.banner);
      })
      .catch(error => {
        console.log('banner catch error', error);
      });
  };

  const filteredData = category.filter(item => {
    return item.name.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.darkGreen} barStyle={Colors.white} />

      <HeaderDrawer
        Title="ALL IN ONE"
        // location={''}
        onPress={() => navigation.openDrawer()}
      />
      {isLoading ? (
        <View
          style={{
            minHeight: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color={Colors.darkOrange} size="large" />
        </View>
      ) : (
        <View>
          <Text
            style={{
              color: Colors.white,
              textAlign: 'center',
              backgroundColor: Colors.darkGreen,
              fontWeight: '500',
              paddingHorizontal: 10,
            }}>
            {state}
          </Text>
          <View
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
            />
          </View>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={geoCoding} />
            }
            contentContainerStyle={{paddingBottom: '55%'}}
            showsVerticalScrollIndicator={false}>
            <View>
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
            </View>

            <View
              style={{
                backgroundColor: Colors.white,
                shadowColor: '#000',
                shadowOffset: {width: 1, height: 1},
                shadowOpacity: 0.4,
                shadowRadius: 3,
                elevation: 5,
                top: -25,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}>
                {filteredData.map((val, index) => (
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
            </View>
            </ScrollView>
        </View>
      )}
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
    height: hp('37%'),
    borderRadius: 20,
   
  },
  imgSlider: {
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: 10,
    width: '96%',
    height:'94%',
    marginVertical:3,  
    // resizeMode:'stretch'
    resizeMode:'contain'
  },
});
