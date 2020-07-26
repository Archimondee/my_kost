import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image, Alert} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import HeaderDefault from '../../../utils/HeaderDefault';
import {Form, Item, Label, Input, Textarea} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import EditUser from '../../../api/member/EditUser';
import GetIdUser from '../../../api/member/GetIdUser';

interface PengaturaScreenProps {}

const PengaturaScreen = (props: PengaturaScreenProps) => {
  const navigation = useNavigation();
  const [nama, setNama] = useState('');
  const [photo, setPhoto] = useState('');
  const [telpon, setTelpon] = useState('');
  const [username, setUsername] = useState('');
  const [alamat, setAlamat] = useState('');

  const [idUser, setIdUser] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then((value: any) => {
      const data = JSON.parse(value);
      //console.log(data[0].id_user);
      // getUser(data[0].id_user);
      setIdUser(data[0].id_user);
      setPhoto(data[0].img);
      setNama(data[0].nama_user);
      setTelpon(data[0].no_telpon);
      setUsername(data[0].username);
      setAlamat(data[0].alamat);
    });
  }, []);

  const openImagePicker = () => {
    ImagePicker.showImagePicker((response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        Alert.alert('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log(response.type);
        //useFoto(response.data);
        setPhoto('data:' + response.type + ';base64,' + response.data);
      }
    });
  };

  const saveData = () => {
    let error = 0;
    if (nama == '') {
      error += 1;
    }

    if (telpon == '') {
      error += 1;
    }

    if (alamat == '') {
      error += 1;
    }

    if (error == 0) {
      EditUser(parseInt(idUser), nama, telpon, alamat, photo).then((value) => {
        if (value.code == 200) {
          //Alert.alert('Success');
          console.log('value', value);
          GetIdUser(parseInt(idUser)).then((val) => {
            if (val.code == 200) {
              AsyncStorage.setItem('user', JSON.stringify(val.data)).then(() =>
                Alert.alert('Your change has been saved'),
              );
            }
          });
        } else {
          Alert.alert('Oops look like something error.');
        }
      });
    } else {
      Alert.alert('Oops, check your form again.');
    }
  };

  return (
    <View style={styles.container}>
      <HeaderDefault title={'Pengaturan'} />
      <ScrollView showsVerticalScrollIndicator={true}>
        <Image
          source={{uri: photo}}
          style={{
            height: 150,
            width: 150,
            //backgroundColor: 'red',
            alignSelf: 'center',
            marginTop: 50,
          }}
        />
        {/* 00ae3c */}
        <TouchableOpacity
          onPress={openImagePicker}
          style={{
            backgroundColor: '#00ae3c',
            paddingHorizontal: 20,
            paddingVertical: 10,
            marginVertical: 10,
            alignSelf: 'center',
          }}>
          <Text style={{color: 'white'}}>Upload foto</Text>
        </TouchableOpacity>

        <Form>
          <Item floatingLabel>
            <Label>Nama</Label>
            <Input onChangeText={(nama) => setNama(nama)} value={nama} />
          </Item>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input disabled value={username} />
          </Item>
          <TouchableOpacity
            style={{
              paddingTop: 15,
              //paddingHorizontal: 15,
              marginTop: 10,
              marginHorizontal: 15,
              borderBottomColor: 'gray',
              borderBottomWidth: 0.3,
            }}
            onPress={() => navigation.navigate('ChangePasswordScreen')}>
            <Text style={{fontSize: 16, color: 'gray', paddingBottom: 5}}>
              Ubah Password
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={{
              paddingTop: 15,
              paddingHorizontal: 15,
              marginTop: 10,
            }}
            onPress={() => navigation.navigate('ChangePasswordScreen')}>
            <Text style={{fontSize: 16, fontStyle: 'italic'}}>
              Ubah No Rekening
            </Text>
          </TouchableOpacity> */}

          <Item floatingLabel>
            <Label>No Telpon</Label>
            <Input
              onChangeText={(telpon) => setTelpon(telpon)}
              value={telpon}
            />
          </Item>
          <View style={{marginVertical: 15, marginHorizontal: 10}}>
            <Text style={{paddingVertical: 10, color: 'gray'}}>Alamat</Text>
            <Textarea
              onChangeText={(alamat) => setAlamat(alamat)}
              rowSpan={5}
              bordered
              value={alamat}
              underline
            />
          </View>
        </Form>
        <TouchableOpacity
          onPress={saveData}
          style={{
            backgroundColor: '#00ae3c',
            paddingHorizontal: 20,
            paddingVertical: 10,
            marginTop: 30,
            marginBottom: 80,
            alignSelf: 'center',
            borderRadius: 4,
          }}>
          <Text style={{color: 'white'}}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default PengaturaScreen;

const styles = StyleSheet.create({
  container: {},
});
