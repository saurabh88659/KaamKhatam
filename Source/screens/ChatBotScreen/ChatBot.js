import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Msg from './Message';
import {data} from './Data';
import Styles from './Styles';
import Colors from '../../Assets/Constants/Colors';
import Header from '../../ReusableComponents/Header';
import axios from 'axios';
import {BASE_URL} from '../../Assets/utils/Restapi/Config';
import {_getStorage} from '../../Assets/utils/storage/Storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {
  setChatAnswer,
  setChatQuestion,
  setNetAnswer,
} from '../../features/updatedata/update.reducer';
import {ScrollView} from 'react-native-gesture-handler';
const {height, width} = Dimensions.get('window');
import Toast from 'react-native-simple-toast';
import moment from 'moment-timezone';
let chats = [];
const ChatBot = ({navigation}) => {
  const scrollViewRef = useRef();
  const dispatch = useDispatch();
  const BASEURL = 'https://kaamkhatamapi.kickrtechnology.online';
  const [chatList, setChatList] = useState('');
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [questionId, setQuestionId] = useState(null);
  const [answers, setAnswers] = useState(null);
  const [otherQueryModal, setOtherQueryuModal] = useState(false);
  const [otherQuery, setOtherQuery] = useState(null);
  const [modalButtonLoading, setModalButtonLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Other existing code...

  const chatQuestion = useSelector(state => state.updateState.chatQuestion);
  const chatAnswer = useSelector(state => state.updateState.chatAnswer);
  const netAnswer = useSelector(state => state.updateState.netAnswer);
  console.log('chatquestion---->', chatQuestion);
  console.log('chatAnswer---->', chatAnswer);
  console.log('netAnswer---->', netAnswer);
  console.log('answers====>', answers);

  // console.log('chatList----------', chatList);
  // console.log('questions===>', questions);
  // const getAnswer = q => {
  //   for (let i = 0; i < chatList.length; i++) {
  //     if (chatList[i]?.question?.includes(q.toLowerCase())) {
  //       chats = [...chats, {msg: chatList[i].answer, incomingMsg: true}];
  //       setChatList([...chats].reverse());
  //       return;
  //     }
  //   }
  //   chats = [
  //     ...chats,
  //     {msg: "Didn't recognise tour question", incomingMsg: true},
  //   ];
  //   setChatList([...chats].reverse());
  //   return;
  // };

  // const onSendMsg = msg => {
  //   console.log('msg 44====', msg);
  //   chats = [...chats, {msg: msg, sentMsg: true}];
  //   setChatList([...chats].reverse());
  //   setTimeout(() => {
  //     getAnswer(msg);
  //   }, 1000);
  //   setMsg('');
  // };

  useEffect(() => {
    // _getChatApi();
    _getQuestions();
  }, []);

  // const _getChatApi = async () => {
  //   const token = await _getStorage('token');
  //   axios
  //     .get(BASE_URL + `/chat`, {
  //       headers: {Authorization: `Bearer ${token}`},
  //     })
  //     .then(res => {
  //       console.log('-------response getChatApi ()--->>>', res.data.chat);
  //       setChatList(res.data.chat);
  //     })
  //     .catch(error => {
  //       console.log('chat catch error', error.response);
  //     });
  // };

  const _getQuestions = async () => {
    setLoading(true);
    const token = await _getStorage('token');
    axios
      .get(BASEURL + `/api/v1/admin/question`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        setLoading(false);
        console.log('-------response getChatApi ()--->>>', res.data.questions);
        // setQuestions(res.data.questions);
        dispatch(setChatQuestion(res.data.questions));
      })
      .catch(error => {
        setLoading(false);
        console.log('-------error getChatApi ()--->>>', error.response);
      });
  };

  const handleAnswer = async id => {
    const token = await _getStorage('token');
    const chatObject = {
      questionId: id,
    };

    console.log(chatObject);
    axios
      .post(BASEURL + `/api/v1/admin/answerOfQuestion`, chatObject, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log('-------response getAnswer--->>>', res.data.answer);
        const currentDate = new Date().toISOString();
        dispatch(
          setNetAnswer({message: res.data, from: 'answer', date: currentDate}),
        );
        dispatch(setChatAnswer(res.data.answer));
      })
      .catch(error => {
        console.log(
          '-------error getAnswer------>>>',
          error?.response?.data?.message,
        );
      });
  };

  const getAnswerofquestion = item => {
    setSelectedQuestion(item.question);
    const currentDate = new Date().toISOString();
    dispatch(
      setNetAnswer({
        message: item.question,
        from: 'question',
        date: currentDate,
      }),
    );
    handleAnswer(item.id);
    if (scrollViewRef.current) {
      console.log('scroll tpo end ========================');
      scrollViewRef.current.scrollToEnd({animated: true}, 200);
    }
  };

  const submitQuery = async () => {
    setModalButtonLoading(true);
    const token = await _getStorage('token');
    const obj = {
      query: otherQuery,
    };
    console.log('obj of submitQuery', obj);
    axios
      .post(BASE_URL + `/addQuery`, obj, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        setModalButtonLoading(false);
        if (res.data.message == 'Query Sent successfully') {
          setOtherQuery('');
          setOtherQueryuModal(!otherQueryModal);
          Toast.showWithGravity(
            "Thank you for your query! We'll be in touch with you soon",
            Toast.LONG,
            Toast.BOTTOM,
          );
        }
        console.log('-------response submitQuery--->>>', res.data);
      })
      .catch(error => {
        setModalButtonLoading(false);

        if (
          error.response.data.message ==
          'chatbotQueries validation failed: query: Path `query` is required.'
        ) {
          Toast.showWithGravity(
            'Please provide a valid question',
            Toast.SHORT,
            Toast.BOTTOM,
          );
        }
        console.log('-------error submitQuery------>>>', error.response.data);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#ffff'}}>
      <Header
        bgColor={Colors.topNavbarColor}
        color={Colors.white}
        title="Chat Support"
        onPress={() => navigation.goBack('')}
      />
      {loading ? (
        <View
          style={{
            height: '80%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color={Colors.deepSafron} size={33} />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <ScrollView ref={scrollViewRef}>
            <View
              style={{
                backgroundColor: Colors.lightGray,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#fff', fontWeight: '700', fontSize: 14}}>
                Please pick a question that matches your issue
              </Text>
            </View>
            <View
              style={
                {
                  // // backgroundColor: '#fff',
                  // alignSelf: 'flex-start',
                  // marginBottom: 4,
                  // marginRight: 8,
                  // padding: 9,
                  // borderRadius: 5,
                  // borderBottomLeftRadius: 5,
                  // borderBottomRightRadius: 5,
                  // marginLeft: 8,
                  // marginTop: 12,
                  // // elevation: 3,
                  // marginTop: 10,
                  // position: 'relative',
                }
              }>
              <View
                style={{
                  borderBottomColor: Colors.lightGray,
                  borderBottomWidth: 1,
                  // marginBottom: ,
                  paddingBottom: 15,
                }}>
                {chatQuestion.map((item, index) => {
                  console.log(item);
                  return (
                    <View
                      style={{
                        // backgroundColor: Colors.lightGray,
                        alignItems: 'flex-start',
                        // maxWidth: '85%',
                        // height: '19%',
                      }}>
                      <TouchableOpacity
                        onPress={() => getAnswerofquestion(item)}
                        style={{
                          backgroundColor: '#fff',
                          alignSelf:
                            item.from == 'answer' ? 'flex-end' : 'flex-start',
                          marginBottom: 4,
                          // marginRight: 8,
                          paddingLeft: 10,
                          paddingRight: 40,
                          paddingVertical: 18,
                          borderRadius: 5,
                          borderBottomLeftRadius: 5,
                          // item.from == 'answer' ? 19 : 2,
                          borderBottomRightRadius: 5,
                          // item.from == 'answer' ? 2 : 19,
                          marginTop: 12,
                          elevation: 1,
                          marginTop: 10,
                          position: 'relative',
                          marginRight: 8,
                          marginLeft: 8,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#000',
                            fontWeight: '600',
                            // marginLeft: 4,
                            // marginHorizontal: 20,
                            // marginRight: 30,
                          }}>
                          {item.question}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
                {/* {==================other query====================} */}
                <TouchableOpacity
                  onPress={() => setOtherQueryuModal(!otherQueryModal)}
                  style={{
                    backgroundColor: '#fff',
                    alignSelf: 'flex-start',
                    // item.from == 'answer' ? 'flex-end' : 'flex-start',
                    marginBottom: 4,
                    // marginRight: 8,
                    paddingLeft: 10,
                    paddingRight: 40,
                    paddingVertical: 18,
                    borderRadius: 5,
                    borderBottomLeftRadius: 5,
                    // item.from == 'answer' ? 19 : 2,
                    borderBottomRightRadius: 5,
                    // item.from == 'answer' ? 2 : 19,
                    marginTop: 12,
                    elevation: 1,
                    marginTop: 10,
                    position: 'relative',
                    marginRight: 8,
                    marginLeft: 8,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#000',
                      fontWeight: '600',
                      // marginLeft: 4,
                      // marginHorizontal: 20,
                      // marginRight: 30,
                    }}>
                    Other query
                  </Text>
                </TouchableOpacity>
                {/* {==================other query====================} */}
              </View>

              {/* <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={chatQuestion}
                renderItem={({item}) => (
                  console.log(item, 'item in flt list'),
                  (
                    <TouchableOpacity
                      style={{
                        // backgroundColor: 'red',
                        height: 50,
                        // maxWidth: '85%',
                        marginVertical: 10,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        paddingHorizontal: 15,
                        // borderRadius: 20,
                        borderTopRightRadius: 5,
                        borderBottomRightRadius: 5,
                      }}
                      onPress={() => getAnswerofquestion(item)}
                      >
                      <Text style={{color: Colors.black}}>{item.question}</Text>
                    </TouchableOpacity>
                  )
                )}
              /> */}
              <View style={{paddingBottom: 20, backgroundColor: '#fff'}}>
                <ScrollView>
                  {netAnswer.map((item, index) => {
                    console.log('IN MAP===>', item);
                    // if (item.from == 'user') {
                    //   console.log('user');
                    //}
                    return (
                      <View
                        key={index}
                        style={{
                          maxWidth: '85%',
                          backgroundColor:
                            item.from == 'answer' ? '#fff' : '#483d8b',
                          alignSelf:
                            item.from == 'answer' ? 'flex-end' : 'flex-start',
                          marginBottom: 4,
                          marginRight: 8,
                          paddingLeft: 10,
                          paddingRight: 40,
                          // paddingVertical: 10,
                          paddingBottom: 5,
                          paddingTop: 10,
                          borderRadius: 5,
                          borderBottomLeftRadius: 5,
                          // item.from == 'answer' ? 19 : 2,
                          borderBottomRightRadius: 5,
                          // item.from == 'answer' ? 2 : 19,
                          marginTop: 12,
                          elevation: 3,
                          marginTop: 10,
                          position: 'relative',
                          marginRight: 8,
                          marginLeft: 8,
                          // height: 9,
                        }}>
                        {item.message.answer ? (
                          <View>
                            <Text
                              style={{
                                fontSize: 17,
                                color: '#483d8b',
                                fontWeight: '600',
                                marginBottom: 20,
                              }}>
                              {item.message.answer}
                            </Text>
                            {/* <Text
                              style={{
                                width: 90,
                                position: 'absolute',
                                bottom: 0,
                                right: item.from == 'answer' ? null : 8,
                                left: item.from == 'answer' ? 6 : null,
                                fontSize: 12,
                                color:
                                  item.from == 'answer' ? '#483d8b' : '#fff',
                              }}>
                              {moment(item.dateMoment).format('hh:mm A')}
                            </Text> */}
                          </View>
                        ) : (
                          <View>
                            <Text
                              style={{
                                fontSize: 17,
                                color: '#fff',
                                fontWeight: '600',
                                // marginLeft: 4,
                                marginBottom: 20,
                              }}>
                              {item.message}
                            </Text>
                            {/* <Text
                              style={{
                                width: 90,
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                left: 0,
                                fontSize: 12,
                                color:
                                  item.from == 'answer' ? '#483d8b' : '#fff',
                              }}>
                              {moment(item.dateMoment).format('hh:mm A')}
                            </Text> */}
                          </View>
                        )}
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          </ScrollView>

          {/* ========================pther reason modal================ */}
          <Modal
            animationType="slide"
            transparent={false}
            visible={otherQueryModal}
            onRequestClose={() => {
              setOtherQueryuModal(!otherQueryModal);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View>
                  <Text style={[styles.modalText, {marginTop: 20}]}>
                    Please provide your inquiry.
                  </Text>

                  <View>
                    <TextInput
                      placeholderTextColor={Colors.lightGray}
                      placeholder="Type here..."
                      value={otherQuery}
                      onChangeText={text => setOtherQuery(text)}
                      style={{
                        height: 45,
                        borderWidth: 1,
                        paddingHorizontal: 15,
                        marginHorizontal: 15,
                        borderRadius: 5,
                        color: Colors.black,
                        marginTop: 30,
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 30,
                    // top: 20,
                    // marginVertical: 15,
                    marginBottom: 20,
                  }}>
                  <TouchableOpacity
                    style={{
                      borderColor: Colors.purple,
                      backgroundColor: Colors.purple,
                      height: height / 18,
                      width: width / 3.3,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 4,
                      borderWidth: 1,
                      // marginBottom: 3,
                    }}
                    onPress={submitQuery}>
                    {!modalButtonLoading ? (
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                          textAlign: 'center',
                        }}>
                        SUBMIT
                      </Text>
                    ) : (
                      <ActivityIndicator size={20} color={'#fff'} />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderColor: Colors.purple,
                      height: height / 18,
                      width: width / 3.3,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 4,
                      // borderColor: '#0EC01B',
                      borderWidth: 1,
                    }}
                    onPress={() => {
                      setOtherQueryuModal(!otherQueryModal);
                    }}>
                    <Text
                      style={{
                        color: Colors.purple,
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}>
                      CANCEL
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>

        // // {old code -================}
        // <FlatList
        //   style={{zIndex: -1, flex: 1}}
        //   inverted={true}
        //   keyExtractor={(_, index) => index.toString()}
        //   data={chatList}
        //   renderItem={({item}) => (
        //     <Msg
        //       incomingMsg={item.incomingMsg}
        //       msg={item.msg}
        //       sentMsg={item.sentMsg}
        //     />
        //   )}
        // />
        // // {old code -================}
      )}

      {/* <View style={{height: 20, backgroundColor: Colors.topNavbarColor}}></View> */}

      {/* <View style={Styles.typeMsgContainer}>
        <TextInput
          placeholderTextColor={Colors.lightpurple}
          style={Styles.typeMsgBox}
          value={msg}
          placeholder="Type here ..."
          onChangeText={val => setMsg(val)}
        />
        <TouchableOpacity
          style={[
            Styles.sendBtn,
            {backgroundColor: Colors.purple},
            // {backgroundColor: msg ? Colors.purple : 'grey'},
          ]}
          disabled={msg ? false : true}
          onPress={() => onSendMsg(msg)}>
          <FontAwesome name="send" color={'#fff'} size={21} />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default ChatBot;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalView: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    height: height / 3.5,
    justifyContent: 'space-between',
  },

  textStyle: {
    color: '#0EC01B',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  modalText: {
    textAlign: 'center',
    // top: -15,
    fontWeight: '700',
    fontSize: 17,
    color: Colors.black,
  },
});
