const { getConnection } = require('../config/database');

class Doctor {
  static async create(doctorData) {
    const { userId, specialty, age, gender, contactNumber, bio } = doctorData;
    const connection = await getConnection();
    const [result] = await connection.execute(
      'INSERT INTO doctors (user_id, specialty, age, gender, contact_number, bio) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, specialty, age, gender, contactNumber, bio]
    );
    return result.insertId;
  }

  static async findByUserId(userId) {
    const connection = await getConnection();
    const [rows] = await connection.execute(
      `SELECT d.*, u.full_name, u.email FROM doctors d
       JOIN users u ON d.user_id = u.id
       WHERE d.user_id = ?`,
      [userId]
    );
    return rows[0];
  }

  static async findById(id) {
    const connection = await getConnection();
    const [rows] = await connection.execute(
      `SELECT d.*, u.full_name, u.email FROM doctors d
       JOIN users u ON d.user_id = u.id
       WHERE d.id = ?`,
      [id]
    );
    return rows[0];
  }

  static async findAll(query = {}) {
    const connection = await getConnection();
    let sql = `SELECT d.*, u.full_name, u.email FROM doctors d
               JOIN users u ON d.user_id = u.id WHERE 1=1`;
    const params = [];

    if (query.specialty) {
      sql += ' AND d.specialty LIKE ?';
      params.push(`%${query.specialty}%`);
    }

    if (query.name) {
      sql += ' AND u.full_name LIKE ?';
      params.push(`%${query.name}%`);
    }

    const [rows] = await connection.execute(sql, params);
    return rows;
  }

  static async update(id, doctorData) {
    const connection = await getConnection();
    const fields = [];
    const values = [];

    Object.keys(doctorData).forEach(key => {
      if (doctorData[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(doctorData[key]);
      }
    });

    values.push(id);

    const [result] = await connection.execute(
      `UPDATE doctors SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
    return result.affectedRows > 0;
  }
}

module.exports = Doctor;
