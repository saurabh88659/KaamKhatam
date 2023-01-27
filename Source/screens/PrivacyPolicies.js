import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import React from 'react';
import Header from '../ReusableComponents/Header';
import Colors from '../Assets/Constants/Colors';

const PrivacyPolicies = props => {
  return (
    <SafeAreaView>
      <Header
        bgColor={Colors.darkOrange}
        color={Colors.white}
        title="Privacy Policy"
        onPress={() => props.navigation.goBack()}
      />

      <ScrollView
        style={{marginHorizontal: 20}}
        contentContainerStyle={{paddingBottom: 90, marginTop: 10}}
        showsVerticalScrollIndicator={false}>
        <Text style={{}}>
          Lorem Ipsum is simply dummy text of the prinng and typeseng industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived not only five centuries,
          but also the leap into electronic typeseng, remaining essenally
          unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently
          with desktop publishing soware like Aldus PageMaker including versions
          of Lorem Ipsum. It is a long established fact that a reader will be
          distracted by the readable content of a page when looking at its
          layout. The point of using Lorem Ipsum is that it has a more-or-less
          normal distribuon of leers, as opposed to using 'Content here, content
          here', making it look like readable English. Many desktop publishing
          packages and web page editors now use Lorem Ipsum as their default
          model text, and a search for 'lorem ipsum' will uncover many web sites
          sll in their infancy. Various versions have evolved over the years,
          somemes by accident, somemes on purpose (injected humour and the like.
          There are many variaons of passages of Lorem Ipsum available, but the
          majority have suffered alteraon in some form, by injected humour, or
          randomised words which don't look even slightly believable. If you are
          going to use a passage of Lorem Ipsum, you need to be sure there isn't
          anything embarrassing hidden in the middle of text. All the Lorem
          Ipsum generators on the Internet tend to repeat predefined chunks as
          necessary, making this the first true generator on the Internet. It
          uses a diconary of over 200 Lan words, combined with a handful of
          model sentence structures, to generate Lorem Ipsum.
        </Text>

        <Text style={{margin: 10}}>HEDONIST ROOTS</Text>
        <Text style={{}}>
          Lorem Ipsum is simply dummy text of the prinng and typeseng industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived not only five centuries,
          but also the leap into electronic typeseng, remaining essenally
          unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently
          with desktop publishing soware like Aldus PageMaker including versions
          of Lorem Ipsum. It is a long established fact that a reader will be
          distracted by the readable content of a page when looking at its
          layout. The point of using Lorem Ipsum is that it has a more-or-less
          normal distribuon of leers, as opposed to using 'Content here, content
          here', making it look like readable English. Many desktop publishing
          packages and web page editors now use Lorem Ipsum as their default
          model text, and a search for 'lorem ipsum' will uncover many web sites
          sll in their infancy. Various versions have evolved over the years,
          somemes by accident, somemes on purpose (injected humour and the like.
          There are many variaons of passages of Lorem Ipsum available, but the
          majority have suffered alteraon in some form, by injected humour, or
          randomised words which don't look even slightly believable. If you are
          going to use a passage of Lorem Ipsum, you need to be sure there isn't
          anything embarrassing hidden in the middle of text. All the Lorem
          Ipsum generators on the Internet tend to repeat predefined chunks as
          necessary, making this the first true generator on the Internet. It
          uses a diconary of over 200 Lan words, combined with a handful of
          model sentence structures, to generate Lorem Ipsum.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicies;
