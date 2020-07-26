import axios from 'axios';
import {api} from '../../utils/api';

const CheckUser = async (username: string, password: string) => {
  console.log(`${api.url}/auth/login.php`);
  const result = await axios
    .post(`${api.url}/auth/check_user.php`, {
      username: username,
      password: password,
    })
    .then(({data}) => {
      //console.log(data);
      return data;
    })
    .catch((err) => err);
  return result;
};

export default CheckUser;
