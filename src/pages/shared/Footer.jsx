

const Footer = () => {
    return (
        <div>
            <footer className="footer p-10 text-white">
                <nav>
                    <h6 className="footer-title">Discover</h6>
                    <a className="link link-hover">Browse Books</a>
                    <a className="link link-hover">Recommended Reads</a>
                    <a className="link link-hover">Popular Genres</a>
                    <a className="link link-hover">New Arrivals</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Explore</h6>
                    <a className="link link-hover">Book Clubs</a>
                    <a className="link link-hover">Author Interviews</a>
                    <a className="link link-hover">Reading Challenges</a>
                    <a className="link link-hover">Book Discussions</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Connect</h6>
                    <a className="link link-hover">About BookNest</a>
                    <a className="link link-hover">Contact Us</a>
                    <a className="link link-hover">Join Our Team</a>
                    <a className="link link-hover">Press Releases</a>
                </nav>
                <form>
                    <h6 className="footer-title">Stay Updated</h6>
                    <fieldset className="form-control w-80">
                        <label className="label">
                            <span className="label-text text-white">Subscribe to our Newsletter</span>
                        </label>
                        <div className="join">
                            <input type="text" placeholder="Enter your email address" className="input input-bordered join-item" />
                            <button className="btn btn-primary join-item">Subscribe</button>
                        </div>
                    </fieldset>
                </form>
            </footer>

        </div>
    );
};

export default Footer;