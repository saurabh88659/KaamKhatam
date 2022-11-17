import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

const {height, width} = Dimensions.get('screen');

CustomDrawerMenu = props => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#D6FCED'}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#D6FCED'}}>
        <View style={{marginVertical: 20}}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ProfileScreen')}>
            <Image
              source={require('./Source/Assets/Images/Antiagingbody.png')}
              style={Styles.iconestyle}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('ProfileScreen');
            }}>
            <View style={Styles.textlable}>
              <Text style={Styles.textstyl}>Verified Customer</Text>
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
              onPress={() => props.navigation.navigate('Support')}>
              <Image
                source={require('./Source/Assets/Images/headphonesicone.png')}
                style={Styles.iconestyles}
              />
              <Text style={Styles.textstyles1}>Support</Text>
            </TouchableOpacity>
          </View>
          <View>
            <View style={Styles.linesstyles}></View>
            <TouchableOpacity style={Styles.constyles}>
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

          <View style={{}}>{/* <DrawerItemList {...props} /> */}</View>
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
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    props.navigation.navigate('Login');
                  }}>
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
  },
});
