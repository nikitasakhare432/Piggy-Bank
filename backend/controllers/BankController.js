// controllers/bankController.js
import User from '../models/user.js';
import BankAccount from '../models/BankAccount.js';




export async function linkBank(req, res) {
    try {
        const { bankName, upiId, cardLast4, cvv, expiry, currentBalance } = req.body;

        if (!bankName || !upiId || !cardLast4 || !cvv || !expiry || currentBalance === undefined) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const existingAccount = await BankAccount.findOne({ userId: req.userId });

        if (existingAccount) {
            existingAccount.bankName = bankName;
            existingAccount.upiId = upiId;
            existingAccount.cardLast4 = cardLast4;
            existingAccount.cvv = cvv;
            existingAccount.expiry = expiry;
            existingAccount.currentBalance = currentBalance;

            await existingAccount.save();

            // 💰 Update income in User
            await User.findByIdAndUpdate(req.userId, {
                income: currentBalance,
            });

            return res.status(200).json({ message: 'Bank account updated successfully.' });
        }

        const newBankAccount = new BankAccount({
            userId: req.userId,
            bankName,
            upiId,
            cardLast4,
            cvv,
            expiry,
            currentBalance,
        });

        await newBankAccount.save();

        // 💰 Set income in User
        await User.findByIdAndUpdate(req.userId, {
            income: currentBalance,
        });

        res.status(201).json({ message: 'Bank account linked successfully.' });
    } catch (error) {
        console.error('❌ Backend error:', error);
        res.status(500).json({ message: 'Server error occurred' });
    }
}

export async function getDashboard(req, res) {
    try {
        const user = await User.findById(req.userId).select('-password');
        const bankAccount = await BankAccount.findOne({ userId: req.userId });

        if (!bankAccount) {
            return res.status(404).json({ message: 'No bank account linked yet.' });
        }

        res.json({
            name: user.name,
            email: user.email,
            bankName: bankAccount.bankName,
            upiId: bankAccount.upiId,
            cardLast4: bankAccount.cardLast4,
            expiry: bankAccount.expiry,
            balance: bankAccount.currentBalance,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
