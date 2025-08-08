// models/User.js
import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String, // hashed
    googleId: String, // for future
    income: {
        type: Number,
        required: true,
        default: 0
    }

});

export default mongoose.model('User', UserSchema);