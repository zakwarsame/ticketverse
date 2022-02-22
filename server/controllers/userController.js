/**
 *
 * @param {*} req
 * @param {*} res
 * @desc  register new user
 * @route /api/users
 * @access Public
 */

const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }
  res.send("Register Route");
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
