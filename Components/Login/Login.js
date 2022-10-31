import React from 'react'
import styles from './Login.module.css'
import foto from '../../Assets/nos.png'
import { AuthUserContext } from '../../AuthUserContext'
import Error from '../../Services/Error'
import { Navigate } from 'react-router-dom'


const Login = () => {
  const {signInGoogle, logout, verificarAuth, login, loading, error} = React.useContext(AuthUserContext)  
  
  if(login) return <Navigate to='/home' />
  return (
    <main className={styles.login}>
      <div className={styles.imgcontainer}>
        <img src={foto} alt="cartoon de Thamires e Leandro"/>
      </div>
      {loading ? 
        <button disabled className={styles.btn}>carregando</button> 
        :
        <button className={styles.btn} onClick={()=>signInGoogle()}>Fazer Login</button>
      }      
      {error ? <Error error={error}/>: ""}
    </main>
  )
}

export default Login