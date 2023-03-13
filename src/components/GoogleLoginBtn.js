import React, { useContext } from 'react';
import { auth, googleProvider } from "./firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import googleLogo from '../images/google-logo.webp';
import { APP_PREFIX } from "./App";
import { addUser, getUser } from "./updateUsers";
import { sampleRecipe } from "./sampleRecipe";
import { UserContext } from "./App";

export default function GoogleLoginBtn({ smallerOnMobile }) {
  const { setUser } = useContext(UserContext);

  const logInWithGoogle = async () => {
    try {
      const data = await signInWithPopup(auth, googleProvider);
      if (data && data.user) {
        const userData = {
          id: data.user.uid,
          name: data.user.displayName,
          email: data.user.email,
          imgURL: data.user.photoURL,
          recipes: sampleRecipe
        };

        const potentialUser = await getUser(userData.id);
        if (potentialUser) {
          setUser(potentialUser);
        } else {
          setUser(userData);
          await addUser(userData);
        }
        localStorage.setItem(`${APP_PREFIX}-loggedInUserId`, userData.id);
      }
    } catch(err) {
      console.log("Error on logging in with Google: " + err);
    }
  }

  return (
    <button onClick={logInWithGoogle} className="theme-button bg-white text-black shadow-transparent 
    shadow-md my-4 hover:shadow-zinc-400 focus:shadow-zinc-400 flex h-10 md:h-11 items-center gap-4">
      <div>Login <span className={smallerOnMobile ? "hidden md:inline" : "md:inline"}>with Google</span></div>
      <div className="w-6 h-6">
        <img src={googleLogo} alt="Google Logo" className="w-full h-full" />
      </div>
    </button>
  )
}
