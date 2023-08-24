import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const {height, width} = Dimensions.get('screen');
const SGPservices = ({props}) => {
  return (
    <SafeAreaView>
      <Header
        bgColor={Colors.topNavbarColor}
        color={Colors.black}
        title="Choose Your Service Plan"
        onPress={() => props.navigation.goBack('')}
      />
      <View style={Styles.contanenrbox}>
        <TouchableOpacity
          style={Styles.contanenrbox2}
          onPress={() =>
            props.navigation.navigate('InstallationUninstallation')
          }>
          <Text style={Styles.textlable}>Silver Services</Text>
          <View style={Styles.whitebox}>
            <View style={Styles.dotsstylestext}>
              <Image
                source={require('../Assets/Images/Ellipse1.png')}
                style={{marginVertical: 5}}
              />
              <Text style={{left: 5, fontWeight: '500', fontSize: 13}}>
                Less experienced
              </Text>
            </View>
            <View style={Styles.textrowstyles}>
              <Image
                source={require('../Assets/Images/Ellipse1.png')}
                style={{marginVertical: 5}}
              />
              <Text style={{left: 5, fontWeight: '500', fontSize: 13}}>
                Less Equiped
              </Text>
            </View>
            <View style={Styles.textstyles3}>
              <Text style={Styles.textstyle4}>Economical Prices</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[Styles.contanenrbox2, {backgroundColor: Colors.lightgold}]}>
          <Text style={Styles.textlable}>Gold Services</Text>
          <View style={[Styles.whitebox, {borderColor: Colors.lightgold}]}>
            <View style={Styles.dotsstylestext}>
              <Image
                source={require('../Assets/Images/Ellipse1.png')}
                style={{marginVertical: 5}}
              />
              <Text style={{left: 5, fontWeight: '500', fontSize: 13}}>
                More experienced
              </Text>
            </View>
            <View style={Styles.textrowstyles}>
              <Image
                source={require('../Assets/Images/Ellipse1.png')}
                style={{marginVertical: 5}}
              />
              <Text style={{left: 5, fontWeight: '500', fontSize: 13}}>
                More Equiped
              </Text>
            </View>
            <View style={Styles.textstyles3}>
              <Text style={Styles.textstyle4}>Standard Prices</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          style={[Styles.contanenrbox2, {backgroundColor: Colors.lightblue}]}>
          <Text style={Styles.textlable}>Platinum Services</Text>
          <View style={[Styles.whitebox, {borderColor: Colors.lightblue}]}>
            <View style={Styles.dotsstylestext}>
              <Image
                source={require('../Assets/Images/Ellipse1.png')}
                style={{marginVertical: 5}}
              />
              <Text style={{left: 5, fontWeight: '500', fontSize: 13}}>
                More than 4-5 years of experience
              </Text>
            </View>
            <View style={Styles.textrowstyles}>
              <Image
                source={require('../Assets/Images/Ellipse1.png')}
                style={{marginVertical: 5}}
              />
              <Text style={{left: 5, fontWeight: '500', fontSize: 13}}>
                All types of machines & equipments
              </Text>
            </View>
            <View style={Styles.textstyles3}>
              <Text style={Styles.textstyle4}>Premium Prices</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SGPservices;

const Styles = StyleSheet.create({
  contanenrbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    // top: 15,
    marginVertical: 25,
    flexWrap: 'wrap',
  },
  contanenrbox2: {
    borderColor: '#A9A9A9',
    height: height / 4.5,
    // height: '65%',
    width: width / 2.3,
    backgroundColor: Colors.silver,
    borderRadius: 5,
    elevation: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textlable: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    top: 5,
  },
  whitebox: {
    // width: width / 2.4,
    borderWidth: 1,
    borderColor: Colors.silver,
    width: '100%',
    height: '80%',
    backgroundColor: Colors.white,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    top: 10,
  },
  dotsstylestext: {
    flexDirection: 'row',
    marginVertical: wp('2%'),
    marginHorizontal: 5,
  },
  textrowstyles: {
    flexDirection: 'row',
    // flexWrap: 'wrap',
    marginHorizontal: 5,
  },
  textstyles3: {
    justifyContent: 'flex-end',
    marginHorizontal: 10,
    top: '10%',
  },
  textstyle4: {
    fontWeight: '900',
    fontSize: 14,
    alignSelf: 'center',
  },
});
