import { useEffect, useState } from 'react';
import axios from 'axios';
import './JarsDashboard.css';
import Sidebar from './Sidebar.jsx';

export default function JarsDashboard() {
    const [jars, setJars] = useState([]);
    const [amounts, setAmounts] = useState({});

    const fetchJars = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.get('http://localhost:5000/api/jar/', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setJars(res.data);
        } catch (err) {
            console.error('Error fetching jars:', err);
            alert('Failed to fetch jars. Please try again later.');
        }
    };

    const toggleLock = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.patch(`http://localhost:5000/api/jar/${id}/toggle-lock`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchJars();
        } catch (err) {
            alert('Error toggling lock');
            console.error(err);
        }
    };

    const deleteJar = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:5000/api/jar/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchJars();
        } catch (err) {
            console.error('Error deleting jar:', err);
        }
    };

    const updateAmount = async (id) => {
        const token = localStorage.getItem('token');
        const amount = amounts[id];

        if (!amount || isNaN(amount)) {
            return alert('Please enter a valid amount');
        }

        try {
            await axios.patch(`http://localhost:5000/api/jar/${id}/update-amount`, {
                amount: Number(amount),
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setAmounts(prev => ({ ...prev, [id]: '' }));
            fetchJars();
        } catch (err) {
            alert('Error updating amount');
            console.error(err);
        }
    };

    useEffect(() => {
        fetchJars();
    }, []);

    return (
        <div className="dashboard-wrapper">
            <div className="sidebar">
                <Sidebar />
            </div>

            <div className="dashboard-content">
                <h2 className="dashboard-title">🐷 Your Saving Jars</h2>

                {jars.length === 0 ? (
                    <p className="text-center text-gray-500 mt-10">No jars found. Start saving by creating one!</p>
                ) : (
                    <div className="jars-grid">
                        {jars.map(jar => (
                            <div key={jar._id} className="jar-card">
                                <div className="jar-header">{jar.emoji} {jar.jarName}</div>
                                <div className="jar-info">₹{jar.currentAmount} / ₹{jar.targetAmount}</div>
                                {jar.notes && <div className="jar-info">📝 {jar.notes}</div>}
                                {jar.goalDate && (
                                    <div className="jar-info">🎯 Goal: {new Date(jar.goalDate).toDateString()}</div>
                                )}
                                {jar.category && <span className="jar-badge">{jar.category}</span>}

                                <div className="input-row">
                                    <input
                                        type="number"
                                        placeholder="Add ₹"
                                        value={amounts[jar._id] || ''}
                                        onChange={e => setAmounts(prev => ({ ...prev, [jar._id]: e.target.value }))}
                                        disabled={jar.locked}
                                    />
                                    <button onClick={() => updateAmount(jar._id)} disabled={jar.locked}>➕ Add</button>
                                </div>

                                <div className="lock-delete-row">
                                    <button
                                        className={jar.locked ? 'locked-btn' : 'unlocked-btn'}
                                        onClick={() => toggleLock(jar._id)}
                                    >
                                        {jar.locked ? '🔒 Locked' : '🔓 Unlock'}
                                    </button>
                                    <button className="delete-btn" onClick={() => deleteJar(jar._id)}>❌ Delete</button>
                                </div>

                                <div className="pay-row">
                                    <button className="pay-btn" onClick={() => updateAmount(jar._id)} disabled={jar.locked}>
                                        💸 Pay
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

}
