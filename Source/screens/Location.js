import {NavigationContainer, useLinkProps} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  ImageBackgroundBase,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../Assets/Constants/Colors';
import CustomButton from '../ReusableComponents/Button';

const Location = props => {
  return (
    <View style={styles.container}>
      <View
        style={{
          width: wp('100%'),
          height: hp('80%'),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image source={require('../Assets/Images/map.png')} />
        <Text style={{fontWeight: 'bold', fontSize: hp('2.5%')}}>
          See Services around
        </Text>
        <CustomButton
          height={hp('7%')}
          width={wp('80%')}
          bgColor={Colors.black}
          title="Your Current Location"
          color={Colors.white}
        />
        <CustomButton
          onPress={() => props.navigation.navigate('DrowerNavigation')}
          height={hp('7%')}
          width={wp('80%')}
          bgColor={Colors.white}
          title="Enter Location Manually"
          color={Colors.black}
        />
      </View>

      <View style={{width: wp('100%'), height: hp('20%')}}>
        <Image
          source={require('../Assets/Images/city.png')}
          style={styles.bottomImg}
        />
      </View>
    </View>
  );
};
export default Location;
const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: '#fff',
  },
  bottomImg: {
    width: wp('100%'),
    height: hp('16%'),
    position: 'absolute',
    bottom: 1,
  },
});
