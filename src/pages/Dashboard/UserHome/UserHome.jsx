import React, { useState, useEffect } from 'react';
import useAuth from '../../../Hook/useAuth';
import { toast, ToastContainer } from 'react-toastify';
import { FaBook } from 'react-icons/fa';

const UserHome = () => {
    const { user, updateUserProfile } = useAuth();
    const [name, setName] = useState(user?.displayName || '');
    const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
    const [isEditing, setIsEditing] = useState(false);
    const [totalBooks, setTotalBooks] = useState(0);

    useEffect(() => {
        const fetchTotalBooks = async () => {
            try {
                const response = await fetch(`http://localhost:3000/borrowed/${user.email}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch total books');
                }
                const data = await response.json();
                setTotalBooks(data.length);
            } catch (error) {
                console.error('Error fetching total books:', error);
            }
        };

        fetchTotalBooks();
    }, [user.email]);

    const handleSaveClick = async () => {
        try {
            if (!name.trim() || !photoURL.trim()) {
                alert('Please enter a valid name and photo URL.');
                return;
            }

            await updateUserProfile({ displayName: name, photoURL });
            toast.success('Profile updated successfully!');
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile. Please try again.');
        }
    };

    return (
        <div className="container mx-auto my-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="flex flex-col items-center">
                <img className="w-32 h-32 rounded-full mb-4" src={photoURL || 'default-avatar.png'} alt="User Avatar" />
                {isEditing ? (
                    <div className="text-center">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter name"
                            className="border px-2 py-1 rounded mb-2 w-full"
                        />
                        <input
                            type="text"
                            value={photoURL}
                            onChange={(e) => setPhotoURL(e.target.value)}
                            placeholder="Enter photo URL"
                            className="border px-2 py-1 rounded mb-2 w-full"
                        />
                        <button onClick={handleSaveClick} className="bg-blue-500 text-white px-4 py-2 rounded">
                            Save
                        </button>
                    </div>
                ) : (
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-2">{name}</h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">{user?.email || 'user@example.com'}</p>
                        <button onClick={() => setIsEditing(true)} className="bg-teal-500 text-white px-4 py-2 rounded">
                            Edit Profile
                        </button>
                    </div>
                )}

                {/* Display Total Books Bought */}
                <div className="mt-6 bg-green-100 text-green-700 p-4 rounded-md shadow-md flex items-center gap-2">
                    <FaBook className="text-4xl" />
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">{totalBooks}</h2>
                        <p className="text-lg">Books Bought</p>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default UserHome;
