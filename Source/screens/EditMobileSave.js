import {View, Text, TextInput} from 'react-native';
import React from 'react';
import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';
import CustomButton from '../ReusableComponents/Button';
import FontAwesome5 from 'react-native-vector-icons/Ionicons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

EditMobileSave = props => {
  return (
    <>
      <Header
        bgColor={Colors.topNavbarColor}
        color={Colors.white}
        title="Register Account"
        onPress={() => props.navigation.goBack('')}
      />
      <View style={{margin: 20}}>
        <Text style={{fontSize: 17, fontWeight: '500'}}>
          Change Your Mobile Number
        </Text>
      </View>
      <Text style={{marginHorizontal: 20, fontWeight: 'bold', fontSize: 15}}>
        Current Mobile Number
      </Text>
      <View
        style={{
          marginHorizontal: 15,
          borderColor: 'grey',
          borderWidth: 1,
          borderRadius: 6,
          paddingHorizontal: 15,
          marginVertical: 5,
          color: 'black',
          height: 50,
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 16}}>7389783609</Text>
      </View>
      <View style={{marginHorizontal: 20, top: 30}}>
        <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
          New Mobile Number
        </Text>
        <View
          style={{
            height: 50,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: 'grey',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{marginHorizontal: 8, fontSize: 16}}>7739696730</Text>
          <View
            style={{
              marginHorizontal: 8,
            }}>
            <FontAwesome5
              name="ios-checkmark-circle"
              size={28}
              color={Colors.darkGreen}
            />
          </View>
        </View>
      </View>
      <View style={{alignItems: 'center', top: 50}}>
        <CustomButton
          title={'Save Changes'}
          bgColor={Colors.darkGreen}
          width={wp('90%')}
          height={hp('7%')}
          color={Colors.white}
          //   onPress={() => props.navigation.navigate('EditMobileSave')}
        />
      </View>
    </>
  );
};

export default EditMobileSave;
