import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../Hook/useAuth';
import { Helmet } from 'react-helmet-async';

const BorrowedBooks = () => {
    const { user } = useAuth();
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);  // Initialize with 0

    useEffect(() => {
        const fetchBorrowedBooks = async () => {
            try {
                const response = await fetch(`https://b9a11-server-side-protim1451.vercel.app/borrowed/${user.email}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch borrowed books');
                }
                const data = await response.json();
                setBorrowedBooks(data);

                // Calculate total price when data is fetched
                const priceSum = data.reduce((acc, book) => acc + parseFloat(book.price || 0), 0);
                setTotalPrice(priceSum);
            } catch (error) {
                console.error('Error fetching borrowed books:', error);
            }
        };

        fetchBorrowedBooks();
    }, [user.email]);

    const handleReturn = async (bookId) => {
        try {
            const response = await fetch('https://b9a11-server-side-protim1451.vercel.app/return', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ bookId, userEmail: user.email })
            });
            if (!response.ok) {
                throw new Error('Failed to return book');
            }
            setBorrowedBooks(borrowedBooks.filter(book => book.bookId !== bookId));
            Swal.fire('Success', 'Book returned successfully', 'success');

            // Recalculate total price after a book is returned
            const updatedPrice = borrowedBooks
                .filter(book => book.bookId !== bookId)
                .reduce((acc, book) => acc + (book.price || 0), 0);
            setTotalPrice(updatedPrice);
        } catch (error) {
            console.error('Error returning book:', error);
            Swal.fire('Error', 'Failed to return book', 'error');
        }
    };

    return (
        <div className="container mx-auto">
            <Helmet>BookNest || Borrowed Books</Helmet>
            <h2 className="text-3xl font-bold mb-4 text-center">Bought Books</h2>

            <div className="text-center text-xl font-semibold mb-4">
                Total Price: ${totalPrice}
                <button
                    className="mt-4 ml-4 px-4 py-2 bg-green-400 text-white rounded">
                    Make Payment
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {borrowedBooks.map((borrowedBook, index) => (
                    <div key={index} className="border p-4 text-center">
                        <img src={borrowedBook.image} alt={borrowedBook.name} className="w-full h-auto object-cover mb-2" />
                        <h3 className="text-xl font-bold mb-2">{borrowedBook.name}</h3>
                        <p><span className='font-bold'>Category:</span> {borrowedBook.category}</p>
                        <p><span className='font-bold'>Bought By:</span> {borrowedBook.userName}</p>
                        <p><span className='font-bold'>Email:</span> {borrowedBook.userEmail}</p>
                        <p><span className='font-bold'>Price:</span> ${borrowedBook.price}</p>
                        <p><span className='font-bold'>Buying Date:</span> {new Date(borrowedBook.borrowDate).toLocaleDateString()}</p>
                        <button
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                            onClick={() => handleReturn(borrowedBook.bookId)}
                        >
                            Return
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BorrowedBooks;
