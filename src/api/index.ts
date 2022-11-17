export const FIREBASE_URL = 'https://identitytoolkit.googleapis.com/v1';
export const SERVER_URL = 'https://dowork-bd9d9-default-rtdb.firebaseio.com';
export const API_KEY = process.env.FIREBASE_API_KEY;
export const request = async (url: string, options: undefined | object = {}): Promise<any> => {
  try {
    const response = await fetch(url, options);
    const json = await response.json();

    return {
      result: response.ok,
      data: json,
    };
  } catch (e) {
    console.log(e);
  }
};
