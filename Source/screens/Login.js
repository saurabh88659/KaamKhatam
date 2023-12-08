import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  Linking,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../Assets/Constants/Colors';
import CustomButton from '../ReusableComponents/Button';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';
import axios from 'axios';
import CheckBox from '@react-native-community/checkbox';
import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import {BASE_URL} from '../Assets/utils/Restapi/Config';
const {height, width} = Dimensions.get('screen');
import Toast from 'react-native-simple-toast';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {_getStorage} from '../Assets/utils/storage/Storage';

const Login = props => {
  const [isSelected, setSelection] = useState(true);
  const [MobileNumber, setMobileNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMobileNumber, setErrorMobileNumber] = useState(null);
  const [isPhone, setIsPhone] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleOtp, setModalVisibleOtp] = useState(false);
  const [googleOtp, setGoogleOtp] = useState('');

  const [googleemail, setGoggleemail] = useState('');
  const [googlephone, setGooglephone] = useState('');
  const [timer, setTimer] = useState(60); // set initial timer to 60 seconds
  const [disabled, setDisabled] = useState(false);
  const [numberError, setNumberError] = useState(false);

  console.log(isSelected);

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setGoggleemail(userInfo.user.email);
      return userInfo;
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error);
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error);
        // play services not available or outdated
      } else {
        console.log(error);
        // some other error happened
      }
    }
  };

  const fbLogin = resCallback => {
    LoginManager.logOut();
    return LoginManager.logInWithPermissions(['email', 'public_profile']).then(
      result => {
        console.log('fb result ++=======', result);
        if (
          result.declinedPermissions &&
          result.declinedPermissions.includes('email')
        ) {
          resCallback({message: 'Email is required'});
        }
        if (result.isCancelled) {
          console.log('error ---------- true', result);
        } else {
          const infoRequest = new GraphRequest(
            '/me?fields=email,name,picture',
            null,
            resCallback,
          );
          new GraphRequestManager().addRequest(infoRequest).start();
        }
      },
      function (error) {
        console.log('Login failed with error' + error);
      },
    );
  };

  const onFbLogin = async () => {
    try {
      const response = await fbLogin(_responceInfoCallBack);
      console.log('response----------.....', response);
    } catch (error) {
      // return error;
      console.log('error raised', error);
      console.log('Fb sdk', error);
    }
  };
  const _responceInfoCallBack = async (error, result) => {
    if (error) {
      console.log('error top', error);
      // setGoggleemail(userData.email);
      console.log('fb data------', result);

      return error;
    } else {
      const userData = result;
      console.log('fb data------', userData.email);
      setGoggleemail(userData.email);
      // await AsyncStorage.setItem('email', userData.email);

      return userData;
    }
  };

  // +++++++++++++++++++++++++++++=======================
  const _validateMobileNumber = mobileNo => {
    var mobileNoRegex = /^[6-9]{1}[0-9]{9}$/;
    if (mobileNo == '' || mobileNo == undefined || mobileNo == null) {
      setIsPhone(false);
      setNumberError(true);
      setErrorMobileNumber('*Please enter mobile number.');
    } else if (!mobileNoRegex.test(mobileNo)) {
      setNumberError(true);

      setErrorMobileNumber('Please Enter valid mobile number..');
      setIsPhone(false);
    } else {
      setNumberError(false);

      setIsPhone(true);
      setErrorMobileNumber(null);
    }
  };

  //TODO ************ Login Api Integration ************

  const handleSubmit = () => {
    if (numberError) {
      Toast.showWithGravity(
        // error?.response?.data?.message,
        'Please Enter valid mobile number..',
        Toast.SHORT,
        Toast.BOTTOM,
      );
    }
    if (!numberError) {
      if (!isSelected) {
        Toast.showWithGravity(
          // error?.response?.data?.message,
          "'Please agree Terms & Conditions",
          Toast.SHORT,
          Toast.BOTTOM,
        );
      } else {
        const SubmitDAta = {
          phone: MobileNumber,
        };
        console.log('phone number', SubmitDAta);
        setIsLoading(true);
        axios
          .post(BASE_URL + `/sendOTP`, SubmitDAta)
          .then(res => {
            if (res?.data?.Status == 200) {
              alert('Number is not ');
            } else if (res?.data) {
              props.navigation.navigate('Otp', {
                phone: MobileNumber,
              });
            } else {
              console.log('else condtion');
            }
          })
          .catch(error => {
            console.log(error);
            // Toast.showWithGravity(
            //   // error?.response?.data?.message,
            //   "'Please Enter valid mobile number..",
            //   Toast.LONG,
            //   Toast.BOTTOM,
            // );
          })
          .finally(() => setIsLoading(false));
      }
    }
  };
  4;
  // ====================GoogleSignin======================

  const _socialloginGoogle = () => {
    const SubmitDAta = {
      phone: googlephone,
      email: googleemail,
    };
    console.log('phone number', SubmitDAta);
    axios
      .post(BASE_URL + `/socialPhoneLogin`, SubmitDAta)
      .then(res => {
        console.log('response', res.data);
        if (res.data.Status == 200) {
          alert('Number is not ');
        } else if (res.data) {
          setModalVisibleOtp(!modalVisibleOtp);
          setModalVisible(!modalVisible);
        } else {
          console.log('else condtion');
        }
      })
      .catch(error => {
        console.log('google login with phone', error);
        Toast.showWithGravity(
          'Please feel The Number',
          Toast.LONG,
          Toast.BOTTOM,
        );
      });
  };

  const verifySocialPhoneOTP = () => {
    const SubmitDAta = {
      phone: googlephone,
      otp: googleOtp,
      email: googleemail,
    };

    console.log('SubmitDAta', SubmitDAta, {});
    axios
      .post(BASE_URL + `/verifySocialPhoneOTP`, SubmitDAta)
      .then(async response => {
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
        await AsyncStorage.setItem('user_id', response.data.user_id);

        console.log('google sigin otp', response.data);
        props.navigation.navigate('RegisterAccount');
        setModalVisibleOtp(!modalVisibleOtp);
      })
      .catch(error => {
        console.log('googole catch error in otp ', error);
      });
  };

  const socialLoginGoogle = async () => {
    const response = await signIn();
    const token = await _getStorage('token');
    if (response) {
      console.log('api');
      axios
        .post(BASE_URL + `/socialLogin`, {
          email: googleemail,
        })
        .then(async res => {
          console.log('hey', res.data);
          if (
            res.data.message ==
            'Please enter mobile number to signUp user with email and phone'
          ) {
            setModalVisible(!modalVisible);
          } else {
            if (token) console.log('else conditions');
            console.log('hey-------', res.data);
            await AsyncStorage.setItem('token', res.data.token);
            await AsyncStorage.setItem('refreshToken', res.data.refreshToken);
            await AsyncStorage.setItem('user_id', res.data.user_id);
            props.navigation.navigate('Location');
          }
        })
        .catch(error => {
          console.log('sociallogin catch error----->>>.', error);
        });
    }
  };

  // ==============================FacebookLoginSocial===================
  const socialLoginFacebook = async () => {
    await onFbLogin();
    // if (response) {
    console.log('api');
    axios
      .post(BASE_URL + `/socialLogin`, {
        email: googleemail,
      })
      .then(res => {
        console.log('hey', res.data);
        if (
          res.data.message ==
          'Please enter mobile number to signUp user with email and phone'
        ) {
          setModalVisible(!modalVisible);
        } else {
          console.log('else conditions');
          props.navigation.navigate('Location');
        }
      })
      .catch(error => {
        console.log('sociallogin catch error----->>>.', error.response);
      });
    // }
    console.log('hey');
  };

  const handlePress = () => {
    Keyboard.dismiss();
  };

  const resendemail = () => {
    const SubmitDAta = {
      phone: googlephone,
      email: googleemail,
    };
    console.log('phone number', SubmitDAta);
    axios
      .post(BASE_URL + `/socialPhoneLogin`, SubmitDAta)
      .then(res => {
        setTimer(60); // reset timer
        setDisabled(true);
        if (res.data.Status == 200) {
          alert('Number is not ');
        } else {
          console.log('else condtion');
        }
      })
      .catch(error => {
        console.log('google login with phone', error);
        Toast.showWithGravity(
          'Please feel The Number',
          Toast.LONG,
          Toast.BOTTOM,
        );
      });
  };

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer(previousTime => previousTime - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else {
      setDisabled(false);
    }
  }, [timer]);

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View>
        <View style={styles.container}>
          {/* <StatusBar backgroundColor={'#fff'} /> */}
          {/* <Image
            source={require('../Assets/Images/SplashOrangeBar.png')}
            style={styles.img}
          /> */}
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
              {/* <View style={{top: 8}}>
                <Text style={styles.yellowTxt}>Kaam Khatam</Text>
                <Text style={styles.blackTxt}>SERVICES</Text>
              </View> */}
            </View>
            <Text style={[styles.blackTxt, {fontSize: hp('2%')}]}>
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
                title={'Login / Sign Up'}
                bgColor={Colors.purple}
                width={wp('80%')}
                height={hp('7%')}
                color={Colors.white}
                onPress={handleSubmit}
                // disabled={isSelected ? false : true}
              />
            )}

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
                <Text style={{fontSize: 16, color: 'black'}}>
                  Or Login with
                </Text>
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
              onPress={socialLoginGoogle}
              // onPress={_socialloginGoogle}

              // onPress={() => setModalVisible(!modalVisible)}
            >
              <Image
                source={require('../Assets/Images/google.png')}
                style={{height: hp('9%'), width: wp('15%')}}
              />
              <Text
                style={{marginLeft: hp('2%'), fontSize: 14, color: 'black'}}>
                Google
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={socialLoginFacebook} style={{top: 10}}>
              <Image
                source={require('../Assets/Images/facebook.png')}
                style={{height: hp('8%'), width: wp('15%')}}
              />
              <Text style={{fontSize: 14, color: 'black'}}>Facebook</Text>
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
              <Text
                style={{fontSize: 15, fontWeight: '500', color: Colors.black}}>
                By proceeding, you agree to
              </Text>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL('https://privacykaam.kaamkhatam.com/terms')
                }>
                {/* // onPress= */}
                {/* {() => props.navigation.navigate('Termsandconditions')} */}
                {/* > */}
                <Text style={{color: Colors.blue, fontWeight: '500', left: 2}}>
                  Terms & Conditions
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL('https://privacykaam.kaamkhatam.com/privacy')
                }>
                {/* onPress={() => props.navigation.navigate('PrivacyPolicies')} */}
                {/* > */}
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
          {/* <View
            style={{alignItems: 'center', justifyContent: 'flex-end', flex: 1}}>
            <ImageBackground
              source={require('../Assets/Images/SplashGreenBar.png')}
              style={[styles.img]}
            />
          </View> */}
        </View>
        <Modal
          animationIn="slideInUp"
          animationOut="slideOutDown"
          transparent={true}
          isVisible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#aaa',
                  color: '#000',
                  paddingLeft: 10,
                  height: 40,
                }}
                value={googlephone}
                onChangeText={val => setGooglephone(val)}
                placeholder="Enter Phone Number"
                placeholderTextColor={'#aaa'}
                maxLength={10}
                keyboardType="number-pad"
              />
              <TouchableOpacity
                onPress={_socialloginGoogle}
                // disabled={otp_email ? false : true}
                style={{
                  backgroundColor: Colors.darkGreen,
                  paddingVertical: 10,
                  marginTop: 20,
                  borderRadius: 4,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: '700',
                    color: '#fff',
                  }}>
                  sendOTP
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          animationIn="slideInUp"
          animationOut="slideOutDown"
          transparent={true}
          isVisible={modalVisibleOtp}
          onRequestClose={() => {
            setModalVisibleOtp(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#aaa',
                  color: '#000',
                  paddingLeft: 10,
                  height: 40,
                }}
                value={googleOtp}
                onChangeText={val => setGoogleOtp(val)}
                placeholder="Enter OTP"
                placeholderTextColor={'#aaa'}
                maxLength={6}
                keyboardType="number-pad"
              />
              <TouchableOpacity onPress={resendemail} disabled={disabled}>
                <Text
                  style={{
                    color: disabled ? Colors.lightGray : Colors.black,
                    alignSelf: 'flex-end',
                    top: 5,
                  }}>
                  Resend OTP{timer > 0 ? ` in ${timer} seconds` : ''}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={verifySocialPhoneOTP}
                disabled={googleOtp ? false : true}
                style={{
                  backgroundColor: Colors.darkGreen,
                  paddingVertical: 10,
                  marginTop: 20,
                  borderRadius: 4,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: '700',
                    color: '#fff',
                  }}>
                  Verify
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: '#fff',
  },
  img: {
    height: hp('30%'),
    width: wp('100%'),
    alignSelf: 'flex-end',
    zIndex: -1,
    resizeMode: 'cover',
  },
  logo: {
    height: hp('25%'),
    width: hp('25%'),
    marginTop: hp('16%'),
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
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: Colors.black,
  },
  textInputCntnr: {
    borderWidth: 1,
    marginTop: hp('4%'),
    borderColor: Colors.black,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: hp('1%'),
    width: wp('80%'),
    paddingHorizontal: wp('4%'),
    backgroundColor: Colors.white,
    elevation: 2,
  },
  modalView: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    borderRadius: 7,
    padding: 25,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowRadius: 4,
    elevation: 5,
  },
});
