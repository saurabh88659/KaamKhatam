import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';
import Modal from 'react-native-modal';

  const {width, height} = Dimensions.get('window');
  const Editaddress = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <SafeAreaView>
      <Header
        bgColor={Colors.darkOrange}
        color={Colors.black}
        title="My address"
        onPress={() => props.navigation.goBack('')}
      />
      <View style={{alignItems: 'center', marginVertical: 20}}>
        <Text style={{color: 'black', fontSize: 18, fontWeight: '500'}}>
          Select Address
        </Text>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: '#707070',
          height: height / 13,
          justifyContent: 'center',
        }}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text
            style={{fontWeight: '700', color: '#111EC4', marginHorizontal: 20}}>
            + Add a new address
          </Text>
        </TouchableOpacity>
      </View>

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
                  }}></View>
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={{
                  color: '#707070',
                  fontWeight: '500',
                  marginHorizontal: 20,
                }}>
                Your Location
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                marginVertical: 20,
                marginHorizontal: 20,
                //
              }}>
              <TextInput
                style={{
                  fontSize: 15,
                  textAlign: 'center',
                  alignSelf: 'center',
                  top: -10,
                }}
                placeholder="A-140, Block A, A Block, Sector63,Noida,Uttar Pradesh
              201304,India"
                placeholderTextColor="black"></TextInput>
              <TouchableOpacity>
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
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                marginHorizontal: 20,
              }}>
              <TextInput
                placeholder="Flat / Building / Street"
                placeholderTextColor="#888888"
              />
            </View>
            <Text
              style={{
                marginHorizontal: 24,
                marginVertical: 5,
                fontWeight: 'bold',
              }}>
              Name
            </Text>
            <View
              style={{
                borderBottomWidth: 1,
                marginHorizontal: 20,
              }}>
              <TextInput
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
                <Text>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
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
                <Text>OFFFICE</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
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
                <Text>OTHER</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Salonforwomen')}
              style={{
                backgroundColor: '#0EC01B',
                alignItems: 'center',
                height: '10%',
                justifyContent: 'center',
                marginVertical: '3%',
                marginHorizontal: 10,
                borderRadius: 6,
              }}>
              <Text style={{fontWeight: 'bold'}}>Save address</Text>
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
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: 'white',
    width: width,
    height: height / 1.7,
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
