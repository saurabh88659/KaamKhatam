import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import Colors from '../../Assets/Constants/Colors';

export default function TranscationsScreen() {
  return (
    <SafeAreaView>
      <View
        style={{
          borderColor: Colors.darkGray,
          height: 100,
          backgroundColor: Colors.white,
          elevation: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 10,
          }}>
          <View style={{marginVertical: 10}}>
            <Text style={{fontWeight: 'bold'}}>Paid for cleaning Services</Text>
            <Text
              style={{
                fontSize: 13,
                color: Colors.darkGray,
                marginVertical: 10,
              }}>
              03/10/1992, 10:00 PM
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontWeight: 'bold'}}>Paid By:</Text>
              <Text style={{fontSize: 14, color: Colors.darkGray}}>
                {' '}
                All In One Wallet
              </Text>
            </View>
          </View>
          <View style={{marginVertical: 17}}>
            <Text
              style={{
                color: Colors.darkGreen,
                fontWeight: '900',
                fontSize: 15,
                top: -7,
              }}>
              SUCCESS
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: Colors.lightOrange,
                textAlign: 'center',
                marginVertical: 15,
                fontWeight: 'bold',
              }}>
              INR 150
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          borderColor: Colors.darkGray,
          height: 100,
          backgroundColor: Colors.white,
          elevation: 5,
          marginVertical: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 10,
          }}>
          <View style={{marginVertical: 10}}>
            <Text style={{fontWeight: 'bold'}}>Paid for cleaning Services</Text>
            <Text
              style={{
                fontSize: 13,
                color: Colors.darkGray,
                marginVertical: 10,
              }}>
              03/10/1992, 10:00 PM
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontWeight: 'bold'}}>Paid By:</Text>
              <Text style={{fontSize: 14, color: Colors.darkGray}}>
                {' '}
                All In One Wallet
              </Text>
            </View>
          </View>
          <View style={{marginVertical: 17}}>
            <Text
              style={{
                color: Colors.darkGreen,
                fontWeight: '900',
                fontSize: 15,
                top: -7,
              }}>
              SUCCESS
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: Colors.lightOrange,
                textAlign: 'center',
                marginVertical: 15,
                fontWeight: 'bold',
              }}>
              INR 150
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
