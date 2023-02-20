import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
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

const Location = props => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const _getgeolocations = async () => {
    const token = await _getStorage('token');
    // Geolocation.getCurrentPosition(data => {
    //   setLatitude(data.coords.latitude), setLongitude(data.coords.longitude);
    //   console.log('data--------------->>>>', data);
    // });

    const locobj = {
      longitude: latitude,
      latitude: longitude,
    };
    console.log('locobj', locobj);
    axios
      .put(BASE_URL + `/coordinates`, locobj, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log('Locations', res.data);
        if (res.data.message === 'User coordinates Updated Successfully') {
          props.navigation.navigate('DrowerNavigation');
        } else {
          console.log('else conditions');
        }
      })
      .catch(error => {
        console.log('catch locations error', error.response.data.message);
      });
  };

  const onLocation = () => {
    Geolocation.getCurrentPosition(
      async position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      async error => {
        console.log('hey', error.message);
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
        if (data == 'already-enabled') {
        }
      });

      // do some action after the gps has been activated by the user
    } catch (error) {
      console.log(error);
    }
  };

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
          onPress={onLocation}
          height={hp('7%')}
          width={wp('80%')}
          bgColor={Colors.black}
          title="Your Current Location"
          color={Colors.white}
        />
        {/* <CustomButton
          onPress={onLocation}
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
