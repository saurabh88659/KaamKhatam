// import {View, Text} from 'react-native';
// import React from 'react';
// import IntenseDeepCleaning from './IntenseDeepCleaning';
// import FullHomeCleaningScreen from './FullHomeCleaningScreen';
// import SafaFurnitureCleaning from './SafaFurnitureCleaning';
// import KitchenCleaning from './KitchenCleaning';
// import CarCleaning from './CarCleaning';

// export default function SubCleaning(props) {
//   const preData = props.route.params;

//   console.log('hello======================/////////////', preData);

//   if (preData === 0) {
//     return (
//       <>
//         <IntenseDeepCleaning props={props} />
//       </>
//     );
//   }
//   if (preData === 1) {
//     return (
//       <>
//         <FullHomeCleaningScreen props={props} />
//       </>
//     );
//   }
//   if (preData === 2) {
//     return (
//       <>
//         <SafaFurnitureCleaning props={props} />
//       </>
//     );
//   }
//   if (preData === 3) {
//     return (
//       <>
//         <KitchenCleaning props={props} />
//       </>
//     );
//   }
//   if (preData === 4) {
//     return (
//       <>
//         <CarCleaning props={props} />
//       </>
//     );
//   }

//   return <View></View>;
// }

import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import Cleaning1 from '../Assets/Images/Cleaning1.png';
import cleaning2 from '../Assets/Images/cleaning2.png';

import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';
import AddCart from '../ReusableComponents/AddCart';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import GreenHeader from '../ReusableComponents/GreenHeader';
import {useNavigation} from '@react-navigation/native';

import Reusablecss from '../Assets/Css/Reusablecss';

const SubCleaning = props => {
  const val = props.route.params;

  // const navigation = useNavigation();
  const [showcart, setShowcart] = useState(false);

  console.log('hey8998===========-------------', val);

  const Srt = [
    {
      title: 'Classic Deep Cleaning ',
      rating: 4.8,
      price: `399`,
      time: '70 min',
      image: Cleaning1,
      d1: 'Superior shine & stain removal for a spic & span bathroom  ',
      d2: 'Remove hard stains, dirt stains and black deposit in corners',
    },
    {
      title: 'Intense Deep Cleaning',
      rating: 4.8,
      price: `499 `,
      time: '70 min',
      image: cleaning2,
      d1: '10X stain removal and shine for an  immaculate bathroom',
      d2: 'Target hard stains like yellow-brown stains, dirt deposits in tile grouting',
    },
    {
      title: 'Move in Deep Cleaning',
      rating: 4.8,
      price: `549`,
      time: '70 min',
      image: cleaning2,
      d1: '10X stain removal and shine and 2 months long lasting shine',
      d2: 'Tough stains is removed.',
    },
    {
      title: 'Move in Deep Cleaning',
      rating: 4.8,
      price: `549`,
      time: '70 min',
      image: cleaning2,
      d1: '10X stain removal and shine and 2 months long lasting shine',
      d2: 'Tough stains is removed.',
    },
  ];
  return (
    <View style={Reusablecss.container}>
      <Header
        bgColor={Colors.darkOrange}
        color={Colors.black}
        title="Bathroom Cleaning"
        onPress={() => navigation.goBack('')}
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
                  <Image source={require('../Assets/Images/Ellipse1.png')} />
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

export default SubCleaning;