import React, { useContext, useState, useEffect } from "react"
import firebase from "../server/firebase"
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { UserInfo } from "firebase/auth";
import userService from "../server/service/UserService";
import tradeService from "../server/service/TradeLogService";

const AuthContext = React.createContext();

const auth = firebase.auth
/**
 * Returns the AuthContext with the values bound to it.
 */
export function useAuth() {
  return useContext(AuthContext)
}


export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userDetails, setUserDetails] = useState();
  const [loading, setLoading] = useState(true)
  async function signup(email, password) {
    return true;
  }
  async function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
      
        //setting currentUser to all repository that needs the user UID.
        tradeService.setCurrentUser(user);
        
        userService.getBy("uid", user.userID).then(function(res){
          setCurrentUser(user);
          setUserDetails(res[0]);
        })
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
        throw error;
      });
  }

  async function logout() {
    setLoading(true)
    return signOut(auth).then((val)=>{
      setLoading(false);
      return val;
    });
  }

  async function resetPassword(email) {
    return true;
  }

  async function updateEmail(email) {
    return true;
  }

  async function updatePassword(password) {
    return true;
  }

  //EFFECT: cleanup for authentication component
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    },function(err){
      console.error("FIREBASE: There was an error on Auth State Change");
    },function(completed){
      console.warn("FIREBASE: Auth State Changed!");
    });
    console.log(currentUser)
    return unsubscribe
    
  },[])

  const contextValue = {
    currentUser,
    userDetails,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  )
}