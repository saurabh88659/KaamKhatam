import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

import Salonformen1 from '../Assets/Images/Salonformen1.png';
import Salonformen2 from '../Assets/Images/Salonformen2.png';
import Salonformen3 from '../Assets/Images/Salonformen3.png';
import Salonformen6 from '../Assets/Images/Salonformen6.png';
import Salonformen4 from '../Assets/Images/Salonformen4.png';
import Salonformen5 from '../Assets/Images/Salonformen5.png';

import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ServiceItems from '../ReusableComponents/ServiceItems';

// import { propsFlattener } from 'native-base/lib/typescript/hooks/useThemeProps/propsFlattener';

const SalonforMen = props => {
  const preData = props.route.params;
  console.log('preData', preData);

  const Srt = [
    {
      title: ' Hair cut ',
      image: Salonformen1,
    },
    {
      title: 'Hair color ',
      image: Salonformen2,
    },
    {
      title: 'Shave Beard & Moustache',
      image: Salonformen3,
    },
    {
      title: 'Kids Haircut',
      image: Salonformen6,
    },
    {
      title: 'Face Care',
      image: Salonformen4,
    },
    {
      title: 'Massage Therapy',
      image: Salonformen5,
    },
  ];
  return (
    <View style={styles.container}>
      <Header
        bgColor={Colors.darkOrange}
        color={Colors.black}
        title="Salon for Men"
        onPress={() => props.navigation.goBack('')}
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
            click={() => props.navigation.navigate('SubSalonSpaforMen', index)}
          />
        )}
      />
    </View>
  );
};
export default SalonforMen;
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
