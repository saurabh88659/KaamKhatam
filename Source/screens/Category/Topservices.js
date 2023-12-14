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
// import Reusablecss from '../../Assets/Css/Reusablecss';
// import CustomButton from '../../ReusableComponents/Button';
import {_getStorage} from '../../Assets/utils/storage/Storage';
import {BASE_URL} from '../../Assets/utils/Restapi/Config';
import {BottomSheet} from 'react-native-btr';
import Toast from 'react-native-simple-toast';
import {useNavigation} from '@react-navigation/native';

const Topservices = props => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
  // const allservices = props.route.params.item._id;
  const allservices = props.route.params?.Item;

  useEffect(() => {
    setGetallservices(allservices);
  }, []);

  console.log('###preData----------service', preData);
  console.log('getallservices----------service', getallservices);

  const toggleBottomNavigationView = id => {
    setVisible(!visible);
    setSerID(id);
    // getPackage  sByServiceId(id);
  };

  useEffect(() => {
    //   getServices();
    if (serId) {
      getPackagesByServiceId();
    }
  }, [serId]);

  const getServices = () => {
    // let from = preData.navData.from;
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

  const getPackagesByServiceId = async () => {
    const token = await _getStorage('token');
    axios
      .get(BASE_URL + `/category/service/${serId}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log('getPackagesByServiceId=============>>>>>', res.data);
        setServiceID(res.data.service?._id);
        setGetname(res.data.service?.gold);
        setSilver(res.data.service?.silver);
        setSilverID(res.data.service.silver?._id);
        setgoldID(res.data.service.gold?._id);
        setPlatinumID(res.data.service.platinum?._id);
        setPlatinum(res.data.service?.platinum);
        setCatname(res.data?.category);
      })
      .catch(error => {
        console.log(
          'catch error getPackagesByServiceId---->>',
          error.response.data.message,
        );
      });
  };

  console.log('catname===>', catname);

  const cardSilver = async () => {
    const token = await _getStorage('token');
    console.log('token---------->>', token);
    console.log(serviceID, silverID);
    let objID = {
      serviceId: serviceID,
      packageId: silverID,
      category: catname,
    };
    // let objID = {
    //   serviceId: allservices.silver._id,
    //   packageId: silverID,
    //   category: catname,
    // };
    console.log('objID', objID);
    axios
      .post(BASE_URL + `/cart/silver`, objID, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(rep => {
        console.log('Silver-----', rep.data);
        if (rep.data) {
          navigation.replace('MyCartScreen');
          // get_mycart();
        }
        Toast.showWithGravity(rep.data.message, Toast.LONG, Toast.BOTTOM);
      })
      .catch(error => {
        console.log('Silver catch error', error.response.data.message);
        Toast.showWithGravity(
          error.response.data.message,
          Toast.SHORT,
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
        console.log('------gold res.datas-----', rep.data);
        if (rep.data) {
          props.navigation.navigate('MyCartScreen');
          // get_mycart();
        }
        Toast.showWithGravity(rep.data.message, Toast.LONG, Toast.BOTTOM);
      })
      .catch(error => {
        console.log('===gold catch error=====>', error.response.data.message);
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
        bgColor={Colors.topNavbarColor}
        color={Colors.white}
        // title={preData.navData.name}
        onPress={() => navigation.goBack('')}
      />
      {isLoading === true ? (
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
          <View style={Reusablecss.cntrContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* {==========================================} */}
              <View style={Reusablecss.card}>
                <View style={Reusablecss.cardItem}>
                  <Text style={Reusablecss.title}>{allservices?.name}</Text>
                  {/* <View style={Reusablecss.ratingCntr}>
                    <FontAwesome5Icon
                      name="star"
                      solid
                      size={hp('2%')}
                      color={Colors.deepSafron}
                    />
                    <Text style={Reusablecss.ratingBar}>
                    </Text>
                  </View> */}

                  {/* <View style={Reusablecss.priceCntr}>
                      <Text style={Reusablecss.img}>INR</Text>

                      <Text style={Reusablecss.priceBar}>{item.price}</Text>
                      <Text style={Reusablecss.timing}>{item.time}</Text>
                    </View> */}
                  <Text style={{color: Colors.black}}>
                    .....................................................
                  </Text>
                  <View style={Reusablecss.dataCntr}>
                    <Image
                      source={require('../../Assets/Images/Ellipse1.png')}
                    />
                    <Text style={Reusablecss.data}>
                      {allservices.description}
                    </Text>
                  </View>
                  <View style={Reusablecss.dataCntr}>
                    <Image
                      source={require('../../Assets/Images/Ellipse1.png')}
                      // style={{opacity: item.d2 === undefined ? 0 : 1}}
                    />
                    <Text style={Reusablecss.data}>
                      {allservices.description}
                    </Text>
                  </View>
                </View>
                <View style={Reusablecss.imgCntr}>
                  <Image
                    resizeMode="contain"
                    // source={{uri: item.imageUrl}}
                    style={Reusablecss.innerImage}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      toggleBottomNavigationView(allservices?._id);
                      // setSerID(item._id);
                    }}
                    style={Reusablecss.imgButton}>
                    <Text style={Reusablecss.btnText}>ADD +</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* {==========================================} */}

              {/* <View style={Reusablecss.card}>
                <View style={Reusablecss.cardItem}>
                  <Text style={Reusablecss.title}>{allservices?.name}</Text>
                  <View style={Reusablecss.ratingCntr}>
                    <FontAwesome5Icon
                      name="star"
                      solid
                      size={hp('2%')}
                      color={Colors.deepSafron}
                    />
                    <Text style={Reusablecss.ratingBar}>
                      {allservices?.overallRating == 0
                        ? 0
                        : allservices?.overallRating}
                    </Text>
                  </View>




                </View>
                <View style={Reusablecss.imgCntr}>
                  <Image
                    resizeMode="contain"
                    source={{uri: allservices?.imageUrl}}
                    style={Reusablecss.innerImage}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      toggleBottomNavigationView(allservices?._id);
                      // setSerID(allservices._id);
                    }}
                    style={Reusablecss.imgButton}>
                    <Text style={Reusablecss.btnText}>ADD +</Text>
                  </TouchableOpacity>
                </View>




              </View> */}
            </ScrollView>
          </View>
        </View>
      )}

      <BottomSheet
        visible={visible}
        onBackButtonPress={() => setVisible(false)}
        onBackdropPress={() => setVisible(false)}>
        <View
          style={{
            backgroundColor: '#fff',
            width: '100%',
            height: '57%',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}>
          <View style={{}}>
            <Text
              style={{
                color: Colors.black,
                fontSize: 17,
                marginVertical: 10,
                marginBottom: 5,
                paddingHorizontal: 15,
                fontWeight: 'bold',
              }}>
              Choose a Service Plan
            </Text>

            <ScrollView contentContainerStyle={{paddingBottom: 50}}>
              {/* {==================================================silver service=====================================} */}
              <View
                style={{
                  marginHorizontal: 10,
                  paddingVertical: 15,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.grayShade,
                    width: '100%',
                  }}>
                  <View style={{flexDirection: 'row', width: '60%'}}>
                    <View
                      style={{
                        backgroundColor: Colors.silver,
                        height: 70,
                        width: 70,
                        borderRadius: 50,
                      }}></View>

                    <View
                      style={{
                        marginLeft: 10,
                        width: '100%',
                        // backgroundColor: 'red',
                        paddingBottom: 15,
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          color: Colors.black,
                        }}>
                        Silver services
                      </Text>

                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={require('../../Assets/Images/Ellipse1.png')}
                          style={{}}
                        />
                        <Text
                          numberOfLines={1}
                          style={{
                            width: '82%',
                            marginLeft: 4,
                            // marginHorizontal: 5,
                            // top: 3,
                            color: Colors.black,
                          }}>
                          {silver.description}
                        </Text>
                      </View>

                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={{
                            marginHorizontal: 0,
                            top: 3,
                            color: Colors.black,
                            fontWeight: '700',
                          }}>
                          Economical Prices
                        </Text>
                      </View>
                      <Text
                        style={{
                          // marginHorizontal: 5,
                          fontSize: 15,
                          fontWeight: 'bold',
                          color: Colors.darkGray,
                        }}>
                        INR {silver.price}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={cardSilver}
                    style={{
                      paddingVertical: 8,
                      paddingHorizontal: 7,
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: Colors.purple,
                      elevation: 7,
                    }}>
                    <Text style={{color: Colors.white, fontWeight: '500'}}>
                      Add to Cart
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* {==================================================gold service=====================================} */}
              <View
                style={{
                  marginHorizontal: 10,
                  paddingVertical: 15,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.grayShade,
                    width: '100%',
                  }}>
                  <View style={{flexDirection: 'row', width: '60%'}}>
                    <View
                      style={{
                        backgroundColor: Colors.lightgold,
                        height: 70,
                        width: 70,
                        borderRadius: 50,
                      }}></View>
                    <View
                      style={{
                        marginLeft: 10,
                        width: '100%',
                        // backgroundColor: 'red',
                        paddingBottom: 15,
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          color: Colors.black,
                        }}>
                        Gold services
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={require('../../Assets/Images/Ellipse1.png')}
                          style={{}}
                        />
                        <Text
                          numberOfLines={1}
                          style={{
                            width: '82%',
                            marginLeft: 4,
                            // marginRight: 15,
                            // marginHorizontal: 5,
                            // top: 3,
                            color: Colors.black,
                          }}>
                          {getname.description}
                        </Text>
                      </View>

                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={{
                            marginHorizontal: 0,
                            top: 3,
                            color: Colors.black,
                            fontWeight: 'bold',
                          }}>
                          Standard Prices
                        </Text>
                      </View>
                      <Text
                        style={{
                          // marginHorizontal: 5,
                          fontSize: 15,
                          fontWeight: 'bold',
                          color: Colors.darkGray,
                        }}>
                        INR {getname.price}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={cardGold}
                    style={{
                      paddingVertical: 8,
                      paddingHorizontal: 7,
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: Colors.purple,
                      elevation: 7,
                    }}>
                    <Text style={{color: Colors.white, fontWeight: '500'}}>
                      Add to Cart
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* {==================================================platinum service=====================================} */}

              <View
                style={{
                  marginHorizontal: 10,
                  paddingVertical: 15,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.grayShade,
                    width: '100%',
                  }}>
                  <View style={{flexDirection: 'row', width: '60%'}}>
                    <View
                      style={{
                        backgroundColor: Colors.lightblue,
                        height: 70,
                        width: 70,
                        borderRadius: 50,
                      }}></View>

                    <View
                      style={{
                        marginLeft: 10,
                        width: '100%',
                        paddingBottom: 10,
                      }}>
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          color: Colors.black,
                        }}>
                        Platinum services
                      </Text>

                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={require('../../Assets/Images/Ellipse1.png')}
                          style={{}}
                        />
                        <Text
                          numberOfLines={1}
                          style={{
                            width: '82%',
                            marginLeft: 4,
                            // marginHorizontal: 5,
                            // marginLeft: 5,
                            // top: 3,
                            color: Colors.black,
                          }}>
                          {/* Less experienced */}
                          {platinum.description}
                        </Text>
                      </View>

                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={{
                            marginHorizontal: 0,
                            top: 3,
                            color: Colors.black,
                            fontWeight: 'bold',
                          }}>
                          Premium Prices
                        </Text>
                      </View>
                      <Text
                        style={{
                          // marginHorizontal: 5,
                          fontSize: 15,
                          fontWeight: 'bold',
                          color: Colors.darkGray,
                        }}>
                        INR {platinum.price}
                      </Text>
                    </View>
                  </View>

                  <View style={{}}>
                    <TouchableOpacity
                      onPress={cardPlatinum}
                      style={{
                        paddingVertical: 8,
                        paddingHorizontal: 7,
                        borderRadius: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: Colors.purple,
                        elevation: 7,
                      }}>
                      <Text style={{color: Colors.white, fontWeight: '500'}}>
                        Add to Cart
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default Topservices;

const Reusablecss = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
    // backgroundColor: 'red',
  },
  greyHeader: {
    width: wp('100%'),
    height: hp('12%'),
    marginTop: hp('1.5%'),
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 5,
    backgroundColor: Colors.lightGray,
  },

  cntrContainer: {
    // height: hp('88.5%'),
    paddingBottom: hp('20%'),
  },
  card: {
    // width: '100%',
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: wp('0.2%'),
    marginHorizontal: 10,
  },
  cardItem: {
    width: '70%',
    padding: wp('2%'),
  },
  title: {
    fontWeight: 'bold',
    fontSize: wp('5%'),
    color: Colors.black,
  },
  ratingCntr: {
    flexDirection: 'row',
    marginTop: hp('0.5%'),
  },
  ratingBar: {
    fontWeight: 'bold',
    fontSize: wp('4%'),
    left: wp('0.5%'),
    top: wp('-0.5%'),
    color: '#000',
  },
  priceCntr: {
    flexDirection: 'row',
    alignItems: 'center',
    top: hp('0.2%'),
  },
  text: {
    fontSize: 15,
    color: Colors.black,
  },
  priceBar: {
    fontSize: hp('2%'),
    left: wp('1%'),
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
    marginTop: hp('1%'),
    alignItems: 'center',
    // top: -10,
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
  imgButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    width: wp('22%'),
    height: hp('4.5%'),
    marginTop: -hp('8%'),
    borderRadius: wp('2%'),
    // marginLeft: wp('3%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnText: {
    fontWeight: '900',
    color: Colors.purple,
    fontSize: hp('2%'),
  },
  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: '58%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

// const Styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     width: width,
//     height: height,
//     bottom: '-12%',
//     alignSelf: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'flex-end',
//   },
//   modalView: {
//     backgroundColor: 'white',
//     width: width,
//     height: height / 1.4,
//     borderTopRightRadius: 15,
//     borderTopLeftRadius: 15,

//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   bottomNavigationView: {
//     backgroundColor: '#fff',
//     width: '100%',
//     height: '54%',
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//   },
// });
