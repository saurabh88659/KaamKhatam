import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, Alert, Linking} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../Assets/Constants/Colors';
import CustomButton from '../ReusableComponents/Button';
import Geolocation from '@react-native-community/geolocation';
import {_getStorage} from '../Assets/utils/storage/Storage';
import axios from 'axios';
import {BASE_URL} from '../Assets/utils/Restapi/Config';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geocoder from 'react-native-geocoding';
import {PermissionsAndroid} from 'react-native';
import Toast from 'react-native-simple-toast';

// const API_KEY = 'AIzaSyD3Uol_-mBQSaZgIfuzVVK1oHXqBHPkrZE';

const Location = props => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    Geolocation.getCurrentPosition(data => {
      setLatitude(data.coords.latitude), setLongitude(data.coords.longitude);
      console.log(
        'data-------fffff-------->>>>',
        data.coords.longitude,
        data.coords.latitude,
      );
    });
  }, []);

  const _getgeolocations = async () => {
    const token = await _getStorage('token');
    Toast.showWithGravity('Please wait...', Toast.LONG, Toast.BOTTOM);

    const locobj = {
      latitude: latitude,
      longitude: longitude,
    };

    console.log('locobj locations', locobj);
    axios
      .put(BASE_URL + `/coordinates`, locobj, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(async res => {
        // console.log('Locations--------------------------------', res.data);
        if (res.data.message === 'User coordinates Updated Successfully') {
          Toast.showWithGravity(res.data.message, Toast.LONG, Toast.BOTTOM);
          props.navigation.navigate('DrowerNavigation');
          onLocation();
        } else {
          console.log('else conditions');
        }
      })
      .catch(error => {
        console.log('catch locations error', error);
      });
  };

  const onLocation = async () => {
    Geolocation.getCurrentPosition(
      async position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      async error => {
        console.log('hey---------------', error.message);
        if (Platform.OS === 'android') {
          await _enableGPS();
          _getgeolocations();
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 50000,
      },
    );
  };

  const _enableGPS = async () => {
    try {
      await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000,
      }).then(data => {
        // console.log('data------------->>>', data);
        if (data === 'already-enabled') {
          // props.navigation.navigate('DrowerNavigation');
          // console.log('hey-------------------');
        } else {
          console.log('hey%%');
        }
      });

      // do some action after the gps has been activated by the user
    } catch (error) {
      console.log(error);
    }
  };

  function checkGPSStatus() {
    Geolocation.getCurrentPosition(
      position => {
        console.log('GPS is enabled');
        // Do something with the position data
      },
      error => {
        console.log('GPS is disabled');
        // Prompt the user to enable GPS
        if (error.code === 2) {
          Alert.alert(
            'Location Services Required',
            'Please enable location services to use this feature',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => Linking.openSettings(),
              },
            ],
          );
        }
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          width: wp('100%'),
          height: hp('80%'),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image source={require('../Assets/Images/map.png')} />
        <Text style={{fontWeight: 'bold', fontSize: hp('2.5%')}}>
          See Services around
        </Text>
        <CustomButton
          onPress={_getgeolocations}
          // onPress={checkGPSStatus}
          height={hp('7%')}
          width={wp('80%')}
          bgColor={Colors.black}
          title="Your Current Location"
          color={Colors.white}
        />
        {/* <CustomButton
          onPress={() =>
            Linking('https://www.npmjs.com/package/react-native-webbrowser')
          }
          height={hp('7%')}
          width={wp('80%')}
          bgColor={Colors.white}
          title="Enter Location Manually"
          color={Colors.black}
        /> */}
      </View>

      <View style={{width: wp('100%'), height: hp('20%')}}>
        <Image
          source={require('../Assets/Images/city.png')}
          style={styles.bottomImg}
        />
      </View>
    </View>
  );
};
export default Location;
const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: '#fff',
  },
  bottomImg: {
    width: wp('100%'),
    height: hp('16%'),
    position: 'absolute',
    bottom: 1,
  },
});
