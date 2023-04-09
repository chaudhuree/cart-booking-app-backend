const prisma = require('../prisma/index');
const { encryptPassword } = require('../helpers/encryption');
const { comparePassword } = require('../helpers/encryption');
const { generateToken } = require('../helpers/token');
const { verifyToken } = require('../helpers/token');

// register user
exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.create({
    data: {
      username,
      password: await encryptPassword(password)
    }
  });
  const token = generateToken(user.id);
  res.json({ user: { id: user.id, username: user.username, role: user.role }, token });

}

// login user
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      username
    }
  });
  if (!user) {
    return res.status(400).json({ msg: 'User does not exist' });
  }
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: 'Invalid credentials' });
  }
  const token = generateToken(user.id);
  res.json({ user: { id: user.id, username: user.username, role: user.role }, token });
}


