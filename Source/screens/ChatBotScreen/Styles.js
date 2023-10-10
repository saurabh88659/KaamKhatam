import {StyleSheet} from 'react-native';
import Colors from '../../Assets/Constants/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const Styles = StyleSheet.create({
  incomingMsgBox: {
    backgroundColor: Colors.darkpurple,
    maxWidth: '70%',
    borderRadius: 4,
    padding: 5,
    alignSelf: 'flex-start',
    marginVertical: 5,
    marginHorizontal: 5,
    minHeight: 55,
    justifyContent: 'center',
  },
  incomingMsgText: {color: '#fff', fontSize: 16, marginVertical: 5},

  sentMsgBox: {
    backgroundColor: Colors.lightGreen,
    maxWidth: '70%',
    borderRadius: 4,
    padding: 5,
    alignSelf: 'flex-end',
    marginVertical: 30,
    marginHorizontal: 5,
    minHeight: 55,
    justifyContent: 'center',
  },

  sentMsgText: {color: '#fff', fontSize: 16, marginVertical: 5},

  typeMsgContainer: {
    flexDirection: 'row',
    marginHorizontal: 5,
    bottom: 10,
    borderWidth: 1.5,
    borderRadius: 30,
    height: hp('7%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: Colors.purple,
  },

  typeMsgBox: {
    borderColor: 'grey',
    padding: 10,
    width: '85%',
    color: Colors.black,
    fontSize: 17,
    marginLeft: 6,
  },

  sendBtn: {
    width: wp('12%'),
    height: hp('6%'),
    borderRadius: hp('10%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },

  sendTxt: {color: 'white'},
});

export default Styles;
