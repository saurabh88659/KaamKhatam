import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Booking from './Source/screens/Bleach';
import Pedicure from './Source/screens/Pedicure';
import ACServices from './Source/screens/ACServices';
import SalonWomen from './Source/screens/SalonWomen';
import SalonMen from './Source/screens/SalonMen';
import TherapiesWomen from './Source/screens/TherapiesWomen';
import WindowACcheckup from './Source/screens/WindowACcheckup';
import ProfileScreen from './Source/screens/ProfileScreen';
import Salonforwomen from './Source/screens/Salonforwomen';
import Support from './Source/screens/Support';
import PrivacyPolicies from './Source/screens/PrivacyPolicies';
import Abouts from './Source/screens/Abouts';
import Mywallet from './Source/screens/Mywallet';
import Termsandconditions from './Source/screens/Termsandconditions';
import ProfessionalCleaningServices from './Source/screens/ProfessionalCleaningServices';
import Mybooking from './Source/screens/Mybooking';
import InstallationUninstallation from './Source/screens/InstallationUninstallation';
import Electricians from './Source/screens/Electricians';
import HomeAppliancesRepairing from './Source/screens/HomeAppliancesRepairing';
import InverterStabilizer from './Source/screens/InverterStabilizer';
import InstallationScreen from './Source/screens/InstallationScreen';
import ServicesofWomenOnly from './Source/screens/ServicesofWomenOnly';
import SpaforWomen from './Source/screens/SpaforWomen';
import Editaddress from './Source/screens/Editaddress';
import Faqs from './Source/screens/Faqs';
import Viewdetails from './Source/screens/Viewdetails';
import ViewdetailsCancelled from './Source/screens/ViewdetailsCancelled';
import ViewdetailsPending from './Source/screens/ViewdetailsPending';
import UninstallationScreen from './Source/screens/UninstallationScreen';
import DisplayScreen from './Source/screens/DisplayScreen';
import SpeakerSoundScreen from './Source/screens/SpeakerSoundScreen';
import Logout from './Source/screens/Logout';
import SubElectrions from './Source/screens/SubElectrions';
import SubCleaning from './Source/screens/SubCleaning';
import SubAcService from './Source/screens/SubAcService';
import SubHomeApliances from './Source/screens/SubHomeApliances';
import SubMassageSalonformen from './Source/screens/SubMassageSalonformen';
import SubSalonSpaforwomen from './Source/screens/SubSalonSpaforwomen';
import SubSalonSpaforwomen2 from './Source/screens/SubSalonSpaforwomen2';
import Manicure from './Source/screens/Manicure';
import Chocolatewax from './Source/screens/Chocolatewax';
import Threading from './Source/screens/Threading';
import Mybooking2 from './Source/screens/Mybooking2';
import ServicesofMenOnly from './Source/screens/ServicesofMenOnly';
import SalonforMen from './Source/screens/SalonforMen';
import SubSalonSpaforMen from './Source/screens/SubSalonSpaforMen';
import CancelBooking from './Source/screens/CancelBooking';
import Bleach from './Source/screens/Bleach';
import Cleanup from './Source/screens/Cleanup';
import EditMobileNumber from './Source/screens/EditMobileNumber';
import MobileOtp from './Source/screens/MobileOtp';
import SGPservices from './Source/screens/SGPservices';
import Bottomsheetmodal from './Source/ReusableComponents/Bottomsheetmodal';
import Splash from './Source/screens/Splash';
import Login from './Source/screens/Login';
import Otp from './Source/screens/Otp';
import RegisterAccount from './Source/screens/RegisterAccount';
import Location from './Source/screens/Location';
import Home from './Source/screens/Home/Home';
import TabNavigation from './Navigation/TabNavigation';
import DrowerNavigation from './Navigation/DrowerNavigation';
import Subcategory from './Source/screens/Category.js/Subcategory';
import Subcategory2 from './Source/screens/Category.js/Subcategory2';
import Services from './Source/screens/Category.js/Services';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer
    //  independent={true}
    >
      <Stack.Navigator>
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
        <Stack.Screen
          name="Otp"
          component={Otp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegisterAccount"
          component={RegisterAccount}
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
          name="TabNavigation"
          component={TabNavigation}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ServicesofWomenOnly"
          component={ServicesofWomenOnly}
          options={{headerShown: false}}
        />

        {/* <Stack.Screen
          name="NavigationDrawerStructure"
          component={NavigationDrawerStructure}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="Booking"
          component={Booking}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Pedicure"
          component={Pedicure}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Manicure"
          component={Manicure}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ACServices"
          component={ACServices}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SalonWomen"
          component={SalonWomen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SalonMen"
          component={SalonMen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TherapiesWomen"
          component={TherapiesWomen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeAppliancesRepairing"
          component={HomeAppliancesRepairing}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WindowACcheckup"
          component={WindowACcheckup}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Termsandconditions"
          component={Termsandconditions}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Salonforwomen"
          component={Salonforwomen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Support"
          component={Support}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PrivacyPolicies"
          component={PrivacyPolicies}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Abouts"
          component={Abouts}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Mywallet"
          component={Mywallet}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProfessionalCleaningServices"
          component={ProfessionalCleaningServices}
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
          name="InstallationUninstallation"
          component={InstallationUninstallation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Electricians"
          component={Electricians}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="InverterStabilizer"
          component={InverterStabilizer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="InstallationScreen"
          component={InstallationScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ServicesofMenOnly"
          component={ServicesofMenOnly}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SpaforWomen"
          component={SpaforWomen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SalonforMen"
          component={SalonforMen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Editaddress"
          component={Editaddress}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Faqs"
          component={Faqs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Viewdetails"
          component={Viewdetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ViewdetailsCancelled"
          component={ViewdetailsCancelled}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ViewdetailsPending"
          component={ViewdetailsPending}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UninstallationScreen"
          component={UninstallationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DisplayScreen"
          component={DisplayScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SpeakerSoundScreen"
          component={SpeakerSoundScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Logout"
          component={Logout}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SubElections"
          component={SubElectrions}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SubCleaning"
          component={SubCleaning}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SubAcService"
          component={SubAcService}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SubHomeApliances"
          component={SubHomeApliances}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SubMassageSalonformen"
          component={SubMassageSalonformen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SubSalonSpaforwomen"
          component={SubSalonSpaforwomen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SubSalonSpaforwomen2"
          component={SubSalonSpaforwomen2}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SubSalonSpaforMen"
          component={SubSalonSpaforMen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Chocolatewax"
          component={Chocolatewax}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Threding"
          component={Threading}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CancelBooking"
          component={CancelBooking}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Bleach"
          component={Bleach}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Cleanup"
          component={Cleanup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditMobileNumber"
          component={EditMobileNumber}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MobileOtp"
          component={MobileOtp}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
          name="EditMobileSave"
          component={EditMobileSave}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="SGPservices"
          component={SGPservices}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Bottomsheetmodal"
          component={Bottomsheetmodal}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
