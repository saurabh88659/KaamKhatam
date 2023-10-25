import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import React, {useEffect, useState} from 'react';
import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import {BASE_URL} from '../Assets/utils/Restapi/Config';
import {_getStorage} from '../Assets/utils/storage/Storage';
import axios, {Axios} from 'axios';
import {data} from './ChatBotScreen/Data';
import {color} from 'react-native-reanimated';
import {RadioButton} from 'react-native-paper';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {set} from 'immer/dist/internal';
const {width, height} = Dimensions.get('window');

const Editaddress = props => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [index, setIndex] = useState();
  const [location, setLocation] = useState('');
  const [flatorStreet, setFlateorStareet] = useState();
  const [saveas, setSaveas] = useState();
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastname] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [allAddresses, setAllAddress] = useState('');
  const [addressId, setAddressId] = useState('');
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleteAddress, setdeleteAddress] = useState('');
  const [editAddressmodalVisible, setEditAddressModalVisible] = useState(false);
  //edit address state===========
  // const [editBookingLocation, SetEditbookingLocation] = useState(null);
  // const [editAddress, setEditAddress] = useState(null);
  // const [editPincode, setEditPincode] = useState(' ');
  // const [editName, setEditName] = useState(null);
  // const [editSaveas, setEditSaveas] = useState(null);

  const [editAddressID, setEditAddressID] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  console.log('pin code -----', pincode);
  const [name, setName] = useState(firstname);
  console.log(name);
  console.log(pincode, '======pincode=========');

  // const saveAddress = async () => {
  //   if (!address || !name || !pincode || !location) {
  //     console.log(
  //       'name:',
  //       name,
  //       'flatorStreet:',
  //       flatorStreet,
  //       'location',
  //       location,
  //     );
  //     Toast.showWithGravity('all field required', Toast.SHORT, Toast.BOTTOM);
  //   } else if (name !== '' && flatorStreet !== '' && location !== '') {
  //     // await AsyncStorage.setItem('location', location);
  //     // await AsyncStorage.setItem('flatorStreet', address);
  //     // await AsyncStorage.setItem('name', name);
  //     // await AsyncStorage.setItem('saveas', saveas);
  //     navigation.replace('TimeAndSlot', {
  //       location,
  //       address,
  //       pincode: pincode.toString(),
  //       name,
  //       saveas,
  //       addressId,
  //     });
  //   }
  // };

  const saveAddress = async () => {
    setLoading(true);
    setButtonLoading(true);
    const token = await _getStorage('token');
    const obj = {
      bookingLocation: location,
      address: address,
      pinCode: pincode,
      name: name,
      save_as: saveas,
    };
    console.log('obj-----> save address', obj);
    try {
      const res = await axios.post(BASE_URL + `/address`, obj, {
        headers: {Authorization: `Bearer ${token}`},
      });
      // setAllAddress(res.data.addresses);
      console.log('res.data====>saveaddres', res.data);
      if (res.data) {
      }
      if (res.data.message == 'Address added successfully') {
        setModalVisible(false);
        getUserAllAddress();
        setButtonLoading(false);
        // setTimeout(() => {
        //   setLoading(false);
        // }, 1500);
      }
      setLoading(false);
      console.log('all addressses ======', res.data.addresses);
    } catch (error) {
      setButtonLoading(false);

      setLoading(false);
      console.log(error);
    }
  };

  const getUserAllAddress = async () => {
    const token = await _getStorage('token');
    try {
      const res = await axios.get(BASE_URL + `/address`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      setAllAddress(res.data.addresses);
      setLoading(false);
      console.log('all addressses ======', res.data.addresses);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getUserAllAddress();
    }
  }, [isFocused]);

  // const getUserAddress = async () => {
  //   console.log('hello');
  //   try {
  //     console.log('===============');
  //     const userlocation = await AsyncStorage.getItem('location');
  //     const userflatorStreet = await AsyncStorage.getItem('flatorStreet');
  //     const username = await AsyncStorage.getItem('name');
  //     if (username && userflatorStreet && userlocation !== null) {
  //       console.log(
  //         'get address from asyctorage',
  //         username,
  //         userlocation,
  //         userflatorStreet,
  //       );
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //   }
  // };

  useEffect(() => {
    if (isFocused) {
      // profileapi();
    }
  }, [isFocused]);

  const profileapi = async () => {
    const token = await _getStorage('token');
    axios
      .get(BASE_URL + `/profile`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(val => {
        setName(val.data.result.firstName + ' ' + val.data.result.lastName);
        setPincode(val.data.result.pincode);
        setLocation(
          val.data.result.city +
            ' , ' +
            val.data.result.address +
            ' , ' +
            val.data.result.state,
        );

        console.log('val on edit profile----------', val.data.result);
      })
      .catch(error => {
        console.log(' profile drower in catch', error.response.data);
      });
  };

  const handleServiceAdress = async value => {
    console.log('value-==', value);
    // await AsyncStorage.setItem('location', value.bookingLocation);
    // await AsyncStorage.setItem('flatorStreet', value.address);
    // await AsyncStorage.setItem('name', value.name);
    // await AsyncStorage.setItem('saveas', value.save_as);
    // await AsyncStorage.setItem('pincode', value.pinCode);
    setChecked(value._id);
    setTimeout(() => {
      navigation.replace('TimeAndSlot', {
        value,
      });
    }, 100);
  };

  const DeleteAddress = async id => {
    setLoading(true);
    console.log(id, '===id');
    const token = await _getStorage('token');
    axios
      .delete(BASE_URL + `/address/${id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(val => {
        getUserAllAddress();
        setTimeout(() => {
          setLoading(false);
        }, 700);
        console.log('DeleteAddress res===>', val.data);
      })
      .catch(error => {
        setLoading(false);
        console.log('DeleteAddress in catch error===>', error.response.data);
      });
  };

  // {=======edit address---}
  const HandleEditddress = value => {
    console.log('value----for edit Address', value);
    setLocation(value.bookingLocation);
    setAddress(value.address);
    setPincode(value.pinCode);
    setEditAddressID(value._id);
    setName(value.name);
    if (value.save_as == 'Home') {
      setIndex(0);
    } else if (value.save_as == 'Office') {
      setIndex(1);
    } else {
      setIndex(2);
    }
    setEditAddressModalVisible(!editAddressmodalVisible);
  };

  const EditAddressApi = async () => {
    setLoading(true);
    setButtonLoading(true);
    const token = await _getStorage('token');
    console.log(token);
    const editAddressObjet = {
      id: editAddressID,
      bookingLocation: location,
      address: address,
      pinCode: pincode,
      name: name,
      save_as: saveas,
    };
    console.log('editAddressObjet====================', editAddressObjet);
    if (
      editAddressID === null ||
      editAddressID === '' ||
      location === null ||
      location === '' ||
      address === null ||
      address === '' ||
      pincode === null ||
      pincode === '' ||
      saveas === null ||
      saveas === ''
    ) {
      // setLoading(false);
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
          if (val.data) {
            getUserAllAddress();
            setEditAddressModalVisible(!editAddressmodalVisible);
            setButtonLoading(false);
          }
          // setTimeout(() => {
          setLoading(false);
          // }, 700);
          console.log('Edit Address res===>', val.data);
          Toast.showWithGravity(val.data.message, Toast.SHORT, Toast.BOTTOM);
          // setLocation(null);
          // setAddress(null);
          // setPincode('');
          // setEditAddressID(null);
          // setName(null);
          // setIndex(1);
          // // saveas('Home');
        })
        .catch(error => {
          setButtonLoading(false);
          setLoading(false);
          console.log('EditAddressApi in catch error===>', error.response.data);
        });
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        bgColor={Colors.topNavbarColor}
        color={Colors.white}
        title="My address"
        onPress={() => props.navigation.goBack('')}
      />
      <View style={{alignItems: 'center', marginVertical: 40}}>
        <Text style={{color: 'black', fontSize: 22, fontWeight: '600'}}>
          Select Address
        </Text>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: '#707070',
          height: height / 13,
          justifyContent: 'center',
          // marginBottom: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            // setModalVisible(true),
            setModalVisible(!modalVisible);
            setLocation(null);
            setAddress(null);
            setPincode('');
            setEditAddressID(null);
            setName(null);
            setIndex(0);
            setSaveas('Home');
          }}>
          <Text
            style={{
              fontWeight: '400',
              color: '#111EC4',
              marginHorizontal: 20,
              fontSize: 18,
            }}>
            + Add a new address
          </Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={{marginTop: 50}}>
          <ActivityIndicator color="#ff8c00" size={31} />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 10}}>
          {allAddresses.length > 0 &&
            allAddresses.map(
              (value, index) => (
                console.log('====allAddresses value=====', value),
                (
                  <View
                    key={index}
                    style={{
                      // height: 100,
                      // backgroundColor: 'red',
                      // marginHorizontal: 20,
                      // borderRadius: 9,
                      // justifyContent: 'center',
                      alignItems: 'flex-start',
                      borderBottomColor: 'grey',
                      borderBottomWidth: 1,
                      // marginVertical: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() => handleServiceAdress(value)}
                      style={{
                        // paddingHorizontal: 30,
                        marginVertical: 10,
                        // backgroundColor: 'red',
                        width: '100%',
                      }}>
                      <View
                        style={{
                          // backgroundColor: 'red',
                          flexDirection: 'row',
                          // marginVertical: 2,
                          alignItems: 'center',
                          paddingHorizontal: 10,
                          // justifyContent: 'center',
                          // backgroundColor: 'red',
                          // height: 40,
                          // alignItems: 'center',
                        }}>
                        {/* <RadioButton    
                  /> */}
                        <View style={{top: 2, marginRight: 5}}>
                          <RadioButton
                            onPress={() => handleServiceAdress(value)}
                            color={Colors.purple}
                            value={value._id}
                            status={
                              checked === value._id ? 'checked' : 'unchecked'
                            }
                          />
                        </View>
                        <Text
                          style={{
                            color: Colors.black,
                            marginRight: 15,
                            fontSize: 18,
                          }}>
                          {value.name}
                        </Text>
                        <View
                          style={{
                            backgroundColor: Colors.topNavbarColor,

                            // backgroundColor: '#ECECEC',
                            height: 25,
                            width: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 4,
                          }}>
                          <Text style={{color: Colors.white}}>
                            {value.save_as}
                          </Text>
                        </View>
                      </View>

                      <View style={{paddingHorizontal: 50}}>
                        <Text
                          style={{
                            color: Colors.black,
                            // marginVertical: 2,
                            fontSize: 15,
                          }}>
                          {value.address}
                        </Text>
                        <Text
                          style={{
                            color: Colors.black,
                            marginVertical: 2,
                            fontSize: 15,
                          }}>
                          {value.bookingLocation}
                        </Text>
                        <Text
                          style={{
                            color: Colors.black,
                            // marginVertical: 2,
                            fontSize: 15,
                          }}>
                          {value.pinCode}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <View
                      style={{
                        // backgroundColor: 'red',
                        width: '100%',
                        justifyContent: 'space-evenly',
                        flexDirection: 'row',
                        // marginBottom: 10,
                        alignItems: 'center',
                        height: 30,
                        marginBottom: 15,
                        marginTop: 6,
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          // setEditAddressModalVisible(!editAddressmodalVisible)
                          HandleEditddress(value)
                        }
                        style={{
                          height: 35,
                          width: hp('10%'),
                          // backgroundColor: '#ECECEC',
                          backgroundColor: '#fff',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 6,
                          // borderColor: '#000',
                          // borderWidth: 1,
                          elevation: 5,
                        }}>
                        {/* <AntDesign name="edit" color={'#000'} size={18} /> */}
                        <Text style={{color: '#000'}}>Edit</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => DeleteAddress(value._id)}
                        style={{
                          height: 35,
                          width: hp('10%'),
                          // backgroundColor: '#ECECEC',
                          backgroundColor: '#fff',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 6,
                          // borderColor: '#000',
                          // borderWidth: 1,
                          elevation: 5,
                        }}>
                        {/* <AntDesign name="delete" color={'red'} size={18} /> */}
                        <Text style={{color: '#000'}}>Remove</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              ),
            )}
        </ScrollView>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          setLocation(null);
          setAddress(null);
          setPincode('');
          setEditAddressID(null);
          setName(null);
          setIndex(0);
          setSaveas('Home');
        }}>
        <View
          // onPress={() => setModalVisible(false)}
          style={Styles.centeredView}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
              setLocation(null);
              setAddress(null);
              setPincode('');
              setEditAddressID(null);
              setName(null);
              setIndex(0);
              setSaveas('Home');
            }}
            activeOpacity={1}
            style={{
              height: hp('40%'),
              width: '100%',
              // flex: 1,
              // backgroundColor: '#000',
              // backgroundColor: 'rgba(0,0,0,0.5)',
            }}></TouchableOpacity>
          <View style={Styles.modalView}>
            <View>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                style={{
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    borderColor: '#707070',
                    marginVertical: 5,
                    borderBottomWidth: 7,
                    width: width / 8,
                    borderRadius: 5,
                    // backgroundColor: 'red',
                  }}></View>
              </TouchableOpacity>
            </View>

            <View>
              <Text
                style={{
                  marginHorizontal: 24,
                  fontWeight: 'bold',
                  color: '#707070',
                }}>
                Your Location
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                marginVertical: 10,
                marginHorizontal: 20,
              }}>
              <TextInput
                value={location}
                onChangeText={text => {
                  setLocation(text);
                }}
                style={{
                  color: 'grey',
                  fontSize: 15,
                  top: -10,
                  width: wp('80%'),
                  // backgroundColor: 'red',
                }}
                //</View>  placeholder="A-140, Block A, A Block, Sector63,Noida,Uttar Pradesh
                //201304,India"
                placeholder="Enter your location"
                placeholderTextColor="#888888"
              />
              {/* <TouchableOpacity onPress={getUserAddress}>
                <Text
                  style={{
                    fontSize: 15,
                    marginVertical: 10,
                    fontWeight: '500',
                    color: 'blue',
                    top: -50,
                    right: 60,
                  }}>
                  CHANGE
                </Text>
              </TouchableOpacity> */}
            </View>
            <Text
              style={{
                marginHorizontal: 24,
                fontWeight: 'bold',
                color: '#707070',
              }}>
              Address
            </Text>
            <View
              style={{
                borderBottomWidth: 1,
                marginHorizontal: 20,
              }}>
              <TextInput
                style={{
                  color: 'grey',
                  fontSize: 15,
                  width: wp('80%'),
                  // backgroundColor: 'red',
                }}
                value={flatorStreet}
                onChangeText={text => {
                  setAddress(text);
                }}
                placeholder="Flat / Building / Street"
                placeholderTextColor="#888888"
              />
            </View>

            <Text
              style={{
                marginHorizontal: 24,
                marginVertical: 5,
                fontWeight: 'bold',
                color: '#707070',
              }}>
              Pincode
            </Text>
            <View
              style={{
                borderBottomWidth: 1,
                marginHorizontal: 20,
              }}>
              <TextInput
                maxLength={6}
                style={{
                  color: 'grey',
                  fontSize: 15,
                  width: wp('80%'),
                  // backgroundColor: 'red',
                }}
                value={pincode.toString()}
                keyboardType="number-pad"
                onChangeText={text => {
                  setPincode(text.toString());
                }}
                placeholder="Pincode"
                placeholderTextColor="#888888"
              />
            </View>

            <Text
              style={{
                marginHorizontal: 24,
                marginVertical: 5,
                fontWeight: 'bold',
                color: '#707070',
              }}>
              Name
            </Text>
            <View
              style={{
                borderBottomWidth: 1,
                marginHorizontal: 20,
              }}>
              <TextInput
                style={{
                  color: 'grey',
                  fontSize: 15,
                  width: wp('80%'),
                  // backgroundColor: 'red',
                }}
                value={name}
                onChangeText={text => {
                  setName(text);
                }}
                placeholder="Your Name"
                placeholderTextColor="#888888"
              />
            </View>
            <Text
              style={{
                marginHorizontal: 24,
                marginVertical: 5,
                fontWeight: 'bold',
                color: '#707070',
              }}>
              SAVE AS
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
              <TouchableOpacity
                onPress={() => {
                  setSaveas('Home');
                  setIndex(0);
                }}
                style={{
                  borderWidth: index === 0 ? 0 : 1,
                  height: 23,
                  width: 60,
                  borderRadius: 7,
                  backgroundColor: index === 0 ? '#0EC01B' : 'white',
                  alignItems: 'center',
                  marginHorizontal: 20,
                  justifyContent: 'center',
                }}>
                <Text style={{color: 'grey'}}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSaveas('Office');
                  setIndex(1);
                }}
                style={{
                  borderWidth: index === 1 ? 0 : 1,
                  height: 23,
                  width: 60,
                  backgroundColor: index === 1 ? '#0EC01B' : 'white',
                  borderRadius: 7,
                  alignItems: 'center',
                  marginHorizontal: 5,
                  justifyContent: 'center',
                }}>
                <Text style={{color: 'grey'}}>Office</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSaveas('Other');
                  setIndex(2);
                }}
                style={{
                  borderWidth: index === 2 ? 0 : 1,
                  height: 23,
                  width: 60,
                  backgroundColor: index === 2 ? '#0EC01B' : 'white',
                  borderRadius: 7,
                  alignItems: 'center',
                  marginHorizontal: 20,
                  justifyContent: 'center',
                }}>
                <Text style={{color: 'grey'}}>Other</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={saveAddress}
              //onPress={() => props.navigation.navigate('TimeAndSlot')}
              style={{
                backgroundColor: Colors.purple,
                alignItems: 'center',
                height: '10%',
                justifyContent: 'center',
                marginVertical: '10%',
                marginHorizontal: 10,
                borderRadius: 6,
              }}>
              {buttonLoading ? (
                <ActivityIndicator color={'#fff'} size={25} />
              ) : (
                <Text style={{fontWeight: '500', color: '#fff', fontSize: 18}}>
                  Save address
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* {edit address modal=========================================} */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editAddressmodalVisible}
        onRequestClose={() => {
          setEditAddressModalVisible(!editAddressmodalVisible);
        }}>
        <View
          // onPress={() => setModalVisible(false)}
          style={Styles.centeredView}>
          <TouchableOpacity
            onPress={() => {
              setEditAddressModalVisible(!editAddressmodalVisible),
                setLocation(null);
              setAddress(null);
              setPincode('');
              setEditAddressID(null);
              setName(null);
              setIndex(1);
              setSaveas('Home');
            }}
            activeOpacity={1}
            style={{
              height: hp('40%'),
              width: '100%',
              // flex: 1,
              // backgroundColor: '#000',
              // backgroundColor: 'rgba(0,0,0,0.5)',
            }}></TouchableOpacity>
          <View style={Styles.modalView}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setEditAddressModalVisible(!editAddressmodalVisible),
                    setLocation(null);
                  setAddress(null);
                  setPincode('');
                  setEditAddressID(null);
                  setName(null);
                  setIndex(1);
                  setSaveas('Home');
                }}
                style={{
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    borderColor: '#707070',
                    marginVertical: 5,
                    borderBottomWidth: 7,
                    width: width / 8,
                    borderRadius: 5,
                    // backgroundColor: 'red',
                  }}></View>
              </TouchableOpacity>
            </View>

            <View>
              <Text
                style={{
                  marginHorizontal: 24,
                  fontWeight: 'bold',
                  color: '#707070',
                }}>
                location
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                marginVertical: 10,
                marginHorizontal: 20,
              }}>
              <TextInput
                value={location}
                onChangeText={text => {
                  setLocation(text);
                }}
                style={{
                  color: 'grey',
                  fontSize: 15,
                  top: -10,
                  width: wp('80%'),
                  // backgroundColor: 'red',
                }}
                //</View>  placeholder="A-140, Block A, A Block, Sector63,Noida,Uttar Pradesh
                //201304,India"
                placeholder="Enter your location"
                placeholderTextColor="#888888"
              />
              {/* <TouchableOpacity onPress={getUserAddress}>
                <Text
                  style={{
                    fontSize: 15,
                    marginVertical: 10,
                    fontWeight: '500',
                    color: 'blue',
                    top: -50,
                    right: 60,
                  }}>
                  CHANGE
                </Text>
              </TouchableOpacity> */}
            </View>
            <Text
              style={{
                marginHorizontal: 24,
                fontWeight: 'bold',
                color: '#707070',
              }}>
              Address
            </Text>
            <View
              style={{
                borderBottomWidth: 1,
                marginHorizontal: 20,
              }}>
              <TextInput
                style={{
                  color: 'grey',
                  fontSize: 15,
                  width: wp('80%'),
                  // backgroundColor: 'red',
                }}
                value={address}
                onChangeText={text => {
                  setAddress(text);
                }}
                placeholder="Flat / Building / Street"
                placeholderTextColor="#888888"
              />
            </View>

            <Text
              style={{
                marginHorizontal: 24,
                marginVertical: 5,
                fontWeight: 'bold',
                color: '#707070',
              }}>
              Pincode
            </Text>
            <View
              style={{
                borderBottomWidth: 1,
                marginHorizontal: 20,
              }}>
              <TextInput
                maxLength={6}
                style={{
                  color: 'grey',
                  fontSize: 15,
                  width: wp('80%'),
                  // backgroundColor: 'red',
                }}
                value={pincode}
                keyboardType="number-pad"
                onChangeText={text => {
                  setPincode(text.toString());
                }}
                placeholder="Pincode"
                placeholderTextColor="#888888"
              />
            </View>

            <Text
              style={{
                marginHorizontal: 24,
                marginVertical: 5,
                fontWeight: 'bold',
                color: '#707070',
              }}>
              Name
            </Text>
            <View
              style={{
                borderBottomWidth: 1,
                marginHorizontal: 20,
              }}>
              <TextInput
                style={{
                  color: 'grey',
                  fontSize: 15,
                  width: wp('80%'),
                  // backgroundColor: 'red',
                }}
                value={name}
                onChangeText={text => {
                  setName(text);
                }}
                placeholder="Your Name"
                placeholderTextColor="#888888"
              />
            </View>
            <Text
              style={{
                marginHorizontal: 24,
                marginVertical: 5,
                fontWeight: 'bold',
                color: '#707070',
              }}>
              SAVE AS
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
              <TouchableOpacity
                onPress={() => {
                  setSaveas('Home');
                  setIndex(0);
                }}
                style={{
                  borderWidth: index === 0 ? 0 : 1,
                  height: 23,
                  width: 60,
                  borderRadius: 7,
                  backgroundColor: index === 0 ? '#0EC01B' : 'white',
                  alignItems: 'center',
                  marginHorizontal: 20,
                  justifyContent: 'center',
                }}>
                <Text style={{color: 'grey'}}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSaveas('Office');
                  setIndex(1);
                }}
                style={{
                  borderWidth: index === 1 ? 0 : 1,
                  height: 23,
                  width: 60,
                  backgroundColor: index === 1 ? '#0EC01B' : 'white',
                  borderRadius: 7,
                  alignItems: 'center',
                  marginHorizontal: 5,
                  justifyContent: 'center',
                }}>
                <Text style={{color: 'grey'}}>Office</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSaveas('Other');
                  setIndex(2);
                }}
                style={{
                  borderWidth: index === 2 ? 0 : 1,
                  height: 23,
                  width: 60,
                  backgroundColor: index === 2 ? '#0EC01B' : 'white',
                  borderRadius: 7,
                  alignItems: 'center',
                  marginHorizontal: 20,
                  justifyContent: 'center',
                }}>
                <Text style={{color: 'grey'}}>Other</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={EditAddressApi}
              //onPress={() => props.navigation.navigate('TimeAndSlot')}
              style={{
                backgroundColor: Colors.purple,
                alignItems: 'center',
                height: '10%',
                justifyContent: 'center',
                marginVertical: '10%',
                marginHorizontal: 10,
                borderRadius: 6,
              }}>
              {buttonLoading ? (
                <ActivityIndicator color={'#fff'} size={25} />
              ) : (
                <Text style={{fontWeight: '500', color: '#fff', fontSize: 18}}>
                  Save change
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Editaddress;

const Styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    width: width,
    height: height,
    bottom: '-6%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    // backgroundColor: 'red',
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: 'white',
    width: width,
    // height: height / 1.7,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
