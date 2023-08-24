import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ServiceItems from '../ReusableComponents/ServiceItems';

import axios from 'axios';
import Reusablecss from '../Assets/Css/Reusablecss';
import GreenHeader from '../ReusableComponents/GreenHeader';
import AddCart from '../ReusableComponents/AddCart';
import {BASE_URL} from '../Assets/utils/Restapi/Config';
import {_getStorage} from '../Assets/utils/storage/Storage';

const SpaforWomen = props => {
  const preData = props.route.params;

  const [services, setServices] = useState('');


  useEffect(() => {
    subservice();
  }, []);

  const subservice = async () => {
    const token = await _getStorage('token');
    console.log('token', token);
    axios
      .get(BASE_URL + `/category/subcategoryService/${preData._id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(rep => {
        console.log('sub services', rep.data.result);
        setServices(rep.data.result.service);
      })
      .catch(error => {
        console.log('subservices', error.response.data);
      });
  };

  console.log('dablu=======================', services);

  return (
    <View style={styles.container}>
      <Header
        bgColor={Colors.topNavbarColor}
        color={Colors.black}
        title={preData.name}
        onPress={() => props.navigation.goBack()}
      />
      {preData.subCategory2?.length !== 0 ? (
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
      
          showsVerticalScrollIndicator={false}
          data={services}
          renderItem={({item, index}) => (
            <ServiceItems
              title={item.name}
              image={item.image}
              click={() =>
                props.navigation.navigate('SubSalonSpaforwomen', item)
              }
            />
          )}
        />
      ) : (
        <View>
          <GreenHeader title="Sanitised tool, single-use products & sachets " />
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            data={services}
            renderItem={({item}) => (
              <View style={Reusablecss.card}>
                <View style={Reusablecss.cardItem}>
                  <Text style={Reusablecss.title}>{item.name}</Text>
                  <View style={Reusablecss.ratingCntr}>
                    <FontAwesome5Icon
                      name="star"
                      solid
                      size={hp('2%')}
                      color={Colors.lightpurple}
                    />
                    <Text style={Reusablecss.ratingBar}>{item.rating}</Text>
                  </View>
                  <View style={Reusablecss.priceCntr}>
                    <Text style={Reusablecss.img}>INR</Text>

                    <Text style={Reusablecss.priceBar}>{item.price}</Text>
                    <Text style={Reusablecss.timing}>{item.time}</Text>
                  </View>
                  <Text style={{top: -5}}>
                    .........................................................
                  </Text>
                  <View style={Reusablecss.dataCntr}>
                    <Image source={require('../Assets/Images/Ellipse1.png')} />
                    <Text style={Reusablecss.data}>{item.description}</Text>
                  </View>
                  <View style={Reusablecss.dataCntr}>
                    <Image
                      source={require('../Assets/Images/Ellipse1.png')}
                      style={{opacity: item.d2 === undefined ? 0 : 1}}
                    />
                    <Text style={Reusablecss.data}>{item.description}</Text>
                  </View>
                </View>
                <View style={Reusablecss.imgCntr}>
                  <Image
                    resizeMode="contain"
                    source={item.image}
                    style={Reusablecss.innerImage}
                  />
                  <TouchableOpacity style={Reusablecss.imgButton}>
                    <Text style={Reusablecss.btnText}>ADD +</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          {/* <AddCart items={2} /> */}
        </View>
      )}
    </View>
  );
};
export default SpaforWomen;
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
