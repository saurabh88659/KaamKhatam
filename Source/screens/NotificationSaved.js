import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {BASE_URL} from '../Assets/utils/Restapi/Config';
import {_getStorage} from '../Assets/utils/storage/Storage';
import Colors from '../Assets/Constants/Colors';
import Header from '../ReusableComponents/Header';
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment-timezone';
import {ScrollView} from 'react-native-gesture-handler';
import {
  SetNotification,
  SetNotificationCount,
} from '../features/updatedata/update.reducer';

export default function NotificationSaved({navigation}) {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.updateState.notification);
  const unreadNotifications = notification.filter(item => !item.isRead);
  const readNotifications = notification.filter(item => item.isRead);
  const sortedNotifications = unreadNotifications.concat(readNotifications);
  console.log(
    'notifications at NotificationSaved.js=====++++++++++++++++++++++++>',
    JSON.stringify(notification),
  );
  const [chat, setChat] = useState([]);
  const [chatId, setChatID] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getNotification();
  }, [refresh]);

  const getNotification = async () => {
    const token = await _getStorage('token');
    axios
      .get(BASE_URL + `/notifications`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(async res => {
        console.log(
          '+++++++++++++++++++++++++++++++getNotification res=====>>',
          res.data,
        );
        dispatch(SetNotification(res.data.notifications));
        dispatch(SetNotificationCount(res.data.count));
      })
      .catch(e => {
        console.log(
          'home screen catch error getNotification ',
          e?.response?.data,
        );
      });
  };

  const ReadNotification = async notificationID => {
    const token = await _getStorage('token');
    const obj = {id: notificationID};
    console.log('object of ReadNotification ', obj);
    axios
      .put(BASE_URL + `/notifications`, obj, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(async res => {
        setRefresh(!refresh);
        console.log(
          '+++++++++++++++++++++++++++++++getNotification res=====>>',
          res.data,
        );
        // dispatch(SetNotification(res.data.notifications));
        // dispatch(SetNotificationCount(res.data.count));
      })
      .catch(e => {
        console.log(
          'home screen catch error getNotification ',
          e?.response?.data,
        );
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        bgColor={Colors.topNavbarColor}
        color={Colors.white}
        title="Notifications"
        onPress={() => navigation.goBack()}
      />
      {!isLoading ? (
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '70%',
          }}>
          <ActivityIndicator color={Colors.purple} size="large" />
        </View>
      ) : (
        <View
          style={{
            paddingHorizontal: 10,
            flex: 1,
            paddingVertical: 10,
            // backgroundColor: ,
          }}>
          <ScrollView>
            {sortedNotifications.map(
              (item, index) => (
                console.log(
                  'item notifications #### ====>',
                  JSON.stringify(item.isRead),
                ),
                (
                  <TouchableOpacity
                    onPress={() => ReadNotification(item._id)}
                    activeOpacity={0.4}
                    key={index}>
                    <View
                      key={index}
                      style={{
                        backgroundColor: '#e6e6fa',
                        borderRadius: 10,
                        paddingHorizontal: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingBottom: 15,
                        paddingTop: 10,
                        width: '100%',
                        marginVertical: 10,
                        borderWidth: 1.5,
                        borderColor: item.isRead
                          ? Colors.grayShade
                          : Colors.topNavbarColor,
                      }}>
                      <View
                        style={{
                          width: '80%',
                        }}>
                        <Text
                          style={{color: '#000', fontSize: 18}}
                          numberOfLines={1}>
                          {item.bookingId?.category}
                        </Text>

                        <Text
                          style={{color: '#000', fontSize: 16}}
                          numberOfLines={1}>
                          {/* Booking cancelled successfully */}
                          Booking {item.bookingId?.bookingStatus}
                        </Text>
                        <Text
                          style={{color: Colors.darkGray, fontSize: 16}}
                          numberOfLines={1}>
                          {/* Booking cancelled successfully */}
                          Booking Id- {item.bookingId?.uniqueId}
                        </Text>

                        <Text style={{color: Colors.darkGray, fontSize: 12}}>
                          {/* {}7 may, 2023, 12:40 AM */}
                          {moment(item.bookingId?.createdAt).format(
                            'D MMM, YYYY, h:mm A',
                          )}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              ),
            )}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
