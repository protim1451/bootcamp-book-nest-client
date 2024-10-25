import { useEffect, useState } from 'react';
import BookCard from './BookCard'; // Assuming you have a BookCard component for rendering individual books
import { Helmet } from 'react-helmet-async';

const AllBooks = () => {
    const [books, setBooks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [showAvailableBooks, setShowAvailableBooks] = useState(false);
    const [viewMode, setViewMode] = useState('card'); // Default to card view

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                //const response = await fetch('https://b9a11-server-side-protim1451.vercel.app/books'); 
                const response = await fetch('http://localhost:3000/books'); 
                if (response.ok) {
                    const data = await response.json();
                    setBooks(data); 
                } else {
                    console.error('Failed to fetch books');
                }
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks(); 
    }, []); 

    // Filter books based on the selected category and availability
    const filteredBooks = selectedCategory
    ? books.filter(book => book.category === selectedCategory && (!showAvailableBooks || book.quantity > 0))
    : books.filter(book => !showAvailableBooks || book.quantity > 0);

    // Function to handle category selection change
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        console.log('Selected Category:', e.target.value);
    };

    // Function to handle show available books button click
    const handleShowAvailableBooks = () => {
        setShowAvailableBooks(!showAvailableBooks);
    };

    // Function to handle view mode change
    const handleViewModeChange = (mode) => {
        setViewMode(mode);
    };

    return (
        <div>
            <Helmet>BookNest | All Books</Helmet>
            <h2 className="text-2xl font-bold mb-4 text-center">All Books</h2>
            <div className="flex justify-between mb-4">
                <select
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                >
                    <option value="">Select a category</option>
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
                <div>
                    <label className="mr-2">View:</label>
                    <select
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={viewMode}
                        onChange={(e) => handleViewModeChange(e.target.value)}
                    >
                        <option value="card">Card View</option>
                        <option value="table">Table View</option>
                    </select>
                </div>
                <button
                    className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={handleShowAvailableBooks}
                >
                    {showAvailableBooks ? 'Show all books' : 'Show available books'}
                </button>
            </div>
            <div className={viewMode === 'card' ? "grid md:grid-cols-2 lg:grid-cols-3 gap-4" : ""}>
                {filteredBooks.map((book,idx) => (
                    <BookCard key={idx} book={book} />
                ))}
            </div>
            {viewMode === 'table' && (
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Category</th>    
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBooks.map((book,idx) => (
                            <tr key={idx}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.category}</td>
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AllBooks;
