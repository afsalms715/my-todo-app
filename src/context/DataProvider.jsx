import { createContext,useEffect } from "react";
import {useState} from 'react'
import dayjs from 'dayjs';
import {auth} from '../firebase_setup/firebase'
import {signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Navigate } from "react-router-dom";

export const TodoContext=createContext({})
export const DataProvider=({children})=>{
    const [user, setUser] = useState();//store user
    

    const[TodoText,setTodoText]=useState('')//sate for todo text
    const [deadline, setDeadline] =useState(dayjs(Date()));//for deadline
    const[Todos,setTodos]=useState()//to store the todos read from rtdb
    const[isloading,setLoading]=useState(false)//saving data loading...
    const[empty,setEmpty]=useState(false)

    const provider = new GoogleAuthProvider();
  const registerWithGoogle=()=>{
    signInWithPopup(auth,provider).then((result) => {
      const user = result.user;
      console.log(user)
      sessionStorage.setItem('user',JSON.stringify(user))
      setUser(user)
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }

    return(
    <TodoContext.Provider value={{user,setUser,TodoText,setTodoText,deadline,setDeadline,Todos,setTodos
    ,isloading,setLoading,empty,setEmpty,registerWithGoogle}}>
        {children}
    </TodoContext.Provider>
    )
}