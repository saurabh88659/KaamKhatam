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

const RegisterAccount = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [date, setDate] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [changemobile, setMobilechange] = useState('');
  const [code, setCode] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  const [gender, setGender] = useState('');

  // console.log({firstname, lastname, date, gender, city, pincode});

  const handleSubmit = async () => {
    // props.navigation.navigate('Location');
    let newObj = {
      firstName: firstname,
      lastName: lastname,
      dateOfBirth: date,
      gender: gender,
      city: city,
      pincode: Number(pincode),
    };
    console.log(newObj);
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    console.log('newOBJ', newObj);
    setIsLoading(true);
    axios
      .put('https://all-in-one-app-sa.herokuapp.com/user/profile', newObj, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(val => {
        console.log(val.data);
        // setIsLoading(false);
        props.navigation.navigate('TabNavigation');
      })
      .catch(e => {
        console.log('in catch');
        console.log(e);
      });
  };

  // =====================++++++++++=====================
  const [dataupdate, setDataupdate] = useState({});

  useEffect(async () => {
    const token = await AsyncStorage.getItem('token');

    axios
      .get('https://all-in-one-app-sa.herokuapp.com/user/profile', {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(val => {
        setDataupdate(val.data.result);
        setFirstname(val.data.result.firstName);
        setLastname(val.data.result.lastName);
        setDate(val.data.result.dateOfBirth);
        setCity(val.data.result.city);
        setGender(val.data.result.gender);
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
        console.log('in catch');
        console.log(e);
        setIsLoading(false);
      });
  }, []);

  const [getDate, setGetDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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

    hideDatePicker();
  };

  // ======================email intrigation===================
  // const [errorEmail, setErrorEmail] = useState(null);

  const [email, setEmail] = useState('');
  const [emailOtp, setemailOtp] = useState('');

  const handleOkay = async () => {
    // console.log('Hey');
    // console.log('otp', emailOtp);
    // console.log('OTP', code);
    const token = await AsyncStorage.getItem('token');
    const obj = {
      id: emailOtp,
      otp: Number(code),
    };
    console.log(obj);
    axios
      .post('https://all-in-one-app-sa.herokuapp.com/user/verifyMailOTP', obj, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(value => {
        console.log(value.data);
      })
      .catch(e => {
        console.log(e);
      });
    setModalVisible(!modalVisible);
  };

  const LoginApi = async () => {
    console.log('hi=============================');

    const token = await AsyncStorage.getItem('token');
    console.log('email-------------', token);

    // setLoader(true);

    axios
      .post(
        'https://all-in-one-app-sa.herokuapp.com/user/sendMail',
        {
          email: email,
        },
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      )
      .then(value => {
        // AsyncStorage.setItem('token', value.data.token);
        // console.log('h4h4h4h4==', value.data.id);
        setemailOtp(value.data._id);
        let aasdsadasd = value.data.id;
        setemailOtp(aasdsadasd);
      })
      .catch(e => {
        console.log(e);
      });
  };
  ////////////////////////////////////////////////////////////////////

  const resendemail = async () => {
    console.log('HIHIHI');
    const token = await AsyncStorage.getItem('token');

    axios
      .post(
        'https://all-in-one-app-sa.herokuapp.com/user/sendMail',
        {
          email: email,
        },
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      )
      .then(value => {
        setemailOtp(value.data._id);
        let aasdsadasd = value.data.id;
        setemailOtp(aasdsadasd);
        console.log('resend sucessfully');
      })
      .catch(e => {
        console.log(e);
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
      {isLoading ? (
        <View
          style={{
            minHeight: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color={Colors.darkOrange} size="large" />
        </View>
      ) : (
        <View>
          <ScrollView contentContainerStyle={{paddingBottom: 100}}>
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 15,
                  marginHorizontal: 20,
                  top: 10,
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
                  // backgroundColor: 'red',
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
                  // backgroundColor: 'red',
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
                  <Text>{date}</Text>
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
                  <Text style={{top: 10, fontWeight: '500'}}>Male</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <RadioButton
                    value="female"
                    status={gender === 'female' ? 'checked' : 'unchecked'}
                    onPress={() => setGender('female')}
                  />
                  <Text style={{top: 10, fontWeight: '500'}}>Female</Text>
                </View>
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
                    onPress={() => {
                      setModalVisible(true);
                      LoginApi();
                    }}
                    // onPress={LoginApi}
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

              {isLoading ? (
                <ActivityIndicator
                  color="#FFA034"
                  size="large"
                  style={{alignSelf: 'center', top: 20}}
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
                    onPress={handleOkay}
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
