const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    try {
      // Get token from header
      token = authHeader.split(" ")[1];
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Get user from token
      User.findById(decoded.id)
        .select("-password")
        .then((user) => {
          console.log(user);
          req.user = user;
          next();
        })
        .catch(next);
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized");
  }
};

module.exports = { protect };
