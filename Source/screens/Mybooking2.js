import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import React from 'react';
import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';
import MybookingBox from '../ReusableComponents/MybookingBox';

function Mybooking2(props) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        bgColor={Colors.darkOrange}
        color={Colors.white}
        title="My Bookings"
        onPress={() => props.navigation.goBack()}
      />
      <ScrollView contentContainerStyle={{paddingBottom: 30, marginTop: 10}}>
        <MybookingBox
          onClick={() => props.navigation.navigate('Viewdetails')}
        />
        <MybookingBox
          onClick={() => props.navigation.navigate('ViewdetailsCancelled')}
        />
        <MybookingBox
          onClick={() => props.navigation.navigate('ViewdetailsPending')}
        />
        <MybookingBox />
        <MybookingBox />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Mybooking2;
