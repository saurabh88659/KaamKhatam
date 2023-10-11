import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './Source/Navigation/StackNavigators/AuthStack';
import {Provider, useSelector} from 'react-redux';
import {store} from './Source/app/store';
import SearchService from './SearchService';
import {PersistGate} from 'redux-persist/integration/react';
import ConfirmationPayment from './Source/screens/ConfirmationPayment';
import PayWithWalletScreen from './Source/screens/PayWithWalletScreen';

function App() {
  // const UpdateState = useSelector(
  //   state => state.updateState.profiledataupdateState,
  // );

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
