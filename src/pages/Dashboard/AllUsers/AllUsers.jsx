import React, { useEffect, useState } from 'react';
import axios from "axios"; 
import { FaTrash, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
    const [users, setUsers] = useState([]); 

    // Fetch users from the backend using axios
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('http://localhost:3000/user');
                setUsers(res.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    // Handle making a user admin
    const handleMakeAdmin = async (user) => {
        try {
            const res = await axios.patch(`http://localhost:3000/user/admin/${user._id}`);
            if (res.data.modifiedCount > 0) {
                setUsers(users.map(u => u._id === user._id ? { ...u, role: 'admin' } : u));
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is now an admin!`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error("Error making user admin:", error);
        }
    };

    // Handle deleting a user
    const handleDelete = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be reversed!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.delete(`http://localhost:3000/user/${user._id}`);
                    if (res.data.deletedCount > 0) {
                        setUsers(users.filter(u => u._id !== user._id));
                        Swal.fire("Deleted!", "User has been deleted.", "success");
                    }
                } catch (error) {
                    console.error("Error deleting user:", error);
                }
            }
        });
    };

    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">Total Users: {users.length}</h2>
            </div>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="py-3 px-6"></th>
                            <th scope="col" className="py-3 px-6">Name</th>
                            <th scope="col" className="py-3 px-6">Email</th>
                            <th scope="col" className="py-3 px-6">Role</th>
                            <th scope="col" className="py-3 px-6">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, idx) => (
                            <tr key={user._id} className="bg-white border-b">
                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                    {idx + 1}
                                </th>
                                <td className="py-4 px-6">{user.name}</td>
                                <td className="py-4 px-6">{user.email}</td>
                                <td className="py-4 px-6">
                                    {user.role === 'admin' ? (
                                        'Admin'
                                    ) : (
                                        <button
                                            onClick={() => handleMakeAdmin(user)}
                                            className="text-orange-600 text-lg"
                                        >
                                            <FaUsers />
                                        </button>
                                    )}
                                </td>
                                <td className="py-4 px-6">
                                    <button
                                        onClick={() => handleDelete(user)}
                                        className="text-red-600 text-lg"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;
