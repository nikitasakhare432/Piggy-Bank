// routes/jarRoutes.js
import express from 'express';
import Jar from '../models/Jar.js';
import auth from '../middleware/auth.js';
import User from '../models/user.js';

const router = express.Router();

// ➕ Create new jar
router.post('/', auth, async (req, res) => {
    const {
        jarName,
        emoji,
        targetAmount,
        category = 'Others',
        notes = '',
        goalDate = null,
        isAutoSaveEnabled = false
    } = req.body;

    if (!jarName || !emoji || !targetAmount) {
        return res.status(400).json({ message: 'Jar name, emoji, and target amount are required' });
    }

    try {
        const newJar = new Jar({
            userId: req.userId,
            jarName,
            emoji,
            targetAmount: Number(targetAmount),
            category,
            notes,
            goalDate,
            isAutoSaveEnabled
        });

        await newJar.save();
        res.status(201).json({ message: 'Jar created successfully', jar: newJar });
    } catch (err) {
        console.error('Error creating jar:', err);
        res.status(500).json({ message: 'Failed to create jar' });
    }
});

// 📦 Get all jars for the user
router.get('/', auth, async (req, res) => {
    try {
        const jars = await Jar.find({ userId: req.userId });
        res.json(jars);
    } catch (err) {
        console.error('Error fetching jars:', err);
        res.status(500).json({ message: 'Failed to fetch jars' });
    }
});

// 🔄 Toggle jar lock/unlock
router.patch('/:id/toggle-lock', auth, async (req, res) => {
    try {
        const jar = await Jar.findById(req.params.id);
        if (!jar || jar.userId.toString() !== req.userId) {
            return res.status(404).json({ message: 'Jar not found or unauthorized' });
        }

        jar.locked = !jar.locked;
        await jar.save();

        res.json({ message: `Jar ${jar.locked ? 'locked' : 'unlocked'}`, jar });
    } catch (err) {
        console.error('Error toggling lock:', err);
        res.status(500).json({ message: 'Failed to toggle lock' });
    }
});

// ❌ Delete jar
// Backend route (routes/jarRoutes.js)
router.delete('/:id', auth, async (req, res) => {
    try {
        const jar = await Jar.findById(req.params.id);
        if (!jar || jar.userId.toString() !== req.userId) {
            return res.status(404).json({ message: 'Jar not found or unauthorized' });
        }

        await jar.deleteOne();
        res.json({ message: 'Jar deleted successfully' });
    } catch (err) {
        console.error('Error deleting jar:', err);
        res.status(500).json({ message: 'Failed to delete jar' });
    }
});


// 💰 Update currentAmount in a jar
router.patch('/:id/update-amount', auth, async (req, res) => {
    const { amount } = req.body;

    try {
        const jar = await Jar.findById(req.params.id);
        if (!jar || jar.userId.toString() !== req.userId) {
            return res.status(404).json({ message: 'Jar not found or unauthorized' });
        }

        if (jar.locked) {
            return res.status(403).json({ message: 'Jar is locked. Cannot add funds.' });
        }

        jar.currentAmount += Number(amount);
        await jar.save();

        res.json({ message: 'Amount updated successfully', jar });
    } catch (err) {
        console.error('Error updating amount:', err);
        res.status(500).json({ message: 'Failed to update amount' });
    }
});
router.get('/income', auth, async (req, res) => {
    try {
        const jars = await Jar.find({ userId: req.userId });
        const user = await User.findById(req.userId); // ⚠️ this line needs User model

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ income: user.income, jars });
    } catch (err) {
        console.error('Dashboard fetch error:', err); // This will print full error in terminal
        res.status(500).json({ message: 'Failed to fetch dashboard data' });
    }
});





export default router;
