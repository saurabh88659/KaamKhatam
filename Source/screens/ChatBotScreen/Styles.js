import {StyleSheet} from 'react-native';
import Colors from '../../Assets/Constants/Colors';

const Styles = StyleSheet.create({
  incomingMsgBox: {
    backgroundColor: 'white',
    maxWidth: '70%',
    borderRadius: 10,
    padding: 5,
    alignSelf: 'flex-start',
    marginVertical: 5,
    marginHorizontal: 5,
    borderWidth: 0.5,
    borderColor: 'grey',
  },
  incomingMsgText: {color: 'black', fontSize: 16},

  sentMsgBox: {
    backgroundColor: 'green',
    maxWidth: '70%',
    borderRadius: 10,
    padding: 5,
    alignSelf: 'flex-end',
    marginVertical: 5,
    marginHorizontal: 5,
  },

  sentMsgText: {color: '#fff', fontSize: 16},

  typeMsgContainer: {
    flexDirection: 'row',
    marginHorizontal: 5,
    bottom: 5,
  },

  typeMsgBox: {
    borderWidth: 0.8,
    borderColor: 'grey',
    padding: 10,
    width: '80%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    color: Colors.black,
  },

  sendBtn: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },

  sendTxt: {color: 'white'},
});

export default Styles;
