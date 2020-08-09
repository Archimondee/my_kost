import axios from 'axios';
import {api} from '../../utils/api';

const GetIdKeluhan = async (id_user: number, id_keluhan: number) => {
  //console.log(`${api.url}/auth/login.php`);
  const result = await axios
    .post(`${api.url}/keluhan/get_id_keluhan.php`, {
      id_user: id_user,
      id_keluhan: id_keluhan,
    })
    .then(({data}) => {
      //console.log(data);
      return data;
    })
    .catch((err) => err);
  return result;
};

export default GetIdKeluhan;
