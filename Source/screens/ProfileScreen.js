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
// import HeaderDrawer from '../ReusableComponents/HeaderDrawer';
import {BottomSheet} from 'react-native-btr';
import axios from 'axios';
import {BASE_URL} from '../Assets/utils/Restapi/Config';
import {_getStorage} from '../Assets/utils/storage/Storage';
import Toast from 'react-native-simple-toast';
import Header from '../ReusableComponents/Header';
import {getFirstLetters} from '../Assets/utils/Handler/NameAvatar';
import {useIsFocused} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');
const ProfileScreen = ({navigation, route}) => {
  const [profileData, setProfileData] = useState('');
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [imageUrlPath, setImageUrlPath] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [profileUrl, setProfileUrl] = useState('');
  const [isImage, setIsImage] = useState('');

  // console.log('isImage', isImage);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      _getprofileapi();
      getFirstLetters;
    }
  }, [isFocused]);

  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  const onGallary = () => {
    ImagePicker.openPicker({
      cropping: true,
      quality: 1,
      mediaType: 'any',
    })
      .then(image => {
        setImageUrlPath(image.path);
        setImageData(image);
        setVisible(!visible);
      })
      .catch(err => {
        console.log('Img picker Error--->>>', err);
      });
  };

  const onCamera = () => {
    ImagePicker.openCamera({
      cropping: true,
      mediaType: 'any',
      width: 300,
      height: 400,
    })
      .then(image => {
        setImageUrlPath(image.path);
        setImageData(image);
        setVisible(!visible);

        console.log('hey', image);
      })
      .catch(err => {
        console.log('Img picker Error--->>>', err);
      });
  };

  const _updateProfilePic = async () => {
    const token = await _getStorage('token');
    Toast.showWithGravity('Please wait...', Toast.LONG, Toast.BOTTOM);
    console.log('imageData==========', imageData);

    var filename = imageData?.path?.replace(/^.*[\\\/]/, '');
    // console.log('filename', filename);

    const profilePic = new FormData();
    profilePic.append('image', {
      name: filename,
      type: imageData.mime,
      uri:
        Platform.OS === 'android'
          ? imageData.path
          : imageData.path.replace('file://', ''),
    });
    // profilePic.append('image', 'imageUrl');

    axios
      .post(BASE_URL + `/uploadImage`, profilePic, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        setIsLoading(false);
        setImageData(null);
        setImageUrlPath(null);
        console.log('Profile image--------->>', res.data.imageUrl);

        Toast.showWithGravity(
          'Image Updated Successfully',
          Toast.LONG,
          Toast.BOTTOM,
        );
      })
      .catch(error => {
        setIsLoading(false);

        console.log('error in catch Profile image', error);
        Toast.showWithGravity('❗SERVER ERROR', Toast.LONG, Toast.BOTTOM);
      });
  };

  // const _updateProfilePic = async data => {
  //   const token = await _getStorage('token');
  //   Toast.showWithGravity('Please wait...', Toast.LONG, Toast.BOTTOM);

  //   console.log('data', data);

  //   var filename = data?.path?.replace(/^.*[\\\/]/, '');

  //   console.log('filename---------', filename);

  //   const profilePic = new FormData();

  //   // console.log('profilePic------>>>', profilePic);

  //   profilePic.append('image', {
  //     name: filename,
  //     type: data.mime,
  //     uri:
  //       Platform.OS === 'android'
  //         ? data.path
  //         : data.path.replace('file://', ''),
  //   });

  //   // profilePic.append('image');
  //   profilePic.append('image', 'data');

  //   axios
  //     .post(BASE_URL + `/uploadImage`, profilePic, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     })
  //     .then(res => {
  //       console.log('Profile image--------->>>>>>>> ', res.data);
  //       Toast.showWithGravity(
  //         'Image Updated Successfully',
  //         Toast.LONG,
  //         Toast.BOTTOM,
  //       );
  //     })
  //     .catch(error => {
  //       console.log('error in catch Profile image', error);
  //       Toast.showWithGravity('❗SERVER ERROR', Toast.LONG, Toast.BOTTOM);
  //     });
  // };

  const _getprofileapi = async () => {
    const token = await _getStorage('token');
    axios
      .get(BASE_URL + `/profile`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(val => {
        console.log('hey', val.data?.result?.imageUrl);

        // setImageUrlPath(val.data?.result?.imageUrl);

        val.data?.result?.imageUrl
          ? setProfileUrl(val.data?.result?.imageUrl)
          : setProfileUrl(null);

        setProfileData(val.data.result);
        setIsImage(val.data?.result?.imageUrl);
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
            contentContainerStyle={{paddingBottom: 70}}>
            <LinearGradient
              
              colors={['#92CD28', '#FFA034']}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              style={{backgroundColor: 'grey', flex: 0.4}}>
              <ImageBackground
                source={require('../Assets/Images/profilePicture123.png')}
                style={Styles.imagebox}>
                {profileUrl || imageUrlPath ? (
                  <Image
                    source={
                      imageUrlPath ? {uri: imageUrlPath} : {uri: profileUrl}
                    }
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 50,
                      resizeMode: 'cover',
                    }}
                  />
                ) : (
                  // <Text
                  //   style={{
                  //     color: Colors.lightGreen,
                  //     fontSize: 40,
                  //     fontWeight: '600',
                  //     textAlign: 'center',
                  //   }}>
                  //   {getFirstLetters(profileData?.firstName || '')}
                  // </Text>
                  <Image source={{uri: imageUrlPath}} />
                )}
                {/* {imageUrlPath && (
                  <Image
                    source={{uri: imageUrlPath}}
                    style={{height: 100, width: 100, borderRadius: 100}}
                  />
                )} */}
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
                  onPress={() => navigation.navigate('EditProfileScreen')}
                  style={{top: -55, left: 8}}>
                  <Image
                    source={require('../Assets/Images/Iconawesomeedit.png')}
                    style={Styles.editicone}
                  />
                </TouchableOpacity>
              </View>
            </LinearGradient>
            <View style={{backgroundColor: 'white', flex: 0.6,marginTop:6}}>
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
            {imageData && (
              <TouchableOpacity
                onPress={_updateProfilePic}
                style={{
                  backgroundColor: Colors.lightOrange,
                  marginHorizontal: 70,
                  borderRadius: 7,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 8,
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: 17,
                    fontWeight: 'bold',
                  }}>
                  Update
                </Text>
              </TouchableOpacity>
            )}
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
    justifyContent: 'center',
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
    height: height / 13,
    marginHorizontal: 20,
    backgroundColor: Colors.white,
    elevation: 5,
    margin: 5,
    marginVertical: 20,
    borderRadius: 4,
  },
  box2: {
    height: height / 13,
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
