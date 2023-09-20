import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../Assets/Constants/Colors';
const {height, width} = Dimensions.get('window');
import RNUpiPayment from 'react-native-upi-payment';
import uuid from 'react-native-uuid';
import {BASE_URL} from '../../Assets/utils/Restapi/Config';
import axios from 'axios';
import {_getStorage} from '../../Assets/utils/storage/Storage';
import {PAYEE_NAME, VPA} from '../../Assets/utils/Handler/PaymentInfo';

export default function Mywalletscreen() {
  const [selectAmount, setSelectAmount] = useState('');
  const [recharge, setRecharge] = useState('');

  console.log(selectAmount);

  const upiPayment = () => {
    let newStr = uuid.v4().slice(20);
    // console.log('newStr-->', newStr);

    RNUpiPayment.initializePayment(
      {
        vpa: VPA,
        payeeName: PAYEE_NAME,
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
      txnId: data.txnId,
      resCode: data.responseCode,
      status: data.Status,
      price: selectAmount,
      txnRef: data.txnRef,
      purpose: 'recharge Wallet',
    };

    console.log('object', paymentHistory);

    axios
      .put(BASE_URL + `/transactions/paymentHistory`, paymentHistory, {
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
        txnId: data.txnId,
        resCode: data.responseCode,
        status: data.Status,
        price: selectAmount,
        txnRef: data.txnRef,
        purpose: 'recharge Wallet',
      };
      axios
        .put(BASE_URL + `/transactions/paymentHistory`, paymentHistory, {
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

  useEffect(() => {
    _getWallets();
  }, []);

  const _getWallets = async () => {
    const token = await _getStorage('token');
    console.log(token);
    axios
      .get(BASE_URL + `/wallets`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log('response wallets', res.data.wallet.balance);
        setRecharge(res.data.wallet.balance);
      })
      .catch(error => {
        console.log('wallets catch error', error);
      });
  };

  console.log('recharge', recharge);

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
            <Text style={{left: 10, fontSize: 18, color: Colors.black}}>
              {'\u20B9'} {recharge}
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
            borderColor: Colors.lightGray,
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
          backgroundColor: Colors.purple,
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
