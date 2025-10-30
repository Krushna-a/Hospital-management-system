const { getConnection } = require('../config/database');

class Appointment {
  static async create(appointmentData) {
    const { patientId, doctorId, appointmentDate, appointmentTime, reasonForVisit } = appointmentData;
    const connection = await getConnection();
    const [result] = await connection.execute(
      'INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, reason_for_visit, status, created_at) VALUES (?, ?, ?, ?, ?, "pending", NOW())',
      [patientId, doctorId, appointmentDate, appointmentTime, reasonForVisit]
    );
    return result.insertId;
  }

  static async findById(id) {
    const connection = await getConnection();
    const [rows] = await connection.execute(
      `SELECT a.*, p.user_id as patient_user_id, d.user_id as doctor_user_id,
              pu.full_name as patient_name, du.full_name as doctor_name
       FROM appointments a
       JOIN patients p ON a.patient_id = p.id
       JOIN doctors d ON a.doctor_id = d.id
       JOIN users pu ON p.user_id = pu.id
       JOIN users du ON d.user_id = du.id
       WHERE a.id = ?`,
      [id]
    );
    return rows[0];
  }

  static async findByPatientId(patientId) {
    const connection = await getConnection();
    const [rows] = await connection.execute(
      `SELECT a.*, d.user_id as doctor_user_id, du.full_name as doctor_name, doc.specialty
       FROM appointments a
       JOIN doctors d ON a.doctor_id = d.id
       JOIN users du ON d.user_id = du.id
       JOIN doctors doc ON d.id = doc.id
       WHERE a.patient_id = ?
       ORDER BY a.appointment_date DESC, a.appointment_time DESC`,
      [patientId]
    );
    return rows;
  }

  static async findByDoctorId(doctorId) {
    const connection = await getConnection();
    const [rows] = await connection.execute(
      `SELECT a.*, p.user_id as patient_user_id, pu.full_name as patient_name, pu.email as patient_email
       FROM appointments a
       JOIN patients p ON a.patient_id = p.id
       JOIN users pu ON p.user_id = pu.id
       WHERE a.doctor_id = ?
       ORDER BY a.appointment_date DESC, a.appointment_time DESC`,
      [doctorId]
    );
    return rows;
  }

  static async updateStatus(id, status) {
    const connection = await getConnection();
    const [result] = await connection.execute(
      'UPDATE appointments SET status = ? WHERE id = ?',
      [status, id]
    );
    return result.affectedRows > 0;
  }

  static async update(id, appointmentData) {
    const connection = await getConnection();
    const fields = [];
    const values = [];

    Object.keys(appointmentData).forEach(key => {
      if (appointmentData[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(appointmentData[key]);
      }
    });

    values.push(id);

    const [result] = await connection.execute(
      `UPDATE appointments SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
    return result.affectedRows > 0;
  }
}

module.exports = Appointment;
