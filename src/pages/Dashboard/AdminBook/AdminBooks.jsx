import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const AdminBooks = () => {
    const [books, setBooks] = useState([]); // State to hold all books
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost:3000/books'); // Fetch all books
                if (!response.ok) {
                    throw new Error('Failed to fetch books');
                }
                const data = await response.json();
                setBooks(data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    const handleDeleteBook = async (bookId) => {
        try {
            const response = await fetch(`http://localhost:3000/books/${bookId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setBooks(prevBooks => prevBooks.filter(book => book._id !== bookId));
                Swal.fire({
                    title: 'Deleted!',
                    text: 'The book has been deleted.',
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
            <Helmet>BookNest || Admin Dashboard</Helmet>
            <h2 className="text-3xl font-bold mb-4 text-center">All Books</h2>
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
                    {books.map((book) => (
                        <tr key={book._id}>
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
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminBooks;
