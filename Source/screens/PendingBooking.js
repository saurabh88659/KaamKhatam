import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../Assets/Constants/Colors';
import HeaderDrawer from '../ReusableComponents/HeaderDrawer';
import {_getStorage} from '../Assets/utils/storage/Storage';
import axios from 'axios';
import {BASE_URL} from '../Assets/utils/Restapi/Config';
import {useIsFocused} from '@react-navigation/native';
import InternetInfoall from '../Assets/utils/Handler/InternetInfoall';
import {useDispatch} from 'react-redux';
import moment from 'moment-timezone';
import {APIservice} from '../API/APIservice';
import HeaderBack from '../ReusableComponents/HeaderBack';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Toast from 'react-native-simple-toast';

const {height, width} = Dimensions.get('window');

function PendingBooking({navigation}) {
  const IST_TIMEZONE = 'Asia/Kolkata';
  const dispatch = useDispatch();
  const [bookdetails, setBookdetails] = useState([]);
  const [noData, setNoData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRfresh] = useState(false);

  const isFocused = useIsFocused();
  console.log('is focused', isFocused);
  useEffect(() => {
    setIsLoading(true);
    if (isFocused) {
      setNoData('');
      // UnpaidBookingDelete();
      APIservice.UnpaidBookingDelete();
      bookingDetails();
      console.log('runing -------33');
    }
  }, [isFocused]);

  setTimeout(() => {
    setRfresh(false);
  }, 3000);
  // console.log(bookdetails, '-------------bookdetails');

  // function handleBackButtonClick() {
  //   navigation.navigate('Home');
  //   return true;
  // }

  // useEffect(() => {
  //   BackHandler.addEventListener('Home', handleBackButtonClick);
  //   return () => {
  //     BackHandler.removeEventListener('Home', handleBackButtonClick);
  //   };
  // }, []);

  const bookingDetails = async () => {
    const token = await _getStorage('token');
    console.log(token);
    axios
      .get(BASE_URL + `/booking/allbookings`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        if (res.data.message == 'No Data Found') {
          setNoData(res.data.message);
        } else {
          setBookdetails(res.data.newData);
          const newData = res.data.newData;
          // Check if certain fields are present in the data
          const hasRequiredFields = newData.some(
            detail =>
              detail.bookingStatus === 'Confirmed' ||
              detail.bookingStatus === 'Pending' ||
              detail.bookingStatus === 'Transferred' ||
              detail.bookingStatus === 'Started' ||
              detail.bookingStatus === 'ImageUploaded' ||
              detail.bookingStatus === 'Internal' ||
              detail.bookingStatus === 'Rescheduled' ||
              detail.bookingStatus === 'RescheduledPending',
          );
          if (!hasRequiredFields) {
            setNoData('No data Found!');
          }
          console.log('======all Bookdetails 0000=====>', res.data.newData);
        }
        setIsLoading(false);
        setRfresh(false);
      })
      .catch(error => {
        console.log('booking details catch error', error);
        setIsLoading(false);
      });
  };

  const getDayFromDate = date => {
    let d = new Date('2023/09/28');
    const parseDate = Date.parse(date);
    console.log('Date: ', date);
  };
  const monthMappings = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec',
  };

  // const UnpaidBookingDelete = async () => {
  //   const token = await _getStorage('token');
  //   console.log(token);
  //   axios
  //     .delete(BASE_URL + `/booking/deleteMany`, {
  //       headers: {Authorization: `Bearer ${token}`},
  //     })
  //     .then(res => {
  //       console.log('Booking has been deleted', res.data);
  //     })
  //     .catch(error => {
  //       console.log('UnpaidBookingDelete  catch error', error.response.data);
  //     });
  // };

  const AddToCart = async data => {
    console.log('data---', data);
    const token = await _getStorage('token');
    console.log('token---------->>', token);
    // console.log(serviceID, silverID);
    let objID = {
      serviceId: data.serviceId,
      packageId: data.packageId,
      category: data.categoryName,
    };
    console.log('AddToCart obj======', objID);
    axios
      .post(BASE_URL + `/cart/${data.packageName}`, objID, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(rep => {
        console.log('AddToCart===========>', rep.data);
        if (rep.data) {
          navigation.navigate('MyCartScreen');
        }
        Toast.showWithGravity(rep.data.message, Toast.LONG, Toast.BOTTOM);
      })
      .catch(error => {
        console.log('AddToCart ERROR==========>', error);
        Toast.showWithGravity(
          error?.response?.data?.message,
          Toast.SHORT,
          Toast.BOTTOM,
        );
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <HeaderDrawer
          Title="My Bookings"
          // onPress={() => navigation.toggleDrawer()}
          onPress={() => navigation.replace('DrowerNavigation')}
        /> */}
      {/* <HeaderBack
        color={'#fff'}
        Title="My Bookings"
        // onPress={() => navigation.toggleDrawer()}
        onPress={() => navigation.replace('DrowerNavigation')}
      /> */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={bookingDetails} />
        }>
        {isLoading === true ? (
          <ActivityIndicator
            color="#FFA034"
            size="large"
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: hp('37%'),
            }}
          />
        ) : noData ? (
          <Text
            style={{
              textAlign: 'center',
              marginTop: '75%',
              color: '#aaa',
              fontSize: 20,
              fontWeight: '700',
            }}>
            {noData}
          </Text>
        ) : (
          // <Text
          //   style={{
          //     textAlign: 'center',
          //     marginTop: '60%',
          //     color: '#aaa',
          //   }}>
          //   {noData}
          // </Text>
          bookdetails
            .filter(
              detail =>
                detail.bookingStatus === 'Confirmed' ||
                detail.bookingStatus === 'Pending' ||
                detail.bookingStatus === 'Transferred' ||
                detail.bookingStatus === 'Started' ||
                detail.bookingStatus === 'ImageUploaded' ||
                detail.bookingStatus === 'Internal' ||
                detail.bookingStatus === 'Rescheduled' ||
                detail.bookingStatus === 'RescheduledPending',
            )
            .map((value, index) => {
              const [day, month, year] = value.bookingDate.split('/');
              console.log(
                '====================value===================--',
                value,
              );

              return (
                <View
                  key={index}
                  style={{
                    height: 'auto',
                    // paddingVertical: '7%',
                    // height: 200,
                    marginHorizontal: 10,
                    borderRadius: 7,
                    marginVertical: 8,
                    backgroundColor: Colors.white,
                    elevation: 5,
                    paddingBottom: 5,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#BCC4FF',
                      borderTopRightRadius: 7,
                      borderTopLeftRadius: 7,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: 15,
                      alignItems: 'center',
                      padding: 3,
                    }}>
                    <Text style={{fontWeight: 'bold', color: Colors.black}}>
                      Booking ID
                    </Text>
                    <Text style={{fontWeight: 'bold', color: Colors.black}}>
                      {value.uniqueId}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      borderBottomColor: Colors.darkGray,
                      borderBottomWidth: 1,
                      marginHorizontal: 15,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        // paddingHorizontal: 15,
                        marginTop: 10,
                        // marginHorizontal: 15,
                        // backgroundColor: 'red',
                      }}>
                      <Text
                        style={{
                          color:
                            value.bookingStatus === 'Pending'
                              ? '#5E2DC4'
                              : value.bookingStatus === 'Confirmed'
                              ? '#0EC01B'
                              : value.bookingStatus === 'Completed'
                              ? '#0EC01B'
                              : '#F21313',
                          fontSize: 16,
                          fontWeight: '700',
                          textTransform: 'uppercase',
                        }}>
                        {value.bookingStatus === 'RescheduledPending'
                          ? 'Rescheduled Pending'
                          : value.bookingStatus}
                      </Text>
                      <Text
                        style={{
                          color: Colors.black,
                          fontSize: 16,
                          fontWeight: '400',
                          marginTop: 5,
                        }}>
                        {value.serviceName}
                      </Text>
                      <Text
                        style={{
                          color: Colors.darkGray,
                          fontSize: 14,
                          fontWeight: '400',
                          marginTop: 2,
                          marginBottom: 20,
                        }}>
                        {moment(value.bookingDate, 'DD/MM/YYYY').format(
                          'MMM D, YYYY',
                        )}{' '}
                        at {value.time}
                      </Text>
                      {/* <Text
                        style={{
                          color: Colors.darkGray,
                          fontSize: 14,
                          fontWeight: '400',
                          marginTop: 2,
                          marginBottom: 20,
                        }}>
                        {value.time}
                      </Text> */}
                    </View>

                    <TouchableOpacity
                      style={{
                        // backgroundColor: 'red',
                        height: 90,
                        width: 50,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                      }}
                      onPress={() =>
                        navigation.navigate('Viewdetails', value.bookingId)
                      }>
                      <Fontisto
                        name="angle-right"
                        size={20}
                        color={Colors.darkGray}
                      />
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      // backgroundColor: 'green',
                      height: 60,
                      alignItems: 'center',
                      marginHorizontal: 15,
                    }}>
                    <Text style={{color: Colors.black, fontSize: 16}}>
                      Ammount Paid ₹{value.amountWithGst}
                    </Text>
                    <TouchableOpacity
                      onPress={() => AddToCart(value)}
                      style={{
                        height: 38,
                        width: 100,
                        justifyContent: 'center',
                        // backgroundColor: 'red',
                        alignItems: 'center',
                        borderRadius: 4,
                        borderColor: Colors.black,
                        borderWidth: 0.7,
                      }}>
                      <Text
                        style={{
                          color: Colors.black,
                          fontSize: 14,
                          fontWeight: '800',
                        }}>
                        Book again
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* <View
                    style={{amountWithGst
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '25%',
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '600',
                          color: Colors.black,
                        }}>
                        {day}
                      </Text>
                      <Text
                        style={{
                          fontSize: 26,
                          fontWeight: 'bold',
                          color: Colors.black,
                        }}>
                        {month}
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '600',
                          color: Colors.black,
                        }}>
                        {year}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '45%',
                        height: '100%',
                        padding: 20,
                        paddingHorizontal: 10,
                        borderRightColor: Colors.grayShade,
                        borderRightWidth: 1,
                      }}>
                      <View>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: '900',
                            color: '#5E2DC4',
                          }}>
                          {value.serviceName}
                        </Text>
                        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: '500',
                              color: Colors.black,
                              // right: 5,
                            }}>
                            Time slot:
                          </Text>
                          <Text style={{fontSize: 13.5, color: Colors.black}}>
                            {value.time}
                          </Text>
                        </View>
                       
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: '500',
                              color: Colors.black,
                            }}>
                            Price:
                          </Text>
                          <Text
                            style={{fontSize: 15, color: Colors.black, left: 4}}>
                            {'\u20B9'}
                            {value.amountToBePaid}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        padding: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '30%',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 13,
                          fontWeight: '700',
                          top: 20,
                          textTransform: 'uppercase',
                          color: '#0EC01B',
                          color:
                            value.bookingStatus === 'Pending'
                              ? '#5E2DC4'
                              : value.bookingStatus === 'Confirmed'
                              ? '#0EC01B'
                              : value.bookingStatus === 'Completed'
                              ? '#0EC01B'
                              : '#F21313',
                        }}>
                        {value.bookingStatus}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('Viewdetails', value.bookingId)
                        }
                        style={{
                          backgroundColor: Colors.purple,
                          padding: 5,
                          // top: 22,
                          borderRadius: 3,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: 'auto',
                          marginBottom: 10,
                        }}>
                        <Text style={{color: Colors.white, fontWeight: '500'}}>
                          View Details
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View> */}
                </View>
              );
            })
        )}
      </ScrollView>
      <InternetInfoall />
    </SafeAreaView>
  );
}

export default PendingBooking;
