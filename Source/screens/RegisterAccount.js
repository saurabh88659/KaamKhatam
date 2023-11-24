import {
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
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
const {height, width} = Dimensions.get('window');
import {RadioButton} from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {BASE_URL} from '../Assets/utils/Restapi/Config';
import Toast from 'react-native-simple-toast';
import {_getStorage} from '../Assets/utils/storage/Storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-picker/picker';
import notificationOndisplay, {
  notificationListeners,
} from '../notification/notificationOndisplay';
import {useSelector} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';

// import { SetLatitude, SetLongitude } from '../features/updatedata/update.reducer';

const RegisterAccount = props => {
  // const latitude = useSelector(state => state.updateState.latitude);
  // const longitude = useSelector(state => state.updateState.longitude);

  const [modalVisible, setModalVisible] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [error, setError] = useState('');
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
  const [counter, setCounter] = React.useState(30);
  const [currentDate, setCurrentDate] = useState();
  const [StateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  // console.log('----state data-----', StateData);
  const [isGettingOTP, setIsGettingOTP] = useState(false);
  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [butttonLoading, setButtonLoading] = useState(false);
  const [deviceToken, setDeviceToken] = useState(null);
  const [flat, setFlat] = useState('');
  const [area, setArea] = useState('');
  const [landMark, setLandMark] = useState('');
  const [latitude, SetLatitude] = useState('');
  const [longitude, SetLongitude] = useState('');
  const [currentLocationLoadingButton, SetCurrentLocationLoadingButton] =
    useState(false);
  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(data => {
      SetLatitude(data.coords.latitude), SetLongitude(data.coords.longitude);
      console.log(
        'latitue and longiture at useEfcct========>>>>',
        data.coords.longitude,
        data.coords.latitude,
      );
    });
  }, [currentLocationLoadingButton]);

  const getCurrentAddress = async () => {
    SetCurrentLocationLoadingButton(true);
    const token = await _getStorage('token');
    console.log(token);
    if (latitude && longitude) {
      const dataObj = {
        lat: latitude,
        long: longitude,
      };
      console.log('dataObj of current location ====>', dataObj);
      axios
        .post(BASE_URL + `/currentLocation`, dataObj, {
          headers: {Authorization: `Bearer ${token}`},
        })
        .then(res => {
          SetCurrentLocationLoadingButton(false);

          console.log(
            'res of getCurrentAddress home.js =======>',
            res.data.address.address,
          );
          setPincode(res.data?.address?.address?.postcode);
          if (res.data.address.address.building) {
            setFlat(res.data.address.address.building);
          }
          if (res.data.address.address.state) {
            setState(res.data.address.address.state);
          }
          if (res.data.address.address.city) {
            setCity(res.data.address.address.city);
          }
          if (res.data.address.address.road) {
            setLandMark(res.data.address.address.road);
          }
          if (res.data.address.address.suburb) {
            setArea(res.data.address.address.suburb);
            console.log(
              '============setArea==========',
              res.data.address.address.Sector,
            );
          }
        })
        .catch(error => {
          SetCurrentLocationLoadingButton(false);

          console.log('error of getCurrentAddress home.js======>', error);
        });
    } else {
      SetCurrentLocationLoadingButton(false);
      Toast.showWithGravity(
        'Your location will help us serve you better – mind turning it on?',
        Toast.LONG,
        Toast.BOTTOM,
      );
    }
  };

  useEffect(() => {
    geteviceToken();
    HandleNotificationOndisplay();
  }, []);
  const geteviceToken = async () => {
    const token = await notificationOndisplay.getDeviceToken();
    setDeviceToken(token);
    console.log('==================device token==================', token);
  };

  const HandleNotificationOndisplay = () => {
    notificationListeners();
  };

  useEffect(() => {
    getCurrentDate();
  }, []);

  useEffect(() => {
    profiledata();
  }, []);

  const handleSubmit = async () => {
    setButtonLoading(true);
    if (!isVerified) {
      Toast.showWithGravity(
        'Please verify your email first',
        Toast.SHORT,
        Toast.BOTTOM,
      );
      setButtonLoading(false);
    } else if (!firstNameError && !lastNameError) {
      const token = await _getStorage('token');
      let newObj = {
        firstName: firstname,
        lastName: lastname,
        dateOfBirth: date,
        gender: gender,
        city: city,
        pincode: Number(pincode),
        state,
        email: email,
        flat: flat,
        area: area,
        landmark: landMark,
        phone: dataupdate.phone,
        deviceToken: deviceToken,
        location: {
          type: 'Point',
          coordinates: [latitude, longitude],
        },
      };

      console.log('newOBJ', newObj);
      setIsLoading(true);
      axios
        .put(BASE_URL + `/profile`, newObj, {
          headers: {Authorization: `Bearer ${token}`},
        })
        .then(val => {
          console.log('val data of profile put===>', val.data);
          setIsLoading(false);
          props.navigation.navigate('Location');
          setButtonLoading(false);
          Toast.showWithGravity(val.data.message, Toast.SHORT, Toast.BOTTOM);
        })
        .catch(error => {
          setButtonLoading(false);
          console.log('in catch====>', error);
          Toast.showWithGravity(
            error?.response?.data?.message,
            Toast.SHORT,
            Toast.BOTTOM,
          );
          setIsLoading(false);
          //Toast.showWithGravity('Server Error❗', Toast.LONG, Toast.BOTTOM);
        });
    } else if (firstNameError || lastNameError) {
      setButtonLoading(false);
      Toast.showWithGravity(
        'Please Enter Valid details',
        Toast.SHORT,
        Toast.BOTTOM,
      );
    }
  };

  console.log('State.........................................', state);
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
        if (val.data.result.email) {
          setIsVerified(true);
        }
        console.log('get profile data===161', val.data.result);
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
        console.log(value.data);
        setModalVisible(!modalVisible);
        setIsVerified(true);
        setIsVerifyingOTP(false);
        Toast.showWithGravity(value.data.message, Toast.SHORT, Toast.BOTTOM);
      })
      .catch(error => {
        console.log('Email catch error ', error.response.data);
        Toast.showWithGravity(
          error.response.data.message,
          Toast.SHORT,
          Toast.BOTTOM,
        );
      });
  };

  //=[======handle inpout ======================================]
  const numberRegex = /\d/;

  const handleNameInput = (text, fieldName) => {
    console.log('fieldName', fieldName);
    if (numberRegex.test(text)) {
      if (fieldName === 'firstName') {
        setFirstNameError('Please enter a valid first name');
      } else if (fieldName === 'lastName') {
        setLastNameError('Please enter a valid last name');
      }
    } else {
      if (fieldName === 'firstName') {
        setFirstNameError('');
      } else if (fieldName === 'lastName') {
        setLastNameError('');
      }
    }
  };

  console.log('error', error);
  //===============get state data
  useEffect(() => {
    getStatendCity();
    // setCityData([]);
    // getCityData([]);
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
  console.log('state and city', city, state);

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
        console.log('email response==', res.data);
        setemailOtp(res.data.id);
        setIsGettingOTP(false);
        setIsLoading();
        setModalVisible(!modalVisible);
      })

      .catch(error => {
        console.log(
          'email send otp catch error  318',
          error.response.data.message,
        );
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
    const emailObj = {
      email,
    };
    axios
      .put(BASE_URL + `/sendMail`, emailObj, {
        headers: {Authorization: `Bearer ${token}`},
      })

      .then(res => {
        console.log('email response====', res.data);
        setemailOtp(res.data.id);
        Toast.showWithGravity(res.data.message, Toast.LONG, Toast.BOTTOM);
        setCounter(30);
        console.log(counter);
      })
      .catch(error => {
        console.log('email send otp catch error', error.response.data.message);
        Toast.showWithGravity(
          error.response.data.message,
          Toast.LONG,
          Toast.BOTTOM,
        );
      });
  };

  // const handleInput
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
    <SafeAreaView style={{}}>
      <Header
        bgColor={Colors.topNavbarColor}
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
          <ActivityIndicator color={Colors.purple} size="large" />
        </View>
      ) : (
        <View style={{}}>
          <ScrollView
            contentContainerStyle={{
              paddingBottom: '40%',
              backgroundColor: '#fff',
            }}
            showsVerticalScrollIndicator={false}>
            <View style={{backgroundColor: '#FFF'}}>
              <TouchableOpacity
                onPress={getCurrentAddress}
                style={{
                  // height: hp('10%'),
                  // width: '100%',
                  // backgroundColor: 'red',
                  marginHorizontal: 15,
                  borderColor: Colors.purple,
                  borderWidth: 1,
                  borderRadius: 6,
                  // paddingHorizontal: 30,
                  // marginVertical: 15,
                  color: 'black',
                  marginTop: 8,
                  paddingVertical: 13,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 15,
                  // marginVertical: 10,
                }}>
                {currentLocationLoadingButton ? (
                  <ActivityIndicator size={21} color={Colors.topNavbarColor} />
                ) : (
                  <Text style={{color: '#000', fontSize: 17}}>
                    Use current location
                  </Text>
                )}
              </TouchableOpacity>
              <View
                style={{
                  height: hp('13%'),
                  // backgroundColor: 'red',
                  // marginTop: -6,
                }}>
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
                  keyboardType={'default'}
                  onChangeText={text => {
                    setFirstname(text), handleNameInput(text, 'firstName');
                  }}
                  style={{
                    marginHorizontal: 15,
                    borderColor: Colors.purple,
                    borderWidth: 1,
                    borderRadius: 6,
                    paddingHorizontal: 15,
                    // marginVertical: 15,
                    color: 'black',
                    marginTop: 15,
                  }}
                />
                {firstNameError ? (
                  <Text style={{color: 'red', marginHorizontal: 20}}>
                    {firstNameError}
                  </Text>
                ) : null}
              </View>

              <View style={{height: hp('11%')}}>
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
                    setLastname(text), handleNameInput(text, 'lastName');
                  }}
                  style={{
                    marginHorizontal: 15,
                    borderColor: Colors.purple,
                    borderWidth: 1,
                    borderRadius: 6,
                    paddingHorizontal: 15,
                    // marginVertical: 5,
                    marginTop: 5,
                    color: 'black',
                  }}
                />
                {lastNameError ? (
                  <Text
                    style={{
                      color: 'red',
                      marginHorizontal: 20,
                      // marginBottom: 10,
                    }}>
                    {lastNameError}
                  </Text>
                ) : null}
              </View>
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
                  height: 52,
                  borderWidth: 1,
                  marginHorizontal: 16,
                  margin: 10,
                  borderRadius: 6,
                  justifyContent: 'center',
                  paddingHorizontal: 13,
                  borderColor: Colors.purple,
                }}>
                <TouchableOpacity
                  onPress={showDatePicker}
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
                      maximumDate={new Date()}
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
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  marginHorizontal: 20,
                  fontWeight: 'bold',
                  fontSize: 15,
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
                    uncheckedColor="#5E2DC4"
                    color="#5E2DC4"
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
                    uncheckedColor="#5E2DC4"
                    color="#5E2DC4"
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
                  editable={false}
                  placeholder="State"
                  placeholderTextColor="grey"
                  value={state}
                  onChangeText={text => {
                    setState(text);
                  }}
                  style={{
                    marginHorizontal: 15,
                    // backgroundColor: 'red',
                    borderColor: Colors.purple,
                    borderWidth: 1,
                    borderRadius: 6,
                    paddingHorizontal: 15,
                    marginVertical: 5,
                    color: 'black',
                  }}
                />

                {/* -------------------------------Picker-------------------------------------- */}

                {/* <View
                  style={{
                    marginHorizontal: 15,
                    borderColor: Colors.purple,
                    borderWidth: 1,
                    borderRadius: 6,
                    // paddingHorizontal: 15,
                    marginVertical: 5,
                    // color: 'black',
                    height: 53,
                    justifyContent: 'center',
                    alignContent: 'center',
                    paddingLeft: 4,
                    // backgroundColor: '#ffff',
                  }}>
                  <Picker
                    dropdownIconColor={'#B6B6B6'}
                    dropdownIconRippleColor={'#775AAC'}
                    style={
                      {
                        // width: '90%',
                        // height: 45,
                        // backgroundColor: '#F8F7FF',/
                        // borderRadius: 8,
                        // borderColor: 'red',
                        // borderWidth: 5,
                      }
                    }
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
                        style={Styles.pickerItem1}
                        value={item.state}
                        key={id} // Assuming each state object has a unique 'id' property
                        label={item.state}
                      />
                    ))}
                  </Picker>
                </View> */}
              </View>

              <View>
                <Text
                  style={{
                    marginHorizontal: 20,
                    fontWeight: 'bold',
                    fontSize: 14,
                    color: Colors.black,
                    // marginBottom: 3,s
                  }}>
                  Flat, House no., Building, Company, Appartment
                </Text>
                <TextInput
                  // placeholder="Flat/House no"
                  placeholderTextColor="grey"
                  value={flat}
                  onChangeText={text => {
                    setFlat(text);
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
              </View>
              <View>
                <Text
                  style={{
                    marginHorizontal: 20,
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: Colors.black,
                  }}>
                  Area, Street, Sector, Village
                </Text>
                <TextInput
                  // placeholder="Area/Street/Sector/Village"
                  placeholderTextColor="grey"
                  value={area}
                  onChangeText={text => {
                    setArea(text);
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
              </View>
              <View>
                <Text
                  style={{
                    marginHorizontal: 20,
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: Colors.black,
                  }}>
                  Land Mark
                </Text>
                <TextInput
                  placeholder="E.g near appolo hospital"
                  placeholderTextColor="grey"
                  value={landMark}
                  onChangeText={text => {
                    setLandMark(text);
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
                  alignItems: 'center',
                }}>
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
                    // backgroundColor: '#ffff',
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
                              style={Styles.pickerItem1}
                              value={item}
                              key={id} // Assuming each state object has a unique 'id' property
                              label={item}
                            />
                          )
                        ),
                      )}
                  </Picker>
                </View> */}

                <TextInput
                  editable={false}
                  placeholder="City"
                  placeholderTextColor="grey"
                  value={city}
                  onChangeText={text => {
                    setCity(text);
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

                <TextInput
                  editable={false}
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
                    height: '74%',
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
                    borderColor: Colors.purple,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    height: 50,
                    borderRadius: 5,
                    marginVertical: 10,
                  }}>
                  <TextInput
                    placeholder="Email ID"
                    placeholderTextColor="grey"
                    value={email}
                    editable={isVerified ? false : true}
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

                  {!isVerified ? (
                    <TouchableOpacity
                      onPress={LoginApisendmailotp}
                      // onPress={() => setModalVisible(!modalVisible)}
                      style={{
                        borderWidth: 1,
                        borderColor: Colors.purple,
                        height: '65%',
                        marginHorizontal: 8,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '25%',
                        borderRadius: 7,
                        backgroundColor: Colors.purple,
                      }}>
                      <Text style={{color: 'white'}}> Get OTP</Text>
                    </TouchableOpacity>
                  ) : (
                    <MaterialIcons
                      style={{marginRight: 7}}
                      name="verified"
                      color={Colors.purple}
                      size={28}
                    />
                  )}
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
                    borderColor: Colors.purple,
                    flexDirection: 'row',
                    // justifyContent: 'center',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderWidth: 1,
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

                  <MaterialIcons
                    style={{marginRight: 7}}
                    name="verified"
                    color={Colors.purple}
                    size={28}
                  />

                  {/* <TouchableOpacity
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
                  </TouchableOpacity> */}
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
                    bgColor={Colors.purple}
                    width={wp('90%')}
                    height={hp('6.6%')}
                    color={Colors.white}
                    onPress={handleSubmit}
                    loading={butttonLoading}
                  />
                </View>
              )}
            </View>
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
                  />

                  <View>
                    {/* <TouchableOpacity onPress={resendemail} disabled={disabled}>
                      <Text
                        style={{
                          color: disabled ? Colors.lightGray : Colors.black,
                          alignSelf: 'flex-end',
                          top: 5,
                        }}>
                        Resend OTP{timer > 0 ? ` in ${timer} seconds` : ''}
                      </Text>
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
                      backgroundColor: code ? Colors.purple : Colors.lightGray,
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
    </SafeAreaView>
  );
};

export default RegisterAccount;

const Styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
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
  pickerItem: {
    height: 45,
    fontSize: 14,
    // fontWeight: 'bold',
    color: 'grey',
    // backgroundColor: '#F8F7FF',
    backgroundColor: '#ffff',
  },
  pickerItem1: {
    height: 45,
    fontSize: 14,
    // fontWeight: 'bold',
    color: '#000',
    // backgroundColor: '#F8F7FF',
    backgroundColor: '#fff',
  },
});
