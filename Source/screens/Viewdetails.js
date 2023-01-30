import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Lorealcolor from '../Assets/Images/Lorealcolor.png';
import {_getStorage} from '../Assets/utils/storage/Storage';
import axios from 'axios';
import {BASE_URL} from '../Assets/utils/Restapi/Config';

const {height, width} = Dimensions.get('window');

const Viewdetails = props => {
  const bookinID = props.route.params;
  const [bookinviewdetails, setBookinviewdetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Viewdetailsbooking();
  }, []);

  const Viewdetailsbooking = async () => {
    const token = await _getStorage('token');
    console.log('token', token);
    axios
      .get(BASE_URL + `/booking/${bookinID}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log('Viewdetailsbooking', res.data.result);
        setBookinviewdetails(res.data.result);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('Viewdetailsbooking catch error', error.response.data);
        setIsLoading(false);
      });
  };

  return (
    <>
      <Header
        bgColor={Colors.darkOrange}
        color={Colors.white}
        title="View Details"
        onPress={() => props.navigation.goBack()}
      />
      {isLoading === true ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '65%',
          }}>
          <ActivityIndicator color={Colors.darkOrange} size="large" />
        </View>
      ) : (
        <ScrollView>
          <View style={styles.cntrContainer}>
            <View
              style={{
                paddingVertical: 6,
                height: height / 3.8,
                marginVertical: 5,
                marginHorizontal: 5,
                borderRadius: 6,
                elevation: 2,
              }}>
              <View style={{flexDirection: 'row', marginHorizontal: 10}}>
                <View style={{width: '70%'}}>
                  <Text style={{color: Colors.black, fontSize: 17}}>
                    {bookinviewdetails.serviceName}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      top: 5,
                    }}>
                    <FontAwesome5Icon
                      name="star"
                      solid
                      size={hp('2%')}
                      color={Colors.lightYellow}
                    />
                    <Text style={{left: 5, color: Colors.black}}>
                      {bookinviewdetails.rating}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      top: 5,
                    }}>
                    <Text style={{color: Colors.black}}>INR</Text>
                    <Text
                      style={{
                        paddingHorizontal: 5,
                        color: Colors.black,
                        fontWeight: '700',
                      }}>
                      {bookinviewdetails.amountToBePaid}
                    </Text>
                    <Text style={{left: 20, color: Colors.black}}>30 min</Text>
                  </View>
                  <Text style={{color: Colors.black}}>
                    .....................................................
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={require('../Assets/Images/Ellipse1.png')}
                      style={{height: 7, width: 7, borderRadius: 50, top: 5}}
                    />
                    <Text style={{color: Colors.black, fontSize: 13, left: 5}}>
                      {bookinviewdetails.serviceDescription}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: 3}}>
                    <Image
                      source={require('../Assets/Images/Ellipse1.png')}
                      style={{height: 7, width: 7, borderRadius: 50, top: 5}}
                    />
                    <Text style={{color: Colors.black, fontSize: 13, left: 5}}>
                      {bookinviewdetails.packageDescription}
                    </Text>
                  </View>
                </View>
                <View style={{width: '30%', padding: 10}}>
                  <Image
                    resizeMode="contain"
                    source={Lorealcolor}
                    style={{height: 80, width: 80}}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                marginHorizontal: 20,
                borderColor: '#D9D9D9',
                top: 10,
                height: height / 28,
              }}>
              <Text
                style={{color: '#FC8009', fontSize: 17, fontWeight: 'bold'}}>
                Booking Details
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 20,
              marginHorizontal: 20,
            }}>
            <Text
              style={{color: Colors.black, fontSize: 15, fontWeight: 'bold'}}>
              Booking ID
            </Text>
            <Text style={{color: Colors.darkGray, fontSize: 15}}>
              {bookinviewdetails.bookingId}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
              // flexWrap: 'wrap',
            }}>
            <Text
              style={{color: Colors.black, fontSize: 15, fontWeight: 'bold'}}>
              Service Name
            </Text>

            <Text
              style={{
                color: Colors.darkGray,
                fontSize: 15,
                textAlign: 'center',
              }}>
              {bookinviewdetails.serviceName}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
              marginVertical: 20,
            }}>
            <Text
              style={{color: Colors.black, fontSize: 15, fontWeight: 'bold'}}>
              Time Slot
            </Text>
            <Text style={{color: Colors.darkGray, fontSize: 15}}>
              {bookinviewdetails.time}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
            }}>
            <Text
              style={{color: Colors.black, fontSize: 15, fontWeight: 'bold'}}>
              Price
            </Text>
            <Text style={{color: Colors.darkGray, fontSize: 15}}>
              INR {bookinviewdetails.amountToBePaid}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
              marginVertical: 20,
            }}>
            <Text
              style={{color: Colors.black, fontSize: 15, fontWeight: 'bold'}}>
              Date
            </Text>
            <Text style={{color: Colors.darkGray, fontSize: 15}}>
              {bookinviewdetails.bookingDate}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
            }}>
            <Text
              style={{color: Colors.black, fontSize: 15, fontWeight: 'bold'}}>
              Paid By
            </Text>
            <Text style={{color: Colors.darkGray, fontSize: 15}}>
              {bookinviewdetails.payby}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
              marginVertical: 20,
            }}>
            <Text
              style={{color: Colors.black, fontSize: 15, fontWeight: 'bold'}}>
              Status
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color:
                  bookinviewdetails.bookingStatus === 'Pending'
                    ? '#F1C114'
                    : bookinviewdetails.bookingStatus === 'Completed'
                    ? '#0EC01B'
                    : '#F21313',
              }}>
              {bookinviewdetails.bookingStatus}
            </Text>
          </View>
          <View
            style={{
              marginVertical: '10%',
            }}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={{
                height: height / 16,
                backgroundColor: '#0EC01B',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                marginHorizontal: 15,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default Viewdetails;
const styles = StyleSheet.create({});
