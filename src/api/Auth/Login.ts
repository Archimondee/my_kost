import axios from 'axios';
import {api} from '../../utils/api';

const Login = async (username: string, password: string) => {
  console.log(`${api.url}/auth/login.php`);
  const result = await axios
    .post(`${api.url}/auth/login.php`, {
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

export default Login;
