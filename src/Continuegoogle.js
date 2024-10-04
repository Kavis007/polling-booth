import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth , provider } from './firebaseconfig';
import { useNavigate } from 'react-router-dom';

const Continuewithgoogle = () => {
  const navitogoog=useNavigate();
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('User Info:', user);
      // navitogoog('/HomePage')
    } catch (error) {
      console.error('Error during sign-in:', error.message);
    }
  };

  return (
    <div>
      <h2>Sign in with Google</h2>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default Continuewithgoogle;
