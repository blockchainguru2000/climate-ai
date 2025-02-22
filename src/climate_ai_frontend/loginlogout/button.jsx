import React from 'react'
import { useAuth } from './auth';
import { useNavigate } from 'react-router-dom';


const AuthButton = () => {
  const { isAuthenticated, login, principal, logout } = useAuth();
  const navigate=useNavigate()
  return (
    <>
      {isAuthenticated ? (
        <button
        className="login-button"
        onClick={()=>navigate("/search")}
      >
        Get Started
      </button>
      ) : (
        <button
          className="login-button"
          onClick={login}
        >
          Log in
        </button>
      )}
    </>
  )
}

export default AuthButton;