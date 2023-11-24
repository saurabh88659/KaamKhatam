import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../Assets/Constants/Colors';
import Header from '../ReusableComponents/Header';
import {_getStorage} from '../Assets/utils/storage/Storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../Assets/utils/Restapi/Config';
import Toast from 'react-native-simple-toast';

// const {height, width} = Dimensions.get('window');

const RescheduleBooking = props => {
  const [selectionTime, setSelectionTime] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');
  const [getDate, setGetDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ButtonLoading, setButtonLoading] = useState(false);

  const bokingID = props.route.params;

  //   console.log('bbokingID', bokingID);
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

    // setDate(c);

    const formattedDate = `${('0' + date.getDate()).slice(-2)}/${(
      '0' +
      (date.getMonth() + 1)
    ).slice(-2)}/${date.getFullYear()}`;

    setDate(formattedDate);

    hideDatePicker();
  };

  const reschedule = async () => {
    console.log('==========run reshedule api==========');
    const token = await _getStorage('token');
    // setButtonLoading(true);
    // Toast.showWithGravity('Please wait...', Toast.LONG, Toast.BOTTOM);
    const rescheduleObj = {
      bookingId: bokingID,
      start: startTime,
      end: endTime,
      bookingDate: date,
    };
    console.log('rescheduleObj', rescheduleObj);
    axios
      .put(BASE_URL + `/booking/reschedule`, rescheduleObj, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        setIsLoading(false);
        console.log(
          '==reschedule response==========================',
          res.data,
        );
        if (res.data.message == 'Booking Rescheduled Request sent') {
          Toast.showWithGravity(res.data.message, Toast.LONG, Toast.BOTTOM);
          props.navigation.goBack();
          // Viewdetailsbooking();
        }
      })
      .catch(error => {
        console.log('reschedule catch error,', error.response.data);
        Toast.showWithGravity(
          error.response.data.message,
          Toast.LONG,
          Toast.BOTTOM,
        );

        setIsLoading(false);
        setButtonLoading(false);
      });
  };

  const chackDate = async () => {
    const token = await _getStorage('token');
    console.log('token', token);
    // Toast.showWithGravity('Please wait...', Toast.LONG, Toast.BOTTOM);
    setButtonLoading(true);
    let dt = date.split('/');
    // let d = `${dt[2]}-${dt[1]}-${dt[0]}`;
    let d = `${dt[2]}-${dt[1]}-${dt[0]}`;

    const obj = {
      // timeSlot: startTime + '' + endTime,
      timeSlot: `${startTime}-${endTime}`,
      bookingDate: d,
    };
    console.log('obj ===========+++++++', obj);
    axios
      .post(BASE_URL + `/booking/verifyTimeSlot`, obj, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        setButtonLoading(false);

        setIsLoading(false);
        if (!startTime || !endTime) {
          console.log('plese chose time slot');
          Toast.showWithGravity(
            'please choose time slot',
            Toast.SHORT,
            Toast.BOTTOM,
          );
        }
        console.log('chackDate===', res.data.message);
        // Toast.showWithGravity(res.data?.message, Toast.LONG, Toast.BOTTOM);
        if (res.data.message == 'Date is valid' && startTime && endTime) {
          // setButtonLoading(false);
          console.log(
            res.data.message,
            '======res.data.message reshedule message=====',
          );
          reschedule();
        }
      })
      .catch(error => {
        setButtonLoading(false);
        console.log('chackdate error', error.response.data.message);
        setIsLoading(false);
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
        title="Reschedule Booking"
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
          <Text style={{color: Colors.black}}>{date}</Text>
          <View>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
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
                    selectionTime === index ? Colors.purple : 'white',
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
                  {`${timeSlot.startTime}`}
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
      {isLoading === true ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color={Colors.purple} size="large" />
        </View>
      ) : (
        <TouchableOpacity
          onPress={chackDate}
          // disabled={date ? false : true}
          style={{
            height: 55,
            backgroundColor: date ? Colors.purple : Colors.darkGray,
            justifyContent: 'center',
            borderRadius: 7,
            paddingHorizontal: 20,
            paddingVertical: 15,
            alignItems: 'center',
            marginHorizontal: 15,
            top: '-15%',
          }}>
          {!ButtonLoading ? (
            <Text
              style={{
                alignSelf: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              Done
            </Text>
          ) : (
            <ActivityIndicator color={'#fff'} size={28} />
          )}
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default RescheduleBooking;
