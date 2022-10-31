import React from 'react'
import { app } from './Services/firebase';
import { getAuth, GoogleAuthProvider, signOut, signInWithPopup, onAuthStateChanged } from "firebase/auth"
import { verificarUser } from "./Services/firebaseDataBase.js"
import { useNavigate } from 'react-router-dom';

export const AuthUserContext = React.createContext()

export const UserStorage = ({children}) => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [user, setUser] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate()

  const logout = React.useCallback(()=>{
    signOut(auth).then(() => {
      setUser(null)
      setLogin(false)
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('user')
      navigate('/login')
    }).catch((error) => {
      console.log(error)
    });
  },[navigate, auth])

  const verificarAuth = React.useCallback(async () => {
    const authUser = auth.currentUser;
    if(authUser && await verificarUser(authUser.email)){
      return true
    }else{
      return false
    } 
  },[auth])

  React.useEffect(()=>{
    async function autoLogin(){
      setError(null)
      setLoading(true)
      onAuthStateChanged(auth, (user) => {
        if(user && verificarAuth()) {
          setUser(user)
          setLogin(true)
          navigate('/') ;
        } else {
          logout()
        }
        setLoading(false)
      });
    }
    if(auth) autoLogin()
  },[auth, logout, navigate, verificarAuth])

  async function signInGoogle() {
    setError(null)
    try {
      setLoading(true)
      const result = await signInWithPopup(auth, provider)
      const credential = await GoogleAuthProvider.credentialFromResult(result);
      const isValidUser = await verificarUser(result.user.email);
      if(isValidUser){
        const token =  credential.accessToken;
        setUser(result.user);
        setLogin(true)
        window.localStorage.setItem('token',token)
        window.localStorage.setItem('user',result.user.email)
        navigate('/');
      }else{
        setUser(null)
        logout()
        throw new Error('Usuário inválido')
      }   
    } catch (error) {
      setError(error)
      setLogin(false)
    } finally{
      setLoading(false)
    }
  }  
    
  return (
    <AuthUserContext.Provider value={{ verificarAuth, signInGoogle, user, login, loading, error, logout }}>
      {children}
    </AuthUserContext.Provider>
  )
}
