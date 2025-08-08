// controllers/jarController.js
import Jar from '../models/Jar.js';

// Create a new Jar
export const createJar = async (req, res) => {
    try {
        const { name, targetAmount, category } = req.body;

        console.log('Received:', { name, targetAmount, category });
        console.log('User from auth middleware:', req.userId);

        if (!name || !targetAmount || !category) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newJar = new Jar({
            user: req.userId,  // ✅ userId is directly from middleware
            name,
            targetAmount,
            category,
        });

        await newJar.save();
        res.status(201).json({ message: 'Jar created successfully', jar: newJar });
    } catch (err) {
        console.error('Error creating jar:', err);
        res.status(500).json({ error: 'Failed to create jar' });
    }
};

// Get all jars of the user
export const getJars = async (req, res) => {
    try {
        const jars = await Jar.find({ userId: req.userId });
        res.status(200).json(jars);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch jars' });
    }
};

// Update jar amount
export const updateJar = async (req, res) => {
    const { id } = req.params;
    const { amount } = req.body;

    try {
        const jar = await Jar.findById(id);
        if (!jar || jar.userId.toString() !== req.userId) {
            return res.status(404).json({ message: 'Jar not found or unauthorized' });
        }

        jar.currentAmount += amount;
        await jar.save();

        res.json({ message: 'Amount added successfully', jar });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update jar' });
    }
};

// Lock or Unlock a jar
export const toggleJarLock = async (req, res) => {
    const { id } = req.params;

    try {
        const jar = await Jar.findById(id);
        if (!jar || jar.userId.toString() !== req.userId) {
            return res.status(404).json({ message: 'Jar not found or unauthorized' });
        }

        jar.isLocked = !jar.isLocked;
        await jar.save();

        res.json({ message: `Jar ${jar.isLocked ? 'locked' : 'unlocked'}`, jar });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to toggle lock' });
    }
};

// Delete a jar
export const deleteJar = async (req, res) => {
    const { id } = req.params;

    try {
        const jar = await Jar.findById(id);
        if (!jar || jar.userId.toString() !== req.userId) {
            return res.status(404).json({ message: 'Jar not found or unauthorized' });
        }

        await jar.deleteOne();
        res.json({ message: 'Jar deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete jar' });
    }
};
