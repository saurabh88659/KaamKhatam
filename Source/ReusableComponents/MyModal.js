import React from 'react';
import {View, Text, Pressable, TextInput} from 'react-native';
import Modal from 'react-native-modal';
// import { TextInput } from 'react-native-paper';
import RNExitApp from 'react-native-exit-app';
import Colors from '../Assets/Constants/Colors';

export default function MyModal({isModal, backPress, type}) {
  const UI = data => {
    switch (data) {
      case 'internet':
        return (
          <View
            style={{
              alignSelf: 'center',
              backgroundColor: Colors.white,
              paddingHorizontal: 40,
              paddingBottom: 20,
              paddingTop: 10,
              borderRadius: 6,
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: Colors.red,
                fontSize: 15,
                textAlign: 'center',
                fontWeight: '500',
              }}>
              Unable to detect internet connection!
            </Text>
            <Text
              style={{
                color: Colors.black,
                textAlign: 'center',
                marginTop: 5,
              }}>
              Please enable internet connection {'\n'} and try again
            </Text>
            <Pressable
              style={{
                backgroundColor: Colors.lightGreen,
                paddingVertical: 5,
                paddingHorizontal: 25,
                borderRadius: 2,
                marginTop: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => RNExitApp.exitApp()}>
              <Text
                style={{color: Colors.white, fontWeight: '500', fontSize: 15}}>
                OK
              </Text>
            </Pressable>
          </View>
        );

      default:
        return <></>;
    }
  };
  return (
    <View>
      <Modal
        isVisible={isModal}
        onBackButtonPress={backPress ? backPress : () => {}}
        onBackdropPress={backPress ? backPress : () => {}}
        swipeDirection={
          type == 'camera-image' ? ['up', 'left', 'right', 'down'] : null
        }>
        {UI(type)}
      </Modal>
    </View>
  );
}
