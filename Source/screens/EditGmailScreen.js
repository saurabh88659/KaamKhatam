import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ActivityIndicator,
  TurboModuleRegistry,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
// import {Header} from 'react-native/Libraries/NewAppScreen';
import Colors from '../Assets/Constants/Colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import Header from '../ReusableComponents/Header';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {_getStorage} from '../Assets/utils/storage/Storage';
import {BASE_URL} from '../Assets/utils/Restapi/Config';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import {useState} from 'react';
const EditGmailScreen = prop => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleCurrentMail, setModalVisibleCurrentMail] = useState(false);
  const preData = prop.route.params;
  const [counter, setCounter] = React.useState(30);
  const [code, setCode] = useState();
  const [emailOtp, setemailOtp] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [verifyButtonLoading, setVerifyButtonLoading] = useState(false);
  const [VerifyCurrenMailButtonLoading, setVerifyCurrenMailButtonLoading] =
    useState(false);
  const [verifiedCurrentMail, setVerifiedCurrentMail] = useState(false);
  const InputRef = useRef(null);
  const [currentMailOtpId, setCurrentMailOtpId] = useState(null);
  const [currentMailOtp, setCurrentMailOtp] = useState();

  const isFocused = useIsFocused();

  // useEffect(() => {
  //   if (isFocused) {
  //     setTimeout(() => InputRef?.current?.focus(), 1);
  //   }
  // }, [isFocused]);

  useEffect(() => {
    const timer =
      counter > 0 &&
      setInterval(() => {
        let newTime = ('0' + (counter - 1).toString()).slice(-2);
        setCounter(newTime);
      }, 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const LoginApisendmailotp = async () => {
    setButtonLoading(true);
    if (email == preData) {
      setButtonLoading(false);

      Toast.showWithGravity(
        'email is the same as the previous one. OTP not sent',
        Toast.LONG,
        Toast.BOTTOM,
      );
    } else {
      const token = await _getStorage('token');
      const emailObj = {
        email,
      };
      axios
        .put(BASE_URL + `/sendMail`, emailObj, {
          headers: {Authorization: `Bearer ${token}`},
        })
        .then(res => {
          setButtonLoading(false);
          console.log('email response', res.data);
          setemailOtp(res.data.id);
          // setIsGettingOTP(false);
          // setIsLoading();
          setModalVisible(!modalVisible);
        })
        .catch(error => {
          setButtonLoading(false);

          console.log(
            'email send otp catch error',
            error.response.data.message,
          );
          // setIsGettingOTP(false);
          Toast.showWithGravity(
            error.response.data.message,
            Toast.LONG,
            Toast.BOTTOM,
          );
        });
    }
  };

  // {======================resend otp===================}
  const resendemail = async () => {
    const token = await _getStorage('token');
    setTimer(60); // reset timer
    setDisabled(true);
    const emailObj = {
      email,
    };
    axios
      .put(BASE_URL + `/sendMail`, emailObj, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log('email response', res.data);
        setemailOtp(res.data.id);
        Toast.showWithGravity(res.data?.message, Toast.LONG, Toast.BOTTOM);
        setCounter(30);
      })
      .catch(error => {
        console.log(
          'email send otp catch error',
          error?.response?.data?.message,
        );
        Toast.showWithGravity(
          error?.response?.data?.message,
          Toast.LONG,
          Toast.BOTTOM,
        );
      });
  };
  // ======================verify OTP==================

  const _verifyMailotp = async () => {
    setVerifyButtonLoading(true);
    if (email == preData) {
      setVerifyButtonLoading(false);

      Toast.showWithGravity(
        'Phone number is the same as the previous one. OTP not sent',
        Toast.LONG,
        Toast.BOTTOM,
      );
    } else {
      const token = await _getStorage('token');
      // Toast.showWithGravity('Please wait...', Toast.LONG, Toast.BOTTOM);
      const obj = {
        id: emailOtp,
        otp: Number(code),
      };
      axios
        .post(BASE_URL + `/verifyMailOTP`, obj, {
          headers: {Authorization: `Bearer ${token}`},
        })
        .then(value => {
          setVerifyButtonLoading(false);
          if ((value.data.message, 'Email successfully updated')) {
            navigation.goBack();
          }
          console.log('verify otp data====>', value.data);
          setModalVisible(!modalVisible);
          // setIsVerified(true);
          // setIsVerifyingOTP(false);
          Toast.showWithGravity(value.data.message, Toast.SHORT, Toast.BOTTOM);
        })
        .catch(error => {
          setVerifyButtonLoading(false);

          console.log(error.response.data);
          Toast.showWithGravity(
            error.response.data.message,
            Toast.SHORT,
            Toast.BOTTOM,
            error.response.data,
          );
        });
    }
  };
  //   {======================otp on current mail===================}
  const sendOtponCurrentMail = async email => {
    setVerifyCurrenMailButtonLoading(true);
    console.log('email==>', email);
    const token = await _getStorage('token');
    const emailObj = {
      email,
    };
    axios
      .put(BASE_URL + `/sendMail`, emailObj, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        setModalVisibleCurrentMail(!modalVisibleCurrentMail);
        setVerifyCurrenMailButtonLoading(false);
        setCurrentMailOtpId(res.data.id);
        console.log('current send otpemail response====>', res.data);
      })
      .catch(error => {
        setVerifyCurrenMailButtonLoading(false);
        console.log('email send otp on current  catch error', error);
        Toast.showWithGravity(
          error?.response?.data?.message,
          Toast.LONG,
          Toast.BOTTOM,
        );
      });
  };
  // {=======================verify cureent mail==========================}
  const verifycurrentMail = async () => {
    const token = await _getStorage('token');
    const obj = {
      id: currentMailOtpId,
      otp: Number(currentMailOtp),
    };
    console.log('obj of verifycurrentMail==>', obj);
    axios
      .post(BASE_URL + `/currentEmailVerify`, obj, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(value => {
        if ((value.data.message, 'Email Verified Successfully')) {
          setVerifiedCurrentMail(true);
          setModalVisibleCurrentMail(!modalVisibleCurrentMail);
        }
        console.log('verify otp data====>', value.data);
        Toast.showWithGravity(value.data.message, Toast.SHORT, Toast.BOTTOM);
      })
      .catch(error => {
        console.log(
          'error.response.data of verifycurrentMail',
          error?.response?.data,
        );
        Toast.showWithGravity(
          error.response.data.message,
          Toast.SHORT,
          Toast.BOTTOM,
        );
      });
  };

  console.log('================preData===============', preData);
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar backgroundColor={Colors.topNavbarColor} />
        <Header
          bgColor={Colors.topNavbarColor}
          color={Colors.white}
          title="Update Email"
          onPress={() => navigation.goBack('')}
        />
        {/* <View style={{margin: 20}}>
          <Text style={{fontSize: 17, fontWeight: '700', color: Colors.black}}>
            Change Your Email
          </Text>
        </View> */}
        <Text
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            fontWeight: 'bold',
            fontSize: 15,
            color: Colors.black,
          }}>
          Verify Current Email
        </Text>
        <View
          style={{
            marginVertical: 10,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: 'grey',
            height: 50,
            backgroundColor: Colors.white,
            marginHorizontal: 15,
            borderWidth: 1,
            borderRadius: 6,
          }}>
          <Text
            style={{
              paddingHorizontal: 15,
              color: 'black',
              fontWeight: '500',
            }}>
            {preData}
          </Text>
          <TouchableOpacity
            onPress={() => {
              sendOtponCurrentMail(preData);
            }}
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
            {VerifyCurrenMailButtonLoading ? (
              <ActivityIndicator color={'#fff'} size={19} />
            ) : (
              <Text style={{color: 'white'}}> Get OTP</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={{marginHorizontal: 20, top: 30}}>
          <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
            New Email
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
              // editable={!verifiedCurrentMail ? false : true}
              editable={verifiedCurrentMail ? true : false}
              ref={InputRef}
              placeholderTextColor="grey"
              // keyboardType="numeric"
              onChangeText={text => {
                setEmail(text);
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
              onPress={LoginApisendmailotp}
              disabled={verifiedCurrentMail ? false : true}
              style={{
                // borderWidth: 1,
                borderColor: 'green',
                height: '65%',
                marginHorizontal: 8,
                alignItems: 'center',
                justifyContent: 'center',
                width: '25%',
                borderRadius: 7,
                backgroundColor: verifiedCurrentMail ? '#138F00' : 'grey',
              }}>
              {buttonLoading ? (
                <ActivityIndicator color={'#fff'} size={19} />
              ) : (
                <Text style={{color: 'white'}}> Get OTP</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* {================modal of verify current mail=================} */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleCurrentMail}
          onRequestClose={() => {
            setModalVisibleCurrentMail(!modalVisibleCurrentMail);
          }}>
          <View style={Styles.centeredView}>
            <View style={Styles.modalView}>
              <TouchableOpacity
                onPress={() => setModalVisibleCurrentMail(false)}
                style={{alignItems: 'flex-end', top: '-10%'}}>
                <Text>❌</Text>
              </TouchableOpacity>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#aaa',
                  color: '#000',
                  paddingLeft: 10,
                  height: 40,
                }}
                value={code}
                onChangeText={val => setCurrentMailOtp(val)}
                placeholder="Enter OTP"
                maxLength={6}
                placeholderTextColor={'#aaa'}
                keyboardType="number-pad"
              />
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    top: 3,
                  }}>
                  <Text style={Styles.respontextstyles2}>
                    Time remaining: 00:{counter}
                  </Text>
                  <TouchableOpacity
                    onPress={counter == 0 ? resendemail : () => {}}>
                    <Text
                      style={[
                        Styles.respontextstyles3,
                        counter != 0
                          ? {color: Colors.lightGray}
                          : {color: Colors.black},
                      ]}>
                      Resend OTP hhhh
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                onPress={verifycurrentMail}
                disabled={currentMailOtp ? false : true}
                style={{
                  backgroundColor: currentMailOtp
                    ? Colors.darkGreen
                    : Colors.lightGray,
                  paddingVertical: 10,
                  marginTop: 20,
                  borderRadius: 4,
                  height: 40,
                }}>
                {verifyButtonLoading ? (
                  <ActivityIndicator color={'#fff'} size={23} />
                ) : (
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: '700',
                      color: '#fff',
                    }}>
                    SUBMIT
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* {================modal=================} */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={Styles.centeredView}>
            <View style={Styles.modalView}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{alignItems: 'flex-end', top: '-10%'}}>
                <Text>❌</Text>
              </TouchableOpacity>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#aaa',
                  color: '#000',
                  paddingLeft: 10,
                  height: 40,
                }}
                value={code}
                onChangeText={val => setCode(val)}
                placeholder="Enter OTP"
                maxLength={6}
                placeholderTextColor={'#aaa'}
                keyboardType="number-pad"
              />
              <View>
                {/* <TouchableOpacity onPress={resendemail} disabled={disabled}>
                      {disabled ? (
                        <Text style={{color: Colors.black, top: 5}}>
                          {timer > 0 ? `Time remaining:  ${timer} seconds` : ''}
                        </Text>const resendemail = async () => {
    const token = await _getStorage('token');
    setTimer(60); // reset timer
    setDisabled(true);
    const emailObj = {
      email,
    };
    axios
      .put(BASE_URL + `/sendMail`, emailObj, {
        headers: {Authorization: `Bearer ${token}`},
      })

      .then(res => {
        console.log('email response', res.data);
        setemailOtp(res.data.id);
        Toast.showWithGravity(res.data?.message, Toast.LONG, Toast.BOTTOM);
        setCounter(30);
      })
      .catch(error => {
        console.log(
          'email send otp catch error',
          error?.response?.data?.message,
        );
        Toast.showWithGravity(
          error?.response?.data?.message,
          Toast.LONG,
          Toast.BOTTOM,
        );
      });
  };
                      ) : (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text style={{color: Colors.black, top: 5}}>
                            {timer > 0 ? `Time remaining: in ${timer} s` : ''}
                          </Text>
                          <Text
                            style={{
                              color: disabled ? Colors.lightGray : Colors.black,
                              top: 5,
                            }}>
                            Resend OTP
                          </Text>
                        </View>
                      )}
                    </TouchableOpacity> */}

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    top: 3,
                  }}>
                  <Text style={Styles.respontextstyles2}>
                    Time remaining: 00:{counter}
                  </Text>
                  <TouchableOpacity
                    onPress={counter == 0 ? resendemail : () => {}}>
                    <Text
                      style={[
                        Styles.respontextstyles3,
                        counter != 0
                          ? {color: Colors.lightGray}
                          : {color: Colors.black},
                      ]}>
                      Resend OTP
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                onPress={_verifyMailotp}
                disabled={code ? false : true}
                style={{
                  backgroundColor: code ? Colors.darkGreen : Colors.lightGray,
                  paddingVertical: 10,
                  marginTop: 20,
                  borderRadius: 4,
                  height: 40,
                }}>
                {verifyButtonLoading ? (
                  <ActivityIndicator color={'#fff'} size={23} />
                ) : (
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: '700',
                      color: '#fff',
                    }}>
                    SUBMIT
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};

export default EditGmailScreen;

const Styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    borderRadius: 7,
    padding: 25,
    shadowColor: '#000',
    shadowRadius: 4,
    elevation: 5,
  },
  respontextstyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  respontextstyles2: {
    color: 'grey',
    fontSize: 14,
    fontWeight: '500',
  },
  respontextstyles3: {
    fontSize: 15,
    fontWeight: '500',
  },
});
