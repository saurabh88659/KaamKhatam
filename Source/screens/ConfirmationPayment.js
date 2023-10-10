import {View, Text, StyleSheet, StatusBar, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';
import CustomButton from '../ReusableComponents/Button';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
// const payg = require('../Assets/Images/Confirmation.gif');
import Lottie from 'lottie-react-native';

const ConfirmationPayment = ({route}) => {
  const orderDetails = route?.params;
  // const paymentDateTime = orderDetails?.PaymentDateTime;
  // const dateTimeParts = paymentDateTime?.split(' '); // Split the date and time
  // const timePart = dateTimeParts[1]?.slice(0, -3); // Remove the seconds and "AM" or "PM" part

  // Combine the formatted date and time with "AM" or "PM"
  // const formattedDateTime = `${dateTimeParts[0]} ${timePart} ${dateTimeParts[2]}`;

  // Combine the formatted date and time
  // console.log(formattedDateTime, 'formattedDateTime===');

  // console.log(
  //   '----------order detials in ConfirmationPayment-------',
  //   orderDetails,
  // );
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffff'}}>
      <ScrollView contentContainerStyle={{}}>
        <View
          style={{
            width: wp('100%'),
            height: hp('7%'),
            backgroundColor: Colors.purple,
            paddingHorizontal: wp('4%'),
            // flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: hp('2.7%'),
                color: Colors.white,
                marginLeft: wp('5%'),
              }}>
              Payment Status
            </Text>
          </View>
        </View>

        <View
          style={{
            // backgroundColor: 'red',
            paddingHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <Image style={styles.tinyLogo} source={{uri: payg}} /> */}
          <Lottie
            source={require('../Assets/animation/Animation - 1696914198093.json')}
            autoPlay
            loop={false}
            style={{height: 200, width: 200}}
          />
        </View>

        <View
          style={{
            // paddingHorizontal: 20,
            alignItems: 'center',
            marginTop: 10,
            height: hp('16%'),
            // backgroundColor: 'red',
            justifyContent: 'space-between',
            borderBottomColor: Colors.lightGray,
            borderBottomWidth: 1,
            margin: 20,
          }}>
          <Text style={{color: '#00bfff', fontSize: 20, fontWeight: '900'}}>
            PAYMENT SUCCESSFUL
          </Text>
          <View
            style={{
              marginBottom: 30,
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: Colors.lightGray,
                fontSize: 16,
                fontWeight: '600',
              }}>
              Your Payment has been processed!
            </Text>
            <Text
              style={{
                color: Colors.lightGray,
                fontSize: 16,
                marginTop: 2,
                fontWeight: '600',
              }}>
              Details of transaction are included below
            </Text>
          </View>
        </View>

        <View style={{marginHorizontal: 20}}>
          <Text
            style={{
              fontSize: 17,
              color: '#4169e1',
              fontWeight: '800',
              alignSelf: 'center',
              marginBottom: 28,
            }}>
            Transaction Number :{orderDetails?.TransactionId}
          </Text>

          <View
            style={[
              styles.infoitemcontainer,
              {borderBottomColor: Colors.lightGray, borderBottomWidth: 1},
            ]}>
            <Text style={styles.infokeyText}>TOTAL AMOUNT PAID</Text>
            <Text style={styles.infovalueText}>
              ₹ {orderDetails?.OrderAmount}
            </Text>
          </View>

          <View
            style={[
              styles.infoitemcontainer,
              {borderBottomColor: Colors.lightGray, borderBottomWidth: 1},
            ]}>
            <Text style={styles.infokeyText}>PAID BY</Text>
            <Text style={styles.infovalueText}>
              {orderDetails?.PaymentMethod.toUpperCase()}
            </Text>
          </View>

          <View style={styles.infoitemcontainer}>
            <Text style={styles.infokeyText}>TRANSACTION DATE</Text>
            {/* <Text style={styles.infovalueText}>{formattedDateTime}</Text>s */}
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          // flex: 1,
          // backgroundColor: 'red',
          // height: '100%',
          marginBottom: 25,
        }}>
        <CustomButton
          onPress={() => navigation.replace('DrowerNavigation')}
          height={hp('7%')}
          width={wp('90%')}
          bgColor={Colors.purple}
          title="CONTINUE"
          color={Colors.white}
        />
      </View>
    </SafeAreaView>
  );
};

export default ConfirmationPayment;

const styles = StyleSheet.create({
  tinyLogo: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
  infokeyText: {
    fontSize: 15,
    color: Colors.darkGray,
    fontWeight: '800',
  },
  infovalueText: {
    fontSize: 15,
    color: Colors.black,
    fontWeight: '800',
  },
  infoitemcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: hp('7%'),

    alignItems: 'center',
  },
});
