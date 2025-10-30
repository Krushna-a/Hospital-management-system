const { getConnection } = require('../config/database');

class Bill {
  static async findByPatientId(patientId) {
    const connection = await getConnection();
    const [rows] = await connection.execute(
      `SELECT b.*, a.appointment_date, d.full_name as doctor_name
       FROM bills b
       JOIN appointments a ON b.appointment_id = a.id
       JOIN doctors doc ON a.doctor_id = doc.id
       JOIN users d ON doc.user_id = d.id
       WHERE b.patient_id = ?
       ORDER BY b.issue_date DESC`,
      [patientId]
    );
    return rows;
  }
}

module.exports = Bill;
