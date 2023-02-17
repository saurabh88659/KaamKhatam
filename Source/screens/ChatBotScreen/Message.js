import React from 'react';
import {View, Text} from 'react-native';
import Styles from './Styles';

const Message = ({incomingMsg, sentMsg, msg}) => {
  return (
    <View>
      {incomingMsg && (
        <View style={Styles.incomingMsgBox}>
          <Text style={Styles.incomingMsgText}>{msg}</Text>
        </View>
      )}
      {sentMsg && (
        <Text style={Styles.sentMsgBox}>
          <Text style={Styles.sentMsgText}>{msg}</Text>
        </Text>
      )}
    </View>
  );
};

export default Message;
