const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { User } = require("../models")

const router = express.Router()

// Registro
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, biography } = req.body

    // Verificar se usuário já existe
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ message: "Usuário já existe" })
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10)

    // Criar usuário
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      biography: biography || "",
    })

    // Gerar token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "secret", { expiresIn: "7d" })

    res.status(201).json({
      message: "Usuário criado com sucesso",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        biography: user.biography,
      },
    })
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" })
  }
})

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // Buscar usuário
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(400).json({ message: "Credenciais inválidas" })
    }

    // Verificar senha
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(400).json({ message: "Credenciais inválidas" })
    }

    // Gerar token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "secret", { expiresIn: "7d" })

    res.json({
      message: "Login realizado com sucesso",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        biography: user.biography,
      },
    })
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" })
  }
})

module.exports = router
