import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BookCategory = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                //const response = await fetch('https://b9a11-server-side-protim1451.vercel.app/categories');
                const response = await fetch('http://localhost:3000/categories');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="container mx-auto my-10">
            <h2 className="text-3xl font-bold text-center mb-6">Book Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category, index) => (
                    <div key={index} className="border p-6 rounded-lg shadow-lg bg-white hover:bg-teal-50 transition">
                        <h3 className="text-2xl font-semibold mb-4 text-gray-800">{category}</h3>
                        <p className="text-gray-600 mb-6">
                            Discover a range of books in the {category} category. Dive in and explore!
                        </p>
                        <Link to={`/category/${category}`}>
                            <button className="w-full py-2 px-4 bg-teal-500 text-white font-semibold rounded hover:bg-teal-600 transition">
                                View Products
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookCategory;
