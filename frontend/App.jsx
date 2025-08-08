import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import LinkBank from './pages/LinkBank.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Navbar from './pages/Navbar.jsx';
import Profile from './pages/profile.jsx';
import AddJar from './pages/AddJar.jsx';
import Jardashboard from './pages/JarDashboard.jsx';
import Income from './pages/Income.jsx';
import Settings from './pages/Settings.jsx';
import TrackProgress from './pages/TrackProgress.jsx';


function PrivateRoute({ children }) {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" replace />;
}

function AppWrapper() {
    const location = useLocation();
    const hideNavbarPaths = ['/login', '/register'];

    return (
        <>
            {/* Show Navbar on all pages except login/register */}

            {!hideNavbarPaths.includes(location.pathname) && <Navbar />}


            <Routes>
                {/* Redirect root path based on auth */}
                <Route
                    path="/"
                    element={
                        localStorage.getItem('token') ? (
                            <Navigate to="/dashboard" replace />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />

                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected routes */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/link-bank"
                    element={
                        <PrivateRoute>
                            <LinkBank />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/Profile"
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/Income"
                    element={
                        <PrivateRoute>
                            <Income />
                        </PrivateRoute>
                    }
                />
                <Route path="/add-jar" element={<AddJar />} />
                <Route path="/jar-dashboard" element={<Jardashboard />} />
                <Route path="/Settings" element={<Settings />} />
                <Route path="/TrackProgress" element={<TrackProgress />} />

            </Routes>
        </>
    );
}

export default function App() {
    return (
        <Router>
            <AppWrapper />
        </Router>
    );
}
