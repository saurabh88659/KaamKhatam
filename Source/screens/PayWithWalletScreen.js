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
import moment from 'moment-timezone';

const PayWithWalletScreen = props => {
  const navigation = useNavigation();

  const paymentDetails = props.route.params.data;
  console.log(paymentDetails, 'paymentDetails');
  const [loding, setLoading] = useState(true);

  const [butttonLoading, setButtonLoading] = useState(false);

  const [showButton, SetShowButton] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      SetShowButton(true);
    }, 2060);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 400);
    return () => clearTimeout(timeoutId);
  }, []);

  const utcMoment = moment(paymentDetails.transactionDate);
  // Convert to IST timezone
  const istMoment = utcMoment.tz(IST_TIMEZONE);
  console.log(istMoment, 'istMoment---map');
  // Format the IST date as a string
  const istDate = istMoment.format('YYYY-MM-DD');
  console.log(istDate, 'is date ---map');

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
                marginBottom: 20,
              }}>
              <Lottie
                source={require('../Assets/animation/PaymentConfirmation.json')}
                autoPlay
                loop={false}
                style={{height: 220, width: 220}}
              />
            </View>

            <View
              style={{
                paddingHorizontal: 20,
                marginHorizontal: 20,
                alignItems: 'center',
                marginTop: 10,
                height: hp('16%'),
                // backgroundColor: 'red',
                justifyContent: 'space-between',
                borderBottomColor: Colors.lightGray,
                borderBottomWidth: 1,
                // margin: 20,
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
                    marginTop: 3,
                    fontWeight: '600',
                  }}>
                  Details of transaction are included below
                </Text>
              </View>
            </View>

            <View style={{marginHorizontal: 20, marginTop: 20}}>
              <Text
                style={{
                  fontSize: 17,
                  color: '#4169e1',
                  fontWeight: '800',
                  alignSelf: 'center',
                  marginBottom: 28,
                }}>
                Transaction Id : {paymentDetails.transactionId}
              </Text>

              <View
                style={[
                  styles.infoitemcontainer,
                  {borderBottomColor: Colors.lightGray, borderBottomWidth: 1},
                ]}>
                <Text style={styles.infokeyText}>TOTAL AMOUNT PAID</Text>
                <Text style={styles.infovalueText}>
                  ₹ {paymentDetails.amount}
                </Text>
              </View>

              <View
                style={[
                  styles.infoitemcontainer,
                  {borderBottomColor: Colors.lightGray, borderBottomWidth: 1},
                ]}>
                <Text style={styles.infokeyText}>PAID BY</Text>
                <Text style={styles.infovalueText}>WALLET</Text>
              </View>

              <View style={styles.infoitemcontainer}>
                <Text style={styles.infokeyText}>TRANSACTION DATE</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.infovalueText}>
                    {istMoment.format('DD-MM-YYYY')}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: Colors.black,
                      fontWeight: '800',
                      marginLeft: 9,
                    }}>
                    {istMoment.format('HH:mm')}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
          {showButton ? (
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

              {/* <CustomButton
              onPress={() => navigation.replace('DrowerNavigation')}
              height={hp('7%')}
              width={wp('90%')}
              bgColor={Colors.purple}
              title="CONTINUE"
              color={Colors.white}
            /> */}
            </View>
          ) : null}
        </View>
      )}
    </SafeAreaView>
  );
};

export default PayWithWalletScreen;

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
