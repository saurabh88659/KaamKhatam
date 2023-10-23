import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './Source/Navigation/StackNavigators/AuthStack';
import {Provider, useSelector} from 'react-redux';
import {store} from './Source/app/store';
import SearchService from './SearchService';
import {PersistGate} from 'redux-persist/integration/react';
import ConfirmationPayment from './Source/screens/ConfirmationPayment';
import PayWithWalletScreen from './Source/screens/PayWithWalletScreen';
import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';
import notificationOndisplay, {
  notificationListeners,
} from './Source/notification/notificationOndisplay';

function App() {
  useEffect(() => {
    // console.log("code test")
    geteviceToken();
    HandleNotificationOndisplay();
  }, []);

  const geteviceToken = async () => {
    const token = await notificationOndisplay.getDeviceToken();
    console.log(token, '===================================----====+++++###');
  };
  const HandleNotificationOndisplay = () => {
    // notificationOndisplay.NotificationOnScreen();
    notificationListeners();
  };
  return (
    <NavigationContainer>
      <AuthStack />
      {/* <ConfirmationPayment /> */}
      {/* <PayWithWalletScreen /> */}
    </NavigationContainer>
  );
}

const AppWapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWapper;
