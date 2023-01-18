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
// import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
import HeaderDrawer from '../ReusableComponents/HeaderDrawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../Assets/utils/Restapi/Config';

const {height, width} = Dimensions.get('window');

const ProfileScreen = ({navigation, route}) => {
  const [imageUrlPath, setImageUrlPath] = useState(null);
  const [imageUrlData, setImageUrlData] = useState('');
  const [profileData, setProfileData] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  const onGallary = () => {
    console.warn('hello');
    ImagePicker.openPicker({
      cropping: true,
      quality: 1,
      includeBase64: true,
      mediaType: 'any',
    }).then(image => {
      setImageUrlPath(image.path);
      setImageUrlData(image.data);
    });
  };

  // const onCamera = () => {
  //   console.warn('hello');
  //   ImagePicker.openCamera({
  //     cropping: true,
  //     includeBase64: true,
  //     mediaType: 'any',
  //   }).then(image => {
  //     console.log('===== Open Camera =====222', image);
  //     setImageUrlPath(image.path);
  //     setImageUrlData(image.data);
  //   });
  // };

  // useEffect(async () => {
  //   const token = await AsyncStorage.getItem('token');
  //   setIsLoading(false);

  //   axios
  //     .get('https://all-in-one-app-sa.herokuapp.com/user/profile', {
  //       headers: {Authorization: `Bearer ${token}`},
  //     })
  //     .then(val => {
  //       setProfileData(val.data.result);
  //     })
  //     .catch(e => {
  //       console.log('in catch');
  //       console.log(e);
  //     });
  // }, []);

  // ================================================
  // const [getTokenId, setTokenId] = useState();

  useEffect(() => {
    profileapi();
  }, []);

  const profileapi = async () => {
    const token = await AsyncStorage.getItem('token');
    // setIsLoading(false);
    axios
      .get(BASE_URL + `/profile`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(val => {
        setProfileData(val.data.result);
        setIsLoading(false);
      })
      .catch(e => {
        console.log('in catch');
        console.log(e.response.data);
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <HeaderDrawer
        Title="My Profile"
        location="Sector 62"
        onPress={() => navigation.toggleDrawer()}
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
                {imageUrlPath && (
                  <Image
                    source={{uri: imageUrlPath}}
                    style={{width: 98, height: 100, borderRadius: 100}}
                  />
                )}
              </ImageBackground>
              <TouchableOpacity
                style={{top: -55, alignSelf: 'center', margin: 20, left: 36}}
                onPress={onGallary}>
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
                  <Text style={{paddingHorizontal: 20, fontWeight: '500'}}>
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
                  <Text style={{paddingHorizontal: 20, fontWeight: '500'}}>
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
                  <Text style={{paddingHorizontal: 20, fontWeight: '500'}}>
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
                  <Text style={{paddingHorizontal: 20, fontWeight: '500'}}>
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
                  <Text style={{paddingHorizontal: 20, fontWeight: '500'}}>
                    {profileData.city}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      )}
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
    // left: 35,
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
});
