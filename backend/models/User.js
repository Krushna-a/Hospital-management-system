const { getConnection } = require('../config/database');

class User {
  static async create(userData) {
    const { fullName, email, passwordHash, role } = userData;
    const connection = await getConnection();
    const [result] = await connection.execute(
      'INSERT INTO users (full_name, email, password_hash, role, created_at) VALUES (?, ?, ?, ?, NOW())',
      [fullName, email, passwordHash, role]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const connection = await getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  static async findById(id) {
    const connection = await getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async update(id, userData) {
    const connection = await getConnection();
    const fields = [];
    const values = [];

    Object.keys(userData).forEach(key => {
      if (userData[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(userData[key]);
      }
    });

    values.push(id);

    const [result] = await connection.execute(
      `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
    return result.affectedRows > 0;
  }
}

module.exports = User;
