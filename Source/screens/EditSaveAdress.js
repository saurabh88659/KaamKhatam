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
import {value} from 'deprecated-react-native-prop-types/DeprecatedTextInputPropTypes';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const EditSaveAdress = props => {
  const latitude = useSelector(state => state.updateState.latitude);
  const longitude = useSelector(state => state.updateState.longitude);
  const editAddress = props.route.params.value;
  console.log('editAddress======>', editAddress);
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [flat, setFlat] = useState('');
  const [area, setArea] = useState('');
  const [landMark, setLandMark] = useState('');
  // {---------------state-----------}
  const [state, setState] = useState('');
  const [StateData, setStateData] = useState([]);
  // {---------------city-----------}
  const [city, setCity] = useState('');
  const [cityData, setCityData] = useState([]);
  const [pincode, setPincode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [butttonLoading, setButtonLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [saveas, setSaveas] = useState('Home');
  const [addressID, setAddressID] = useState('');
  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
  };

  useEffect(() => {
    setAddressID(editAddress._id);
    setFullName(editAddress.fullName);
    setPhoneNumber(editAddress.mobileNumber);
    setFlat(editAddress.flat);
    setArea(editAddress.area);
    setLandMark(editAddress.landmark);
    setState(editAddress.state);
    setCity(editAddress.city);
    setPincode(editAddress.pinCode);
    setSaveas(editAddress.save_as);
    if (editAddress.save_as == 'Home') {
      setIndex(0);
    } else if (editAddress.save_as == 'Office') {
      setIndex(1);
    } else {
      setIndex(2);
    }
  }, []);

  useEffect(() => {
    getCurrentDate();
  }, []);

  //=[======handle inpout ======================================]
  const numberRegex = /\d/;
  const handleNameInput = (text, fieldName) => {
    console.log('fieldName===>', fieldName);
    if (numberRegex.test(text)) {
      if (fieldName === 'firstName') {
        setFullNameError('Please enter a valid first name');
      }
    } else {
      if (fieldName === 'firstName') {
        setFullNameError('');
      }
    }
  };
  //===============get state data
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
  };
  console.log('state and city', city, state);
  const AddAddress = async () => {
    setButtonLoading(true);
    const token = await _getStorage('token');
    const obj = {
      fullName: fullName,
      mobileNumber: phoneNumber,
      country: 'india',
      pinCode: pincode,
      save_as: saveas,
      landmark: landMark,
      flat: flat,
      area: area,
      city: city,
      state: city,
    };
    console.log('obj-----> save address', obj);
    if (
      !fullName ||
      !phoneNumber ||
      !pincode ||
      !saveas ||
      !landMark ||
      !flat ||
      !area ||
      !area ||
      !state
    ) {
      setButtonLoading(false);
      Toast.showWithGravity('All field require', Toast.SHORT, Toast.BOTTOM);
      console.log('all field require');
    } else {
      try {
        const res = await axios.post(BASE_URL + `/address`, obj, {
          headers: {Authorization: `Bearer ${token}`},
        });
        if (res.data) {
          setButtonLoading(false);
          console.log('res of AddAddress====>', res.data);
          if (res.data.message == 'Address added successfully') {
            navigation.goBack();
          }
        }
      } catch (error) {
        setButtonLoading(false);
      }
    }
  };

  const EditSaveAddressApi = async () => {
    setButtonLoading(true);
    const token = await _getStorage('token');
    console.log(token);
    const editAddressObjet = {
      id: addressID,
      fullName: fullName,
      mobileNumber: phoneNumber,
      country: 'india',
      pinCode: pincode,
      save_as: saveas,
      landmark: landMark,
      flat: flat,
      area: area,
      city: city,
      state: state,
    };
    console.log('editAddress Objet====================', editAddressObjet);
    if (
      !fullName ||
      !phoneNumber ||
      !pincode ||
      !saveas ||
      !landMark ||
      !flat ||
      !area ||
      !area ||
      !state
    ) {
      setButtonLoading(false);
      Toast.showWithGravity('All field required', Toast.SHORT, Toast.BOTTOM);
      console.log('all field reuired');
    } else {
      console.log('=========EditAddressApi object==========', editAddressObjet);
      axios
        .put(BASE_URL + `/address`, editAddressObjet, {
          headers: {Authorization: `Bearer ${token}`},
        })
        .then(val => {
          setButtonLoading(false);

          console.log('res of EditSaveAddressApi======>', val?.data);
          if (val.data) {
            if ((val.data.message = 'Address updated successfully')) {
              navigation.goBack();
            }
          }
        })
        .catch(error => {
          setButtonLoading(false);
          console.log(
            'EditAddressApi in catch error===>',
            error?.response?.data,
          );
        });
    }
  };

  const getCurrentAddress = async () => {
    const token = await _getStorage('token');
    console.log(token);
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
        console.log(
          'res of getCurrentAddress home.js =======>',
          res.data.address.address,
        );
        setPincode(res.data?.address?.address?.postcode);
        if (res.data.address.address.building) {
        }
      })
      .catch(error => {
        console.log('error of getCurrentAddress home.js======>', error);
      });
  };

  return (
    <SafeAreaView>
      <Header
        bgColor={Colors.topNavbarColor}
        color={Colors.white}
        title="Edit address"
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
            // contentContainerStyle={{paddingBottom: '100%'}}
            showsVerticalScrollIndicator={false}>
            <View style={{backgroundColor: '#FFF', paddingBottom: '40%'}}>
              {/* {=========================code of get curuent location  ============================} */}

              {/* <TouchableOpacity
                onPress={getCurrentAddress}
                style={{
                  // height: hp('10%'),
                  // width: '100%',
                  // backgroundColor: 'red',
                  marginHorizontal: 15,
                  borderColor: Colors.purple,
                  borderWidth: 1,
                  borderRadius: 6,
                  paddingHorizontal: 15,
                  // marginVertical: 15,
                  color: 'black',
                  marginTop: 15,
                  paddingVertical: 14,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#000', fontSize: 17}}>
                  Use current location
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  marginHorizontal: 15,
                  flexDirection: 'row',
                  // marginVertical: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <View
                  style={{
                    width: '45%',
                    // marginTop: 25,
                    height: 1,
                    // marginHorizontal: 15,
                    backgroundColor: Colors.purple,
                  }}></View>
                <Text
                  style={{color: 'gray', marginHorizontal: 4, fontSize: 17}}>
                  OR
                </Text>
                <View
                  style={{
                    width: '45%',
                    // widthL: 40,
                    // marginTop: 25,
                    height: 1,
                    backgroundColor: Colors.purple,
                  }}></View>
              </View> */}
              {/* {=========================code of get curuent location  ============================} */}

              <View style={{height: hp('12.5%')}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    marginHorizontal: 20,
                    top: 10,
                    color: Colors.black,
                  }}>
                  Full name (First and Last name)
                </Text>

                <TextInput
                  editable={false}
                  //   placeholder="First Name"
                  placeholderTextColor="grey"
                  value={fullName}
                  keyboardType={'default'}
                  onChangeText={text => {
                    // setFirstname(text),
                    setFullName(text);
                    handleNameInput(text, 'firstName');
                  }}
                  style={{
                    marginHorizontal: 15,
                    borderColor: Colors.purple,
                    borderWidth: 1,
                    borderRadius: 6,
                    paddingHorizontal: 15,
                    // marginVertical: 15,
                    color: 'black',
                    marginTop: 12,
                  }}
                />
                {fullNameError ? (
                  <Text
                    style={{color: 'red', marginHorizontal: 20, fontSize: 14}}>
                    {fullNameError}
                  </Text>
                ) : null}
              </View>

              <View style={{marginHorizontal: 20}}>
                <Text
                  style={{color: 'black', fontSize: 14, fontWeight: 'bold'}}>
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
                    marginBottom: 15,
                    marginTop: 3,
                  }}>
                  <TextInput
                    editable={false}
                    placeholder="10 - digit number without prefixes"
                    placeholderTextColor={'grey'}
                    //   placeholder="First Name"
                    value={phoneNumber}
                    keyboardType={'numeric'}
                    onChangeText={text => {
                      setPhoneNumber(text);
                    }}
                    style={{
                      //   backgroundColor: 'red',
                      width: '100%',
                      height: '100%',
                      color: '#000',
                      paddingHorizontal: 10,
                    }}
                  />
                </View>
              </View>
              <View style={{marginHorizontal: 20}}>
                <Text
                  style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
                  flat, House no.,Building, Company, Apartment
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
                    marginBottom: 15,
                    marginTop: 3,
                  }}>
                  <TextInput
                    // placeholder="10 - digit number without prefixes"
                    placeholderTextColor={'grey'}
                    //   placeholder="First Name"
                    value={flat}
                    keyboardType={'default'}
                    onChangeText={text => {
                      setFlat(text);
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      color: '#000',
                      paddingHorizontal: 10,
                    }}
                  />
                </View>
              </View>
              <View style={{marginHorizontal: 20}}>
                <Text
                  style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
                  Area, Street, Sector, Village
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
                    marginBottom: 15,
                    marginTop: 3,
                  }}>
                  <TextInput
                    // placeholder="10 - digit number without prefixes"
                    placeholderTextColor={'grey'}
                    //   placeholder="First Name"
                    value={area}
                    keyboardType={'default'}
                    onChangeText={text => {
                      setArea(text);
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      color: '#000',
                      paddingHorizontal: 10,
                    }}
                  />
                </View>
              </View>
              <View style={{marginHorizontal: 20}}>
                <Text
                  style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
                  Land Mark
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
                    marginBottom: 15,
                    marginTop: 3,
                  }}>
                  <TextInput
                    // placeholder="10 - digit number without prefixes"
                    placeholderTextColor={'grey'}
                    //   placeholder="First Name"
                    value={landMark}
                    keyboardType={'default'}
                    onChangeText={text => {
                      setLandMark(text);
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      color: '#000',
                      paddingHorizontal: 10,
                    }}
                  />
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
                {/* -------------------------------Picker-------------------------------------- */}
                <View
                  style={{
                    marginHorizontal: 15,
                    borderColor: Colors.purple,
                    borderWidth: 1,
                    borderRadius: 6,
                    // paddingHorizontal: 15,
                    marginBottom: 15,
                    // color: 'black',
                    height: 53,
                    justifyContent: 'center',
                    alignContent: 'center',
                    paddingLeft: 4,
                    // backgroundColor: '#ffff',
                    marginTop: 3,
                  }}>
                  <TextInput
                    placeholder="State"
                    value={state}
                    style={{color: '#000', paddingHorizontal: 10}}
                    onChangeText={text => {
                      setState(text);
                    }}
                  />
                  {/* <Picker
                    dropdownIconColor={'#B6B6B6'}
                    dropdownIconRippleColor={'#775 rAAC'}
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
                      <Picker.Item
                        style={Styles.pickerItem1}
                        // value={item.state}
                        value={state}
                        key={id} // Assuming each state object has a unique 'id' property
                        label={item.state}
                      />
                    ))}
                  </Picker> */}
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
                  Town/City
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
                <View
                  style={{
                    width: '40%',
                    height: 55,
                    borderColor: Colors.purple,
                    borderWidth: 1,
                    borderRadius: 6,
                    marginBottom: 15,
                    justifyContent: 'center',
                    alignContent: 'center',
                    paddingHorizontal: 4,
                    // backgroundColor: '#ffff',
                    marginTop: 3,
                  }}>
                  <TextInput
                    placeholder="City"
                    value={city}
                    style={{color: '#000', paddingHorizontal: 10}}
                    onChangeText={text => {
                      setCity(text);
                    }}
                  />

                  {/* 
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
                  </Picker> */}
                </View>
                {/* <TextInput
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
                        /> */}

                <TextInput
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
                    // marginTop: 5,
                    width: '45%',
                    height: '75%',
                    color: 'black',
                    marginTop: 3,
                  }}
                />
              </View>

              <Text
                style={{
                  marginHorizontal: 24,
                  marginVertical: 5,
                  fontWeight: 'bold',
                  //   color: '#707070',
                  color: '#000',
                }}>
                SAVE AS
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                  onPress={() => {
                    setSaveas('Home');
                    setIndex(0);
                  }}
                  style={{
                    borderWidth: index === 0 ? 0 : 1,
                    height: 30,
                    width: 90,
                    borderRadius: 7,
                    backgroundColor: index === 0 ? '#0EC01B' : 'white',
                    alignItems: 'center',
                    marginHorizontal: 20,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: index === 0 ? '#000' : 'grey',
                      fontSize: 15,
                      fontWeight: '800',
                    }}>
                    Home
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setSaveas('Office');
                    setIndex(1);
                  }}
                  style={{
                    borderWidth: index === 1 ? 0 : 1,
                    height: 30,
                    width: 90,
                    backgroundColor: index === 1 ? '#0EC01B' : 'white',
                    borderRadius: 7,
                    alignItems: 'center',
                    marginHorizontal: 5,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: index === 1 ? '#000' : 'grey',
                      fontSize: 15,
                      fontWeight: '800',
                    }}>
                    Office
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setSaveas('Other');
                    setIndex(2);
                  }}
                  style={{
                    borderWidth: index === 2 ? 0 : 1,
                    height: 30,
                    width: 90,
                    backgroundColor: index === 2 ? '#0EC01B' : 'white',
                    borderRadius: 7,
                    alignItems: 'center',
                    marginHorizontal: 20,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: index === 2 ? '#000' : 'grey',
                      fontSize: 15,
                      fontWeight: '800',
                    }}>
                    Other
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{alignItems: 'center'}}>
                <CustomButton
                  title={'Save edit address'}
                  bgColor={Colors.purple}
                  width={wp('90%')}
                  height={hp('6.6%')}
                  color={Colors.white}
                  onPress={EditSaveAddressApi}
                  loading={butttonLoading}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

export default EditSaveAdress;
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
