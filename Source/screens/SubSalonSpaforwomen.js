import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';
import GreenHeader from '../ReusableComponents/GreenHeader';
import AddCart from '../ReusableComponents/AddCart';
import Reusablecss from '../Assets/Css/Reusablecss';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import {RadioButton} from 'react-native-paper';
import CustomButton from '../ReusableComponents/Button';
import {BASE_URL} from '../Assets/utils/Restapi/Config';
import {_getStorage} from '../Assets/utils/storage/Storage';
const {width, height} = Dimensions.get('window');

const SubSalonSpaforwomen = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [gender, setGender] = useState('');
  const [services, setServices] = useState('');
  const preData = props.route.params;

  console.log('service========444444444444444==========', preData);

  useEffect(() => {
    service();
  }, []);

  const service = async () => {
    const token = await _getStorage('token');

    axios
      .get(BASE_URL + `/category/subcategory2Service/${preData._id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(rep => {
        console.log('services ', rep.data);
        setServices(res.data.result);
        // setIsLoading(false);
      })
      .catch(error => {
        console.log('servise catch error', error.response.data);
        setIsLoading(false);
      });
  };

  const rediobottom = () => {
    console.log('hey');
  };

  return (
    <View style={Reusablecss.container}>
      <Header
        bgColor={Colors.darkOrange}
        color={Colors.black}
        title={preData.name}
        onPress={() => props.navigation.goBack('')}
      />
      {isLoading ? (
        <View
          style={{
            minHeight: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color={Colors.darkOrange} size="large" />
        </View>
      ) : (
        <View>
          <GreenHeader title="Sanitised tool, single-use products & sachets " />
          <View style={Reusablecss.cntrContainer}>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              data={services}
              renderItem={({item}) => (
                <View style={Reusablecss.card}>
                  <View style={Reusablecss.cardItem}>
                    <Text style={Reusablecss.title}>{item.name}</Text>
                    <View style={Reusablecss.ratingCntr}>
                      <FontAwesome5Icon
                        name="star"
                        solid
                        size={hp('2%')}
                        color={Colors.lightYellow}
                      />
                      <Text style={Reusablecss.ratingBar}>{item.rating}</Text>
                    </View>
                    <View style={Reusablecss.priceCntr}>
                      <Text style={Reusablecss.img}>INR</Text>

                      <Text style={Reusablecss.priceBar}>{item.price}</Text>
                      <Text style={Reusablecss.timing}>{item.time}</Text>
                    </View>
                    <Text style={{top: -5}}>
                      .........................................................
                    </Text>
                    <View style={Reusablecss.dataCntr}>
                      <Image
                        source={require('../Assets/Images/Ellipse1.png')}
                      />
                      <Text style={Reusablecss.data}>{item.description}</Text>
                    </View>
                    <View style={Reusablecss.dataCntr}>
                      <Image
                        source={require('../Assets/Images/Ellipse1.png')}
                        style={{opacity: item.d2 === undefined ? 0 : 1}}
                      />
                      <Text style={Reusablecss.data}>{item.description}</Text>
                    </View>
                  </View>
                  <View style={Reusablecss.imgCntr}>
                    <Image
                      resizeMode="contain"
                      source={item.image}
                      style={Reusablecss.innerImage}
                    />
                    <TouchableOpacity
                      onPress={() => setModalVisible(true)}
                      style={Reusablecss.imgButton}>
                      <Text style={Reusablecss.btnText}>ADD +</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
          <AddCart items={2} />
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
          // onPress = {onclick};
        }}>
        <View style={Styles.centeredView}>
          <View style={Styles.modalView}>
            <View style={{}}>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                style={{
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    borderColor: '#707070',
                    marginVertical: 5,
                    borderBottomWidth: 7,
                    width: width / 4,
                    borderRadius: 5,
                  }}></View>
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={{
                  color: Colors.black,
                  fontWeight: 'bold',
                  marginHorizontal: 20,
                  fontSize: 17,
                  top: 5,
                }}>
                Choose a service plan
              </Text>
            </View>

            <View
              style={{
                marginHorizontal: 15,
                marginVertical: 25,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  backgroundColor: Colors.silver,
                  height: 70,
                  width: 70,
                  borderRadius: 50,
                }}></View>
              <View style={{marginRight: '20%'}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  Silver services
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../Assets/Images/Ellipse1.png')}
                    style={{marginVertical: 10}}
                  />
                  <Text style={{marginHorizontal: 5, top: 3}}>
                    Less experienced
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../Assets/Images/Ellipse1.png')}
                    style={{top: 4}}
                  />
                  <Text style={{marginHorizontal: 5, top: -3}}>
                    Less Equiped
                  </Text>
                </View>
                <Text
                  style={{
                    marginHorizontal: 5,
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  INR 1000
                </Text>
              </View>
              <View style={{top: 20}}>
                <RadioButton
                  name="1"
                  value="1"
                  status={gender === '1' ? 'checked' : 'unchecked'}
                  // onPress={() => {
                  //   setGender('1');

                  // }}
                  onPress={rediobottom}
                />
              </View>
            </View>

            <View
              style={{
                marginHorizontal: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  backgroundColor: Colors.lightgold,
                  height: 70,
                  width: 70,
                  borderRadius: 50,
                }}></View>
              <View style={{marginRight: '20%'}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  Gold services
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../Assets/Images/Ellipse1.png')}
                    style={{marginVertical: 10}}
                  />
                  <Text style={{marginHorizontal: 5, top: 3}}>
                    Less experienced
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../Assets/Images/Ellipse1.png')}
                    style={{top: 4}}
                  />
                  <Text style={{marginHorizontal: 5, top: -3}}>
                    Less Equiped
                  </Text>
                </View>
                <Text
                  style={{
                    marginHorizontal: 5,
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  INR 2000
                </Text>
              </View>
              <View style={{top: 20}}>
                <RadioButton
                  name="2"
                  value="2"
                  status={gender === '2' ? 'checked' : 'unchecked'}
                  onPress={() => setGender('2')}
                />
              </View>
            </View>
            <View
              style={{
                marginHorizontal: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
              }}>
              <View
                style={{
                  backgroundColor: Colors.lightblue,
                  height: 70,
                  width: 70,
                  borderRadius: 50,
                }}></View>
              <View style={{marginRight: '10%'}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  Platinum services
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../Assets/Images/Ellipse1.png')}
                    style={{marginVertical: 10}}
                  />
                  <Text style={{marginHorizontal: 5, top: 3}}>
                    More than 4-5 years of{'\n'} experience
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../Assets/Images/Ellipse1.png')}
                    style={{top: 5}}
                  />
                  <Text style={{marginHorizontal: 5}}>
                    All types of machines &{'\n'}equipments
                  </Text>
                </View>
                <Text
                  style={{
                    marginHorizontal: 5,
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  INR 3000
                </Text>
              </View>
              <View style={{top: 20}}>
                <RadioButton
                  name="3"
                  value="3"
                  status={gender === '3' ? 'checked' : 'unchecked'}
                  onPress={() => setGender('3')}
                />
              </View>
            </View>
          </View>
        </View>
           <View style={{alignItems: 'center', top: '1%'}}>
          <CustomButton
            title={'Next'}
            bgColor={Colors.darkGreen}
            width={wp('90%')}
            height={hp('7%')}
            color={Colors.white}
            onPress={() => props.navigation.navigate('AddSalonforwomen')}
            // onPress={onPressotpVerification}
          />
        </View>
      </Modal>
    </View>
  );
};

export default SubSalonSpaforwomen;

const Styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    width: width,
    height: height,
    bottom: '-12%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: 'white',
    width: width,
    height: height / 1.4,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,

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
