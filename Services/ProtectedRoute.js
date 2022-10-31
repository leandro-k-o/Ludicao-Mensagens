import React from 'react'
import { Navigate } from 'react-router-dom'
import { AuthUserContext } from '../AuthUserContext'

const ProtectedRoute = ({children}) => {
  const {login} = React.useContext(AuthUserContext)

  return (
    login ? children : <Navigate to="/login" />
  )
}

export default ProtectedRoute