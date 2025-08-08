import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlusCircle, FaWallet, FaChartPie, FaCog } from 'react-icons/fa';
import axios from 'axios';
import './Dashboard.css';

export default function Dashboard() {
    const [income, setIncome] = useState(0);
    const [totalSaved, setTotalSaved] = useState(0);
    const [jarCount, setJarCount] = useState(0);

    const fetchDashboardData = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.get('http://localhost:5000/api/jar/income', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setIncome(res.data.income || 0);
            const jars = res.data.jars || [];
            setJarCount(jars.length);
            const saved = jars.reduce((sum, jar) => sum + jar.currentAmount, 0);
            setTotalSaved(saved);
        } catch (err) {
            console.error('Dashboard fetch error:', err);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const incomeLeft = income - totalSaved;

    return (
        <div className="dashboard-grid-wrapper">
            <h1 className="dashboard-header">🏠 Main Dashboard</h1>

            {/* 💰 Stats */}
            <div className="dashboard-stats">
                <div className="stat-box">💰 Income: ₹{income}</div>
                <div className="stat-box">📦 Saved: ₹{totalSaved}</div>
                <div className="stat-box">🧮 Left: ₹{incomeLeft}</div>
                <div className="stat-box">📊 Jars: {jarCount}</div>
            </div>

            {/* 🔗 Features */}
            <div className="dashboard-grid">
                <motion.div whileHover={{ scale: 1.05 }} className="dashboard-tile">
                    <Link to="/add-jar">
                        <FaPlusCircle size={40} />
                        <p>Add Jar</p>
                    </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} className="dashboard-tile">
                    <Link to="/Income">
                        <FaWallet size={40} />
                        <p>Income</p>
                    </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} className="dashboard-tile">
                    <Link to="/TrackProgress">
                        <FaChartPie size={40} />
                        <p>Track Progress</p>
                    </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} className="dashboard-tile">
                    <Link to="/jar-dashboard">
                        <FaChartPie size={40} />
                        <p>Display Jar</p>
                    </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} className="dashboard-tile">
                    <Link to="/Settings">
                        <FaCog size={40} />
                        <p>Settings</p>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
