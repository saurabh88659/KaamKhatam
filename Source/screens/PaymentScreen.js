import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../Assets/Constants/Colors';
import Header from '../ReusableComponents/Header';
import RNUpiPayment from 'react-native-upi-payment';
import uuid from 'react-native-uuid';
import {_getStorage} from '../Assets/utils/storage/Storage';
import axios from 'axios';
import {BASE_URL} from '../Assets/utils/Restapi/Config';
import {VPA} from '../Assets/utils/Handler/PaymentInfo';
import {useEffect} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import {WebView} from 'react-native-webview';
import {useRef} from 'react';
import {asin} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';

const PaymentScreen = props => {
  const bookingId = useSelector(state => state.updateState.bookingId);
  console.log('bookingId  useSelector---------payment screen 29', bookingId);

  const navigation = useNavigation();
  const [htmldata, setHtmldata] = useState('');
  const bookingIdPrice = props.route.params;
  console.log('booking is price========================33', bookingIdPrice);
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [orderKeyId, setOrderKeyId] = useState();
  const [webViewVisible, setWebViewVisible] = React.useState(false);
  const [htmlUrl, setHtmlUrl] = useState(null);
  const [orderdetail, setOrderdetail] = useState(null);
  const webviewRef = useRef(null);
  // console.log('----------orderdetail 37 state-------------', orderdetail);
  console.log(
    'bookingIdPrice=======at payment screen 21',
    bookingIdPrice.price,
  );

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      profiledata();
      console.log('run profildata in payment screen');
    }
  }, [isFocused]);

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
  console.log(
    'require data ',
    mobileNumber,
    email,
    customerId,
    bookingIdPrice.price,
  );

  // PAYMENT code==========================
  const _Payment_api = async () => {
    const token = await _getStorage('token');
    console.log('token---------------->>>>>', token);
    const obj = {
      OrderAmount: 1.0,
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
          // Orderdetail(response?.data?.orderKeyId);
        }
      })
      .catch(error => {
        console.log('payment catch error', error);
      });
  };
  console.log('setOrderKeyId====>>', orderKeyId);

  //================orderdetails=============
  useEffect(() => {
    let intervalid;
    if (webViewVisible) {
      intervalid = setInterval(Orderdetail, 6000);
      console.log('run Orderdetail in useEffect');
    }
    return () => clearInterval(intervalid);
  }, [webViewVisible]);

  //======================================================
  const Orderdetail = async () => {
    const token = await _getStorage('token');
    console.log('token in us eeefcy', token);
    console.log('order key is in Orderdetail====>126 ', orderKeyId);
    axios
      .get(
        BASE_URL + `/getOrderDetails/${orderKeyId}`,

        {
          headers: {Authorization: `Bearer ${token}`},
        },
      )
      .then(response => {
        console.log('response ---------222>>>', response?.data);
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

  //========================================================================
  const updatePaymentHistory = async orderdetail => {
    console.log(
      '============orderdetail== in updatePaymentHistory============',
      orderdetail,
    );
    console.log('-----------run updatePaymentHistory------------------');
    const token = await _getStorage('token');
    const paymentHistory = {
      bookingId: bookingIdPrice.bookinId,
      txnId: orderdetail.TransactionId,
      resCode: orderdetail.orderStatus,
      txnRef: orderdetail.TransactionRefNo,
      price: orderdetail.OrderAmount,
      status: orderdetail.orderStatus,
      purpose: 'Booking',
    };
    console.log('updatePaymentHistory object', paymentHistory);
    axios
      .put(BASE_URL + `/addPaymentHistoryPag1`, paymentHistory, {
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

  //===============================================
  const payId_url_Open = async () => {
    const response = await _PaymentApi_Second(htmldata?.orderKeyId);
    console.log('response --------->>>', response?.data);
    console.log('htmldata?.orderKeyId', htmldata?.orderKeyId);
    if (response.data) {
      if (response?.data?.OrderPaymentStatusText !== 'Pending') {
        SimpleToast.show(
          `Order Status: ${response?.data?.OrderPaymentStatusText}`,
          SimpleToast.SHORT,
        );
        navigation.goBack();
      }
    } else {
      console.log('status chech error----->>>', response?.data);
    }
  };

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

  const PayWithCash = () => {
    Toast.showWithGravity('Service Booked!', Toast.LONG, Toast.BOTTOM);
    props.navigation.navigate('Mybooking');
  };

  const payWithWallet = async () => {
    const token = await _getStorage('token');
    const obj = {
      bookingId: bookingIdPrice?.bookinId,
    };
    console.log(obj);
    axios
      .post(BASE_URL + `/paywithwallet`, obj, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log('red.data===paywith wallet', res.data);
        if (res.data) {
          Toast.showWithGravity(res.data.message, Toast.SHORT, Toast.BOTTOM);
          props.navigation.replace('DrowerNavigation');
        }
        // } else if (res.data.message == 'Insufficient balance') {
        //   Toast.showWithGravity(res.data.message, Toast.SHORT, Toast.BOTTOM);
        // }
      })
      .catch(error => {
        if (error.response?.data?.message == 'Insufficient balance') {
          Toast.showWithGravity(
            error.response.data.message,
            Toast.SHORT,
            Toast.BOTTOM,
          );
        }
      });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        bgColor={Colors.topNavbarColor}
        color={Colors.white}
        title="Choose your Method"
        onPress={() => props.navigation.goBack('Home')}
      />

      {webViewVisible ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
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
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              borderRadius: 5,
              paddingVertical: 15,
              // marginVertical: 30,
              marginTop: 30,
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
                Pay with cash after service
              </Text>
            </View>
            <TouchableOpacity
              onPress={PayWithCash}
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

          {/*============================= {pay with wallet==================================} */}
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
                right: 7,
              }}>
              <View
                style={{
                  height: 35,
                  width: 35,
                  backgroundColor: '#fff',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <Entypo name="wallet" size={21} color={'grey'} />
              </View>
              {/* <Image
                source={require('../Assets/Images/wallet.png')}
                style={{resizeMode: 'cover', height: 20, width: 20}}
              /> */}
              <Text style={{color: Colors.black, fontSize: 16, left: 10}}>
                Pay with Wallet
              </Text>
            </View>
            <TouchableOpacity
              onPress={payWithWallet}
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
          {/*============================= {pay with wallet==================================} */}

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
              onPress={_Payment_api}
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
        </View>
      )}
    </SafeAreaView>
  );
};

export default PaymentScreen;
