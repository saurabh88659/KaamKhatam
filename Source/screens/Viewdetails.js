import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Alert,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Lorealcolor from '../Assets/Images/Lorealcolor.png';
import {_getStorage} from '../Assets/utils/storage/Storage';
import axios from 'axios';
import {BASE_URL} from '../Assets/utils/Restapi/Config';
import {Rating} from 'react-native-ratings';
import Toast from 'react-native-simple-toast';
import {useIsFocused} from '@react-navigation/native';
import {color} from 'react-native-reanimated';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const {height, width} = Dimensions.get('window');
import moment from 'moment-timezone';

const Viewdetails = props => {
  const bookinID = props.route.params;
  // console.log()
  const [bookinviewdetails, setBookinviewdetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [rating, setRating] = useState('');
  const [comments, setComments] = useState('');
  const [vendorcomments, setVendorcomments] = useState('');
  const [serviceid, setServiceId] = useState('');
  const [packageId, setPackageId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [vendorId, setVendorId] = useState('');
  const [ratingvendor, setRatingvendor] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [cancellationReason, setCancellationReason] = useState('');
  const isFocused = useIsFocused();
  const [rateComponent, setRateComponent] = useState(false);
  const [vendoeImg, setVendorImg] = useState(null);
  const [uniqueID, setUniqueId] = useState('');

  // const {width, height} = useWindowDimensions();
  const [cancelServicemodalVisible, setCancelServicemodalVisible] =
    useState(false);
  console.log(cancellationReason, '========cancellationReason======');
  console.log(
    bookinviewdetails,
    '========================bookinviewdetails(View Details)=======================',
  );
  console.log('===================rating=====================', rating);
  const serviceCharge = (bookinviewdetails.amountToBePaid * 10) / 100;
  useEffect(() => {
    if (isFocused) {
      Viewdetailsbooking();
      setRating('');
    }
  }, [isFocused]);

  const Viewdetailsbooking = async () => {
    const token = await _getStorage('token');
    axios
      .get(BASE_URL + `/booking/${bookinID}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log(
          'Viewdetailsbooking---------------------------',
          res.data.result,
        );
        setBookinviewdetails(res.data.result);
        setServiceId(res.data.result.serviceId);
        setPackageId(res.data.result.packageId);
        setVendorId(res.data.result.vendorId);
        setBookingId(res.data.result.bookingId);
        setVendorImg(res.data.result.vendorImage);
        setUniqueId(res.data.result.uniqueId);

        setCancellationReason(res.data?.result?.cancelledReason);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('Viewdetailsbooking catch error', error);
        setIsLoading(false);
      });
  };

  const review = async () => {
    const token = await _getStorage('token');
    const rateObj = {
      serviceId: serviceid,
      packageId: packageId,
      comment: comments,
      star: rating,
    };
    console.log('rateObj', rateObj);
    axios
      .post(BASE_URL + `/category/review`, rateObj, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log('=======response rating====', res.data);
        if (
          res.data.message == 'User have updated reviewed for this service' ||
          'User Reviewed successfully'
        ) {
          setModalVisible2(!modalVisible2);
          setRateComponent(true);
          Toast.showWithGravity(
            'Thanks so much for sharing your experience with us.',
            Toast.LONG,
            Toast.BOTTOM,
          );
        } else {
          Toast.showWithGravity(
            'Please Rate The Services',
            Toast.LONG,
            Toast.BOTTOM,
          );
        }
      })
      .catch(error => {
        console.log('rating catch error', error);
        console.log(error.response.data.message);
        if (error.response.data.message == '"star" must be a number') {
          Toast.showWithGravity(
            'Please select a star rating before submitting',
            Toast.SHORT,
            Toast.BOTTOM,
          );
        } else if (
          error.response.data.message == '"comment" is not allowed to be empty'
        ) {
          Toast.showWithGravity(
            'Please enter a comment before submitting',
            Toast.SHORT,
            Toast.BOTTOM,
          );
        }
        // Toast.showWithGravity(
        //   error.response.data.message,
        //   Toast.SHORT,
        //   Toast.BOTTOM,
        // );
        // Toast.showWithGravity('Please comment', Toast.LONG, Toast.BOTTOM);
      });
  };

  const reviewVendor = async () => {
    const token = await _getStorage('token');
    const vendorobj = {
      comment: vendorcomments,
      rating: ratingvendor,
      id: vendorId,
    };
    console.log('vendorobj', vendorobj);
    axios
      .post(BASE_URL + `/vendor/review`, vendorobj, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log('rate vendor response', res.data);
        console.log('response rating', res.data);
        if (
          res.data.message == 'User have updated reviewed for this service' ||
          'User Reviewed successfully'
        ) {
          setModalVisible(!modalVisible);
          Toast.showWithGravity(
            'Thanks so much for sharing your experience with us.',
            Toast.LONG,
            Toast.BOTTOM,
          );
        } else {
          Toast.showWithGravity(
            'Please Rate The Services',
            Toast.LONG,
            Toast.BOTTOM,
          );
        }
      })
      .catch(error => {
        console.log(' vendor rate catch error ', error);
        console.log(error.response.data.message);
        Toast.showWithGravity(
          error.response.data.message,
          Toast.SHORT,
          Toast.BOTTOM,
        );
      });
  };
  const handleCancelService = () => {
    props.navigation.navigate('CancelBooking', bookingId);
    setCancelServicemodalVisible(!cancelServicemodalVisible);
  };

  const IST_TIMEZONE = 'Asia/Kolkata';
  const utcMoment = moment(bookinviewdetails.createdAt);
  const istMoment = utcMoment.tz(IST_TIMEZONE);
  console.log(istMoment, 'istMoment---map');
  const istDate = istMoment.format('DD/MM/YYYY');
  console.log(istDate, 'is date ---map');

  return (
    <>
      <Header
        bgColor={Colors.topNavbarColor}
        color={Colors.white}
        title="View Details"
        onPress={() => props.navigation.goBack()}
      />
      {isLoading === true ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '65%',
          }}>
          <ActivityIndicator color={Colors.purple} size="large" />
        </View>
      ) : (
        <ScrollView style={{flex: 1}}>
          <View style={{marginBottom: 20}}>
            <View
              style={{
                paddingVertical: 30,
                marginVertical: 5,
                marginHorizontal: 10,
                borderRadius: 6,
                borderWidth: 1,
                borderColor: Colors.lightGray,
              }}>
              <View style={{flexDirection: 'row', marginHorizontal: 10}}>
                <View style={{width: '70%'}}>
                  <Text style={{color: Colors.black, fontSize: 17, top: -10}}>
                    {bookinviewdetails?.serviceName}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <FontAwesome5Icon
                      name="star"
                      solid
                      size={hp('2%')}
                      color={Colors.lightYellow}
                    />

                    <Text style={{left: 5, color: Colors.black}}>
                      {bookinviewdetails?.rating}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      top: 5,
                    }}>
                    <Text style={{color: Colors.black}}>{'\u20B9'}</Text>
                    <Text
                      style={{
                        paddingHorizontal: 5,
                        color: Colors.black,
                        fontWeight: '700',
                      }}>
                      {bookinviewdetails.amountToBePaid}
                    </Text>
                    {/* <Text style={{left: 20, color: Colors.black}}>30 min</Text> */}
                  </View>
                  <Text style={{color: Colors.black}}>
                    .....................................................
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={require('../Assets/Images/Ellipse1.png')}
                      style={{height: 7, width: 7, borderRadius: 50, top: 5}}
                    />
                    <Text style={{color: Colors.black, fontSize: 13, left: 5}}>
                      {bookinviewdetails.serviceDescription}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: 3}}>
                    <Image
                      source={require('../Assets/Images/Ellipse1.png')}
                      style={{height: 7, width: 7, borderRadius: 50, top: 5}}
                    />
                    <Text style={{color: Colors.black, fontSize: 13, left: 5}}>
                      {bookinviewdetails.packageDescription}
                    </Text>
                  </View>
                </View>
                <View style={{width: '30%', padding: 10}}>
                  <Image
                    resizeMode="contain"
                    source={Lorealcolor}
                    style={{height: 80, width: 80}}
                  />
                </View>
              </View>
            </View>
            <View>
              <View
                style={{
                  borderBottomWidth: 1,
                  marginHorizontal: 15,
                  borderColor: '#D9D9D9',
                  top: 10,
                  // height: height / 28,
                }}>
                <Text
                  style={{
                    color: Colors.purple,
                    fontSize: 17,
                    fontWeight: 'bold',
                  }}>
                  Booking Details
                </Text>
              </View>
              <View style={{marginHorizontal: 15}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 20,
                  }}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: 15,
                      fontWeight: 'bold',
                    }}>
                    Booking ID
                  </Text>
                  <Text style={{color: Colors.darkGray, fontSize: 15}}>
                    {uniqueID}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // flexWrap: 'wrap',
                  }}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: 15,
                      fontWeight: 'bold',
                    }}>
                    Service Name
                  </Text>

                  <Text
                    style={{
                      color: Colors.darkGray,
                      fontSize: 15,
                      textAlign: 'center',
                    }}>
                    {bookinviewdetails.serviceName}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 20,
                  }}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: 15,
                      fontWeight: 'bold',
                    }}>
                    Time Slot
                  </Text>
                  <Text style={{color: Colors.darkGray, fontSize: 15}}>
                    {bookinviewdetails.time}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: 15,
                      fontWeight: 'bold',
                    }}>
                    Price
                  </Text>
                  <Text style={{color: Colors.darkGray, fontSize: 15}}>
                    INR {bookinviewdetails.amountToBePaid}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 20,
                  }}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: 15,
                      fontWeight: 'bold',
                    }}>
                    Booking Date
                  </Text>
                  <Text style={{color: Colors.darkGray, fontSize: 15}}>
                    {bookinviewdetails.bookingDate}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // marginVertical: 20,
                    marginBottom: 20,
                  }}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: 15,
                      fontWeight: 'bold',
                    }}>
                    Creation Date
                  </Text>
                  <Text style={{color: Colors.darkGray, fontSize: 15}}>
                    {istDate}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: 15,
                      fontWeight: 'bold',
                    }}>
                    Paid By
                  </Text>
                  <Text style={{color: Colors.darkGray, fontSize: 15}}>
                    {bookinviewdetails.payby}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 20,
                  }}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: 15,
                      fontWeight: 'bold',
                    }}>
                    Status
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '500',
                      textTransform: 'uppercase',
                      color:
                        bookinviewdetails.bookingStatus === 'Pending'
                          ? Colors.purple
                          : bookinviewdetails.bookingStatus === 'Confirmed'
                          ? '#0EC01B'
                          : bookinviewdetails.bookingStatus === 'Completed'
                          ? '#0EC01B'
                          : '#F21313',
                    }}>
                    {bookinviewdetails.bookingStatus}
                  </Text>
                </View>
              </View>
            </View>

            {bookinviewdetails.bookingStatus === 'Confirmed' && (
              <View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    marginHorizontal: 15,
                    borderColor: '#D9D9D9',
                    top: 10,
                    // height: height / 28,
                  }}>
                  <Text
                    style={{
                      color: Colors.purple,
                      fontSize: 17,
                      fontWeight: 'bold',
                    }}>
                    Vendor Details
                  </Text>
                </View>
                <View style={{marginHorizontal: 15}}>
                  <View
                    style={{
                      width: '100%',
                      height: 100,
                      justifyContent: 'space-between',
                      // alignItems: 'center',
                      marginTop: 23,
                      flexDirection: 'row',
                    }}>
                    {/* <ImageBackground
                source={require('../Assets/Images/profilePicture123.png')}
                style={Styles.imagebox}>
                  
                </ImageBackground> */}

                    <Image
                      resizeMode="contain"
                      source={{
                        uri: vendoeImg,
                      }}
                      style={{height: 100, width: 100}}
                    />

                    <View
                      style={{
                        flex: 1,
                        // backgroundColor: 'red',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        // height: 10,
                        // width: 10,
                      }}>
                      <MaterialIcons
                        size={45}
                        color={'green'}
                        name={'verified-user'}
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      // marginVertical: 20,
                      marginTop: 9,
                      marginBottom: 10,
                    }}>
                    <Text
                      style={{
                        color: Colors.black,
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}>
                      Vendor Name
                    </Text>
                    <Text style={{color: Colors.darkGray, fontSize: 15}}>
                      {bookinviewdetails?.vendorName}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      // flexWrap: 'wrap',
                    }}>
                    <Text
                      style={{
                        color: Colors.black,
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}>
                      Contact
                    </Text>

                    <Text
                      style={{
                        color: Colors.darkGray,
                        fontSize: 15,
                        textAlign: 'center',
                      }}>
                      {bookinviewdetails?.contact}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginVertical: 10,
                      // flexWrap: 'wrap',
                    }}>
                    <Text
                      style={{
                        color: Colors.black,
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}>
                      Experience
                    </Text>

                    <Text
                      style={{
                        color: Colors.darkGray,
                        fontSize: 15,
                        textAlign: 'center',
                      }}>
                      {bookinviewdetails?.experience}{' '}
                      {bookinviewdetails?.experience > 1 ? 'Years' : 'Year'}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {bookinviewdetails.bookingStatus === 'Cancelled' && (
              <View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    marginHorizontal: 15,
                    borderColor: '#D9D9D9',
                    top: 10,
                    // height: height / 28,
                  }}>
                  <Text
                    style={{
                      color: Colors.purple,
                      fontSize: 17,
                      fontWeight: 'bold',
                    }}>
                    Cancellation Reason
                  </Text>
                </View>
                <Text
                  style={{
                    color: Colors.darkGray,
                    fontSize: 15,
                    marginHorizontal: 15,
                    marginTop: 15,
                  }}>
                  {cancellationReason}
                </Text>
                <View
                  style={{
                    marginHorizontal: 15,
                    padding: 5,
                    backgroundColor: Colors.lightpurple,
                    marginVertical: 10,
                  }}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: 15,
                    }}>
                    Your refund has been initiated
                  </Text>
                </View>
                <View style={{marginHorizontal: 15, marginBottom: 20}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginVertical: 10,
                    }}>
                    <Text
                      style={{
                        color: Colors.black,
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}>
                      Total Amount
                    </Text>
                    <Text style={{color: Colors.darkGray, fontSize: 15}}>
                      INR {bookinviewdetails?.amountToBePaid}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginVertical: 10,
                    }}>
                    <Text
                      style={{
                        color: Colors.black,
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}>
                      Service Charge
                    </Text>
                    <Text style={{color: Colors.darkGray, fontSize: 15}}>
                      INR {bookinviewdetails?.amountDeducted}
                    </Text>
                  </View>
                  <View
                    style={{
                      height: 1,
                      backgroundColor: Colors.darkGray,
                      marginVertical: 3,
                    }}></View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginVertical: 10,
                    }}>
                    <Text
                      style={{
                        color: Colors.black,
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}>
                      Refund Amount
                    </Text>
                    <Text style={{color: Colors.darkGray, fontSize: 15}}>
                      INR {bookinviewdetails?.refundAmount.toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {bookinviewdetails.bookingStatus === 'Completed' ? (
              <View>
                <TouchableOpacity
                  onPress={() => setModalVisible2(true)}
                  // disabled={rateComponent}
                  style={{
                    height: height / 16,
                    backgroundColor: '#0EC01B',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5,
                    marginHorizontal: 15,
                    marginVertical: 10,
                  }}>
                  <Text
                    style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                    Please Rate
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  style={{
                    height: height / 16,
                    backgroundColor: '#0EC01B',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5,
                    marginHorizontal: 15,
                    marginVertical: 10,
                  }}>
                  <Text
                    style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                    Please Rate Vendor
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                {bookinviewdetails.bookingStatus === 'Cancelled' ? null : ( // </TouchableOpacity> //   </Text> //     Cancel //     style={{color: 'white', fontWeight: 'bold', fontSize: 16}}> //   <Text //   }}> //     marginVertical: 10, //     marginHorizontal: 15, //     borderRadius: 5, //     justifyContent: 'center', //     alignItems: 'center', //     // backgroundColor: '#0EC01B', //     height: height / 16, //   style={{ //   onPress={cancelBooking} // <TouchableOpacity
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        width: width,
                        backgroundColor: Colors.lightpurple,
                      }}>
                      <Text
                        style={{
                          color: Colors.black,
                          fontWeight: 'bold',
                        }}>
                        Note:
                      </Text>
                      <Text
                        style={{
                          flex: 1,
                          flexWrap: 'wrap',
                          color: Colors.black,
                          marginLeft: 10,
                        }}>
                        If you cancel your order within4 days, then refund would
                        be provided. Otherwise, there would be no refund.
                      </Text>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        marginTop: 20,
                      }}>
                      <TouchableOpacity
                        onPress={
                          () =>
                            setCancelServicemodalVisible(
                              !cancelServicemodalVisible,
                            )
                          // props.navigation.navigate('CancelBooking', bookingId)
                        }
                        style={{
                          height: height / 16,
                          // backgroundColor: Colors.purple,
                          borderColor: Colors.purple,
                          borderWidth: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 5,
                          marginHorizontal: 15,
                          padding: 10,
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontWeight: '500',
                            color: Colors.purple,
                            fontSize: 16,
                          }}>
                          Cancel Booking
                        </Text>
                      </TouchableOpacity>
                      {bookinviewdetails.bookingStatus === 'Confirmed' ? (
                        <TouchableOpacity
                          onPress={() =>
                            props.navigation.navigate(
                              'RescheduleBooking',
                              bookinID,
                            )
                          }
                          style={{
                            height: height / 16,
                            backgroundColor: Colors.purple,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 5,
                            marginHorizontal: 15,
                            padding: 10,
                            // marginVertical,
                          }}>
                          <Text
                            style={{
                              color: 'white',
                              fontWeight: '500',
                              fontSize: 16,
                            }}>
                            Reschedule Booking
                          </Text>
                        </TouchableOpacity>
                      ) : null}
                    </View>
                  </View>
                )}
              </View>
            )}
          </View>
        </ScrollView>
      )}

      {/* {======================================modal====================================================} */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={cancelServicemodalVisible}
        onRequestClose={() => {
          setCancelServicemodalVisible(!cancelServicemodalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Text style={[styles.modalText, {marginTop: 20}]}>
                Would you like to process with the cancellation process?
              </Text>

              <Text
                style={{
                  textAlign: 'center',
                  // top: -15,
                  fontWeight: '700',
                  fontSize: 17,
                  color: '#ff8c00',
                  marginVertical: 10,
                }}>
                A 10% service charge will apply
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 30,
                // top: 20,
                // marginVertical: 15,
                marginBottom: 20,
              }}>
              <TouchableOpacity
                style={{
                  borderColor: Colors.purple,
                  backgroundColor: Colors.purple,
                  height: height / 18,
                  width: width / 3.3,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 4,
                  borderWidth: 1,
                  // marginBottom: 3,
                }}
                onPress={handleCancelService}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  Yes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderColor: Colors.purple,
                  height: height / 18,
                  width: width / 3.3,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 4,
                  // borderColor: '#0EC01B',
                  borderWidth: 1,
                }}
                onPress={() => {
                  setCancelServicemodalVisible(!cancelServicemodalVisible);
                }}>
                <Text
                  style={{
                    color: Colors.purple,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  No
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* {===================================================modal=======================================} */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible2(!modalVisible2);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.6)',
          }}>
          <View
            style={{
              backgroundColor: Colors.white,
              paddingVertical: '10%',
              marginHorizontal: 10,
              borderRadius: 7,
            }}>
            <Text
              style={{
                color: Colors.black,
                textAlign: 'center',
                fontWeight: '500',
                fontSize: 18,
                top: -20,
              }}>
              Please Rate The Services
            </Text>
            <View
              style={{
                top: -15,
              }}>
              <Rating
                defaultRating={5}
                onFinishRating={rating => {
                  // Alert.alert('Star Rating: ' + JSON.stringify(rating));
                  // setRating(JSON.stringify(rating));
                  setRating(rating);

                  console.log(rating);
                }}
                style={{paddingVertical: 10}}
              />
            </View>
            <View>
              <TextInput
                placeholderTextColor={Colors.lightGray}
                placeholder="Please comments"
                value={comments}
                onChangeText={text => setComments(text)}
                style={{
                  height: 45,
                  borderWidth: 1,
                  paddingHorizontal: 15,
                  marginHorizontal: 15,
                  top: -10,
                  borderRadius: 10,
                  color: Colors.black,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 30,
                top: 5,
              }}>
              <TouchableOpacity
                onPress={review}
                style={{
                  borderColor: '#0EC01B',
                  backgroundColor: '#0EC01B',
                  paddingHorizontal: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 4,
                  paddingVertical: 10,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  Submit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible2(!modalVisible2);
                }}
                style={{
                  borderColor: '#0EC01B',
                  paddingHorizontal: 30,
                  paddingVertical: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 4,
                  borderColor: '#0EC01B',
                  borderWidth: 1,
                }}>
                <Text
                  style={{
                    color: '#0EC01B',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.6)',
          }}>
          <View
            style={{
              backgroundColor: Colors.white,
              paddingVertical: '10%',
              marginHorizontal: 10,
              borderRadius: 7,
            }}>
            <Text
              style={{
                color: Colors.black,
                textAlign: 'center',
                fontWeight: '500',
                fontSize: 18,
                top: -20,
              }}>
              Please Rate The Vendor
            </Text>
            <View
              style={{
                top: -15,
              }}>
              <Rating
                defaultRating={2}
                onFinishRating={rating => {
                  // Alert.alert('Star Rating: ' + JSON.stringify(rating));
                  setRatingvendor(JSON.stringify(rating));
                }}
                style={{paddingVertical: 10}}
              />
            </View>
            <View>
              <TextInput
                placeholderTextColor={Colors.lightGray}
                placeholder="Please comments"
                value={vendorcomments}
                onChangeText={text => setVendorcomments(text)}
                style={{
                  height: 45,
                  borderWidth: 1,
                  paddingHorizontal: 15,
                  marginHorizontal: 15,
                  top: -10,
                  borderRadius: 10,
                  color: Colors.black,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 30,
                top: 5,
              }}>
              <TouchableOpacity
                onPress={reviewVendor}
                style={{
                  borderColor: '#0EC01B',
                  backgroundColor: '#0EC01B',
                  paddingHorizontal: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 4,
                  paddingVertical: 10,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  Submit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                style={{
                  borderColor: '#0EC01B',
                  paddingHorizontal: 30,
                  paddingVertical: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 4,
                  borderColor: '#0EC01B',
                  borderWidth: 1,
                }}>
                <Text
                  style={{
                    color: '#0EC01B',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Viewdetails;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalView: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    height: height / 4.5,
    justifyContent: 'space-between',
  },

  textStyle: {
    color: '#0EC01B',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    // top: -15,
    fontWeight: '700',
    fontSize: 17,
    color: Colors.black,
  },
});
