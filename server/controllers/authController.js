const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const id = await User.create({ username, email, password: hashed }); // aqui
  res.json({ userId: id });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  console.log('JWT_SECRET no login:', process.env.JWT_SECRET);  // <-- Aqui, para debug

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  res.json({ token });
};


