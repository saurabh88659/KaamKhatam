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

const {height, width} = Dimensions.get('window');

const Viewdetails = props => {
  const bookinID = props.route.params;
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
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      Viewdetailsbooking();
    }
  }, [isFocused]);

  const Viewdetailsbooking = async () => {
    const token = await _getStorage('token');
    axios
      .get(BASE_URL + `/booking/${bookinID}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log('Viewdetailsbooking', res.data.result);
        setBookinviewdetails(res.data.result);
        setServiceId(res.data.result.serviceId);
        setPackageId(res.data.result.packageId);
        setVendorId(res.data.result.vendorId);
        setBookingId(res.data.result.bookingId);
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
        console.log('response rating', res.data);
        if (
          res.data.message == 'User have updated reviewed for this service' ||
          'User Reviewed successfully'
        ) {
          setModalVisible2(!modalVisible2);
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
        Toast.showWithGravity('Please comment', Toast.LONG, Toast.BOTTOM);
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
      });
  };

  const cancelBooking = async () => {
    const token = await _getStorage('token');
    Toast.showWithGravity('Please wait...', Toast.LONG, Toast.BOTTOM);

    let obj = {
      bookingId: bookingId,
    };
    console.log('bookingId', bookingId);

    axios
      .put(BASE_URL + `/booking/cancel`, obj, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        Toast.showWithGravity(res.data.message, Toast.LONG, Toast.BOTTOM);
        props.navigation.navigate('Home')
      })
      .catch(error => {
        console.log('cancel booking catch error', error);
        Toast.showWithGravity(
          error.response.data.message,
          Toast.LONG,
          Toast.BOTTOM,
        );
      });
  };

  return (
    <>
      <Header
        bgColor={Colors.darkOrange}
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
          <ActivityIndicator color={Colors.darkOrange} size="large" />
        </View>
      ) : (
        <ScrollView>
          <View style={Styles.cntrContainer}>
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
                    {bookinviewdetails.serviceName}
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
                      {bookinviewdetails.rating}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      top: 5,
                    }}>
                    <Text style={{color: Colors.black}}>INR</Text>
                    <Text
                      style={{
                        paddingHorizontal: 5,
                        color: Colors.black,
                        fontWeight: '700',
                      }}>
                      {bookinviewdetails.amountToBePaid}
                    </Text>
                    <Text style={{left: 20, color: Colors.black}}>30 min</Text>
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
            <View
              style={{
                borderBottomWidth: 1,
                marginHorizontal: 20,
                borderColor: '#D9D9D9',
                top: 10,
                height: height / 28,
              }}>
              <Text
                style={{color: '#FC8009', fontSize: 17, fontWeight: 'bold'}}>
                Booking Details
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 20,
              marginHorizontal: 20,
            }}>
            <Text
              style={{color: Colors.black, fontSize: 15, fontWeight: 'bold'}}>
              Booking ID
            </Text>
            <Text style={{color: Colors.darkGray, fontSize: 15}}>
              {bookinviewdetails.bookingId}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
              // flexWrap: 'wrap',
            }}>
            <Text
              style={{color: Colors.black, fontSize: 15, fontWeight: 'bold'}}>
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
              marginHorizontal: 20,
              marginVertical: 20,
            }}>
            <Text
              style={{color: Colors.black, fontSize: 15, fontWeight: 'bold'}}>
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
              marginHorizontal: 20,
            }}>
            <Text
              style={{color: Colors.black, fontSize: 15, fontWeight: 'bold'}}>
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
              marginHorizontal: 20,
              marginVertical: 20,
            }}>
            <Text
              style={{color: Colors.black, fontSize: 15, fontWeight: 'bold'}}>
              Date
            </Text>
            <Text style={{color: Colors.darkGray, fontSize: 15}}>
              {bookinviewdetails.bookingDate}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
            }}>
            <Text
              style={{color: Colors.black, fontSize: 15, fontWeight: 'bold'}}>
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
              marginHorizontal: 20,
              marginVertical: 20,
            }}>
            <Text
              style={{color: Colors.black, fontSize: 15, fontWeight: 'bold'}}>
              Status
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color:
                  bookinviewdetails.bookingStatus === 'Pending'
                    ? '#F1C114'
                    : bookinviewdetails.bookingStatus === 'Completed'
                    ? '#0EC01B'
                    : '#F21313',
              }}>
              {bookinviewdetails.bookingStatus}
            </Text>
          </View>

          {bookinviewdetails.bookingStatus === 'Completed' ? (
            <View>
              <TouchableOpacity
                onPress={() => setModalVisible2(true)}
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
              {bookinviewdetails.bookingStatus === 'Cancelled' ? //     Cancel //     style={{color: 'white', fontWeight: 'bold', fontSize: 16}}> //   <Text //   }}> //     marginVertical: 10, //     marginHorizontal: 15, //     borderRadius: 5, //     justifyContent: 'center', //     alignItems: 'center', //     // backgroundColor: '#0EC01B', //     height: height / 16, //   style={{ //   onPress={cancelBooking} // <TouchableOpacity
              //   </Text>
              // </TouchableOpacity>
              null : (
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('RescheduleBooking', bookinID)
                    }
                    style={{
                      height: height / 16,
                      backgroundColor: '#0EC01B',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 5,
                      marginHorizontal: 15,
                      // marginVertical,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}>
                      Reschedule
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={cancelBooking}
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
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}>
                       Cancel Booking
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
                 </ScrollView>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
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
                defaultRating={2}
                onFinishRating={rating => {
                  // Alert.alert('Star Rating: ' + JSON.stringify(rating));
                  setRating(JSON.stringify(rating));
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
const Styles = StyleSheet.create({});
