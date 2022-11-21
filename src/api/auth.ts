// eslint-disable-next-line import/no-unresolved
import { LoginInfo } from '../types/auth';
import { FIREBASE_URL, API_KEY, request } from './index';

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

const deleteAcoount = async (idToken: string): Promise<any> => {
  const options = {
    method: 'DELTE',
    body: {
      idToken: JSON.stringify(idToken),
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };

  return request(`${FIREBASE_URL}/accounts:delete?key=${API_KEY}`, options);
};

export { signUp, signIn, oAuth, deleteAcoount };
