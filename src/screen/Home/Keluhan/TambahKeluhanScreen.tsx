import {Picker} from '@react-native-community/picker';
import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import HeaderDefault from '../../../utils/HeaderDefault';
import {Form, Item, Label, Input, Textarea} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import GetUser from '../../../api/member/GetUser';
import moment from 'moment';
import AddKeluhan from '../../../api/keluhan/AddKeluhan';
import {useNavigation} from '@react-navigation/native';

interface TambahKeluhanScreenProps {}

const TambahKeluhanScreen = (props: TambahKeluhanScreenProps) => {
  const [urgency, setUrgency] = useState('Biasa');
  const [namaKeluhan, setNamaKeluhan] = useState('');
  const [pesanKeluhan, setPesanKeluhan] = useState('');
  const [idUser, setIdUser] = useState('');
  const [idKost, setIdKost] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem('user').then((value: any) => {
      const data = JSON.parse(value);
      //console.log(data[0].id_user);
      getUser(data[0].id_user);
      setIdUser(data[0].id_user);
    });
  }, []);

  const getUser = (id_user: number) => {
    GetUser(id_user).then((values) => {
      if (values.code == 200) {
        setIdKost(values.data[0].id_kost);
      }
    });
  };

  const submitKeluhan = () => {
    let error = 0;
    let tgl = moment().format('YYYY[-]MM[-]DD');
    if (namaKeluhan == '') {
      error += 1;
    }
    if (pesanKeluhan == '') {
      error += 1;
    }

    if (error == 0) {
      AddKeluhan(
        parseInt(idUser),
        idKost,
        urgency,
        namaKeluhan,
        pesanKeluhan,
        tgl,
      ).then((values) => {
        console.log(values);
        if (values.code == 200) {
          Alert.alert('Keluhan anda telah ditambahkan.\nTerimakasih.');
          navigation.goBack();
        } else {
          Alert.alert('Oops, look like something error.');
        }
      });
    } else {
      Alert.alert('Oops, check your form again.');
    }
  };
  return (
    <View style={styles.container}>
      <HeaderDefault title={'Tambah Keluhan'} />
      <View>
        <View
          style={{
            marginHorizontal: 20,
            marginVertical: 10,
          }}>
          <Text style={{marginVertical: 10}}>Tingkat Keluhan</Text>
          <Picker
            mode="dropdown"
            onValueChange={(itemValue: any, itemIndex: number) =>
              setUrgency(itemValue)
            }
            selectedValue={urgency}
            //selectedValue={this.state.language}
            style={{backgroundColor: 'gray', color: 'white'}}>
            <Picker.Item label="Biasa" value="Biasa" />
            <Picker.Item label="Sedang" value="Sedang" />
            <Picker.Item label="Darurat" value="Darurat" />
          </Picker>
          <Form style={{marginHorizontal: -10}}>
            <Item floatingLabel>
              <Label>Nama Keluhan</Label>
              <Input
                onChangeText={(namaKeluhan) => setNamaKeluhan(namaKeluhan)}
              />
            </Item>
            <View style={{marginVertical: 15, marginHorizontal: 10}}>
              <Text style={{paddingVertical: 10}}>Pesan Keluhan</Text>
              <Textarea
                onChangeText={(pesanKeluhan) => setPesanKeluhan(pesanKeluhan)}
                rowSpan={5}
                bordered
                placeholder="Keluhan"
                underline
              />
            </View>
          </Form>
          <TouchableOpacity
            onPress={submitKeluhan}
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
      </View>
    </View>
  );
};

export default TambahKeluhanScreen;

const styles = StyleSheet.create({
  container: {},
});
