import axios from 'axios';
import {api} from '../../utils/api';

const EditUser = async (
  id_user: number,
  nama: string,
  telpon: string,
  alamat: string,
  foto: string,
) => {
  //console.log(`${api.url}/user/get_user.php`);
  const result = await axios
    .post(`${api.url}/user/edit_user.php`, {
      id_user: id_user,
      nama: nama,
      telpon: telpon,
      alamat: alamat,
      photo: foto,
    })
    .then(({data}) => {
      //console.log(data);
      return data;
    })
    .catch((err) => err);
  return result;
};

export default EditUser;
