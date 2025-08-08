import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css';

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/dashboard" className="navbar-logo">
                PiggyGoals
            </Link>

            <div className="navbar-links">
                <Link to="/dashboard" className="navbar-link">
                    Home
                </Link>


                {token && (
                    <Link to="/link-bank" className="navbar-link">
                        Link Bank Account
                    </Link>
                )}
            </div>

            <div>
                {token ? (
                    <>
                        <Link to="/Profile" className="navbar-icon-link" title="Profile">
                            <FaUserCircle size={24} />
                        </Link>
                        <button onClick={handleLogout} className="navbar-icon-button" title="Logout">
                            <FaSignOutAlt size={24} />
                        </button>
                    </>

                ) : (
                    <>
                        <Link to="/login" className="navbar-link">
                            Login
                        </Link>
                        <Link to="/register" className="navbar-link register-link">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
