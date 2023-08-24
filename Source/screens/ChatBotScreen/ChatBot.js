import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TextInput, TouchableOpacity} from 'react-native';
import Msg from './Message';
import {data} from './Data';
import Styles from './Styles';
import Colors from '../../Assets/Constants/Colors';
import Header from '../../ReusableComponents/Header';
import axios from 'axios';
import {BASE_URL} from '../../Assets/utils/Restapi/Config';
import {_getStorage} from '../../Assets/utils/storage/Storage';

let chats = [];

const ChatBot = ({navigation}) => {
  const [msg, setMsg] = useState('');
  const [chatList, setChatList] = useState('');

  // console.log('chatList----------', chatList);

  const getAnswer = q => {
    for (let i = 0; i < chatList.length; i++) {
      if (chatList[i].question.includes(q.toLowerCase())) {
        chats = [...chats, {msg: chatList[i].answer, incomingMsg: true}];
        setChatList([...chats].reverse());
        return;
      }
    }

    chats = [
      ...chats,
      {msg: "Didn't recognise tour question", incomingMsg: true},
    ];
    setChatList([...chats].reverse());
    return;
  };

  const onSendMsg = () => {
    chats = [...chats, {msg: msg, sentMsg: true}];
    setChatList([...chats].reverse());
    setTimeout(() => {
      getAnswer(msg);
    }, 1000);
    setMsg('');
  };

  useEffect(() => {
    _getChatApi();
  }, []);

  const _getChatApi = async () => {
    const token = await _getStorage('token');
    axios
      .get(BASE_URL + `/chat`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log('response--->>>', res.data.chat);
        setChatList(res.data.chat);
      })
      .catch(error => {
        console.log('chat catch error', error.response);
      });
  };

  return (
    <View style={{flex: 1}}>
      <Header
        bgColor={Colors.topNavbarColor}
        color={Colors.white}
        title="Chat Support"
        onPress={() => navigation.goBack('')}
      />
      <FlatList
        style={{height: '87%', bottom: '3%'}}
        inverted={true}
        keyExtractor={(_, index) => index.toString()}
        data={chatList}
        renderItem={({item}) => (
          <Msg
            incomingMsg={item.incomingMsg}
            msg={item.msg}
            sentMsg={item.sentMsg}
          />
        )}
      />
      <View style={Styles.typeMsgContainer}>
        <TextInput
          placeholderTextColor="grey"
          style={Styles.typeMsgBox}
          value={msg}
          placeholder="Type Here ..."
          onChangeText={val => setMsg(val)}
        />
        <TouchableOpacity
          style={[
            Styles.sendBtn,
            {backgroundColor: msg ? Colors.purple : 'grey'},
          ]}
          disabled={msg ? false : true}
          onPress={() => onSendMsg()}>
          <Text style={Styles.sendTxt}>send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatBot;
