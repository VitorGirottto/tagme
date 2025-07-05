const express = require("express")
const { Comment, User } = require("../models")
const authMiddleware = require("../middleware/auth")

const router = express.Router()

// Obter comentários de um post específico
router.get("/post/:postId", async (req, res) => {
  try {
    const postId = Number.parseInt(req.params.postId)

    const comments = await Comment.findAll({
      where: { post_id: postId },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name"],
        },
      ],
      order: [["created_at", "ASC"]], // Comentários mais antigos primeiro
    })

    res.json(comments)
  } catch (error) {
    console.error("Erro ao buscar comentários:", error)
    res.status(500).json({ message: "Erro interno do servidor" })
  }
})

// Criar comentário
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { content, post_id } = req.body

    const comment = await Comment.create({
      content,
      user_id: req.user.id,
      post_id,
    })

    const newComment = await Comment.findByPk(comment.id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name"],
        },
      ],
    })

    res.status(201).json({
      message: "Comentário criado com sucesso",
      comment: newComment,
    })
  } catch (error) {
    console.error("Erro ao criar comentário:", error)
    res.status(500).json({ message: "Erro interno do servidor" })
  }
})

// Atualizar comentário (apenas o autor)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { content } = req.body
    const comment = await Comment.findByPk(req.params.id)

    if (!comment) {
      return res.status(404).json({ message: "Comentário não encontrado" })
    }

    if (comment.user_id !== req.user.id) {
      return res.status(403).json({ message: "Não autorizado" })
    }

    await comment.update({ content })

    const updatedComment = await Comment.findByPk(comment.id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name"],
        },
      ],
    })

    res.json({
      message: "Comentário atualizado com sucesso",
      comment: updatedComment,
    })
  } catch (error) {
    console.error("Erro ao atualizar comentário:", error)
    res.status(500).json({ message: "Erro interno do servidor" })
  }
})

// Excluir comentário (apenas o autor)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id)

    if (!comment) {
      return res.status(404).json({ message: "Comentário não encontrado" })
    }

    if (comment.user_id !== req.user.id) {
      return res.status(403).json({ message: "Não autorizado" })
    }

    await comment.destroy()
    res.json({ message: "Comentário excluído com sucesso" })
  } catch (error) {
    console.error("Erro ao excluir comentário:", error)
    res.status(500).json({ message: "Erro interno do servidor" })
  }
})

module.exports = router
