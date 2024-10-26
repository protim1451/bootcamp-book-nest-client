import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminHome = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalBooks, setTotalBooks] = useState(0);
    const [totalBooksBought, setTotalBooksBought] = useState(0); // New state for books bought

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch total users
                const usersResponse = await axios.get('https://b9a11-server-side-protim1451.vercel.app/user');
                setTotalUsers(usersResponse.data.length);

                // Fetch total books
                const booksResponse = await axios.get('https://b9a11-server-side-protim1451.vercel.app/books');
                setTotalBooks(booksResponse.data.length);

                // Fetch total books bought
                const boughtResponse = await axios.get('https://b9a11-server-side-protim1451.vercel.app/borrow'); // Update this URL to your actual endpoint
                setTotalBooksBought(boughtResponse.data.length); // Adjust based on your API response structure

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
            <div className="p-4 bg-white shadow-md rounded-md">
                <h2 className="text-xl font-semibold text-gray-800">Total Users</h2>
                <p className="text-4xl font-bold text-gray-900">{totalUsers}</p>
            </div>
            <div className="p-4 bg-white shadow-md rounded-md">
                <h2 className="text-xl font-semibold text-gray-800">Total Books</h2>
                <p className="text-4xl font-bold text-gray-900">{totalBooks}</p>
            </div>
            <div className="p-4 bg-white shadow-md rounded-md">
                <h2 className="text-xl font-semibold text-gray-800">Total Books Sold</h2>
                <p className="text-4xl font-bold text-gray-900">{totalBooksBought}</p>
            </div>
        </div>
    );
};

export default AdminHome;
