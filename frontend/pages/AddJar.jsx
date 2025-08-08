import './AddJar.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';

// ✅ import sidebar

export default function AddJar() {
    const [jarName, setJarName] = useState('');
    const [emoji, setEmoji] = useState('🏠');
    const [targetAmount, setTargetAmount] = useState('');
    const [category, setCategory] = useState('Others');
    const [goalDate, setGoalDate] = useState('');
    const [notes, setNotes] = useState('');
    const [isAutoSaveEnabled, setIsAutoSaveEnabled] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            await axios.post(
                'http://localhost:5000/api/jar/',
                { jarName, emoji, targetAmount, category, goalDate, notes, isAutoSaveEnabled },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert('Jar created successfully!');
            navigate('/dashboard');
        } catch (err) {
            console.error('Jar Creation Error:', err);
            alert('Error creating jar');
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />

            <div className="add-jar-container" style={{ marginLeft: '220px', padding: '2rem', width: '100%' }}>
                <div className="add-jar-box">
                    <h2 className="add-jar-title">🎯 Create a Savings Jar</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="add-jar-form-group">
                            <label className="add-jar-label">Jar Name</label>
                            <input
                                type="text"
                                className="add-jar-input"
                                value={jarName}
                                onChange={(e) => setJarName(e.target.value)}
                                placeholder="e.g. Dream Home"
                                required
                            />
                        </div>

                        <div className="add-jar-form-group">
                            <label className="add-jar-label">Emoji</label>
                            <input
                                type="text"
                                className="add-jar-input"
                                value={emoji}
                                onChange={(e) => setEmoji(e.target.value)}
                                placeholder="e.g. 🏖️"
                                required
                            />
                        </div>

                        <div className="add-jar-form-group">
                            <label className="add-jar-label">Target Amount</label>
                            <input
                                type="number"
                                className="add-jar-input"
                                value={targetAmount}
                                onChange={(e) => setTargetAmount(e.target.value)}
                                placeholder="e.g. 10000"
                                required
                            />
                        </div>

                        <div className="add-jar-form-group">
                            <label className="add-jar-label">Category</label>
                            <select
                                className="add-jar-select"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="Others">Others</option>
                                <option value="Emergency">Emergency</option>
                                <option value="Vacation">Vacation</option>
                                <option value="Education">Education</option>
                                <option value="Gaming">Gaming</option>
                            </select>
                        </div>

                        <div className="add-jar-form-group">
                            <label className="add-jar-label">Goal Date</label>
                            <input
                                type="date"
                                className="add-jar-input"
                                value={goalDate}
                                onChange={(e) => setGoalDate(e.target.value)}
                            />
                        </div>

                        <div className="add-jar-form-group">
                            <label className="add-jar-label">Notes</label>
                            <textarea
                                className="add-jar-textarea"
                                rows="3"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Optional notes about this jar..."
                            />
                        </div>

                        <div className="add-jar-checkbox-group">
                            <input
                                type="checkbox"
                                checked={isAutoSaveEnabled}
                                onChange={() => setIsAutoSaveEnabled(!isAutoSaveEnabled)}
                            />
                            <span>Enable Auto Save</span>
                        </div>

                        <button type="submit" className="add-jar-button">
                            Create Jar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
