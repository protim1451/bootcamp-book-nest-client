import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import { useEffect, useState } from "react";
import './Navbar.css'; // Ensure you have the CSS file

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [currentUser, setCurrentUser] = useState(null);
    const [darkTheme, setDarkTheme] = useState(false);

    useEffect(() => {
        setCurrentUser(user);
    }, [user]);

    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/addbooks'>Add Books</NavLink></li>
        <li><NavLink to='/allbooks'>All Books</NavLink></li>
        <li><NavLink to='/myaddedbooks'>My Added Books</NavLink></li>
        <li><NavLink to='/borrowedbooks'>Borrowed Books</NavLink></li>
    </>;

    const toggleTheme = () => {
        setDarkTheme(prevTheme => !prevTheme);
    };

    return (
        <div className={`navbar ${darkTheme ? 'dark' : 'light'}`}>
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {links}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost text-xl">
                    <img className="w-[40px] h-[40px]" src="https://i.ibb.co/2tFwrnr/icon.jpg" alt="" />
                    BookNest
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end relative flex items-center">
                {currentUser ? (
                    <div className="profile-wrapper">
                        <img className="rounded-full w-10 h-10 cursor-pointer" src={currentUser.photoURL} alt={currentUser.displayName} />
                        <div className="profile-tooltip">
                            <p>{currentUser.displayName}</p>
                            <img className="rounded-full w-20 h-20" src={currentUser.photoURL} alt={currentUser.displayName} />
                        </div>
                    </div>
                ) : null}
                {user ? (
                    <button onClick={logOut} className="btn bg-purple-600">Logout</button>
                ) : (
                    <Link to='/login' className="btn btn-primary">Login</Link>
                )}
                <button onClick={toggleTheme} className="btn bg-yellow-300 btn-circle p-1 ml-2">Toggle Theme</button>
            </div>
        </div>
    );
};

export default Navbar;
