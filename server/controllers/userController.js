const User = require('../models/User');
const Follow = require('../models/Follow');

exports.getProfile = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "não encontrado" });
  const following = await Follow.isFollowing(req.userId, id);
  res.json({ ...user, following });
};

exports.follow = async (req, res) => {
  await Follow.follow(req.userId, req.params.id);
  res.json({ success: true });
};

exports.unfollow = async (req, res) => {
  await Follow.unfollow(req.userId, req.params.id);
  res.json({ success: true });
};
