import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';
import axios from 'axios';

const ServicesofWomenOnly = props => {
  const val = props.route.params;

  // const [categoryone, setCategoryone] = useState([]);
  console.log('subCategory========22222222222=========', val);

  return (
    <View>
      <Header
        bgColor={Colors.darkOrange}
        color={Colors.black}
        title={val.name}
        onPress={() => props.navigation.goBack()}
      />
      <View>
        {val.subCategory.map(v => (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginHorizontal: 20,
              marginVertical: 20,
            }}
            onPress={() => props.navigation.navigate('SpaforWomen', v)}>
            <Image
              source={require('../Assets/Images/images.png')}
              style={{height: 70, width: 70}}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                marginHorizontal: 15,
                marginVertical: 25,
              }}>
              {v.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ServicesofWomenOnly;
