import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Linking,
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
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import {useRef} from 'react';
import Toast from 'react-native-simple-toast';
import {Header} from 'react-native/Libraries/NewAppScreen';

export default function Mywalletscreen(prop) {
  console.log('===prop====', prop);
  const navigation = useNavigation();
  const [selectAmount, setSelectAmount] = useState('');
  const [recharge, setRecharge] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [orderKeyId, setOrderKeyId] = useState();
  const [webViewVisible, setWebViewVisible] = React.useState(false);
  const [htmlUrl, setHtmlUrl] = useState(null);
  const [orderdetail, setOrderdetail] = useState(null);
  const isFocused = useIsFocused();

  // console.log(
  //   '===================orderdetail=====================',
  //   orderdetail,
  // );
  // console.log(htmlUrl, 'htmlcode-==================');

  const webviewRef = useRef(null);
  console.log(mobileNumber, email, customerId, webViewVisible);
  useEffect(() => {
    if (isFocused) {
      ///reset entered ammount=-----
      setSelectAmount('');
      //=============================
      profiledata();
      console.log('run profildata in payment screen');
    }
  }, [isFocused]);

  //===========get  mobileNumber, email, customerId code========
  const profiledata = async () => {
    console.log('profiledata runn on payment scrren');
    const token = await _getStorage('token');
    axios
      .get(BASE_URL + `/profile`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(val => {
        setMobileNumber(val.data.result.phone);
        setEmail(val.data.result.email);
        setCustomerId(val.data.result._id);
      })
      .catch(e => {
        console.log('catch error in get profile', e);
      });
  };

  // PAYMENT code==========================
  const _Payment_api = async () => {
    const token = await _getStorage('token');
    console.log('token---------------->>>>>', token);
    const obj = {
      OrderAmount: selectAmount,
      CustomerData: {
        MobileNo: mobileNumber,
        Email: email,
        CustomerId: customerId,
      },
    };
    axios
      .post(BASE_URL + `/addUserPayment`, obj, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        console.log(
          ' _Payment_api response data ---------1>>>',
          response?.data,
        );
        if (response.data) {
          console.log(
            '_Payment_api response data ---------2>>>',
            response?.data,
          );
          // Linking.openURL(response?.data?.paymnetProcessUrl);
          console.log('order key id --------->>>', response?.data?.orderKeyId);
          setOrderKeyId(response?.data?.orderKeyId);
          setHtmlUrl(response?.data?.paymnetProcessUrl);
          setWebViewVisible(true);
          // Linking.openURL(htmlUrl);
          // Orderdetail(response?.data?.orderKeyId);
        }
      })
      .catch(error => {
        console.log('payment catch error', error);
      });
  };

  //================orderdetails=============
  useEffect(() => {
    let intervalid;
    if (webViewVisible) {
      intervalid = setInterval(Orderdetail, 6000);
      console.log('======run Orderdetail in useEffect=========');
    }
    return () => clearInterval(intervalid);
  }, [webViewVisible]);

  //======================================================
  const Orderdetail = async () => {
    console.log('runnign orderdetials');
    const token = await _getStorage('token');
    console.log('token in us eeefcy', token);
    console.log('order key is in Orderdetail====>126 ', orderKeyId);
    axios
      .get(BASE_URL + `/getOrderDetails/${orderKeyId}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        console.log('response ----Orderdetail-----222>>>', response?.data);
        if (response.data) {
          console.log('response ---------111>>>', response?.data);
          setOrderdetail(response.data);
          if (response?.data?.OrderPaymentStatusText !== 'Pending') {
            Toast.showWithGravity(
              `Order Status: ${response?.data?.OrderPaymentStatusText}`,
              Toast.LONG,
              Toast.BOTTOM,
            );
            setWebViewVisible(false);
            navigation.replace('ConfirmationPayment', response?.data);
            updatePaymentHistory(response?.data);
          }
        }
      })
      .catch(error => {
        console.log('Orderdetail catch error ', error);
      });
  };

  //update hsitory payment code=================================
  const updatePaymentHistory = async orderdetail => {
    console.log(
      '============orderdetail== in updatePaymentHistory============',
      orderdetail,
    );
    console.log('-----------run updatePaymentHistory------------------');
    const token = await _getStorage('token');
    const paymentHistory = {
      // bookingId: bookingIdPrice.bookinId,
      txnId: orderdetail.TransactionId,
      resCode: orderdetail.orderStatus,
      txnRef: orderdetail.TransactionRefNo,
      price: orderdetail.OrderAmount,
      status: orderdetail.orderStatus,
      purpose: 'wallet Recharge',
    };
    console.log('updatePaymentHistory object', paymentHistory);
    axios
      .put(BASE_URL + `/addPaymentHistoryPag`, paymentHistory, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        console.log(
          'response (updatePaymentHistory-------222>>>)',
          response?.data,
        );
      })
      .catch(error => {
        console.log('Orderdetail catch updatePaymentHistory 193', error);
      });
  };

  // old code========================
  // const upiPayment = () => {
  //   let newStr = uuid.v4().slice(20);
  //   // console.log('newStr-->', newStr);
  //   RNUpiPayment.initializePayment(
  //     {
  //       // vpa: VPA,
  //       vpa: 'saurya8979oksbi',
  //       payeeName: PAYEE_NAME,
  //       amount: selectAmount,
  //       transactionRef: newStr,
  //     },
  //     successCallback,
  //     failureCallback,
  //   );
  // };

  // const successCallback = async data => {
  //   const token = await _getStorage('token');
  //   console.log('success payment-->>', data);

  //   const paymentHistory = {
  //     txnId: data.txnId,
  //     resCode: data.responseCode,
  //     status: data.Status,
  //     price: selectAmount,
  //     txnRef: data.txnRef,
  //     purpose: 'recharge Wallet',
  //   };

  //   console.log('object', paymentHistory);
  //   axios
  //     .put(BASE_URL + `/transactions/paymentHistory`, paymentHistory, {
  //       headers: {Authorization: `Bearer ${token}`},
  //     })
  //     .then(res => {
  //       console.log('successCallback', res.data);
  //       if (res.data) {
  //       }
  //     })
  //     .catch(error => {
  //       console.log('successCallback catch error', error.response.data);
  //     });
  // };

  // const failureCallback = async data => {
  //   const token = await _getStorage('token');
  //   if (data.message == 'No action taken') {
  //     console.log('no action taken');
  //   } else {
  //     const paymentHistory = {
  //       txnId: data.txnId,
  //       resCode: data.responseCode,
  //       status: data.Status,
  //       price: selectAmount,
  //       txnRef: data.txnRef,
  //       purpose: 'recharge Wallet',
  //     };
  //     axios
  //       .put(BASE_URL + `/transactions/paymentHistory`, paymentHistory, {
  //         headers: {Authorization: `Bearer ${token}`},
  //       })
  //       .then(res => {
  //         console.log('successCallback', res.data);
  //       })
  //       .catch(error => {
  //         console.log('successCallback catch error', error.response.data);
  //       });
  //   }
  // };
  // // old code====================

  useEffect(() => {
    if (isFocused) {
      console.log('""""""""""""_getWallets""""""""""');
      _getWallets();
    }
  }, [isFocused]);

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
    <SafeAreaView style={{flex: 1}}>
      {webViewVisible ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            // justifyContent: 'flex-start',
          }}>
          {/* <Header
            bgColor={Colors.topNavbarColor}
            color={Colors.white}
            title="Cancel Booking"
            // onPress={() => navigation.goBack()}
          /> */}
          {/* <View style={{flex: 1, backgroundColor: 'red'}}></View> */}
          <WebView
            ref={webviewRef}
            source={{
              uri: htmlUrl,
            }}
            scrollEnabled={true}
            // onNavigationStateChange={handleNavigationStateChange}
            // renderLoading={LoadingIndicatorView}
            startInLoadingState={true}
            // style={{flex: 1, height: hp('100%')}}
          />
        </View>
      ) : (
        <View>
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
                // textAlign: 'center',
                paddingLeft: 15,
                borderRadius: 7,
                borderColor: Colors.lightGray,
                fontWeight: '500',
                fontSize: 18,
              }}
            />
          </View>

          <TouchableOpacity
            onPress={_Payment_api}
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
            <Text style={{color: 'white', fontWeight: '700', fontSize: 15}}>
              Recharge your Wallet
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
