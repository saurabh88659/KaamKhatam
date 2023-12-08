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
import StepIndicator from 'react-native-step-indicator';

const {height, width} = Dimensions.get('window');
// import moment from 'moment-timezone';
import {isAllOf} from '@reduxjs/toolkit';
import {cloneElement} from 'react';
// import moment from 'moment-timezone';
const moment = require('moment'); // Import moment.js
const Viewdetails = props => {
  const allBookingStatus = [
    {
      status: 'Cancelled',
      time: '2023-11-03T06:03:21.561Z',
    },
    {
      status: 'Started',
      time: '2023-11-03T06:37:25.359Z',
    },
  ];

  const bookinID = props.route.params;
  // console.log()
  const [bookinviewdetails, setBookinviewdetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [rating1, setRating] = useState();
  const [comments, setComments] = useState('');
  const [vendorcomments, setVendorcomments] = useState('');
  const [serviceid, setServiceId] = useState('');
  const [packageId, setPackageId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [vendorId, setVendorId] = useState('');
  const [ratingvendor, setRatingvendor] = useState(5);
  const [bookingId, setBookingId] = useState('');
  const [cancellationReason, setCancellationReason] = useState('');
  const isFocused = useIsFocused();
  const [rateComponent, setRateComponent] = useState(false);
  const [vendoeImg, setVendorImg] = useState(null);
  const [uniqueID, setUniqueId] = useState('');
  const [viewReciptmodalVisible, SetViewReciptmodalVisible] = useState(false);
  // const {width, height} = useWindowDimensions();
  const [cancelServicemodalVisible, setCancelServicemodalVisible] =
    useState(false);

  const [viewReciptOnCancelmodalVisible, SetViewReciptOnCancelmodalVisible] =
    useState(false);
  console.log(cancellationReason, '========cancellationReason======');
  console.log(
    '#######========================Bookinviewdetails (View Details)=======================',
    bookinviewdetails,
  );
  console.log('===================rating=====================', rating1);
  const serviceCharge = (bookinviewdetails.amountToBePaid * 10) / 100;
  useEffect(() => {
    // if (isFocused) {
    Viewdetailsbooking();
    // setRating('');
    setVendorcomments('');
    // }
  }, [isFocused, rating1, ratingvendor]);

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
      star: rating1,
    };
    console.log('rateObj======>', rateObj);
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
    console.log('vendorobj===============>', vendorobj);
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

  // const labels = [
  //   'Cart',
  //   'Delivery Address',
  //   'Order Summary',
  //   'Payment Method',
  //   'Track',
  // ];
  const yourCustomStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 3,
    stepStrokeCurrentColor: 'green',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: 'green',
    stepStrokeUnFinishedColor: 'gray',
    stepIndicatorCurrentColor: 'green',
    stepIndicatorFinishedColor: 'green',
    stepIndicatorUnFinishedColor: 'gray',
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 18,
    stepIndicatorLabelCurrentColor: 'white',
    stepIndicatorLabelFinishedColor: 'white',
    stepIndicatorLabelUnFinishedColor: 'black',
    // separatorStrokeFinishedHeigth: 30,
  };

  const labels = bookinviewdetails?.allBookingStatus?.map(status => {
    // const formattedDate = moment(status.time).format('ddd MMM D , hh:mm A');
    return (
      <View style={{justifyContent: 'flex-end'}}>
        <Text></Text>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text
            style={{
              color: '#000',
              fontSize: 18,
              alignSelf: 'flex-start',
            }}>
            {status.status === 'RescheduledPending'
              ? 'Rescheduled Pending'
              : status.status}
          </Text>
          <Text style={{color: Colors.darkGray, fontSize: 12}}>
            {moment(status.time).format('ddd MMM D , hh:mm A')}
          </Text>
        </View>
      </View>
    );
  });

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
                // marginHorizontal: 10,
                paddingHorizontal: 10,
                marginTop: 20,
                paddingBottom: 25,
                borderBottomColor: Colors.grayShade,
                borderBottomWidth: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
                // height: 200,
                // backgroundColor: 'red',
                alignItems: 'center',
              }}>
              <View style={{}}>
                {bookinviewdetails.bookingStatus == 'Pending' ? (
                  <Text
                    style={{
                      color: '#ff8c00',
                      fontSize: 16,
                      fontWeight: '700',
                      marginBottom: 12,
                    }}>
                    Booking Waiting
                  </Text>
                ) : bookinviewdetails.bookingStatus === 'Confirmed' ? (
                  <Text
                    style={{
                      color: 'green',
                      fontSize: 16,
                      fontWeight: '700',
                      marginBottom: 12,
                    }}>
                    Booking Confirmed
                  </Text>
                ) : bookinviewdetails.bookingStatus === 'Completed' ? (
                  <Text
                    style={{
                      color: '#0EC01B',
                      fontSize: 16,
                      fontWeight: '700',
                      marginBottom: 12,
                    }}>
                    Booking Completed
                  </Text>
                ) : bookinviewdetails.bookingStatus === 'Started' ? (
                  <Text
                    style={{
                      color: '#0EC01B',
                      fontSize: 16,
                      fontWeight: '700',
                      marginBottom: 12,
                    }}>
                    booking has Started
                  </Text>
                ) : bookinviewdetails.bookingStatus === 'Transferred' ? (
                  <Text
                    style={{
                      color: '#ff8c00',
                      fontSize: 16,
                      fontWeight: '700',
                      marginBottom: 12,
                    }}>
                    Booking Waiting
                  </Text>
                ) : bookinviewdetails.bookingStatus === 'ImageUploaded' ? (
                  <Text
                    style={{
                      color: '#0EC01B',
                      fontSize: 16,
                      fontWeight: '700',
                      marginBottom: 12,
                    }}>
                    Booking Completed
                  </Text>
                ) : bookinviewdetails.bookingStatus === 'Internal' ? (
                  <Text
                    style={{
                      color: '#ff8c00',
                      fontSize: 16,
                      fontWeight: '700',
                      marginBottom: 12,
                    }}>
                    Booking Waiting
                  </Text>
                ) : bookinviewdetails.bookingStatus === 'Rescheduled' ? (
                  <Text
                    style={{
                      color: '#0EC01B',
                      fontSize: 16,
                      fontWeight: '700',
                      marginBottom: 12,
                    }}>
                    Booking Confirmed
                  </Text>
                ) : bookinviewdetails.bookingStatus === 'RescheduledPending' ? (
                  <Text
                    style={{
                      color: '#ff8c00',
                      fontSize: 16,
                      fontWeight: '700',
                      marginBottom: 12,
                    }}>
                    Booking Waiting
                  </Text>
                ) : bookinviewdetails.bookingStatus === 'Cancelled' ? (
                  <Text
                    style={{
                      color: 'red',
                      fontSize: 16,
                      fontWeight: '700',
                      marginBottom: 12,
                    }}>
                    Booking Cancelled
                  </Text>
                ) : null}

                <Text
                  style={{
                    color: '#000',
                    fontSize: 16,
                    fontWeight: '500',
                    marginBottom: 2,
                  }}>
                  Thanks for choosing
                </Text>

                <Text
                  style={{
                    color: '#000',
                    fontSize: 16,
                    fontWeight: '500',
                    marginBottom: 6,
                  }}>
                  Kaam Khatam
                </Text>
                <Text
                  style={{
                    color: Colors.darkGray,
                    fontSize: 16,
                    fontWeight: '400',
                    // marginBottom: 6,
                  }}>
                  Paid ₹{bookinviewdetails.amtWithGst}
                </Text>
              </View>
              <TouchableOpacity
                onPress={
                  () => {
                    bookinviewdetails.bookingStatus == 'Cancelled'
                      ? SetViewReciptOnCancelmodalVisible(
                          !viewReciptOnCancelmodalVisible,
                        )
                      : SetViewReciptmodalVisible(!viewReciptmodalVisible);
                  }
                  // setCancelServicemodalVisible()
                }
                style={{
                  borderColor: '#000',
                  borderWidth: 1,
                  height: 30,
                  width: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 4,
                  // elevation: 10,
                  backgroundColor: '#fff',
                  marginRight: 10,
                }}>
                <Text style={{color: '#000'}}>View Recipt</Text>
              </TouchableOpacity>
            </View>

            {/* {===================================vendor details==========================================} */}
            {(bookinviewdetails.bookingStatus === 'Confirmed' ||
              bookinviewdetails.bookingStatus === 'Completed' ||
              bookinviewdetails.bookingStatus === 'Started' ||
              bookinviewdetails.bookingStatus === 'ImageUploaded') && (
              <View
                style={{
                  marginTop: 10,
                  borderBottomColor: Colors.grayShade,
                  borderBottomWidth: 5,
                  paddingBottom: 20,
                }}>
                <View
                  style={{
                    // borderBottomWidth: 1,
                    marginHorizontal: 15,
                    // borderColor: '#D9D9D9',
                    top: 10,
                    // height: height / 28,
                  }}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: 21,
                      fontWeight: 'bold',
                    }}>
                    Vendor Details
                  </Text>
                </View>
                <View
                  style={{
                    // width: '100%',
                    // marginHorizontal: 15,
                    paddingHorizontal: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // backgroundColor: 'red',
                    alignItems: 'center',
                    marginTop: 20,
                  }}>
                  <View
                    style={{
                      // justifyContent: 'center',
                      alignItems: 'center',
                      // height: 100,
                      // justifyContent: 'space-between',
                      // marginTop: 23,
                      flexDirection: 'row',
                      marginBottom: 10,
                      // backgroundColor: 'red',
                      width: '100%',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        resizeMode="contain"
                        source={
                          bookinviewdetails.vendorImage
                            ? {uri: bookinviewdetails.vendorImage}
                            : require('../Assets/Images/profilePicture123.png')
                        }
                        style={{height: 55, width: 55, borderRadius: 30}}
                      />
                      <Text
                        style={{
                          color: Colors.black,
                          fontSize: 18,
                          marginLeft: 7,
                          fontWeight: 'bold',
                        }}>
                        {bookinviewdetails?.vendorName}
                      </Text>
                    </View>
                    {bookinviewdetails?.vendorRating ? (
                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={{
                            color: Colors.black,
                            fontSize: 14,
                            marginRight: 4,
                          }}>
                          You rated {bookinviewdetails?.vendorRating}
                        </Text>
                        <FontAwesome5Icon
                          name="star"
                          solid
                          size={hp('2%')}
                          color={Colors.lightYellow}
                        />
                      </View>
                    ) : null}
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  style={{
                    height: 35,
                    width: 120,
                    backgroundColor: '#0EC01B',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 4,
                    marginHorizontal: 15,
                  }}>
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}>
                    Rate Vendor
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {/* {===================================vendor details==========================================} */}

            {/* {===================================proof details==========================================} */}
            {(bookinviewdetails.bookingStatus === 'Completed' ||
              bookinviewdetails.bookingStatus === 'ImageUploaded') && (
              <View
                style={{
                  // backgroundColor: 'red',
                  paddingHorizontal: 15,
                  paddingVertical: 20,
                  borderBottomColor: Colors.grayShade,
                  borderBottomWidth: 5,
                  paddingBottom: 35,
                }}>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 21,
                    fontWeight: 'bold',
                  }}>
                  Your Service Proof
                </Text>
                <Text
                  style={{
                    color: Colors.lightGray,
                    fontSize: 13,
                    marginTop: 4,
                    marginBottom: 20,
                  }}>
                  Image and Selfie of your service
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <View
                    style={{
                      backgroundColor: Colors.grayShade,
                      height: 90,
                      width: 90,
                    }}>
                    <Image
                      resizeMode="cover"
                      source={{
                        uri: bookinviewdetails?.bookingVerificationImage
                          ?.maskSelfie,
                      }}
                      style={{height: 90, width: 90}}
                    />
                    <Text
                      style={{
                        color: '#000',
                        alignSelf: 'center',
                        fontSize: 16,
                        marginVertical: 5,
                      }}>
                      Selfie
                    </Text>
                  </View>

                  <View
                    style={{
                      backgroundColor: Colors.grayShade,
                      height: 90,
                      width: 90,
                    }}>
                    <Image
                      resizeMode="cover"
                      source={{
                        uri: bookinviewdetails?.bookingVerificationImage
                          ?.productImage,
                      }}
                      style={{height: 90, width: 90}}
                    />
                    <Text
                      style={{
                        color: '#000',
                        alignSelf: 'center',
                        fontSize: 16,
                        marginVertical: 5,
                        width: 118,
                        // backgroundColor: 'red',
                      }}>
                      Product Image
                    </Text>
                  </View>
                  {/* <View
                    style={{
                      backgroundColor: Colors.grayShade,
                      height: 90,
                      width: 90,
                    }}>
                    <Image
                      resizeMode="contain"
                      // source={{uri: bookinviewdetails.serviceImageURL}}
                      source={Lorealcolor}
                      style={{height: 90, width: 90}}
                    />
                  </View> */}
                </View>
              </View>
            )}

            {/* {===================================proof details==========================================} */}

            {/* {====================================service details====================================} */}
            {/* <View
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
            </View> */}
            {/* {====================================service details====================================} */}

            {/* {============================================new service details=========================================} */}

            <View
              style={{
                borderBottomColor: Colors.grayShade,
                borderBottomWidth: 3,
              }}>
              <View
                style={{
                  // borderBottomWidth: 1,
                  marginHorizontal: 15,
                  // borderColor: '#D9D9D9',
                  top: 10,
                  // height: height / 28,
                }}>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 21,
                    fontWeight: 'bold',
                  }}>
                  Service Details
                </Text>
              </View>

              <View style={{marginHorizontal: 15}}>
                {/* <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // marginVertical: 20,
                    marginTop: 20,
                  }}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: 15,
                      fontWeight: 'bold',
                    }}>
                    Rating
                  </Text>
                  <Text style={{color: Colors.darkGray, fontSize: 15}}>
                    {bookinviewdetails?.rating}
                  </Text>
                </View> */}
                {/* <View
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
                </View> */}

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    // marginVertical: 20,
                    marginTop: 20,
                    marginBottom: 5,
                  }}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}>
                    {bookinviewdetails.serviceName}
                  </Text>
                  {/* <Text style={{color: Colors.darkGray, fontSize: 15}}>
                    {bookinviewdetails.amountToBePaid}
                  </Text> */}

                  <View
                    style={{
                      flexDirection: 'row',
                      // justifyContent: 'space-between',
                      // marginVertical: 20,
                      marginBottom: 10,
                      // justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: Colors.black,
                        fontSize: 15,
                        fontWeight: '500',
                      }}>
                      Rating
                    </Text>

                    <Text style={{color: Colors.black, marginHorizontal: 5}}>
                      {bookinviewdetails?.rating}
                    </Text>
                    <FontAwesome5Icon
                      name="star"
                      solid
                      size={hp('2%')}
                      color={Colors.lightYellow}
                    />
                  </View>
                </View>

                {bookinviewdetails.bookingStatus === 'Completed' ||
                bookinviewdetails.bookingStatus === 'ImageUploaded' ? (
                  <View>
                    <TouchableOpacity
                      onPress={() => setModalVisible2(true)}
                      style={{
                        height: 35,
                        width: 120,
                        backgroundColor: '#0EC01B',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 4,
                        // marginHorizontal: 15,
                        marginBottom: 5,
                      }}>
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: 14,
                          fontWeight: 'bold',
                        }}>
                        Rate Service
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}

                <View
                  style={{
                    flexDirection: 'row',
                    // marginBottom: 10,
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
                </View>
                <Text style={{color: Colors.darkGray}}>
                  {'.'.repeat(width / 4.7)}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: 15,
                      fontWeight: 'bold',
                    }}>
                    Category
                  </Text>
                  <Text style={{color: Colors.darkGray, fontSize: 15}}>
                    {bookinviewdetails.categoryName}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    // justifyContent: 'space-between',
                    marginBottom: 10,
                    // marginTop: 10,
                    // alignContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../Assets/Images/Ellipse1.png')}
                    style={{
                      height: 7,
                      width: 7,
                      borderRadius: 50,
                      // backgroundColor: 'red',
                      // right: 4,
                      top: 2,
                    }}
                  />
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: 14,
                      left: 4,
                    }}>
                    {bookinviewdetails.serviceDescription}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    // justifyContent: 'space-between',
                    marginBottom: 20,
                    // marginTop: 10,
                    // alignContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../Assets/Images/Ellipse1.png')}
                    style={{
                      height: 7,
                      width: 7,
                      borderRadius: 50,
                      // backgroundColor: 'red',
                      // right: 4,
                      top: 2,
                    }}
                  />
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: 14,
                      left: 4,
                    }}>
                    {bookinviewdetails.packageDescription}
                  </Text>
                </View>
              </View>
            </View>
            {/* {============================================new service details=========================================} */}

            {/* {=====================================Booking Details====================================} */}
            <View
              style={{
                borderBottomColor: Colors.grayShade,
                borderBottomWidth: 3,
              }}>
              <View
                style={{
                  // borderBottomWidth: 1,
                  marginHorizontal: 15,
                  // borderColor: '#D9D9D9',
                  top: 10,
                  // height: height / 28,
                }}>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 21,
                    fontWeight: 'bold',
                  }}>
                  Booking Details
                </Text>
              </View>

              {/* <View
                style={{
                  // flexDirection: 'row',
                  // justifyContent: 'space-between',
                  paddingHorizontal: 15,
                  marginTop: 20,
                }}>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 19,
                    fontWeight: 'normal',
                  }}>
                  Total Amount : INR {bookinviewdetails.amtWithGst}
                </Text>
              </View> */}

              <View style={{marginHorizontal: 15}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // marginVertical: 20,
                    marginTop: 25,
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
                {/* <View
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
                </View> */}

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

                {/* <View
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
                </View> */}

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
                    Creadted On
                  </Text>
                  <Text style={{color: Colors.darkGray, fontSize: 15}}>
                    {/* const formattedDate = moment(status.time).format('ddd MMM D , hh:mm A'); */}

                    {moment(bookinviewdetails.createdAt).format(
                      'DD/MM/YYYY, hh:mm A',
                    )}
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
                          : bookinviewdetails.bookingStatus ===
                            'RescheduledPending'
                          ? '#ff8c00'
                          : '#F21313',
                    }}>
                    {bookinviewdetails.bookingStatus === 'RescheduledPending'
                      ? 'Rescheduled Pending'
                      : bookinviewdetails.bookingStatus}
                    {/* {bookinviewdetails.bookingStatus} */}
                  </Text>
                </View>
                {bookinviewdetails.bookingStatus == 'Cancelled' && (
                  <View
                    style={{
                      // flexDirection: 'row',
                      // justifyContent: 'space-between',
                      // marginVertical: 20,
                      marginBottom: 10,
                      borderTopColor: Colors.grayShade,
                      borderTopWidth: 1,
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: '400',
                        color: Colors.black,
                        marginTop: 5,
                        // fontSize: 15,
                        // fontWeight: 'bold',
                      }}>
                      Cancellation Reason
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '500',
                        textTransform: 'uppercase',
                        color: Colors.darkGray,
                        marginTop: 5,
                      }}>
                      {bookinviewdetails.cancelledReason}
                    </Text>
                  </View>
                )}
              </View>
            </View>
            {/* {=====================================Booking Details====================================} */}
            {/* {====================================StepIndicator========================================} */}
            <View
              style={{
                paddingHorizontal: 15,
                height: labels.length * 100,
                // backgroundColor: 'red',
                marginTop: 10,
              }}>
              <Text
                style={{fontSize: 21, fontWeight: 'bold', color: Colors.black}}>
                Booking Status
              </Text>
              <StepIndicator
                customStyles={yourCustomStyles}
                currentPosition={labels.length}
                stepCount={labels.length}
                // labels={allBookingStatus.map(status => status.status)}
                labels={labels}
                direction={'vertical'}
                // customStyles={{ stepIndicatorSize: stepIndicatorHeight }}
              />
            </View>
            {/* {====================================StepIndicator========================================} */}

            {/* {bookinviewdetails.bookingStatus === 'Cancelled' && (
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
            )} */}

            {/* {===========================================================RATE com================================================================} */}
            {bookinviewdetails.bookingStatus === 'hh' ? (
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
                {bookinviewdetails.bookingStatus === 'Cancelled' ||
                bookinviewdetails.bookingStatus === 'Completed' ||
                bookinviewdetails.bookingStatus === 'Started' ||
                bookinviewdetails.bookingStatus === 'ImageUploaded' ? null : ( // </TouchableOpacity> //   </Text> //     Cancel //     style={{color: 'white', fontWeight: 'bold', fontSize: 16}}> //   <Text //   }}> //     marginVertical: 10, //     marginHorizontal: 15, //     borderRadius: 5, //     justifyContent: 'center', //     alignItems: 'center', //     // backgroundColor: '#0EC01B', //     height: height / 16, //   style={{ //   onPress={cancelBooking} // <TouchableOpacity
                  <View>
                    {/* <View
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
                    </View> */}

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

      {/* {=================================================view repict on normal =======================================} */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={viewReciptmodalVisible}
        onRequestClose={() => {
          SetViewReciptmodalVisible(!viewReciptmodalVisible);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.6)',
          }}>
          <TouchableOpacity
            onPress={() => SetViewReciptmodalVisible(!viewReciptmodalVisible)}
            activeOpacity={1}
            style={{flex: 1}}></TouchableOpacity>
          <View
            style={{
              // marginHorizontal: 20,
              backgroundColor: 'white',
              // borderRadius: 10,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              // height: height / 2,
              // justifyContent: 'space-between',
              width: '100%',
              bottom: 0,
              position: 'absolute',
              // borderWidth: 1.5,
              // borderColor: '#000',
            }}>
            <View>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 21,
                  color: Colors.black,
                  marginHorizontal: 15,
                  // top: 20,
                  marginTop: 15,
                }}>
                Payment Details
              </Text>
            </View>

            <View
              style={{
                // paddingHorizontal: 15,
                marginHorizontal: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                // marginVertical: 2,
                marginTop: 20,
                marginBottom: 15,
                borderBottomColor: Colors.darkGray,
                borderBottomWidth: 1,
                // alignContent: 'center',
              }}>
              <Text
                style={{
                  marginBottom: 20,
                  color: Colors.darkGray,
                  fontSize: 17,
                  fontWeight: '500',
                }}>
                Service Amount
              </Text>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                ₹{bookinviewdetails.amountToBePaid}
              </Text>
            </View>
            <View
              style={{
                // paddingHorizontal: 15,
                marginHorizontal: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomColor: Colors.darkGray,
                borderBottomWidth: 1,
                marginBottom: 20,
              }}>
              <Text
                style={{
                  color: Colors.darkGray,
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                Tax and Fee
              </Text>

              <Text
                style={{
                  color: Colors.black,
                  fontSize: 17,
                  fontWeight: '500',
                  marginBottom: 20,
                }}>
                ₹
                {bookinviewdetails.amtWithGst -
                  bookinviewdetails.amountToBePaid}
              </Text>
            </View>

            <View
              style={{
                // paddingHorizontal: 15,
                marginHorizontal: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomColor: Colors.darkGray,
                borderBottomWidth: 1,
                marginBottom: 15,
              }}>
              <Text
                style={{
                  color: Colors.darkGray,
                  fontSize: 16,
                  fontWeight: '500',
                  marginBottom: 25,
                }}>
                Amount Paid
              </Text>

              <Text
                style={{
                  color: Colors.black,
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                ₹{bookinviewdetails.amtWithGst}
              </Text>
            </View>

            <View
              style={{
                // paddingHorizontal: 15,
                marginHorizontal: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                // borderBottomColor: Colors.darkGray,
                // borderBottomWidth: 1,
                marginBottom: 20,
              }}>
              <Text
                style={{
                  color: Colors.darkGray,
                  fontSize: 17,
                  fontWeight: '500',
                  marginBottom: 10,
                }}>
                Payment Mode
              </Text>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 18,
                  fontWeight: '300',
                }}>
                {bookinviewdetails.payby}
              </Text>
            </View>

            {/* 
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 30,

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
                // onPress={handle}
              >
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
                  SetViewReciptmodalVisible(!viewReciptmodalVisible);
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
            </View> */}
          </View>
        </View>
      </Modal>

      {/* {=================================================view repict on normal =======================================} */}

      {/* {=================================================view repict on cancel =======================================} */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={viewReciptOnCancelmodalVisible}
        onRequestClose={() => {
          SetViewReciptOnCancelmodalVisible(!viewReciptOnCancelmodalVisible);
        }}>
        <View
          style={{
            flex: 1,
            // justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.6)',
            // backgroundColor: 'rgba(0,0,0,0.6)',
          }}>
          <TouchableOpacity
            onPress={() =>
              SetViewReciptOnCancelmodalVisible(!viewReciptOnCancelmodalVisible)
            }
            activeOpacity={1}
            style={{flex: 1}}></TouchableOpacity>
          <View
            style={{
              // marginHorizontal: 20,
              backgroundColor: 'white',
              // borderRadius: 10,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              // height: height / 2,
              // justifyContent: 'space-between',
              width: '100%',
              bottom: 0,
              position: 'absolute',
              // borderWidth: 1.5,
              // borderColor: '#000',
            }}>
            <View>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 21,
                  color: Colors.black,
                  marginHorizontal: 15,
                  // top: 20,
                  marginTop: 20,
                }}>
                Payment Details
              </Text>
            </View>

            <View
              style={{
                // paddingHorizontal: 15,
                marginHorizontal: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                // marginVertical: 2,
                marginTop: 25,
                marginBottom: 15,
                borderBottomColor: Colors.darkGray,
                borderBottomWidth: 1,
                // alignContent: 'center',
              }}>
              <Text
                style={{
                  marginBottom: 10,
                  color: Colors.darkGray,
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                Amount Paid
              </Text>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                ₹{bookinviewdetails.amtWithGst}
              </Text>
            </View>

            <View
              style={{
                // paddingHorizontal: 15,
                marginHorizontal: 15,
                // flexDirection: 'row',
                // justifyContent: 'space-between',
                borderBottomColor: Colors.darkGray,
                borderBottomWidth: 1,
                marginBottom: 20,
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{
                    color: Colors.darkGray,
                    fontSize: 16,
                    fontWeight: '500',
                  }}>
                  GST Amount
                </Text>

                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 16,
                    fontWeight: '500',
                    marginBottom: 8,
                  }}>
                  - ₹
                  {bookinviewdetails.amtWithGst -
                    bookinviewdetails.amountToBePaid}
                </Text>
              </View>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{
                    color: Colors.darkGray,
                    fontSize: 16,
                    fontWeight: '500',
                  }}>
                  Cancellation Charge
                </Text>

                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 16,
                    fontWeight: '500',
                    marginBottom: 10,
                  }}>
                  - ₹{bookinviewdetails.amountDeducted}
                </Text>
              </View>
            </View>

            <View
              style={{
                // paddingHorizontal: 15,
                marginHorizontal: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomColor: Colors.darkGray,
                borderBottomWidth: 1,
                marginBottom: 10,
              }}>
              <Text
                style={{
                  color: Colors.darkGray,
                  fontSize: 16,
                  fontWeight: '500',
                  marginBottom: 15,
                }}>
                Refund Amount
              </Text>

              <Text
                style={{
                  color: Colors.black,
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                ₹{bookinviewdetails.refundAmount}
              </Text>
            </View>

            <View
              style={{
                // paddingHorizontal: 15,
                marginHorizontal: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                // borderBottomColor: Colors.darkGray,
                // borderBottomWidth: 1,
                marginBottom: 20,
              }}>
              <Text
                style={{
                  color: Colors.darkGray,
                  fontSize: 16,
                  fontWeight: '500',
                  // marginBottom: 5,
                }}>
                Payment Mode
              </Text>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 17,
                  fontWeight: '300',
                }}>
                {bookinviewdetails.payby}
              </Text>
            </View>
            <View
              style={{
                marginHorizontal: 15,
                marginBottom: 20,
              }}>
              <Text
                style={{
                  // marginTop: 9,
                  color: Colors.black,
                  fontSize: 16,
                  fontWeight: '600',
                }}>
                Your wallet has been credited with the refund
              </Text>
            </View>

            {/* 
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 30,

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
                // onPress={handle}
              >
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
                  SetViewReciptmodalVisible(!viewReciptmodalVisible);
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
            </View> */}
          </View>
        </View>
      </Modal>
      {/* {=================================================view repict on cancel =======================================} */}

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
                marginTop: 10,
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
              {/* <Rating
                type="star"
                ratingCount={5}
                defaultRating={5}
                showRating={true}
                onFinishRating={rating => {
                  // Alert.alert('Star Rating: ' + JSON.stringify(rating));
                  // setRating(JSON.stringify(rating));
                  setRating(rating);
                  console.log(rating, 'rating------------------');
                }}
                style={{paddingVertical: 10}}
              /> */}
              <Rating
                // type="heart"
                type="star"
                ratingCount={5}
                defaultRating={5}
                showRating={true}
                onFinishRating={rating => {
                  setRating(rating);
                  //setRating(JSON.stringify(rating));
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
              paddingVertical: '9%',
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
                // type="heart"
                type="star"
                ratingCount={5}
                defaultRating={5}
                showRating={true}
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
                  borderRadius: 6,
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
    // backgroundColor: 'rgba(0,0,0,0.6)',
    // marginHorizontal: 20,
    paddingHorizontal: 20,
  },

  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: height / 4.2,
    justifyContent: 'space-between',
    width: '100%',
    // bottom: 0,
    // position: 'absolute',
  },

  textStyle: {
    color: '#0EC01B',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    top: -5,
    fontWeight: '700',
    fontSize: 18,
    color: Colors.black,
  },
});
