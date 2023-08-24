import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';

const Faqs = props => {
  return (
    <SafeAreaView>
      <Header
        bgColor={Colors.topNavbarColor}
        color={Colors.white}
        title="FAQs"
        onPress={() => props.navigation.goBack()}
      />
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

// import React, {useState} from 'react';
// import {View, Text, TouchableOpacity} from 'react-native';
// import Colors from '../Assets/Constants/Colors';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';

// import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import moment from 'moment';

// const Faqs = () => {
//   const [_Isdate, set_Isdate] = useState('');
//   const [getDate, setGetDate] = useState('');
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

//   const [timeSlots, setTimeSlots] = useState([
//     {startTime: '09:00 AM', endTime: '10:00 AM', id: 1},
//     {startTime: '10:00 AM', endTime: '11:00 AM', id: 2},
//     {startTime: '11:00 AM', endTime: '12:00 PM', id: 3},
//     {startTime: '13:00 PM', endTime: '14:00 PM', id: 4},
//     {startTime: '14:00 PM', endTime: '15:00 PM', id: 5},
//     {startTime: '15:00 PM', endTime: '16:00 PM', id: 6},
//     {startTime: '16:00 PM', endTime: '17:00 PM', id: 7},
//     {startTime: '17:00 PM', endTime: '18:00 PM', id: 8},
//     {startTime: '18:00 PM', endTime: '19:00 PM', id: 9},
//     {startTime: '19:00 PM', endTime: '20:00 PM', id: 10},
//     {startTime: '20:00 PM', endTime: '21:00 PM', id: 11},
//     {startTime: '21:00 PM', endTime: '22:00 PM', id: 11},
//   ]);

//   var currentDate = moment().format('DD/MM/YYYY');
//   const getCurrentTime = () => {
//     const date = new Date();

//     const hours = date.getHours().toString().padStart(2, '0');
//     const minutes = date.getMinutes().toString().padStart(2, '0');
//     return `${hours}:${minutes}`;
//   };

//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//     AsyncStorage.getItem('Date').then(value => setGetDate(value));
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };

//   const handleConfirm = date => {
//     const formattedDate = `${('0' + date.getDate()).slice(-2)}/${(
//       '0' +
//       (date.getMonth() + 1)
//     ).slice(-2)}/${date.getFullYear()}`;

//     set_Isdate(formattedDate);

//     hideDatePicker();
//   };

//   return (
//     <View style={{flex: 1}}>
//       <View
//         style={{
//           height: 45,
//           borderWidth: 1,
//           marginHorizontal: 20,
//           margin: 10,
//           borderRadius: 6,
//           justifyContent: 'center',
//           paddingHorizontal: 13,
//           borderColor: 'grey',
//         }}>
//         <TouchableOpacity
//           onPress={showDatePicker}
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//           }}>
//           <Text style={{color: Colors.black}}>{_Isdate}</Text>
//           <View>
//             <DateTimePickerModal
//               isVisible={isDatePickerVisible}
//               mode="date"
//               onConfirm={handleConfirm}
//               onCancel={hideDatePicker}
//               minimumDate={new Date()}
//             />
//             <TouchableOpacity onPress={showDatePicker}>
//               <FontAwesome5Icon
//                 name="calendar-alt"
//                 color="#a9a9a9"
//                 size={20}
//                 style={{marginRight: '1%'}}
//               />
//             </TouchableOpacity>
//           </View>
//         </TouchableOpacity>
//       </View>

//       <View
//         style={{
//           justifyContent: 'space-between',
//           flexWrap: 'wrap',
//           flexDirection: 'row',
//           marginHorizontal: 20,
//         }}>
//         {timeSlots.map((timeSlot, index) => {
//           const currentTime = getCurrentTime();

//           if (timeSlot.startTime < currentTime && currentDate == _Isdate) {
//             return (
//               <TouchableOpacity
//                 style={{
//                   paddingVertical: 10,
//                   marginTop: 20,
//                   width: 150,
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   backgroundColor: Colors.white,
//                 }}
//                 onPress={() =>
//                   console.log(`${timeSlot.startTime} - ${timeSlot.endTime}`)
//                 }
//                 disabled={currentTime ? true : false}>
//                 <Text
//                   style={{
//                     color: currentTime ? Colors.lightGray : Colors.darkGreen,
//                   }}>{`${timeSlot.startTime} - ${timeSlot.endTime}`}</Text>
//               </TouchableOpacity>
//             );
//           }

//           return (
//             <View key={index}>
//               <TouchableOpacity
//                 style={{
//                   paddingVertical: 10,
//                   marginTop: 20,
//                   width: 150,
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   backgroundColor: Colors.white,
//                   borderRadius: 7,
//                 }}
//                 onPress={() =>
//                   console.log(`${timeSlot.startTime} - ${timeSlot.endTime}`)
//                 }>
//                 <Text
//                   style={{
//                     color: currentTime ? Colors.black : Colors.darkGreen,
//                   }}>{`${timeSlot.startTime} - ${timeSlot.endTime}`}</Text>
//               </TouchableOpacity>
//             </View>
//           );
//         })}
//       </View>
//     </View>
//   );
// };

// export default Faqs;
