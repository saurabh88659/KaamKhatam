import React, {useState} from 'react';
import {Text, View, Image, TouchableOpacity, FlatList} from 'react-native';

import watericone1 from '../Assets/Images/watericone1.png';
import watericone2 from '../Assets/Images/watericone2.png';

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

const WaterPurifier = ({props}) => {
  const [showcart, setShowcart] = useState(false);

  const Srt = [
    {
      title: 'RO Repair',
      rating: 4.8,
      price: `269`,
      image: watericone1,
      d1: 'Price include visit & Diagnosis',
      d2: 'Spare part rates as per rate card',
    },
    {
      title: `RO Installation`,
      rating: 4.8,
      price: `399`,
      image: watericone2,
      d1: 'Spare part rates as per rate card',
      d2: 'Spare part rates as per rate card',
    },
    {
      title: `RO Unistallation`,
      rating: 4.8,
      price: `300`,
      image: watericone2,
      d1: 'Spare part rates as per rate card',
      d2: 'Spare part rates as per rate card',
    },
    {
      title: `RO Unistallation`,
      rating: 4.6,
      price: `300`,
      image: watericone2,
      d1: 'Spare part rates as per rate card',
    },
  ];
  return (
    <View style={Reusablecss.container}>
      <Header
        bgColor={Colors.darkOrange}
        color={Colors.black}
        title="Water Purifier  "
        onPress={() => props.navigation.goBack('')}
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
                  ....................................................
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
                  onPress={() => setShowcart(true)}
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

export default WaterPurifier;
