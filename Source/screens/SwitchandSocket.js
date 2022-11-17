import React, {useState} from 'react';
import {Text, View, Image, TouchableOpacity, FlatList} from 'react-native';

import ACSwitchbox from '../Assets/Images/ACSwitchbox.png';
import bordboxicone from '../Assets/Images/bordboxicone.png';
import switchboardimg1 from '../Assets/Images/switchboardimg1.png';
import fittingsocketfaceplate from '../Assets/Images/fittingsocketfaceplate.png';

import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';
import AddCart from '../ReusableComponents/AddCart';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Reusablecss from '../Assets/Css/Reusablecss';
import GreenHeader from '../ReusableComponents/GreenHeader';

const SwitchandSocket = ({props}) => {
  const [showcart, setShowcart] = useState(false);

  const Srt = [
    {
      title: 'AC Switchbox Installation',
      rating: 4.8,
      price: `259 `,
      image: ACSwitchbox,
      d1: 'Includes replacement of 1 unit ',
      d2: 'Includes replacement of single switch or socket or a combination unit.',
    },
    {
      title: `Switch Board Installation `,
      rating: 4.7,
      price: `109`,
      image: bordboxicone,
      d1: 'Includes install of 1 Board with upto 6 switches ',
      d2: 'Includes replacement of single switch or socket or a combination unit.',
    },
    {
      title: `Switchboard Repair (1) `,
      rating: 4.6,
      price: `100`,
      image: switchboardimg1,
      d1: 'Includes install of 1 Board with upto 6 switches',
      d2: 'Includes replacement of single switch or socket or a combination unit.',
    },
    {
      title: `Switch / Socket Replacement`,
      rating: 4.5,
      price: `69`,
      image: fittingsocketfaceplate,
      d1: 'Includes replacement of single switch or socket or a combination unit.',
      d2: 'Includes replacement of single switch or socket or a combination unit.',
    },
  ];
  return (
    <View style={Reusablecss.container}>
      <Header
        bgColor={Colors.darkOrange}
        color={Colors.black}
        title=" Switch and Socket"
        onPress={() => props.navigation.goBack('Electricians')}
      />
      <GreenHeader title="Technician travel & safety charge will be added" />

      <View style={Reusablecss.cntrContainer}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          data={Srt}
          renderItem={({item}) => (
            <View style={Reusablecss.card}>
              <View style={Reusablecss.cardItem}>
                <Text style={Reusablecss.title}>{item.title}</Text>
                <View style={Reusablecss.ratingCntr}>
                  <FontAwesome5Icon
                    name="star"
                    solid
                    size={hp('2%')}
                    color={Colors.lightYellow}
                  />
                  <Text style={Reusablecss.ratingBar}>{item.rating}</Text>
                </View>
                <View style={Reusablecss.priceCntr}>
                  <Text style={Reusablecss.img}>INR</Text>
                  <Text style={Reusablecss.priceBar}>{item.price}</Text>
                  <Text style={Reusablecss.timing}>{item.time}</Text>
                </View>
                <Text style={{top: -5}}>
                  .........................................................
                </Text>
                <View style={Reusablecss.dataCntr}>
                  <Image
                    source={require('../Assets/Images/Ellipse1.png')}
                    style={{opacity: item.d1 === undefined ? 0 : 1}}
                  />
                  <Text style={Reusablecss.data}>{item.d1}</Text>
                </View>
                <View style={Reusablecss.dataCntr}>
                  <Image
                    source={require('../Assets/Images/Ellipse1.png')}
                    style={{opacity: item.d2 === undefined ? 0 : 1}}
                  />
                  <Text style={Reusablecss.data}>{item.d2}</Text>
                </View>
              </View>
              <View style={Reusablecss.imgCntr}>
                <Image
                  resizeMode="contain"
                  source={item.image}
                  style={Reusablecss.innerImage}
                />
                <TouchableOpacity
                  onPress={() => {
                    setShowcart(true);
                  }}
                  style={Reusablecss.imgButton}>
                  <Text style={Reusablecss.btnText}>ADD +</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
      {showcart === true ? <AddCart items={2} /> : null}
    </View>
  );
};

export default SwitchandSocket;
