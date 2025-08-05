// src/components/SidebarLayout.jsx
import { Link, Outlet } from "react-router-dom";

const SidebarLayout = () => {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-base-200 p-4">
                <h2 className="text-xl font-bold mb-6">Dashboard</h2>
                <ul className="menu space-y-2">
                    <li><Link to="/dashboard/profile">Profile</Link></li>
                    <li><Link to="/dashboard/users">Users</Link></li>
                    <li><Link to="/dashboard/settings">Settings</Link></li>
                </ul>
            </div>

            {/* Page Content */}
            <div className="flex-1 p-6">
                <Outlet />
            </div>
        </div>
    );
};

export default SidebarLayout;
