import axios from 'axios';
import {api} from '../../utils/api';

const UploadPembayaran = async (
  id_pesanan: number,
  id_user: number,
  id_kost: number,
  tgl_bayar: string,
  nomor_rekening: string,
  nama_rekening: string,
  nama_bank: string,
  nominal: string,
  img_pembayaran: string,
) => {
  //console.log(`${api.url}/user/get_user.php`);
  const result = await axios
    .post(`${api.url}/pembayaran/upload_pembayaran.php`, {
      id_pesanan: id_pesanan,
      id_user: id_user,
      id_kost: id_kost,
      tgl_bayar: tgl_bayar,
      nomor_rekening: nomor_rekening,
      nama_rekening: nama_rekening,
      nama_bank: nama_bank,
      nominal: nominal,
      img_pembayaran: img_pembayaran,
    })
    .then(({data}) => {
      //console.log(data);
      return data;
    })
    .catch((err) => err);
  return result;
};

export default UploadPembayaran;
