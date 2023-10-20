import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';
import CustomButton from '../ReusableComponents/Button';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import {useState} from 'react';
import {useEffect} from 'react';

const ConfirmationPayment = ({route}) => {
  const [loding, setLoading] = useState(true);
  const [butttonLoading, setButtonLoading] = useState(false);
  const [showButton, SetShowButton] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      SetShowButton(true);
    }, 2400);
    return () => clearTimeout(timeoutId);
  }, []);

  const navigation = useNavigation();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  const orderDetails = route?.params;
  const paymentDateTime = orderDetails.PaymentDateTime;
  const dateTimeParts = paymentDateTime.split(' '); // Split the date and time
  const timePart = dateTimeParts[1].slice(0, -3); // Remove the seconds and "AM" or "PM" part
  // Combine the formatted date and time with "AM" or "PM"
  const formattedDateTime = `${dateTimeParts[0]} ${timePart} ${dateTimeParts[2]}`;
  // Combine the formatted date and time
  console.log(formattedDateTime, 'formattedDateTime===');

  console.log(
    '----------order detials in ConfirmationPayment-------',
    orderDetails,
  );
  const GoToHomePage = () => {
    setButtonLoading(true);
    setTimeout(() => {
      navigation.replace('DrowerNavigation');
      setButtonLoading(false);
    }, 300);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffff'}}>
      {loding ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
          }}>
          <ActivityIndicator color="#ff8c00" size={40} />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <ScrollView style={{flex: 1}}>
            <View
              style={{
                width: wp('100%'),
                height: hp('7%'),
                backgroundColor: Colors.topNavbarColor,
                paddingHorizontal: wp('4%'),
                // flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: hp('2.7%'),
                    color: Colors.white,
                    marginLeft: wp('5%'),
                  }}>
                  Payment Status
                </Text>
              </View>
            </View>

            <View
              style={{
                // backgroundColor: 'red',
                paddingHorizontal: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* <Image
            style={styles.tinyLogo}
            source={require('../Assets/Images/Payment.png')}
          /> */}
              <Lottie
                source={require('../Assets/animation/PaymentConfirmation.json')}
                autoPlay
                loop={false}
                style={{height: 220, width: 220}}
              />
            </View>

            <View
              style={{
                // paddingHorizontal: 20,
                alignItems: 'center',
                marginTop: 10,
                height: hp('16%'),
                // backgroundColor: 'red',
                justifyContent: 'space-between',
                borderBottomColor: Colors.lightGray,
                borderBottomWidth: 1,
                margin: 20,
              }}>
              <Text style={{color: '#00bfff', fontSize: 20, fontWeight: '900'}}>
                PAYMENT SUCCESSFUL
              </Text>
              <View
                style={{
                  marginBottom: 30,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: Colors.lightGray,
                    fontSize: 16,
                    fontWeight: '600',
                  }}>
                  Your Payment has been processed!
                </Text>
                <Text
                  style={{
                    color: Colors.lightGray,
                    fontSize: 16,
                    marginTop: 2,
                    fontWeight: '600',
                  }}>
                  Details of transaction are included below
                </Text>
              </View>
            </View>

            <View style={{marginHorizontal: 20}}>
              <Text
                style={{
                  fontSize: 17,
                  color: '#4169e1',
                  fontWeight: '800',
                  alignSelf: 'center',
                  marginBottom: 28,
                }}>
                Transaction Id :{orderDetails.TransactionId}
              </Text>

              <View
                style={[
                  styles.infoitemcontainer,
                  {borderBottomColor: Colors.lightGray, borderBottomWidth: 1},
                ]}>
                <Text style={styles.infokeyText}>TOTAL AMOUNT PAID</Text>
                <Text style={styles.infovalueText}>
                  ₹ {orderDetails.OrderAmount}
                </Text>
              </View>

              <View
                style={[
                  styles.infoitemcontainer,
                  {borderBottomColor: Colors.lightGray, borderBottomWidth: 1},
                ]}>
                <Text style={styles.infokeyText}>PAID BY</Text>
                <Text style={styles.infovalueText}>
                  {orderDetails.PaymentMethod.toUpperCase()}
                </Text>
              </View>

              <View style={styles.infoitemcontainer}>
                <Text style={styles.infokeyText}>TRANSACTION DATE</Text>
                <Text style={styles.infovalueText}>{formattedDateTime}</Text>
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              // flex: 1,
              // backgroundColor: 'red',
              // height: '100%',
              marginBottom: 25,
            }}>
            <TouchableOpacity
              onPress={GoToHomePage}
              // disabled={props.disabled}
              style={{
                width: wp('90%'),
                height: hp('7%'),
                backgroundColor: Colors.topNavbarColor,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: hp('1%'),
                marginTop: hp('2%'),
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
              {!butttonLoading ? (
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: hp('2.2%'),
                    color: Colors.white,
                    marginLeft: wp('5%'),
                  }}>
                  CONTINUE
                </Text>
              ) : (
                <ActivityIndicator color="#fff" size={26} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ConfirmationPayment;

const styles = StyleSheet.create({
  tinyLogo: {
    width: 250,
    height: 250,
  },
  infokeyText: {
    fontSize: 15,
    color: Colors.darkGray,
    fontWeight: '800',
  },
  infovalueText: {
    fontSize: 15,
    color: Colors.black,
    fontWeight: '800',
  },
  infoitemcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: hp('7%'),

    alignItems: 'center',
  },
});
