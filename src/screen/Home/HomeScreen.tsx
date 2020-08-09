import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import GetUser from '../../api/member/GetUser';

interface HomeScreenProps {}

const HomeScreen = (props: HomeScreenProps) => {
  const navigation = useNavigation();
  const [idUser, setIdUser] = useState(0);
  const [photo, setPhoto] = useState('');
  const [nama, setNama] = useState('');
  const [telpon, setTelpon] = useState('');

  const [namaKost, setNamaKost] = useState('');
  const [noKost, setNoKost] = useState('');
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      AsyncStorage.getItem('user').then((value: any) => {
        const data = JSON.parse(value);
        console.log(data[0].id_user);
        getUser(data[0].id_user);
        setIdUser(data[0].id_user);
        setPhoto(data[0].img);
        setNama(data[0].nama_user);
        setTelpon(data[0].no_telpon);
      });
    });
    return unsubscribe;
  }, [navigation]);

  const getUser = (id_user: number) => {
    GetUser(id_user).then((values) => {
      if (values.code == 200) {
        //console.log(values.data[0].nama_kost);
        setNamaKost(values.data[0].nama_kost);
        //setNoKost(values.data[0].no_kamar);
      }
    });
  };
  const logout = () => {
    AsyncStorage.clear();
    navigation.navigate('Auth');
  };
  return (
    <View style={styles.container}>
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
      <View style={{marginVertical: 20, alignSelf: 'center'}}>
        <Text style={{textAlign: 'center'}}>Nama : {nama}</Text>
        <Text style={{textAlign: 'center'}}>No Telpon : {telpon}</Text>
        {namaKost != '' ? (
          <Text style={{textAlign: 'center'}}>Nama Kost : {namaKost}</Text>
        ) : null}
        {/* <Text style={{textAlign: 'center'}}>
          Nama Kost : Nama Kost - No Kost
        </Text> */}
      </View>
      <View style={{flexDirection: 'row', marginHorizontal: 20}}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Pembayaran')}
            style={{
              backgroundColor: '#00ae3c',
              marginRight: 10,
              paddingVertical: 30,
              borderRadius: 4,
            }}>
            <Text style={{textAlign: 'center', color: 'white'}}>
              Pembayaran
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Keluhan')}
            style={{
              backgroundColor: '#00ae3c',
              marginRight: 10,
              paddingVertical: 30,
              borderRadius: 4,
            }}>
            <Text style={{textAlign: 'center', color: 'white'}}>Keluhan</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginHorizontal: 20, marginTop: 20}}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Pengaturan')}
            style={{
              backgroundColor: '#00ae3c',
              marginRight: 10,
              paddingVertical: 30,
              borderRadius: 4,
            }}>
            <Text style={{textAlign: 'center', color: 'white'}}>
              Pengaturan
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={logout}
            style={{
              backgroundColor: '#00ae3c',
              marginRight: 10,
              paddingVertical: 30,
              borderRadius: 4,
            }}>
            <Text style={{textAlign: 'center', color: 'white'}}>Keluar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {},
});
