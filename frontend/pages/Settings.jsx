// Settings.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Settings.css';
import Sidebar from './Sidebar.jsx';

export default function Settings() {
    const [email, setEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [income, setIncome] = useState(0);
    const [bankLinked, setBankLinked] = useState(false);
    const [upiId, setUpiId] = useState('');
    const [mobile, setMobile] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get('http://localhost:5000/api/bank/', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEmail(res.data.email || '');
                setBankLinked(!!res.data.bankName);
                setUpiId(res.data.upiId || '');
                setMobile(res.data.mobile || '');
                setIncome(res.data.balance || 0);
            } catch (err) {
                console.error('Failed to load settings data', err);
            }
        };
        fetchData();
    }, []);

    const handleChangeEmail = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.put('http://localhost:5000/api/auth/email', { newEmail }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Email updated!');
            setEmail(newEmail);
            setNewEmail('');
        } catch (err) {
            alert('Failed to update email');
        }
    };

    const handleChangePassword = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.put('http://localhost:5000/api/auth/password', {
                currentPassword,
                newPassword
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert('Password updated!');
            setCurrentPassword('');
            setNewPassword('');
        } catch (err) {
            alert('Failed to update password');
            console.error(err);
        }
    };

    const handleSyncIncome = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.get('http://localhost:5000/api/bank/sync-income', {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert(`Synced! New income: ₹${res.data.income}`);
            setIncome(res.data.income);
        } catch (err) {
            alert('Failed to sync income');
        }
    };

    const handleUnlinkBank = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete('http://localhost:5000/api/bank/unlink', {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Bank unlinked!');
            setBankLinked(false);
        } catch (err) {
            alert('Failed to unlink bank');
        }
    };

    return (

        <div className="settings-wrapper">

            <h2>⚙️ Settings</h2>


            <div className="settings-section">
                <Sidebar />
                <h3>🔐 Change Password</h3>
                <div className="password-toggle">
                    <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Current Password"
                    />
                    <button onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                        {showCurrentPassword ? '🙈' : '👁️'}
                    </button>
                </div>
                <div className="password-toggle">
                    <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New Password"
                    />
                    <button onClick={() => setShowNewPassword(!showNewPassword)}>
                        {showNewPassword ? '🙈' : '👁️'}
                    </button>
                </div>
                <button onClick={handleChangePassword}>Update Password</button>
            </div>

            <div className="settings-section">
                <h3>📧 Change Email</h3>
                <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="New Email" />
                <button onClick={handleChangeEmail}>Update Email</button>
            </div>

            <div className="settings-section">
                <h3>💰 Sync Income from Bank</h3>
                <p>Current App Income: ₹{income}</p>
                <button onClick={handleSyncIncome}>🔄 Sync Income</button>
            </div>

            <div className="settings-section">
                <h3>🏦 Bank Settings</h3>
                <p>Status: {bankLinked ? '✅ Linked' : '❌ Not Linked'}</p>
                {bankLinked && (
                    <>
                        <p>UPI ID: ****{upiId.slice(-6)}</p>
                        <p>Mobile: *******{mobile.slice(-3)}</p>
                        <button onClick={handleUnlinkBank} className="unlink-btn">Unlink Bank</button>
                    </>
                )}
            </div>
        </div>
    );
}