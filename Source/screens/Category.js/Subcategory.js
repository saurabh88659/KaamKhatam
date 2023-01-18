import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Header from '../../ReusableComponents/Header';
import Colors from '../../Assets/Constants/Colors';
import {_getStorage} from '../../Assets/utils/storage/Storage';
import {BASE_URL} from '../../Assets/utils/Restapi/Config';

const Subcategory = props => {
  const [subCategory, setSubcategory] = useState([]);
  const [subActive, setSubActive] = useState('');

  const predata = props.route.params;

  console.log('==========predata===========', predata._id);

  console.log('==========subActive===========', subActive);

  useEffect(() => {
    subCategoryscreen();
    // subCategorytwo();
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
        // console.log('subCategory-------->>>', resp.data.result.subCategory);
        // setIsLoading(false);
      })
      .catch(error => {
        console.log('SUB CATEGORY catch error data 22', error.response.data);
        // setIsLoading(false);
      });
  };

  const subCategorytwo = async () => {
    const token = await _getStorage('token');
    // setIsLoading(true);

    axios
      .get(BASE_URL + `/category/subcategoryService/${subActive}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(resp => {
        if (resp.data.result.subCategory2?.length !== 0) {
          props.navigation.navigate('Subcategory2', {subActive});
        } else if (resp.data.result.service?.length !== 0) {
          let navData = {
            _id: subActive,
            from: 'sub_cat',
          };
          props.navigation.navigate('Services', {navData});
        } else {
        }
        // console.log('subCategory-------->>>', resp.data.result.subCategory);
        // setIsLoading(false);
      })
      .catch(error => {
        console.log(
          'SUB CATEGORY 22 2224434434 in catch error data',
          error.response.data,
        );
        // setIsLoading(false);
      });
  };

  //   console.log('subActive', subActive);

  return (
    <View>
      <Header
        bgColor={Colors.darkOrange}
        color={Colors.black}
        title={predata.name}
        onPress={() => props.navigation.goBack()}
      />
      <View>
        {subCategory.map((v, index) => (
          // console.log('v--------------->>>', v),
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              marginHorizontal: 20,
              marginVertical: 20,
            }}
            onPress={() => {
              props.navigation.navigate('Subcategory2', v);
              setSubActive(v._id);
            }}>
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

export default Subcategory;
