import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../Assets/Constants/Colors';
import Header from '../ReusableComponents/Header';
import {_getStorage} from '../Assets/utils/storage/Storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment/moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../Assets/utils/Restapi/Config';
import Toast from 'react-native-simple-toast';

const {height, width} = Dimensions.get('window');

const TimeAndSlot = props => {
  const [index, setIndex] = useState(1);
  const [index2, setIndex2] = useState('');
  const [selectionTime, setSelectionTime] = useState('');
  // const [timeslot, setTimeslot] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isdate, setIsdate] = useState('');
  const [getDate, setGetDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [iseeror, setIserror] = useState('');
  const cartID = props.route.params;

  const TimeSlot = [
    {
      id: 0,
      startTime: '09:00 AM',
      endTime: '10:00 AM',
    },
    {
      id: 1,
      startTime: '10:00 AM',
      endTime: '11:00 AM',
    },
    {
      id: 2,
      startTime: '11:00 AM',
      endTime: '12:00 PM',
    },
    {
      id: 3,
      startTime: '12:00 PM',
      endTime: '01:00 PM',
    },
    {
      id: 4,
      startTime: '01:00 PM',
      endTime: '02:00 PM',
    },
    {
      id: 5,
      startTime: '02:00 PM',
      endTime: '03:00 PM',
    },
    {
      id: 6,
      startTime: '03:00 PM',
      endTime: '04:00 PM',
    },
    {
      id: 7,
      startTime: '04:00 PM',
      endTime: '05:00 PM',
    },
    {
      id: 8,
      startTime: '05:00 PM',
      endTime: '06:00 PM',
    },
    {
      id: 9,
      startTime: '06:00 PM',
      endTime: '07:00 PM',
    },
    {
      id: 10,
      startTime: '07:00 PM',
      endTime: '08:00 PM',
    },
    {
      id: 11,
      startTime: '08:00 PM',
      endTime: '09:00 PM',
    },
  ];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
    AsyncStorage.getItem('Date').then(value => setGetDate(value));
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = date => {
    // let c =
    //   (date.getMonth() > 8
    //     ? date.getMonth() + 1
    //     : '0' + (date.getMonth() + 1)) +
    //   '/' +
    //   (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) +
    //   '/' +
    //   date.getFullYear();

    const formattedDate = `${('0' + date.getDate()).slice(-2)}/${(
      '0' +
      (date.getMonth() + 1)
    ).slice(-2)}/${date.getFullYear()}`;

    setIsdate(formattedDate);

    hideDatePicker();
  };

  const conBooking = async () => {
    const token = await _getStorage('token');
    let book = {
      cartId: cartID?.cartId,
      start: startTime,
      end: endTime,
      bookingDate: isdate,
    };
    console.log('book', book);

    axios
      .post(BASE_URL + `/booking`, book, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log('add booking', res.data);
        let bookinId = res?.data?.bookingId;
        let price = res?.data?.total;
        if (res.data) {
          props.navigation.navigate('PaymentScreen', {bookinId, price});
        } else {
          console.log('else conditions');
        }
      })
      .catch(error => {
        console.log(
          'add booking catch error---',
          error?.response?.data?.message,
        );
        setIserror(error?.response?.data?.message);
        if (error.response?.data?.message == iseeror) {
          Alert.alert('Booking Already Present, Please Clear You Cart having', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => props.navigation.goBack()},
          ]);
        }
      });
  };

  const chackDate = async () => {
    const token = await _getStorage('token');
    console.log('token', token);
    Toast.showWithGravity('Please wait...', Toast.LONG, Toast.BOTTOM);

    let dt = isdate.split('/');
    let d = `${dt[1]}/${dt[0]}/${dt[2]}`;
    const obj = {
      // timeSlot: startTime + '' + endTime,
      timeSlot: `${startTime}-${endTime}`,
      bookingDate: d,
    };
    console.log('obj', obj);
    axios
      .post(BASE_URL + `/booking/verifyTimeSlot`, obj, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log('chackDate', res.data);
        conBooking();
        Toast.showWithGravity(res.data?.message, Toast.LONG, Toast.BOTTOM);
      })
      .catch(error => {
        console.log('chackdate error', error.response.data.message);
        Toast.showWithGravity(
          error.response?.data?.message,
          Toast.LONG,
          Toast.BOTTOM,
        );
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        bgColor={Colors.darkOrange}
        color={Colors.white}
        title="Date & Time"
        onPress={() => props.navigation.goBack('Home')}
      />

      {/* <View style={{alignItems: 'center', marginVertical: 20}}>
        <Text
          style={{fontSize: 16, fontWeight: 'bold', color: Colors.lightGray}}>
          When would you like your service?
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{marginVertical: 8}}>
          <Image
            source={require('../Assets/Images/left.png')}
            style={{height: 35, width: 35}}
          />
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{margin: 5}}>
            <TouchableOpacity
              onPress={() => {
                setIndex2(0);
              }}
              style={{
                height: 43,
                width: 43,
                backgroundColor: index2 === 0 ? '#0EC01B' : 'white',
                borderWidth: index2 === 0 ? 0 : 1,
                borderColor: 'grey',
                borderRadius: 5,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: index2 === 0 ? 'white' : 'black',
                  fontWeight: '500',
                  marginVertical: 3,
                }}>
                Fri
              </Text>
              <Text
                style={{
                  color: index2 === 0 ? 'white' : 'black',
                  fontWeight: '500',
                  top: -3,
                }}>
                23
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{margin: 5}}>
            <TouchableOpacity
              onPress={() => {
                setIndex2(1);
              }}
              style={{
                height: 43,
                width: 43,
                backgroundColor: index2 === 1 ? '#0EC01B' : 'white',
                borderWidth: index2 === 1 ? 0 : 1,
                borderColor: 'grey',

                borderRadius: 5,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: '500',
                  marginVertical: 3,
                  color: index2 === 1 ? 'white' : 'black',
                }}>
                Sat
              </Text>
              <Text
                style={{
                  color: index2 === 1 ? 'white' : 'black',
                  fontWeight: '500',
                  top: -3,
                }}>
                24
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{margin: 5}}>
            <TouchableOpacity
              onPress={() => {
                setIndex2(2);
              }}
              style={{
                height: 43,
                width: 43,
                backgroundColor: index2 === 2 ? '#0EC01B' : 'white',
                borderWidth: index2 === 2 ? 0 : 1,
                borderColor: 'grey',
                borderRadius: 5,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: index2 === 2 ? 'white' : 'black',
                  fontWeight: '500',
                  marginVertical: 3,
                }}>
                Sun
              </Text>
              <Text
                style={{
                  color: index2 === 2 ? 'white' : 'black',
                  fontWeight: '500',
                  top: -3,
                }}>
                25
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{margin: 5}}>
            <TouchableOpacity
              onPress={() => {
                setIndex2(3);
              }}
              style={{
                height: 43,
                width: 43,
                backgroundColor: index2 === 3 ? '#0EC01B' : 'white',
                borderWidth: index2 === 3 ? 0 : 1,
                borderColor: 'grey',
                borderRadius: 5,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: index2 === 3 ? 'white' : 'black',
                  fontWeight: '500',
                  marginVertical: 3,
                }}>
                Mon
              </Text>
              <Text
                style={{
                  color: index2 === 3 ? 'white' : 'black',
                  fontWeight: '500',
                  top: -3,
                }}>
                26
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{margin: 5}}>
            <TouchableOpacity
              onPress={() => {
                setIndex2(4);
              }}
              style={{
                height: 43,
                width: 43,
                backgroundColor: index2 === 4 ? '#0EC01B' : 'white',
                borderWidth: index2 === 4 ? 0 : 1,
                borderColor: 'grey',
                borderRadius: 5,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: index2 === 4 ? 'white' : 'black',
                  fontWeight: '500',
                  marginVertical: 3,
                }}>
                Tue
              </Text>
              <Text
                style={{
                  color: index2 === 4 ? 'white' : 'black',
                  fontWeight: '500',
                  top: -3,
                }}>
                27
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{margin: 5}}>
            <TouchableOpacity
              onPress={() => {
                setIndex2(5);
              }}
              style={{
                height: 43,
                width: 43,
                backgroundColor: index2 === 5 ? '#0EC01B' : 'white',
                borderWidth: index2 === 5 ? 0 : 1,
                borderColor: 'grey',
                borderRadius: 5,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: index2 === 5 ? 'white' : 'black',
                  fontWeight: '500',
                  marginVertical: 3,
                }}>
                Wed
              </Text>
              <Text
                style={{
                  color: index2 === 5 ? 'white' : 'black',
                  fontWeight: '500',
                  top: -3,
                }}>
                28
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={{marginVertical: 15, marginHorizontal: 10}}>
          <Image
            source={require('../Assets/Images/right-arrow.png')}
            style={{height: 20, width: 20}}
          />
        </View>
      </View> */}
      <View
        style={{
          height: 45,
          borderWidth: 1,
          marginHorizontal: 20,
          margin: 10,
          borderRadius: 6,
          justifyContent: 'center',
          paddingHorizontal: 13,
          borderColor: 'grey',
        }}>
        <TouchableOpacity
        onPress={showDatePicker}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: Colors.black}}>{isdate}</Text>
          <View>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              format="DD-MM-YYYY"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <TouchableOpacity onPress={showDatePicker}>
              <FontAwesome5Icon
                name="calendar-alt"
                color="#a9a9a9"
                size={20}
                style={{marginRight: '1%'}}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView
        // horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}>
          {TimeSlot.map((timeSlot, index) => (
            <View key={index}>
              <TouchableOpacity
                onPress={() => {
                  setSelectionTime(timeSlot.id);
                  setEndTime(timeSlot.endTime);
                  setStartTime(timeSlot.startTime);
                }}
                style={{
                  flexDirection: 'row',
                  backgroundColor:
                    selectionTime === index ? '#0EC01B' : 'white',
                  paddingVertical: 10,
                  marginVertical: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 7,
                  marginHorizontal: 20,
                  width: 140,
                }}>
                <Text
                  style={{
                    color:
                      selectionTime === index ? Colors.white : Colors.black,
                    fontSize: 13,
                    fontWeight: '500',
                  }}>
                  {`${timeSlot.startTime} `}
                </Text>

                <Text
                  style={{
                    color:
                      selectionTime === index ? Colors.white : Colors.black,
                    fontSize: 13,
                    fontWeight: '500',
                  }}>
                  {timeSlot.endTime}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={chackDate}
        // disabled={isdate ? false : true}
        style={{
          backgroundColor: isdate ? Colors.darkGreen : Colors.lightGray,
          justifyContent: 'center',
          borderRadius: 7,
          paddingHorizontal: 20,
          paddingVertical: 10,
          alignItems: 'center',
          marginHorizontal: 10,
        }}>
        <Text style={{alignSelf: 'center', color: 'white', fontWeight: 'bold'}}>
          Proceed to pay
        </Text>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
        <View>
          <Text style={{fontSize: 13, color: 'grey'}}>
            By proceeding you accept the latest versions of our
          </Text>
        </View>
        <TouchableOpacity>
          <Text style={{fontSize: 13, color: 'black'}}>T&C,</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{fontSize: 13, color: 'black'}}>Privacy policy</Text>
        </TouchableOpacity>
        <View>
          <Text style={{fontSize: 13, color: 'grey'}}>and</Text>
        </View>
        <TouchableOpacity>
          <Text style={{fontSize: 13, color: 'black'}}>Cancellaon</Text>
        </TouchableOpacity>
      </View>

      {/* <Text
        style={{textAlign: 'center', marginVertical: 10, fontWeight: '500'}}>
        Select Time
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            borderWidth: 2,
            height: height / 4.9,
            marginHorizontal: 20,
            borderRadius: 6,
            borderColor: '#a86b02',
            marginVertical: 10,
          }}>
          <Text
            style={{
              textAlign: 'center',
              marginVertical: 5,
              fontWeight: '500',
              color: Colors.black,
            }}>
            Morning
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
              marginVertical: 10,
            }}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setIndex(0);
                }}
                style={{
                  borderWidth: index === 0 ? 0 : 1,
                  borderColor: 'grey',
                  height: height / 20,
                  width: width / 3,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,

                  // backgroundColor: 'white',
                  backgroundColor: index === 0 ? '#0EC01B' : 'white',
                }}>
                <Text
                  style={{color: index === 0 ? Colors.white : Colors.black}}>
                  08:00-9:00 AM
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setIndex(1);
                }}
                style={{
                  borderWidth: index === 1 ? 0 : 1,
                  height: height / 20,
                  width: width / 3,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                  borderColor: 'grey',
                  // backgroundColor: 'white',
                  backgroundColor: index === 1 ? '#0EC01B' : 'white',
                }}>
                <Text
                  style={{color: index === 1 ? Colors.white : Colors.black}}>
                  08:00-9:00 AM
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
              marginVertical: 10,
            }}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setIndex(2);
                }}
                style={{
                  borderWidth: index === 2 ? 0 : 1,
                  height: height / 20,
                  width: width / 3,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                  borderColor: 'grey',
                  // backgroundColor: 'white',
                  backgroundColor: index === 2 ? '#0EC01B' : 'white',
                }}>
                <Text
                  style={{color: index === 2 ? Colors.white : Colors.black}}>
                  08:00-9:00 AM
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setIndex(3);
                }}
                style={{
                  borderWidth: index === 3 ? 0 : 1,
                  height: height / 20,
                  width: width / 3,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                  borderColor: 'grey',
                  // backgroundColor: 'white',
                  backgroundColor: index === 3 ? '#0EC01B' : 'white',
                }}>
                <Text
                  style={{color: index === 3 ? Colors.white : Colors.black}}>
                  08:00-9:00 AM
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            borderWidth: 2,
            height: height / 4.9,
            marginHorizontal: 20,
            borderRadius: 6,
            borderColor: '#0e9ec9',
            marginVertical: 20,
          }}>
          <Text
            style={{
              textAlign: 'center',
              marginVertical: 5,
              fontWeight: '500',
              color: Colors.black,
            }}>
            Afternoon
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
              marginVertical: 10,
            }}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setIndex(4);
                }}
                style={{
                  borderWidth: index === 4 ? 0 : 1,
                  height: height / 20,
                  width: width / 3,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                  borderColor: 'grey',
                  // backgroundColor: 'white',
                  backgroundColor: index === 4 ? '#0EC01B' : 'white',
                }}>
                <Text
                  style={{color: index === 4 ? Colors.white : Colors.black}}>
                  12:00-1:00 PM
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setIndex(5);
                }}
                style={{
                  borderWidth: index === 5 ? 0 : 1,
                  height: height / 20,
                  width: width / 3,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                  borderColor: 'grey',
                  // backgroundColor: 'white',
                  backgroundColor: index === 5 ? '#0EC01B' : 'white',
                }}>
                <Text
                  style={{color: index === 5 ? Colors.white : Colors.black}}>
                  01:00-02:00 PM
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
              marginVertical: 10,
            }}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setIndex(6);
                }}
                style={{
                  borderWidth: index === 6 ? 0 : 1,
                  height: height / 20,
                  width: width / 3,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                  borderColor: 'grey',
                  // backgroundColor: 'white',
                  backgroundColor: index === 6 ? '#0EC01B' : 'white',
                }}>
                <Text
                  style={{color: index === 6 ? Colors.white : Colors.black}}>
                  02:00-03:00 PM
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setIndex(7);
                }}
                style={{
                  borderWidth: index === 7 ? 0 : 1,
                  height: height / 20,
                  width: width / 3,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                  borderColor: 'grey',
                  // backgroundColor: 'white',
                  backgroundColor: index === 7 ? '#0EC01B' : 'white',
                }}>
                <Text
                  style={{color: index === 7 ? Colors.white : Colors.black}}>
                  03:00-04:00 PM
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            borderWidth: 2,
            height: height / 4.9,
            marginHorizontal: 20,
            borderRadius: 6,
            borderColor: '#e60939',
            marginVertical: 20,
          }}>
          <Text
            style={{
              textAlign: 'center',
              marginVertical: 5,
              fontWeight: '500',
              color: Colors.black,
            }}>
            Evening
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
              marginVertical: 10,
            }}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setIndex(8);
                }}
                style={{
                  borderWidth: index === 8 ? 0 : 1,
                  height: height / 20,
                  width: width / 3,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                  borderColor: 'grey',
                  // backgroundColor: 'white',
                  backgroundColor: index === 8 ? '#0EC01B' : 'white',
                }}>
                <Text
                  style={{color: index === 8 ? Colors.white : Colors.black}}>
                  05:00-06:00 PM
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setIndex(9);
                }}
                style={{
                  borderWidth: index === 10 ? 0 : 1,
                  height: height / 20,
                  width: width / 3,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                  borderColor: 'grey',
                  // backgroundColor: 'white',
                  backgroundColor: index === 9 ? '#0EC01B' : 'white',
                }}>
                <Text
                  style={{color: index === 9 ? Colors.white : Colors.black}}>
                  06:00-07:00 PM
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
              marginVertical: 10,
            }}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setIndex(10);
                }}
                style={{
                  borderWidth: index === 10 ? 0 : 1,
                  height: height / 20,
                  width: width / 3,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                  borderColor: 'grey',
                  // backgroundColor: 'white',
                  backgroundColor: index === 10 ? '#0EC01B' : 'white',
                }}>
                <Text
                  style={{color: index === 10 ? Colors.white : Colors.black}}>
                  07:00-08:00 PM
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setIndex(11);
                }}
                style={{
                  borderWidth: index === 11 ? 0 : 1,
                  height: height / 20,
                  width: width / 3,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                  borderColor: 'grey',
                  // backgroundColor: 'white',
                  backgroundColor: index === 11 ? '#0EC01B' : 'white',
                }}>
                <Text
                  style={{color: index === 11 ? Colors.white : Colors.black}}>
                  08:00-09:00 PM
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          borderWidth: 1,
          borderColor: 'grey',
          borderBottomWidth: 1,
          height: 90,
        }}>
        <View
          style={{
            marginVertical: 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          <View>
            <Text style={{color: Colors.black}}>$547</Text>
            <TouchableOpacity>
              <Text style={{fontWeight: '500', color: 'blue'}}>
                View Details
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={conBooking}
            style={{
              backgroundColor: '#09bd39',
              justifyContent: 'center',
              borderRadius: 7,
              paddingHorizontal: 20,
              paddingVertical: 10,
              alignItems: 'center',
            }}>
            <Text
              style={{alignSelf: 'center', color: 'white', fontWeight: 'bold'}}>
              Proceed to pay
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View>
            <Text style={{fontSize: 10, color: 'grey'}}>
              By proceeding you accept the latest versions of our
            </Text>
          </View>
          <TouchableOpacity>
            <Text style={{fontSize: 10, color: 'black'}}>T&C,</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{fontSize: 10, color: 'black'}}>Privacy policy</Text>
          </TouchableOpacity>
          <View>
            <Text style={{fontSize: 10, color: 'grey'}}>and</Text>
          </View>
          <TouchableOpacity>
            <Text style={{fontSize: 10, color: 'black'}}>Cancellaon</Text>
          </TouchableOpacity>
        </View>
      </View> */}
    </SafeAreaView>
  );
};

export default TimeAndSlot;
