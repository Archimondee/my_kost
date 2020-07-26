import axios from 'axios';
import {api} from '../../utils/api';

const GetIdUser = async (id_user: number) => {
  //console.log(`${api.url}/user/get_user.php`);
  const result = await axios
    .post(`${api.url}/user/get_id_data_user.php`, {
      id_user: id_user,
    })
    .then(({data}) => {
      //console.log(data);
      return data;
    })
    .catch((err) => err);
  return result;
};

export default GetIdUser;
