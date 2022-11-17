import React from 'react';
import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Colors from '../Constants/Colors';

const Reusablecss = StyleSheet.create({
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
    paddingBottom: 5,
    backgroundColor: Colors.lightGray,
  },

  cntrContainer: {
    height: hp('78.5%'),
    paddingBottom: hp('2.5%'),
  },
  card: {
    // width: '100%',
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: wp('0.2%'),
    marginHorizontal: 10,
  },
  cardItem: {
    width: '70%',
    padding: wp('2%'),
  },
  title: {
    fontWeight: 'bold',
    fontSize: wp('5%'),
  },
  ratingCntr: {
    flexDirection: 'row',
    marginTop: hp('0.5%'),
  },
  ratingBar: {
    fontWeight: 'bold',
    fontSize: wp('4%'),
    left: wp('0.5%'),
    top: wp('-0.5%'),
  },
  priceCntr: {
    flexDirection: 'row',
    alignItems: 'center',
    top: hp('0.2%'),
  },
  text: {
    fontSize: 15,
  },
  priceBar: {
    fontSize: hp('2%'),
    left: wp('1%'),
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
    marginTop: hp('1%'),
    alignItems: 'center',
    top: -10,
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
    width: wp('22%'),
    height: hp('4.5%'),
    marginTop: -hp('8.6%'),
    borderRadius: wp('2%'),
    // marginLeft: wp('3%'),
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
    fontWeight: '900',
    color: Colors.darkOrange,
    fontSize: hp('2%'),
  },
});

export default Reusablecss;
