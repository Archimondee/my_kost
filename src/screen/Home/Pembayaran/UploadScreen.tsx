import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Alert, Image} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import HeaderDefault from '../../../utils/HeaderDefault';
import {Form, Item, Label, Input} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import {image} from '../../../utils/ImageDefault';
import UploadPembayaran from '../../../api/member/UploadPembayaran';
import moment from 'moment';

interface UploadScreenProps {}

const UploadScreen = ({navigation, route}: any) => {
  const {no_pesanan, jumlah_bayar, id_kost} = route.params;
  const [nama, setNama] = useState('');
  const [foto, setFoto] = useState(image.atm);
  const [userId, setUserId] = useState('');

  const [noRek, setNoRek] = useState('');
  const [namaBank, setNamaBank] = useState('');
  const [namaRek, setNamaRek] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then((value: any) => {
      const data = JSON.parse(value);
      setNama(data[0].nama_user);
      setUserId(data[0].id_user);
    });
    console.log(moment().format('YYYY[-]MM[-]DD'));
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
        //console.log(response.type);
        //useFoto(response.data);
        setFoto('data:' + response.type + ';base64,' + response.data);
      }
    });
  };

  const submit = () => {
    let tgl = moment().format('YYYY[-]MM[-]DD');
    let error = 0;
    if (noRek == '') {
      error += 1;
    } else {
      error = 0;
    }

    if (namaBank == '') {
      error += 1;
    } else {
      error = 0;
    }

    if (namaRek == '') {
      error += 1;
    } else {
      error = 0;
    }
    if (error == 0) {
      UploadPembayaran(
        parseInt(no_pesanan),
        parseInt(userId),
        parseInt(id_kost),
        tgl,
        noRek,
        namaRek,
        namaBank,
        jumlah_bayar,
        foto,
      ).then((value) => {
        if (value.code == 200) {
          Alert.alert(
            'Pembayaran anda sedang di proses. \nTerimakasih telah membayar.',
          );
          navigation.navigate('PembayaranScreen');
        } else {
          Alert.alert('Error');
        }
      });
    } else {
      Alert.alert('Oops terjadi kesalahan');
    }
  };
  return (
    <View style={styles.container}>
      <HeaderDefault title={'Upload Bukti'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{uri: foto}}
          style={{
            height: 150,
            width: 150,
            //backgroundColor: 'red',
            alignSelf: 'center',
            marginTop: 50,
          }}
        />
        <TouchableOpacity
          onPress={openImagePicker}
          style={{
            alignSelf: 'center',
            paddingVertical: 10,
            paddingHorizontal: 30,
            backgroundColor: '#00ae3c',
            marginTop: 20,
          }}>
          <Text style={{color: 'white'}}>Upload</Text>
        </TouchableOpacity>
        <View style={{width: '100%', paddingLeft: 10, paddingRight: 20}}>
          <Form>
            <Item floatingLabel>
              <Label>Nama</Label>
              <Input disabled value={nama} />
            </Item>
            <Item floatingLabel>
              <Label>No Pesanan</Label>
              <Input disabled value={'P000' + no_pesanan} />
            </Item>
            <Item floatingLabel>
              <Label>Jumlah</Label>
              <Input disabled value={'Rp. ' + jumlah_bayar} />
            </Item>
            <Item floatingLabel>
              <Label>No Rekening</Label>
              <Input onChangeText={(noRek) => setNoRek(noRek)} />
            </Item>
            <Item floatingLabel>
              <Label>Nama Bank</Label>
              <Input onChangeText={(namaBank) => setNamaBank(namaBank)} />
            </Item>
            <Item floatingLabel>
              <Label>Nama Rekening</Label>
              <Input onChangeText={(namaRek) => setNamaRek(namaRek)} />
            </Item>
          </Form>
          <View
            style={{
              marginVertical: 20,
              marginBottom: 90,
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              onPress={submit}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 30,
                backgroundColor: '#00ae3c',
              }}>
              <Text style={{color: 'white'}}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UploadScreen;

const styles = StyleSheet.create({
  container: {},
});
