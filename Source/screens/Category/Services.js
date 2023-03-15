import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const {width, height} = Dimensions.get('window');
import Colors from '../../Assets/Constants/Colors';
import Header from '../../ReusableComponents/Header';
import GreenHeader from '../../ReusableComponents/GreenHeader';
// import AddCart from '../../ReusableComponents/AddCart';
import Reusablecss from '../../Assets/Css/Reusablecss';
// import CustomButton from '../../ReusableComponents/Button';
import {_getStorage} from '../../Assets/utils/storage/Storage';
import {BASE_URL} from '../../Assets/utils/Restapi/Config';
import {BottomSheet} from 'react-native-btr';
import Toast from 'react-native-simple-toast';

const Services = props => {
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [serId, setSerID] = useState('');
  const [serviceID, setServiceID] = useState('');
  const [silverID, setSilverID] = useState('');
  const [goldID, setgoldID] = useState('');
  const [platinumID, setPlatinumID] = useState('');
  const [catname, setCatname] = useState('');

  // const [service, setService] = useState([]);

  // const [services, setServices] = useState('');
  const [getname, setGetname] = useState('');
  const [silver, setSilver] = useState('');
  const [platinum, setPlatinum] = useState('');
  const [getallservices, setGetallservices] = useState([]);
  const preData = props.route.params;

  // console.log('preData----------service', preData);

  const toggleBottomNavigationView = id => {
    setVisible(!visible);
    setSerID(id);
    // getPackagesByServiceId(id);
  };

  useEffect(() => {
    getServices();
    if (serId) {
      getPackagesByServiceId();
    }
  }, [serId]);

  const getServices = () => {
    let from = preData.navData.from;
    // console.log('from=---------', from);
    switch (from) {
      case 'cat':
        getService1();
        break;
      case 'sub_cat':
        getService2();
        break;
      case 'sub_cat_2':
        getService3();
        break;
      default:
        break;
    }
  };

  const getService1 = async () => {
    const token = await _getStorage('token');
    axios
      .get(BASE_URL + `/category/categoryData/${preData.navData.id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        setGetallservices(response.data.result.service);
        console.log('getService1-->>>', response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('getService1 error-->>', error.response.data);
        setIsLoading(false);
      });
  };

  const getService2 = async () => {
    const token = await _getStorage('token');

    axios
      .get(BASE_URL + `/category/subcategoryService/${preData.navData.id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        setGetallservices(response.data.result.service);
        console.log('getService2-->>>', response.data.result.service);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('getService2 error-->>', error.response.data);
        setIsLoading(false);
      });
  };

  const getService3 = async () => {
    const token = await _getStorage('token');
    axios
      .get(BASE_URL + `/category/subcategory2Service/${preData.navData.id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        setGetallservices(response.data.result);
        console.log('getService3-->>>', response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('getService3 error-->>', error.response.data.message);
        setIsLoading(false);
      });
  };

  const getPackagesByServiceId = async () => {
    const token = await _getStorage('token');
    axios
      .get(BASE_URL + `/category/service/${serId}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log('getPackagesByServiceId', res.data);
        setServiceID(res.data.service._id);
        setGetname(res.data.service.gold);
        setSilver(res.data.service.silver);
        setSilverID(res.data.service.silver._id);
        setgoldID(res.data.service.gold._id);
        setPlatinumID(res.data.service.platinum._id);
        setPlatinum(res.data.service.platinum);
        setCatname(res.data.category);
      })
      .catch(error => {
        console.log(
          'catch error getPackagesByServiceId---->>',
          error.response.data.message,
        );
      });
  };

  // console.log('catname', catname);

  // const get_mycart = async () => {
  //   const token = await _getStorage('token');

  //   axios
  //     .get(BASE_URL + `/cart`, {
  //       headers: {Authorization: `Bearer ${token}`},
  //     })
  //     .then(res => {
  //       console.log('get my cart----------->>', res.data.newResult);
  //     })
  //     .catch(error => {
  //       console.log('my cart catch error-------------->>', error.response.data);
  //     });
  // };

  const cardSilver = async () => {
    const token = await _getStorage('token');
    console.log('token---------->>', token);
    console.log(serviceID, silverID);
    let objID = {
      serviceId: serviceID,
      packageId: silverID,
      category: catname,
    };
    console.log('objID', objID);
    axios
      .post(BASE_URL + `/cart/silver`, objID, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(rep => {
        console.log('Silver-----', rep.data);
        if (rep.data) {
          props.navigation.navigate('MyCartScreen');
          // get_mycart();
        }
        Toast.showWithGravity(rep.data.message, Toast.LONG, Toast.BOTTOM);
      })
      .catch(error => {
        console.log('Silver catch error', error.response.data.message);
        Toast.showWithGravity(
          error.response.data.message,
          Toast.LONG,
          Toast.BOTTOM,
        );
      });
  };

  const cardGold = async () => {
    const token = await _getStorage('token');
    console.log('token---------->>', token);
    console.log(serviceID, silverID);
    let objID = {
      serviceId: serviceID,
      packageId: goldID,
      category: catname,
    };
    console.log('objID', objID);
    axios
      .post(BASE_URL + `/cart/gold`, objID, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(rep => {
        console.log('gold-----', rep.data);
        if (rep.data) {
          props.navigation.navigate('MyCartScreen');
          // get_mycart();
        }
        Toast.showWithGravity(rep.data.message, Toast.LONG, Toast.BOTTOM);
      })
      .catch(error => {
        console.log('gold catch error', error.response.data.message);
        Toast.showWithGravity(
          error.response.data.message,
          Toast.LONG,
          Toast.BOTTOM,
        );
      });
  };

  const cardPlatinum = async () => {
    const token = await _getStorage('token');
    console.log('token---------->>', token);
    console.log(serviceID, silverID);
    let objID = {
      serviceId: serviceID,
      packageId: platinumID,
      category: catname,
    };
    console.log('objID', objID);
    axios
      .post(BASE_URL + `/cart/platinum`, objID, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(rep => {
        console.log('Platinum-----', rep.data);
        if (rep.data) {
          props.navigation.navigate('MyCartScreen');
          // get_mycart();
        }
        Toast.showWithGravity(rep.data.message, Toast.LONG, Toast.BOTTOM);
      })
      .catch(error => {
        console.log('Platinum catch error', error.response.data.message);
        Toast.showWithGravity(
          error.response.data.message,
          Toast.LONG,
          Toast.BOTTOM,
        );
      });
  };

  return (
    <View style={Reusablecss.container}>
      <Header
        bgColor={Colors.darkOrange}
        color={Colors.black}
        title={preData.navData.name}
        onPress={() => props.navigation.goBack('')}
      />
      {isLoading === true ? (
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
          <GreenHeader title="Sanitised tool, single-use products & sachets " />
          <View style={Reusablecss.cntrContainer}>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              data={getallservices}
              renderItem={({item}) => (
                <View style={Reusablecss.card}>
                  <View style={Reusablecss.cardItem}>
                    <Text style={Reusablecss.title}>{item.name}</Text>
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
                      <Text style={Reusablecss.img}>INR</Text>

                      <Text style={Reusablecss.priceBar}>{item.price}</Text>
                      <Text style={Reusablecss.timing}>{item.time}</Text>
                    </View>
                    <Text style={{top: -5, color: Colors.black}}>
                      .........................................................
                    </Text>
                    <View style={Reusablecss.dataCntr}>
                      <Image
                        source={require('../../Assets/Images/Ellipse1.png')}
                      />
                      <Text style={Reusablecss.data}>{item.description}</Text>
                    </View>

                    <View style={Reusablecss.dataCntr}>
                      <Image
                        source={require('../../Assets/Images/Ellipse1.png')}
                        // style={{opacity: item.d2 === undefined ? 0 : 1}}
                      />
                      <Text style={Reusablecss.data}>{item.description}</Text>
                    </View>
                  </View>
                  <View style={Reusablecss.imgCntr}>
                    <Image
                      resizeMode="contain"
                      source={{uri: item.imageUrl}}
                      style={Reusablecss.innerImage}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        toggleBottomNavigationView(item._id);
                        // setSerID(item._id);
                      }}
                      style={Reusablecss.imgButton}>
                      <Text style={Reusablecss.btnText}>ADD +</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
          {/* <AddCart items={2} /> */}
        </View>
      )}

      <BottomSheet
        visible={visible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}>
        <View style={Styles.bottomNavigationView}>
          <View>
            <Text
              style={{
                color: Colors.black,
                fontSize: 17,
                margin: 10,
                paddingHorizontal: 15,
                fontWeight: '800',
              }}>
              Choose a service plan
            </Text>
            <ScrollView contentContainerStyle={{paddingBottom: 50}}>
              <View
                style={{
                  marginHorizontal: 10,
                  marginVertical: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    backgroundColor: Colors.silver,
                    height: 70,
                    width: 70,
                    borderRadius: 50,
                  }}></View>
                <View style={{marginRight: '10%'}}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: Colors.black,
                    }}>
                    Silver services
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={require('../../Assets/Images/Ellipse1.png')}
                      style={{marginVertical: 10}}
                    />
                    <Text
                      style={{
                        marginHorizontal: 5,
                        top: 3,
                        color: Colors.black,
                      }}>
                      {/* Less experienced */}
                      {silver.description}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={require('../../Assets/Images/Ellipse1.png')}
                      style={{top: 4}}
                    />
                    <Text
                      style={{
                        marginHorizontal: 5,
                        top: -3,
                        color: Colors.black,
                      }}>
                      {/* Less Equiped */}
                      {silver.description}
                    </Text>
                  </View>
                  <Text
                    style={{
                      marginHorizontal: 5,
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: Colors.darkGray,
                    }}>
                    INR {silver.price}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('ServicesRatingsilver', {
                        serviceID,
                        silverID,
                      })
                    }
                    style={{}}>
                    <Text
                      style={{
                        marginHorizontal: 5,
                        fontSize: 15,
                        color: Colors.darkGray,
                        color: Colors.darkGreen,
                      }}>
                      View rating
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{top: 30}}>
                  <TouchableOpacity
                    onPress={cardSilver}
                    style={{
                      paddingVertical: 5,
                      paddingHorizontal: 7,
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: Colors.darkGreen,
                      elevation: 7,
                    }}>
                    <Text style={{color: Colors.white, fontWeight: '500'}}>
                      ADD +
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                <View
                  style={{
                    marginHorizontal: 10,
                    marginVertical: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      backgroundColor: Colors.lightgold,
                      height: 70,
                      width: 70,
                      borderRadius: 50,
                    }}></View>
                  <View style={{marginRight: '10%'}}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: Colors.black,
                      }}>
                      Gold services
                      {/* {getname.price} */}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={require('../../Assets/Images/Ellipse1.png')}
                        style={{marginVertical: 10}}
                      />
                      <Text
                        style={{
                          marginHorizontal: 5,
                          top: 3,
                          color: Colors.black,
                        }}>
                        {/* Less experienced */}
                        {getname.description}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={require('../../Assets/Images/Ellipse1.png')}
                        style={{top: 4}}
                      />
                      <Text
                        style={{
                          marginHorizontal: 5,
                          top: -3,
                          color: Colors.black,
                        }}>
                        {/* Less Equiped */}
                        {getname.description}
                      </Text>
                    </View>
                    <Text
                      style={{
                        marginHorizontal: 5,
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: Colors.darkGray,
                      }}>
                      INR {getname.price}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate('ServicesRatingsilvergold', {
                          serviceID,
                          goldID,
                        })
                      }
                      style={{}}>
                      <Text
                        style={{
                          marginHorizontal: 5,
                          fontSize: 15,
                          color: Colors.darkGray,
                          color: Colors.darkGreen,
                        }}>
                        View rating
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{top: 30}}>
                    <TouchableOpacity
                      onPress={cardGold}
                      style={{
                        paddingVertical: 5,
                        paddingHorizontal: 7,
                        borderRadius: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: Colors.darkGreen,
                        elevation: 7,
                      }}>
                      <Text style={{color: Colors.white, fontWeight: '500'}}>
                        ADD +
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View>
                <View
                  style={{
                    marginHorizontal: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      backgroundColor: Colors.lightblue,
                      height: 70,
                      width: 70,
                      borderRadius: 50,
                    }}></View>
                  <View style={{}}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: Colors.black,
                      }}>
                      Platinum services
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={require('../../Assets/Images/Ellipse1.png')}
                        style={{marginVertical: 10}}
                      />
                      <Text
                        style={{
                          marginHorizontal: 5,
                          top: 3,
                          color: Colors.black,
                        }}>
                        {/* Less experienced */}
                        {platinum.description}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={require('../../Assets/Images/Ellipse1.png')}
                        style={{top: 4}}
                      />
                      <Text
                        style={{
                          marginHorizontal: 5,
                          top: -3,
                          color: Colors.black,
                        }}>
                        {/* Less Equiped */}
                        {platinum.description}
                      </Text>
                    </View>
                    <Text
                      style={{
                        marginHorizontal: 5,
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: Colors.darkGray,
                      }}>
                      INR {platinum.price}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate('ServicesRatingplatinum', {
                          serviceID,
                          platinumID,
                        })
                      }
                      style={{}}>
                      <Text
                        style={{
                          marginHorizontal: 5,
                          fontSize: 15,
                          color: Colors.darkGray,
                          color: Colors.darkGreen,
                        }}>
                        View rating
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{top: 30}}>
                    <TouchableOpacity
                      onPress={cardPlatinum}
                      style={{
                        paddingVertical: 5,
                        paddingHorizontal: 7,
                        borderRadius: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: Colors.darkGreen,
                        elevation: 7,
                      }}>
                      <Text style={{color: Colors.white, fontWeight: '500'}}>
                        ADD +
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {/* <View style={{alignItems: 'center', top: '1%'}}>
                <CustomButton
                  title={'Next'}
                  bgColor={Colors.darkGreen}
                  width={wp('90%')}
                  height={hp('7%')}
                  color={Colors.white}
                  onPress={() => props.navigation.navigate('AddSalonforwomen')}
                  // onPress={onPressotpVerification}
                />
              </View> */}
            </ScrollView>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default Services;

const Styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    width: width,
    height: height,
    bottom: '-12%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: 'white',
    width: width,
    height: height / 1.4,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: '50%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
