import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './Source/Navigation/StackNavigators/AuthStack';
import {Provider, useSelector} from 'react-redux';
import {store} from './Source/app/store';

function App() {
  const UpdateState = useSelector(
    state => state.updateState.profiledataupdateState,
  );
  console.log(
    '=============================UpdateState=================',
    UpdateState,
  );
  return (
    <NavigationContainer>
      <AuthStack />
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

//export default App;
