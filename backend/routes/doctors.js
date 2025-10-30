const express = require('express');
const bcrypt = require('bcryptjs');
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const { verifyToken, checkRole } = require('../middleware/auth');

const router = express.Router();

// Get all doctors (public access)
router.get('/', async (req, res) => {
  try {
    const { specialty, name } = req.query;
    const doctors = await Doctor.findAll({ specialty, name });
    res.json(doctors);
  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a single doctor by ID (for admins)
router.get('/:id', verifyToken, checkRole(['admin']), async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        res.json(doctor);
    } catch (error) {
        console.error('Get doctor error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get doctor availability (public access)
router.get('/:id/availability', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    // Placeholder for availability logic
    const availability = []; 
    res.json({ availability });
  } catch (error) {
    console.error('Get doctor availability error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new doctor (admin only)
router.post('/', verifyToken, checkRole(['admin']), async (req, res) => {
    try {
        const { fullName, email, password, specialty, age, gender, contactNumber, bio } = req.body;

        // Create the user account first
        const passwordHash = await bcrypt.hash(password, 10);
        const userId = await User.create({ fullName, email, passwordHash, role: 'doctor' });

        // Then create the doctor profile
        const doctorId = await Doctor.create({ userId, specialty, age, gender, contactNumber, bio });
        const newDoctor = await Doctor.findById(doctorId);

        res.status(201).json(newDoctor);
    } catch (error) {
        console.error('Create doctor error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update doctor profile (admin only)
router.put('/:id', verifyToken, checkRole(['admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const success = await Doctor.update(id, req.body);

    if (success) {
      const updatedDoctor = await Doctor.findById(id);
      res.json(updatedDoctor);
    } else {
      res.status(404).json({ error: 'Doctor not found or update failed' });
    }
  } catch (error) {
    console.error('Update doctor error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a doctor (admin only)
router.delete('/:id', verifyToken, checkRole(['admin']), async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        // It's good practice to delete the user account as well
        await User.delete(doctor.user_id); // Assuming User.delete exists
        await Doctor.delete(req.params.id); // Assuming Doctor.delete exists

        res.status(204).send();
    } catch (error) {
        console.error('Delete doctor error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;