const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const { verifyToken, checkRole } = require('../middleware/auth');

// GET all patients (for admins)
router.get('/', verifyToken, checkRole(['admin']), async (req, res) => {
  try {
    // Assuming a method exists to find all patients
    const patients = await Patient.findAll(); 
    res.json(patients);
  } catch (error) {
    console.error('Error fetching all patients:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET all patients assigned to the logged-in doctor
router.get('/for-doctor', verifyToken, checkRole(['doctor']), async (req, res) => {
  try {
    const doctor = await Doctor.findByUserId(req.userId);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor profile not found.' });
    }
    // This assumes a method exists to get patients based on appointments or another link
    const patients = await Patient.findByDoctorId(doctor.id);
    res.json(patients);
  } catch (error) {
    console.error('Error fetching doctor\'s patients:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET a single patient by ID (for admins)
router.get('/:id', verifyToken, checkRole(['admin']), async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// UPDATE a patient by ID (for admins)
router.put('/:id', verifyToken, checkRole(['admin']), async (req, res) => {
  try {
    const success = await Patient.update(req.params.id, req.body);
    if (success) {
      const updatedPatient = await Patient.findById(req.params.id);
      return res.json(updatedPatient);
    }
    res.status(400).json({ error: 'Update failed' });
  } catch (error) {
    console.error('Update patient error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE a patient by ID (for admins)
router.delete('/:id', verifyToken, checkRole(['admin']), async (req, res) => {
  try {
    // This should also delete the associated user account for cleanliness
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    await Patient.delete(req.params.id); // Assumes Patient.delete exists
    // await User.delete(patient.user_id); // Assumes User.delete exists
    res.status(204).send();
  } catch (error) {
    console.error('Delete patient error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;