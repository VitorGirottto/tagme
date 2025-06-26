const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const { sequelize } = require("./config/database")

// Importar rotas
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/users")
const postRoutes = require("./routes/posts")
const commentRoutes = require("./routes/comments")
const likeRoutes = require("./routes/likes")

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middlewares
app.use(cors())
app.use(express.json())

// Rotas
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/likes", likeRoutes)

// Rota de teste
app.get("/", (req, res) => {
  res.json({ message: "Blog API funcionando!" })
})

// Sincronizar banco de dados e iniciar servidor
sequelize
  .sync()
  .then(() => {
    console.log("Banco de dados conectado!")
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`)
    })
  })
  .catch((err) => {
    console.error("Erro ao conectar com o banco:", err)
  })
