const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/database');
const User = db.User;

module.exports = {
  authenticate,
  getAllUsers,
  getById,
  addUser,
  registerCourse

};

async function authenticate({ username, password }) {
  // const user = await User.findOne({ username });
  // if (user && bcrypt.compareSync(password, user.hash)) {
  //   const { hash, ...userWithoutHash } = user.toObject();
  //   const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
  //   return {
  //     ...userWithoutHash,
  //     token
  //   };
  // }

  //---TEMP DB SIMULATION---
  let user = {};
  if (username === 'user' && password === '123123') {
    user = {
      id: '1',
      username: 'user',
      email: 'user@test.com',
      firstName: 'firstName',
      lastName: 'lastName',
      role: 'user'
    };
    const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
    return ({
      user,
      token
    });
  }
  else if (username === 'admin' && password === '123123') {
    user = {
      id: '2',
      username: 'admin',
      email: 'admin@test.com',
      firstName: 'firstName',
      lastName: 'lastName',
      role: 'admin'
    };
    const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
    return ({
      user,
      token
    });
  }
}

async function getAllUsers() {
  //Returning the result of the promise. In the next homework we will make sure no passwords are sent back to the user.
  return await User.find().select('-hash');
}



async function getById(id) {

  return await User.find({ _id: id });
}


async function registerCourse(req) {

  user = await User.findOne({ _id: req.user.sub });
  if (user.courses.length >= 5) {
    throw 'cannot be enrolled in more than 5 courses';
  }
  courseID = req.body.id;

  if (user.courses.includes(courseID)) {
    throw 'cannot be enrolled in same course';
  }
  user.courses.push(courseID);
  console.log(user);
  await user.save();
}

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

  // save user
  await user.save();

}


