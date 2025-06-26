const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  const id = await Post.create({ userId: req.userId, content: req.body.content });
  res.json({ postId: id });
};

exports.getFeed = async (req, res) => {
  const feed = await Post.getFeed();
  res.json(feed);
};
