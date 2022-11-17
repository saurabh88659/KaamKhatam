import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';

const ServicesofMenOnly = props => {
  return (
    <View>
      <Header
        bgColor={Colors.darkOrange}
        color={Colors.black}
        title="Services of Men Only"
        onPress={() => props.navigation.goBack('')}
      />
      <View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            marginVertical: 20,
          }}
          onPress={() => props.navigation.navigate('TherapiesWomen')}>
          <Image
            source={require('../Assets/Images/stressreliefmassageman.png')}
            style={{height: 70, width: 70, borderRadius: 50}}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginHorizontal: 15,
              marginVertical: 25,
            }}>
            Spa for Men
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
          }}
          onPress={() => props.navigation.navigate('SalonforMen')}>
          <Image
            source={require('../Assets/Images/image444.png')}
            style={{height: 70, width: 70}}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginHorizontal: 15,
              marginVertical: 25,
            }}>
            Salon for Men
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ServicesofMenOnly;
