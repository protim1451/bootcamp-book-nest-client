import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Hook/useAuth';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const MyAddedBooks = () => {
    const { user } = useAuth();
    const [userBooks, setUserBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserBooks = async () => {
            try {
                if (!user || !user.email) {
                    console.error("User object or email is missing.");
                    return;
                }

                const response = await fetch(`http://localhost:3000/books?userEmail=${user.email}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user books');
                }
                const data = await response.json();
                setUserBooks(data);
            } catch (error) {
                console.error('Error fetching user books:', error);
            }
        };

        if (user) {
            fetchUserBooks();
        }
    }, [user]);

    const handleDeleteBook = async (bookId) => {
        try {
            const response = await fetch(`http://localhost:3000/books/${bookId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setUserBooks(prevBooks => prevBooks.filter(book => book._id !== bookId));
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your book has been deleted.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else {
                throw new Error('Failed to delete book');
            }
        } catch (error) {
            console.error('Error deleting book:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to delete the book.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const confirmDeleteBook = (bookId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this book!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteBook(bookId);
            }
        });
    };

    const handleUpdateBook = (bookId) => {
        navigate(`/update-book/${bookId}`);
    };

    return (
      
        <div className="container mx-auto">
              <Helmet>BookNest || My Added Books</Helmet>
            <h2 className="text-3xl font-bold mb-4 text-center">My Added Books</h2>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th className="md:px-4 py-2">Book Name</th>
                        <th className="md:px-4 py-2">Author</th>
                        <th className="md:px-4 py-2">Quantity</th>
                        <th className="md:px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userBooks.map((book, idx) => (
                        book.userEmail === user.email ? (
                            <tr key={idx}>
                                <td className="border md:px-4 py-2">{book.name}</td>
                                <td className="border md:px-4 py-2">{book.author}</td>
                                <td className="border md:px-4 py-2">{book.quantity}</td>
                                <td className="border md:px-4 py-2">
                                    <button
                                        onClick={() => confirmDeleteBook(book._id)}
                                        className="text-red-500 font-bold hover:text-red-700 mr-4"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => handleUpdateBook(book._id)}
                                        className="text-blue-500 font-bold hover:text-blue-700"
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ) : null
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyAddedBooks;
