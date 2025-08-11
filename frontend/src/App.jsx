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
import DashBoardPage from "./Page/DashBoardPage";
import ProfileViewPage from "./Page/ProfileViewPage";
import AllProfilesSearchPage from "./Page/AllProfilesSearchPage";
import UserFamilyProfileView from "./components/UserFamilyProfileView";




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


        <Route path="/profile/get-profile/:id"
          element={authUser ? <UserFamilyProfileView /> : <Navigate to={"/"} />} />


        <Route path="/search-profiles"
          element={authUser ? <AllProfilesSearchPage /> : <Navigate to={"/"} />} />



        <Route element={<AdminRoute />}>
          <Route path="/dashboard"
            element={authUser ? <DashBoardPage /> : <Navigate to={"/"} />} />

        </Route>

        <Route path="/admin/get-user-profiles-byUserId/:id"
          element={authUser ? <ProfileViewPage /> : <Navigate to={"/dashboard"} />}
        >

        </Route>


      </Routes >

    </div >

  )

}

export default App;