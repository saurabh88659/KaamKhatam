import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../Assets/Constants/Colors';
import HeaderDrawer from '../ReusableComponents/HeaderDrawer';
import {_getStorage} from '../Assets/utils/storage/Storage';
import axios from 'axios';
import {BASE_URL} from '../Assets/utils/Restapi/Config';
const {height, width} = Dimensions.get('window');

function Mybooking({navigation}) {
  const [bookdetails, setBookdetails] = useState([]);
  const [noData, setNoData] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRfresh] = useState(false);

  useEffect(() => {
    bookingDetails();
  }, []);

  setTimeout(() => {
    setRfresh(false);
  }, 3000);

  const bookingDetails = async () => {
    const token = await _getStorage('token');
    console.log(token);

    axios
      .get(BASE_URL + `/booking/allbookings`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log('bookingdetails', res.data.newData);
        if (res.data.message == 'No Data Found') {
          setNoData(res.data.message);
        } else {
          setBookdetails(res.data.newData);
        }
        setIsLoading(false);
        setRfresh(false);
      })
      .catch(error => {
        console.log(
          'booking details catch error',
          error.response.data.messsage,
        );
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <HeaderDrawer
        Title="My Bookings"
        location="Sector 62"
        onPress={() => navigation.toggleDrawer()}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => bookingDetails()}
          />
        }>
        {isLoading === true ? (
          <ActivityIndicator
            color="#FFA034"
            size="large"
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 30,
            }}
          />
        ) : noData ? (
          <Text
            style={{
              textAlign: 'center',
              marginTop: '60%',
              color: '#aaa',
            }}>
            {noData}
          </Text>
        ) : (
          bookdetails.map((value, index) => (
            <View
              key={index}
              style={{
                height: height / 4.6,
                marginHorizontal: 10,
                borderRadius: 7,
                marginVertical: 10,
                backgroundColor: Colors.white,
                elevation: 5,
              }}>
              <View
                style={{
                  backgroundColor: '#BCC4FF',
                  borderTopRightRadius: 7,
                  borderTopLeftRadius: 7,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  alignItems: 'center',
                }}>
                <Text style={{fontWeight: 'bold', color: Colors.black}}>
                  Booking ID
                </Text>
                <Text style={{fontWeight: 'bold', color: Colors.black}}>
                  {value.bookingId}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    width: '70%',
                    height: '100%',
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                  }}>
                  <View>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '900',
                        color: '#ff8000',
                      }}>
                      {value.serviceName}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: '500',
                          color: Colors.black,
                        }}>
                        Time slot:
                      </Text>
                      <Text
                        style={{fontSize: 15, left: 5, color: Colors.black}}>
                        {value.time}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: '500',
                          color: Colors.black,
                        }}>
                        Date
                      </Text>
                      <Text
                        style={{fontSize: 15, left: 5, color: Colors.black}}>
                        {value.bookingDate}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: '500',
                          color: Colors.black,
                        }}>
                        Price:
                      </Text>
                      <Text
                        style={{fontSize: 15, color: Colors.black, left: 4}}>
                        {value.amountToBePaid}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    paddingHorizontal: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '30%',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '500',
                      color: '#0EC01B',
                      color:
                        value.bookingStatus === 'Pending'
                          ? '#F1C114'
                          : value.bookingStatus === 'Completed'
                          ? '#0EC01B'
                          : '#F21313',
                    }}>
                    {value.bookingStatus}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Viewdetails', value.bookingId)
                    }
                    style={{
                      backgroundColor: Colors.lightGreen,
                      padding: 5,
                      top: 25,
                      borderRadius: 7,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{color: Colors.white, fontWeight: '500'}}>
                      View Details
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default Mybooking;
