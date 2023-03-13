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
import moment from 'moment/moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../Assets/utils/Restapi/Config';
import Toast from 'react-native-simple-toast';

const {height, width} = Dimensions.get('window');

const RescheduleBooking = props => {
  const [selectionTime, setSelectionTime] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');
  const [getDate, setGetDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const bokingID = props.route.params;

  //   console.log('bbokingID', bokingID);

  const TimeSlot = [
    {
      id: 0,
      startTime: '09:00 AM -',
      endTime: '10:00 AM',
    },
    {
      id: 1,
      startTime: '10:00 AM -',
      endTime: '11:00 AM',
    },
    {
      id: 2,
      startTime: '11:00 AM -',
      endTime: '12:00 PM',
    },
    {
      id: 3,
      startTime: '12:00 PM -',
      endTime: '01:00 PM',
    },
    {
      id: 4,
      startTime: '01:00 PM -',
      endTime: '02:00 PM',
    },
    {
      id: 5,
      startTime: '02:00 PM -',
      endTime: '03:00 PM',
    },
    {
      id: 6,
      startTime: '03:00 PM -',
      endTime: '04:00 PM',
    },
    {
      id: 7,
      startTime: '04:00 PM -',
      endTime: '05:00 PM',
    },
    {
      id: 8,
      startTime: '05:00 PM -',
      endTime: '06:00 PM',
    },
    {
      id: 9,
      startTime: '06:00 PM -',
      endTime: '07:00 PM',
    },
    {
      id: 10,
      startTime: '07:00 PM -',
      endTime: '08:00 PM',
    },
    {
      id: 11,
      startTime: '08:00 PM -',
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
    const token = await _getStorage('token');
    Toast.showWithGravity('Please wait...', Toast.LONG, Toast.BOTTOM);

    const rescheduleObj = {
      bookingId: bokingID,
      start: startTime,
      end: endTime,
      bookingDate: date,
    };
    axios
      .put(BASE_URL + `/booking/reschedule`, rescheduleObj, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log('reschedule response', res.data);
        if (res.data.message == 'Booking Rescheduled') {
          props.navigation.goBack();
          //   Viewdetailsbooking();
        }
        setIsLoading(false);
        Toast.showWithGravity(res.data.message, Toast.LONG, Toast.BOTTOM);
      })
      .catch(error => {
        console.log('reschedule catch error,', error.response);
        setIsLoading(false);
      });
  };

  const chackDate = async () => {
    const token = await _getStorage('token');
    console.log('token', token);
    Toast.showWithGravity('Please wait...', Toast.LONG, Toast.BOTTOM);

    let dt = date.split('/');
    let d = `${dt[1]}/${dt[0]}/${dt[2]}`;
    const obj = {
      timeSlot: startTime + '' + endTime,
      bookingDate: d,
    };
    console.log('obj', obj);
    axios
      .post(BASE_URL + `/booking/verifyTimeSlot`, obj, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log('chackDate', res.data);
        reschedule();
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
        <View
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
      <ScrollView
        // horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{backgroundColor: 'red'}}>
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
                backgroundColor: selectionTime === index ? '#0EC01B' : 'white',
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginVertical: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                marginHorizontal: 10,
              }}>
              <Text style={{color: Colors.black, fontSize: 20}}>
                {timeSlot.startTime}
              </Text>
              <Text style={{color: Colors.black, fontSize: 20, left: 5}}>
                {timeSlot.endTime}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      {isLoading === false ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color={Colors.darkOrange} size="large" />
        </View>
      ) : (
        <TouchableOpacity
          onPress={chackDate}
          disabled={date ? false : true}
          style={{
            backgroundColor: '#09bd39',
            justifyContent: 'center',
            borderRadius: 7,
            paddingHorizontal: 20,
            paddingVertical: 15,
            alignItems: 'center',
          }}>
          <Text
            style={{alignSelf: 'center', color: 'white', fontWeight: 'bold'}}>
            Done
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default RescheduleBooking;
