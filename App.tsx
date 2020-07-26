/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  YellowBox,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import LoginScreen from './src/screen/Auth/LoginScreen';
import HomeScreen from './src/screen/Home/HomeScreen';
import PembayaranScreen from './src/screen/Home/Pembayaran/PembayaranScreen';
import UploadScreen from './src/screen/Home/Pembayaran/UploadScreen';
import SplashScreen from './src/Splash/SplashScreen';
import PengaturaScreen from './src/screen/Home/Pengaturan/PengaturanScreen';
import ChangePasswordScreen from './src/screen/Home/Pengaturan/ChangePasswordScreen';
import KeluhanScreen from './src/screen/Home/Keluhan/KeluhanScreen';
import TambahKeluhanScreen from './src/screen/Home/Keluhan/TambahKeluhanScreen';
import LihatKeluhanScreen from './src/screen/Home/Keluhan/LihatKeluhanScreen';

declare const global: {HermesInternal: null | {}};

const App = () => {
  const Stack = createStackNavigator();
  YellowBox.ignoreWarnings(['']);
  const AuthStack = () => {
    return (
      <Stack.Navigator headerMode={'none'} initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    );
  };
  const HomeStack = () => {
    return (
      <Stack.Navigator headerMode={'none'} initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    );
  };
  const PembayaranStack = () => {
    return (
      <Stack.Navigator headerMode={'none'} initialRouteName="PembayaranScreen">
        <Stack.Screen name="PembayaranScreen" component={PembayaranScreen} />
        <Stack.Screen name="UploadScreen" component={UploadScreen} />
      </Stack.Navigator>
    );
  };
  const PengaturanStack = () => {
    return (
      <Stack.Navigator headerMode={'none'} initialRouteName="PembayaranScreen">
        <Stack.Screen name="PengaturanScreen" component={PengaturaScreen} />
        <Stack.Screen
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}
        />
      </Stack.Navigator>
    );
  };

  const KeluhanStack = () => {
    return (
      <Stack.Navigator headerMode={'none'} initialRouteName="PembayaranScreen">
        <Stack.Screen name="KeluhanScreen" component={KeluhanScreen} />
        <Stack.Screen
          name="TambahKeluhanScreen"
          component={TambahKeluhanScreen}
        />
        <Stack.Screen
          name="LihatKeluhanScreen"
          component={LihatKeluhanScreen}
        />
      </Stack.Navigator>
    );
  };
  return (
    <>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator headerMode={'none'} initialRouteName="Splash">
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Auth" component={AuthStack} />
            <Stack.Screen name="Home" component={HomeStack} />
            <Stack.Screen name="Pembayaran" component={PembayaranStack} />
            <Stack.Screen name="Pengaturan" component={PengaturanStack} />
            <Stack.Screen name="Keluhan" component={KeluhanStack} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
};

export default App;
