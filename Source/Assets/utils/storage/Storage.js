import AsyncStorage from '@react-native-async-storage/async-storage';

const _setStorage = async (key, data) => {
  await AsyncStorage.setItem(key, data);
};

const _getStorage = async key => {
  const data = await AsyncStorage.getItem(key);
  if (data) {
    return data;
  } else return null;
};

export {_setStorage, _getStorage};
