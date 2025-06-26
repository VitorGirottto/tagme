const pool = require('../config/db');

class User {
  static async create({ username, email, password }) { // mudar passwordHash para password
    const [result] = await pool.query(
      `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
      [username, email, password]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [email]);
    return rows[0];
  }

  // Outros métodos: findById, update…
}

module.exports = User;
