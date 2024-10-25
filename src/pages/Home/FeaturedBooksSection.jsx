import React from 'react';

const FeaturedBooksSection = () => {
    // Sample data for featured books (replace with actual data)
    const featuredBooks = [
        {
            id: 1,
            title: 'The War of the Worlds',
            author: 'H.G. Wells',
            description: 'An early science fiction classic depicting an invasion of Earth by Martians, showcasing humanity\'s struggle for survival against a technologically superior foe.',
            imageUrl: 'https://i.ibb.co/17DtvYv/gone-girl.jpg',
            category: 'Fiction',
            link: '/books/1'
        },
        {
            id: 2,
            title: 'The Girl with the Dragon Tattoo',
            author: 'Stieg Larsson',
            description: 'A journalist and a hacker team up to solve the mystery of a woman\'s disappearance forty years ago, uncovering deep corruption and family secrets.',
            imageUrl: 'https://i.ibb.co/GRLq9jp/The-Subtle-Art.jpg',
            category: 'Mystery',
            link: '/books/2'
        },
        {
            id: 3,
            title: 'The Book Thief',
            author: 'Markus Zusak',
            description: 'Set in Nazi Germany, the story follows a young girl named Liesel who steals books and shares them with others while her family hides a Jewish man in their basement.',
            imageUrl: 'https://i.ibb.co/17DtvYv/gone-girl.jpg',
            category: 'Historical Fiction',
            link: '/books/3'
        },
        {
            id: 4,
            title: 'All the Light We Cannot See',
            author: 'Anthony Doerr',
            description: 'The lives of a blind French girl and a German soldier collide in occupied France during World War II, highlighting the human cost of war.',
            imageUrl: 'https://i.ibb.co/CQmmwNC/vinci-code.jpg',
            category: 'Historical Fiction',
            link: '/books/4'
        },
        {
            id: 5,
            title: 'The Nightingale',
            author: 'Kristin Hannah',
            description: 'Two sisters in Nazi-occupied France face harrowing choices and dangers as they resist the German occupation during World War II.',
            imageUrl: 'https://i.ibb.co/bFwP02S/And-Then-There-Were-None.jpg',
            category: 'Historical Fiction',
            link: '/books/5'
        },
        {
            id: 6,
            title: 'Wolf Hall',
            author: 'Hilary Mantel',
            description: 'A historical novel about Thomas Cromwell\'s rise to power in the court of King Henry VIII, exploring the complexities of Tudor politics and religion.',
            imageUrl: 'https://i.ibb.co/59dxsJY/The-Sixth-Extinction-An-Unnatural-History.jpg',
            category: 'Historical Fiction',
            link: '/books/6'
        }

    ];
    

    return (
        <div className="featured-books-section mt-6 md:my-10">
            <h2 className='text-4xl font-bold text-center mb-4'>Featured Books</h2>
            <div className="featured-books-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuredBooks.map(book => (
                    <div key={book.id} className="featured-book bg-white rounded-lg overflow-hidden shadow-md">
                        <img className="w-full h-64 object-cover object-center" src={book.imageUrl} alt={book.title} />
                        <div className="p-4">
                            <h3 className="text-xl font-bold mb-2">{book.title}</h3>
                            <p className="text-gray-700">By {book.author}</p>
                            <p className="text-gray-600 mt-2">{book.description}</p>
                            <p className="text-gray-700 mt-2">Category: {book.category}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedBooksSection;
