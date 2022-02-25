const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

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

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        bcrypt
          .compare(password, user.password)
          .then((isSame) => {
            if (isSame) {
              res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
              });
            } else {
              // user exists but wrong password
              res.status(401);
              throw new Error("Invalid credentials");
            }
          })
          .catch(next);
      } else {
        //if user does not exist then return status 401
        // unauthorized error
        res.status(401);
        throw new Error("User does not exist");
      }
    })
    .catch(next);
};

module.exports = {
  registerUser,
  loginUser,
};
