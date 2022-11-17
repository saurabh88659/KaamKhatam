import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';
import {RadioButton} from 'react-native-paper';
import CustomButton from '../ReusableComponents/Button';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const {height, width} = Dimensions.get('screen');

export default function CancelBooking(props) {
  const [checked, setChecked] = React.useState(0);

  return (
    <View>
      <Header
        bgColor={Colors.darkOrange}
        color={Colors.white}
        title="Cancel Booking"
        onPress={() => props.navigation.goBack()}
      />
      <View
        style={{
          margin: 10,
          height: height / 1.9,
          backgroundColor: '#DFDFDF',
          borderRadius: 15,
        }}>
        <View style={{margin: 15}}>
          <Text style={{fontSize: 18}}>Reason for Cancellation</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginHorizontal: 15,
          }}>
          <RadioButton
            value="first"
            status={checked === 'first' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('first')}
          />
          <Text style={{top: 6}}>Change of Plan</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginHorizontal: 15,
          }}>
          <RadioButton
            value="second"
            status={checked === 'second' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('second')}
          />
          <Text style={{top: 6}}>Change of Plan</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginHorizontal: 15,
          }}>
          <RadioButton
            value="three"
            status={checked === 'three' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('three')}
          />
          <Text style={{top: 6}}>Change of Plan</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginHorizontal: 15,
          }}>
          <RadioButton
            value="4"
            status={checked === '4' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('4')}
          />
          <Text style={{top: 6}}>Change of Plan</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginHorizontal: 15,
          }}>
          <RadioButton
            value="5"
            status={checked === '5' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('5')}
          />
          <Text style={{top: 6}}>Change of Plan</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginHorizontal: 15,
          }}>
          <RadioButton
            value="6"
            status={checked === '6' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('6')}
          />
          <Text style={{top: 6}}>Change of Plan</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'flex-end',
            justifyContent: 'center',
          }}>
          <CustomButton
            // onPress={()=>}
            title={'Submit'}
            bgColor={Colors.lightGreen}
            width={wp('80%')}
            height={hp('7%')}
            color={Colors.white}
            onPress={() => props.navigation.navigate('DrowerNavigation')}
          />
        </View>
      </View>
    </View>
  );
}
