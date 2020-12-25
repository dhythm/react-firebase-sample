import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  authDomain: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  projectId: 'xxxxxxxxxxxxxxxxxxxxxxxxxx',
  storageBucket: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  messagingSenderId: 'xxxxxxxxxxxx',
  appId: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
