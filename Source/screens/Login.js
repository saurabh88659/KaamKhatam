import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../Assets/Constants/Colors';
import Header from '../ReusableComponents/Header';
import CustomButton from '../ReusableComponents/Button';
import AddCart from '../ReusableComponents/AddCart';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';
// import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CheckBox from '@react-native-community/checkbox';

import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

const {height, width} = Dimensions.get('screen');

const Login = props => {
  const [isSelected, setSelection] = useState(false);

  // useEffect(() => {
  //   GoogleSignin.configure();
  // }, []);

  // const signIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     // props.navigation.navigate('Otp')
  //     //   this.setState({ userInfo });
  //     console.log('user info', userInfo);
  //     if (userInfo == '') {
  //       alert('user data not found');
  //     } else {
  //       props.navigation.navigate('DrowerNavigation');
  //     }
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       console.log(error);
  //       // user cancelled the login flow
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       console.log(error);
  //       // operation (e.g. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       console.log(error);
  //       // play services not available or outdated
  //     } else {
  //       console.log(error);
  //       // some other error happened
  //     }
  //   }
  // };

  // ======================?

  // const fbLogin = resCallback => {
  //   LoginManager.logOut();
  //   return LoginManager.logInWithPermissions(['email', 'public_profile']).then(
  //     result => {
  //       console.log('fb result =======', result);
  //       if (
  //         result.declinedPermissions &&
  //         result.declinedPermissions.includes('email')
  //       ) {
  //         resCallback({message: 'Email is required'});
  //       }
  //       if (result.isCancelled) {
  //         console.log('error');
  //       } else {
  //         const infoRequest = new GraphRequest(
  //           '/me?fields=email,name,picture',
  //           null,
  //           resCallback,
  //         );
  //         new GraphRequestManager().addRequest(infoRequest).start();
  //       }
  //     },
  //     function (error) {
  //       console.log('Login failed with error' + error);
  //     },
  //   );
  // };

  // const onFbLogin = async () => {
  //   try {
  //     await fbLogin(_responceInfoCallBack);
  //   } catch (error) {
  //     console.log('error raised', error);
  //   }
  // };
  // const _responceInfoCallBack = async (error, result) => {
  //   if (error) {
  //     console.log('error top', error);
  //     return;
  //   } else {
  //     const userData = result;
  //     console.log('fb data', userData);
  //     if (userData == ' ') {
  //       alert('user data is not get');
  //     } else {
  //       props.navigation.navigate('DrowerNavigation');
  //     }
  //   }
  // };
  // // async function onFacebookButtonPress() {
  // //   // Attempt login with permissions
  // //   const result = await LoginManager.logInWithPermissions([
  // //     'public_profile',
  // //     'email',
  // //   ]);

  //   if (result.isCancelled) {
  //     throw 'User cancelled the login process';
  //   }

  //   // Once signed in, get the users AccesToken
  //   const data = await AccessToken.getCurrentAccessToken();

  //   if (!data) {
  //     throw 'Something went wrong obtaining access token';
  //   }

  //   // Create a Firebase credential with the AccessToken
  //   const facebookCredential = auth.FacebookAuthProvider.credential(
  //     data.accessToken,
  //   );

  //   // Sign-in the user with the credential
  //   return auth().signInWithCredential(facebookCredential);
  // }
  // // const [checkMobileNumber, setCheckMobileNumber] = useState(true);

  const [MobileNumber, setMobileNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [detailsValue, setdetailsValue] = useState(null);
  const [otpValue, setOtp] = useState(null);
  const [getValue, setGetValue] = useState(true);

  const [errorMobileNumber, setErrorMobileNumber] = useState(null);
  const [isPhone, setIsPhone] = useState(false);

  const _validateMobileNumber = mobileNo => {
    var mobileNoRegex = /^[6-9]{1}[0-9]{9}$/;
    if (mobileNo == '' || mobileNo == undefined || mobileNo == null) {
      setIsPhone(false);
      setErrorMobileNumber('*Please enter mobile number.');
    } else if (!mobileNoRegex.test(mobileNo)) {
      setErrorMobileNumber('*Please Enter valid mobile number..');
      setIsPhone(false);
    } else {
      setIsPhone(true);

      setErrorMobileNumber(null);
    }
  };

  // const validate = () => {
  //   let flag = true;
  //   if (MobileNumber === 'hello') {
  //     setErrorMobileNumber('*Please enter mobile number.');
  //     flag = false;
  //   }

  //   return flag && isPhone;
  // };

  // const onSubmit = () => {
  //   if (validate()) {
  //     props.navigation.navigate('Otp');
  //     // api();
  //   } else {
  //   }
  // };

  // ************ Login Api Integration ************

  const handleSubmit = () => {
    const SubmitDAta = {
      phone: MobileNumber,
    };
    setIsLoading(true);
    axios
      .post('https://all-in-one-app-sa.herokuapp.com/user/sendOTP', SubmitDAta)
      .then(res => {
        if (res.data.Status == 200) {
          alert('Number is not ');
        } else if (res.data.details) {
          AsyncStorage.setItem('DetailsId', res.data.details);
          props.navigation.navigate('Otp', {
            DetailsIdGet: res.data.details,
            phone: MobileNumber,
          });
        } else {
          console.log('else condtion');
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          source={require('../Assets/Images/SplashOrangeBar.png')}
          style={styles.img}
        />
        <KeyboardAvoidingView
          behavior="padding"
          style={{
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
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
          <Text style={[styles.blackTxt, {fontSize: hp('2.5%')}]}>
            Your Home Services Expert
          </Text>
          <View style={styles.textInputCntnr}>
            <Text style={[styles.blackTxt, {fontSize: hp('2.2%')}]}>+91</Text>
            <TextInput
              placeholder="Mobile Number"
              placeholderTextColor={Colors.darkGray}
              style={styles.input}
              keyboardType="number-pad"
              maxLength={10}
              value={MobileNumber}
              onChangeText={text => {
                setMobileNumber(text), _validateMobileNumber(text);
              }}
            />
          </View>
          {errorMobileNumber != null ? (
            <View
              style={{
                height: height * 0.02,
                width: width * 1,
              }}>
              <Text style={{color: 'red', fontSize: 13, marginLeft: 40}}>
                {errorMobileNumber}
              </Text>
            </View>
          ) : null}
          {isLoading ? (
            <ActivityIndicator
              color="#FFA034"
              size="large"
              style={{alignSelf: 'center', top: 20}}
            />
          ) : (
            <CustomButton
              // onPress={()=>}
              title={'Login / Sign Up'}
              bgColor={Colors.lightGreen}
              width={wp('80%')}
              height={hp('7%')}
              color={Colors.white}
              // onPress={() => props.navigation.navigate('Otp')}
              // onPress={onSubmit}
              onPress={handleSubmit}
            />
          )}

          {/* <CustomButton
            // onPress={()=>}
            title={'Facebook Sign-In'}
            bgColor={Colors.black}
            width={wp('80%')}
            height={hp('7%')}
            color={Colors.white}
            onPress={onFbLogin}
          /> */}
          {/* <Button
      title="Facebook Sign-In"
      onPress={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}
    /> */}
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: 'grey',
                width: wp('25%'),
                top: 20,
                paddingHorizontal: 25,
                right: 10,
              }}></View>
            <View style={{top: 27}}>
              <Text style={{fontSize: 16}}>Or Login with</Text>
            </View>
            <View
              style={{
                borderColor: 'grey',
                width: wp('25%'),
                borderBottomWidth: 1,
                top: 20,
                paddingHorizontal: 25,
                left: 10,
              }}></View>
          </View>
        </KeyboardAvoidingView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            top: 35,
            marginHorizontal: 60,
          }}>
          <TouchableOpacity
          //  onPress={signIn}
          >
            <Image
              source={require('../Assets/Images/google.png')}
              style={{height: hp('10%'), width: wp('20%')}}
            />
            {/* <Text style={{left: 15, top: -10, fontSize: 16}}>Google</Text> */}
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={onFbLogin}
            // onPress={() =>
            //   onFacebookButtonPress().then(() =>
            //     console.log('Signed in with Facebook!'),
            //   )
            // }
            style={{top: 10}}>
            <Image
              source={require('../Assets/Images/facebook.png')}
              style={{height: hp('8%'), width: wp('15%')}}
            />
            {/* <Text style={{fontSize: 16, zIndex: 1}}>Facebook</Text> */}
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            top: hp('12%'),
            marginHorizontal: wp('5%'),
            alignItems: 'center',
            right: wp('5%'),
          }}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            tintColors
            style={{left: wp('3%')}}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              top: 8,
            }}>
            <Text style={{fontSize: 15, fontWeight: '500'}}>
              By proceeding, you agree to
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Termsandconditions')}>
              <Text style={{color: Colors.blue, fontWeight: '500', left: 2}}>
                Terms & Conditions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('PrivacyPolicies')}>
              <Text
                style={{
                  color: Colors.blue,
                  fontWeight: '500',
                }}>
                Privacy Policy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <Image
          source={require('../Assets/Images/SplashGreenBar.png')}
          style={{zIndex: -1}}
        /> */}
        {/* <ImageBackground
          source={require('../Assets/Images/indian-flag.png')}
          style={styles.img}
        /> */}
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  img: {
    height: hp('30%'),
    width: wp('100%'),
    alignSelf: 'flex-end',
    zIndex: -1,
  },
  logo: {
    height: hp('12%'),
    width: hp('12%'),
  },
  input: {
    width: wp('64%'),
    fontSize: hp('2.2%'),
    marginLeft: wp('3%'),
    color: '#000',
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
  textInputCntnr: {
    borderWidth: 1,
    marginTop: hp('1%'),
    borderColor: Colors.black,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: hp('1%'),
    width: wp('80%'),
    paddingHorizontal: wp('4%'),
    backgroundColor: Colors.white,
    elevation: 2,
  },
});
