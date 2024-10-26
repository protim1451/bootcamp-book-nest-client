import React from 'react';

const HowItWorks = () => {
    return (
        <section className="my-12 mx-4 lg:mx-32">
            <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {/* Step 1: Browse Products */}
                <div className="p-6 border rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Step 1: Browse Products</h3>
                    <p>Explore our vast collection of products. Navigate through categories or use the search function to find exactly what you're looking for.</p>
                </div>

                {/* Step 2: Add to Read List or Wishlist */}
                <div className="p-6 border rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Step 2: Buy Books</h3>
                    <p>Click Your preferred category. You will find books of your clicked category.</p>
                </div>

                {/* Step 3: View Product Details */}
                <div className="p-6 border rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Step 3: View Product Details</h3>
                    <p>Click on any product to view its details. You can click Buy Now button to buy.</p>
                </div>

                {/* Step 4: Sign Up / Log In */}
                <div className="p-6 border rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Step 4: Sign Up / Log In</h3>
                    <p>Create an account or log in to access your Dashboard. Your account keeps track of your progress and preferences.</p>
                </div>

                {/* Step 5: Use Firebase Authentication */}
                <div className="p-6 border rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Step 5: Use Firebase Authentication</h3>
                    <p>Securely log in to your account using Firebase Authentication. We support email, password, and other sign-in methods.</p>
                </div>

                {/* Step 6: Enjoy */}
                <div className="p-6 border rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Step 6: Enjoy!</h3>
                    <p>With your account set up and your favorite products saved, you can explore and use the platform seamlessly!</p>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
