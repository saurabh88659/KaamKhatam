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
  const [_Isdate, set_Isdate] = useState('');

  // const TimeSlot = [
  //   {
  //     id: 0,
  //     startTime: '09:00 AM',
  //     endTime: '10:00 AM',
  //   },
  //   {
  //     id: 1,
  //     startTime: '10:00 AM',
  //     endTime: '11:00 AM',
  //   },
  //   {
  //     id: 2,
  //     startTime: '11:00 AM',
  //     endTime: '12:00 PM',
  //   },
  //   {
  //     id: 3,
  //     startTime: '12:00 PM',
  //     endTime: '01:00 PM',
  //   },
  //   {
  //     id: 4,
  //     startTime: '01:00 PM',
  //     endTime: '02:00 PM',
  //   },
  //   {
  //     id: 5,
  //     startTime: '02:00 PM',
  //     endTime: '03:00 PM',
  //   },
  //   {
  //     id: 6,
  //     startTime: '03:00 PM',
  //     endTime: '04:00 PM',
  //   },
  //   {
  //     id: 7,
  //     startTime: '04:00 PM',
  //     endTime: '05:00 PM',
  //   },
  //   {
  //     id: 8,
  //     startTime: '05:00 PM',
  //     endTime: '06:00 PM',
  //   },
  //   {
  //     id: 9,
  //     startTime: '06:00 PM',
  //     endTime: '07:00 PM',
  //   },
  //   {
  //     id: 10,
  //     startTime: '07:00 PM',
  //     endTime: '08:00 PM',
  //   },
  //   {
  //     id: 11,
  //     startTime: '08:00 PM',
  //     endTime: '09:00 PM',
  //   },
  // ];

  const [timeSlots, setTimeSlots] = useState([
    {startTime: '09:00 AM', endTime: '10:00 AM', id: 1},
    {startTime: '10:00 AM', endTime: '11:00 AM', id: 2},
    {startTime: '11:00 AM', endTime: '12:00 PM', id: 3},
    {startTime: '01:00 PM', endTime: '02:00 PM', id: 4},
    {startTime: '02:00 PM', endTime: '03:00 PM', id: 5},
    {startTime: '03:00 PM', endTime: '04:00 PM', id: 6},
    {startTime: '04:00 PM', endTime: '05:00 PM', id: 7},
    {startTime: '05:00 PM', endTime: '06:00 PM', id: 8},
    {startTime: '06:00 PM', endTime: '07:00 PM', id: 9},
    {startTime: '07:00 PM', endTime: '08:00 PM', id: 10},
    {startTime: '08:00 PM', endTime: '09:00 PM', id: 11},
    {startTime: '09:00 PM', endTime: '10:00 PM', id: 12},
  ]);

  var currentDate = moment().format('DD/MM/YYYY');
  const getCurrentTime = () => {
    const date = new Date();

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
    AsyncStorage.getItem('Date').then(value => setGetDate(value));
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    const formattedDate = `${('0' + date.getDate()).slice(-2)}/${(
      '0' +
      (date.getMonth() + 1)
    ).slice(-2)}/${date.getFullYear()}`;

    set_Isdate(formattedDate);

    hideDatePicker();
  };

  const conBooking = async () => {
    const token = await _getStorage('token');
    let book = {
      cartId: cartID?.cartId,
      start: startTime,
      end: endTime,
      bookingDate: _Isdate,
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
          'add booking catch error---+++++++++++=>',
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

    let dt = _Isdate.split('/');
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

        Toast.showWithGravity(res.data?.message, Toast.LONG, Toast.BOTTOM);
        conBooking();
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
        bgColor={Colors.topNavbarColor}
        color={Colors.white}
        title="Date & Time"
        onPress={() => props.navigation.goBack('Home')}
      />
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
          <Text style={{color: Colors.black}}>{_Isdate}</Text>
          <View>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              format="DD-MM-YYYY"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              minimumDate={new Date()}
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
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{}}>
        <View
          style={{
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            flexDirection: 'row',
            marginHorizontal: 20,
          }}>
          {timeSlots.map((timeSlot, index) => {
            const currentTime = getCurrentTime();

            if (timeSlot.startTime > currentTime && currentDate == _Isdate) {
              return (
                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    marginTop: 20,
                    width: 150,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor:
                      selectionTime === timeSlot.id ? '#0EC01B' : 'white',
                  }}
                  // onPress={() =>
                  //   console.log(`${timeSlot.startTime} - ${timeSlot.endTime}`)
                  // }
                  onPress={() => {
                    setSelectionTime(timeSlot.id);
                    setEndTime(timeSlot.endTime);
                    setStartTime(`${timeSlot.startTime} `);
                    console.log(timeSlot.id);
                  }}
                  disabled={currentTime ? true : false}>
                  <Text
                    style={{
                      color: currentTime ? Colors.white : Colors.purple,
                    }}>
                    {/* {`${timeSlot.startTime} - ${timeSlot.endTime}`} */}
                    {`${timeSlot.startTime} `} - {timeSlot.endTime}
                  </Text>
                </TouchableOpacity>
              );
            }

            return (
              <View key={index}>
                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    marginTop: 20,
                    width: 150,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor:
                      selectionTime === timeSlot.id ? '#583592' : Colors.white,
                    borderRadius: 7,
                  }}
                  // onPress={() =>
                  //   console.log(`${timeSlot.startTime} - ${timeSlot.endTime}`)
                  // }
                  onPress={() => {
                    setSelectionTime(timeSlot.id);
                    setEndTime(timeSlot.endTime);
                    setStartTime(timeSlot.startTime);
                    console.log(timeSlot.endTime, timeSlot.startTime);
                  }}>
                  <Text
                    style={{
                      color:
                        selectionTime === timeSlot.id
                          ? Colors.white
                          : Colors.black,
                    }}>
                    {/* {`${timeSlot.startTime} - ${timeSlot.endTime}`} */}
                    {`${timeSlot.startTime} `} - {timeSlot.endTime}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        {/* <View
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
        </View> */}
      </ScrollView>
      <TouchableOpacity
        onPress={chackDate}
        // disabled={isdate ? false : true}
        style={{
          backgroundColor: _Isdate ? Colors.purple : Colors.lightGray,
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
    </SafeAreaView>
  );
};

export default TimeAndSlot;
