// src/components/Sidebar.js
import { NavLink } from 'react-router-dom';
import { FaHome, FaPlusCircle, FaWallet, FaChartLine, FaChartPie, FaTags, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <h2 className="sidebar-title">💰 PiggyBank</h2>
            <nav className="sidebar-nav">
                <NavLink to="/dashboard" className="sidebar-link">
                    <FaHome /> <span>Dashboard</span>
                </NavLink>
                <NavLink to="/add-jar" className="sidebar-link">
                    <FaPlusCircle /> <span>Add Jar</span>
                </NavLink>
                <NavLink to="/income" className="sidebar-link">
                    <FaWallet /> <span>Income</span>
                </NavLink>
                <NavLink to="/progress" className="sidebar-link">
                    <FaChartLine /> <span>Track Progress</span>
                </NavLink>
                <NavLink to="/jar-dashboard" className="sidebar-link">
                    <FaChartPie /> <span>Display Jars</span>
                </NavLink>
                <NavLink to="/tags" className="sidebar-link">
                    <FaTags /> <span>Tags</span>
                </NavLink>
                <NavLink to="/settings" className="sidebar-link">
                    <FaCog /> <span>Settings</span>
                </NavLink>
                <NavLink to="/logout" className="sidebar-link">
                    <FaSignOutAlt /> <span>Logout</span>
                </NavLink>
            </nav>
        </div>
    );
}
