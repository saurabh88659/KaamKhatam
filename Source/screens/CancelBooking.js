import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';
import {RadioButton} from 'react-native-paper';
import {_getStorage} from '../Assets/utils/storage/Storage';
import {BASE_URL} from '../Assets/utils/Restapi/Config';
import Toast from 'react-native-simple-toast';
import axios from 'axios';

export default function CancelBooking(props) {
  const [checked, setChecked] = useState(0);
  const bookingid = props.route.params;

  const Srtdata = [
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
    Toast.showWithGravity('Please wait...', Toast.LONG, Toast.BOTTOM);
    let obj = {
      bookingId: bookingid,
      cancelledReason: checked,
    };
    axios
      .put(BASE_URL + `/booking/cancel`, obj, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log('response', res.data);
        Toast.showWithGravity(res.data.message, Toast.LONG, Toast.BOTTOM);
        props.navigation.goBack();
      })
      .catch(error => {
        console.log('cancel booking catch error', error.response.data.message);
        Toast.showWithGravity(
          error.response.data.message,
          Toast.LONG,
          Toast.BOTTOM,
        );
      });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <Header
        bgColor={Colors.darkOrange}
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
          {Srtdata.map((value, index) => (
            <RadioButton.Item
              color={Colors.darkGreen}
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
            backgroundColor: Colors.darkGreen,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            marginHorizontal: 15,
            marginVertical: 10,
            paddingVertical: 10,
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
