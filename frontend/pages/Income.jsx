// Income.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import './Income.css';

export default function Income() {
    const [income, setIncome] = useState('');
    const [existingIncome, setExistingIncome] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:5000/api/jar/income', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                setExistingIncome(res.data.income || 0);
            })
            .catch(err => {
                console.error('Failed to fetch income', err);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            await axios.post('http://localhost:5000/api/jar/income', { income }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Income saved successfully!');
            navigate('/dashboard');
        } catch (err) {
            console.error('Error saving income', err);
            alert('Failed to save income');
        }
    };

    const handleSyncIncome = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.get('http://localhost:5000/api/bank/sync-income', {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert(`Income synced! New income: ₹${res.data.income}`);
            setExistingIncome(res.data.income);
        } catch (err) {
            console.error('Sync error:', err);
            alert('Failed to sync income from bank');
        }
    };

    return (
        <div className="income-wrapper">

            <Sidebar />
            <div className="income-card">
                <h2>💼 Set Your Monthly Income</h2>
                <p>Current: ₹{existingIncome}</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="number"
                        placeholder="Enter your income"
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                        required
                        className="income-input"
                    />
                    <button type="submit" className="income-btn">Save Income</button>
                </form>

                <button type="button" className="income-btn" onClick={handleSyncIncome} style={{ marginTop: '1rem', backgroundColor: '#005a9e' }}>
                    🔄 Sync Income from Bank
                </button>
            </div>
        </div>
    );
}
