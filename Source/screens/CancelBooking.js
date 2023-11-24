import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';
import {RadioButton} from 'react-native-paper';
import {_getStorage} from '../Assets/utils/storage/Storage';
import {BASE_URL} from '../Assets/utils/Restapi/Config';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import {TextInput} from 'react-native-gesture-handler';
const {height, width} = Dimensions.get('window');

export default function CancelBooking(props) {
  const [checked, setChecked] = useState('');
  const [ButtonLoading, setButtonLoading] = useState(false);
  const [otherReason, setOtherReason] = useState('');
  const [otherReasonModal, setOtherReasonModal] = useState(false);
  const [modalButtonLoading, setModalButtonLoading] = useState(false);
  // const getToken = async () => {
  //   const token = await _getStorage('token');
  //   console.log('token', token);
  // };
  // useEffect(() => {
  //   getToken();
  // }, []);

  console.log('checked ==', checked);
  const bookingid = props.route.params;
  console.log('bookingid in CancelBooking scrren 20', bookingid);

  const ReasonData = [
    'Not available on that day',
    'Not available on that time',
    'Change of Plan3',
    'Wrong Booking',
    'Out of Station',
    'Change of Plan6',
    'Change of Plan7',
    'Change of Plan8',
    'Other',
  ];

  const cancelBooking = async () => {
    const token = await _getStorage('token');
    setButtonLoading(true);
    // Toast.showWithGravity('Please wait...', Toast.LONG, Toast.BOTTOM);
    let obj = {
      bookingId: bookingid,
      cancelledReason: checked,
    };
    console.log('object of ====/booking/cancel', obj);
    axios
      .put(BASE_URL + `/booking/cancel`, obj, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        setButtonLoading(false);
        console.log('response of cancelBooking=====', res.data);
        Toast.showWithGravity(res.data.message, Toast.SHORT, Toast.BOTTOM);
        props.navigation.goBack();
      })
      .catch(error => {
        setButtonLoading(false);

        console.log(
          'cancel booking catch error===51',
          error.response.data.message,
        );
        if (
          error.response.data.message ==
          '"cancelledReason" is not allowed to be empty'
        ) {
          console.log('runnn ');
          Toast.showWithGravity(
            'Kindly provide a reason for canceling the booking',
            Toast.CENTER,
            Toast.BOTTOM,
          );
        }
        // Toast.showWithGravity(
        //   error.response.data.message,
        //   Toast.CENTER,
        //   Toast.BOTTOM,
        // );
      });
  };

  const cancelBookingSubmitModal = async () => {
    const token = await _getStorage('token');
    setModalButtonLoading(true);
    // Toast.showWithGravity('Please wait...', Toast.LONG, Toast.BOTTOM);
    let obj = {
      bookingId: bookingid,
      cancelledReason: otherReason,
    };
    console.log('object of cancelBookingSubmitModal', obj);
    axios
      .put(BASE_URL + `/booking/cancel`, obj, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        setModalButtonLoading(false);
        console.log('response of cancelBooking=====', res.data);
        Toast.showWithGravity(res.data.message, Toast.SHORT, Toast.BOTTOM);
        props.navigation.goBack();
      })
      .catch(error => {
        setModalButtonLoading(false);
        console.log(
          'cancel booking catch error===51',
          error.response.data.message,
        );
        if (
          error.response.data.message ==
          '"cancelledReason" is not allowed to be empty'
        ) {
          console.log('runnn ');
          Toast.showWithGravity(
            'Kindly provide a reason for canceling the booking',
            Toast.CENTER,
            Toast.BOTTOM,
          );
        }
        // Toast.showWithGravity(
        //   error.response.data.message,
        //   Toast.CENTER,
        //   Toast.BOTTOM,
        // );
      });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <Header
        bgColor={Colors.topNavbarColor}
        color={Colors.white}
        title="Cancel Booking"
        onPress={() => props.navigation.goBack()}
      />
      <View
        style={{
          backgroundColor: '#fff',
          justifyContent: 'space-between',
          flex: 1,
        }}>
        <ScrollView>
          <View
            style={{
              flex: 1,
              margin: 10,
              backgroundColor: '#E3E3E3',
              borderRadius: 10,
              elevation: 10,
              justifyContent: 'space-between',
            }}>
            {ReasonData.map((value, index) => (
              <RadioButton.Item
                color={Colors.purple}
                key={index}
                label={value}
                value={value}
                status={checked === value ? 'checked' : 'unchecked'}
                // onPress={() => setChecked(value)}
                onPress={() => {
                  if (value === 'Other') {
                    console.log('hello ---');
                    setOtherReasonModal(!otherReasonModal);
                  } else {
                    setChecked(value);
                  }
                }}
              />
            ))}
          </View>
        </ScrollView>

        <TouchableOpacity
          onPress={cancelBooking}
          style={{
            height: 50,
            backgroundColor: Colors.purple,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            marginHorizontal: 15,
            marginVertical: 10,
            paddingVertical: 10,
          }}>
          {!ButtonLoading ? (
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              Submit
            </Text>
          ) : (
            <ActivityIndicator size={26} color={'#fff'} />
          )}
        </TouchableOpacity>
        {/* {===========================pther reason modal================} */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={otherReasonModal}
          onRequestClose={() => {
            // setCancelServicemodalVisible(!cancelServicemodalVisible);
            setOtherReasonModal(!otherReasonModal);
            setChecked('');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View>
                <Text style={[styles.modalText, {marginTop: 20}]}>
                  Please enter Your reason
                </Text>
                {/* <Text
                  style={{
                    textAlign: 'center',
                    // top: -15,
                    fontWeight: '700',
                    fontSize: 17,
                    color: '#ff8c00',
                    marginVertical: 10,
                  }}>
                  A 10% service charge will apply
                </Text> */}

                <View>
                  <TextInput
                    placeholderTextColor={Colors.lightGray}
                    placeholder="Type here..."
                    value={otherReason}
                    onChangeText={text => setOtherReason(text)}
                    style={{
                      height: 45,
                      borderWidth: 1,
                      paddingHorizontal: 15,
                      marginHorizontal: 15,
                      borderRadius: 5,
                      color: Colors.black,
                      marginTop: 30,
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 30,
                  // top: 20,
                  // marginVertical: 15,
                  marginBottom: 20,
                }}>
                <TouchableOpacity
                  style={{
                    borderColor: Colors.purple,
                    backgroundColor: Colors.purple,
                    height: height / 18,
                    width: width / 3.3,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 4,
                    borderWidth: 1,
                    // marginBottom: 3,
                  }}
                  onPress={cancelBookingSubmitModal}>
                  {!modalButtonLoading ? (
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}>
                      SUBMIT
                    </Text>
                  ) : (
                    <ActivityIndicator size={20} color={'#fff'} />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderColor: Colors.purple,
                    height: height / 18,
                    width: width / 3.3,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 4,
                    // borderColor: '#0EC01B',
                    borderWidth: 1,
                  }}
                  onPress={() => {
                    setOtherReasonModal(!otherReasonModal);
                    setChecked('');
                    // setCancelServicemodalVisible(!cancelServicemodalVisible);
                  }}>
                  <Text
                    style={{
                      color: Colors.purple,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    CANCEL
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalView: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    height: height / 3.5,
    justifyContent: 'space-between',
  },

  textStyle: {
    color: '#0EC01B',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  modalText: {
    textAlign: 'center',
    // top: -15,
    fontWeight: '700',
    fontSize: 17,
    color: Colors.black,
  },
});
