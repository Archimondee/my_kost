import axios from 'axios';
import {api} from '../../utils/api';

const ChangePassword = async (id_user: number, password: string) => {
  //console.log(`${api.url}/auth/login.php`);
  const result = await axios
    .post(`${api.url}/auth/change_password.php`, {
      id_user: id_user,
      password: password,
    })
    .then(({data}) => {
      //console.log(data);
      return data;
    })
    .catch((err) => err);
  return result;
};

export default ChangePassword;
