const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const { verifyToken, checkRole } = require('../middleware/auth');

// Get appointments for the logged-in patient
router.get('/my', verifyToken, checkRole(['patient']), async (req, res) => {
  try {
    const patient = await Patient.findByUserId(req.userId);
    if (!patient) {
      return res.status(404).json({ error: 'Patient profile not found.' });
    }
    const appointments = await Appointment.findByPatientId(patient.id);
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching patient appointments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get appointments for the logged-in doctor
router.get('/for-me', verifyToken, checkRole(['doctor']), async (req, res) => {
  try {
    const doctor = await Doctor.findByUserId(req.userId);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor profile not found.' });
    }
    const appointments = await Appointment.findByDoctorId(doctor.id);
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching doctor appointments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new appointment (for patients)
router.post('/', verifyToken, checkRole(['patient']), async (req, res) => {
  try {
    const { doctorId, appointmentDate, appointmentTime, reasonForVisit } = req.body;
    const patient = await Patient.findByUserId(req.userId);

    if (!patient) {
      return res.status(400).json({ error: 'Patient profile not found' });
    }

    const appointmentId = await Appointment.create({
      patientId: patient.id,
      doctorId,
      appointmentDate,
      appointmentTime,
      reasonForVisit,
      status: 'pending' // Default status
    });

    const newAppointment = await Appointment.findById(appointmentId);
    res.status(201).json(newAppointment);
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update appointment status (for doctors)
router.put('/:id/status', verifyToken, checkRole(['doctor', 'admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    // If the user is a doctor, ensure they are assigned to this appointment
    if (req.userRole === 'doctor') {
        const doctor = await Doctor.findByUserId(req.userId);
        if (appointment.doctor_id !== doctor.id) {
            return res.status(403).json({ error: 'Access denied. You are not the assigned doctor.' });
        }
    }

    const success = await Appointment.updateStatus(id, status);
    if (success) {
      const updatedAppointment = await Appointment.findById(id);
      res.json(updatedAppointment);
    } else {
      res.status(400).json({ error: 'Update failed' });
    }
  } catch (error) {
    console.error('Update appointment status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;