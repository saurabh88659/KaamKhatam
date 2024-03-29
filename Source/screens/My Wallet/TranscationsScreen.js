import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../Assets/Constants/Colors';
import {_getStorage} from '../../Assets/utils/storage/Storage';
import axios from 'axios';
import {BASE_URL} from '../../Assets/utils/Restapi/Config';
import moment from 'moment-timezone';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useIsFocused} from '@react-navigation/native';

export default function TranscationsScreen() {
  const IST_TIMEZONE = 'Asia/Kolkata';
  const [historytra, setHistorytra] = useState([]);
  const [ismessage, setIsmessage] = useState('');
  const [refresh, setRfresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  console.log(historytra, '===========history=============');
  useEffect(() => {
    _getPaymentHistory();
    // getPaymentHistory();
  }, []);

  setTimeout(() => {
    setRfresh(false);
  }, 3000);

  //old api----------of hostory
  const _getPaymentHistory = async () => {
    setIsLoading(true);
    const token = await _getStorage('token');
    axios
      .get(BASE_URL + `/transactions/paymentHistory`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        setIsLoading(false);
        console.log(
          res.data.history.payment_history,
          '===============transaction history====================',
        );
        if (res.data.message === 'No History Record') {
          setIsmessage(res.data.message);
        } else if (res.data?.message == 'History Fetched') {
          setHistorytra(res?.data?.history?.payment_history);
        }
      })
      .catch(error => {
        setIsLoading(false);
        console.log('Payment History catch error', error);
        // setIsmessage(error.respone.data);
      });
  };

  //newApi of history==================================
  const getPaymentHistory = async () => {
    const token = await _getStorage('token');
    console.log(token, 'token-----------------------getPayment');
    axios
      .put(BASE_URL + `/addPaymentHistoryPag`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        // if (res.data.message === 'No History Record') {
        setIsmessage(res?.data?.message);
        // } else {
        // setHistorytra(res.data.history.payment_history);
        console.log('=============Historytran==============', res.data.message);
        // }
      })
      .catch(error => {
        console.log('Payment History catch error  63======>', error);
      });
  };

  console.log('ismessage-----------', ismessage);
  return (
    <SafeAreaView style={{flex: 1}}>
      {isLoading === true ? (
        <ActivityIndicator
          color="#FFA034"
          size="large"
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: hp('37%'),
          }}
        />
      ) : historytra.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              color: Colors.darkGray,
              fontSize: 21,
              fontWeight: '500',
            }}>
            No transaction history available.
          </Text>
          <Text
            style={{
              color: Colors.lightGray,
              fontSize: 15,
              fontWeight: 'normal',
              marginTop: 10,
            }}>
            You haven't made any transactions yet
          </Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{paddingBottom: 20}}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={_getPaymentHistory}
            />
          }>
          {historytra
            .slice() // Create a shallow copy of the original array to avoid modifying it
            .reverse()
            .map((value, index) => {
              console.log(value);
              // console.log(value.time, 'value.time=====');
              const utcMoment = moment(value.time);
              // console.log(utcMoment, '======map-----');
              const istMoment = utcMoment.tz(IST_TIMEZONE);
              // console.log(istMoment, '=====istMoment---map======');
              const istDate = istMoment.format('YYYY-MM-DD');
              // console.log(istDate, 'is date ---map');
              const istTime = istMoment.format('HH:mm:ss');
              return (
                <View
                  key={index}
                  style={{
                    borderColor: Colors.darkGray,
                    // height: 125,
                    backgroundColor: Colors.white,
                    elevation: 5,
                    marginVertical: 1,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginHorizontal: 10,
                    }}>
                    <View style={{marginVertical: 12}}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: Colors.darkGray,
                          fontSize: 16,
                        }}>
                        Transaction Id : {value.transactionId}
                        {/* Transaction Id : 20981207 */}
                      </Text>

                      <Text
                        style={{
                          marginTop: 3,
                          fontWeight: '600',
                          color: Colors.darkGray,
                          fontSize: 16,
                        }}>
                        {value.purpose}
                      </Text>

                      <View style={{flexDirection: 'row', marginTop: 6}}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: Colors.darkGray,
                            // marginVertical: 6,
                          }}>
                          {istMoment.format('YYYY-MM-DD')}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: Colors.darkGray,
                            // marginVertical: 6,
                            marginHorizontal: 7,
                          }}>
                          {istMoment.format('h:mm A')}
                          {/* {istMoment.format('HH:mm A')} */}
                        </Text>
                      </View>
                      {value?.purpose == 'refund' ? null : (
                        <View style={{flexDirection: 'row', marginTop: 5}}>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              color: Colors.lightGray,
                              fontSize: 14,
                            }}>
                            Paid By :
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              color: Colors.darkGray,
                              marginLeft: 3,
                            }}>
                            {value?.paidBy}
                          </Text>
                        </View>
                      )}
                    </View>
                    <View style={{justifyContent: 'center'}}>
                      {/* <Text
                      style={{
                        color: Colors.darkGreen,
                        fontWeight: '900',
                        fontSize: 15,
                        top: -7,
                      }}>
                      {value.status}
                    </Text> */}
                      <Text
                        style={{
                          fontSize: 16,
                          color: value.color ? value.color : Colors.lightpurple,
                          textAlign: 'center',
                          // marginVertical: 15,
                          fontWeight: 'bold',
                        }}>
                        {/* INR {value.price}
                         */}
                        INR {parseFloat(value.price).toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
