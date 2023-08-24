import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';

const {height, width} = Dimensions.get('window');

export default function MybookingBox({onClick}) {
  return (
    <View style={{marginVertical: 10, marginHorizontal: 10}}>
      <View
        style={{
          borderColor: 'red',
          height: height / 6,
          backgroundColor: '#BCC4FF',
          borderRadius: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 10,
          }}>
          <Text style={{fontWeight: 'bold', marginVertical: 5}}>
            Booking ID
          </Text>
          <Text style={{fontWeight: 'bold', marginVertical: 5}}>
            51547587852
          </Text>
        </View>
        <View
          style={{
            height: height / 7,
            borderWidth: 1,
            borderColor: '#D9D9D9',
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            backgroundColor: 'white',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{margin: 5, justifyContent: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: '500'}}>June</Text>
            <Text style={{fontSize: 20, fontWeight: '900', left: 10}}>28</Text>
            <Text style={{fontSize: 20, fontWeight: '500'}}>2022</Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text style={{fontSize: 15, fontWeight: '900', color: '#ff8000'}}>
              Hair Color Application
            </Text>
            <View style={{flexDirection: 'row', marginVertical: 7}}>
              <Text style={{fontSize: 15, fontWeight: '500'}}>Time slot: </Text>
              <Text style={{fontSize: 13}}>10:00- 11:00 AM</Text>
            </View>

            <View style={{flexDirection: 'row', marginVertical: -7}}>
              <Text style={{fontSize: 15, fontWeight: '500'}}>Price: </Text>
              <Text style={{fontSize: 13, marginVertical: 3}}>₹8,000</Text>
            </View>
          </View>
          <View
            style={{
              borderColor: '#D9D9D9',
              borderLeftWidth: 1,
              width: width / 3.5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{marginVertical: 25}}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '500',
                  color: '#5E2DC4',
                }}>
                COMPLETED
              </Text>
              <TouchableOpacity
                onPress={onClick}
                style={{
                  top: 20,
                  backgroundColor: '#5E2DC4',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: height / 30,
                  width: width / 5,
                  //   right: 8,
                  borderRadius: 4,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: 'white',
                  }}>
                  View Details
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
