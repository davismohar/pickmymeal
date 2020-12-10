const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/database');
const User = db.User;

module.exports = {
  authenticate,
  getAllUsers,
  getById,
  addUser

};

// Authenticate given user
async function authenticate({ username, password }) {
  const user = await User.findOne({ username });
  if (user && bcrypt.compareSync(password, user.hash)) {
      const { hash, ...userWithoutHash } = user.toObject();
      const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
      return {
          ...userWithoutHash,
          token
      };
  }

}


async function getAllUsers() {
  //Returning the result of the promise. In the next homework we will make sure no passwords are sent back to the user.
  return await User.find().select('-hash');
}


// Get user by ID
async function getById(id) {

  return await User.find({ _id: id });
}

// Add a new user 
async function addUser(userParam) {

  // validate
  if (await User.findOne({ username: userParam.username })) {
    throw 'Username "' + userParam.username + '" is already taken';
  }
  else if (await User.findOne({ email: userParam.email })) {
    throw 'Email "' + userParam.email + '" is already taken';
  }

  const user = new User(userParam);

  // hash password
  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10);
  }
  if (userParam.username == 'dmohar' || userParam.username == 'cwhoover') {
    user.role = 'admin';
  } 
  else {
    user.role = 'user';
  }
  // save user
  await user.save();

}


