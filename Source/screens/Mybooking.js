import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import React from 'react';
import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';
import MybookingBox from '../ReusableComponents/MybookingBox';
import HeaderDrawer from '../ReusableComponents/HeaderDrawer';

function Mybooking({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <HeaderDrawer
        Title="My Bookings"
        location="Sector 62"
        onPress={() => navigation.toggleDrawer()}
      />
      <ScrollView contentContainerStyle={{paddingBottom: 30, marginTop: 10}}>
        <MybookingBox onClick={() => navigation.navigate('Viewdetails')} />
        <MybookingBox
          onClick={() => navigation.navigate('ViewdetailsCancelled')}
        />
        <MybookingBox
          onClick={() => navigation.navigate('ViewdetailsPending')}
        />
        <MybookingBox />
        <MybookingBox />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Mybooking;
