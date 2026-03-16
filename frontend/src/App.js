import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import HomeScreen from './screens/HomeScreen'
import 'bootstrap/dist/css/bootstrap.min.css'
import DetailScreen from './screens/DetailScreen'
import SignIn from './screens/SignIn'
import SignUp from './screens/SignUp'
import ApplySeller from './screens/ApplySeller'
import UserScreen from './screens/UserScreen'
import SellerDashboard from './screens/SellerDashboard'
import UserProfile from './screens/UserProfile'
import ChatBot from './screens/ChatBot'
import PrivateRoute from './components/PrivateRoute'

import Header from './components/Header'

function App() {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return (
    <>
      <Header />
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      {/* <Route path="/" element={<PrivateRoute userInfo={userInfo}><HomeScreen /></PrivateRoute>} /> */}
      <Route path="/service/:id" element={<PrivateRoute userInfo={userInfo}><DetailScreen /></PrivateRoute>} />
      <Route path="/apply-seller" element={<PrivateRoute userInfo={userInfo}><ApplySeller /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute userInfo={userInfo}><UserProfile /></PrivateRoute>} />
      <Route path="/chat" element={<PrivateRoute userInfo={userInfo}><ChatBot /></PrivateRoute>} />
      <Route path="/admin/users" element={<PrivateRoute userInfo={userInfo} role="Admin"><UserScreen /></PrivateRoute>} />
      <Route path="/seller/dashboard" element={<PrivateRoute userInfo={userInfo} role="Seller"><SellerDashboard /></PrivateRoute>} />
    </Routes>
    </>
  )
}

export default App