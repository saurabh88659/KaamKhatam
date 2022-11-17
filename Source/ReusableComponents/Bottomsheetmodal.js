import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {RadioButton} from 'react-native-paper';
import Colors from '../Assets/Constants/Colors';

const {width, height} = Dimensions.get('window');

const Bottomsheetmodal = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [gender, setGender] = useState('');

  // const [index, setIndex] = useState(0);

  return (
    <SafeAreaView>
      <View style={{alignItems: 'center', marginVertical: 20}}>
        <Text style={{color: 'black', fontSize: 18, fontWeight: '500'}}>
          modal
        </Text>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: '#707070',
          height: height / 13,
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{backgroundColor: 'red'}}>
          <Text
            style={{
              fontWeight: '700',
              color: '#111EC4',
              marginHorizontal: 20,
              backgroundColor: 'red',
            }}>
            modal
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
          // onPress = {onclick};
        }}>
        <View style={Styles.centeredView}>
          <View style={Styles.modalView}>
            <View style={{}}>
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
                    width: width / 4,
                    borderRadius: 5,
                  }}></View>
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={{
                  color: Colors.black,
                  fontWeight: 'bold',
                  marginHorizontal: 20,
                  fontSize: 17,
                  top: 10,
                }}>
                Chooge a service plan
              </Text>
            </View>
            <View
              style={{
                marginHorizontal: 15,
                marginVertical: 30,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  backgroundColor: Colors.silver,
                  height: 70,
                  width: 70,
                  borderRadius: 50,
                }}></View>
              <View style={{marginRight: '20%'}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  Silver services
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../Assets/Images/Ellipse1.png')}
                    style={{marginVertical: 10}}
                  />
                  <Text style={{marginHorizontal: 5, top: 3}}>
                    Less experienced
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../Assets/Images/Ellipse1.png')}
                    style={{top: 4}}
                  />
                  <Text style={{marginHorizontal: 5, top: -3}}>
                    Less Equiped
                  </Text>
                </View>
                <Text
                  style={{
                    marginHorizontal: 5,
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  Premium Prices
                </Text>
              </View>
              <View style={{top: 20}}>
                <RadioButton
                  name="1"
                  value="1"
                  status={gender === '1' ? 'checked' : 'unchecked'}
                  onPress={() => setGender('1')}
                />
              </View>
            </View>
            <View
              style={{
                marginHorizontal: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  backgroundColor: Colors.lightgold,
                  height: 70,
                  width: 70,
                  borderRadius: 50,
                }}></View>
              <View style={{marginRight: '20%'}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  Gold services
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../Assets/Images/Ellipse1.png')}
                    style={{marginVertical: 10}}
                  />
                  <Text style={{marginHorizontal: 5, top: 3}}>
                    Less experienced
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../Assets/Images/Ellipse1.png')}
                    style={{top: 4}}
                  />
                  <Text style={{marginHorizontal: 5, top: -3}}>
                    Less Equiped
                  </Text>
                </View>
                <Text
                  style={{
                    marginHorizontal: 5,
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  Premium Prices
                </Text>
              </View>
              <View style={{top: 20}}>
                <RadioButton
                  name="2"
                  value="2"
                  status={gender === '2' ? 'checked' : 'unchecked'}
                  onPress={() => setGender('2')}
                />
              </View>
            </View>
            <View
              style={{
                marginHorizontal: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 30,
              }}>
              <View
                style={{
                  backgroundColor: Colors.lightblue,
                  height: 70,
                  width: 70,
                  borderRadius: 50,
                }}></View>
              <View style={{marginRight: '10%'}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  Platinum Services
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../Assets/Images/Ellipse1.png')}
                    style={{marginVertical: 10}}
                  />
                  <Text style={{marginHorizontal: 5, top: 3}}>
                    More than 4-5 years of{'\n'} experience
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../Assets/Images/Ellipse1.png')}
                    style={{top: 5}}
                  />
                  <Text style={{marginHorizontal: 5}}>
                    All types of machines &{'\n'}equipments
                  </Text>
                </View>
                <Text
                  style={{
                    marginHorizontal: 5,
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  Premium Prices
                </Text>
              </View>
              <View style={{top: 20}}>
                <RadioButton
                  name="3"
                  value="3"
                  status={gender === '3' ? 'checked' : 'unchecked'}
                  onPress={() => setGender('3')}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Bottomsheetmodal;

const Styles = StyleSheet.create({
  centeredView: {
    // flex: 1,
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
    height: height / 1.5,
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
