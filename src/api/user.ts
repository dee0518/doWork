import { FIREBASE_URL, SERVER_URL, API_KEY, request } from './index';
// eslint-disable-next-line import/no-unresolved
import { UserInfo } from '../types/auth';

const postUser = async (props: UserInfo): Promise<any> => {
  const options = {
    method: 'POST',
    body: JSON.stringify({ ...props }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return request(`${SERVER_URL}/users.json`, options);
};

const getUserEmail = async (email: string): Promise<any> => {
  const options = {
    method: 'GET',
  };
  console.log(email);
  return request(`${SERVER_URL}/users.json?orderBy="email"&equalTo="${email}"&print=pretty`, options);
};

const deleteUser = async (idToken: string): Promise<any> => {
  const options = {
    method: 'POST',
    body: JSON.stringify({ idToken }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return request(`${FIREBASE_URL}/accounts:delete?key=${API_KEY}`, options);
};

export { postUser, getUserEmail, deleteUser };
