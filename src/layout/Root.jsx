import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/shared/Footer';
import Navbar from '../pages/shared/Navbar';

const Root = () => {
    return (
        <div>
            <div className="max-w-6xl mx-auto bg-[#f5f5f5] space-y-5">
                <Navbar></Navbar>
                <Outlet></Outlet>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Root;