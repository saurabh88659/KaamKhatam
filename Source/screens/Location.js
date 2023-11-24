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
import Toast from 'react-native-simple-toast';
import InternetInfoall from '../Assets/utils/Handler/InternetInfoall';
import {useDispatch} from 'react-redux';
import {SetLatitude, SetLongitude} from '../features/updatedata/update.reducer';
// const API_KEY = 'AIzaSyD3Uol_-mBQSaZgIfuzVVK1oHXqBHPkrZE';

const Location = props => {
  const dispatch = useDispatch();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    Geolocation.getCurrentPosition(data => {
      setLatitude(data.coords.latitude), setLongitude(data.coords.longitude);
      dispatch(SetLatitude(data.coords.latitude)),
        dispatch(SetLongitude(data.coords.longitude));
      console.log(
        'latitue and longiture at useEfcct========>>>>',
        data.coords.longitude,
        data.coords.latitude,
      );
    });
  }, [buttonLoading]);

  const _getgeolocations = async () => {
    setButtonLoading(true);
    const token = await _getStorage('token');
    if (latitude && longitude) {
      Toast.showWithGravity('Please wait...', Toast.SHORT, Toast.BOTTOM);
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
          setButtonLoading(false);
          console.log(
            '+++++=====location api res=======++++',
            res.data.message,
          );
          if (res.data.message === 'User coordinates Updated Successfully') {
            Toast.showWithGravity(res.data.message, Toast.LONG, Toast.BOTTOM);
            props.navigation.replace('DrowerNavigation');
            onLocation();
          } else {
            setButtonLoading(false);
            Toast.showWithGravity(res.data.message, Toast.LONG, Toast.BOTTOM);
            console.log('else conditions');
          }
        })
        .catch(error => {
          setButtonLoading(false);
          console.log('+++++location error++++0-0---', error);
          console.log('catch locations error', error);
        });
    } else {
      setButtonLoading(false);
      Toast.showWithGravity(
        'Your location will help us serve you better – mind turning it on?',
        Toast.SHORT,
        Toast.BOTTOM,
      );
    }
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
        if (data === 'already-enabled') {
        } else {
          console.log('hey%%');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  function checkGPSStatus() {
    Geolocation.getCurrentPosition(
      position => {
        console.log('GPS is enabled');
        // Do something with the position data
        // Run your function here when permission is granted
        // myFunction();
      },
      error => {
        console.log(error, '===GPS is disabled');
        // Prompt the user to enable GPS
        if (error.PERMISSION_DENIED === 1) {
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

  // {written by me=====}

  // useEffect(() => {
  //   // checkLocationPermission();
  //   requestLocationPermission();
  // }, []);
  // const requestLocationPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: 'Location Permission',
  //         message: 'This app needs access to your location for some features.',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );

  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('Location permission granted.');
  //       // You can proceed with using location services.
  //     } else {
  //       console.log('Location permission denied.');
  //       // Handle the case where the user denied the permission.
  //     }
  //   } catch (error) {
  //     console.error('Error requesting location permission:', error);
  //   }
  // };
  return (
    <View style={styles.container}>
      <InternetInfoall />
      <View
        style={{
          width: wp('100%'),
          height: hp('80%'),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{height: hp('9%'), width: wp('20%')}}
          source={require('../Assets/Images/map.png')}
        />
        <Text style={{fontWeight: 'bold', fontSize: hp('2.7%'), color: '#000'}}>
          See Services around
        </Text>
        <View style={{marginTop: 30}}>
          <CustomButton
            onPress={_getgeolocations}
            // onPress={checkGPSStatus}
            height={hp('7%')}
            width={wp('90%')}
            bgColor={Colors.black}
            title="Your Current Location"
            color={Colors.white}
            loading={buttonLoading}
          />
        </View>
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
