import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import axios from 'axios';
import ServiceItems from '../../ReusableComponents/ServiceItems';
import {_getStorage} from '../../Assets/utils/storage/Storage';
import {BASE_URL} from '../../Assets/utils/Restapi/Config';
import Colors from '../../Assets/Constants/Colors';
import Header from '../../ReusableComponents/Header';

const Subcategory2 = props => {
  const preData = props.route.params;
  const [services, setServices] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  console.log('SUB--2222', preData);

  useEffect(() => {
    subservice();
  }, []);

  const subCategorytwo = (id, name) => {
    let navData = {
      id,
      from: 'sub_cat_2',
      name: name,
    };
    props.navigation.navigate('Services', {navData});
  };

  const subservice = async () => {
    const token = await _getStorage('token');
    console.log('token', token);
    axios
      .get(BASE_URL + `/category/subcategoryService/${preData.id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(rep => {
        setServices(rep.data.result.subCategory2);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('SUB services 22', error.response.data);
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Header
        bgColor={Colors.topNavbarColor}
        color={Colors.black}
        title={preData.name}
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
        <FlatList
          ListHeaderComponent={
            <View
              style={{
                width: wp('100%'),
                height: hp('5%'),
                marginVertical: -25,
                borderBottomWidth: hp('0.4%'),
                borderColor: '#F4F4F4',
              }}
            />
          }
          // keyExtractor={(subCategory2, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          data={services}
          renderItem={({item, index}) => (
            console.log('hey', item.imageUrl),
            (
              <ServiceItems
                title={item.name}
                image={{uri: item.imageUrl}}
                // click={() => props.navigation.navigate('Services', item)}
                click={() => subCategorytwo(item._id, item.name)}
              />
            )
          )}
        />
      )}
    </View>
  );
};
export default Subcategory2;
const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
  },
  greyHeader: {
    width: wp('100%'),
    height: hp('12%'),
    marginTop: hp('1.5%'),
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: wp('5%'),
    backgroundColor: Colors.grayShade,
  },
  greenHeader: {
    width: wp('100%'),
    height: hp('9%'),
    marginTop: hp('1.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 5,
    backgroundColor: Colors.lightGreen,
  },
  cntrContainer: {
    height: hp('77%'),
    paddingBottom: hp('8%'),
  },
  card: {
    width: wp('100%'),
    backgroundColor: '#F4F4F4',
    borderRadius: hp('2%'),
    marginTop: hp('2%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: hp('0.2%'),
    borderColor: Colors.lightGray,
  },
  cardItem: {
    width: '70%',
    padding: wp('3%'),
  },
  title: {
    fontWeight: 'bold',
    fontSize: wp('4%'),
  },
  ratingCntr: {
    flexDirection: 'row',
    marginTop: hp('1%'),
  },
  ratingBar: {
    fontWeight: 'bold',
    fontSize: wp('4%'),
  },
  priceCntr: {
    flexDirection: 'row',
    marginTop: hp('2%'),
    alignItems: 'center',
  },
  img: {
    width: hp('2%'),
    height: hp('2%'),
  },
  priceBar: {
    fontWeight: 'bold',
    fontSize: hp('2.5%'),
  },
  timing: {
    marginLeft: wp('5%'),
    fontSize: hp('2%'),
  },
  dataCntr: {
    flexDirection: 'row',
    marginTop: hp('2%'),
    alignItems: 'center',
  },
  data: {
    fontSize: hp('2%'),
    color: Colors.darkGray,
    marginLeft: wp('2%'),
  },
  imgCntr: {
    width: wp('25%'),
    height: hp('25%'),
    padding: wp('1%'),
    marginRight: wp('2%'),
    marginTop: -hp('3%'),
    alignItems: 'center',
  },
  innerImage: {
    width: wp('25%'),
    height: hp('25%'),
  },
  imgButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    width: wp('20%'),
    height: hp('6%'),
    marginTop: -hp('8%'),
    borderRadius: wp('5%'),
    marginLeft: wp('3%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnText: {
    fontWeight: 'bold',
    color: Colors.darkOrange,
    fontSize: hp('2%'),
  },
});
