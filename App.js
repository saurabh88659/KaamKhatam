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
import AddAddress from './Source/screens/AddAddress';
import RegisterAccount from './Source/screens/RegisterAccount';
import Editaddress from './Source/screens/Editaddress';
import EditSaveAdress from './Source/screens/EditSaveAdress';
import Viewdetails from './Source/screens/Viewdetails';
import NotificationSaved from './Source/screens/NotificationSaved';

function App() {
  // useEffect(() => {
  //   geteviceToken();
  //   HandleNotificationOndisplay();
  // }, []);
  // const geteviceToken = async () => {
  //   const token = await notificationOndisplay.getDeviceToken();
  //   console.log(token, '===================================----====+++++###');
  // };

  // const HandleNotificationOndisplay = () => {
  //   notificationListeners();
  // };

  return (
    <NavigationContainer>
      <AuthStack />
      {/* <ConfirmationPayment /> */}
      {/* <PayWithWalletScreen /> */}
      {/* <AddAddress /> */}
      {/* <RegisterAccount /> */}
      {/* <Editaddress /> */}
      {/* <EditSaveAdress /> */}
      {/* <NotificationSaved /> */}
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
