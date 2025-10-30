const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../middleware/auth');
const Bill = require('../models/Bill');
const Patient = require('../models/Patient');

// GET patient's own bills
router.get('/my-bills', verifyToken, checkRole(['patient']), async (req, res) => {
  try {
    const patient = await Patient.findByUserId(req.userId);
    if (!patient) {
      return res.status(404).json({ error: 'Patient profile not found.' });
    }

    const bills = await Bill.findByPatientId(patient.id);
    res.json(bills);

  } catch (error) {
    console.error('Error fetching bills:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
