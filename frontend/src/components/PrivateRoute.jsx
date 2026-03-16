import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children, role, userInfo }) => {
  if (!userInfo) return <Navigate to="/login" />
  if (role && userInfo.role !== role) return <Navigate to="/" />
  return children
}

export default PrivateRoute