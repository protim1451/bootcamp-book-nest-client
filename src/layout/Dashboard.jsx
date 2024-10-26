// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import { FaEnvelope, FaHandsHelping, FaUsers } from "react-icons/fa";
import { SiBookstack } from "react-icons/si";
import Footer from '../pages/shared/Footer';
import useAuth from '../Hook/useAuth';
import useAdmin from '../Hook/useAdmin';

const Dashboard = () => {
    const { user } = useAuth();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isAdmin, isAdminLoading] = useAdmin();

    if (isAdminLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Loading user information...</div>;
    }

    const handleSidebarToggle = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleCloseSidebar = () => {
        if (isSidebarOpen) {
            setSidebarOpen(false);
        }
    };

    return (
        <>
            <button onClick={handleSidebarToggle} aria-controls="separator-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none">
                <span className="sr-only">Open sidebar</span>
            </button>
            <aside id="separator-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`} aria-label="Sidebar" onClick={handleCloseSidebar}>
                <div className="h-full px-3 py-4 overflow-y-auto bg-orange-300">
                    <ul className="space-y-2 font-medium ml-4">
                        <li>
                            <NavLink className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100" to="#">
                                <span className="ms-3">Dashboard</span>
                            </NavLink>
                        </li>
                        {
                            isAdmin ? (
                                <>
                                    <li>
                                        <NavLink className="flex gap-1 items-center" to="/dashboard/adminHome">
                                            <IoIosHome />Admin Home
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="flex gap-1 items-center" to="/dashboard/users">
                                            <FaUsers />All Users
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="flex gap-1 items-center" to="/dashboard/addbooks">
                                            <FaUsers />Add Books
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="flex gap-1 items-center" to="/dashboard/books">
                                            <FaUsers />Books
                                        </NavLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <NavLink className="flex gap-1 items-center" to="/dashboard/userHome">
                                            <IoIosHome />User Home
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="flex gap-1 items-center" to="/dashboard/borrowedbooks">
                                            <SiBookstack />Books I bought
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="flex gap-1 items-center" to="/dashboard/allbooks">
                                            <SiBookstack />All Books
                                        </NavLink>
                                    </li>
                                </>
                            )
                        }
                    </ul>
                    <ul className="pt-4 mt-4 ml-3 space-y-2 font-medium border-t border-gray-200">
                        <li>
                            <NavLink className="flex gap-1 items-center" to="/">
                                <IoIosHome />Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="flex gap-1 items-center" to="/contact">
                                <FaEnvelope />Contact
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="flex gap-1 items-center" to="/help">
                                <FaHandsHelping />Help
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </aside>
            <div className="p-4 sm:ml-64">
                <Outlet />
                <div className="mt-6 md:mt-12">
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default Dashboard;
