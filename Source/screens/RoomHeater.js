import React, {useState} from 'react';
import {Text, View, Image, TouchableOpacity, FlatList} from 'react-native';
import Inventorinstallation from '../Assets/Images/Inventorinstallation.png';
import doublebattery from '../Assets/Images/doublebattery.png';
import Stabtilizer from '../Assets/Images/Stabtilizer.png';
import batteryservices from '../Assets/Images/batteryservices.png';
import glassfuse from '../Assets/Images/glassfuse.png';
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

const RoomHeater = ({props}) => {
  const [showcart, setShowcart] = useState(false);

  const Srt = [
    {
      title: 'Single Battery Installation',
      rating: 4.8,
      price: `299 `,
      image: Inventorinstallation,
      d1: 'Additional wiring charges applicable',
      d2: 'Additional wiring charges applicable',
    },
    {
      title: `Double Battery Installation`,
      rating: 4.7,
      price: `399`,
      image: doublebattery,
      d1: 'Additional wiring charges applicable',
      d2: 'Additional wiring charges applicable',
    },
    {
      title: `Stabilizer Installation`,
      rating: 4.7,
      price: `399`,
      image: Stabtilizer,
      d1: 'Additional wiring charges applicable',
      d2: 'Additional wiring charges applicable',
    },
    {
      title: `Inverter Servicing`,
      rating: 4.7,
      price: `399`,
      image: batteryservices,
      d1: 'Additional wiring charges applicable',
      d2: 'Additional wiring charges applicable',
    },
    {
      title: `Inverter Fuse Repair `,
      rating: 4.7,
      price: `399`,
      image: glassfuse,
      d1: 'Additional wiring charges applicable',
      d2: 'Additional wiring charges applicable',
    },
  ];
  return (
    <View style={Reusablecss.container}>
      <Header
        bgColor={Colors.topNavbarColor}
        color={Colors.black}
        title="Room Heater"
        onPress={() => props.navigation.navigate('Electricians')}
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

export default RoomHeater;
