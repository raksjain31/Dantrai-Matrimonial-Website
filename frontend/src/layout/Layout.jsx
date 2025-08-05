import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footerbar from '../components/Footerbar'

const Layout = () => {
    return (
        <div>

            <Navbar />
            <Outlet />
            <Footerbar />
        </div>
    )
}

export default Layout