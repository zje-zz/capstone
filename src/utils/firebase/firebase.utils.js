import { initializeApp } from 'firebase/app';
import { 
        getAuth, 
        signInWithRedirect,
        signInWithPopup,
        GoogleAuthProvider, 
        } from 'firebase/auth';
import {
        getFirestore,
        doc,
        getDoc,
        setDoc,
        } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD8BEXj1xwOsatvpC0VEFbLpNQHGdrM_Hs",
    authDomain: "crwn-db-89732.firebaseapp.com",
    projectId: "crwn-db-89732",
    storageBucket: "crwn-db-89732.appspot.com",
    messagingSenderId: "1088569478429",
    appId: "1:1088569478429:web:e28b7efe41fb8687a2a5f4"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  
  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: 'select_account'
  });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch(error){
        console.log('error creating the user', error.message); 
        }
    }

    return userDocRef;
};