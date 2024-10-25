
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminHome = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalBooks, setTotalBooks] = useState(0);
    //const [totalCampaigns, setTotalCampaigns] = useState(0);
    
    console.log(totalPets, totalUsers, totalCampaigns);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await axios.get('http://localhost:3000/user');
                const petsResponse = await axios.get('http://localhost:3000/books');
                //const campaignsResponse = await axios.get('https://b9a12-server-side-protim1451.vercel.app/api/donation-campaigns');
                setTotalUsers(usersResponse.data.length);
                setTotalBooks(petsResponse.data.length);
                //setTotalCampaigns(campaignsResponse.data.length);
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
                <p className="text-4xl font-bold text-gray-900">{totalPets}</p>
            </div>
        </div>
    );
};

export default AdminHome;
