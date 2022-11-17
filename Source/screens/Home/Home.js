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

// import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Swiper from 'react-native-swiper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const Home = ({navigation}) => {
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    homescreen();
  }, []);

  const homescreen = () => {
    axios
      .get('https://all-in-one-app-sa.herokuapp.com/category/allCategory', {
        headers: {Authorization: ''},
      })
      .then(resp => {
        setCategory(resp.data.category);
        setIsLoading(false);
      })
      .catch(e => {
        console.log('in catch');
        console.log(e);
        setIsLoading(false);
      });
  };

  console.log('hello===================================', category);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderDrawer
        Title="ALL IN ONE"
        location="Sector 62"
        onPress={() => navigation.toggleDrawer()}
        // onPress={() => navigation.toggleDrawer()}
        // onPress={() => console.log('hey===================')}
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
            />
          </View>
          <ScrollView style={styles.mainScroll}>
            <View>
              <Swiper
                showsButtons={false}
                autoplay={true}
                autoplayTimeout={4}
                showsPagination={false}
                style={styles.scroll}>
                <Image
                  source={require('../../Assets/Images/banner1.png')}
                  style={styles.imgSlider}
                />
                <Image
                  source={require('../../Assets/Images/banner2.png')}
                  style={styles.imgSlider}
                />
                <Image
                  source={require('../../Assets/Images/banner3.png')}
                  style={styles.imgSlider}
                />
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
                {category.map((val, index) => (
                  // console.log('Category=====111111111111111=======', val),
                  <View key={index} style={{alignItems: 'center'}}>
                    <ServicesComp
                      title={val.name}
                      image={require('../../Assets/Images/facial-treatmenticone66.png')}
                      newStyle
                      onPress={() => {
                        navigation.navigate('ServicesofWomenOnly', val);
                      }}
                    />
                  </View>

                  //   <ServicesComp
                  //   title="Home Appliances"
                  //   image={require('../../Assets/Images/vehiclesicone.png')}
                  //   onPress={() =>
                  // props.navigation.navigate('HomeAppliancesRepairing');

                  //
                  //   }
                  // />
                ))}
              </View>

              {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                top: -10,
              }}>
              <ServicesComp
                title="AC Services"
                image={require('../../Assets/Images/serviceicone.png')}
                onPress={() => props.navigation.navigate('ACServices')}
              />
              <ServicesComp
                title="Cleaning"
                image={require('../../Assets/Images/householdicone.png')}
                onPress={() =>
                  props.navigation.navigate('ProfessionalCleaningServices')
                }
              />
              <ServicesComp
                title="Electricians"
                image={require('../../Assets/Images/electricianicone.png')}
                onPress={() => props.navigation.navigate('Electricians')}
              />
            </View> */}
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
                  // locations={[0, 0.8, 0.6]}
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
                    onPress={() => props.navigation.navigate('Manicure', props)}
                  />
                  <BeautyServices
                    onPress={() => {
                      props.navigation.navigate('Bleach', props);
                    }}
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
                    onPress={() => {
                      props.navigation.navigate('Chocolatewax', props);
                    }}
                  />
                  <BeautyServices
                    title="Skin Brightening"
                    image={require('../../Assets/Images/Massage4.png')}
                    onPress={() => {
                      props.navigation.navigate('Cleanup', props);
                    }}
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
                  onPress={() => props.navigation.navigate('SalonWomen')}>
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
            <TouchableOpacity
              onPress={() => props.navigation.navigate('SGPservices')}>
              <Image
                source={require('../../Assets/Images/hairdressing2.png')}
                style={{
                  width: wp('100%'),
                  height: wp('40%'),
                  marginBottom: 120,
                }}
              />
            </TouchableOpacity>
            {/* <TabNavigationCall />  */}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

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
    // marginHorizontal: wp('3%'),
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: Colors.white,
    borderRadius: 10,
    width: '100%',
    height: hp('25%'),
    // height: 150,
  },
});
