import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Colors from '../Assets/Constants/Colors';
import Header from '../ReusableComponents/Header';
import RNUpiPayment from 'react-native-upi-payment';
import uuid from 'react-native-uuid';
import {_getStorage} from '../Assets/utils/storage/Storage';
import axios from 'axios';
import {BASE_URL} from '../Assets/utils/Restapi/Config';

const PaymentScreen = props => {
  const bookingIdPrice = props.route.params;

  // console.log('bookingIdPrice', bookingIdPrice);

  const upiPayment = () => {
    let newStr = uuid.v4().slice(20);
    // console.log('newStr-->', newStr);

    RNUpiPayment.initializePayment(
      {
        vpa: 'EXPLORETOBUY.62627320@hdfcbank',
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
        bgColor={Colors.darkOrange}
        color={Colors.white}
        title="Choose your Payment"
        onPress={() => props.navigation.goBack('Home')}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          borderRadius: 5,
          borderWidth: 1,
          paddingVertical: 15,
          marginVertical: 30,
          marginHorizontal: 20,
          alignItems: 'center',
        }}>
        <Text style={{color: Colors.black, fontSize: 16}}>Cash</Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Mybooking')}
          style={{
            borderWidth: 1,
            paddingHorizontal: 15,
            paddingVertical: 5,
            borderRadius: 7,
            backgroundColor: Colors.darkGreen,
          }}>
          <Text style={{color: Colors.white}}>Pay</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          borderRadius: 5,
          borderWidth: 1,
          paddingVertical: 15,
          marginHorizontal: 20,
          alignItems: 'center',
        }}>
        <Text style={{color: Colors.black, fontSize: 16}}>UPI Payment</Text>
        <TouchableOpacity
          onPress={upiPayment}
          style={{
            borderWidth: 1,
            paddingHorizontal: 15,
            paddingVertical: 5,
            borderRadius: 7,
            backgroundColor: Colors.darkGreen,
          }}>
          <Text style={{color: Colors.white}}>Pay</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PaymentScreen;
