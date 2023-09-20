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
import {width} from 'deprecated-react-native-prop-types/DeprecatedImagePropType';

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
        if (res.data.message === 'User coordinates Updated Successfully') {
          Toast.showWithGravity(res.data.message, Toast.LONG, Toast.BOTTOM);
          props.navigation.navigate('DrowerNavigation');
          onLocation();
        } else {
          Toast.showWithGravity(res.data.message, Toast.LONG, Toast.BOTTOM);
          console.log('else conditions');
        }
      })
      .catch(error => {
        Toast.showWithGravity(error.data.message, Toast.LONG, Toast.BOTTOM);
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
