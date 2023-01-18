import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../Assets/Constants/Colors';
import OtpInputs from 'react-native-otp-inputs';
import CustomButton from '../ReusableComponents/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../Assets/utils/Restapi/Config';
import Toast from 'react-native-simple-toast';

const Otp = ({navigation, route}) => {
  const [pin, setPin] = useState('');
  const [counter, setCounter] = React.useState(30);
  // const [getDetailsId, setGetDetailsId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const phone = route.params;
  // console.log(phone);

  const onPressotpVerification = () => {
    const verifyObj = {
      otp: pin,
      phone: phone?.phone,
    };
    // console.log('verifyObj', verifyObj);

    const fetchData = async () => {
      setIsLoading(true);
      Toast.showWithGravity('Please wait...', Toast.LONG, Toast.BOTTOM);

      axios
        .post(BASE_URL + `/verifyOTP`, verifyObj)

        .then(async response => {
          await AsyncStorage.setItem('token', response.data.token);
          await AsyncStorage.setItem(
            'refreshToken',
            response.data.refreshToken,
          );
          await AsyncStorage.setItem('user_id', response.data.user_id);
          // console.log(response.data);
          // if (response.data.message == 'Registered successful') {
          //   navigation.navigate('RegisterAccount');
          // }
          console.log(response.data);
          axios
            .get(BASE_URL + `/profile`, {
              headers: {
                Authorization: `Bearer ${response.data.token}`,
              },
            })
            .then(res => {
              if (res.data.result.firstName) {
                navigation.navigate('TabNavigation');
              } else {
                navigation.navigate('RegisterAccount');
              }
            })
            .catch(err => {
              if (err.response.data?.message == "User Doesn't Exists") {
                navigation.navigate('RegisterAccount');
              }
            });
          // if (response.data.message === 'Registered successful') {
          //   navigation.navigate('RegisterAccount');
          // } else {
          //   navigation
          //     .navigate('TabNavigation')
          //     .finally(() => setIsLoading(false));
          // }
        })
        .catch(e => {
          console.log('otp screen catch error', e.response.data);
          Toast.showWithGravity(
            e.response?.data?.message,
            Toast.LONG,
            Toast.BOTTOM,
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchData();
  };

  //  =================resend======================>

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const handleResend = () => {
    setIsButtonDisabled(true);
    setIsLoading(false);
    axios
      .post(BASE_URL + `/sendOTP`, {
        phone: route.params.phone,
      })
      .then(async res => {
        if (res.data.Status == 200) {
          alert('Number is not ');
        } else if (res.data.details) {
          setGetDetailsId(res.data.details);
        } else {
          console.log('else condtion');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <SafeAreaView>
      <View
        style={{
          justifyContent: 'space-between',
          height: hp('100%'),
          backgroundColor: Colors.white,
        }}>
        <Image
          source={require('../Assets/Images/SplashOrangeBar.png')}
          style={styles.img}
        />
        <View style={{justifyContent: 'center', top: '10%'}}>
          <View style={{alignItems: 'center', marginTop: -hp('50%')}}>
            <Text style={{fontWeight: 'bold', fontSize: hp('4%')}}>
              Enter Verification Code
            </Text>
            <Text
              style={{
                fontSize: hp('2%'),
                marginTop: hp('1%'),
                flexWrap: 'wrap',
              }}>
              We have sent you a 6-digit Verification code on {'\n'}+91
              87********
            </Text>
            <View style={{flexDirection: 'row', marginTop: hp('5%')}}>
              <OtpInputs
                handleChange={code => setPin(code)}
                numberOfInputs={6}
                keyboardType="phone-pad"
                inputStyles={styles.input}
                style={{flexDirection: 'row'}}
              />
            </View>
            {isLoading ? (
              <ActivityIndicator
                color="#FFA034"
                size="large"
                style={{alignSelf: 'center', top: 20}}
              />
            ) : (
              <CustomButton
                title={'Verify Code'}
                bgColor={Colors.black}
                width={wp('90%')}
                height={hp('7%')}
                color={Colors.white}
                // onPress={() => navigation.navigate('RegisterAccount')}
                onPress={onPressotpVerification}
              />
            )}

            <View
              style={{
                width: wp('90%'),
                height: hp('4%'),
                flexDirection: 'row',
                marginTop: hp('1%'),
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              {!isButtonDisabled && (
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: hp('2.3%'),
                    fontWeight: '500',
                  }}>
                  Didn't recieved OTP?
                </Text>
              )}
              {counter !== 0 ? (
                <Text
                  style={{
                    color: Colors.darkGray,
                    fontSize: hp('2.2%'),
                    textAlign: 'center',
                    fontWeight: 'normal',
                  }}>
                  Try again in {counter} sec
                </Text>
              ) : (
                !isButtonDisabled && (
                  <TouchableOpacity
                    onPress={handleResend}
                    disabled={isButtonDisabled}
                    style={{justifyContent: 'center'}}>
                    <Text
                      style={{
                        color: Colors.black,
                        fontSize: hp('2.2%'),
                        textAlign: 'center',
                        fontWeight: 'normal',
                      }}>
                      Resend OTP
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          </View>
        </View>
        <Image
          source={require('../Assets/Images/SplashGreenBar.png')}
          style={styles.img}
        />
      </View>
    </SafeAreaView>
  );
};
export default Otp;

const styles = StyleSheet.create({
  img: {
    height: hp('30%'),
    width: wp('100%'),
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderRadius: wp('1%'),
    width: wp('13%'),
    height: wp('15%'),
    borderWidth: 1,
    marginHorizontal: wp('1%'),
    color: 'black',
    borderColor: '#000',
    fontSize: hp('3.5%'),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  inputBox: {
    borderWidth: 1,
    borderRadius: wp('1%'),
    width: wp('15%'),
    height: wp('15%'),
    marginHorizontal: wp('2%'),
    alignContent: 'center',
    textAlign: 'center',
  },
});