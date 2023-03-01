import 'react-native-gesture-handler';

import * as React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';

// import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import FirstPage from './Source/screens/pages/FirstPage';
import SecondPage from './Source/screens/pages/SecondPage';
import ThirdPage from './Source/screens/pages/ThirdPage';
import HomePage from './Source/screens/Home/Home';
import HeaderDrawer from './Source/ReusableComponents/HeaderDrawer';
import TabNavigationa from './Navigation/TabNavigation';
// Import Custom Sidebar
// import CustomSidebarMenu from './CustomSidebarMenu';
import CustomDrawerMenu from './CustomDrawerMenu';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = props => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <HeaderDrawer
        location="Office 906,A Tower ,Ithum ,Noida Sector 62"
        onPress={toggleDrawer}
      />
      {/* <TouchableOpacity onPress={toggleDrawer}>
       
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          }}
          style={{width: 25, height: 25, marginLeft: 5}}
        />
      </TouchableOpacity> */}
    </View>
  );
};
function HomeScreenStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="HomePage">
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{
          //headerShown: false,
          title: 'location', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
}

function firstScreenStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="FirstPage">
      <Stack.Screen
        name="FirstPage"
        component={FirstPage}
        options={{
          // headerShown: false,
          title: 'First Page', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),

          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
}

function secondScreenStack({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="SecondPage"
      screenOptions={{
        // headerShown: false,
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#f4511e', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="SecondPage"
        component={SecondPage}
        options={{
          title: 'Second Page', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
}

function thirdScreenStack({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="ThirdPage"
      screenOptions={{
        //headerShown: false,
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#f4511e', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="ThirdPage"
        component={ThirdPage}
        options={{
          title: 'Third Page', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    // <NavigationContainer>
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      // For setting Custom Sidebar Menu
      drawerContent={props => <CustomDrawerMenu {...props} />}>
      <Drawer.Screen
        name="HomePage"
        options={{
          drawerLabel: 'HomePage',
          // Section/Group Name
          groupName: 'Section 1',
          activeTintColor: '#e91e63',
        }}
        component={HomeScreenStack}
      />
      <Drawer.Screen
        name="FirstPage"
        options={{
          drawerLabel: 'First page Option',
          // Section/Group Name
          groupName: 'Section 1',
          activeTintColor: '#e91e63',
        }}
        component={TabNavigationa}
      />
      <Drawer.Screen
        name="SecondPage"
        options={{
          drawerLabel: 'Second page Option',
          // Section/Group Name
          groupName: 'Section 2',
          activeTintColor: '#e91e63',
        }}
        component={secondScreenStack}
      />
      <Drawer.Screen
        name="ThirdPage"
        options={{
          drawerLabel: 'Third page Option',
          // Section/Group Name
          groupName: 'Section 2',
          activeTintColor: '#e91e63',
        }}
        component={thirdScreenStack}
      />
    </Drawer.Navigator>
    //  </NavigationContainer>
  );
};

export default App;
