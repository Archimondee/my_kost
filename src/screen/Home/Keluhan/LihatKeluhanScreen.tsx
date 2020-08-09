import AsyncStorage from '@react-native-community/async-storage';
import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import GetIdKost from '../../../api/keluhan/GetIdKost';
import GetIdKeluhan from '../../../api/keluhan/GetIdKeluhan';
import HeaderDefault from '../../../utils/HeaderDefault';

interface LihatKeluhanScreenProps {}

const LihatKeluhanScreen = ({navigation, route}: any) => {
  const {id_keluhan} = route.params;
  const [nama, setNama] = useState('');
  const [idKost, setIdKost] = useState('');
  const [detailKeluhan, setDetailKeluhan] = useState([]);
  const [detailKost, setDetailKost] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then((value: any) => {
      const data = JSON.parse(value);
      setNama(data[0].nama_user);
      getDetailKeluhan(data[0].id_user);
    });
  }, []);

  const getDetailKeluhan = (id_user: number) => {
    GetIdKeluhan(id_user, id_keluhan).then((value) => {
      //console.log(value);
      if (value.code == 200) {
        setDetailKeluhan(value.data);
        setIdKost(value.data[0].id_kost);
        getKost(value.data[0].id_kost);
      } else {
        Alert.alert('Oops, look like something error');
      }
    });
  };

  const getKost = (id_kost: number) => {
    GetIdKost(id_kost).then((value) => {
      if (value.code == 200) {
        setDetailKost(value.data);
      }
    });
  };
  return (
    <View style={styles.container}>
      <HeaderDefault title={'Detail Keluhan'} />
      <View style={{alignSelf: 'center'}}>
        <Text style={{fontSize: 18, paddingVertical: 20}}>Keluhan</Text>
      </View>
      {detailKeluhan.length != 0
        ? detailKeluhan.map((item: any, index: number) => {
            return (
              <View>
                <View style={{paddingHorizontal: 20}}>
                  <Text style={{paddingTop: 5}}>Nama : {nama}</Text>
                  <Text style={{paddingTop: 5}}>
                    Nama Kost :{' '}
                    {detailKost.length != 0
                      ? detailKost.map((item: any, index: number) => {
                          return item.nama_kost;
                        })
                      : '-'}
                  </Text>
                  <Text style={{paddingTop: 5}}>
                    Tanggal : {item.tanggal_keluhan}
                  </Text>
                  <Text style={{paddingTop: 5}}>
                    Status Keluhan :
                    {item.status_keluhan == 0 ? 'Terdaftar' : 'Selesai'}
                  </Text>
                </View>
                <View style={{paddingHorizontal: 20, paddingTop: 15}}>
                  <Text style={{paddingTop: 5}}>
                    Judul : {item.nama_keluhan}
                  </Text>
                  <Text style={{paddingTop: 5}}>
                    Keluhan : {item.pesan_keluhan}
                  </Text>
                </View>
              </View>
            );
          })
        : null}
    </View>
  );
};

export default LihatKeluhanScreen;

const styles = StyleSheet.create({
  container: {},
});
