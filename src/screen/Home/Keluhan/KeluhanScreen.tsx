import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import HeaderDefault from '../../../utils/HeaderDefault';
import {DataTable} from 'react-native-paper';
import GetKeluhan from '../../../api/keluhan/GetKeluhan';
import AsyncStorage from '@react-native-community/async-storage';

interface KeluhanScreenProps {}

const KeluhanScreen = (props: KeluhanScreenProps) => {
  const navigation = useNavigation();
  const [idUser, setIdUser] = useState('');
  const [keluhan, setKeluhan] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      AsyncStorage.getItem('user').then((value: any) => {
        const data = JSON.parse(value);
        setIdUser(data[0].id_user);
        getKeluhan(data[0].id_user);
      });
    });
    return unsubscribe;
  }, []);

  const getKeluhan = (id_user: string) => {
    GetKeluhan(parseInt(id_user)).then((value) => {
      console.log(value);
      if (value.code == 200) {
        //console.log(value.data);
        setKeluhan(value.data);
      }
    });
  };
  return (
    <View style={styles.container}>
      <HeaderDefault title={'Daftar Keluhan'} />
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('TambahKeluhanScreen')}
          style={{
            paddingVertical: 20,
            paddingHorizontal: 20,
            marginVertical: 20,
            marginHorizontal: 20,
            backgroundColor: '#00ae3c',
            borderRadius: 4,
          }}>
          <Text style={{color: 'white', textAlign: 'center'}}>
            Tambah Keluhan
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={{flex: 0.4}}>No</DataTable.Title>
            <DataTable.Title style={{flex: 1.5}}>Nama keluhan</DataTable.Title>
            <DataTable.Title style={{flex: 0.8}}>Urgency</DataTable.Title>
            <DataTable.Title style={{flex: 0.8}}>Status</DataTable.Title>
            <DataTable.Title style={{flex: 0.8}}>Action</DataTable.Title>
          </DataTable.Header>
          {keluhan.length !== 0
            ? keluhan.map((item: any, index: number) => {
                return (
                  <DataTable.Row>
                    <DataTable.Cell style={{flex: 0.4}}>
                      <Text>{index + 1}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell style={{flex: 1.5}}>
                      <Text>{item.nama_keluhan}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell style={{flex: 0.8}}>
                      <Text>{item.urgency}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell style={{flex: 0.8}}>
                      <Text>
                        {item.status_keluhan == 0 ? 'Terdaftar' : 'Selesai'}
                      </Text>
                    </DataTable.Cell>
                    {/* <DataTable.Cell style={{flex: 0.8}}>
                      <Text>{index + 1}</Text>
                    </DataTable.Cell> */}
                    <View style={{flex: 0.8, justifyContent: 'center'}}>
                      <TouchableOpacity
                        // onPress={() =>
                        //   navigation.navigate('UploadScreen', {
                        //     no_pesanan: item.id_pemesanan,
                        //     jumlah_bayar: item.harga_bulanan,
                        //     id_kost: item.id_kost,
                        //   })
                        // }
                        style={{
                          backgroundColor: '#00AA13',
                          paddingVertical: 5,
                          paddingHorizontal: 10,
                        }}>
                        <Text style={{color: 'white', textAlign: 'center'}}>
                          Lihat
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </DataTable.Row>
                );
              })
            : null}
        </DataTable>
      </View>
    </View>
  );
};

export default KeluhanScreen;

const styles = StyleSheet.create({
  container: {},
});
