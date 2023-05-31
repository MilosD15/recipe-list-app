import React from 'react';
import { auth, googleProvider } from "./firebaseConfig";
import { signInWithRedirect } from "firebase/auth";
import googleLogo from '../images/google-logo.webp';

export default function GoogleLoginBtn({ smallerOnMobile }) {
  const logInWithGoogle = async () => {
    signInWithRedirect(auth, googleProvider);
  }

  return (
    <button onClick={logInWithGoogle} className="theme-button bg-white text-black shadow-transparent 
    shadow-md my-4 hover:shadow-zinc-400 focus-visible:shadow-zinc-400 flex h-10 md:h-11 items-center gap-4">
      <div>Login <span className={smallerOnMobile ? "hidden md:inline" : "md:inline"}>with Google</span></div>
      <div className="w-6 h-6">
        <img src={googleLogo} alt="Google Logo" className="w-full h-full" />
      </div>
    </button>
  )
}
