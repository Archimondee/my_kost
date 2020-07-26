import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import HeaderDefault from '../../../utils/HeaderDefault';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import CekPembayaran from '../../../api/member/CekPembayaran';
import AsyncStorage from '@react-native-community/async-storage';
import {DataTable} from 'react-native-paper';

interface PembayaranScreenProps {}

const PembayaranScreen = ({navigation, route}: any) => {
  //const navigation = useNavigation();
  const [dataPembayaran, setDataPembayaran] = useState([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      AsyncStorage.getItem('user').then((value: any) => {
        const data = JSON.parse(value);
        //console.log(data[0].id_user);
        cekPembayaran(data[0].id_user);
      });
    });

    return unsubscribe;
  }, [navigation]);

  const cekPembayaran = (id_user: number) => {
    CekPembayaran(id_user).then((value) => {
      //console.log(value);
      if (value.code == 200) {
        //console.log(value.data);
        setDataPembayaran(value.data);
      } else {
        Alert.alert('Tidak ada transaksi');
      }
    });
  };
  return (
    <View style={styles.container}>
      <HeaderDefault title={'Pembayaran'} />

      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={{flex: 0.4}}>No</DataTable.Title>
          <DataTable.Title style={{flex: 1.5}}>Nama Pembayaran</DataTable.Title>
          <DataTable.Title style={{flex: 0.8}}>Bulan</DataTable.Title>
          <DataTable.Title style={{flex: 1}}>Status</DataTable.Title>
          <DataTable.Title style={{flex: 0.8}}>Action</DataTable.Title>
        </DataTable.Header>
        {dataPembayaran.length !== 0
          ? dataPembayaran.map((item: any, index) => {
              return (
                <DataTable.Row>
                  <DataTable.Cell style={{flex: 0.4}}>
                    <Text>{index + 1}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={{flex: 1.5}}>
                    <Text>{item.pesan}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={{flex: 0.8}}>
                    <Text>{item.tagihan_bulan}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={{flex: 1}}>
                    <Text>
                      {item.status_pesanan == 0
                        ? 'Belum'
                        : item.status_pesanan == 1
                        ? 'Proses'
                        : item.status_pesanan == 2
                        ? 'Selesai'
                        : ''}
                    </Text>
                  </DataTable.Cell>
                  <View style={{flex: 0.8, justifyContent: 'center'}}>
                    {item.status_pesanan == 0 ? (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('UploadScreen', {
                            no_pesanan: item.id_pemesanan,
                            jumlah_bayar: item.harga_bulanan,
                            id_kost: item.id_kost,
                          })
                        }
                        style={{
                          backgroundColor: '#00AA13',
                          paddingVertical: 5,
                          paddingHorizontal: 10,
                        }}>
                        <Text style={{color: 'white', textAlign: 'center'}}>
                          Bayar
                        </Text>
                      </TouchableOpacity>
                    ) : item.status_pesanan == 1 ? (
                      <TouchableOpacity
                        disabled
                        style={{
                          backgroundColor: 'gray',
                          paddingVertical: 5,
                          paddingHorizontal: 10,
                        }}>
                        <Text style={{color: 'white', textAlign: 'center'}}>
                          Bayar
                        </Text>
                      </TouchableOpacity>
                    ) : item.status_pesanan == 2 ? (
                      <TouchableOpacity
                        disabled
                        style={{
                          backgroundColor: 'gray',
                          paddingVertical: 5,
                          paddingHorizontal: 10,
                        }}>
                        <Text style={{color: 'white', textAlign: 'center'}}>
                          Bayar
                        </Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                </DataTable.Row>
              );
            })
          : null}
      </DataTable>
    </View>
  );
};

export default PembayaranScreen;

const styles = StyleSheet.create({
  container: {},
});
