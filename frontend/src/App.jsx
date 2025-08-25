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
import EditProfile from "./Page/EditProfile";

import DashBoardPage from "./Page/DashBoardPage";
import ProfileViewPage from "./Page/ProfileViewPage";
import AllProfilesSearchPage from "./Page/AllProfilesSearchPage";
import UserFamilyProfileView from "./components/UserFamilyProfileView";
import LoginUserProfilePage from "./Page/LoginUserProfilePage";
import ForgetPasswordPage from "./Page/ForgetPasswordPage";
import ResetPasswordPage from "./Page/ResetPasswordPage";
import ContactUs from "./components/ContactUs";
import AboutUs from "./components/AboutUs";
import ApprovedBiodataPage from "./Page/ApprovedBiodataPage";





const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()

  }, [checkAuth])


  if (isCheckingAuth && authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />

        <HomePage />
      </div>

    )
  }
  if (import.meta.env.PROD) {
    console.log = () => { };

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

        <Route
          path='/forget-password'
          element={<ForgetPasswordPage />}
        />
        {/* element={!authUser ? <ForgetPasswordPage /> : <Navigate to={"/"} />} */}
        <Route
          path="/reset-password/:email/:token"
          element={!authUser ? <ResetPasswordPage /> : <Navigate to={"/"} />}
        />




        {/* <Route element={<AdminRoute />}> */}

        <Route path='/' element={<Layout />}>
          <Route path="/update-user/:id"
            element={authUser ? <LoginUserProfilePage /> : <Navigate to={"/"} />} />
        </Route>




        <Route path='/' element={<Layout />}>
          <Route path="/add-profile"
            element={authUser ? <AddProfile /> : <Navigate to={"/"} />} />
        </Route>




        <Route path='/' element={<Layout />}>
          <Route path="/update-profile/:id"
            element={authUser ? <EditProfile /> : <Navigate to={"/"} />} />
        </Route>


        <Route path='/' element={<Layout />}>
          <Route path="/profile/get-profile/:id"
            element={authUser ? <UserFamilyProfileView /> : <Navigate to={"/"} />} />
        </Route>

        <Route path='/' element={<Layout />}>
          <Route path="/search-profiles"
            element={authUser ? <AllProfilesSearchPage /> : <Navigate to={"/"} />} />
        </Route>

        <Route path='/' element={<Layout />}>
          <Route path="/contact-us"
            element={authUser ? <ContactUs /> : <Navigate to={"/"} />} />
        </Route>
        <Route path='/' element={<Layout />}>
          <Route path="/about-us"
            element={authUser ? <AboutUs /> : <Navigate to={"/"} />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/dashboard"
            element={authUser ? <DashBoardPage /> : <Navigate to={"/"} />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/approvedbiodata"
            element={authUser ? <ApprovedBiodataPage /> : <Navigate to={"/"} />} />
        </Route>
        <Route path='/' element={<Layout />}>
          <Route path="/admin/get-user-profiles-byUserId/:id"
            element={authUser ? <ProfileViewPage /> : <Navigate to={"/dashboard"} />}
          >
          </Route>
        </Route>


      </Routes >

    </div >

  )

}

export default App;