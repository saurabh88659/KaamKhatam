// import React, {useEffect, useState} from 'react';
// import {
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
// } from 'react-native';
// import hairColor from '../Assets/Images/Haircolorstyle.png';
// import LorealColor from '../Assets/Images/Lorealcolor.png';
// import Header from '../ReusableComponents/Header';
// import Colors from '../Assets/Constants/Colors';
// import AddCart from '../ReusableComponents/AddCart';
// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP as wp,
// } from 'react-native-responsive-screen';
// import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
// import GreenHeader from '../ReusableComponents/GreenHeader';

// import Reusablecss from '../Assets/Css/Reusablecss';

// const StressReliefTherapies = props => {
//   // console.log('hi', Srt);
//   // const [services, setServices] = useState('');

//   const preData = props.route.params;

//   console.log('hollo=====222222222222222222222333333232323====', preData);

//   const Srt = [
//     {
//       title: 'Stress Relief Swedish Massage',
//       rating: 4.8,
//       price: `1199 `,
//       time: '70 min',
//       image: hairColor,
//       d1: 'Medium pressure Full Body Therapy',
//       d2: 'Stress, Tensed muscles, Joint pains',
//     },
//     {
//       title: `De-stress Therapy`,
//       rating: 4.6,
//       price: `1599`,
//       time: '20 min',
//       image: LorealColor,
//       d1: 'Medium Pressure Full Body Therapy of 60 Mins ',
//       d2: '20 mins of Head &Shoulder pain therapy',
//     },
//     {
//       title: `De-stress Therapy`,
//       rating: 4.6,
//       price: `1599`,
//       time: '20 min',
//       image: LorealColor,
//       d1: 'Medium Pressure Full Body Therapy of 60 Mins ',
//       d2: '20 mins of Head &Shoulder pain therapy',
//     },
//   ];
//   return (
//     <View style={Reusablecss.container}>
//       <Header
//         bgColor={Colors.darkOrange}
//         color={Colors.black}
//         title="Services for Women Only"
//         onPress={() => props.navigation.goBack('')}
//       />
//       <GreenHeader title="Sanitised tool, single-use products & sachets " />
//       <View style={Reusablecss.cntrContainer}>
//         <FlatList
//           keyExtractor={(item, index) => index.toString()}
//           showsVerticalScrollIndicator={false}
//           data={Srt}
//           renderItem={({item}) => (
//             <View style={Reusablecss.card}>
//               <View style={Reusablecss.cardItem}>
//                 <Text style={Reusablecss.title}>{item.title}</Text>
//                 <View style={Reusablecss.ratingCntr}>
//                   <FontAwesome5Icon
//                     name="star"
//                     solid
//                     size={hp('2%')}
//                     color={Colors.lightYellow}
//                   />
//                   <Text style={Reusablecss.ratingBar}>{item.rating}</Text>
//                 </View>
//                 <View style={Reusablecss.priceCntr}>
//                   <Text style={Reusablecss.img}>INR</Text>

//                   <Text style={Reusablecss.priceBar}>{item.price}</Text>
//                   <Text style={Reusablecss.timing}>{item.time}</Text>
//                 </View>
//                 <Text style={{top: -5}}>
//                   .........................................................
//                 </Text>
//                 <View style={Reusablecss.dataCntr}>
//                   <Image source={require('../Assets/Images/Ellipse1.png')} />
//                   <Text style={Reusablecss.data}>{item.d1}</Text>
//                 </View>
//                 <View style={Reusablecss.dataCntr}>
//                   <Image
//                     source={require('../Assets/Images/Ellipse1.png')}
//                     style={{opacity: item.d2 === undefined ? 0 : 1}}
//                   />
//                   <Text style={Reusablecss.data}>{item.d2}</Text>
//                 </View>
//               </View>
//               <View style={Reusablecss.imgCntr}>
//                 <Image
//                   resizeMode="contain"
//                   source={item.image}
//                   style={Reusablecss.innerImage}
//                 />
//                 <TouchableOpacity style={Reusablecss.imgButton}>
//                   <Text style={Reusablecss.btnText}>ADD +</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           )}
//         />
//       </View>
//       <AddCart items={2} />
//     </View>
//   );
// };

// export default StressReliefTherapies;
