import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../Assets/Constants/Colors';
import {_getStorage} from '../../Assets/utils/storage/Storage';
import axios from 'axios';
import {BASE_URL} from '../../Assets/utils/Restapi/Config';

export default function TranscationsScreen() {
  const [historytra, setHistorytra] = useState([]);
  const [ismessage, setIsmessage] = useState('');
  const [refresh, setRfresh] = useState(false);

  useEffect(() => {
    _getPaymentHistory();
  }, []);

  setTimeout(() => {
    setRfresh(false);
  }, 3000);

  const _getPaymentHistory = async () => {
    const token = await _getStorage('token');
    axios
      .get(BASE_URL + `/transactions/paymentHistory`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        // console.log('response Payment History', res.data.message);
        if (res.data.message === 'No History Record') {
          setIsmessage(res.data.message);
        } else {
          setHistorytra(res.data.history.payment_history);
        }
      })
      .catch(error => {
        console.log('Payment History catch error', error.response);
        // setIsmessage(error.respone.data);
      });
  };

  console.log('ismessage-----------', ismessage);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{paddingBottom: 20}}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={_getPaymentHistory} />
        }>
        {ismessage ? (
          <Text
            style={{
              textAlign: 'center',
              marginTop: '80%',
              color: '#aaa',
            }}>
            {ismessage}
          </Text>
        ) : (
          historytra.map((value, index) => (
            <View
              key={index}
              style={{
                borderColor: Colors.darkGray,
                height: 100,
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
                <View style={{marginVertical: 10}}>
                  <Text style={{fontWeight: 'bold', color: Colors.darkGray}}>
                    {value.purpose}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      color: Colors.darkGray,
                      marginVertical: 10,
                    }}>
                    {value.time}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontWeight: 'bold', color: Colors.lightGray}}>
                      Paid By:
                    </Text>
                    <Text style={{fontSize: 14, color: Colors.darkGray}}>
                      All In One Wallet
                    </Text>
                  </View>
                </View>
                <View style={{marginVertical: 17}}>
                  <Text
                    style={{
                      color: Colors.darkGreen,
                      fontWeight: '900',
                      fontSize: 15,
                      top: -7,
                    }}>
                    {value.status}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Colors.lightpurple,
                      textAlign: 'center',
                      marginVertical: 15,
                      fontWeight: 'bold',
                    }}>
                    INR {value.price}
                  </Text>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
