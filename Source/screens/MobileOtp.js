import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import CustomButton from '../ReusableComponents/Button';
// import OtpInputs from 'react-native-otp-inputs';
import axios from 'axios';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../Assets/utils/Restapi/Config';
import {_getStorage} from '../Assets/utils/storage/Storage';

function MobileOtp({navigation, route}) {
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [changenumber, setChangenubmer] = useState('');

  const handleSubmit = async () => {
    const token = await _getStorage('token');

    console.log(token);
    const newObj = {
      phone: route.params.phone,
      otp: Number(pin),
    };
    setIsLoading(false);

    axios
      .put(BASE_URL + `/phone`, newObj, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(val => {
        if (val.data.message === 'Updated successfully') {
          setIsLoading(true);

          navigation.navigate('RegisterAccount'),
            {
              phone: changenumber,
              otp: Number(pin),
            };
        }
      })
      .catch(error => {
        console.log('otp mobail otp catch error', error.response.data);
      });
  };

  // ===========================resendOTP++++++++++===============
  const [counter, setCounter] = React.useState(5);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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
      .then(res => {
        console.log('jayguhio', res.data);
        if (res.data) {
        } else {
          console.log('else condtion');
        }
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  return (
    <>
      <Header
        bgColor={Colors.darkOrange}
        color={Colors.white}
        title="Register Account"
        onPress={() => navigation.goBack('')}
      />
      <View style={{marginHorizontal: 30, top: 30}}>
        <Text style={{fontWeight: '500', fontSize: 20}}>Enter OTP</Text>
      </View>
      <View style={{marginHorizontal: 30, top: 30}}>
        <Text style={{fontSize: 15}}>
          We have sent an OTP mobile number +91 ******3234
        </Text>
      </View>
      <View style={{alignItems: 'center'}}>
        {/* <OtpInputs
          handleChange={code => setPin(code)}
          numberOfInputs={6}
          keyboardType="phone-pad"
          inputStyles={styles.input}
          style={{flexDirection: 'row'}}
        /> */}
        <OTPInputView
          style={{width: '80%', height: 200}}
          pinCount={6}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => {
            setPin(code);
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 30,
          top: -60,
        }}>
        {!isButtonDisabled && (
          <Text
            style={{
              color: Colors.black,
              fontSize: hp('1.8%'),
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

      <View style={{alignItems: 'center'}}>
        {isLoading ? (
          <ActivityIndicator
            color="#FFA034"
            size="large"
            style={{alignSelf: 'center', top: 20}}
          />
        ) : (
          <CustomButton
            title={'Continue'}
            bgColor={Colors.darkGreen}
            width={wp('90%')}
            height={hp('7%')}
            color={Colors.white}
            onPress={handleSubmit}
          />
        )}
      </View>
    </>
  );
}
export default MobileOtp;

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 40,
    borderWidth: 0,
    borderBottomWidth: 2,
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    borderColor: 'grey',
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
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
    // width: '80%',
    // height: 200,
  },
});
