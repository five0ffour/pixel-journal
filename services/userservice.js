const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User: db } = require("../models");

const secret = process.env.JWT_SECRETKEY || "not so secret key";

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function authenticate({ username, password }) {
    console.log("userService.authenticate() - ", username);
  const user = await db.User.findOne({ username });
  if (user && user.checkPassword(password)) {
    const { hash, ...userWithoutHash } = user.toObject();
    const token = jwt.sign({ sub: user.id }, secret);
    return {
      ...userWithoutHash,
      token
    };
   } else {
    console.log("authenticate() - user not found");
    console.log(user);
  }
}

async function getAll() {
  return await db.User.find().select("-hash");
}

async function getById(id) {
  return await db.User.findById(id).select("-hash");
}

async function create(userParam) {
  // validate
  if (await db.User.findOne({ username: userParam.username })) {
    throw 'Username "' + userParam.username + '" is already taken';
  }

  const user = new db.User(userParam);

  // password is hashed in model middleware on save to database
  if (userParam.password) {
    user.hash = userParam.password;
  }

  // save user
  await user.save();
}

async function update(id, userParam) {
  const user = await db.User.findById(id);

  // validate
  if (!user) throw "User not found";
  if (
    user.username !== userParam.username &&
    (await User.findOne({ username: userParam.username }))
  ) {
    throw 'Username "' + userParam.username + '" is already taken';
  }

  // hash password
  // (note: model middleware hashes password on save, it is not called for updates, hence done here)
  if (userParam.password) {
    userParam.hash = user.hashPassword(userParam.password);
  }

  // copy userParam properties to user
  Object.assign(user, userParam);

  await user.save();
}

async function _delete(id) {
  await db.User.findByIdAndRemove(id);
}
