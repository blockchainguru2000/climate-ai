import React from 'react'
import { useAuth } from './authetictae';
import { useNavigate } from 'react-router-dom';


const AuthLoginOut = () => {
  const { isAuthenticated, login, principal, logout } = useAuth();
  const navigate=useNavigate()
  return (
    <>
      {isAuthenticated ? (
        <button
        className="border rounded-md p-3"
        onClick={()=>navigate("/chat")}
      >
        welcome
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

export default AuthLoginOut;