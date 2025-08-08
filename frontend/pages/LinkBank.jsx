import React, { useState } from 'react';
import axios from 'axios';
import './LinkBank.css';

export default function LinkBank() {
    const [formData, setFormData] = useState({
        bankName: '',
        upiId: '',
        cardLast4: '',
        cvv: '',
        expiry: '',
        currentBalance: ''
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const payload = {
                ...formData,
                currentBalance: Number(formData.currentBalance),
            };

            const res = await axios.post('http://localhost:5000/api/bank/', payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setMessage(res.data.message);
            setError('');
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Something went wrong';
            if (errorMsg.includes('already linked')) {
                setError('You already linked a bank account. Try updating instead.');
            } else {
                setError(errorMsg);
            }
            setMessage('');
        }
    };

    return (
        <div className="linkbank-container">
            <div className="linkbank-card">
                <h2 className="linkbank-title">🔗 Link Your Bank</h2>

                <form onSubmit={handleSubmit} className="linkbank-form">
                    <label>Bank Name</label>
                    <select name="bankName" value={formData.bankName} onChange={handleChange} required>
                        <option value="">Select Bank</option>
                        <option value="SBI">SBI</option>
                        <option value="HDFC">HDFC</option>
                        <option value="ICICI">ICICI</option>
                        <option value="Axis">Axis</option>
                    </select>

                    <label>UPI ID</label>
                    <input type="text" name="upiId" value={formData.upiId} onChange={handleChange} required />

                    <label>Card Last 4 Digits</label>
                    <input type="text" name="cardLast4" maxLength="4" value={formData.cardLast4} onChange={handleChange} required />

                    <label>CVV</label>
                    <input type="password" name="cvv" maxLength="3" value={formData.cvv} onChange={handleChange} required />

                    <label>Expiry</label>
                    <input type="month" name="expiry" value={formData.expiry} onChange={handleChange} required />

                    <label>Initial Balance (₹)</label>
                    <input type="number" name="currentBalance" value={formData.currentBalance} onChange={handleChange} required />

                    <button type="submit" className="linkbank-button">Link Bank</button>
                </form>

                {message && <p className="linkbank-message success">{message}</p>}
                {error && <p className="linkbank-message error">{error}</p>}
            </div>
        </div>
    );
}
