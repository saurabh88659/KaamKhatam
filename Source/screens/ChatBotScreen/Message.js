import {View, Text, SafeAreaView} from 'react-native';
import React, {Fragment} from 'react';
import Styles from './Styles';

export default function Message({incomiMsg, sendMsg, msg}) {
  return (
    <Fragment>
      {incomiMsg && (
        <View style={Styles.incominMsgbox}>
          <Text style={Styles.incomiMsgText}>{msg}</Text>
        </View>
      )}
      {sendMsg && (
        <View style={Styles.sentMsgBox}>
          <Text style={Styles.sendMsgText}>{msg}</Text>
        </View>
      )}
    </Fragment>
  );
}
