import {View, Text, FlatList, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Message from './Message';
import data from './Data';
import Styles from './Styles';
import Colors from '../../Assets/Constants/Colors';
import Header from '../../ReusableComponents/Header';

let chats = [];

export default function ChatBot(props) {
  const [chatList, setChatList] = useState([]);
  const [msg, setMsg] = useState('');

  const getAnswer = q => {
    for (let i = 0; i < data.lenght; i++) {
      if (data[i].question.includes(q.toLwerCase())) {
        chats = [...chats, {msg: data[i].answer, incomiMsg: true}];
        setChatList([...chats].reverse());
        return;
      }
    }
    chats = [
      ...chats,
      {msg: "did n't recognise your question", incomiMsg: true},
    ];
    setChatList([...chats].reverse());
    return;
  };

  const _onSendMsg = () => {
    chats = [...chats, {msg: msg, sendMsg: true}];
    setChatList([...chats].reverse());
    setTimeout(() => {
      getAnswer(msg);
    }, 1000);
    setMsg('');
  };

  return (
    <View>
      <Header
        bgColor={Colors.darkOrange}
        color={Colors.white}
        title="Chat Support"
        onPress={() => props.navigation.goBack()}
      />
      <FlatList
        style={{height: '78%'}}
        data={chatList}
        inverted={true}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          console.log('sendMsg----->>', item.sendMsg),
          console.log('incomiMsg----->>', item.incomiMsg),
          console.log('msg----->>', item.msg),
          (
            <Message
              incomiMsg={item.incomiMsg}
              msg={item.msg}
              sendMsg={item.sendMsg}
            />
          )
        )}
      />
      <View style={Styles.typeMsgContainer}>
        <TextInput
          style={Styles.typeMsgBox}
          value={msg}
          placeholder="Type Here...."
          placeholderTextColor={Colors.lightGray}
          onChangeText={val => setMsg(val)}
        />
        <TouchableOpacity
          disabled={msg ? false : true}
          style={[
            Styles.sendBtn,
            {backgroundColor: msg ? Colors.lightGreen : Colors.lightGray},
          ]}
          onPress={() => _onSendMsg()}>
          <Text style={{color: 'white'}}>send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
