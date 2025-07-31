import React, { useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "react-hot-toast";
import HomePage from './Page/HomePage';
import SignUpPage from './Page/SignUpPage';
import LoginPage from './Page/LoginPage';
import { useAuthStore } from './store/useAuthStore';
import { Loader } from 'lucide-react';
import Layout from "./layout/Layout";
import AdminRoute from "./components/AdminRoute";
import AddProfile from "./Page/AddProfile";



const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()

  }, [checkAuth])


  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />

        <HomePage />
      </div>

    )
  }


  return (
    <div className='flex flex-col items-center justify-start'>
      <Toaster />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route
            index
            element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
          />

        </Route>


        <Route
          path='/login'
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />

        <Route
          path='/signup'
          element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        {/* <Route element={<AdminRoute />}> */}
        <Route path="/add-profile"
          element={authUser ? <AddProfile /> : <Navigate to={"/"} />} />

        {/* </Route> */}

      </Routes >

    </div >

  )

}

export default App;