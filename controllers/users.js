const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createJWT = async (user, response) => {
  const token = await jwt.sign({ id: user.id }, process.env.JWT);
  response.send({ token, user });
};

exports.getUsers = async (request, response) => {
  const allUsers = await User.find({}).populate("blogs");

  response.json(allUsers);
};
exports.addUser = async (request, response) => {
  const { username, password } = request.body;

  let savedUser = await User.findOne({ username });

  if (!savedUser) {
    const saltRound = 10;
    const passwordHash = await bcrypt.hash(password, saltRound);

    const newUser = User({
      username: username,
      password: passwordHash,
    });
    savedUser = await newUser.save();
    createJWT(savedUser, response);
  } else {
    isPasswodCorrect = await bcrypt.compare(password, savedUser.password);
    isPasswodCorrect
      ? createJWT(savedUser, response)
      : response.status(401).end();
  }
};
exports.updateUser = async (request, response) => {
  const userId = request.params.userId;
};
exports.deleteUser = async (request, response) => {
  const userId = request.params.userId;
};
