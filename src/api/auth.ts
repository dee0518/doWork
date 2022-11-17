// eslint-disable-next-line import/no-unresolved
import { UserInfo, LoginInfo } from '../types/auth';
import { FIREBASE_URL, SERVER_URL, API_KEY, request } from './index';

const signUp = async (userInfo: LoginInfo): Promise<any> => {
  const options = {
    method: 'POST',
    body: JSON.stringify(userInfo),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return request(`${FIREBASE_URL}/accounts:signUp?key=${API_KEY}`, options);
};

const signIn = async (userInfo: LoginInfo): Promise<any> => {
  const options = {
    method: 'POST',
    body: JSON.stringify({ ...userInfo, returnSecureToken: true }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return request(`${FIREBASE_URL}/accounts:signInWithPassword?key=${API_KEY}`, options);
};

const oAuth = async (): Promise<any> => {
  const options = {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };
  return request(`${FIREBASE_URL}/accounts:signInWithIdp?key=${API_KEY}`, options);
};

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

export { signUp, signIn, oAuth, postUser, getUserEmail, deleteUser };
