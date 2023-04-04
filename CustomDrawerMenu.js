import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  Alert,
  ImageBackground,
} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {_getStorage} from './Source/Assets/utils/storage/Storage';
import {BASE_URL} from './Source/Assets/utils/Restapi/Config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from './Source/Assets/Constants/Colors';
import {Rating} from 'react-native-ratings';
import Toast from 'react-native-simple-toast';
import {getFirstLetters} from './Source/Assets/utils/Handler/NameAvatar';

const {height, width} = Dimensions.get('screen');

const CustomDrawerMenu = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [profileData, setProfileData] = useState({});

  const [state, setState] = useState({
    isLogoutClicked: false,
    loggedOut: false,
    profileImg: null,
    isPicker: false,
    isUpdateProfile: false,
  });

  useEffect(() => {
    profileapi();
  }, []);

  const profileapi = async () => {
    const token = await _getStorage('token');
    axios
      .get(BASE_URL + `/profile`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(val => {
        setProfileData(val.data.result);
        console.log('profile drower>', val.data.result);
      })
      .catch(error => {
        console.log(' profile drower in catch', error.response.data);
      });
  };

  const _logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('isLoggedIn');
    setModalVisible(!modalVisible);
    props.navigation.navigate('Login');
  };

  const ratingCompleted = () => {
    Toast.showWithGravity('Please wait...', Toast.LONG, Toast.BOTTOM);

    setTimeout(() => {
      setModalVisible2(!modalVisible2);
      Toast.showWithGravity(
        'Thanks so much for sharing your experience with us.',
        Toast.LONG,
        Toast.BOTTOM,
      );
    }, 2000);
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: Colors.lightOrange}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: Colors.white}}>
        <View style={{marginVertical: 20}}>
          <TouchableOpacity
            style={{
              height: 80,
              width: 80,
              borderRadius: 50,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Colors.lightGray,
            }}
            onPress={() => props.navigation.navigate('ProfileScreen')}>
            {profileData ? (
              <Image
                style={{
                  height: '100%',
                  width: '100%',
                  borderRadius: 100,
                  resizeMode: 'cover',
                }}
                source={{uri: profileData?.imageUrl}}
              />
            ) : (
              <Text
                style={{
                  color: Colors.lightGreen,
                  fontSize: 40,
                  fontWeight: '600',
                }}>
                {getFirstLetters(profileData?.firstName || '')}
              </Text>
            )}

            {/* <Text style={{color: '#000'}}>
              {getFirstLetters(profileData?.firstName || '')}
            </Text> */}
            {/* <Image
              source={{uri: profileData.imageUrl}}
              style={Styles.iconestyle}
            /> */}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('ProfileScreen');
            }}>
            <View style={Styles.textlable}>
              <Text style={Styles.textstyl}>
                {profileData.firstName + ' ' + profileData.lastName}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={Styles.linesstyles}></View>
          <TouchableOpacity
            style={Styles.constyles}
            // onPress={() => props.navigation.navigate('Salonforwomen')}
            onPress={() => props.navigation.navigate('Mywallet')}>
            <Image
              source={require('./Source/Assets/Images/wallet.png')}
              style={Styles.iconestyles}
            />
            <Text style={Styles.textstyles1}>My Wallet</Text>
          </TouchableOpacity>
          <View>
            <View style={Styles.linesstyles}></View>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Mybooking2')}
              style={Styles.constyles}>
              <Image
                source={require('./Source/Assets/Images/credit-cardicone2.png')}
                style={Styles.iconestyles}
              />
              <Text style={Styles.textstyles1}>My Bookings</Text>
            </TouchableOpacity>
          </View>

          <View>
            <View style={Styles.linesstyles}></View>
            <TouchableOpacity
              style={Styles.constyles}
              onPress={() => props.navigation.navigate('Support')}>
              {/* // onPress={() => props.navigation.navigate('ChatBot')}> */}
              <Image
                source={require('./Source/Assets/Images/headphonesicone.png')}
                style={Styles.iconestyles}
              />
              <Text style={Styles.textstyles1}>Support</Text>
            </TouchableOpacity>
          </View>
          <View>
            <View style={Styles.linesstyles}></View>
            <TouchableOpacity
              onPress={() => {
                setModalVisible2(true);
                props.navigation.closeDrawer('Home');
              }}
              style={Styles.constyles}>
              <Image
                source={require('./Source/Assets/Images/Bstaricone.png')}
                style={Styles.iconestyles}
              />
              <Text style={Styles.textstyles1}>Rate the App</Text>
            </TouchableOpacity>
          </View>
          <View>
            <View style={Styles.linesstyles}></View>
            <TouchableOpacity
              style={Styles.constyles}
              onPress={() => props.navigation.navigate('PrivacyPolicies')}>
              <Image
                source={require('./Source/Assets/Images/insurance.png')}
                style={Styles.iconestyles}
              />
              <Text style={Styles.textstyles1}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
          <View>
            <View style={Styles.linesstyles}></View>
            <TouchableOpacity
              style={Styles.constyles}
              onPress={() => props.navigation.navigate('Termsandconditions')}>
              <Image
                source={require('./Source/Assets/Images/terms-and-conditions.png')}
                style={Styles.iconestyles}
              />
              <Text style={Styles.textstyles1}>Terms and Conditions</Text>
            </TouchableOpacity>
          </View>
          <View>
            <View style={Styles.linesstyles}></View>
            <TouchableOpacity
              style={Styles.constyles}
              onPress={() => props.navigation.navigate('Abouts')}>
              <Image
                source={require('./Source/Assets/Images/information-buttonicone.png')}
                style={Styles.iconestyles}
              />
              <Text style={Styles.textstyles1}>About Us</Text>
            </TouchableOpacity>
          </View>
          <View>
            <View style={Styles.linesstyles}></View>
            <TouchableOpacity
              style={Styles.constyles}
              onPress={() => props.navigation.navigate('Faqs')}>
              <Image
                source={require('./Source/Assets/Images/faqs.png')}
                style={Styles.iconestyles}
              />
              <Text style={Styles.textstyles1}>FAQs</Text>
            </TouchableOpacity>
          </View>

          <View style={Styles.linesstyles}></View>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
              props.navigation.closeDrawer('Home');
            }}
            style={Styles.constyles}
            // onPress={() => props.navigation.navigate('Abouts')}
          >
            <Image
              source={require('./Source/Assets/Images/logout.png')}
              style={Styles.iconestyles}
            />
            <Text style={Styles.textstyles1}>Logout</Text>
          </TouchableOpacity>
          <View style={Styles.linesstyles}></View>

          <View style={{alignItems: 'center'}}>
            <Text style={{color: Colors.darkGray, fontWeight: '500'}}>
              Version 1.1.0.1
            </Text>
          </View>
        </View>
      </DrawerContentScrollView>

      <View style={Styles.centeredView}>
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
              <Text style={Styles.modalText}>
                Are you sure you want to logout?
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 40,
                  top: 20,
                }}>
                <TouchableOpacity
                  style={{
                    borderColor: '#0EC01B',
                    backgroundColor: '#0EC01B',
                    height: height / 18,
                    width: width / 3.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 4,
                    borderWidth: 1,
                  }}
                  // onPress={() => {
                  //   setModalVisible(!modalVisible);
                  //   props.navigation.navigate('Login');
                  // }}
                  onPress={_logout}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    Yes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderColor: '#0EC01B',
                    height: height / 18,
                    width: width / 3.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 4,
                    borderColor: '#0EC01B',
                    borderWidth: 1,
                  }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <Text
                    style={{
                      color: '#0EC01B',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    No
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible2(!modalVisible2);
          }}>
          <View style={Styles.centeredView}>
            <View
              style={{
                backgroundColor: Colors.white,
                paddingVertical: '10%',
                marginHorizontal: 10,
                borderRadius: 7,
              }}>
              <Text
                style={{
                  color: Colors.black,
                  textAlign: 'center',
                  fontWeight: '500',
                  fontSize: 18,
                  top: -20,
                }}>
                Tab a star to rate in on the App Store.
              </Text>
              <View
                style={{
                  top: -15,
                }}>
                <Rating
                  onFinishRating={rating => {
                    Alert.alert('Star Rating: ' + JSON.stringify(rating));
                  }}
                  style={{paddingVertical: 10}}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 30,
                  top: 5,
                }}>
                <TouchableOpacity
                  onPress={ratingCompleted}
                  style={{
                    borderColor: '#0EC01B',
                    backgroundColor: '#0EC01B',
                    paddingHorizontal: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 4,
                    paddingVertical: 10,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    Submit
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible2(!modalVisible2);
                  }}
                  style={{
                    borderColor: '#0EC01B',
                    paddingHorizontal: 30,
                    paddingVertical: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 4,
                    borderColor: '#0EC01B',
                    borderWidth: 1,
                  }}>
                  <Text
                    style={{
                      color: '#0EC01B',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default CustomDrawerMenu;

const Styles = StyleSheet.create({
  lablebox: {
    height: 50,
    borderWidth: 1,
    borderColor: '#F7B02D',
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconestyle: {
    height: 80,
    width: 80,
    borderRadius: 50,
    alignSelf: 'center',
  },
  linesstyles: {
    borderWidth: 0.5,
    marginVertical: 20,
    borderColor: 'grey',
  },
  textlable: {
    alignItems: 'center',
  },
  textstyl: {
    color: 'black',
    fontSize: 19,
    fontWeight: 'bold',
  },
  textstyl2: {
    color: 'grey',
    fontWeight: '500',
  },
  iconestyles: {
    height: 23,
    width: 23,
  },
  constyles: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  textstyles1: {
    marginHorizontal: 15,
    fontWeight: '500',
    color: Colors.darkGray,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalView: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    height: height / 6,
    justifyContent: 'center',
  },

  textStyle: {
    color: '#0EC01B',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    top: -15,
    fontWeight: '700',
    fontSize: 17,
    color: Colors.black,
  },
});
