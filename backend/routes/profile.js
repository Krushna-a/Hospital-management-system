const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

// GET user's own profile
router.get('/me', verifyToken, async (req, res) => {
  try {
    let profile;
    if (req.userRole === 'doctor') {
      profile = await Doctor.findByUserId(req.userId);
    } else if (req.userRole === 'patient') {
      profile = await Patient.findByUserId(req.userId);
    } else { // for admin
      // Admins might not have a patient or doctor profile, just a user profile.
      // You could fetch from the User model here if needed.
      return res.json({ role: 'admin' });
    }

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found.' });
    }

    res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// UPDATE user's own profile
router.put('/me', verifyToken, async (req, res) => {
  try {
    let profile;
    let success = false;

    if (req.userRole === 'doctor') {
      profile = await Doctor.findByUserId(req.userId);
      if (!profile) return res.status(404).json({ error: 'Doctor profile not found.' });
      
      // Extract only the fields a doctor can update
      const { specialty, age, gender, contactNumber, bio } = req.body;
      const updateData = { specialty, age, gender, contact_number: contactNumber, bio };

      success = await Doctor.update(profile.id, updateData);

    } else if (req.userRole === 'patient') {
      profile = await Patient.findByUserId(req.userId);
      if (!profile) return res.status(404).json({ error: 'Patient profile not found.' });

      // Extract only the fields a patient can update
      const { bloodGroup, address, contactNumber } = req.body;
      const updateData = { blood_group: bloodGroup, address, contact_number: contactNumber };

      success = await Patient.update(profile.id, updateData);

    } else {
        return res.status(403).json({ error: 'Admins cannot update profiles via this route.' });
    }

    if (success) {
        res.json({ message: 'Profile updated successfully' });
    } else {
        res.status(400).json({ error: 'Profile update failed' });
    }

  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
