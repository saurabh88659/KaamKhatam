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
import {ActivityIndicator} from 'react-native-paper';

const PaymentScreen = props => {
  const cartId = useSelector(state => state.updateState.cartId);
  const bookingId = useSelector(state => state.updateState.bookingId);
  console.log('bookingId  useSelector---------payment screen 29', cartId);

  const navigation = useNavigation();
  const [htmldata, setHtmldata] = useState('');
  const bookingData = props.route.params;
  console.log('booking is price========================33', bookingData.book);
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [orderKeyId, setOrderKeyId] = useState();
  const [webViewVisible, setWebViewVisible] = React.useState(false);
  const [htmlUrl, setHtmlUrl] = useState(null);
  const [orderdetail, setOrderdetail] = useState(null);
  const [bookingIdSave, setBookingIdSave] = useState(null);
  const [BookigTotal, setBookingTotal] = useState(null);
  const webviewRef = useRef(null);
  const [butttonLoading, setButtonLoading] = useState(false);
  const [butttonLoading1, setButtonLoading1] = useState(false);
  // console.log('----------orderdetail 37 state-------------', orderdetail);
  console.log(
    '================bookingIdSave==(paymentscrren 47)==================',
    bookingIdSave,
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
        setMobileNumber(val.data?.result?.phone);
        setEmail(val.data?.result?.email);
        setCustomerId(val.data?.result?._id);
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
    // bookingIdPrice.price,
  );

  // PAYMENT code==========================
  const _Payment_api = async Prop => {
    console.log(
      '================Prop on Payment Api=================>>>>>>>>',
      Prop,
    );
    const token = await _getStorage('token');
    console.log('token---------------->>>>>', token);
    const obj = {
      OrderAmount: 1.0,
      // OrderAmount: Prop.total,
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
          //===============
          console.log('order key id --------->>>', response?.data?.orderKeyId);
          setOrderKeyId(response?.data?.orderKeyId);
          setHtmlUrl(response?.data?.paymnetProcessUrl);
          setWebViewVisible(true);
          setButtonLoading1(false);
          //=============================
          Orderdetail(response?.data?.orderKeyId);
        }
      })
      .catch(error => {
        setButtonLoading1(false);
        console.log(' _Payment_api catch error-=---', error);
        DeleteBooking(Prop.bookingId);
      });
  };

  // console.log('setOrderKeyId====>>', orderKeyId);

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
        console.log(' Orderdetail response ---------222>>>', response?.data);
        if (response.data) {
          console.log(' Orderdetail response ---------111>>>', response?.data);
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
      // bookingId: bookingIdPrice.bookinId,
      bookingId: bookingIdSave,
      txnId: orderdetail.TransactionId,
      resCode: orderdetail.orderStatus,
      txnRef: orderdetail.TransactionRefNo,
      price: orderdetail.OrderAmount,
      status: orderdetail.orderStatus,
      purpose: 'Paid By UPI',
    };
    console.log(
      '================updatePaymentHistory object==============',
      paymentHistory,
    );
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

  // const upiPayment = () => {
  //   let newStr = uuid.v4().slice(20);
  //   RNUpiPayment.initializePayment(
  //     {
  //       vpa: VPA,
  //       payeeName: bookingIdPrice?.bookinId,
  //       amount: bookingIdPrice?.price,
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
  //     bookingId: bookingIdPrice?.bookinId,
  //     txnId: data.txnId,
  //     resCode: data.responseCode,
  //     status: data.Status,
  //     price: bookingIdPrice?.price,
  //     txnRef: data.txnRef,
  //   };
  //   console.log('object', paymentHistory);
  //   axios
  //     .put(BASE_URL + `/booking/addPaymentHistory`, paymentHistory, {
  //       headers: {Authorization: `Bearer ${token}`},
  //     })
  //     .then(res => {
  //       console.log('successCallback', res.data);
  //       if (res.data) {
  //         props.navigation.navigate('Viewdetails');
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
  //       bookingId: bookingIdPrice?.bookinId,
  //       txnId: data.txnId,
  //       resCode: data.responseCode,
  //       status: data.Status,
  //       price: bookingIdPrice?.price,
  //       txnRef: data.txnRef,
  //     };
  //     console.log('object', paymentHistory);
  //     axios
  //       .put(BASE_URL + `/booking/addPaymentHistory`, paymentHistory, {
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

  // const PayWithCash = () => {
  //   // Toast.showWithGravity('Service Booked!', Toast.LONG, Toast.BOTTOM);
  //   // props.navigation.navigate('Mybooking');
  // };

  const payWithWallet = async Prop => {
    const token = await _getStorage('token');
    const obj = {
      bookingId: Prop,
    };
    console.log(obj);
    axios
      .post(BASE_URL + `/paywithwallet`, obj, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        setButtonLoading(false);
        console.log('red.data===paywith wallet', res.data);
        if (res.data) {
          Toast.showWithGravity(res.data.message, Toast.SHORT, Toast.BOTTOM);
          if (res.data.message == 'Payment successful') {
            props.navigation.replace('PayWithWalletScreen', {data: res.data});
          }
        }
      })
      .catch(error => {
        setButtonLoading(false);
        DeleteBooking(Prop);

        console.log(
          ' pay with wallet error.response?.data?.message',
          error.response?.data?.message,
        );
        if (error.response?.data?.message == 'Insufficient balance') {
          Toast.showWithGravity(
            error.response.data.message,
            Toast.LONG,
            Toast.BOTTOM,
          );
          navigation.replace('Mywallet');
          Toast.showWithGravity(
            'Please recharge your Wallet',
            Toast.SHORT,
            Toast.BOTTOM,
          );
        }
      });
  };

  const getBookignId = async () => {
    setButtonLoading(true);
    const token = await _getStorage('token');
    let book = {
      cartId: cartId,
      //  cartId: cartID?.cartId,
      start: bookingData.book.start,
      end: bookingData.book.end,
      bookingDate: bookingData.book.bookingDate,
      bookingLocation: bookingData.book.bookingLocation,
      address: bookingData.book.address,
      pinCode: bookingData.book.pinCode,
      name: bookingData.book.name,
      save_as: bookingData.book.save_as,
      addressId: bookingData.book.addressId,
    };
    console.log('========book of getBooking========== ', book);
    axios
      .post(BASE_URL + `/booking`, book, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log('===========add booking 1=========', res.data);
        let bookinId = res?.data?.bookingId;
        let price = res?.data?.total;
        if (res.data.bookingId && res.data.total) {
          setBookingIdSave(res.data.bookingId);
          setBookingTotal(res.data.total);
          payWithWallet(res.data.bookingId);
          // props.navigation.replace('PaymentScreen', {bookinId, price});
          console.log('===========add booking 2=========', res.data.bookingId);
        } else {
          console.log('else conditions');
        }
      })
      .catch(error => {
        setButtonLoading(false);
        console.log(
          'add booking catch error---+++++++++++=>',
          error?.response?.data?.message,
        );
        if (
          error?.response?.data?.message.includes(
            'Booking already present. Please clear',
          )
        ) {
          Toast.showWithGravity(
            'Booking Already Present',
            Toast.LONG,
            Toast.BOTTOM,
          );
          navigation.navigate('Booking');
        }
        // Toast.showWithGravity(
        //   error.error?.response?.data?.message,
        //   Toast.LONG,
        //   Toast.BOTTOM,
        // );

        // setIserror(error?.response?.data?.message);
        // if (error.response?.data?.message == iseeror) {
        //   Alert.alert('Booking Already Present, Please Clear You Cart having', [
        //     {
        //       text: 'Cancel',
        //       onPress: () => console.log('Cancel Pressed'),
        //       style: 'cancel',
        //     },
        //     {text: 'OK', onPress: () => props.navigation.goBack()},
        //   ]);
        // }
      });
  };

  const getBookignIdforUPI = async () => {
    setButtonLoading1(true);
    const token = await _getStorage('token');
    let book = {
      cartId: cartId,
      //  cartId: cartID?.cartId,
      start: bookingData.book.start,
      end: bookingData.book.end,
      bookingDate: bookingData.book.bookingDate,
      bookingLocation: bookingData.book.bookingLocation,
      address: bookingData.book.address,
      pinCode: bookingData.book.pinCode,
      name: bookingData.book.name,
      save_as: bookingData.book.save_as,
      addressId: bookingData.book.addressId,
    };
    console.log('========book of getBooking========== ', book);
    axios
      .post(BASE_URL + `/booking`, book, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        setButtonLoading1(false);
        console.log('===========add booking 1=========', res.data);
        let bookinId = res?.data?.bookingId;
        let price = res?.data?.total;
        if (res.data.bookingId && res.data.total) {
          setBookingIdSave(res.data.bookingId);
          setBookingTotal(res.data.total);
          // payWithWallet(res.data.bookingId);
          _Payment_api(res.data);
          // props.navigation.replace('PaymentScreen', {bookinId, price});
          console.log('===========add booking 2=========', res.data);
        } else {
          console.log('else conditions');
        }
      })
      .catch(error => {
        setButtonLoading1(false);
        console.log(
          'add booking catch error---+++++++++++=>',
          error?.response?.data?.message,
        );
        if (
          error?.response?.data?.message.includes(
            'Booking already present. Please clear',
          )
        ) {
          Toast.showWithGravity(
            'Booking Already Present',
            Toast.LONG,
            Toast.BOTTOM,
          );
          navigation.navigate('Booking');
        }
        // Toast.showWithGravity(
        //   error.error?.response?.data?.message,
        //   Toast.LONG,
        //   Toast.BOTTOM,
        // );

        // setIserror(error?.response?.data?.message);
        // if (error.response?.data?.message == iseeror) {
        //   Alert.alert('Booking Already Present, Please Clear You Cart having', [
        //     {
        //       text: 'Cancel',
        //       onPress: () => console.log('Cancel Pressed'),
        //       style: 'cancel',
        //     },
        //     {text: 'OK', onPress: () => props.navigation.goBack()},
        //   ]);
        // }
      });
  };

  const DeleteBooking = async bookingId => {
    console.log('===========DeleteBooking prop==========', bookingId);
    const token = await _getStorage('token');
    console.log(token);
    let obj = {
      bookingId: bookingId,
    };
    console.log(obj, '===delet booking obj====');
    axios
      .post(BASE_URL + `/booking/delete`, obj, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(val => {
        console.log('booking id delete res====> ', val.data);
      })
      .catch(error => {
        console.log('catch error in delete booking ', error.response.data);
        console.log('catch error in delete booking', error);
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
          {/* <View
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
          </View> */}

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
              onPress={getBookignId}
              style={{
                paddingVertical: 7,
                borderRadius: 7,
                backgroundColor: Colors.purple,
                width: 70,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'flex-end',
                left: 10,
                height: 35,
              }}>
              {!butttonLoading ? (
                <Text style={{color: Colors.white, fontWeight: '500'}}>
                  Pay
                </Text>
              ) : (
                <ActivityIndicator color="#fff" size={15} />
              )}
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
              // onPress={_Payment_api}
              onPress={getBookignIdforUPI}
              style={{
                paddingHorizontal: 15,
                paddingVertical: 7,
                borderRadius: 7,
                backgroundColor: Colors.purple,
                width: 70,
                alignItems: 'center',
                alignSelf: 'flex-end',
                height: 35,
                justifyContent: 'center',
              }}>
              {!butttonLoading1 ? (
                <Text style={{color: Colors.white, fontWeight: '500'}}>
                  Pay
                </Text>
              ) : (
                <ActivityIndicator color="#fff" size={15} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default PaymentScreen;
