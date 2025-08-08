

import User from '../models/user.js';
import Bank from '../models/BankAccount.js';

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id; // from JWT middleware
        const user = await User.findById(userId).select('name email');
        const bank = await Bank.findOne({ userId });

        res.json({
            name: user.name,
            bankName: bank?.bankName,
            upiId: bank?.upiId,
            balance: bank?.initialBalance
        });
    } catch (error) {
        res.status(500).json({ message: 'Error loading dashboard' });
    }
};
