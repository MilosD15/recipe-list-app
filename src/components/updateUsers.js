import { collection, addDoc, where, query, getDocs, doc, updateDoc } from "firebase/firestore";
import { database } from "./firebaseConfig";

async function updateUserRecipes(userId, newRecipes) {
  try {
    const documentId = await getDocumentId(userId);
    const userRef = doc(database, "users", documentId);
    await updateDoc(userRef, {
      recipes: newRecipes
    });
  } catch(err) {
    console.error("Error on updating user: ", err);
  }
}

async function addUser(user) {
  try {
    await addDoc(collection(database, "users"), user);
  } catch(err) {
    console.error("Error on adding new user: ", err);
  }
}

async function getUser(id) {
  try {
    const q = query(collection(database, "users"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size === 0) return null;

    return querySnapshot.docs[0].data();
  } catch(err) {
    console.log("Error on querying database: ", err);
  }
}

async function getDocumentId(id) {
  try {
    const q = query(collection(database, "users"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size === 0) return null;

    return querySnapshot.docs[0].id;
  } catch(err) {
    console.log("Error on querying database: ", err);
  }
}

export {
  addUser,
  getUser,
  updateUserRecipes
}