import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import HeaderDefault from '../../../utils/HeaderDefault';
import {Form, Item, Label, Input} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import CheckPassword from '../../../api/Auth/CheckPassword';
import ChangePassword from '../../../api/Auth/ChangePassword';
import {useNavigation} from '@react-navigation/native';

interface ChangePasswordScreenProps {}

const ChangePasswordScreen = (props: ChangePasswordScreenProps) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [idUser, setIdUser] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem('user').then((value: any) => {
      const data = JSON.parse(value);
      //console.log(data[0].id_user);
      // getUser(data[0].id_user);
      setIdUser(data[0].id_user);
    });
  }, []);

  const submitPassword = () => {
    let error = 0;
    if (oldPassword == '') {
      error += 1;
    }
    if (newPassword == '') {
      error += 1;
    }

    if (confirmPassword !== newPassword) {
      error += 1;
    }

    if (error == 0) {
      //check password lama
      CheckPassword(parseInt(idUser), oldPassword).then((values) => {
        console.log(values);
        if (values.code == 200) {
          ChangePassword(parseInt(idUser), newPassword).then((value) => {
            console.log(value);
            if (value.code == 200) {
              Alert.alert(
                'Password telah diubah.\nLogin untuk memulainya kembali',
              );
              AsyncStorage.clear();
              navigation.navigate('Auth');
            } else {
              Alert.alert('Error');
            }
          });
        } else {
          Alert.alert('Password lama tidak sesuai');
        }
      });
      //submit
    } else {
      Alert.alert('Oops, look like something error');
    }
  };
  return (
    <View style={styles.container}>
      <HeaderDefault title={'Ubah Password'} />
      <Form>
        <Item floatingLabel>
          <Label>Password Lama</Label>
          <Input
            secureTextEntry={true}
            onChangeText={(oldPassword) => setOldPassword(oldPassword)}
          />
        </Item>
        <Item floatingLabel>
          <Label>Password Baru</Label>
          <Input
            secureTextEntry={true}
            onChangeText={(newPassword) => setNewPassword(newPassword)}
          />
        </Item>
        <Item floatingLabel>
          <Label>Konfirmasi Password</Label>
          <Input
            secureTextEntry={true}
            onChangeText={(confirmPassword) =>
              setConfirmPassword(confirmPassword)
            }
          />
        </Item>
      </Form>
      <TouchableOpacity
        onPress={submitPassword}
        style={{
          backgroundColor: '#00ae3c',
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginVertical: 20,
          alignSelf: 'center',
        }}>
        <Text style={{color: 'white'}}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {},
});
