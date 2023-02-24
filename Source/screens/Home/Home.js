import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../../Assets/Constants/Colors';
import HeaderDrawer from '../../ReusableComponents/HeaderDrawer';
import ServicesComp from './Component/ServicesComp';
import BeautyServices from './Component/BeautyServices';
import axios from 'axios';
import Swiper from 'react-native-swiper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {BASE_URL} from '../../Assets/utils/Restapi/Config';
import {_getStorage} from '../../Assets/utils/storage/Storage';

function Home({navigation}) {
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bannerUrl, setBannerUrl] = useState([]);
  const [searchText, setSearchText] = useState('');

  // console.log('hey-----------------', category);

  useEffect(() => {
    getAllCategory();
    _getBanner();
  }, []);

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
    // console.log('home id', id);
    // console.log('name', name);

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
    console.log('token', token);
    axios
      .get(BASE_URL + `/banner`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        // console.log('banner response', res.data);
        setBannerUrl(res.data.banner);
      })
      .catch(error => {
        console.log('banner catch error', error);
      });
  };

  const filteredData = category.filter(item => {
    return item.name.toLowerCase().includes(searchText.toLowerCase());
  });
  console.log('filteredData', filteredData);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.darkGreen} barStyle={Colors.white} />

      <HeaderDrawer
        Title="ALL IN ONE"
        location="Sector 62"
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

            <View
              style={{
                paddingVertical: hp('3%'),

                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: wp('90%'),
                  borderRadius: hp('3%'),
                  backgroundColor: Colors.white,
                  paddingBottom: hp('2%'),
                  elevation: 10,
                }}>
                <LinearGradient
                  start={{x: 0.0, y: 0.25}}
                  end={{x: 0.9, y: 1.0}}
                  colors={[
                    Colors.lightOrange,
                    Colors.lightOrange,
                    Colors.lightGreen,
                  ]}
                  style={{
                    padding: hp('3%'),
                    alignItems: 'center',
                    borderTopLeftRadius: hp('3%'),
                    borderTopRightRadius: hp('3%'),
                  }}>
                  <Text
                    style={{
                      color: Colors.white,
                      fontWeight: 'bold',
                      fontSize: hp('2.4%'),
                    }}>
                    India's Safest At Home Beauty Services
                  </Text>
                </LinearGradient>
                <View
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
                    // onPress={() => {
                    //   // props.navigation.navigate('Bleach', props);
                    // }}
                    title="Clean up + Bleach"
                    image={require('../../Assets/Images/Massage1.png')}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    paddingBottom: hp('2%'),
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
                    //   props.navigation.navigate('Cleanup', props);
                    // }}
                  />
                </View>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    paddingHorizontal: wp('15%'),
                    borderRadius: hp('3%'),
                    padding: hp('1%'),
                    backgroundColor: Colors.lightGreen,
                    alignSelf: 'center',
                  }}
                  // onPress={() => props.navigation.navigate('SalonWomen')}
                >
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
            <TouchableOpacity>
              <Image
                source={require('../../Assets/Images/hairdressing2.png')}
                style={{
                  width: wp('100%'),
                  height: wp('40%'),
                }}
              />
            </TouchableOpacity>
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
    paddingVertical: hp('3%'),
    backgroundColor: Colors.white,
    height: hp('30%'),
    top: -25,
    borderRadius: 20,
  },
  imgSlider: {
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: Colors.white,
    borderRadius: 10,
    width: '100%',
    height: hp('25%'),
  },
});
