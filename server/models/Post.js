const pool = require('../config/db');

class Post {
  static async create({ userId, content }) {
    const [res] = await pool.query(
      `INSERT INTO posts (user_id, content) VALUES (?, ?)`,
      [userId, content]
    );
    return res.insertId;
  }
  static async getFeed() {
    const [rows] = await pool.query(`
      SELECT p.*, u.username
      FROM posts p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
    `);
    return rows;
  }
  // Outros métodos: getByUser, delete…
}

module.exports = Post;
