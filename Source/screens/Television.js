import {View, Text, Dimensions, Image} from 'react-native';
import React from 'react';
import Colors from '../Assets/Constants/Colors';
import Header from '../ReusableComponents/Header';
import ServicesComp from './Home/Component/ServicesComp';

import {useNavigation} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');

const Television = props => {
  const navigation = useNavigation();

  return (
    <View>
      <Header
        bgColor={Colors.darkOrange}
        color={Colors.black}
        title="Television"
        onPress={() => navigation.goBack()}
      />
      <View
        style={{
          //   borderWidth: 1,
          //   borderColor: 'red',
          backgroundColor: 'white',
          //   height:
          margin: 10,
          borderRadius: 15,
        }}>
        <Text
          style={{textAlign: 'center', marginVertical: 10, fontWeight: 'bold'}}>
          Please Select
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          <ServicesComp
            title="Installation"
            image={require('../Assets/Images/untitleddesign3.png')}
            onPress={() => navigation.navigate('InstallationScreen')}
          />
          <ServicesComp
            title="Uninstallation"
            image={require('../Assets/Images/sbtvinstall.png')}
            onPress={() => navigation.navigate('UninstallationScreen')}
          />
          <ServicesComp
            title="Display/Screen"
            image={require('../Assets/Images/hqdefault.png')}
            onPress={() => navigation.navigate('DisplayScreen')}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginHorizontal: 20,
          }}>
          <ServicesComp
            title="Speaker/Sound"
            image={require('../Assets/Images/silent.png')}
            onPress={() => navigation.navigate('SpeakerSoundScreen')}
          />
          {/* <ServicesComp
            title="Other Problem"
            image={require('../Assets/Images/ask-question.png')}
            onPress={() => props.navigation.navigate('SalonWomen')}
          /> */}
        </View>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: 'grey',
          //   height: 100,
          backgroundColor: 'white',
        }}>
        <View style={{marginHorizontal: 20, marginVertical: 10}}>
          <Text style={{fontWeight: 'bold'}}>Please Note:-</Text>
          <Text style={{fontSize: 15}}>
            We don't repair CRT, Plasma TV, Pc, monitors and DTH
          </Text>
          <Text style={{fontSize: 15}}>
            Pricing will be based on inspection
          </Text>
          <Text style={{fontSize: 15}}>Visiting charges of Rs150</Text>
        </View>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: 'grey',
          height: 100,
          marginVertical: 20,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            marginHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 25,
          }}>
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 17}}>
              Service Warrenty
            </Text>
            <Text style={{color: 'grey', fontSize: 16, marginVertical: 10}}>
              Free, No Question Asked Revisit
            </Text>
          </View>
          <Image source={require('../Assets/Images/gamer.png')} />
        </View>
      </View>
    </View>
  );
};

export default Television;
