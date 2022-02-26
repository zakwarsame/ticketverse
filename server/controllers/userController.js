const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

/**
 *
 * @param {*} req
 * @param {*} res
 * @desc  register new user
 * @route /api/users
 * @access Public
 */

const registerUser = (req, res, next) => {
  const { name, email, password } = req.body;

  // if any of the fields are missing, send error
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  // Find if user exists already
  User.findOne({ email })
    .then((userExists) => {
      if (userExists) {
        res.status(400);
        throw new Error("User already exists");
      }

      // Hash password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // save the user inside the db
      User.create({
        name,
        email,
        password: hashedPassword,
      })
        .then((newUser) => {
          // set status code 201 to indicate creation of resource
          //
          if (newUser) {
            res.status(201).json({
              _id: user._id,
              name: user.name,
              email: user.email,
            });
          } else {
            res.status(400);
            throw new Error("Invalid user data");
          }
        })
        .catch(next);
    })
    .catch(next);
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @desc  login new user
 * @route /api/users/login
 * @access Public
 */

const loginUser = (req, res) => {
  res.send("Login Route");
};

module.exports = {
  registerUser,
  loginUser,
};
