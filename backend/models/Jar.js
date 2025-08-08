import mongoose from 'mongoose';

const JarSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    jarName: { type: String, required: true },
    emoji: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    currentAmount: { type: Number, default: 0 },
    category: { type: String, default: 'Others' }, // 🆕 Added category
    notes: { type: String }, // 🆕 Optional description
    goalDate: { type: Date }, // 🆕 Optional future target date
    isAutoSaveEnabled: { type: Boolean, default: false }, // 🆕 Optional future use
    locked: { type: Boolean, default: false },
}, { timestamps: true });


export default mongoose.model('Jar', JarSchema);
