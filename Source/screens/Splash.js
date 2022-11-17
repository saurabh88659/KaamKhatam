import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, Image, Text} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../Assets/Constants/Colors';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(async () => {
      const token = await AsyncStorage.getItem('token');
      // console.log('hey====================', token);

      if (token) {
        axios
          .get('https://all-in-one-app-sa.herokuapp.com/user/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(resp => {
            navigation.replace('TabNavigation');
          })
          .catch(async err => {
            if (err.response?.data) {
              // console.log(err.response.data);
              if (err.response.data.message === 'Token is not valid!') {
                const resfreshToken = await AsyncStorage.getItem(
                  'refreshToken',
                );
                const userId = await AsyncStorage.getItem('user_id');
                const SubmitDAta = {
                  refreshToken: resfreshToken,
                  user_id: userId,
                };
                //refresh token api
                axios
                  .post(
                    'https://all-in-one-app-sa.herokuapp.com/user/refreshToken',
                    SubmitDAta,
                  )
                  .then(async res => {
                    // console.log('hey', res.data);
                    await AsyncStorage.setItem('token', res.data.token);
                    await AsyncStorage.setItem(
                      'refreshToken',
                      response.data.refreshToken,
                    );
                  })

                  .catch(function (error) {
                    console.log(error);
                  });
                // update access token in storage
              }
            }
          });
      } else {
        navigation.replace('Login');
      }
    }, 3000);
  }, []);

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
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <Image
            source={require('../Assets/Images/logo2.png')}
            style={styles.logo}
          />
          <View style={{top: 8}}>
            <Text style={styles.yellowTxt}>
              All<Text style={styles.blackTxt}> in</Text> One
            </Text>
            <Text style={styles.blackTxt}>SERVICES</Text>
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

export default Splash;
const styles = StyleSheet.create({
  img: {
    height: hp('30%'),
    width: wp('100%'),
  },
  midContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  logo: {
    height: hp('12%'),
    width: hp('12%'),
  },
  logoCntnr: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  yellowTxt: {
    fontSize: hp('4%'),
    fontWeight: 'bold',
    color: Colors.lightYellow,
  },
  blackTxt: {
    fontSize: hp('4%'),
    fontWeight: 'bold',
    color: Colors.black,
  },
});
