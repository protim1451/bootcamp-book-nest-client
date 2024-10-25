import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
    const content = <>
        <h1 className="text-4xl font-bold text-white">Welcome to BookNest</h1>
        <p className="text-lg text-white lg:px-24">Dive into the World of Books with BookNest! Discover captivating stories, explore diverse genres, and embark on literary adventures. Let us be your companion in the journey of reading and discovery. Welcome to BookNest, where every book is a portal to new worlds and endless imagination.</p>
        <Link to='/register'> <button className="mt-4 px-6 py-2 btn-primary text-white rounded ">Register</button></Link>
    </>
    return (
        <div className="relative" style={{ height: '80vh' }}>
            <div className="carousel absolute inset-0 w-full">
                <div id="slide1" className="carousel-item relative w-full">
                    <img src="https://i.ibb.co/72d7y6W/1.jpg" className="w-full object-cover" alt="Banner 1" />
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 text-center">
                        {content}
                    </div>
                    <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 text-center">
                        <a href="#slide4" className="btn btn-circle absolute left-0 top-1/2 transform -translate-y-1/2">❮</a>
                        <a href="#slide2" className="btn btn-circle absolute right-0 top-1/2 transform -translate-y-1/2">❯</a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <img src="https://i.ibb.co/jkHfDF0/2.jpg" className="w-full object-cover" alt="Banner 2" />
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 text-center">
                        {content}
                    </div>
                    <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 text-center">
                        <a href="#slide1" className="btn btn-circle absolute left-0 top-1/2 transform -translate-y-1/2">❮</a>
                        <a href="#slide3" className="btn btn-circle absolute right-0 top-1/2 transform -translate-y-1/2">❯</a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                    <img src="https://i.ibb.co/WVSCcZf/3.jpg" className="w-full object-cover" alt="Banner 3" />
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 text-center">
                        {content}
                    </div>
                    <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 text-center">
                        <a href="#slide2" className="btn btn-circle absolute left-0 top-1/2 transform -translate-y-1/2">❮</a>
                        <a href="#slide4" className="btn btn-circle absolute right-0 top-1/2 transform -translate-y-1/2">❯</a>
                    </div>
                </div>
                <div id="slide4" className="carousel-item relative w-full">
                    <img src="https://i.ibb.co/x8gh3Hs/4.jpg" className="w-full object-cover" alt="Banner 4" />
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 text-center">
                        {content}
                    </div>
                    <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 text-center">
                        <a href="#slide3" className="btn btn-circle absolute left-0 top-1/2 transform -translate-y-1/2">❮</a>
                        <a href="#slide1" className="btn btn-circle absolute right-0 top-1/2 transform -translate-y-1/2">❯</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
