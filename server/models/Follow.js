const pool = require('../config/db');

class Follow {
  static async follow(userId, targetId) {
    return pool.query(
      `INSERT INTO follows (follower_id, following_id) VALUES (?, ?)`,
      [userId, targetId]
    );
  }
  static async unfollow(userId, targetId) {
    return pool.query(
      `DELETE FROM follows WHERE follower_id = ? AND following_id = ?`,
      [userId, targetId]
    );
  }
  static async isFollowing(userId, targetId) {
    const [rows] = await pool.query(
      `SELECT 1 FROM follows WHERE follower_id = ? AND following_id = ?`,
      [userId, targetId]
    );
    return rows.length > 0;
  }
}

module.exports = Follow;
