import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  TextInput,
  ScrollView,
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

const {width, height} = Dimensions.get('window');

const Editaddress = props => {
  const isFocused = useIsFocused();

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [location, setLocation] = useState('');
  const [flatorStreet, setFlateorStareet] = useState();
  const [saveas, setSaveas] = useState('Home');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastname] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [allAddresses, setAllAddress] = useState('');
  const [addressId, setAddressId] = useState('');
  const [checked, setChecked] = useState(false);
  console.log('pin code -----', pincode);
  const [name, setName] = useState(firstname);
  console.log(name);
  console.log(pincode, '======pincode=========');

  const saveAddress = async () => {
    if (!address || !name || !pincode || !location) {
      console.log(
        'name:',
        name,
        'flatorStreet:',
        flatorStreet,
        'location',
        location,
      );
      Toast.showWithGravity('all field required', Toast.SHORT, Toast.BOTTOM);
    } else if (name !== '' && flatorStreet !== '' && location !== '') {
      // await AsyncStorage.setItem('location', location);
      // await AsyncStorage.setItem('flatorStreet', address);
      // await AsyncStorage.setItem('name', name);
      // await AsyncStorage.setItem('saveas', saveas);
      navigation.replace('TimeAndSlot', {
        location,
        address,
        pincode: pincode.toString(),
        name,
        saveas,
        addressId,
      });
    }
  };

  const getUserAllAddress = async () => {
    const token = await _getStorage('token');
    try {
      const res = await axios.get(BASE_URL + `/address`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      setAllAddress(res.data.addresses);
      console.log('all addressses ======', res.data.addresses);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getUserAllAddress();
    }
  }, [isFocused]);

  const getUserAddress = async () => {
    console.log('hello');
    try {
      console.log('===============');
      const userlocation = await AsyncStorage.getItem('location');
      const userflatorStreet = await AsyncStorage.getItem('flatorStreet');
      const username = await AsyncStorage.getItem('name');
      if (username && userflatorStreet && userlocation !== null) {
        console.log(
          'get address from asyctorage',
          username,
          userlocation,
          userflatorStreet,
        );
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  useEffect(() => {
    if (isFocused) {
      profileapi();
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
  const handleServiceAdress = addressId => {
    setChecked(addressId);
    setTimeout(() => {
      navigation.replace('TimeAndSlot', {
        addressId,
      });
    }, 500);
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
        <TouchableOpacity onPress={() => setModalVisible(true)}>
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 10}}>
        {allAddresses.length > 0 &&
          allAddresses.map((value, index) => (
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
                onPress={() => handleServiceAdress(value._id)}
                style={{
                  // paddingHorizontal: 30,
                  marginVertical: 10,
                  // backgroundColor: 'red',
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
                      onPress={() => handleServiceAdress(value._id)}
                      color={Colors.purple}
                      value={value._id}
                      status={checked === value._id ? 'checked' : 'unchecked'}
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
                      backgroundColor: Colors.lightGray,
                      height: 25,
                      width: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 4,
                    }}>
                    <Text style={{color: Colors.black}}>{value.save_as}</Text>
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
            </View>
          ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          // onPress={() => setModalVisible(false)}
          style={Styles.centeredView}>
          <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
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
              <Text style={{fontWeight: '500', color: '#fff', fontSize: 18}}>
                Save address
              </Text>
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
