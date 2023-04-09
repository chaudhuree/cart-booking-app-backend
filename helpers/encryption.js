const bcrypt = require('bcryptjs');

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

const comparePassword = async (password, receivedPassword) => {
  try {
    return await bcrypt.compare(password, receivedPassword);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { encryptPassword, comparePassword };