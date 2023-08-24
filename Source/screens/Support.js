import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {BASE_URL} from '../Assets/utils/Restapi/Config';
import {_getStorage} from '../Assets/utils/storage/Storage';
import Colors from '../Assets/Constants/Colors';
import Header from '../ReusableComponents/Header';
import Modal from 'react-native-modal';

export default function Support({navigation}) {
  const [chat, setChat] = useState([]);
  const [chatId, setChatID] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    _getChatApi();
  }, []);

  const _getChatApi = async () => {
    const token = await _getStorage('token');
    console.log(token);
    axios
      .get(BASE_URL + `/chat`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log('response-------', res.data.chat);
        setChat(res.data.chat);
      })
      .catch(error => {
        console.log('chat catch error', error);
      });
  };

  const _getChatById = async id => {
    const token = await _getStorage('token');
    console.log('id', id);
    axios
      .get(BASE_URL + `/chat/byId/${id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log('response------>>', res.data.chat);
        setChatID(res.data.chat);
        setModalVisible(!modalVisible);
      })
      .catch(error => {
        console.log('chat catch error', error);
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        bgColor={Colors.topNavbarColor}
        color={Colors.white}
        title="Chat Support"
        onPress={() => navigation.goBack()}
      />
      {chat.map((val, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => _getChatById(val._id)}
          style={{
            marginHorizontal: 20,
            marginTop: 20,
            borderRadius: 5,
            paddingHorizontal: 10,
            paddingVertical: 10,
            backgroundColor: Colors.lightpurple,
          }}>
          <Text style={{color: 'white', fontSize: 15}}>{val.question}</Text>
        </TouchableOpacity>
      ))}
      <Modal
        animationIn="slideInUp"
        animationOut="slideOutDown"
        transparent={true}
        isVisible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={{alignItems: 'flex-end', top: -20}}>
              <Text style={{marginHorizontal: -20, fontSize: 15}}>❌</Text>
            </TouchableOpacity>
            <View>
              <Text style={{color: 'black', fontSize: 15}}>
                {chatId.answer}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 7,
    padding: 30,
    shadowColor: '#000',
    shadowRadius: 4,
    elevation: 5,
  },
});
