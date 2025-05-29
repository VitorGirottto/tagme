const { User } = require('../models');

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] } // oculta a senha na resposta
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json(user);
  } catch (err) {
    console.error('Erro no getUserProfile:', err);
    res.status(500).json({ message: 'Erro ao buscar perfil do usuário' });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { username, bio } = req.body;

    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    user.username = username || user.username;
    user.bio = bio || user.bio;
    await user.save();

    const updatedUser = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });

    res.json(updatedUser);
  } catch (err) {
    console.error('Erro no updateUserProfile:', err);
    res.status(500).json({ message: 'Erro ao atualizar perfil' });
  }
};
