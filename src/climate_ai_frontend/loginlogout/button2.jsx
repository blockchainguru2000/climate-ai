import React from 'react'
import { useAuth } from './authetictae';
import { useNavigate } from 'react-router-dom';


const AuthButton = () => {
  const { isAuthenticated, login, principal, logout } = useAuth();
  const navigate=useNavigate()
  return (
    <>
      {isAuthenticated ? (
        <button
        className="border rounded-md p-3"
        onClick={logout}
      >
        logo out
      </button>
      ) : (
        <button
          className="border rounded-md p-3"
          onClick={login}
        >
          Log in
        </button>
      )}
    </>
  )
}

export default AuthButton;