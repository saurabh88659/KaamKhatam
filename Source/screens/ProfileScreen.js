import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../Assets/Constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
import HeaderDrawer from '../ReusableComponents/HeaderDrawer';
import {BottomSheet} from 'react-native-btr';
import axios from 'axios';
import {BASE_URL} from '../Assets/utils/Restapi/Config';
import {_getStorage} from '../Assets/utils/storage/Storage';
import Toast from 'react-native-simple-toast';
import Header from '../ReusableComponents/Header';

const {height, width} = Dimensions.get('window');
const ProfileScreen = ({navigation, route}) => {
  const [imageUrlPath, setImageUrlPath] = useState(null);
  const [imageUrlData, setImageUrlData] = useState('');
  const [profileData, setProfileData] = useState({});
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    _getprofileapi();
  }, []);

  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  const onGallary = () => {
    ImagePicker.openPicker({
      cropping: true,
      quality: 1,
      mediaType: 'any',
    }).then(image => {
      setImageUrlPath(image.path);
      // setImageUrlData(image);
      _updateProfilePic(image);
    });
  };

  const onCamera = () => {
    ImagePicker.openCamera({
      cropping: true,
      quality: 1,
      mediaType: 'any',
    }).then(image => {
      setImageUrlPath(image.path);
      // setImageUrlData(image);
      _updateProfilePic(image);
    });
  };

  const _updateProfilePic = async data => {
    const token = await _getStorage('token');
    Toast.showWithGravity('Please wait...', Toast.LONG, Toast.BOTTOM);

    console.log('data', data);

    var filename = data?.path?.replace(/^.*[\\\/]/, '');

    console.log('filename', filename);

    const profilePic = new FormData();

    profilePic.append('image', {
      name: filename,
      type: data.mime,
      uri:
        Platform.OS === 'android'
          ? data.path
          : data.path.replace('file://', ''),
    });
    profilePic.append('imageUrl');

    console.log('profilePic', profilePic._parts[1]);

    axios
      .post(BASE_URL + `/uploadImage`, profilePic, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        console.log('Profile image--------->>', res.data.imageUrl);
        setImage(res.data.imageUrl);
        Toast.showWithGravity(
          'Image Updated Successfully',
          Toast.LONG,
          Toast.BOTTOM,
        );
      })
      .catch(error => {
        console.log('error in catch Profile image', error);
        Toast.showWithGravity('❗SERVER ERROR', Toast.LONG, Toast.BOTTOM);
      });
  };

  const _getprofileapi = async () => {
    const token = await _getStorage('token');
    axios
      .get(BASE_URL + `/profile`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(val => {
        setProfileData(val.data.result);
        setIsLoading(false);
        console.log('profile response', val.data.result);
      })
      .catch(e => {
        console.log('in catch');
        console.log(e.response.data);
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {/* <HeaderDrawer
        Title="My Profile"
        location="Sector 62"
        onPress={() => navigation.toggleDrawer()}
      /> */}
      <Header
        bgColor={Colors.darkOrange}
        color={Colors.white}
        title="My Profile"
        onPress={() => navigation.goBack('')}
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
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 40}}>
            <LinearGradient
              colors={['#8690DD', '#5D56B4']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{backgroundColor: 'grey', flex: 0.4}}>
              <ImageBackground
                source={require('../Assets/Images/profilePicture123.png')}
                style={Styles.imagebox}>
                {profileData && (
                  <Image
                    source={{uri: profileData.imageUrl}}
                    style={{width: 98, height: 100, borderRadius: 100}}
                  />
                )}
              </ImageBackground>
              <TouchableOpacity
                style={{top: -55, alignSelf: 'center', margin: 20, left: 36}}
                onPress={toggleBottomNavigationView}>
                <Image
                  source={require('../Assets/Images/cameraicone22.png')}
                  style={Styles.cameraicone}
                />
              </TouchableOpacity>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'white',
                    fontWeight: 'bold',
                    top: -55,
                  }}>
                  {profileData.firstName + ' ' + profileData.lastName}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('RegisterAccount')}
                  style={{top: -55, left: 8}}>
                  <Image
                    source={require('../Assets/Images/Iconawesomeedit.png')}
                    style={Styles.editicone}
                  />
                </TouchableOpacity>
              </View>
            </LinearGradient>
            <View style={{backgroundColor: 'white', flex: 0.6}}>
              <View style={Styles.box}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 20,
                    marginHorizontal: 20,
                  }}>
                  <Image
                    source={require('../Assets/Images/phonereceiversilhouette.png')}
                    style={{height: 20, width: 20}}
                  />
                  <Text
                    style={{
                      paddingHorizontal: 20,
                      fontWeight: '500',
                      color: Colors.black,
                    }}>
                    {profileData.phone}
                  </Text>
                </View>
              </View>
              <View style={Styles.box2}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 20,
                    marginHorizontal: 20,
                  }}>
                  <Image
                    source={require('../Assets/Images/usericone222.png')}
                    style={{height: 20, width: 20}}
                  />

                  <Text
                    style={{
                      paddingHorizontal: 20,
                      fontWeight: '500',
                      color: Colors.black,
                    }}>
                    {profileData.gender}
                  </Text>
                </View>
              </View>
              <View style={Styles.box2}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 20,
                    marginHorizontal: 20,
                  }}>
                  <Image
                    source={require('../Assets/Images/emailicone.png')}
                    style={{height: 20, width: 20}}
                  />
                  <Text
                    style={{
                      paddingHorizontal: 20,
                      fontWeight: '500',
                      color: Colors.black,
                    }}>
                    {profileData.email}
                  </Text>
                </View>
              </View>
              <View style={Styles.box2}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 20,
                    marginHorizontal: 20,
                  }}>
                  <Image
                    source={require('../Assets/Images/birthdaycake.png')}
                    style={{height: 20, width: 20}}
                  />
                  <Text
                    style={{
                      paddingHorizontal: 20,
                      fontWeight: '500',
                      color: Colors.black,
                    }}>
                    {profileData.dateOfBirth}
                  </Text>
                </View>
              </View>
              <View style={Styles.box2}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 20,
                    marginHorizontal: 20,
                  }}>
                  <Image
                    source={require('../Assets/Images/city2.png')}
                    style={{height: 20, width: 20}}
                  />
                  <Text
                    style={{
                      paddingHorizontal: 20,
                      fontWeight: '500',
                      color: Colors.black,
                    }}>
                    {profileData.city}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      )}
      <BottomSheet
        visible={visible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}>
        <View style={Styles.bottomNavigationView}>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                color: Colors.black,
                fontSize: 20,
                fontWeight: '500',
                top: 20,
              }}>
              Upload Photo
            </Text>
            <Text
              style={{
                color: Colors.lightGray,
                fontSize: 15,
                top: 25,
              }}>
              Choose Your Profile Picture
            </Text>
          </View>
          <TouchableOpacity
            onPress={onCamera}
            style={{
              backgroundColor: Colors.lightOrange,
              height: 50,
              top: 40,
              marginHorizontal: 20,
              borderRadius: 7,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{color: Colors.white, fontSize: 17, fontWeight: 'bold'}}>
              Take Photo
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onGallary}
            style={{
              backgroundColor: Colors.lightOrange,
              height: 50,
              marginHorizontal: 20,
              borderRadius: 7,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 50,
            }}>
            <Text
              style={{color: Colors.white, fontSize: 17, fontWeight: 'bold'}}>
              Choose From Gellery
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setVisible(!visible)}
            style={{
              backgroundColor: Colors.lightOrange,
              height: 50,
              marginHorizontal: 20,
              borderRadius: 7,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Text
              style={{color: Colors.white, fontSize: 17, fontWeight: 'bold'}}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const Styles = StyleSheet.create({
  imagebox: {
    borderWidth: 1,
    height: 100,
    width: 100,
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 30,
    zIndex: 0,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderColor: 'grey',
  },

  cameraicone: {
    height: height / 30,
    width: width / 15,
  },
  editicone: {
    height: 20,
    width: 20,
  },
  editicone2: {
    height: 20,
    width: 20,
  },
  box: {
    height: height / 11,
    marginHorizontal: 20,
    backgroundColor: Colors.white,
    elevation: 5,
    margin: 5,
    marginVertical: 20,
    borderRadius: 4,
  },
  box2: {
    height: height / 11,
    marginHorizontal: 20,
    backgroundColor: Colors.white,
    elevation: 5,
    margin: 5,
    top: -15,
    borderRadius: 4,
  },
  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: 280,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
