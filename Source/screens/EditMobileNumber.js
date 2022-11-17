import {View, Text, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

function EditMobileNumber({navigation, route}) {
  const [changenumber, setChangenubmer] = useState();
  const [getDetailsId, setGetDetailsId] = useState('');

  const preData = route.params;

  const handleSendOTP = async () => {
    axios
      .post('https://all-in-one-app-sa.herokuapp.com/user/sendOTP', {
        phone: changenumber,
      })
      .then(res => {
        console.log(res.data);
        if (res.data.details) {
          AsyncStorage.setItem('DetailsId', res.data.details);
          navigation.navigate('MobileOtp', {
            details: res.data.details,
            phone: changenumber,
          });
        } else {
          console.log('else condtion');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    AsyncStorage.getItem('DetailsId').then(value => setGetDetailsId(value));
  }, []);

  return (
    <>
      <Header
        bgColor={Colors.darkOrange}
        color={Colors.white}
        title="Register Account"
        onPress={() => navigation.goBack('')}
      />
      <View style={{margin: 20}}>
        <Text style={{fontSize: 17, fontWeight: '500'}}>
          Changing Your Mobile Number
        </Text>
      </View>
      <Text style={{marginHorizontal: 20, fontWeight: 'bold', fontSize: 15}}>
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
