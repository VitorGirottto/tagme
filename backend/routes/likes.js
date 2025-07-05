const express = require("express")
const { Like } = require("../models")
const authMiddleware = require("../middleware/auth")

const router = express.Router()

// Curtir/descurtir post
router.post("/:postId", authMiddleware, async (req, res) => {
  try {
    const postId = Number.parseInt(req.params.postId)
    const userId = req.user.id

    console.log(`Tentativa de curtida: User ${userId}, Post ${postId}`)

    // Verificar se já curtiu
    const existingLike = await Like.findOne({
      where: { user_id: userId, post_id: postId },
    })

    if (existingLike) {
      // Se já curtiu, remove a curtida
      await existingLike.destroy()
      console.log("Curtida removida")
      res.json({ message: "Curtida removida", liked: false })
    } else {
      // Se não curtiu, adiciona curtida
      await Like.create({
        user_id: userId,
        post_id: postId,
      })
      console.log("Post curtido")
      res.json({ message: "Post curtido", liked: true })
    }
  } catch (error) {
    console.error("Erro no sistema de curtidas:", error)
    res.status(500).json({ message: "Erro interno do servidor", error: error.message })
  }
})

// Verificar se usuário curtiu um post
router.get("/:postId/check", authMiddleware, async (req, res) => {
  try {
    const like = await Like.findOne({
      where: {
        user_id: req.user.id,
        post_id: Number.parseInt(req.params.postId),
      },
    })

    res.json({ liked: !!like })
  } catch (error) {
    console.error("Erro ao verificar curtida:", error)
    res.status(500).json({ message: "Erro interno do servidor" })
  }
})

module.exports = router
