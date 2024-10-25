import { useContext, useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../FirebaseProvider/FirebaseProvider";

const AddBook = () => {
    const { user } = useContext(AuthContext);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        image: '',
        name: '',
        quantity: '',
        author: '',
        category: '',
        shortDescription: '',
        rating: '',
        userId: user ? user.uid : '',
        userName: user ? user.displayName : '',
        userEmail: user ? user.email : ''
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                //const response = await fetch('https://b9a11-server-side-protim1451.vercel.app/categories');
                const response = await fetch('http://localhost:3000/categories');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                console.log('Fetched categories:', data); // Debug log
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await submitFormDataToBackend(formData);
        if (success) {
            toast.success('Book added successfully');
            setFormData({
                image: '',
                name: '',
                quantity: '',
                author: '',
                category: '',
                shortDescription: '',
                rating: '',
                userId: user ? user.uid : '',
                userName: user ? user.displayName : '',
                userEmail: user ? user.email : ''
            });
        } else {
            toast.error('Failed to add book');
        }
    };

    const submitFormDataToBackend = async (formData) => {
        try {
            const response = await fetch('http://localhost:3000/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            return response.ok;
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    };

    return (
        <div className="max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">Add Book</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-bold">Image URL:</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-bold">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-bold">Quantity:</label>
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-bold">Author:</label>
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div>
                    <label className='font-bold'>
                        Category:
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                        >
                            <option value="">Select a category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div>
                    <label className="block mb-1 font-bold">Short Description:</label>
                    <textarea
                        name="shortDescription"
                        value={formData.shortDescription}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                    ></textarea>
                </div>
                <div>
                    <label className="block mb-1 font-bold">Rating:</label>
                    <select
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                    >
                        <option value="">Select a rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-teal-600 btn-block text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Add Book
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddBook;
