import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateBookForm = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                //const response = await fetch(`https://b9a11-server-side-protim1451.vercel.app/books/${bookId}`);
                const response = await fetch(`http://localhost:3000/books/${bookId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch book');
                }
                const data = await response.json();
                setBook(data);
            } catch (error) {
                console.error('Error fetching book:', error);
            }
        };

        fetchBook();
    }, [bookId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedBook = {
            image: e.target.image.value,
            name: e.target.name.value,
            author: e.target.author.value,
            category: e.target.category.value,
            rating: e.target.rating.value
        };

        console.log(`Updating book with ID: ${bookId}`, updatedBook);

        try {
            const response = await fetch(`http://localhost:3000/books/${bookId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedBook)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server response:', errorText);
                throw new Error('Failed to update book');
            }

            Swal.fire({
                title: 'Success!',
                text: 'Your book has been updated.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/myaddedbooks');
            });
        } catch (error) {
            console.error('Error updating book:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update the book.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className="container mx-auto">
            <Helmet>BookNest || Update</Helmet>
            <h2 className="text-3xl font-bold mb-4 text-center">Update Book</h2>
            {book ? (
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                    <div className="mb-4">
                        <label className="block text-gray-700">Image URL:</label>
                        <input
                            type="text"
                            name="image"
                            defaultValue={book.image}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name:</label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={book.name}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Author Name:</label>
                        <input
                            type="text"
                            name="author"
                            defaultValue={book.author}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Category:</label>
                        <select
                            name="category"
                            defaultValue={book.category}
                            className="w-full px-3 py-2 border rounded-md"
                        >
                            <option value="Fiction">Fiction</option>
                            <option value="Non-fiction">Non-fiction</option>
                            <option value="Mystery">Mystery</option>
                            <option value="Romance">Romance</option>
                            <option value="Science fiction">Science fiction</option>
                            <option value="Fantasy">Fantasy</option>
                            <option value="Thriller">Thriller</option>
                            <option value="Historical fiction">Historical fiction</option>
                            <option value="Biography">Biography</option>
                            <option value="Self-help">Self-help</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Rating:</label>
                        <input
                            type="number"
                            name="rating"
                            defaultValue={book.rating}
                            min="0"
                            max="5"
                            step="0.1"
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="px-4 py-2 btn-block bg-blue-500 text-white rounded-md">
                            Update
                        </button>
                    </div>
                </form>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UpdateBookForm;
