import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import invertericone from '../Assets/Images/invertericone.png';
import heater from '../Assets/Images/heater.png';
import Mcbicone from '../Assets/Images/Mcbicone.png';
import ceilingfanrepair from '../Assets/Images/ceilingfanrepair.png';
import switchicone from '../Assets/Images/switchicone.png';
import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ServiceItems from '../ReusableComponents/ServiceItems';

const Electricians = props => {
  const preData = props.route.params;
  console.log('preData', preData);

  const Srt = [
    {
      title: 'Inverter & Stabilizer',
      image: invertericone,
    },
    {
      title: 'Room Heater',
      image: heater,
    },
    {
      title: 'MCB & Fuse',
      image: Mcbicone,
    },
    {
      title: 'Fan & Light',
      image: ceilingfanrepair,
    },
    {
      title: 'Switch and Socket',
      image: switchicone,
    },
  ];
  return (
    <View style={styles.container}>
      <Header
        bgColor={Colors.darkOrange}
        color={Colors.black}
        title="Electricians"
        onPress={() => props.navigation.goBack()}
      />
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
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        data={Srt}
        renderItem={({item, index}) => (
          <ServiceItems
            title={item.title}
            image={item.image}
            click={() => props.navigation.navigate('SubElections', index)}
          />
        )}
      />
    </View>
  );
};
export default Electricians;
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
