import React, {useState} from 'react';
import {Text, View, Image, TouchableOpacity, FlatList} from 'react-native';

import toploadervsfrontloader from '../Assets/Images/toploadervsfrontloader.png';
import washingicone from '../Assets/Images/washingicone.png';
import washinicone2 from '../Assets/Images/washinicone2.png';
import washingicone3 from '../Assets/Images/washingicone3.png';

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

const WashingMachine = ({props}) => {
  const [showcart, setShowcart] = useState(false);

  const Srt = [
    {
      title: 'Full Automatic (Top/Front Load)',
      rating: 4.4,
      price: `69 `,
      image: toploadervsfrontloader,
      d1: 'Price include visit & Diagnosis',
      d2: 'Spare part rates as per rate card',
    },
    {
      title: `Semi Automatic Checkup`,
      rating: 4.7,
      price: `399`,
      image: washingicone,
      d1: 'Price include visit & Diagnosis',
      d2: 'Spare part rates as per rate card',
    },
    {
      title: `Front/Top Load Installation`,
      rating: 4.8,
      price: `169`,
      image: washinicone2,
      d1: 'Screen is flickering or moving slowly',
      d2: 'Average charges (upto 48 inches) Rs 1000-3000)',
    },
    {
      title: `Semi-Automatic Installation`,
      rating: 4.6,
      price: `169`,
      image: washingicone3,
      d1: 'See vertical/horizontal on TV',
      d2: 'Average charges (upto 48 inches) Rs 500-3000',
    },
  ];
  return (
    <View style={Reusablecss.container}>
      <Header
        bgColor={Colors.darkOrange}
        color={Colors.black}
        title="Washing Machine"
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

export default WashingMachine;
