/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext } from 'react';
import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { APP_PREFIX } from "./App";
import { UserContext } from "./App";

export default function SignOut({ userImgUrl }) {
  const { setUser } = useContext(UserContext);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.setItem(`${APP_PREFIX}-loggedInUserId`, "");
    } catch(error) {
      console.log("Error on signing out: " + error.message);
    }
  }

  return (
    <button onClick={handleSignOut} className="absolute right-3 theme-button bg-zinc-700 my-3 hover:text-zinc-700 hover:bg-zinc-300 
      focus-visible:text-zinc-700 focus-visible:bg-zinc-300 flex h-10 items-center gap-4 !px-1 !rounded-lg !pl-4">
      <div>Sign out</div>
      {userImgUrl && (
        <div className="w-9 h-9 overflow-hidden rounded-xl">
          <img src={userImgUrl} referrerPolicy="no-referrer" alt="User's Profile Picture from Google" className="w-full h-full" />
        </div>
      )}
    </button>
  )
}
