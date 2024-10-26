import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../Hook/useAuth';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const BookDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [book, setBook] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await fetch(`https://b9a11-server-side-protim1451.vercel.app/books/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch book details');
                }
                const data = await response.json();
                setBook(data);
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBookDetails();
    }, [id]);

    const handleBorrow = async () => {
        setShowModal(true); // Open the modal when the user clicks "Buy Now"
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const borrowInfo = {
            bookId: id,
            userEmail: user.email,
            userName: user.displayName,
            address,
            phone,
            borrowDate: new Date().toISOString(),
            name: book.name,
            image: book.image,
            category: book.category
        };

        try {
            const response = await fetch(`https://b9a11-server-side-protim1451.vercel.app/borrow/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(borrowInfo)
            });

            if (!response.ok) {
                throw new Error('Failed to buy book');
            }

            setShowModal(false); // Close the modal on success
            setBook(prev => ({ ...prev, quantity: prev.quantity - 1 }));
            Swal.fire('Success', 'Book bought successfully', 'success');
        } catch (error) {
            console.error('Error buying book:', error);
            Swal.fire('Error', error.message || 'Failed to buy book', 'error');
        }
    };

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto">
            <Helmet>BookNest || Details</Helmet>
            <h2 className="text-3xl font-bold mb-4 text-center">{book.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <img src={book.image} alt={book.name} className="w-full h-auto object-cover" />
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-2">Author: {book.author}</h3>
                    <p className="mb-2"><span className='font-bold'>Quantity:</span> {book.quantity} copies available</p>
                    <p className="mb-2"><span className='font-bold'>Category:</span> {book.category}</p>
                    <p className="mb-2"><span className='font-bold'>Rating:</span> {book.rating}</p>
                    <p className="mb-2"><span className='font-bold'>Price:</span> {book.price}</p>
                    <p className="text-gray-600">{book.shortDescription}</p>
                    <button 
                        className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded ${book.quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`} 
                        disabled={book.quantity === 0}
                        onClick={handleBorrow}
                    >
                        {book.quantity === 0 ? 'Out of Stock' : 'Buy Now'}
                    </button>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Purchase Book</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-1 font-bold">Name:</label>
                                <input
                                    type="text"
                                    value={user.displayName}
                                    readOnly
                                    className="w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-bold">Email:</label>
                                <input
                                    type="email"
                                    value={user.email}
                                    readOnly
                                    className="w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-bold">Phone Number:</label>
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-bold">Address:</label>
                                <textarea
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                ></textarea>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 mr-2 bg-gray-500 text-white rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                >
                                    Confirm Purchase
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookDetail;
