import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import firebaseConfig from './firebaseConfig';

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp); 

export default {
  googleLogin: async () => {
    const provider = new GoogleAuthProvider();
    try {
      let result = await signInWithPopup(auth, provider);
      return result;
    } catch (error) {
      console.error("Erro ao fazer login com o Google:", error);
      throw error;
    }
  }
}
