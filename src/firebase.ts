import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from "firebase/firestore";
// import { collection, addDoc, doc, updateDoc, getDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const authService = getAuth();

// export const dbService = getFirestore(app);

// export const addDocument = async (collectionName, data) => {
//   const docRef = await addDoc(collection(dbService, collectionName), data)

//   return docRef.id
// }

// export const updateDocument = async (collectionName, refName, data) => {
//   const refDoc = doc(dbService, collectionName, refName)
//   await updateDoc(refDoc, data)
// }

// export const getDocument = async(collectionName, refName) => {
//   const docRef = doc(dbService, collectionName, refName);
//   const docSnap = await getDoc(docRef);

//   if (docSnap.exists()) {
//     return {
//       result: true,
//       data: docSnap.data()
//     }
//   } else {
//     return { result: false }
//   }
// }

// export const getDocuments = async(customQuery) => {
//   const q = customQuery

//   const querySnapshot = await getDocs(q);

//   return querySnapshot
// }
