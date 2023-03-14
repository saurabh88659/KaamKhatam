import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import CustomButton from '../ReusableComponents/Button';
// import DatePicker from 'react-native-neat-date-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {height, width} = Dimensions.get('window');
import {RadioButton} from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {BASE_URL} from '../Assets/utils/Restapi/Config';
import Toast from 'react-native-simple-toast';
import {_getStorage} from '../Assets/utils/storage/Storage';

const RegisterAccount = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [date, setDate] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [changemobile, setMobilechange] = useState('');
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [emailOtp, setemailOtp] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [gender, setGender] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [dataupdate, setDataupdate] = useState({});
  const [getDate, setGetDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  //! ================working on ==============
  const [isGettingOTP, setIsGettingOTP] = useState(false);
  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    profiledata();
  }, []);

  const handleSubmit = async () => {
    const token = await _getStorage('token');

    Toast.showWithGravity('Please wait...', Toast.LONG, Toast.BOTTOM);

    let newObj = {
      firstName: firstname,
      lastName: lastname,
      dateOfBirth: date,
      gender: gender,
      city: city,
      pincode: Number(pincode),
      state,
      address: address,
    };
    console.log(token);
    console.log('newOBJ', newObj);
    setIsLoading(true);
    axios
      .put(BASE_URL + `/profile`, newObj, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(val => {
        console.log(val.data);
        setIsLoading(false);
        props.navigation.navigate('DrowerNavigation');
        Toast.showWithGravity(val.data.message, Toast.LONG, Toast.BOTTOM);
      })
      .catch(error => {
        console.log('in catch', error.response.data.message);
        setIsLoading(false);
        Toast.showWithGravity('Server Error❗', Toast.LONG, Toast.BOTTOM);
      });
  };

  // =====================++++++++++=====================

  const profiledata = async () => {
    const token = await _getStorage('token');
    // console.log('token----------------------------', token);

    axios
      .get(BASE_URL + `/profile`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(val => {
        setDataupdate(val.data.result);
        setFirstname(val.data.result.firstName);
        setLastname(val.data.result.lastName);
        setDate(val.data.result.dateOfBirth);
        setCity(val.data.result.city);
        setGender(val.data.result.gender);
        setState(val.data.result.state);
        setAddress(val.data.result.address);

        setPincode(
          val.data.result.pincode
            ? String(val.data.result.pincode)
            : val.data.result.pincode,
        );
        setMobilechange(val.data.result.phone);
        setEmail(val.data.result.email);
        console.log(val.data.result);
        setIsLoading(false);
      })

      .catch(error => {
        console.log('catch error in get profile', error);
        setIsLoading(false);
      });
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
    AsyncStorage.getItem('Date').then(value => setGetDate(value));
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    let c =
      (date.getMonth() > 8
        ? date.getMonth() + 1
        : '0' + (date.getMonth() + 1)) +
      '/' +
      (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) +
      '/' +
      date.getFullYear();

    setDate(c);
    // const formattedDate = `${('0' + date.getDate()).slice(-2)}/${(
    //   '0' +
    //   (date.getMonth() + 1)
    // ).slice(-2)}/${date.getFullYear()}`;

    // setDate(formattedDate);

    hideDatePicker();
  };

  // ======================email intrigation===================

  const _verifyMailotp = async () => {
    const token = await _getStorage('token');
    Toast.showWithGravity('Please wait...', Toast.LONG, Toast.BOTTOM);

    const obj = {
      id: emailOtp,
      otp: Number(code),
    };
    axios
      .post(BASE_URL + `/verifyMailOTP`, obj, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(value => {
        console.log(value.data);
        setModalVisible(!modalVisible);
        setIsVerified(true);
        setIsVerifyingOTP(false);
        Toast.showWithGravity(value.data.message, Toast.LONG, Toast.BOTTOM);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };

  const LoginApisendmailotp = async () => {
    const token = await _getStorage('token');
    // console.log('email-------------.....>>>', token);

    const emailObj = {
      email,
    };
    // console.log('emailObj', emailObj);

    axios
      .put(BASE_URL + `/sendMail`, emailObj, {
        headers: {Authorization: `Bearer ${token}`},
      })

      .then(res => {
        console.log('email response', res.data);
        setemailOtp(res.data.id);
        setIsGettingOTP(false);
        setIsLoading();
        setModalVisible(!modalVisible);
      })

      .catch(error => {
        console.log('email send otp catch error', error.response.data.message);
        setIsGettingOTP(false);
      });
  };

  const resendemail = async () => {
    const token = await _getStorage('token');
    const emailObj = {
      email,
    };
    // console.log('emailObj', emailObj);

    axios
      .put(BASE_URL + `/sendMail`, emailObj, {
        headers: {Authorization: `Bearer ${token}`},
      })

      .then(res => {
        console.log('email response', res.data);
        setemailOtp(res.data.id);
      })

      .catch(error => {
        console.log('email send otp catch error', error.response.data.message);
      });
  };

  return (
    <SafeAreaView>
      <Header
        bgColor={Colors.darkOrange}
        color={Colors.white}
        title="Register Account"
        onPress={() => props.navigation.goBack()}
      />
      {isLoading === true ? (
        <View
          style={{
            minHeight: '90%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color={Colors.darkOrange} size="large" />
        </View>
      ) : (
        <View>
          <ScrollView
            contentContainerStyle={{paddingBottom: '40%'}}
            showsVerticalScrollIndicator={false}>
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 15,
                  marginHorizontal: 20,
                  top: 10,
                  color: Colors.black,
                }}>
                First Name
              </Text>
              <TextInput
                placeholder="First Name"
                placeholderTextColor="grey"
                value={firstname}
                onChangeText={text => {
                  setFirstname(text);
                }}
                style={{
                  marginHorizontal: 15,
                  borderColor: 'grey',
                  borderWidth: 1,
                  borderRadius: 6,
                  paddingHorizontal: 15,
                  marginVertical: 15,
                  color: 'black',
                }}
              />
              <Text
                style={{
                  marginHorizontal: 20,
                  fontWeight: 'bold',
                  fontSize: 15,
                  color: Colors.black,
                }}>
                Last Name
              </Text>
              <TextInput
                placeholder="Last Name"
                placeholderTextColor="grey"
                value={lastname}
                onChangeText={text => {
                  setLastname(text);
                }}
                style={{
                  marginHorizontal: 15,
                  borderColor: 'grey',
                  borderWidth: 1,
                  borderRadius: 6,
                  paddingHorizontal: 15,
                  marginVertical: 5,
                  color: 'black',
                }}
              />
              <Text
                style={{
                  marginHorizontal: 20,
                  fontWeight: 'bold',
                  fontSize: 15,
                  top: 5,
                  color: Colors.black,
                }}>
                Date of Birth
              </Text>
              <View
                style={{
                  height: 45,
                  borderWidth: 1,
                  marginHorizontal: 20,
                  margin: 10,
                  borderRadius: 6,
                  justifyContent: 'center',
                  paddingHorizontal: 13,
                  borderColor: 'grey',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{color: Colors.black}}>{date}</Text>
                  <View>
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={handleConfirm}
                      onCancel={hideDatePicker}
                    />
                    <TouchableOpacity onPress={showDatePicker}>
                      <FontAwesome5Icon
                        name="calendar-alt"
                        color="#a9a9a9"
                        size={hp('3%')}
                        style={{marginRight: hp('1%')}}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <Text
                style={{
                  marginHorizontal: 20,
                  fontWeight: 'bold',
                  fontSize: 15,
                  // top: 5,
                  color: Colors.black,
                }}>
                Gender
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 30,
                  alignItems: 'center',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <RadioButton
                    name="male"
                    value="male"
                    status={gender === 'male' ? 'checked' : 'unchecked'}
                    onPress={() => setGender('male')}
                  />
                  <Text
                    style={{top: 10, fontWeight: '500', color: Colors.black}}>
                    Male
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <RadioButton
                    value="female"
                    status={gender === 'female' ? 'checked' : 'unchecked'}
                    onPress={() => setGender('female')}
                  />
                  <Text
                    style={{top: 10, fontWeight: '500', color: Colors.black}}>
                    Female
                  </Text>
                </View>
              </View>
              <View>
                <Text
                  style={{
                    marginHorizontal: 20,
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: Colors.black,
                  }}>
                  State
                </Text>
                <TextInput
                  placeholder="State"
                  placeholderTextColor="grey"
                  value={state}
                  onChangeText={text => {
                    setState(text);
                  }}
                  style={{
                    marginHorizontal: 15,
                    // backgroundColor: 'red',
                    borderColor: 'grey',
                    borderWidth: 1,
                    borderRadius: 6,
                    paddingHorizontal: 15,
                    marginVertical: 5,
                    color: 'black',
                  }}
                />
              </View>
              <View>
                <Text
                  style={{
                    marginHorizontal: 20,
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: Colors.black,
                  }}>
                  Address
                </Text>
                <TextInput
                  placeholder="Address"
                  placeholderTextColor="grey"
                  value={address}
                  onChangeText={text => {
                    setAddress(text);
                  }}
                  style={{
                    marginHorizontal: 15,
                    borderColor: 'grey',
                    borderWidth: 1,
                    borderRadius: 6,
                    paddingHorizontal: 15,
                    marginVertical: 5,
                    color: 'black',
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 20,
                }}>
                <Text
                  style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
                  City
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 15,
                    fontWeight: 'bold',
                    right: 80,
                  }}>
                  Pin Code
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 20,
                }}>
                <TextInput
                  placeholder="City"
                  placeholderTextColor="grey"
                  value={city}
                  onChangeText={text => {
                    setCity(text);
                  }}
                  style={{
                    borderColor: 'grey',
                    borderWidth: 1,
                    borderRadius: 6,
                    paddingHorizontal: 15,
                    marginVertical: 10,
                    width: '45%',
                    height: '70%',
                    color: 'black',
                  }}
                />
                <TextInput
                  placeholder="Pin Code"
                  placeholderTextColor="grey"
                  value={pincode}
                  keyboardType="numeric"
                  onChangeText={text => {
                    setPincode(text);
                  }}
                  style={{
                    borderColor: 'grey',
                    borderWidth: 1,
                    borderRadius: 6,
                    paddingHorizontal: 15,
                    marginVertical: 10,
                    width: '45%',
                    height: '70%',
                    color: 'black',
                  }}
                />
              </View>
              <View style={{marginHorizontal: 20}}>
                <Text
                  style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
                  Email ID
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
                  }}>
                  <TextInput
                    placeholder="Email ID"
                    placeholderTextColor="grey"
                    value={email}
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
                    // onPress={() => setModalVisible(!modalVisible)}
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
                  {/* <TouchableOpacity
                    onPress={LoginApisendmailotp}
                    style={{
                      position: 'absolute',
                      backgroundColor: isVerified
                        ? Colors.darkGreen
                        : Colors.lightYellow,
                      right: 10,
                      paddingHorizontal: 14,
                      paddingVertical: 7,
                      borderRadius: 2,
                      justifyContent: 'center',
                      borderRadius: 6,
                    }}>
                    {isGettingOTP ? (
                      <ActivityIndicator size={20} color={Colors.darkGreen} />
                    ) : isVerified ? (
                      <Text
                        style={{
                          color: 'black',
                        }}>
                        verifed
                      </Text>
                    ) : (
                      <Text
                        style={{
                          color: 'black',
                        }}>
                        verify
                      </Text>
                    )}
                  </TouchableOpacity> */}
                </View>
              </View>
              <View style={{marginHorizontal: 20}}>
                <Text
                  style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
                  Mobile Number
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
                  }}>
                  <Text
                    style={{
                      flex: 1,
                      height: 40,
                      fontSize: 15,
                      color: 'black',
                      paddingHorizontal: 15,
                      top: 10,
                    }}>
                    {dataupdate.phone}
                  </Text>

                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate(
                        'EditMobileNumber',
                        dataupdate.phone,
                      )
                    }
                    style={{
                      marginHorizontal: 8,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={require('../Assets/Images/editicones.png')}
                      style={{width: 24, height: 24}}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {isLoading === true ? (
                <ActivityIndicator
                  color="#FFA034"
                  size="large"
                  style={{alignSelf: 'center'}}
                />
              ) : (
                <View style={{alignItems: 'center'}}>
                  <CustomButton
                    title={'SUBMIT'}
                    bgColor={Colors.darkGreen}
                    width={wp('90%')}
                    height={hp('6.6%')}
                    color={Colors.white}
                    onPress={handleSubmit}
                  />
                </View>
              )}
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <View style={Styles.centeredView}>
                <View style={Styles.modalView}>
                  <OTPInputView
                    style={{width: '80%', height: 200}}
                    pinCount={6}
                    autoFocusOnLoad
                    codeInputFieldStyle={Styles.underlineStyleBase}
                    codeInputHighlightStyle={Styles.underlineStyleHighLighted}
                    onCodeFilled={code => {
                      setCode(code);
                      console.log(`Code is ${code}, you are good to go!`);
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{color: 'grey', top: -130, right: 60}}>
                      Time remaining
                    </Text>
                    <Text style={{color: 'black', top: -130, right: 55}}>
                      00:30s
                    </Text>
                    <TouchableOpacity
                      onPress={resendemail}
                      style={{top: -130, left: 60}}>
                      <Text style={{color: 'grey'}}>Resend code</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    // onPress={() => setModalVisible(!modalVisible)}
                    onPress={_verifyMailotp}
                    // onPress={formdata}
                    style={{
                      backgroundColor: '#138F00',
                      height: height / 20,
                      width: width / 3,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 7,
                      top: -80,
                    }}>
                    <Text style={{color: 'white'}}>Okay</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

export default RegisterAccount;

const Styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    height: height / 3.6,
    width: width / 1,
  },

  underlineStyleBase: {
    width: 40,
    borderWidth: 0,
    borderBottomWidth: 2,
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    top: -60,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});
