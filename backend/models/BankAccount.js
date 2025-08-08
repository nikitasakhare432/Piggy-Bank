import mongoose from 'mongoose';

const BankAccountSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bankName: String,
    upiId: String,
    cardLast4: String,
    cvv: String,
    expiry: String,
    currentBalance: Number,
});

export default mongoose.model('BankAccount', BankAccountSchema);
