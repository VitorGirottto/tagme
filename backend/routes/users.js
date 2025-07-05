const express = require("express")
const bcrypt = require("bcryptjs")
const { User, Post } = require("../models")
const authMiddleware = require("../middleware/auth")

const router = express.Router()

// Obter perfil do usuário logado
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email", "biography", "created_at"],
    })
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" })
  }
})

// Obter perfil de qualquer usuário
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ["id", "name", "email", "biography", "created_at"],
      include: [
        {
          model: Post,
          as: "posts",
          attributes: ["id", "title", "content", "created_at"],
        },
      ],
    })

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" })
    }

    res.json(user)
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" })
  }
})

// Atualizar perfil
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { name, email, biography, password } = req.body
    const updateData = { name, email, biography }

    if (password) {
      updateData.password = await bcrypt.hash(password, 10)
    }

    await User.update(updateData, {
      where: { id: req.user.id },
    })

    const updatedUser = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email", "biography"],
    })

    res.json({
      message: "Perfil atualizado com sucesso",
      user: updatedUser,
    })
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" })
  }
})

// Excluir conta
router.delete("/profile", authMiddleware, async (req, res) => {
  try {
    await User.destroy({
      where: { id: req.user.id },
    })
    res.json({ message: "Conta excluída com sucesso" })
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" })
  }
})

module.exports = router
