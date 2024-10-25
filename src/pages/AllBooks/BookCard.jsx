import Reveal from "react-awesome-reveal";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
    const { _id, image, name, author, category, shortDescription, rating, quantity } = book;

    return (
       
            <div>
                <div className="card bg-base-100 shadow-xl">
                    <figure><img className="w-full h-[280px]" src={image} alt={name} /></figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            {name}
                        </h2>
                        <div className="badge badge-secondary">{category}</div>
                        <p>{shortDescription.slice(0, 100)}
                        </p>
                        <div className="card-actions justify-end">
                            <div className="badge badge-outline">Author: {author}</div>
                            <div className="badge badge-outline">Rating: {rating}</div>
                            <div className="badge badge-outline">Quantity: {quantity}</div>
                        </div>
                        <div className="card-body">
                            <p>Added By: <small>{book.userName} ({book.userEmail})</small></p>
                        </div>
                    </div>
                </div>
            </div>
        
    );
};

export default BookCard;
