import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Header from '../../ReusableComponents/Header';
import Colors from '../../Assets/Constants/Colors';
import {_getStorage} from '../../Assets/utils/storage/Storage';
import {BASE_URL} from '../../Assets/utils/Restapi/Config';

const Subcategory = props => {
  const [subCategory, setSubcategory] = useState([]);
  // const [subActive, setSubActive] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const predata = props.route.params;

  console.log('Subcategory==========predata===========', predata);
  // console.log('==========subActive===========', subActive);

  useEffect(() => {
    subCategoryscreen();
  }, []);

  const subCategoryscreen = async () => {
    const token = await _getStorage('token');
    console.log('token SUB ', token);

    axios
      .get(BASE_URL + `/category/categoryService/${predata.id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(resp => {
        setSubcategory(resp.data.result.subCategory);
        console.log('subCategory-------->>>', resp.data.result.subCategory);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('SUB CATEGORY catch error data', error.response.data);
        setIsLoading(false);
      });
  };

  const getSubCategoryWIseService = async (id, name) => {
    const token = await _getStorage('token');
    // setIsLoading(true);
    console.log('name---------------------------', name);

    axios
      .get(BASE_URL + `/category/subcategoryService/${id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(resp => {
        if (resp.data.result.subCategory2?.length !== 0) {
          props.navigation.navigate('Subcategory2', {id, name});
        } else if (resp.data.result.service?.length !== 0) {
          let navData = {
            id: id,
            from: 'sub_cat',
            name: name,
          };
          console.log('navData----------------', navData);
          props.navigation.navigate('Services', {navData});
        } else {
        }
        // console.log('subCategory-------->>>', resp.data.result.subCategory);
        // setIsLoading(false);
      })
      .catch(error => {
        console.log('SUB CATEGORY  in catch error data', error);
        // setIsLoading(false);
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

      {isLoading ? (
        <View
          style={{
            minHeight: '90%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color={Colors.purple} size="large" />
        </View>
      ) : (
        <View>
          {subCategory.map((v, index) => (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: 'row',
                marginHorizontal: 20,
                marginVertical: 5,
                alignItems: 'center',
              }}
              onPress={() => {
                // props.navigation.navigate('Subcategory2', v);
                // // setSubActive(v._id);
                getSubCategoryWIseService(v._id, v.name);
              }}>
              <Image
                source={{uri: v.imageUrl}}
                style={{height: 65, width: 65, borderRadius: 100}}
              />
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
      )}
    </View>
  );
};

export default Subcategory;
