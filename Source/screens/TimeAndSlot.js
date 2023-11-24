import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Alert,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../Assets/Constants/Colors';
import Header from '../ReusableComponents/Header';
import {_getStorage} from '../Assets/utils/storage/Storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import moment, {duration} from 'moment/moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../Assets/utils/Restapi/Config';
import Toast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setBookingID} from '../features/updatedata/update.reducer';

const {height, width} = Dimensions.get('window');
const TimeAndSlot = props => {
  const dispatch = useDispatch();
  const cartId = useSelector(state => state.updateState.cartId);
  const totalServiceAmount = useSelector(
    state => state.updateState.totalServiceAmount,
  );
  // console.log('=========cartId (time and slot)=====', cartId);
  const [index, setIndex] = useState(1);
  const [index2, setIndex2] = useState('');
  const [selectionTime, setSelectionTime] = useState('');
  console.log('selectionTime===', selectionTime);
  // const [timeslot, setTimeslot] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isdate, setIsdate] = useState('');
  const [getDate, setGetDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [iseeror, setIserror] = useState('');
  const orderLoaction = props.route.params.value;
  console.log('orderLoaction (time and slot params---)=====', orderLoaction);
  const navigation = useNavigation();
  // console.log('hhhhhhhhhhhhhhh', cartID);
  const [_Isdate, set_Isdate] = useState('');
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [username, setUsername] = useState(null);
  const [userflatorStreet, setUserflatorStreet] = useState(null);
  const [userlocation, setUserlocation] = useState(null);
  const [userSaveas, setUserSaveas] = useState(null);
  console.log('========_Isdate=========', _Isdate);
  console.log(selectedTimeFrame, 'selectedTimeFrame====');
  useEffect(() => {
    // getUserAddress();
  }, []);

  const getUserAddress = async () => {
    console.log('hello');
    try {
      console.log('===============');
      const location = await AsyncStorage.getItem('location');
      setUserlocation(location);
      const flatorStreet = await AsyncStorage.getItem('flatorStreet');
      setUserflatorStreet(flatorStreet);
      const name = await AsyncStorage.getItem('name');
      setUsername(name);
      const saveas = await AsyncStorage.getItem('saveas');
      setUserSaveas(saveas);
      if (username && userflatorStreet && userlocation !== null) {
        console.log(
          'get address from asyctorage',
          username,
          userlocation,
          userflatorStreet,
        );
      }
    } catch (error) {
      // Error retrieving data
    }
  };

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

  let morningTimeSlots = [
    {startTime: '08:00 AM', endTime: '09:00 AM', id: 1},
    {startTime: '09:00 AM', endTime: '10:00 AM', id: 2},
    {startTime: '10:00 AM', endTime: '11:00 AM', id: 3},
    {startTime: '11:00 AM', endTime: '12:00 PM', id: 4},
  ];

  let afternoonTimeSlots = [
    {startTime: '12:00 PM', endTime: '01:00 PM', id: 5},
    {startTime: '01:00 PM', endTime: '02:00 PM', id: 6},
    {startTime: '02:00 PM', endTime: '03:00 PM', id: 7},
    {startTime: '03:00 PM', endTime: '04:00 PM', id: 8},
  ];
  let eveningTimeSlots = [
    {startTime: '04:00 PM', endTime: '05:00 PM', id: 9},
    {startTime: '05:00 PM', endTime: '06:00 PM', id: 10},
    {startTime: '06:00 PM', endTime: '07:00 PM', id: 11},
    {startTime: '07:00 PM', endTime: '08:00 PM', id: 23},
  ];

  let dates = [
    {
      day: 'Mon',
      date: 18,
    },
    {
      day: 'Tue',
      date: 19,
    },
    {
      day: 'Wed',
      date: 20,
    },
    {
      day: 'Thu',
      date: 21,
    },
    {
      day: 'Fri',
      date: 22,
    },
    {
      day: 'Sat',
      date: 23,
    },
    {
      day: 'Sun',
      date: 24,
    },
  ];

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
    const formattedDate = `${('0' + date.getDate()).slice(-2)}-${(
      '0' +
      (date.getMonth() + 1)
    ).slice(-2)}-${date.getFullYear()}`;
    set_Isdate(formattedDate);
    console.log('date--', formattedDate);
    hideDatePicker();
  };

  const conBooking = async () => {
    const token = await _getStorage('token');
    let book = {
      cartId: cartId,
      //  cartId: cartID?.cartId,
      start: startTime,
      end: endTime,
      bookingDate: _Isdate,
      // bookingLocation: orderLoaction.location,
      // address: orderLoaction.address,
      // pinCode: orderLoaction.pincode,
      // name: orderLoaction.name,
      // save_as: orderLoaction.saveas,
      addressId: orderLoaction._id,
    };

    console.log('========book ================>', book);
    axios
      .post(BASE_URL + `/booking`, book, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log('===========add booking 1=========', res.data);
        let bookinId = res?.data?.bookingId;
        let price = res?.data?.total;
        if (res.data) {
          props.navigation.replace('PaymentScreen', {bookinId, price});
          console.log('===========add booking 2=========', res.data.bookingId);
        } else {
          console.log('else conditions');
        }
      })
      .catch(error => {
        console.log(
          'add booking catch error---+++++++++++=>',
          error?.response?.data?.message,
        );
        if (
          error?.response?.data?.message.includes(
            'Booking already present. Please clear',
          )
        ) {
          Toast.showWithGravity(
            'Booking Already Present',
            Toast.LONG,
            Toast.BOTTOM,
          );
          navigation.navigate('Booking');
        }
        // Toast.showWithGravity(
        //   error.error?.response?.data?.message,
        //   Toast.LONG,
        //   Toast.BOTTOM,
        // );

        // setIserror(error?.response?.data?.message);
        // if (error.response?.data?.message == iseeror) {
        //   Alert.alert('Booking Already Present, Please Clear You Cart having', [
        //     {
        //       text: 'Cancel',
        //       onPress: () => console.log('Cancel Pressed'),
        //       style: 'cancel',
        //     },
        //     {text: 'OK', onPress: () => props.navigation.goBack()},
        //   ]);
        // }
      });
  };

  const chackDate = async () => {
    const token = await _getStorage('token');
    console.log('token', token);
    // Toast.showWithGravity('Please wait...', Toast.LONG, Toast.BOTTOM);
    let dt = _Isdate.split('/');
    console.log('dt', dt);
    let d = `${dt[2]}-${dt[1]}-${dt[0]}`;
    const obj = {
      // timeSlot: startTime + '' + endTime,
      timeSlot: `${startTime}-${endTime}`,
      bookingDate: d,
    };
    console.log('object of  chackDate', obj);
    axios
      .post(BASE_URL + `/booking/verifyTimeSlot`, obj, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log('=====chackDate======', res.data);
        // Toast.showWithGravity(res.data?.message, Toast.LONG, Toast.BOTTOM);
        if (res.data.message === 'Date is valid' && selectedTimeFrame) {
          let book = {
            cartId: cartId,
            //  cartId: cartID?.cartId,
            start: startTime,
            end: endTime,
            bookingDate: _Isdate,
            // bookingLocation: orderLoaction.location,
            // address: orderLoaction.address,
            // pinCode: orderLoaction.pincode,
            // name: orderLoaction.name,
            // save_as: orderLoaction.saveas,
            addressId: orderLoaction._id,
          };
          console.log(
            '===============book of time and date====================>>',
            book,
          );
          console.log(res.data.message, 'run conBooking====');
          props.navigation.replace('PaymentScreen', {book});
          // conBooking();
        } else if (!selectedTimeFrame) {
          console.log('======= not running  conBooking====');
          Toast.showWithGravity(
            'Please choose time slot',
            Toast.SHORT,
            Toast.BOTTOM,
          );
        }
      })
      .catch(error => {
        console.log('chackdate error==>', error.response.data.message);
        Toast.showWithGravity(
          error.response?.data?.message,
          Toast.SHORT,
          Toast.BOTTOM,
        );
      });
  };

  const getNext7Days = () => {
    let days = [];
    let finalDays = [];
    let daysRequired = 7;
    for (let i = 0; i < daysRequired; i++) {
      if (i == 0) {
        days.push(moment().format('dddd, D MMMM YYYY'));
      } else {
        days.push(moment().add(i, 'days').format('dddd, D MMMM YYYY'));
      }
    }
    for (let x = 0; x < days.length; x++) {
      var dayLetter = moment(days[x], 'dddd, D MMMM YYYY').format('ddd');
      var dayNumber = moment(days[x], 'dddd, D MMMM YYYY').format('D');
      var date = moment(days[x], 'dddd, D MMMM YYYY').format('DD/MM/YYYY');
      finalDays.push({
        dayLetter,
        dayNumber,
        date,
      });
    }
    console.log('finaldays', finalDays);

    return finalDays;
  };
  getNext7Days();

  const renderTimeSlotView = timeSlot => {
    console.log('============timeSlot============', timeSlot);
    return (
      <TouchableOpacity
        style={{
          // padding: 10,
          paddingVertical: 10,
          margin: 10,
          width: 160,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: Colors.purple,
          borderWidth: 1,
          backgroundColor:
            selectionTime === timeSlot.id ? '#583592' : Colors.white,
          borderRadius: 7,
        }}
        // onPress={() =>
        //   console.log(`${timeSlot.startTime} - ${timeSlot.endTime}`)
        // }
        onPress={() => {
          setSelectionTime(timeSlot.id);
          setSelectedTimeFrame(
            timeSlot.id > 0 && timeSlot.id < 5
              ? 'morning'
              : timeSlot.id > 4 && timeSlot.id < 9
              ? 'afternoon'
              : 'evening',
          );
          setEndTime(timeSlot.endTime);
          setStartTime(timeSlot.startTime);
          console.log(timeSlot.endTime, timeSlot.startTime);
        }}>
        <Text
          style={{
            fontSize: 13,
            color: selectionTime === timeSlot.id ? Colors.white : Colors.black,
          }}>
          {/* {`${timeSlot.startTime} - ${timeSlot.endTime}`} */}
          {`${timeSlot.startTime}`} - {timeSlot.endTime}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        bgColor={Colors.topNavbarColor}
        color={Colors.white}
        title="Date & Time"
        onPress={() => props.navigation.goBack('Home')}
      />
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomColor: Colors.darkGray,
            borderBottomWidth: 1,
            width: '100%',
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}>
          <View style={{width: '80%'}}>
            <Text
              style={{
                color: Colors.black,
                fontWeight: '600',
              }}>
              Address for service
            </Text>

            <View
              style={{
                flexDirection: 'row',
                width: '82%',
                // backgroundColor: 'red',
                marginTop: 5,
              }}>
              <View
                style={{
                  width: 70,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: Colors.purple,
                  marginRight: 5,
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontWeight: '600',
                    marginRight: 5,
                    textTransform: 'uppercase',
                    fontSize: 12,
                  }}>
                  {orderLoaction.save_as}
                </Text>
              </View>
              <Text
                numberOfLines={1}
                style={{
                  color: Colors.black,
                  fontWeight: '600',
                }}>
                {orderLoaction.area} {orderLoaction.flat}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                // width: '85%',
                // backgroundColor: 'red',
                marginVertical: 4,
              }}>
              <Text
                numberOfLines={1}
                style={{
                  color: Colors.black,
                  fontWeight: '600',
                }}>
                {orderLoaction.pinCode}- {orderLoaction.city},
                {orderLoaction.state}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Editaddress')}>
            <Text
              style={{
                color: Colors.purple,
                fontWeight: '600',
              }}>
              Change
            </Text>
          </TouchableOpacity>
        </View>

        <Text
          style={{
            color: Colors.black,
            fontWeight: '600',
            textAlign: 'center',
            fontSize: 15,
            marginTop: 20,
          }}>
          When would you like your service?
        </Text>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 15,
            marginVertical: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {getNext7Days().length > 0 &&
            getNext7Days().map((date, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => set_Isdate(date?.date)}
                  style={{
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: Colors.purple,
                    borderWidth: 1,
                    backgroundColor: Colors.white,
                    borderRadius: 7,
                    backgroundColor:
                      _Isdate === date?.date ? '#583592' : Colors.white,
                  }}>
                  <Text
                    style={{
                      color:
                        _Isdate === date?.date ? Colors.white : Colors.black,
                      fontWeight: '500',
                    }}>
                    {date?.dayLetter}
                  </Text>
                  <Text
                    style={{
                      color:
                        _Isdate === date?.date ? Colors.white : Colors.black,
                      fontWeight: '500',
                    }}>
                    {date?.dayNumber}
                  </Text>
                </TouchableOpacity>
              );
            })}
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
        </View>
      </View>
      {/* <View
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
      </View> */}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{}}>
        <Text
          style={{
            color: Colors.black,
            fontWeight: '600',
            textAlign: 'center',
            fontSize: 15,
          }}>
          Select Time
        </Text>
        <View
          style={{
            alignItems: 'center',
            marginHorizontal: 10,
            marginVertical: 15,
            borderColor:
              selectedTimeFrame === 'morning' ? Colors.purple : Colors.darkGray,
            borderWidth: selectedTimeFrame === 'morning' ? 2 : 1.5,
            borderRadius: 10,
          }}>
          <Text style={{color: Colors.black, fontWeight: '600'}}>Morning</Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              flexDirection: 'row',
            }}>
            {morningTimeSlots.map((timeSlot, index) => {
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
                      setSelectedTimeFrame(
                        timeSlot.id > 0 && timeSlot.id < 5
                          ? 'morning'
                          : timeSlot.id > 4 && timeSlot.id < 9
                          ? 'afternoon'
                          : 'evening',
                      );
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
                      {`${timeSlot.startTime}`} + {timeSlot.endTime}
                    </Text>
                  </TouchableOpacity>
                );
              }
              return <View key={index}>{renderTimeSlotView(timeSlot)}</View>;
            })}
          </View>
        </View>

        <View
          style={{
            alignItems: 'center',
            marginHorizontal: 10,
            marginVertical: 15,
            borderColor:
              selectedTimeFrame === 'afternoon'
                ? Colors.purple
                : Colors.darkGray,
            borderWidth: selectedTimeFrame === 'afternoon' ? 2 : 1.5,
            borderRadius: 10,
          }}>
          <Text style={{color: Colors.black, fontWeight: '600'}}>
            Afternoon
          </Text>
          <View
            style={{
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              flexDirection: 'row',
            }}>
            {afternoonTimeSlots.map((timeSlot, index) => {
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
                      setSelectedTimeFrame(
                        timeSlot.id > 0 && timeSlot.id < 5
                          ? 'morning'
                          : timeSlot.id > 4 && timeSlot.id < 9
                          ? 'afternoon'
                          : 'evening',
                      );
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
                      {`${timeSlot.startTime}`} - {timeSlot.endTime}
                    </Text>
                  </TouchableOpacity>
                );
              }

              return <View key={index}>{renderTimeSlotView(timeSlot)}</View>;
            })}
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginHorizontal: 10,
            marginVertical: 15,
            borderColor:
              selectedTimeFrame === 'evening' ? Colors.purple : Colors.darkGray,
            borderWidth: selectedTimeFrame === 'evening' ? 2 : 1.5,
            borderRadius: 10,
          }}>
          <Text style={{color: Colors.black, fontWeight: '600'}}>Evening</Text>
          <View
            style={{
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              flexDirection: 'row',
            }}>
            {eveningTimeSlots.map((timeSlot, index) => {
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
                      // backgroundColor:
                      // selectionTime === timeSlot.id ? '#0EC01B' : 'white',
                    }}
                    // onPress={() =>
                    //   console.log(`${timeSlot.startTime} - ${timeSlot.endTime}`)
                    // }
                    onPress={() => {
                      setSelectionTime(timeSlot.id);
                      setSelectedTimeFrame(
                        timeSlot.id > 0 && timeSlot.id < 5
                          ? 'morning'
                          : timeSlot.id > 4 && timeSlot.id < 9
                          ? 'afternoon'
                          : 'evening',
                      );
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
                      {`${timeSlot.startTime}`} - {timeSlot.endTime}
                    </Text>
                  </TouchableOpacity>
                );
              }
              return <View key={index}>{renderTimeSlotView(timeSlot)}</View>;
            })}
          </View>
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
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 10,
          padding: 5,
        }}>
        <View style={{marginLeft: 10}}>
          <Text style={{color: Colors.black, fontWeight: '600'}}>
            {'\u20B9'}
            {totalServiceAmount}
          </Text>
        </View>
        <TouchableOpacity
          onPress={chackDate}
          // disabled={isdate ? false : true}
          style={{
            backgroundColor:
              _Isdate && selectionTime ? Colors.purple : Colors.lightGray,
            justifyContent: 'center',
            borderRadius: 7,
            paddingHorizontal: 20,
            paddingVertical: 10,
            alignItems: 'center',
            marginHorizontal: 10,
          }}>
          <Text
            style={{alignSelf: 'center', color: 'white', fontWeight: 'bold'}}>
            Proceed to pay
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: 7,
        }}>
        <View>
          <Text style={{fontSize: 13, color: 'grey'}}>
            By proceeding you accept the latest versions of our
          </Text>
        </View>

        <TouchableOpacity
          // onPress={() => props.navigation.navigate('Termsandconditions')}
          onPress={() =>
            Linking.openURL(
              'https://kaamkhatam.com/index.php/term-and-conditions/',
            )
          }>
          <Text style={{fontSize: 13, color: 'black'}}> T&C,</Text>
        </TouchableOpacity>

        <TouchableOpacity
          // onPress={() => props.navigation.navigate('PrivacyPolicies')}
          onPress={() =>
            Linking.openURL('https://kaamkhatam.com/index.php/privacy-policy/')
          }>
          <Text style={{fontSize: 13, color: 'black'}}> Privacy policy</Text>
        </TouchableOpacity>
        {/* 
        <View>
          <Text style={{fontSize: 13, color: 'grey'}}> and</Text>
        </View> */}

        {/* <TouchableOpacity>
          <Text style={{fontSize: 13, color: 'black'}}> Cancellaon</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

export default TimeAndSlot;
