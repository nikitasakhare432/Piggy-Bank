import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import './TrackProgress.css';

export default function TrackProgress() {
    const [jars, setJars] = useState([]);

    const fetchJars = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.get('http://localhost:5000/api/jar/', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setJars(res.data);
        } catch (err) {
            console.error('Error fetching progress:', err);
        }
    };

    useEffect(() => {
        fetchJars();
    }, []);

    return (
        <div className="dashboard-wrapper">
            <Sidebar />
            <div className="dashboard-content">
                <h2 className="dashboard-title">📊 Track Your Progress</h2>
                <div className="progress-grid">
                    {jars.map((jar) => {
                        const percent = Math.min(
                            100,
                            Math.floor((jar.currentAmount / jar.targetAmount) * 100)
                        );

                        return (
                            <div key={jar._id} className="progress-card">
                                <div className="progress-header">
                                    {jar.emoji} {jar.jarName}
                                </div>
                                <div className="progress-bar-container">
                                    <div className="progress-bar" style={{ width: `${percent}%` }}></div>
                                </div>
                                <p className="progress-text">
                                    ₹{jar.currentAmount} / ₹{jar.targetAmount} ({percent}%)
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
