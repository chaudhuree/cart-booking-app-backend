const { verifyToken } = require('../helpers/token')
const { UnauthenticatedError } = require('../errors')
const prisma = require('../prisma/index')

exports.authenticated = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization //in header.authorization we will get token
  if (!authHeader) {
    //token will be like, Bearer tokenCode so we use startsWith
    throw new UnauthenticatedError('Authentication invalid')
  }
  try {
    //verify the token and get the payload which is the user id and name
    const payload = verifyToken(authHeader, process.env.JWT_SECRET)
    // console.log(payload.id);
    // attach the user id to the routes
    req.user = payload.id


    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid')
  }
}

exports.admin = async (req, res, next) => {

  const user = await prisma.user.findUnique({
    where: {
      id: req.user
    }
  });
  if (user.role !== 1) {
    throw new UnauthenticatedError('Admin resource. Access denied');
  } else {
    next();
  }

};