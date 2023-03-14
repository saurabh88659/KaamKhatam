import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';

const Faqs = props => {
  return (
    <SafeAreaView>
      <Header
        bgColor={Colors.darkOrange}
        color={Colors.white}
        title="FAQs"
        onPress={() => props.navigation.goBack('')}
      />
      {/* <ShimmerPlaceHolder visible={false} LinearGradient={LinearGradient}> */}
      <View style={{flexDirection: 'row', margin: 20}}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            right: 10,
            color: Colors.black,
          }}>
          Q.
        </Text>
        <Text style={{fontWeight: 'bold', fontSize: 15, color: Colors.black}}>
          Redux is an open-source JavaScript library {'\n'}for managing and
          centralizing application state.
        </Text>
      </View>
      {/* </ShimmerPlaceHolder> */}

      <Text
        style={{
          fontSize: 15,
          marginHorizontal: 30,
          top: -15,
          color: Colors.black,
        }}>
        Redux is an open-source JavaScript library for managing and centralizing
        application state. It is most commonly used with libraries such as React
        or Angular for building user interfaces. Similar to
      </Text>
      <View style={{flexDirection: 'row', margin: 20}}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            right: 10,
            color: Colors.black,
          }}>
          Q.
        </Text>
        <Text style={{fontWeight: 'bold', fontSize: 15, color: Colors.black}}>
          Redux is an open-source JavaScript library {'\n'}for managing and
          centralizing application state.
        </Text>
      </View>
      <Text
        style={{
          fontSize: 15,
          marginHorizontal: 30,
          top: -15,
          color: Colors.black,
        }}>
        Redux is an open-source JavaScript library for managing and centralizing
        application state. It is most commonly used with libraries such as React
        or Angular for building user interfaces. Similar to
      </Text>
      <View style={{flexDirection: 'row', margin: 20}}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            right: 10,
            color: Colors.black,
          }}>
          Q.
        </Text>
        <Text style={{fontWeight: 'bold', fontSize: 15, color: Colors.black}}>
          Redux is an open-source JavaScript library {'\n'}for managing and
          centralizing application state.
        </Text>
      </View>
      <Text
        style={{
          fontSize: 15,
          marginHorizontal: 30,
          top: -15,
          color: Colors.black,
        }}>
        Redux is an open-source JavaScript library for managing and centralizing
        application state. It is most commonly used with libraries such as React
        or Angular for building user interfaces. Similar to
      </Text>
    </SafeAreaView>
  );
};
export default Faqs;
