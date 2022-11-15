const SERVER_URL = 'https://identitytoolkit.googleapis.com/v1';
const API_KEY = process.env.FIREBASE_API_KEY;

interface UserInfo {
  email: string;
  password: string;
}

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

const signUp = async (userInfo: UserInfo): Promise<any> => {
  const options = {
    method: 'POST',
    body: JSON.stringify(userInfo),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return request(`${SERVER_URL}/accounts:signUp?key=${API_KEY}`, options);
};

const signIn = async (userInfo: UserInfo): Promise<any> => {
  const options = {
    method: 'POST',
    body: JSON.stringify({ ...userInfo, returnSecureToken: true }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return request(`${SERVER_URL}/accounts:signInWithPassword?key=${API_KEY}`, options);
};

const oAuth = async () => {
  const options = {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };
  return request(`${SERVER_URL}/accounts:signInWithIdp?key=${API_KEY}`, options);
};

export { signUp, signIn, oAuth };
