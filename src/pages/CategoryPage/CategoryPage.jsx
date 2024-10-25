// CategoryPage.jsx
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const CategoryPage = () => {
    const { category } = useParams();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooksByCategory = async () => {
            try {
                console.log(`Fetching books for category: ${category}`);
                //const response = await fetch(`https://b9a11-server-side-protim1451.vercel.app/books/category/${category}`);
                const response = await fetch(`http://localhost:3000/books/category/${category}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch books by category');
                }
                const data = await response.json();
                console.log('Fetched books:', data);
                setBooks(data);
            } catch (error) {
                console.error('Error fetching books by category:', error);
            }
        };

        fetchBooksByCategory();
    }, [category]);

    return (
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">{category} Books</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {books.map((book) => (
                    <div key={book._id} className="border p-4">
                        <img src={book.image} alt={book.name} className="w-full h-48 object-cover mb-4" />
                        <h3 className="text-xl font-bold">{book.name}</h3>
                        <p className="text-gray-600">{book.author}</p>
                        <p className="text-gray-600">{book.quantity} copies available</p>
                        <Link to={`/book/${book._id}`} className="text-blue-500 hover:underline">See Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;
