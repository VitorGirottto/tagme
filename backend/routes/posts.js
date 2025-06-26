const express = require("express")
const { Post, User, Comment, Like } = require("../models")
const authMiddleware = require("../middleware/auth")

const router = express.Router()

// Listar todos os posts (feed público)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "name"],
        },
        {
          model: Comment,
          as: "comments",
          include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "name"],
            },
          ],
        },
        {
          model: Like,
          as: "likes",
          attributes: ["id", "user_id"],
        },
      ],
      order: [["created_at", "DESC"]],
    })

    res.json(posts)
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" })
  }
})

// Criar novo post
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body

    const post = await Post.create({
      title,
      content,
      author_id: req.user.id,
    })

    const newPost = await Post.findByPk(post.id, {
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "name"],
        },
      ],
    })

    res.status(201).json({
      message: "Post criado com sucesso",
      post: newPost,
    })
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" })
  }
})

// Obter post específico
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "name"],
        },
        {
          model: Comment,
          as: "comments",
          include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "name"],
            },
          ],
        },
        {
          model: Like,
          as: "likes",
        },
      ],
    })

    if (!post) {
      return res.status(404).json({ message: "Post não encontrado" })
    }

    res.json(post)
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" })
  }
})

// Atualizar post (apenas o autor)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body
    const post = await Post.findByPk(req.params.id)

    if (!post) {
      return res.status(404).json({ message: "Post não encontrado" })
    }

    if (post.author_id !== req.user.id) {
      return res.status(403).json({ message: "Não autorizado" })
    }

    await post.update({ title, content })
    res.json({ message: "Post atualizado com sucesso", post })
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" })
  }
})

// Excluir post (apenas o autor)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id)

    if (!post) {
      return res.status(404).json({ message: "Post não encontrado" })
    }

    if (post.author_id !== req.user.id) {
      return res.status(403).json({ message: "Não autorizado" })
    }

    await post.destroy()
    res.json({ message: "Post excluído com sucesso" })
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" })
  }
})

module.exports = router
