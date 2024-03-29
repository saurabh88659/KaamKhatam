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
import RescheduleBooking from '../../screens/RescheduleBooking';
import EditMobileNumber from '../../screens/EditMobileNumber';
import MobileOtp from '../../screens/MobileOtp';
import ChatB3ot from '../../screens/ChatBotScreen/ChatBot';
import MyCartScreen from '../../screens/MyCartScreen';
import Mybooking from '../../screens/Mybooking';
import Mybooking2 from '../../screens/Mybooking2';
import ProfileScreen from '../../screens/ProfileScreen';
import EditProfileScreen from '../../screens/EditProfileScreen';
import ServicesRatingsilver from '../../screens/ServicesRatingsilver';
import ServicesRatinggold from '../../screens/ServicesRatinggold';
import ServicesRatingplatinum from '../../screens/ServicesRatingplatinum';
import CancelBooking from '../../screens/CancelBooking';
import Editaddress from '../../screens/Editaddress';
import ChatBot from '../../screens/ChatBotScreen/ChatBot';
import SearchService from '../../../SearchService';
import AddWalletBalance from '../../screens/AddWalletBalance';
import ConfirmationPayment from '../../screens/ConfirmationPayment';
import PayWithWalletScreen from '../../screens/PayWithWalletScreen';
import EditGmailScreen from '../../screens/EditGmailScreen';
import AllCategoryScreen from '../../screens/AllCategoryScreen';
import Topservices from '../../screens/Category/Topservices';
import CurrentMobileOtp from '../../screens/CurrentMobileOtp';
import AddAddress from '../../screens/AddAddress';
import EditSaveAdress from '../../screens/EditSaveAdress';
import NotificationSaved from '../../screens/NotificationSaved';
import ExclusiveOfferScreen from '../../screens/ExclusiveOfferScreen';

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
      <Stack.Screen
        name="EditMobileNumber"
        component={EditMobileNumber}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditGmailScreen"
        component={EditGmailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NotificationSaved"
        component={NotificationSaved}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SearchService"
        component={SearchService}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditSaveAdress"
        component={EditSaveAdress}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddAddress"
        component={AddAddress}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MobileOtp"
        component={MobileOtp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Location"
        component={Location}
        options={{headerShown: false}}
      />

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
        name="CurrentMobileOtp"
        component={CurrentMobileOtp}
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
        name="AddWalletBalance"
        component={AddWalletBalance}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AllCategoryScreen"
        component={AllCategoryScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CancelBooking"
        component={CancelBooking}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Mywallet"
        component={Mywallet}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Editaddress"
        component={Editaddress}
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
        name="Topservices"
        component={Topservices}
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
        name="PayWithWalletScreen"
        component={PayWithWalletScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RescheduleBooking"
        component={RescheduleBooking}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ConfirmationPayment"
        component={ConfirmationPayment}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChatBot"
        component={ChatBot}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyCartScreen"
        component={MyCartScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Mybooking"
        component={Mybooking}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Mybooking2"
        component={Mybooking2}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ServicesRatingsilver"
        component={ServicesRatingsilver}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ServicesRatingsilvergold"
        component={ServicesRatinggold}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ServicesRatingplatinum"
        component={ServicesRatingplatinum}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ExclusiveOfferScreen"
        component={ExclusiveOfferScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;
