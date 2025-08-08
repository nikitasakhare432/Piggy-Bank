import React, { useState } from 'react';
import Sidebar from './Sidebar'; // your sidebar component
import './SidebarLayout.css';

export default function SidebarLayout({ children }) {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <div className="layout-wrapper">
            {isSidebarOpen && <Sidebar />}

            <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                <button className="toggle-btn" onClick={toggleSidebar}>
                    {isSidebarOpen ? '👈 Hide' : '👉 Show'}
                </button>

                {children}
            </div>
        </div>
    );
}
