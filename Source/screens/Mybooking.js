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

const {height, width} = Dimensions.get('window');

function Mybooking({navigation}) {
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

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <HeaderDrawer
        Title="My Bookings"
        // onPress={() => navigation.toggleDrawer()}
        onPress={() => navigation.replace('DrowerNavigation')}
      /> */}
      <HeaderBack
        color={'#fff'}
        Title="My Bookings"
        // onPress={() => navigation.toggleDrawer()}
        onPress={() => navigation.replace('DrowerNavigation')}
      />
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
              marginTop: '60%',
              color: '#aaa',
            }}>
            {noData}
          </Text>
        ) : (
          bookdetails.map((value, index) => {
            // const utcMoment = moment(value.bookingDate);
            // const istMoment = utcMoment.tz(IST_TIMEZONE);
            // console.log(istMoment, 'its');
            const [day, month, year] = value.bookingDate.split('/');
            const monthAbbreviation = monthMappings[month];
            console.log(
              '====================value===================--',
              value.bookingDate,
            );

            return (
              <View
                key={index}
                style={{
                  height: 'auto',
                  // paddingVertical: '7%',
                  // height: '8%',
                  marginHorizontal: 10,
                  borderRadius: 7,
                  marginVertical: 8,
                  backgroundColor: Colors.white,
                  elevation: 5,
                }}>
                <View
                  style={{
                    backgroundColor: '#BCC4FF',
                    borderTopRightRadius: 7,
                    borderTopLeftRadius: 7,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
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
                      {/* {getDayFromDate(value.bookingDate)} */}
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
                      {/* <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: '500',
                          color: Colors.black,
                        }}>
                        Date
                      </Text>
                      <Text
                        style={{fontSize: 15, left: 5, color: Colors.black}}>
                        {value.bookingDate}
                      </Text>
                    </View> */}
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
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
      <InternetInfoall />
    </SafeAreaView>
  );
}

export default Mybooking;
