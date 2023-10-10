import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
  ActivityIndicator,
  Image,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';
import CustomButton from '../ReusableComponents/Button';
// import DatePicker from 'react-native-neat-date-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RadioButton} from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {BASE_URL} from '../Assets/utils/Restapi/Config';
import Toast from 'react-native-simple-toast';
import {_getStorage} from '../Assets/utils/storage/Storage';
import {useIsFocused} from '@react-navigation/native';
import InternetInfoall from '../Assets/utils/Handler/InternetInfoall';
import {Picker} from '@react-native-picker/picker';

const EditProfileScreen = props => {
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
  const isFocused = useIsFocused();
  console.log('===========date===========', date);
  //! ================working on ==============
  const [isGettingOTP, setIsGettingOTP] = useState(false);
  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [StateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const maxDate = new Date(); // Set maximum date to 31st December 2023

  const [timer, setTimer] = useState(60); // set initial timer to 60 seconds
  const [disabled, setDisabled] = useState(false); // enable resend button by default

  useEffect(() => {
    if (isFocused) {
      profiledata();
    }
  }, [isFocused]);

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

  useEffect(() => {
    getStatendCity();
  }, []);

  const getStatendCity = async id => {
    try {
      const res = await axios.get(BASE_URL + `/allCityName`);
      if (res.data.message == 'State Founded successfully') {
        //  console.log('get all state and their city', res.data);
        setStateData(res.data.result);
      }
    } catch (error) {
      console.log('error in get Distric api', error);
    }
  };
  const getCityData = selctState => {
    const selectedStateData = StateData.find(item => item.state === selctState);
    console.log('-------city------', selectedStateData?.cities);
    console.log('-------state------', selectedStateData);
    setCityData(selectedStateData ? selectedStateData?.cities : []);
    console.log('-------city data------', cityData);
    // console.log('Stta......Select', selctState) ;
    // StateData.map((item, index) => {
    //   console.log('Item...................', item.cities);
    //   if (item?.cities === selctState) {
    //     console.log('-------=====>ye..........');
    //   } else {
    //     console.log('no..................');
    //   }
    // });
  };

  const handleSubmit = async () => {
    const token = await _getStorage('token');
    console.log('tokne-=======83', token);
    // Toast.showWithGravity('Please wait...', Toast.SHORT, Toast.BOTTOM);
    let newObj = {
      firstName: firstname,
      lastName: lastname,
      dateOfBirth: date,
      // dateOfBirth: '09/12/2013',
      gender: gender,
      city: city,
      pincode: Number(pincode),
      state,
      address: address,
      email: email,
    };
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
        console.log(
          'in catch handle submit===109',
          error.response.data.message,
        );
        setIsLoading(false);
        if (state == '') {
          //Toast.showWithGravity('Server Error❗', Toast.LONG, Toast.BOTTOM);
        }
        //Toast.showWithGravity('Server Error❗', Toast.LONG, Toast.BOTTOM);
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
        setState(val?.data?.result?.state);
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

      .catch(e => {
        console.log('catch error in get profile', e);
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
    const dt = new Date(date);
    const x = dt.toISOString().split('T');
    const x1 = x[0].split('-');
    console.log(x1[2] + '/' + x1[1] + '/' + x1[0]);
    setDate(x1[2] + '/' + x1[1] + '/' + x1[0]);

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
        Toast.showWithGravity(
          error.response.data.message,
          Toast.LONG,
          Toast.BOTTOM,
        );
      });
  };

  const LoginApisendmailotp = async () => {
    const token = await _getStorage('token');
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
        setIsGettingOTP(false);
        setIsLoading();
        setModalVisible(!modalVisible);
      })

      .catch(error => {
        console.log('email send otp catch error', error.response.data.message);
        setIsGettingOTP(false);
        Toast.showWithGravity(
          error.response.data.message,
          Toast.LONG,
          Toast.BOTTOM,
        );
      });
  };

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

  const [counter, setCounter] = React.useState(30);

  useEffect(() => {
    const timer =
      counter > 0 &&
      setInterval(() => {
        let newTime = ('0' + (counter - 1).toString()).slice(-2);
        setCounter(newTime);
      }, 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <SafeAreaView style={{flex: 1, marginTop: hp('3.2%')}}>
      <StatusBar backgroundColor={Colors.topNavbarColor} />
      <Header
        bgColor={Colors.topNavbarColor}
        color={Colors.white}
        title="Edit Profile"
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
                  borderColor: Colors.purple,
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
                  borderColor: Colors.purple,
                  borderWidth: 1,
                  borderRadius: 6,
                  paddingHorizontal: 15,
                  marginVertical: 5,
                  color: 'black',
                }}
              />
              {/* <Text
                style={{
                  marginHorizontal: 20,
                  fontWeight: 'bold',
                  fontSize: 15,
                  top: 5,
                  color: Colors.black,
                }}>
                Date of Birth
              </Text> */}
              {/* <View
                style={{
                  height: 45,
                  borderWidth: 1,
                  marginHorizontal: 20,
                  margin: 10,
                  borderRadius: 6,
                  justifyContent: 'center',
                  paddingHorizontal: 13,
                  borderColor: Colors.purple,
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
                      // minDate={new Date()}
                      maximumDate={maxDate}
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
              </View> */}
              {/* <Text
                style={{
                  marginHorizontal: 20,
                  fontWeight: 'bold',
                  fontSize: 15,
                  // top: 5,
                  color: Colors.black,
                }}>
                Gender
              </Text> */}

              {/* <View
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
                    color={Colors.purple}
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
                    color={Colors.purple}
                    status={gender === 'female' ? 'checked' : 'unchecked'}
                    onPress={() => setGender('female')}
                  />
                  <Text
                    style={{top: 10, fontWeight: '500', color: Colors.black}}>
                    Female
                  </Text>
                </View>
              </View> */}

              {/* <View> */}
              {/* <Text
                  style={{
                    marginHorizontal: 20,
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: Colors.black,
                  }}>
                  State
                </Text> */}
              {/* <TextInput
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
                /> */}

              {/* <View
                style={{
                  marginHorizontal: 15,
                  borderColor: Colors.purple,
                  borderWidth: 1,
                  borderRadius: 6,
                  // paddingHorizontal: 15,
                  marginVertical: 5,
                  color: 'black',
                  // height: 60,
                  justifyContent: 'center',
                  alignContent: 'center',
                  paddingLeft: 4,

                  // backgroundColor: '#ffff',
                }}> */}
              {/* <Picker
                  dropdownIconColor={'#B6B6B6'}
                  dropdownIconRippleColor={'#775AAC'}
                  style={{
                    color: '#000',
                    // fontSize: 20,
                    // width: '90%',
                    // height: 45,
                    // backgroundColor: '#F8F7FF',/
                    // borderRadius: 8,
                    // borderColor: 'red',
                    // borderWidth: 5,
                  }}
                  selectedValue={state}
                  onValueChange={itemValue => {
                    setState(itemValue), getCityData(itemValue);
                  }}>
                  <Picker.Item
                    style={Styles.pickerItem}
                    label="State"
                    value=""
                    // enabled={false}
                  />
                  {StateData.map((item, id) => (
                    // console.log(StateData, 'STate Data'),
                    <Picker.Item
                      style={Styles.pickerItem}
                      value={item.state}
                      key={id} // Assuming each state object has a unique 'id' property
                      label={item.state}
                    />
                  ))}
                </Picker> */}
              {/* </View> */}
              {/* </View> */}
              {/* <View>
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
                    borderColor: Colors.purple,
                    borderWidth: 1,
                    borderRadius: 6,
                    paddingHorizontal: 15,
                    marginVertical: 5,
                    color: 'black',
                  }}
                />
              </View> */}

              {/* <View
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
              </View> */}
              {/* <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 15,
                }}> */}
              {/* <View
                  style={{
                    width: '40%',
                    height: 55,
                    borderColor: Colors.purple,
                    borderWidth: 1,
                    borderRadius: 6,
                    marginVertical: 5,
                    justifyContent: 'center',
                    alignContent: 'center',
                    paddingHorizontal: 4,
                  }}>
                  <Picker
                    dropdownIconColor={'#B6B6B6'}
                    dropdownIconRippleColor={'#775AAC'}
                    style={{
                      borderRadius: 6,
                      width: '100%',
                      // height: 50,
                      // backgroundColor: '#ffff',
                      borderRadius: 8,
                      // borderColor: 'red'
                      borderWidth: 5,
                      color: '#000',
                    }}
                    selectedValue={city}
                    onValueChange={itemValue => {
                      setCity(itemValue);
                      // getCityData(itemValue);
                    }}>
                    <Picker.Item
                      style={Styles.pickerItem}
                      label="City"
                      value=""
                      // enabled={false}
                    />
                    {cityData.length > 0 &&
                      cityData.map(
                        (item, id) => (
                          console.log('city data in map', cityData),
                          (
                            <Picker.Item
                              style={Styles.pickerItem}
                              value={item}
                              key={id} // Assuming each state object has a unique 'id' property
                              label={item}
                            />
                          )
                        ),
                      )}
                  </Picker>
                </View> */}

              {/* <TextInput
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
                /> */}
              {/* <TextInput
                  placeholder="Pin Code"
                  placeholderTextColor="grey"
                  value={pincode}
                  keyboardType="numeric"
                  maxLength={6}
                  onChangeText={text => {
                    setPincode(text);
                  }}
                  style={{
                    borderColor: Colors.purple,
                    borderWidth: 1,
                    borderRadius: 6,
                    paddingHorizontal: 15,
                    marginVertical: 10,
                    width: '45%',
                    height: '70%',
                    color: 'black',
                  }}
                />
              </View> */}

              <View style={{marginTop: 10}}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 15,
                    fontWeight: 'bold',
                    marginHorizontal: 20,
                  }}>
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
                    borderColor: Colors.purple,
                    height: 50,
                    borderRadius: 5,
                    marginVertical: 7,
                    marginHorizontal: 15,
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
                    style={{
                      borderWidth: 1,
                      borderColor: Colors.purple,
                      marginHorizontal: 8,
                      paddingVertical: 8,
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '23%',
                      borderRadius: 7,
                      backgroundColor: Colors.purple,
                    }}>
                    <Text
                      style={{
                        color: Colors.white,
                        fontWeight: '500',
                        fontSize: 13,
                      }}>
                      Get OTP
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{}}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 15,
                    fontWeight: 'bold',
                    marginHorizontal: 18,
                  }}>
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
                    borderColor: Colors.purple,
                    height: 50,
                    borderRadius: 5,
                    marginVertical: 10,
                    marginHorizontal: 18,
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
                    title={'Update Profile'}
                    bgColor={Colors.purple}
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
                        </Text>
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
                          Resend code
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={_verifyMailotp}
                    disabled={code ? false : true}
                    style={{
                      backgroundColor: code
                        ? Colors.darkGreen
                        : Colors.lightGray,
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
                      SUBMIT
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </ScrollView>
        </View>
      )}
      <InternetInfoall />
    </SafeAreaView>
  );
};

export default EditProfileScreen;

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
  timestyles: {
    color: 'grey',
    fontWeight: '500',
    fontSize: 15,
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
  pickerItem: {
    height: 45,
    fontSize: 14,
    // fontWeight: 'bold',
    // color: '#000',
    // backgroundColor: '#F8F7FF',
    // backgroundColor: '#ffff',
  },
});
