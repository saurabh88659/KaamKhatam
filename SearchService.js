import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState, useTransition} from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from './Source/Assets/Constants/Colors';
import {useEffect} from 'react';
import axios from 'axios';
import {BASE_URL} from './Source/Assets/utils/Restapi/Config';
import ServicesComp from './Source/screens/Home/Component/ServicesComp';
import {ScrollView} from 'react-native-gesture-handler';
import {_getStorage} from './Source/Assets/utils/storage/Storage';
import {Header} from 'react-native/Libraries/NewAppScreen';

const SearchService = () => {
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllServices();
    console.log('heeee');
  }, []);

  const getAllServices = async () => {
    try {
      const res = await axios.get(BASE_URL + `/searchSerivice`);
      console.log('res', res);
      setCategory(res.data.result);
    } catch (error) {
      console.log('Error in search ', error);
    }
  };

  const filteredData = category.filter(item => {
    return item.name.toLowerCase().includes(searchText.toLowerCase(searchText));
  });

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
        // setIsLoading(false);
      })
      .catch(error => {
        console.log('in catch error data home', error);
        // setIsLoading(false);
      });
  };

  console.log('filteredData', filteredData);
  return (
    <View style={{height: '100%', width: '100%', backgroundColor: '#fff'}}>
      {/* <Header
        bgColor={Colors.topNavbarColor}
        color={Colors.white}
        title="All services"
        onPress={() => props.navigation.goBack('Home')}
      /> */}
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          width: '95%',
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 10,
          backgroundColor: '#ECECEC',
          marginHorizontal: 10,
          borderRadius: 6,
        }}>
        <FontAwesome5Icon
          style={{marginLeft: 15}}
          name="search"
          size={20}
          color="grey"
        />
        <TextInput
          style={{
            flex: 1,
            height: 50,
            paddingHorizontal: 10,
            borderRadius: 6,
          }}
          placeholderTextColor="grey"
          placeholder="Search by Category, name...."
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          {filteredData.map(
            (val, index) => (
              console.log('val ', val.imageUrl),
              (
                <View key={index} style={{alignItems: 'center'}}>
                  <ServicesComp
                    title={val.name}
                    image={{uri: val.imageUrl}}
                    newStyle
                    onPress={() => getCategoryWiseService(val._id, val.name)}
                  />
                </View>
              )
            ),
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default SearchService;

const styles = StyleSheet.create({});
