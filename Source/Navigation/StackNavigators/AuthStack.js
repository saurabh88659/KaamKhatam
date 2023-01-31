import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../../screens/Splash';
import Login from '../../screens/Login';
import Otp from '../../screens/Otp';
import RegisterAccount from '../../screens/RegisterAccount';
import Location from '../../screens/Location';
import DrowerNavigation from '../DrowerNavigation';
import Faqs from '../../screens/Faqs';
import Support from '../../screens/Support';
import Abouts from '../../screens/Abouts';
import Termsandconditions from '../../screens/Termsandconditions';
import PrivacyPolicies from '../../screens/PrivacyPolicies';
import Viewdetails from '../../screens/Viewdetails';
import Mywallet from '../../screens/Mywallet';
import Subcategory from '../../screens/Category/Subcategory';
import Subcategory2 from '../../screens/Category/Subcategory2';
import Services from '../../screens/Category/Services';
import TimeAndSlot from '../../screens/TimeAndSlot';
import PaymentScreen from '../../screens/PaymentScreen';

const Stack = createNativeStackNavigator();
function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Otp" component={Otp} options={{headerShown: false}} />
      <Stack.Screen
        name="RegisterAccount"
        component={RegisterAccount}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="Location"
        component={Location}
        options={{headerShown: false}}
      /> */}

      <Stack.Screen
        name="DrowerNavigation"
        component={DrowerNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Faqs"
        component={Faqs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Support"
        component={Support}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Abouts"
        component={Abouts}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Termsandconditions"
        component={Termsandconditions}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PrivacyPolicies"
        component={PrivacyPolicies}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Viewdetails"
        component={Viewdetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Mywallet"
        component={Mywallet}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Subcategory"
        component={Subcategory}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Subcategory2"
        component={Subcategory2}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Services"
        component={Services}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TimeAndSlot"
        component={TimeAndSlot}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;
