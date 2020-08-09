import axios from 'axios';
import {api} from '../../utils/api';

const GetIdKost = async (id_kost: number) => {
  //console.log(`${api.url}/auth/login.php`);
  const result = await axios
    .post(`${api.url}/keluhan/get_id_keluhan_kost.php`, {
      id_kost: id_kost,
    })
    .then(({data}) => {
      //console.log(data);
      return data;
    })
    .catch((err) => err);
  return result;
};

export default GetIdKost;
