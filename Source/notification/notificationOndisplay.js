import notifee, {AndroidImportance, AndroidStyle} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

const NotificationOnScreen = async remoteMessage => {
  const channelId = await notifee.createChannel({
    id: 'default 4',
    name: 'Default Channel 4',
    importance: AndroidImportance.HIGH,
  });
  // Display a notification
  await notifee.displayNotification({
    title: remoteMessage.notification.title,
    body: remoteMessage.notification.body,
    android: {
      channelId,
      // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
    },
  });
  console.log('run completed');
};

const getDeviceToken = async () => {
  console.log('hello');
  const token = await messaging().getToken();
  // await setOfflineData(CONSTANTS.MOBILE_TOKEN, token);
  console.log('========Device Token=======', token);
  return token;
};

export async function notificationListeners() {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', remoteMessage);
    NotificationOnScreen(remoteMessage);
  });
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage,
    );
  });
  return unsubscribe;
}

export default NotificationOndisplay = {
  getDeviceToken,
  NotificationOnScreen,
};
