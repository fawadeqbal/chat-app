import React, {  createContext, useState } from "react";
import { getDoc,setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword} from "firebase/auth";
import { db, auth } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";

const AppContext = createContext();
const AppContextProvider = ({ children }) => {
  const navigation = useNavigation();
    const [currentUser,setCurrentUser]=useState(null);
    const signUp = async (fullName, email, password) => {
    await createUserWithEmailAndPassword(auth, email, password).then(
      (userObj) => {
        const user = userObj.user;
        const data = {
          _id: user.uid,
          fullName: fullName,
          providerData: user.providerData[0],
        };
        setDoc(doc(db, "users", data._id), data)
          .then(() => {
            navigation.navigate("Login");
          })
          .catch((e) => {
            console.log(e);
          });
      }
    );
  };

  const login = async (email,password)=>{
    const res=await signInWithEmailAndPassword(auth,email,password)
    return res;
  }

  const getUser = async (uuid)=>{
    const docSnap=await getDoc(doc(db,"users",uuid))
    setCurrentUser(docSnap.data())
    return docSnap.data()
  }
  
  const store = {
    signUp,
    login,
    getUser,
    currentUser,
    setCurrentUser
  };
  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
export { AppContext };
