import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';
import axios from 'axios';
import {_getStorage} from '../Assets/utils/storage/Storage';
import {BASE_URL} from '../Assets/utils/Restapi/Config';

const ServicesofWomenOnly = props => {
  const [subCategory, setSubcategory] = useState([]);
  const predata = props.route.params;

  useEffect(() => {
    subCategoryscreen();
  }, []);

  const subCategoryscreen = async () => {
    const token = await _getStorage('token');
    console.log('token SUB ', token);
    axios
      .get(BASE_URL + `/category/categoryService/${predata._id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(resp => {
        setSubcategory(resp.data.result.subCategory);
             })
      .catch(error => {
        console.log('in catch error data', error.response.data);
             });
  };

  return (
    <View>
      <Header
        bgColor={Colors.topNavbarColor}
        color={Colors.black}
        title={predata.name}
        onPress={() => props.navigation.goBack()}
      />
      <View>
        {subCategory.map((v, index) => (
                   <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              marginHorizontal: 20,
              marginVertical: 20,
            }}
            onPress={() => props.navigation.navigate('SpaforWomen', v)}>
            <Image source={v.imageUrl} style={{height: 70, width: 70}} />
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                marginHorizontal: 15,
                marginVertical: 25,
                color: Colors.black,
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
