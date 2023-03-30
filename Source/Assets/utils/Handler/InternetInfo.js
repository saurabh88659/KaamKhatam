import {Platform} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export const checkInternetConnection = () => {
  return new Promise(resolve => {
    if (Platform.OS === 'android') {
      // For Android devices
      NetInfo.fetch().then(state => {
        // console.log(state);
        resolve(state.isInternetReachable);
      });
    } else {
      // For iOS devices
      const unsubscribe = NetInfo.addEventListener(state => {
        unsubscribe();
        resolve(state.isInternetReachable);
      });
    }
  });
};
