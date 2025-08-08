import express from 'express';
import { linkBank, getDashboard } from '../controllers/BankController.js';
import auth from '../middleware/auth.js';
import User from '../models/user.js';
import BankAccount from '../models/BankAccount.js'; // ✅ REQUIRED import

const router = express.Router();

// POST /api/bank → Link or update bank
router.post('/', auth, linkBank);

// GET /api/bank → Get user and bank dashboard
router.get('/', auth, getDashboard);

// GET /api/bank/sync-income → Sync income from bank balance to user
router.get('/sync-income', auth, async (req, res) => {
    try {
        const bank = await BankAccount.findOne({ userId: req.userId });
        if (!bank) return res.status(404).json({ message: 'No bank account linked' });

        const updatedUser = await User.findByIdAndUpdate(
            req.userId,
            { income: bank.currentBalance },
            { new: true }
        );

        res.json({ message: 'Income synced successfully', income: updatedUser.income });
    } catch (err) {
        console.error('Sync income error:', err);
        res.status(500).json({ message: 'Failed to sync income' });
    }
});
// routes/bank.js
router.delete('/unlink', auth, async (req, res) => {
    try {
        const deleted = await BankAccount.findOneAndDelete({ userId: req.userId });
        if (!deleted) return res.status(404).json({ message: 'No bank account found' });
        res.json({ message: 'Bank unlinked successfully' });
    } catch (err) {
        console.error('Unlink error:', err);
        res.status(500).json({ message: 'Failed to unlink bank' });
    }
});


export default router;
