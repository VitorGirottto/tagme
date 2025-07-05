const jwt = require("jsonwebtoken")
const { User } = require("../models")

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
      return res.status(401).json({ message: "Token não fornecido" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret")
    const user = await User.findByPk(decoded.userId)

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado" })
    }

    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ message: "Token inválido" })
  }
}

module.exports = authMiddleware
