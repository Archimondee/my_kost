import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Alert, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Form, Item, Label, Input} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Login from '../../api/Auth/Login';
import AsyncStorage from '@react-native-community/async-storage';
import {setItem as setLocal, getItem} from '../../utils/localStorage';
interface LoginScreenProps {}

const LoginScreen = (props: LoginScreenProps) => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [buttonState, setButtonState] = useState(false);
  const login = () => {
    setButtonState(true);
    let error = 0;
    if (username == '') {
      error += 1;
    }
    if (password == '') {
      error += 1;
    }

    if (error == 0) {
      Login(username, password).then((values) => {
        console.log(values.code);
        if (values.code == 200) {
          // console.log(values.code);
          //console.log(values.data);
          setLocal('user', values.data);
          Alert.alert('Login');
          navigation.navigate('Home');
          setButtonState(false);
          // AsyncStorage.setItem('user', JSON.stringify(values.data)).then(
          //   (value) => {
          //     console.log(value);
          //     Alert.alert('Login');
          //     setButtonState(false);
          //     navigation.navigate('Home');
          //   },
          // );
        } else {
          setButtonState(false);
          Alert.alert('Username / password salah');
        }
      });
    } else {
      setButtonState(false);
      Alert.alert('Periksa kembali form yang belum di isi.');
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{alignContent: 'center', alignItems: 'center', marginTop: 60}}>
        <Image
          source={require('../../assets/home-logo.jpg')}
          style={{height: 150, width: 150}}
        />
        <View style={{marginVertical: 20}}>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>My Kost App</Text>
        </View>
        <View style={{width: '100%', paddingLeft: 10, paddingRight: 20}}>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input onChangeText={(username) => setUsername(username)} />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
              />
            </Item>
          </Form>
          <View
            style={{
              marginVertical: 20,
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              onPress={login}
              disabled={buttonState}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 30,
                backgroundColor: '#00ae3c',
              }}>
              <Text style={{color: 'white'}}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {},
});
