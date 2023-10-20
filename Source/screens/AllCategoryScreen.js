import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React from 'react';
import {_getStorage} from '../Assets/utils/storage/Storage';
import {useState} from 'react';
import {BASE_URL} from '../Assets/utils/Restapi/Config';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import axios from 'axios';
import ServicesComp from './Home/Component/ServicesComp';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../Assets/Constants/Colors';
import Header from '../ReusableComponents/Header';

const AllCategoryScreen = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [noData, setNodata] = useState('');

  // getting all catrgary===================================================
  const getAllCategory = async () => {
    const token = await _getStorage('token');
    axios
      .get(BASE_URL + `/category/allCategory`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(async resp => {
        setCategory(resp.data.category);
        setIsLoading(false);
        console.log(
          '(resp.data.category (all categpry)-------------',
          resp.data.category,
        );
      })
      .catch(e => {
        console.log('home screen catch error', e.response?.data);
        setIsLoading(false);
      });
  };

  // getting allCategoryWiseService ============================================
  const getCategoryWiseService = async (id, name) => {
    const token = await _getStorage('token');
    axios
      .get(BASE_URL + `/category/categoryService/${id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(resp => {
        if (resp.data.result.subCategory?.length !== 0) {
          navigation.navigate('Subcategory', {id, name});
        } else if (resp.data.result.service?.length !== 0) {
          let navData = {
            _id: id,
            from: 'cat',
            name: name,
          };
          // console.log('home navData', navData);
          navigation.navigate('Services', {navData});
        } else {
        }
        console.log('subCategory-------->>>', resp.data.result.subCategory);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('in catch error data home', error.response);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    // TO RESET SEARCH ITEM=====
    // setSearchText('');s
    if (isFocused) {
      getAllCategory();
    }
  }, [isFocused]);

  const filteredData = category.filter(item => {
    return item.name.toLowerCase().includes(searchText.toLowerCase());
  });

  // if (filteredData.length === 0) {
  //   console.log('No data found');
  // } else {
  //   console.log()
  // }

  return (
    <View style={{flex: 1}}>
      <Header
        bgColor={Colors.topNavbarColor}
        color={Colors.white}
        title={'All Categories'}
        onPress={() => props.navigation.goBack()}
      />
      <View style={{backgroundColor: '#fff'}}>
        <View
          // onPress={() => navigation.navigate('SearchService')}
          style={{
            height: 44,
            backgroundColor: '#ECECEC',
            // backgroundColor: '#fff',
            // backgroundColor: 'red',
            paddingHorizontal: 10,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
            marginHorizontal: 10,
            borderRadius: 5,
          }}>
          <Ionicons name="search" size={20} color="grey" />
          <TextInput
            style={{flex: 1, paddingHorizontal: 12, color: Colors.black}}
            placeholderTextColor="grey"
            placeholder="Search by Category, name...."
            value={searchText}
            onChangeText={text => setSearchText(text)}
            //   editable={false}
          />
        </View>
      </View>

      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#fff',
          }}>
          <ActivityIndicator color={Colors.deepSafron} size={39} />
        </View>
      ) : (
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
            {filteredData.map((val, index) => (
              <View key={index} style={{alignItems: 'center'}}>
                <ServicesComp
                  title={val.name}
                  image={{uri: val.imageUrl}}
                  newStyle
                  onPress={() => getCategoryWiseService(val._id, val.name)}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default AllCategoryScreen;

// const styles = StyleSheet.create({});
