import {StyleSheet} from 'react-native';
import Colors from '../../Assets/Constants/Colors';

const Styles = StyleSheet.create({
  incominMsgbox: {
    backgroundColor: Colors.white,
    maxWidth: '70%',
    borderRadius: 10,
    padding: 5,
    alignSelf: 'flex-start',
    marginVertical: 5,
    marginHorizontal: 5,
    borderWidth: 1.5,
    borderColor: 'grey',
  },
  incomiMsgText: {
    color: Colors.black,
    fontSize: 16,
  },
  sentMsgBox: {
    backgroundColor: Colors.lightOrange,
    maxWidth: '70%',
    borderRadius: 10,
    padding: 5,
    alignSelf: 'flex-end',
    marginVertical: 5,
    marginHorizontal: 5,
  },
  sendMsgText: {
    color: Colors.white,
    fontSize: 16,
  },
  typeMsgBox: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    padding: 10,
    width: '80%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    color: Colors.black,
  },
  typeMsgContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
    bottom: 5,
  },
  sendBtn: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default Styles;
