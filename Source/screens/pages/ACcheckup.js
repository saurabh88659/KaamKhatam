import React from 'react';
import {Text, View, Image, FlatList, StyleSheet} from 'react-native';

import Header from '../../ReusableComponents/Header';
import Colors from '../../Assets/Constants/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ServiceAC from '../../ReusableComponents/ServiceAC';

export default function ACcheckup() {
  const Srt = [
    {
      title: 'Less Cooling/No Cooling ',
    },
    {
      title: 'Noise Issue',
    },
    {
      title: 'Water Leakage ',
    },
    {
      title: 'AC Not Starting ',
    },
  ];
  return (
    <View style={styles.container}>
      <Header
        bgColor={Colors.white}
        color={Colors.black}
        title="Split AC Check-up"
      />
      <Image
        source={require('../Assets/Images/ACRepairing.png')}
        style={{width: wp('100%'), height: hp('30%')}}
      />
      <View style={styles.cntrContainer}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          data={Srt}
          renderItem={({item}) => <ServiceAC title={item.title} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
  },
});
