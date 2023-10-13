/**
 * @format
 */

import {useEffect} from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notificationOndisplay from './Source/notification/notificationOndisplay';
// import {Provider as PaperProvider} from 'react-native-paper';

// import App from './AuthStack';

AppRegistry.registerComponent(appName, () => App);
