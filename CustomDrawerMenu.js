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
  Linking,
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
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

const {height, width} = Dimensions.get('screen');

const CustomDrawerMenu = props => {
  const isFocused = useIsFocused();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [imgUrl, setImagee] = useState();
  const [localIamgeURl, setLocalIamgeURl] = useState(null);
  const [onUpdateImage, setOnUpdateImage] = useState('');
  const UpdateState = useSelector(
    state => state.updateState.profiledataupdateState,
  );
  console.log('at drawer== ', UpdateState);

  useEffect(() => {
    console.log('---------useEffect----');
    profileapi();
  }, [imgUrl, isFocused]);

  console.log('===drawer imgUrl', imgUrl);

  useEffect(() => {
    getProfileImage();
  }, []);

  const getProfileImage = async () => {
    if (imgUrl) {
      const ProfileImage = await AsyncStorage.getItem('ProfileImage');
      console.log(ProfileImage, 'ProfileImage');
    }
  };

  const profileapi = async () => {
    setOnUpdateImage(Math.random());
    const token = await _getStorage('token');
    axios
      .get(BASE_URL + `/profile`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(val => {
        setProfileData(val.data.result);
        console.log(
          'profole data res of profileapi in drawer========>>',
          val.data.result,
        );
        setImagee(val.data.result?.imageUrl);
        if (val.data.result?.imageUrl) {
          AsyncStorage.setItem('ProfileImage', val.data.result?.imageUrl);
        }
        console.log(
          'Drawer  .data.result-------------',
          val.data.result.imageUrl,
        );
        // console.log('profile drower>', val.data.result.imageUrl);
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
  console.log('----img url ---', imgUrl);
  const Rating = () => {
    Linking.openURL(
      'https://play.google.com/store/apps/details?id=com.allonone',
    );
  };

  const Register_as_partner = () => {
    Linking.openURL(
      'https://play.google.com/store/apps/details?id=com.allonone',
    );
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={{flex: 1, backgroundColor: Colors.white}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: Colors.white}}>
        <View style={{marginTop: '-1.4%', paddingBottom: '5%'}}>
          <LinearGradient
            // colors={['#532DC4', '#784CD2', '#8E57FF', '#A67FF9']}
            colors={['#7A33C2', '#A67FF9']}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1.0}}
            // style={{backgroundColor: 'grey', flex: 0.4}}
          >
            <View style={{paddingVertical: 25}}>
              <TouchableOpacity
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 100,
                  borderColor: Colors.black,
                  // borderWidth: 1,
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: Colors.grayShade,
                }}
                onPress={() => props.navigation.navigate('ProfileScreen')}>
                {console.log('ddddddddddddddddddddddddddddd', imgUrl)}
                {profileData?.imageUrl ? (
                  <Image
                    style={{
                      height: '100%',
                      width: '100%',
                      borderRadius: 100,
                      resizeMode: 'cover',
                    }}
                    // source={{uri: profileData?.imageUrl + '?' + onUpdateImage}}
                    source={{uri: imgUrl}}
                  />
                ) : (
                  <Text
                    style={{
                      color: Colors.purple,
                      fontSize: 40,
                      fontWeight: '600',
                    }}>
                    {getFirstLetters(profileData?.firstName || '')}
                  </Text>
                )}
                <View style={{position: 'absolute', right: 0, bottom: 6}}>
                  <FontAwesome5 name="edit" color={Colors.white} size={15} />
                </View>
              </TouchableOpacity>

              <View style={{alignItems: 'center', marginTop: 10}}>
                <Text style={{color: '#fff', fontSize: 19, fontWeight: '400'}}>
                  {profileData.firstName + ' ' + profileData.lastName}
                </Text>
              </View>
              <View
                style={{
                  // alignItems: 'center',
                  marginTop: 5,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <View style={{}}>
                  <Ionicons name="call-sharp" size={20} color={'#000'} />
                </View>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 15,
                    fontWeight: '400',
                    marginLeft: 3,
                  }}>
                  {profileData.phone}
                </Text>
              </View>
            </View>
          </LinearGradient>

          {/* <View style={Styles.linesstyles}></View> */}
          {/* <TouchableOpacity
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
          </View> */}

          {/* /=========================== */}

          <View
            style={{
              // borderWidth: 0.5,
              // marginVertical: 20,
              borderColor: 'grey',
              // marginTop: 10,
              paddingVertical: 10,
            }}></View>
          <TouchableOpacity
            style={Styles.constyles}
            onPress={() => props.navigation.navigate('Mybooking')}>
            <FontAwesome5 name="calendar-alt" color={Colors.black} size={22} />
            {/* <Image
                source={require('./Source/Assets/Images/information-buttonicone.png')}
                style={Styles.iconestyles}
              /> */}
            <Text style={Styles.textstyles1}>My booking</Text>
          </TouchableOpacity>

          <View>
            <View style={Styles.linesstyles}></View>
            <TouchableOpacity
              style={Styles.constyles}
              onPress={() => props.navigation.navigate('Mywallet')}>
              {/* <Image
                source={require('./Source/Assets/Images/information-buttonicone.png')}
                style={Styles.iconestyles}
              /> */}
              <Entypo name="wallet" color={Colors.black} size={22} />
              <Text style={Styles.textstyles1}>My Wallet</Text>
            </TouchableOpacity>
          </View>

          <View>
            <View style={Styles.linesstyles}></View>
            <TouchableOpacity style={Styles.constyles} onPress={Rating}>
              {/* <Image
                source={require('./Source/Assets/Images/information-buttonicone.png')}
                style={Styles.iconestyles}
              /> */}
              <FontAwesome name="star" color={Colors.black} size={22} />

              <Text style={Styles.textstyles1}>Rating</Text>
            </TouchableOpacity>
          </View>
          <View>
            <View style={Styles.linesstyles}></View>
            <TouchableOpacity
              style={Styles.constyles}
              onPress={Register_as_partner}

              // onPress={() => props.navigation.navigate('Abouts')}
            >
              {/* <Image
                source={require('./Source/Assets/Images/information-buttonicone.png')}
                style={Styles.iconestyles}
              /> */}

              <FontAwesome5
                name="hands-helping"
                color={Colors.black}
                size={19}
              />

              <Text style={Styles.textstyles1}>Register as Partner</Text>
            </TouchableOpacity>
          </View>
          {/* {===========================} */}
          <View>
            <View style={Styles.linesstyles}></View>
            <TouchableOpacity
              style={Styles.constyles}
              onPress={() =>
                Linking.openURL('https://kaamkhatam.com/index.php/about/')
              }>
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
              // onPress={() => props.navigation.navigate('PrivacyPolicies')}
              onPress={() =>
                Linking.openURL(
                  'https://kaamkhatam.com/index.php/privacy-policy/',
                )
              }>
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
              // onPress={() => props.navigation.navigate('Termsandconditions')}
              onPress={() =>
                Linking.openURL(
                  'https://kaamkhatam.com/index.php/term-and-conditions/',
                )
              }>
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
              onPress={() => props.navigation.navigate('ChatBot')}>
              {/* // onPress={() => props.navigation.navigate('Support')}> */}
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
              style={Styles.constyles}
              onPress={() => props.navigation.navigate('Faqs')}>
              <Image
                source={require('./Source/Assets/Images/faqs.png')}
                style={Styles.iconestyles}
              />
              <Text style={Styles.textstyles1}>FAQs</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              // borderWidth: 0.5,
              marginVertical: 14,
              // borderColor: 'grey',
            }}></View>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
              props.navigation.closeDrawer('Home');
            }}
            style={{
              flexDirection: 'row',
              // marginHorizontal: 20,
              // alignItems: 'center',
              justifyContent: 'center',
            }}
            // onPress={() => props.navigation.navigate('Abouts')}
          >
            {/* <Image
              source={require('./Source/Assets/Images/logout.png')}
              style={Styles.iconestyles}
            /> */}
            <Text
              style={{
                marginHorizontal: 15,
                // fontWeight: '500',
                color: 'red',
                fontWeight: '800',
                fontSize: 18,
              }}>
              Logout
            </Text>
          </TouchableOpacity>

          <View
            style={{
              // borderWidth: 0.5,
              marginVertical: 7,
              // borderColor: 'grey',
            }}></View>

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
                  marginHorizontal: 30,
                  top: 20,
                }}>
                <TouchableOpacity
                  style={{
                    borderColor: Colors.purple,
                    backgroundColor: Colors.purple,
                    height: height / 18,
                    width: width / 3.1,
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
                    borderColor: Colors.purple,
                    height: height / 18,
                    width: width / 3.1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 4,
                    // borderColor: '#0EC01B',
                    borderWidth: 1,
                  }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <Text
                    style={{
                      color: Colors.purple,
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
                    backgroundColor: Colors.purple,
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
                    borderColor: Colors.purple,
                    paddingHorizontal: 30,
                    paddingVertical: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 4,
                    borderWidth: 1,
                  }}>
                  <Text
                    style={{
                      color: Colors.purple,
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
    borderRadius: 10,
    height: height / 4.8,
    justifyContent: 'center',
  },

  textStyle: {
    color: '#0EC01B',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    top: -17,
    fontWeight: '700',
    fontSize: 17,
    color: Colors.black,
  },
});
