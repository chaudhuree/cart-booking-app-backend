const express = require('express');
const router = express.Router();
const prisma = require('../prisma/index');

const { registerUser,loginUser } = require('../controllers/user');

// router.get('/', async (req, res) => {
//   const users = await prisma.user.findMany();
//   res.json(users);
// });

router.post("/register", registerUser);
router.post("/login", loginUser);



module.exports = router;