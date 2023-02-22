import React, {useEffect, useState} from 'react';
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
// import Geocoder from 'react-native-geocoding';

// const API_KEY = 'AIzaSyD3Uol_-mBQSaZgIfuzVVK1oHXqBHPkrZE';

const Location = props => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  // const [state, setState] = useState('');

  // console.log('state---', state.address);

  const _getgeolocations = async () => {
    const token = await _getStorage('token');
    Geolocation.getCurrentPosition(data => {
      setLatitude(data.coords.latitude), setLongitude(data.coords.longitude);
      console.log(
        'data--------------->>>>',
        data.coords.longitude,
        data.coords.latitude,
      );
    });

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

  // useEffect(() => {
  //   onLocation();
  //   geoCoding();
  // }, []);

  // const geoCoding = () => {
  //   Geocoder.init(API_KEY);
  //   Geolocation.getCurrentPosition(data => {
  //     setLatitude(data.coords.latitude), setLongitude(data.coords.longitude);
  //     // console.log('data--------------->>>>', data);
  //   });

  //   Geocoder.from(latitude, longitude).then(json => {
  //     console.log('chack data=====', json.results.coords);
  //     json.results[0].address_components.forEach((value, index) => {
  //       setState({
  //         address: json.results[0].formatted_address,
  //         tempAddress: json.results[0].formatted_address,
  //       });
  //     });
  //   });
  // };

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
          // onPress={onLocation}
          onPress={_getgeolocations}
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
