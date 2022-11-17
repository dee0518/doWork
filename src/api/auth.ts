// eslint-disable-next-line import/no-unresolved
import { UserInfo, LoginInfo } from '../types/auth';

const FIREBASE_URL = 'https://identitytoolkit.googleapis.com/v1';
const SERVER_URL = 'https://dowork-bd9d9-default-rtdb.firebaseio.com';
const API_KEY = process.env.FIREBASE_API_KEY;

const request = async (url: string, options: undefined | object = {}): Promise<any> => {
  try {
    const response = await fetch(url, options);
    const json = await response.json();

    return {
      result: response.ok,
      ...json,
    };
  } catch (e) {
    console.log(e);
  }
};

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

export { signUp, signIn, oAuth, postUser, getUserEmail };
