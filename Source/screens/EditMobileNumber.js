import {View, Text, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';
import axios from 'axios';
import {BASE_URL} from '../Assets/utils/Restapi/Config';
import Toast from 'react-native-simple-toast';

function EditMobileNumber({navigation, route}) {
  const [changenumber, setChangenubmer] = useState();
  const [getDetailsId, setGetDetailsId] = useState('');
  const preData = route.params;

  // console.log('preData', preData);

  const handleSendOTP = async () => {
    Toast.showWithGravity('Please Wait...', Toast.LONG, Toast.BOTTOM);

    axios
      .post(BASE_URL + `/sendOTP`, {
        phone: changenumber,
      })
      .then(res => {
        console.log(res.data);
        if (res.data) {
          navigation.navigate('MobileOtp', {
            phone: changenumber,
          });
          Toast.showWithGravity(res.data.message, Toast.LONG, Toast.BOTTOM);
        } else {
          console.log('else condtion');
        }
      })
      .catch(error => {
        console.log('mobail nuember otp catch error', error.response.data);
        Toast.showWithGravity(
          error.response.data.message,
          Toast.LONG,
          Toast.BOTTOM,
        );
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
      <View style={{margin: 20}}>
        <Text style={{fontSize: 17, fontWeight: '500', color: Colors.black}}>
          Change Your Mobile Number
        </Text>
      </View>
      <Text
        style={{
          marginHorizontal: 20,
          fontWeight: 'bold',
          fontSize: 15,
          color: Colors.black,
        }}>
        Current Mobile Number
      </Text>
      <View
        style={{
          justifyContent: 'center',
          borderColor: 'grey',
          height: 45,
          backgroundColor: Colors.white,
          marginHorizontal: 15,
          borderWidth: 1,
          borderRadius: 6,
        }}>
        <Text
          style={{
            paddingHorizontal: 15,
            color: 'black',
            fontWeight: '500 ',
          }}>
          {preData}
        </Text>
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
            placeholderTextColor="grey"
            keyboardType="numeric"
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
            onPress={handleSendOTP}
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
            <Text style={{color: 'white'}}> Get OTP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

export default EditMobileNumber;
