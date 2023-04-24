import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../Constants/Colors';

const InternetInfoall = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return !isConnected ? (
    <View style={styles.errorContainer}>
      <MaterialCommunityIcons
        name="access-point-network-off"
        size={28}
        color={Colors.white}
      />
      <Text style={styles.errorMessage}>No internet connection</Text>
    </View>
  ) : null;
};

export default InternetInfoall;

const styles = StyleSheet.create({
  errorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'red',
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  errorMessage: {
    color: 'white',
    fontSize: 13,
    fontWeight: '500',
    left: 10,
  },
});
