const db = require('../models');
const Post = db.Post;
const Like = db.Like;

exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.userId; // Obtido do middleware de autenticação

    const newPost = await Post.create({ content, userId });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({ include: db.User });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.userId;

    const existingLike = await Like.findOne({ where: { postId, userId } });
    if (existingLike) {
      return res.status(400).json({ message: 'Você já curtiu este post.' });
    }

    await Like.create({ postId, userId });
    res.status(200).json({ message: 'Post curtido com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.userId;

    const post = await Post.findOne({ where: { id: postId, userId } });
    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado ou você não tem permissão para deletá-lo.' });
    }

    await post.destroy();
    res.status(200).json({ message: 'Post deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
