const { getConnection } = require('../config/database');

class Patient {
  static async create(patientData) {
    const { userId, bloodGroup, address, contactNumber } = patientData;
    const connection = await getConnection();
    const [result] = await connection.execute(
      'INSERT INTO patients (user_id, blood_group, address, contact_number) VALUES (?, ?, ?, ?)',
      [userId, bloodGroup, address, contactNumber]
    );
    return result.insertId;
  }

  static async findByUserId(userId) {
    const connection = await getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM patients WHERE user_id = ?',
      [userId]
    );
    return rows[0];
  }

  static async findById(id) {
    const connection = await getConnection();
    const [rows] = await connection.execute(
      `SELECT p.*, u.full_name, u.email FROM patients p
       JOIN users u ON p.user_id = u.id
       WHERE p.id = ?`,
      [id]
    );
    return rows[0];
  }

  static async update(id, patientData) {
    const connection = await getConnection();
    const fields = [];
    const values = [];

    Object.keys(patientData).forEach(key => {
      if (patientData[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(patientData[key]);
      }
    });

    values.push(id);

    const [result] = await connection.execute(
      `UPDATE patients SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
    return result.affectedRows > 0;
  }
}

module.exports = Patient;
