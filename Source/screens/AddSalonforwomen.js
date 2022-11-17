import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import Colors from '../Assets/Constants/Colors';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomButton from '../ReusableComponents/Button';
import HeaderDrawer from '../ReusableComponents/HeaderDrawer';

const AddSalonforwomen = props => {
  const [num, setNum] = useState(0);

  const incNum = () => {
    setNum(num + 1);
  };
  const decNum = () => {
    setNum(num - 1);
  };
  const Srt = [
    {
      title: 'Hair Color Application ',
      price: `₹69 `,
    },

    {
      title: `Relaxing Head Message`,
      price: `₹399`,
    },
    {
      title: `Relaxing Head Message`,
      price: `₹499`,
    },
    {
      title: `Relaxing Head Message`,
      price: `₹499`,
    },
    {
      title: `Relaxing Head Message`,
      price: `₹499`,
    },
    {
      title: `Relaxing Head Message`,
      price: `₹499`,
    },
    {
      title: `Relaxing Head Message`,
      price: `₹499`,
    },
    {
      title: `Relaxing Head Message`,
      price: `₹499`,
    },
    {
      title: `Relaxing Head Message`,
      price: `₹499`,
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <HeaderDrawer
        Title="My Cart"
        location="Sector 62"
        onPress={() => props.navigation.toggleDrawer()}
      />

      <View style={{flex: 1}}>
        <FlatList
          contentContainerStyle={{paddingBottom: 300}}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          data={Srt}
          renderItem={({item}) => (
            <View
              style={{
                // borderWidth: 1,
                borderBottomWidth: 1,
                borderColor: '#BDBDBD',
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: 80,
                alignItems: 'center',
              }}>
              <Text style={styles.title}>{item.title}</Text>
              <View
                style={{
                  //   borderWidth: 1,
                  borderColor: 'blue',
                  //   height: 100,
                  width: 80,
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#FF8B20',
                      width: 30,
                      borderBottomLeftRadius: 10,
                      borderTopLeftRadius: 10,
                      height: 40,
                    }}
                    onPress={decNum}>
                    <Text
                      style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        color: 'white',
                        marginHorizontal: 10,
                      }}>
                      -
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: '#FF8B20',
                    }}>
                    {num}
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#FF8B20',
                      //   borderRadius: 10,
                      borderBottomRightRadius: 10,
                      borderTopRightRadius: 10,
                      width: 30,
                      // height: 40,
                    }}>
                    <Text
                      style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        color: 'white',
                        marginHorizontal: 5,
                      }}
                      onPress={incNum}>
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.priceBar}>{item.price}</Text>
            </View>
          )}
        />
        <View
          style={{
            backgroundColor: 'white',
            bottom: '14%',
            position: 'absolute',
            left: 0,
            right: 0,
            marginVertical: -16,
          }}>
          <View
            style={{
              borderTopWidth: 2,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 20,
                marginVertical: 15,
              }}>
              <Text style={{fontWeight: 'bold', color: 'grey'}}>
                Item total
              </Text>
              <Text style={{fontWeight: 'bold'}}>₹449</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 20,
              }}>
              <Text style={{fontWeight: 'bold', color: 'grey'}}>
                Safety & Partner Welfare Fees
              </Text>
              <Text style={{fontWeight: 'bold'}}>₹49</Text>
            </View>
          </View>
          <View
            style={{
              borderColor: 'grey',
              borderTopWidth: 1,
              marginVertical: 20,
              marginHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 17, marginVertical: 5}}>
              Total
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 17, marginVertical: 5}}>
              ₹547
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Editaddress')}
            style={{
              height: 45,
              backgroundColor: '#0EC01B',
              marginHorizontal: 10,
              borderRadius: 7,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 17,
                color: 'white',
                left: 7,
              }}>
              ₹547
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 17,
                color: 'white',
                right: 7,
              }}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddSalonforwomen;

const styles = StyleSheet.create({
  container: {
    // width: wp('100%'),
    height: hp('100%'),
  },
  // greyHeader: {
  //   width: wp('100%'),
  //   height: hp('12%'),
  //   marginTop: hp('1.5%'),
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  //   flexDirection: 'row',
  //   paddingBottom: 5,
  //   backgroundColor: Colors.lightGray,
  // },

  cntrContainer: {
    // height: hp('78.5%'),
    // paddingBottom: hp('40%'),
    flex: 1,
  },
  card: {
    width: '100%',
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: wp('0.2%'),
  },
  cardItem: {
    width: '70%',
    padding: wp('3%'),
  },
  title: {
    fontWeight: 'bold',
    fontSize: wp('4%'),
    marginHorizontal: 5,
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
    right: 10,
  },
  timing: {
    marginLeft: wp('5%'),
    fontSize: hp('2%'),
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
});
