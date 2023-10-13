import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';
import {RadioButton} from 'react-native-paper';
import {_getStorage} from '../Assets/utils/storage/Storage';
import {BASE_URL} from '../Assets/utils/Restapi/Config';
import Toast from 'react-native-simple-toast';
import axios from 'axios';

export default function CancelBooking(props) {
  const [checked, setChecked] = useState('');
  const [ButtonLoading, setButtonLoading] = useState(false);

  // const getToken = async () => {
  //   const token = await _getStorage('token');
  //   console.log('token', token);
  // };
  // useEffect(() => {
  //   getToken();
  // }, []);

  console.log('checked ==', checked);
  const bookingid = props.route.params;
  console.log('bookingid in CancelBooking scrren 20', bookingid);

  const ReasonData = [
    'Not available on that day',
    'Not available on that time',
    'Change of Plan3',
    'Wrong Booking',
    'Out of Station',
    'Change of Plan6',
    'Change of Plan7',
    'Change of Plan8',
  ];

  const cancelBooking = async () => {
    const token = await _getStorage('token');
    setButtonLoading(true);
    // Toast.showWithGravity('Please wait...', Toast.LONG, Toast.BOTTOM);
    let obj = {
      bookingId: bookingid,
      cancelledReason: checked,
    };
    console.log('object of ====/booking/cancel', obj);
    axios
      .put(BASE_URL + `/booking/cancel`, obj, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        setButtonLoading(false);
        console.log('response of cancelBooking=====', res.data);
        Toast.showWithGravity(res.data.message, Toast.SHORT, Toast.BOTTOM);
        props.navigation.goBack();
      })
      .catch(error => {
        setButtonLoading(false);

        console.log(
          'cancel booking catch error===51',
          error.response.data.message,
        );
        if (
          error.response.data.message ==
          '"cancelledReason" is not allowed to be empty'
        ) {
          console.log('runnn ');
          Toast.showWithGravity(
            'Kindly provide a reason for canceling the booking',
            Toast.CENTER,
            Toast.BOTTOM,
          );
        }
        // Toast.showWithGravity(
        //   error.response.data.message,
        //   Toast.CENTER,
        //   Toast.BOTTOM,
        // );
      });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <Header
        bgColor={Colors.topNavbarColor}
        color={Colors.white}
        title="Cancel Booking"
        onPress={() => props.navigation.goBack()}
      />
      <ScrollView>
        <View
          style={{
            margin: 10,
            backgroundColor: '#E3E3E3',
            borderRadius: 10,
            elevation: 10,
            justifyContent: 'center',
          }}>
          {ReasonData.map((value, index) => (
            <RadioButton.Item
              color={Colors.purple}
              key={index}
              label={value}
              value={value}
              status={checked === value ? 'checked' : 'unchecked'}
              onPress={() => setChecked(value)}
            />
          ))}
        </View>
        <TouchableOpacity
          onPress={cancelBooking}
          style={{
            height: 50,
            backgroundColor: Colors.purple,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            marginHorizontal: 15,
            marginVertical: 10,
            paddingVertical: 10,
          }}>
          {!ButtonLoading ? (
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              Submit
            </Text>
          ) : (
            <ActivityIndicator size={26} color={'#fff'} />
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
