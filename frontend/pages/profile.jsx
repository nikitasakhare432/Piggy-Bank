// Profile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

export default function Profile() {
    const [profileData, setProfileData] = useState(null);
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');

                const [bankRes, summaryRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/bank/', {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get('http://localhost:5000/api/jar/income', {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);

                setProfileData(bankRes.data);
                setSummary(summaryRes.data);
            } catch (error) {
                alert('Failed to load profile or summary');
                console.error(error);
            }
        };

        fetchData();
    }, []);

    if (!profileData || !summary) return <div>Loading profile...</div>;

    const jars = summary?.jars || [];
    const income = summary?.income || 0;
    const totalSaved = jars.reduce((sum, jar) => sum + Number(jar.currentAmount), 0);
    const remaining = income - totalSaved;

    return (
        <div className="profile-wrapper">
            <div className="profile-card">
                <h2>👤 User's Profile</h2>
                <p><strong>Email:</strong> {profileData.email}</p>

                <h3>🏦 Bank Info</h3>
                <p>
                    <strong>Bank Status:</strong>{' '}
                    {profileData.bankName ? (
                        <span className="linked">✅ Linked</span>
                    ) : (
                        <span className="not-linked">❌ Not Linked</span>
                    )}
                </p>

                {profileData.bankName && (
                    <>
                        <p><strong>Bank:</strong> {profileData.bankName}</p>
                        <p><strong>UPI ID:</strong> {profileData.upiId ? `****${profileData.upiId.slice(-6)}` : '-'}</p>
                        <p><strong>Mobile:</strong> {profileData.mobile ? `*******${profileData.mobile.slice(-3)}` : '-'}</p>
                        <p><strong>Bank Balance:</strong> ₹{profileData.balance != null ? profileData.balance : '-'}</p>
                        <p><strong>App Income (Salary):</strong> ₹{income}</p>
                    </>
                )}

                <h3>💰 Financial Summary</h3>
                <div className="finance-summary">
                    <div className="income-box">💵 Total Income: ₹{income}</div>
                    <div className="saved-box">💰 Saved: ₹{totalSaved}</div>
                    <div className="remaining-box">🧮 Remaining: ₹{remaining}</div>
                </div>

                <div className="progress-bar-container">
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${(totalSaved / income) * 100}%` }} />
                    </div>
                    <p className="progress-text">You’ve saved {Math.round((totalSaved / income) * 100)}% of your income 🎯</p>
                </div>

                <button className="edit-btn">Edit Bank Details</button>
            </div>
        </div>
    );
}
