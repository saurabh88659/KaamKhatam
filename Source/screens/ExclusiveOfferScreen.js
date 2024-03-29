import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Share,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import HeaderBack from '../ReusableComponents/HeaderBack';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../Assets/Constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import {useEffect} from 'react';
import {BASE_URL} from '../Assets/utils/Restapi/Config';
import {_getStorage} from '../Assets/utils/storage/Storage';
import axios from 'axios';

const ExclusiveOfferScreen = ({navigation}) => {
  const [dealOfTheDayData, setDealOfTheDayData] = useState([]);
  const [loading, SetLoading] = useState(true);
  const UserData = useSelector(state => state.updateState.userData);
  console.log('UserData=======on ExclusiveOfferScreen', UserData.referralId);
  const shareContent = async () => {
    const appLink = 'https://example.com/your-app';
    const referralCode = UserData.referralId;
    try {
      const result = await Share.share({
        message: `REFERRAL CODE : ${referralCode} Unlock special offers! Join now: ${appLink}`,
      });
      if (result.action === Share.sharedAction) {
        console.log('Content shared successfully');
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing content:', error.message);
    }
  };

  const bookAnyService = async Item => {
    console.log('check Item of BookAnyService:', Item);
    navigation.navigate('Topservices', {Item});
  };
  //============================================DEAL OF THE DAY API==============================================================

  useEffect(() => {
    getDealOftheDay();
  }, []);

  const getDealOftheDay = async () => {
    SetLoading(true);
    const token = await _getStorage('token');
    axios
      .get(BASE_URL + `/dealOfTheDay`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(async res => {
        SetLoading(false);
        console.log(
          '#####Res of getDealOftheDay:=====>>',
          JSON.stringify(res.data),
        );
        setDealOfTheDayData(res.data?.services);
      })
      .catch(e => {
        SetLoading(false);
        console.log(
          'home screen catch error of getDealOftheDay',
          e.response?.data,
        );
      });
  };
  //============================================DEAL OF THE DAY API===============================
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <View
        style={{
          width: wp('100%'),
          height: hp('7%'),
          backgroundColor: Colors.white,
          paddingHorizontal: wp('3%'),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            hitSlop={{top: 20, bottom: 20, left: 500, right: 500}}
            // hitSlop={{top: 100, bottom: 100, left: 2000, right: 2000}}
            onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back"
              color={Colors.darkGray}
              //  color={props.color}
              size={hp('3.7%')}
            />
          </TouchableOpacity>
          <View
            style={{
              width: '90%',
              // backgroundColor: 'red',
              justifyContent: 'center',
              //   alignItems: 'center',
            }}>
            <Text
              numberOfLines={1}
              style={{
                // width: wp('58%'),
                fontWeight: 'normal',
                fontSize: hp('2.5%'),
                color: Colors.darkGray,
                paddingHorizontal: 12,
                // alignSelf: 'center',
              }}>
              Back
            </Text>
          </View>
        </View>
      </View>
      {/* {==========================================Main content============================================} */}
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={Colors.purple} size="large" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{}}>
          <View
            style={{
              // backgroundColor: 'red',
              flex: 1,
              paddingHorizontal: 15,
              paddingVertical: hp(2),
            }}>
            {/* {======================top image========================} */}
            <TouchableOpacity
              style={{
                backgroundColor: '#000',
                height: hp(33),
                width: '100%',
              }}>
              <Image
                resizeMode="cover"
                source={{uri: dealOfTheDayData[0]?.imageUrl}}
                style={{
                  width: '100%',
                  height: '100%',
                  // borderRadius: 10,
                }}
              />
            </TouchableOpacity>
            {/* {======================top image========================} */}

            {/* {====================deal of the day====================} */}
            <View style={{marginTop: hp(1.5)}}>
              <View style={{paddingVertical: hp(2), backgroundColor: '#fff'}}>
                <Text
                  style={{
                    color: Colors.darkGray,
                    fontSize: 16,
                    fontWeight: '400',
                  }}>
                  DEAL OF THE DAY
                </Text>
              </View>

              <FlatList
                horizontal={true} // Set to true for horizontal scrolling
                data={dealOfTheDayData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  console.log(
                    'I#####tem of deal of the dealOfTheDayData--->',
                    item.id,
                  ),
                  (
                    <TouchableOpacity
                      onPress={() => bookAnyService(item)}
                      style={{
                        // height: 200,
                        marginHorizontal: 10,
                        // width: '70%',
                        height: wp('46%'),
                        // borderRadius: 10,
                        borderWidth: 1.5,
                        borderColor: 'grey',
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={{uri: item.imageUrl}}
                          style={{
                            width: wp('35%'),
                            height: wp('32%'),
                            // borderRadius: 10,
                          }}
                        />
                        <Text
                          style={{
                            fontSize: hp('1.7%'),
                            fontWeight: 'bold',
                            marginTop: hp('1%'),
                            color: 'black',
                          }}>
                          {item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )
                )}
              />
            </View>
            {/* {====================deal of the day====================} */}
            {/* {========================REFER & WIN==============================} */}
            <View style={{marginTop: hp(1)}}>
              <View style={{paddingVertical: hp(2)}}>
                <Text
                  style={{
                    color: Colors.darkGray,
                    fontSize: 16,
                    fontWeight: '400',
                  }}>
                  REFER & WIN
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: '#000',
                  height: hp(30),
                  width: '100%',
                  // marginTop: hp(2),
                }}>
                <Image
                  resizeMode="cover"
                  // source={{uri: dealOfTheDayData[0]?.imageUrl}}
                  source={require('../Assets/Images/ReferAndEarn.png')}
                  style={{
                    width: '100%',
                    height: '100%',
                    // borderRadius: 10,
                  }}
                />
              </View>
            </View>
            {/* {========================REFER &` WIN==============================} */}

            <View style={{marginTop: hp(1)}}>
              <Text
                style={{
                  fontSize: 18,
                  color: Colors.black,
                  fontWeight: '500',
                  paddingTop: hp(1.5),
                  paddingBottom: hp(1),
                }}>
                Sharing is Winning
              </Text>
              <View style={{marginRight: wp(8)}}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '400',
                    color: Colors.darkGray,
                  }}>
                  bring a frind to KAAM KHATAM and win up to 1000 in cashback
                </Text>
              </View>

              <TouchableOpacity
                onPress={shareContent}
                style={{
                  marginTop: hp(1),
                  paddingBottom: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '500',
                    color: Colors.darkGray,
                    marginRight: 5,
                    letterSpacing: 0.8,
                  }}>
                  REFER NOW
                </Text>
                <AntDesign
                  name="arrowright"
                  size={22}
                  color={Colors.darkGray}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
      {/* {==========================================Main connent============================================} */}
    </View>
  );
};

export default ExclusiveOfferScreen;
const styles = StyleSheet.create({});
