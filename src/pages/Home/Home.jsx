import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from './Banner';
import BookCategory from './BookCategory';
import FeaturedBooksSection from './FeaturedBooksSection';
import Review from './Review';
import FAQ from './Faq';

const Home = () => {
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
        <div>
            <Helmet>BookNest || Homepage</Helmet>
            <Banner></Banner>
            <BookCategory categories={categories}></BookCategory>
            <FeaturedBooksSection></FeaturedBooksSection>
            <Review></Review>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;