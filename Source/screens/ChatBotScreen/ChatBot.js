import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
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
import {useDispatch, useSelector} from 'react-redux';
import {
  setChatAnswer,
  setChatQuestion,
  setNetAnswer,
} from '../../features/updatedata/update.reducer';
import {ScrollView} from 'react-native-gesture-handler';

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
        // setLoading(false);
        console.log('-------response getAnswer--->>>', res.data.answer);
        dispatch(setNetAnswer({message: res.data, from: 'answer'}));

        // setAnswers(res.data.answer);
        dispatch(setChatAnswer(res.data.answer));
      })
      .catch(error => {
        // setLoading(false);
        console.log(
          '-------error getAnswer------>>>',
          error.response.data.message,
        );
      });
  };

  const getAnswerofquestion = item => {
    setSelectedQuestion(item.question);
    dispatch(setNetAnswer({message: item.question, from: 'question'}));
    handleAnswer(item.id);
    if (scrollViewRef.current) {
      console.log('scroll tpo end ========================');
      scrollViewRef.current.scrollToEnd({animated: true}, 200);
    }

    // scrollViewRef.current.
    // scrollViewRef.current.scrollToEnd({animated: true});
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
                          elevation: 3,
                          marginTop: 10,
                          position: 'relative',
                          marginRight: 8,
                          marginLeft: 8,
                        }}>
                        {item.message.answer ? (
                          <Text
                            style={{
                              fontSize: 16,
                              color: '#483d8b',
                              fontWeight: '600',
                              // marginLeft: 4,
                            }}>
                            {item.message.answer}
                          </Text>
                        ) : (
                          <Text
                            style={{
                              fontSize: 16,
                              color: '#fff',
                              fontWeight: '600',
                              // marginLeft: 4,
                            }}>
                            {item.message}
                          </Text>
                        )}
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          </ScrollView>
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
