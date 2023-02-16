import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../Assets/Constants/Colors';
const {height, width} = Dimensions.get('window');
import RNUpiPayment from 'react-native-upi-payment';
import uuid from 'react-native-uuid';
import {BASE_URL} from '../../Assets/utils/Restapi/Config';
import axios from 'axios';
import {_getStorage} from '../../Assets/utils/storage/Storage';

export default function Mywalletscreen() {
  const [selectAmount, setSelectAmount] = useState('');
  const upiPayment = () => {
    let newStr = uuid.v4().slice(20);
    // console.log('newStr-->', newStr);

    RNUpiPayment.initializePayment(
      {
        vpa: 'EXPLORETOBUY.62627320@hdfcbank',
        payeeName: 'dablu',
        amount: selectAmount,
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

      // console.log('object', paymentHistory);

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
    <SafeAreaView>
      <View
        style={{
          borderColor: Colors.darkGray,
          height: 70,
          backgroundColor: Colors.white,
          elevation: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginVertical: 10,
          }}>
          <View style={{flexDirection: 'row', marginVertical: 10}}>
            <Image
              source={require('../../Assets/Images/wallet.png')}
              style={{height: 25, width: 25, marginVertical: 10}}
            />
            <Text
              style={{
                left: 10,
                fontWeight: 'bold',
                marginVertical: 10,
                fontSize: 17,
                color: Colors.black,
              }}>
              My Wallet
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginHorizontal: 10}}>
            <Text style={{left: 10, fontSize: 18, color: Colors.lightGray}}>
              INR 150
            </Text>
          </View>
        </View>
      </View>
      <View style={{marginHorizontal: 10, marginVertical: 20}}>
        <TextInput
          placeholderTextColor={Colors.lightGray}
          placeholder="Please Enter Amount"
          value={selectAmount}
          onChangeText={text => setSelectAmount(text)}
          keyboardType="number-pad"
          style={{
            borderWidth: 1.5,
            color: Colors.black,
            textAlign: 'center',
            borderRadius: 7,
            borderColor: Colors.darkOrange,
            fontWeight: '500',
            fontSize: 18,
          }}
        />
      </View>

      <TouchableOpacity
        onPress={upiPayment}
        disabled={selectAmount ? false : true}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          // top: 60,
          backgroundColor: '#0EC01B',
          height: height / 14,
          marginHorizontal: 10,
          borderRadius: 4,
        }}>
        <Text style={{color: 'white', fontWeight: '500', fontSize: 15}}>
          Recharge your Wallet
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
