import "./Review.css"

const Review = () => {
    return (
        <div className="review-container mx-auto mt-6 max-w-lg">
            <h2 className="text-3xl font-bold mb-4">Write Your Review</h2>
            <form className="space-y-4">
                <div className="mb-4">
                    <label className="block text-gray-700  font-bold mb-2" htmlFor="userName">
                        User Name
                    </label>
                    <input
                        className="input-field"
                        id="userName"
                        type="text"
                        placeholder="Enter your name"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
                        Phone
                    </label>
                    <input
                        className="input-field"
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="input-field"
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="bookName">
                        Book Name
                    </label>
                    <input
                        className="input-field"
                        id="bookName"
                        type="text"
                        placeholder="Enter the book name"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="rating">
                        Rating
                    </label>
                    <select
                        className="input-field"
                        id="rating"
                    >
                        <option value="1">1 Star</option>
                        <option value="2">2 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="5">5 Stars</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="review">
                        Review
                    </label>
                    <textarea
                        className="input-field"
                        id="review"
                        placeholder="Write your review here"
                        rows="6"
                    ></textarea>
                </div>
                <button
                    className="btn text-white font-semibold 
                    text-[1.2rem] bg-[#59C6D2] hover:bg-[#17BE0A]"
                    type="button"
                >
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default Review;
