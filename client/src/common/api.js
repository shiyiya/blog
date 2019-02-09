import axios from './axios';

const signup = data => axios.post('./signup', data);

const signin = data => axios.post('./signin', data);

export { signup, signin };
