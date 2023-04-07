// import {View, Text, SafeAreaView} from 'react-native';
// import React from 'react';
// import Header from '../ReusableComponents/Header';
// import Colors from '../Assets/Constants/Colors';

// const Faqs = props => {
//   return (
//     <SafeAreaView>
//       <Header
//         bgColor={Colors.darkOrange}
//         color={Colors.white}
//         title="FAQs"
//         onPress={() => props.navigation.goBack('')}
//       />
//       {/* <ShimmerPlaceHolder visible={false} LinearGradient={LinearGradient}> */}
//       <View style={{flexDirection: 'row', margin: 20}}>
//         <Text
//           style={{
//             fontWeight: 'bold',
//             fontSize: 16,
//             right: 10,
//             color: Colors.black,
//           }}>
//           Q.
//         </Text>
//         <Text style={{fontWeight: 'bold', fontSize: 15, color: Colors.black}}>
//           Redux is an open-source JavaScript library {'\n'}for managing and
//           centralizing application state.
//         </Text>
//       </View>
//       {/* </ShimmerPlaceHolder> */}

//       <Text
//         style={{
//           fontSize: 15,
//           marginHorizontal: 30,
//           top: -15,
//           color: Colors.black,
//         }}>
//         Redux is an open-source JavaScript library for managing and centralizing
//         application state. It is most commonly used with libraries such as React
//         or Angular for building user interfaces. Similar to
//       </Text>
//       <View style={{flexDirection: 'row', margin: 20}}>
//         <Text
//           style={{
//             fontWeight: 'bold',
//             fontSize: 16,
//             right: 10,
//             color: Colors.black,
//           }}>
//           Q.
//         </Text>
//         <Text style={{fontWeight: 'bold', fontSize: 15, color: Colors.black}}>
//           Redux is an open-source JavaScript library {'\n'}for managing and
//           centralizing application state.
//         </Text>
//       </View>
//       <Text
//         style={{
//           fontSize: 15,
//           marginHorizontal: 30,
//           top: -15,
//           color: Colors.black,
//         }}>
//         Redux is an open-source JavaScript library for managing and centralizing
//         application state. It is most commonly used with libraries such as React
//         or Angular for building user interfaces. Similar to
//       </Text>
//       <View style={{flexDirection: 'row', margin: 20}}>
//         <Text
//           style={{
//             fontWeight: 'bold',
//             fontSize: 16,
//             right: 10,
//             color: Colors.black,
//           }}>
//           Q.
//         </Text>
//         <Text style={{fontWeight: 'bold', fontSize: 15, color: Colors.black}}>
//           Redux is an open-source JavaScript library {'\n'}for managing and
//           centralizing application state.
//         </Text>
//       </View>
//       <Text
//         style={{
//           fontSize: 15,
//           marginHorizontal: 30,
//           top: -15,
//           color: Colors.black,
//         }}>
//         Redux is an open-source JavaScript library for managing and centralizing
//         application state. It is most commonly used with libraries such as React
//         or Angular for building user interfaces. Similar to
//       </Text>
//     </SafeAreaView>
//   );
// };
// export default Faqs;

import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import moment from 'moment';
import Colors from '../Assets/Constants/Colors';
import {useEffect} from 'react';
import {useState} from 'react';
import {log} from 'react-native-reanimated';

export default function Faqs() {
  const [time, setTime] = useState('');

  useEffect(() => {
    // const currentTime = moment().format('h:mm A');
    // var now = new Date();
    // now.setHours(now.getHours() + 1);
    // var formattedTime = now.toLocaleTimeString();
    // setTime(formattedTime);
    // console.log('Current time plus 1 hour: ' + formattedTime);

    // if(formattedTime== true){
    //   setTime()
    // }

    // var now = new Date();
    // now.setHours(now.getHours() + 1);

    // var currentTime = new Date().getTime();
    // var newTime = now.getTime();
    // var isAfter = newTime > currentTime;
    // console.log('Is the new time after the current time? ' + isAfter);
    // setTime(isAfter);
    // Get the current date and time

    var now = new Date();
    now.setHours(now.getHours() + 1);
    var isValidTime = !isNaN(now.getTime());
    console.log('New time is valid: ', isValidTime);
    setTime(isValidTime);
  }, []);
  console.log('time---------', time);

  const availableDates = [
    {
      // date: moment().format('YYYY-MM-DD'),

      date: 'Morning',
      timeSlots: [
        {
          startTime: '8:00 AM',
          endTime: '9:00 AM',
          isAvailable: time,
        },
        {
          startTime: '9:00 AM',
          endTime: '10:00 AM',
          isAvailable: time,
        },
        {startTime: '10:00 AM', endTime: '11:00 AM', isAvailable: true},
        {startTime: '11:00 AM', endTime: '12:00 AM', isAvailable: true},
      ],
    },
    {
      // date: moment().add(1, 'days').format('YYYY-MM-DD'),
      date: 'Afternoon',
      timeSlots: [
        {startTime: '12:00 PM', endTime: '1:00 PM', isAvailable: true},
        {startTime: '1:00 PM', endTime: '2:00 PM', isAvailable: true},
        {startTime: '2:00 PM', endTime: '3:00 PM', isAvailable: true},
        {startTime: '3:00 PM', endTime: '4:00 PM', isAvailable: true},
      ],
    },
    {
      // date: moment().add(1, 'days').format('YYYY-MM-DD'),
      date: 'Evening',
      timeSlots: [
        {startTime: '5:00 PM', endTime: '6:00 PM', isAvailable: true},
        {startTime: '6:00 PM', endTime: '7:00 PM', isAvailable: true},
        {startTime: '7:00 PM', endTime: '8:00 PM', isAvailable: true},
        {startTime: '8:00 PM', endTime: '9:00 PM', isAvailable: true},
      ],
    },

    // Add more dates and time slots as needed
  ];

  const handleTimeSlotSelect = selectedTimeSlot => {
    // Do something with the selected time slot
    console.log('selectedTimeSlot', selectedTimeSlot);
  };

  return (
    <View>
      <FlatList
        data={availableDates}
        renderItem={({item}) => (
          <View style={styles.dateContainer}>
            <Text style={styles.date}>{item.date}</Text>

            <FlatList
              data={item.timeSlots}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    styles.timeSlot,
                    {backgroundColor: item.isAvailable ? '#3cb371' : '#d3d3d3'},
                  ]}
                  disabled={!item.isAvailable}
                  onPress={() => handleTimeSlotSelect(item)}>
                  <Text style={styles.timeSlotText}>
                    {item.startTime} - {item.endTime}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.date}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dateContainer: {
    marginVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 5,
    borderColor: Colors.darkGreen,
  },
  date: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
  },
  timeSlot: {
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  timeSlotText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
