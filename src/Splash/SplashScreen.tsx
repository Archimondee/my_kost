import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import CheckUser from '../api/Auth/CheckUser';

interface SplashScreenProps {}

const SplashScreen = (props: SplashScreenProps) => {
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      checkLogin();
    });

    return unsubscribe;
  }, [navigation]);
  const checkLogin = () => {
    //console.log('Jalanan');
    AsyncStorage.getItem('user').then((value: any) => {
      const data = JSON.parse(value);
      //console.log(data);

      if (data !== null) {
        //console.log(data[0].username);
        CheckUser(data[0].username, data[0].password).then((values) => {
          //console.log(values);
          if (values.code == 200) {
            AsyncStorage.setItem('user', JSON.stringify(values.data)).then(() =>
              navigation.navigate('Home'),
            );
          } else {
            navigation.navigate('Auth');
          }
        });
      } else {
        navigation.navigate('Auth');
      }
    });
  };
  return (
    <View style={styles.container}>
      <Text>SplashScreen</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {},
});
