import {View, Text, SafeAreaView, Image, Dimensions} from 'react-native';
import React from 'react';
import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';

const {height, width} = Dimensions.get('window');

SupportNull = props => {
  return (
    <SafeAreaView>
      <Header
        bgColor={Colors.darkOrange}
        color={Colors.white}
        title="Support"
        onPress={() => props.navigation.goBack()}
      />
      <View>
        <Text
          style={{
            fontSize: 27,
            fontWeight: 'bold',
            color: Colors.lightOrange,
            marginHorizontal: 15,
            marginTop: 10,
          }}>
          Hey,
        </Text>
      </View>
      <Text style={{fontSize: 27, marginHorizontal: 15, color: Colors.black}}>
        MAY I HELP YOU !
      </Text>

      <View style={{}}>
        <Image
          source={require('../Assets/Images/WindowACcheckup.png')}
          style={{
            marginVertical: 20,
            height: height / 3.6,
            width: width / 1.1,
            marginHorizontal: 15,
            borderRadius: 10,
          }}
        />
      </View>
      <View style={{borderWidth: 1, borderTopWidth: 0}}>
        <Text style={{margin: 10, fontWeight: 'bold'}}>CALL US</Text>
      </View>
      <View style={{borderWidth: 1, borderTopWidth: 0}}>
        <Text style={{margin: 10, fontWeight: 'bold'}}>EMAIL US</Text>
      </View>
      <View style={{borderWidth: 1, borderTopWidth: 0}}>
        <Text style={{margin: 10, fontWeight: 'bold'}}>WHATSAPP</Text>
      </View>
      <View style={{borderWidth: 1, borderTopWidth: 0}}>
        <Text style={{margin: 10, fontWeight: 'bold'}}>FAQS</Text>
      </View>
    </SafeAreaView>
  );
};

export default Support;
