import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import Colors from '../../Assets/Constants/Colors';
const {height, width} = Dimensions.get('window');

export default function Mywalletscreen() {
  return (
    <SafeAreaView>
      <View
        style={{
          borderColor: Colors.darkGray,
          height: 70,
          backgroundColor: Colors.white,
          elevation: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginVertical: 10,
          }}>
          <View style={{flexDirection: 'row', marginVertical: 10}}>
            <Image
              source={require('../../Assets/Images/wallet.png')}
              style={{height: 25, width: 25, marginVertical: 10}}
            />
            <Text
              style={{
                left: 10,
                fontWeight: 'bold',
                marginVertical: 10,
                fontSize: 17,
              }}>
              My Wallet
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginHorizontal: 10}}>
            <Text style={{left: 10, fontSize: 18}}>INR 150</Text>
            {/* <Image source={require('../../Assets/Images/wallet.png')} style={{ height: 20, width: 20 }} /> */}
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          top: 60,
          backgroundColor: '#0EC01B',
          height: height / 14,
          marginHorizontal: 10,
          borderRadius: 4,
        }}>
        <Text style={{color: 'white', fontWeight: '500', fontSize: 15}}>
          Recharge your Wallet
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
