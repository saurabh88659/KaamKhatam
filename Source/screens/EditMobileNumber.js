import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import React, {useEffect, useRef, useState} from 'react';
import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';
import axios from 'axios';
import {BASE_URL} from '../Assets/utils/Restapi/Config';
import Toast from 'react-native-simple-toast';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';

function EditMobileNumber({navigation, route}) {
  const verifiedCurrentNumberOtp = useSelector(
    state => state.updateState.verifiedCurrentNumberOtp,
  );
  console.log('verifiedCurrentNumberOtp===>', verifiedCurrentNumberOtp);
  const [changenumber, setChangenubmer] = useState();
  const [getDetailsId, setGetDetailsId] = useState('');
  const [getOtpButtonLoading, setGetOtpButtonLoading] = useState(false);
  const [
    VerifyCurrenttmobileButtonLoading,
    SetVerifyCurrenttmobileButtonLoading,
  ] = useState(false);
  const preData = route.params;

  const InputRef = useRef(null);
  const isFocused = useIsFocused();
  const [verifiedNumber, setVerifiedNumber] = useState(false);

  const handleSendOTP = async () => {
    setGetOtpButtonLoading(true);
    if (changenumber == preData) {
      setGetOtpButtonLoading(false);

      Toast.showWithGravity(
        'Phone number is the same as the previous one. OTP not sent',
        Toast.LONG,
        Toast.BOTTOM,
      );
    } else {
      // Toast.showWithGravity('Please Wait...', Toast.LONG, Toast.BOTTOM);

      axios
        .post(BASE_URL + `/sendOTP`, {
          phone: changenumber,
        })
        .then(res => {
          setGetOtpButtonLoading(false);
          console.log(res.data);
          if (res.data) {
            navigation.navigate('MobileOtp', {
              phone: changenumber,
            });
            Toast.showWithGravity(res.data.message, Toast.SHORT, Toast.BOTTOM);
          } else {
            console.log('else condtion');
          }
        })
        .catch(error => {
          setGetOtpButtonLoading(false);
          console.log('mobail nuember otp catch error', error.response.data);
          Toast.showWithGravity(
            error.response.data.message,
            Toast.LONG,
            Toast.BOTTOM,
          );
        });
    }
  };

  // {==============================sendOtpOnCurrentNumber=============================}

  const sendOtpOnCurrentNumber = async Oldnumber => {
    SetVerifyCurrenttmobileButtonLoading(true);
    console.log('phone=========DDDDDDD', Oldnumber);
    axios
      .post(BASE_URL + `/sendOTP`, {
        phone: Oldnumber,
      })
      .then(res => {
        if (res.data.message) {
          navigation.navigate('CurrentMobileOtp', {
            phone: Oldnumber,
          });
          Toast.showWithGravity(res.data.message, Toast.SHORT, Toast.BOTTOM);
        } else {
          console.log('else condtion');
        }
        SetVerifyCurrenttmobileButtonLoading(false);
        console.log('res.data of sendOtpOnCurrentNumber', res.data);
      })
      .catch(error => {
        SetVerifyCurrenttmobileButtonLoading(false);
        console.log('mobail nuember otp catch error', error);
      });
  };

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar backgroundColor={Colors.topNavbarColor} />
        <Header
          bgColor={Colors.topNavbarColor}
          color={Colors.white}
          title="Update Mobile Number"
          onPress={() => navigation.goBack('')}
        />

        {/* <View style={{margin: 20}}>
          <Text style={{fontSize: 17, fontWeight: '500', color: Colors.black}}>
            Change Your Mobile Number
          </Text>
        </View> */}

        <Text
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            fontWeight: 'bold',
            fontSize: 15,
            color: Colors.black,
          }}>
          Verify your current mobile number
        </Text>
        <View
          style={{
            marginVertical: 10,
            justifyContent: 'space-between',
            borderColor: 'grey',
            height: 45,
            backgroundColor: Colors.white,
            marginHorizontal: 15,
            borderWidth: 1,
            borderRadius: 6,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              paddingHorizontal: 15,
              color: 'black',

              fontWeight: '500',
            }}>
            {preData}
          </Text>
          <TouchableOpacity
            onPress={() => {
              sendOtpOnCurrentNumber(preData);
            }}
            style={{
              borderWidth: 1,
              borderColor: 'green',
              height: '65%',
              marginHorizontal: 8,
              alignItems: 'center',
              justifyContent: 'center',
              width: '25%',
              borderRadius: 7,
              backgroundColor: '#138F00',
            }}>
            {VerifyCurrenttmobileButtonLoading ? (
              <ActivityIndicator color={'#fff'} size={19} />
            ) : (
              <Text style={{color: 'white'}}> Get OTP</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={{marginHorizontal: 20, top: 30}}>
          <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
            New Mobile Number
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: 'red',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: 'grey',
              height: 50,
              borderRadius: 5,
              marginVertical: 10,
              backgroundColor: Colors.white,
            }}>
            <TextInput
              editable={verifiedCurrentNumberOtp ? true : false}
              ref={InputRef}
              placeholderTextColor="grey"
              keyboardType="numeric"
              maxLength={10}
              onChangeText={text => {
                setChangenubmer(text);
              }}
              style={{
                flex: 1,
                height: 40,
                fontSize: 15,
                color: 'black',
                paddingHorizontal: 15,
              }}
            />
            <TouchableOpacity
              disabled={verifiedCurrentNumberOtp ? false : true}
              onPress={handleSendOTP}
              style={{
                // borderWidth: 1,
                borderColor: 'green',
                height: '65%',
                marginHorizontal: 8,
                alignItems: 'center',
                justifyContent: 'center',
                width: '25%',
                borderRadius: 7,
                backgroundColor: verifiedCurrentNumberOtp ? '#138F00' : 'grey',
              }}>
              {getOtpButtonLoading ? (
                <ActivityIndicator color={'#fff'} size={19} />
              ) : (
                <Text style={{color: 'white'}}> Get OTP</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

export default EditMobileNumber;
