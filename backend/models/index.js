const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,           // Nome do banco
  process.env.DB_USER,           // Nome do usuário
  process.env.DB_PASSWORD,       // Senha
  {
    host: process.env.DB_HOST,   // Ex: 127.0.0.1
    port: process.env.DB_PORT,   // Ex: 3307 — ESSENCIAL
    dialect: 'mysql',
  }
);

const { DataTypes } = Sequelize;

// Importar modelos com sequelize e DataTypes
const User = require('./userModel')(sequelize, DataTypes);
const Post = require('./postModel')(sequelize, DataTypes);
const Like = require('./likeModel')(sequelize, DataTypes);
const Follower = require('./followerModel')(sequelize, DataTypes);

module.exports = {
  sequelize,
  User,
  Post,
  Like,
  Follower,
};
