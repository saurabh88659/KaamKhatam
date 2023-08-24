import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Colors from '../Assets/Constants/Colors';
import Header from '../ReusableComponents/Header';
import RNUpiPayment from 'react-native-upi-payment';
import uuid from 'react-native-uuid';
import {_getStorage} from '../Assets/utils/storage/Storage';
import axios from 'axios';
import {BASE_URL} from '../Assets/utils/Restapi/Config';
import {VPA} from '../Assets/utils/Handler/PaymentInfo';

const PaymentScreen = props => {
  const bookingIdPrice = props.route.params;

  // console.log('bookingIdPrice', bookingIdPrice);

  const upiPayment = () => {
    let newStr = uuid.v4().slice(20);

    RNUpiPayment.initializePayment(
      {
        vpa: VPA,
        payeeName: bookingIdPrice?.bookinId,
        amount: bookingIdPrice?.price,
        transactionRef: newStr,
      },
      successCallback,
      failureCallback,
    );
  };

  const successCallback = async data => {
    const token = await _getStorage('token');
    console.log('success payment-->>', data);

    const paymentHistory = {
      bookingId: bookingIdPrice?.bookinId,
      txnId: data.txnId,
      resCode: data.responseCode,
      status: data.Status,
      price: bookingIdPrice?.price,
      txnRef: data.txnRef,
    };

    console.log('object', paymentHistory);

    axios
      .put(BASE_URL + `/booking/addPaymentHistory`, paymentHistory, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log('successCallback', res.data);
        if (res.data) {
          props.navigation.navigate('Viewdetails');
        }
      })
      .catch(error => {
        console.log('successCallback catch error', error.response.data);
      });
  };

  const failureCallback = async data => {
    const token = await _getStorage('token');
    if (data.message == 'No action taken') {
      console.log('no action taken');
    } else {
      const paymentHistory = {
        bookingId: bookingIdPrice?.bookinId,
        txnId: data.txnId,
        resCode: data.responseCode,
        status: data.Status,
        price: bookingIdPrice?.price,
        txnRef: data.txnRef,
      };

      console.log('object', paymentHistory);

      axios
        .put(BASE_URL + `/booking/addPaymentHistory`, paymentHistory, {
          headers: {Authorization: `Bearer ${token}`},
        })
        .then(res => {
          console.log('successCallback', res.data);
        })
        .catch(error => {
          console.log('successCallback catch error', error.response.data);
        });
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        bgColor={Colors.topNavbarColor}
        color={Colors.white}
        title="Choose your Method"
        onPress={() => props.navigation.goBack('Home')}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          borderRadius: 5,
          paddingVertical: 15,
          marginVertical: 30,
          marginHorizontal: 20,
          alignItems: 'center',
          backgroundColor: '#F9FAFD',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            right: 8,
          }}>
          <Image
            source={require('../Assets/Images/cash.png')}
            style={{resizeMode: 'cover', height: 35, width: 35}}
          />
          <Text style={{color: Colors.black, fontSize: 16, left: 10}}>
            Cash
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Mybooking2')}
          style={{
            paddingVertical: 7,
            borderRadius: 7,
            backgroundColor: Colors.purple,
            width: 70,
            alignItems: 'center',
            alignSelf: 'flex-end',
            left: 10,
          }}>
          <Text style={{color: Colors.white, fontWeight: '500'}}>Pay</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          borderRadius: 5,
          paddingVertical: 15,
          marginHorizontal: 20,
          alignItems: 'center',
          backgroundColor: '#F9FAFD',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../Assets/Images/Upi.png')}
            style={{resizeMode: 'cover', height: 35, width: 35}}
          />
          <Text style={{color: Colors.black, fontSize: 16, left: 10}}>
            UPI Payment
          </Text>
        </View>
        <TouchableOpacity
          onPress={upiPayment}
          style={{
            paddingHorizontal: 15,
            paddingVertical: 7,
            borderRadius: 7,
            backgroundColor: Colors.purple,
            width: 70,
            alignItems: 'center',
            alignSelf: 'flex-end',
          }}>
          <Text style={{color: Colors.white, fontWeight: '500'}}>Pay</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PaymentScreen;
