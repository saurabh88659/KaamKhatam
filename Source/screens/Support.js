import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  FlatList,
  Dimensions,
  Modal,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
const {height, width} = Dimensions.get('screen');

import Colors from '../Assets/Constants/Colors';
import Header from '../ReusableComponents/Header';

export default function Support(props) {
  const [chatUser] = useState({
    // name: 'Robert Henry',
    // profile_image: 'https://randomuser.me/api/portraits/men/0.jpg',
    // last_seen: 'online',
  });

  const [currentUser] = useState({
    name: 'John Doe',
  });
  const [modalVisible, setModalVisible] = useState(false);

  const [messages, setMessages] = useState([
    {sender: 'John Doe', message: 'Hey there!', time: '6:01 PM'},
    {
      sender: 'Robert Henry',
      message: 'Hello, how are you doing?',
      time: '6:02 PM',
    },
    {
      sender: 'John Doe',
      message: 'I am good, how about you?',
      time: '6:02 PM',
    },
    {
      sender: 'John Doe',
      message: `😊😇`,
      time: '6:02 PM',
    },
    {
      sender: 'Robert Henry',
      message: `Can't wait to meet you.`,
      time: '6:03 PM',
    },
    {
      sender: 'John Doe',
      message: `That's great, when are you coming?`,
      time: '6:03 PM',
    },
    {
      sender: 'Robert Henry',
      message: `This weekend.`,
      time: '6:03 PM',
    },
    {
      sender: 'Robert Henry',
      message: `Around 4 to 6 PM.`,
      time: '6:04 PM',
    },
    {
      sender: 'John Doe',
      message: `Great, don't forget to bring me some mangoes.`,
      time: '6:05 PM',
    },
    {
      sender: 'Robert Henry',
      message: `Sure!`,
      time: '6:05 PM',
    },
  ]);

  const [imageUrlPath, setImageUrlPath] = useState(null);
  const [imageUrlData, setImageUrlData] = useState('');

  const onGallary = () => {
    console.warn('hello');
    ImagePicker.openPicker({
      cropping: true,
      quality: 1,
      includeBase64: true,
      mediaType: 'any',
    }).then(image => {
      setImageUrlPath(image.path);
      setImageUrlData(image.data);
    });
  };

  const onCamera = () => {
    console.warn('hello');
    ImagePicker.openCamera({
      cropping: true,
      includeBase64: true,
      mediaType: 'any',
    }).then(image => {
      console.log('===== Open Camera =====222', image);
      setImageUrlPath(image.path);
      setImageUrlData(image.data);
    });
  };

  const [inputMessage, setInputMessage] = useState('');

  function getTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  function sendMessage() {
    if (inputMessage === '') {
      return setInputMessage('');
    }
    let t = getTime(new Date());
    setMessages([
      ...messages,
      {
        sender: currentUser.name,
        message: inputMessage,
        time: t,
      },
    ]);
    setInputMessage('');
  }

  useEffect(() => {
    props.navigation.setOptions({
      title: '',
      headerLeft: () => (
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={{paddingRight: 10}}
            onPress={() => {
              props.navigation.goBack();
            }}>
            {/* <FontAwesome name="send" size={30} color="#fff" /> */}
          </TouchableOpacity>
          <Image
            style={styles.userProfileImage}
            source={{uri: chatUser.profile_image}}
          />
          <View
            style={{
              paddingLeft: 10,
              justifyContent: 'center',
            }}>
            <Text style={{color: '#fff', fontWeight: '700', fontSize: 18}}>
              {chatUser.name}
            </Text>
            <Text style={{color: '#fff', fontWeight: '300'}}>
              {chatUser.last_seen}
            </Text>
          </View>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{paddingRight: 10}}
          onPress={() => {
            Alert.alert('Audio Call', 'Audio Call Button Pressed');
          }}></TouchableOpacity>
      ),
    });
  }, []);

  return (
    <>
      <Header
        bgColor={Colors.darkOrange}
        color={Colors.white}
        title="Chat Support"
        onPress={() => props.navigation.goBack()}
      />

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <FlatList
            style={{backgroundColor: '#f2f2ff'}}
            inverted={true}
            data={JSON.parse(JSON.stringify(messages)).reverse()}
            renderItem={({item}) => (
              <TouchableWithoutFeedback>
                <View style={{marginTop: 6}}>
                  <View
                    style={{
                      maxWidth: Dimensions.get('screen').width * 0.8,
                      backgroundColor: Colors.darkOrange,
                      alignSelf:
                        item.sender === currentUser.name
                          ? 'flex-end'
                          : 'flex-start',
                      marginHorizontal: 10,
                      padding: 10,
                      borderRadius: 8,
                      borderBottomLeftRadius:
                        item.sender === currentUser.name ? 8 : 0,
                      borderBottomRightRadius:
                        item.sender === currentUser.name ? 0 : 8,
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 16,
                      }}>
                      {item.message}
                    </Text>
                    <Text
                      style={{
                        color: '#dfe4ea',
                        fontSize: 14,
                        alignSelf: 'flex-end',
                      }}>
                      {item.time}
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )}
          />

          <View style={{paddingVertical: 10}}>
            <View style={styles.messageInputView}>
              <TextInput
                defaultValue={inputMessage}
                style={styles.messageInput}
                placeholder="Type here..."
                placeholderTextColor="black"
                onChangeText={text => setInputMessage(text)}
                onSubmitEditing={() => {
                  sendMessage();
                }}
              />
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  style={styles.messageSendView}
                  onPress={() => setModalVisible(true)}>
                  <Entypo
                    name="attachment"
                    size={25}
                    color={Colors.darkOrange}
                  />
                </TouchableOpacity>

                {inputMessage ? (
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: 13,
                      borderRadius: 50,
                      height: 45,
                      width: 45,
                      justifyContent: 'center',
                      marginHorizontal: 5,
                      backgroundColor: Colors.darkOrange,
                    }}
                    onPress={() => {
                      sendMessage();
                    }}>
                    <FontAwesome name="send" size={18} color={Colors.white} />
                  </TouchableOpacity>
                ) : (
                  <>
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 17,
                        borderRadius: 50,
                        height: 45,
                        width: 45,
                        justifyContent: 'center',
                        marginHorizontal: 5,
                        backgroundColor: Colors.darkOrange,
                      }}>
                      <FontAwesome
                        name="microphone"
                        size={18}
                        color={Colors.white}
                      />
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                  // onPress={onCamera}
                >
                  <Image
                    source={require('../Assets/Images/camera123.png')}
                    style={{height: 30, width: 30, right: 10}}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={onGallary}>
                  <Image
                    source={require('../Assets/Images/photo.png')}
                    style={{height: 30, width: 30, left: 10}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerLeft: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userProfileImage: {height: '100%', aspectRatio: 1, borderRadius: 100},
  container: {
    flex: 1,
    backgroundColor: '#f2f2ff',
  },
  messageInputView: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 14,
    backgroundColor: '#fff',
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: Colors.darkOrange,
  },
  messageInput: {
    height: 50,
    flex: 1,
    paddingHorizontal: 10,
    color: 'black',
  },
  messageSendView: {
    paddingHorizontal: 5,
    justifyContent: 'center',
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    left: 100,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: '7%',
    top: height / 1.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});