import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Linking,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Colors from '../Assets/Constants/Colors';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {TextInput} from 'react-native';
// import {color} from 'react-native-reanimated';
import {_getProfileData} from '../utils/Controllers/ProfileController';
import {useEffect} from 'react';
import {Checkbox} from 'react-native-paper';
import {KeyboardAvoidingView} from 'react-native';
import {Platform} from 'react-native';
import {ScrollView} from 'react-native';
import {
  _PaymentApi,
  _PaymentApi_Second,
} from '../utils/Controllers/CartController';
import {WebView} from 'react-native-webview';
import {useIsFocused} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleToast from 'react-native-simple-toast';

var query = require('india-pincode-search');

export default function Checkout({navigation}) {
  const [isFirstName, setIsFirstName] = useState('');
  const [isLastName, setIsLastName] = useState('');
  const [isCompanyName, setIsCompanyName] = useState('');
  const [isAddress, setIsAddress] = useState('');
  const [isGST, setIsGST] = useState('');
  const [isEmail, setIsEamil] = useState('');
  const [isMobile, setIsMobile] = useState('');
  const [checked, setChecked] = useState(false);
  const {height, width} = useWindowDimensions();
  const [isFirstNameError, setIsFirstNameError] = useState('');

  const [isCompanyNameError, setIsCompanyNameError] = useState('');
  const [isEmailError, setIsEamilError] = useState('');
  const [isAddressError, setIsAddressError] = useState('');
  const [isGSTError, setIsGSTError] = useState('');
  // const [payidDetails, setpayidDetails] = useState('');
  const webviewRef = useRef(null);
  const [webViewVisible, setWebViewVisible] = React.useState(false);
  const [htmldata, sethtmldata] = useState('');

  const [isZipCode, setIsZipCode] = useState('');
  const [isZipCodeError, setIsZipCodeError] = useState('');
  const [isCity, setIsCity] = useState('');
  const [isCityError, setIsCityError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();
  const [cityEdit, setcityEdit] = useState(false);
  const [stateEdit, setStateEdit] = useState(false);
  const [pincodeEdit, setPincodeEdit] = useState(false);

  useEffect(() => {
    if (isFocused) {
      _Profile_get();
    }
  }, [isFocused]);

  const _Profile_get = async () => {
    const result = await _getProfileData();
    setIsLoading(true);
    if (result.data) {
      console.log('result.data', result?.data?.myProfile?.address?.state);
      setIsFirstName(result?.data?.myProfile?.name);
      setIsLastName(result?.data?.myProfile?.last);
      setIsEamil(result?.data?.myProfile?.email);
      setIsMobile(result?.data?.myProfile?.phone);
      setIsGST(result?.data?.myProfile?.gstNumber);
      setIsZipCode(result?.data?.myProfile?.address?.zip_code);
      setIsCity(result?.data?.myProfile?.address?.city);
      setIsCompanyName(result?.data?.myProfile?.companyName);
      setIsAddress(result?.data?.myProfile?.address?.state);
      setIsLoading(false);
    } else {
      console.log('catch errro checkout');
      setIsLoading(false);
    }
  };

  const validateName = () => {
    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(isFirstName)) {
      setIsFirstNameError('Please enter a valid Fist Name');
      return false;
    } else {
      setIsFirstNameError('');
      return true;
    }
  };

  const validateCompanyName = () => {
    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(isCompanyName)) {
      setIsCompanyNameError('Please enter a valid Company');
      return false;
    } else {
      setIsCompanyNameError('');
      return true;
    }
  };

  const validateEmail = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(isEmail)) {
      setIsEamilError('Please enter a valid email');
      return false;
    } else {
      setIsEamilError('');
      return true;
    }
  };

  const validateAddress = () => {
    const namePattern = /^[a-zA-Z0-9\s,]+$/;
    if (!namePattern.test(isAddress)) {
      setIsAddressError('Please enter a valid State');
      return false;
    } else {
      setIsAddressError('');
      return true;
    }
  };

  const validateCity = () => {
    const namePattern = /^[a-zA-Z0-9\s,]+$/;
    if (!namePattern.test(isCity)) {
      setIsCityError('Please enter a valid City');
      return false;
    } else {
      setIsCityError('');
      return true;
    }
  };

  const validatePincode = () => {
    const namePattern = /^\d{6}$/;
    if (!namePattern.test(isZipCode)) {
      setIsZipCodeError('Please enter a valid Pin Code');
      return false;
    } else {
      setIsZipCodeError('');
      return true;
    }
  };

  const validateGst = () => {
    const namePattern =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
    if (!namePattern.test(isGST)) {
      setIsGSTError('Please enter a valid  GST');
      return false;
    } else {
      setIsGSTError('');
      return true;
    }
  };

  const handleSubmit = () => {
    const isValidFirstName = validateName(isFirstName);
    const isValidCompany = validateCompanyName(isCompanyName);
    const isValidEmail = validateEmail(isEmail);
    const isValidAddress = validateAddress(isAddress);
    const isValidGst = validateGst(isGST);
    const isValidZipcode = validatePincode(isZipCode);
    const isValidCity = validateCity(isCity);
    if (
      isValidFirstName &&
      isValidEmail &&
      // isValidCompany &&
      isValidAddress &&
      // isValidGst &&
      isValidZipcode &&
      isValidCity
    ) {
      _Payment_api();
    }
  };

  const _Payment_api = async () => {
    const obj = {
      companyName: isCompanyName,
      gstNumber: isGST,
      state: isAddress,
      zip_code: isZipCode,
      city: isCity,
    };
    const result = await _PaymentApi(obj);
    // console.log('result---------->>>>>>', result?.data?.orderKeyId);
    if (result.data) {
      sethtmldata(result?.data);
      setWebViewVisible(true);
    } else {
      console.log('error catch error payment ', result);
    }
  };

  useEffect(() => {
    let intervalid;
    if (webViewVisible) {
      intervalid = setInterval(payId_url_Open, 5000);
    }
    return () => clearInterval(intervalid);
  }, [webViewVisible]);

  const payId_url_Open = async () => {
    const response = await _PaymentApi_Second(htmldata?.orderKeyId);
    console.log('response --------->>>', response?.data);
    console.log('htmldata?.orderKeyId', htmldata?.orderKeyId);
    if (response.data) {
      if (response?.data?.OrderPaymentStatusText !== 'Pending') {
        SimpleToast.show(
          `Order Status: ${response?.data?.OrderPaymentStatusText}`,
          SimpleToast.SHORT,
        );
        navigation.goBack();
      }
    } else {
      console.log('status chech error----->>>', response?.data);
    }
  };

  const fetchLocationInfo = () => {
    const CollectData = query.search(`${isZipCode}`);
    if (CollectData[0] == null) {
      SimpleToast.show('Please Enter Correct Pincode', SimpleToast.LONG);
    } else {
      // setCityValue(CollectData[0].city);
      setIsAddress(CollectData[0]?.state);
      setIsCity(CollectData[0]?.city);
      console.log('data--------->>>>>>', CollectData);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#efefef'}}>
      <View
        style={{
          paddingVertical: 20,
          backgroundColor: Colors.white,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5Icon
            name="chevron-left"
            size={hp('2.4%')}
            style={{color: '#000', paddingLeft: 7}}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: Colors.black,
            fontSize: hp('2%'),
            fontWeight: 'bold',
          }}>
          Checkout
        </Text>
        <View></View>
      </View>
      {isLoading ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View>
          {webViewVisible ? (
            <View
              style={{
                height: '95%',
                // flex: 1,
              }}>
              <WebView
                ref={webviewRef}
                source={{
                  uri: htmldata.paymentProcessUrl,
                }}
                scrollEnabled={true}
                // onNavigationStateChange={handleNavigationStateChange}
                // renderLoading={LoadingIndicatorView}
                startInLoadingState={true}
                // style={{flex: 1, height: hp('100%')}}
              />
            </View>
          ) : (
            <ScrollView
              contentContainerStyle={{paddingBottom: 60}}
              showsVerticalScrollIndicator={false}>
              <View
                style={{
                  backgroundColor: Colors.white,
                  paddingVertical: 10,
                  borderBottomRightRadius: 25,
                  borderBottomLeftRadius: 25,
                  marginTop: 20,
                  elevation: 10,
                  paddingVertical: 20,
                }}>
                <View style={{marginHorizontal: 15}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 20,
                    }}>
                    <View
                      style={{
                        width: wp('43%'),
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: Colors.black,
                          paddingLeft: 15,
                        }}>
                        First Name
                      </Text>
                      <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                        <TextInput
                          placeholder="Enter Your First Name"
                          placeholderTextColor={Colors.gray}
                          style={Styles.INPUT}
                          value={isFirstName}
                          onChangeText={tex => setIsFirstName(tex)}
                        />
                      </KeyboardAvoidingView>
                      {isFirstNameError ? (
                        <Text
                          style={{
                            color: Colors.red,
                            fontSize: 10,
                            fontWeight: '500',
                          }}>
                          {isFirstNameError}
                        </Text>
                      ) : null}
                    </View>
                    <View
                      style={{
                        width: wp('43%'),
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: Colors.black,
                          paddingLeft: 15,
                        }}>
                        Last Name (optional)
                      </Text>
                      <TextInput
                        placeholder="Enter Your Last Name"
                        placeholderTextColor={Colors.gray}
                        style={Styles.INPUT}
                        value={isLastName}
                        onChangeText={tex => setIsLastName(tex)}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      marginTop: 20,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: Colors.black,
                        paddingLeft: 15,
                      }}>
                      Company Name
                    </Text>
                    <KeyboardAvoidingView
                      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                      <TextInput
                        placeholder="Enter Your Company Name"
                        placeholderTextColor={Colors.gray}
                        style={Styles.INPUT}
                        value={isCompanyName}
                        onChangeText={tex => setIsCompanyName(tex)}
                      />
                    </KeyboardAvoidingView>
                    {/* {isCompanyNameError ? (
                        <Text
                          style={{
                            color: Colors.red,
                            fontSize: 10,
                            fontWeight: '500',
                          }}>
                          {isCompanyNameError}
                        </Text>
                      ) : null} */}
                  </View>

                  <View
                    style={{
                      marginTop: 20,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: Colors.black,
                        paddingLeft: 15,
                      }}>
                      Pin Code
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                        <TextInput
                          placeholder="Enter Your Pin Code"
                          placeholderTextColor={Colors.gray}
                          style={[Styles.INPUT, {width: wp('90%')}]}
                          maxLength={6}
                          onBlur={fetchLocationInfo}
                          keyboardType="number-pad"
                          value={isZipCode}
                          onChangeText={tex => setIsZipCode(tex)}
                          editable={pincodeEdit}
                        />
                      </KeyboardAvoidingView>
                      <TouchableOpacity
                        onPress={() => setPincodeEdit(!pincodeEdit)}
                        style={{
                          right: wp('6%'),
                        }}>
                        <MaterialCommunityIcons
                          b
                          name="pencil"
                          size={hp('2.5%')}
                          style={{
                            color: pincodeEdit
                              ? Colors.lightGreen
                              : Colors.darkGray,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                    {isZipCodeError ? (
                      <Text
                        style={{
                          color: Colors.red,
                          fontSize: 10,
                          fontWeight: '500',
                        }}>
                        {isZipCodeError}
                      </Text>
                    ) : null}
                  </View>
                  <View
                    style={{
                      marginTop: 20,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: Colors.black,
                        paddingLeft: 15,
                      }}>
                      City
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                        <TextInput
                          placeholder="Enter Your City "
                          placeholderTextColor={Colors.gray}
                          style={[Styles.INPUT, {width: wp('90%')}]}
                          value={isCity}
                          onChangeText={tex => setIsCity(tex)}
                          editable={cityEdit}
                        />
                      </KeyboardAvoidingView>
                      <TouchableOpacity
                        onPress={() => setcityEdit(!cityEdit)}
                        style={{
                          right: wp('6%'),
                        }}>
                        <MaterialCommunityIcons
                          name="pencil"
                          size={hp('2.5%')}
                          style={{
                            color: cityEdit
                              ? Colors.lightGreen
                              : Colors.darkGray,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                    {isCityError ? (
                      <Text
                        style={{
                          color: Colors.red,
                          fontSize: 10,
                          fontWeight: '500',
                        }}>
                        {isCityError}
                      </Text>
                    ) : null}
                  </View>

                  <View
                    style={{
                      marginTop: 20,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: Colors.black,
                        paddingLeft: 15,
                      }}>
                      State
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                        <TextInput
                          placeholder="Enter Your State"
                          placeholderTextColor={Colors.gray}
                          style={[Styles.INPUT, {width: wp('90%')}]}
                          value={isAddress}
                          onChangeText={tex => setIsAddress(tex)}
                          editable={stateEdit}
                        />
                      </KeyboardAvoidingView>
                      <TouchableOpacity
                        onPress={() => setStateEdit(!stateEdit)}
                        style={{
                          right: wp('6%'),
                        }}>
                        <MaterialCommunityIcons
                          name="pencil"
                          size={hp('2.5%')}
                          style={{
                            color: stateEdit
                              ? Colors.lightGreen
                              : Colors.darkGray,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                    {isAddressError ? (
                      <Text
                        style={{
                          color: Colors.red,
                          fontSize: 10,
                          fontWeight: '500',
                        }}>
                        {isAddressError}
                      </Text>
                    ) : null}
                  </View>

                  <View
                    style={{
                      marginTop: 20,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: Colors.black,
                        paddingLeft: 15,
                      }}>
                      GST
                    </Text>
                    <KeyboardAvoidingView
                      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                      <TextInput
                        placeholder="Enter Your GST"
                        placeholderTextColor={Colors.gray}
                        style={Styles.INPUT}
                        maxLength={15}
                        value={isGST}
                        onChangeText={tex => setIsGST(tex)}
                        autoCapitalize={'characters'}
                      />
                    </KeyboardAvoidingView>

                    {/* {isGSTError ? (
                        <Text
                          style={{
                            color: Colors.red,
                            fontSize: 10,
                            fontWeight: '500',
                          }}>
                          {isGSTError}
                        </Text>
                      ) : null} */}
                  </View>

                  <View
                    style={{
                      marginTop: 20,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: Colors.black,
                        paddingLeft: 15,
                      }}>
                      Email
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                      }}>
                      <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                        <TextInput
                          placeholder="Enter Your Email"
                          placeholderTextColor={Colors.gray}
                          style={[Styles.INPUT, {width: wp('90%')}]}
                          value={isEmail}
                          onChangeText={tex => setIsEamil(tex)}
                          editable={false}
                        />
                      </KeyboardAvoidingView>
                      <Ionicons
                        name="checkmark-circle-sharp"
                        size={hp('3%')}
                        style={{color: Colors.lightGreen, right: wp('6%')}}
                      />
                    </View>

                    {/* {isAddressError ? (
                <Text
                  style={{color: Colors.red, fontSize: 10, fontWeight: '500'}}>
                  {isAddressError}
                </Text>
              ) : null} */}
                  </View>

                  <View
                    style={{
                      marginTop: 20,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: Colors.black,
                        paddingLeft: 15,
                      }}>
                      Mobile Number
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                        <TextInput
                          placeholder=" Mobile Number"
                          placeholderTextColor={Colors.gray}
                          style={[Styles.INPUT, {width: wp('90%')}]}
                          value={isMobile}
                          onChangeText={tex => setIsMobile(tex)}
                          editable={false}
                        />
                      </KeyboardAvoidingView>

                      <Ionicons
                        name="checkmark-circle-sharp"
                        size={hp('3%')}
                        style={{color: Colors.lightGreen, right: wp('6%')}}
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginHorizontal: 10,
                  }}>
                  <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked(!checked);
                    }}
                  />
                  <Text style={{fontSize: 12, color: Colors.black}}>
                    I agree with the company terms and Conditions
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={handleSubmit}
                  // onPress={() => setWebViewVisible(true)}
                  activeOpacity={0.5}
                  disabled={checked ? false : true}
                  style={{
                    paddingVertical: 17,
                    backgroundColor: checked ? '#1468af' : Colors.gray,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: wp('50%'),
                    alignSelf: 'center',
                    borderRadius: 8,
                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: 15,
                      fontWeight: '500',
                    }}>
                    Proceed
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  INPUT: {
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 7,
    borderBottomWidth: 1,
    borderColor: Colors.gray,
    height: 40,
    color: Colors.black,
  },
});
