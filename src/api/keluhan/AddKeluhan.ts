import axios from 'axios';
import {api} from '../../utils/api';

const AddKeluhan = async (
  id_user: number,
  id_kost: number,
  urgency: string,
  namaKeluhan: string,
  pesanKeluhan: string,
  tanggal_keluhan: string,
) => {
  //console.log(`${api.url}/auth/login.php`);
  const result = await axios
    .post(`${api.url}/keluhan/tambah_keluhan.php`, {
      id_user: id_user,
      id_kost: id_kost,
      urgency: urgency,
      nama_keluhan: namaKeluhan,
      pesan_keluhan: pesanKeluhan,
      tanggal_keluhan: tanggal_keluhan,
    })
    .then(({data}) => {
      //console.log(data);
      return data;
    })
    .catch((err) => err);
  return result;
};

export default AddKeluhan;
